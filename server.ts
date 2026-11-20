import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import 'dotenv/config';
import { pdfResources } from "./src/data/pdfResources";
import {
  FALLBACK_YOUTUBE_LIBRARY,
  YOUTUBE_CHANNEL_HANDLE,
  YOUTUBE_CHANNEL_ID,
  YOUTUBE_CHANNEL_URL,
  type YoutubeLibraryData,
  type YoutubePlaylist,
  type YoutubeVideo,
} from "./src/data/youtubeVideos";

interface VisitorLog {
  id: string;
  ip: string;
  userAgent: string;
  path: string;
  timestamp: number;
}

const LOGS_FILE = path.join(process.cwd(), "visitor_logs.json");
const ADMIN_SECRET = process.env.ADMIN_SECRET || "@uledu?300525";

// Helper to load logs
function loadLogs(): VisitorLog[] {
  try {
    if (fs.existsSync(LOGS_FILE)) {
      const data = fs.readFileSync(LOGS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading visitor logs:", err);
  }
  return [];
}

// Helper to save logs
function saveLogs(logs: VisitorLog[]) {
  try {
    // Keep max 1000 logs
    const trimmed = logs.slice(0, 1000);
    fs.writeFileSync(LOGS_FILE, JSON.stringify(trimmed, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving visitor logs:", err);
  }
}

let logsMemory: VisitorLog[] = loadLogs();

// --- YouTube RSS Auto-Sync Helpers (@UnlockEdu25) ---
const YOUTUBE_SEED_PLAYLISTS: Array<{ id: string; fallbackTitle: string; chapterId: number }> = [
  { id: "PLSJTOXTAyfjg", fallbackTitle: "Grade 12 Mathematics Chapter 1", chapterId: 1 },
  { id: "PLVopMG9bjvM6G9jgqXtSAfFsPBoe2cFPB", fallbackTitle: "Grade 12 Mathematics Chapter 3", chapterId: 3 },
  { id: "PLJtCmidavJSY", fallbackTitle: "Grade 12 Mathematics Chapter 9", chapterId: 9 },
];

let youtubeCache: { data: YoutubeLibraryData; fetchedAt: number } | null = null;
const YOUTUBE_CACHE_TTL_MS = 10 * 60 * 1000;

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)))
    .trim();
}

function extractChapterId(title: string): number | null {
  const match = title.match(/(?:chapter|ch\.?)\s*0*(\d{1,2})\b/i);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  return num >= 1 && num <= 11 ? num : null;
}

function extractPartNumber(title: string): number | null {
  const match = title.match(/(?:part|lesson|ep\.?|episode)\s*0*(\d{1,3})\b/i);
  return match ? parseInt(match[1], 10) : null;
}

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 6000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function parseYoutubeAtomXml(xml: string, playlistId?: string): { feedTitle: string; videos: YoutubeVideo[] } {
  const beforeEntry = xml.split("<entry>")[0] || "";
  const feedTitleMatch = beforeEntry.match(/<title>([\s\S]*?)<\/title>/i);
  const feedTitle = feedTitleMatch ? decodeXmlEntities(feedTitleMatch[1]) : "";

  const videos: YoutubeVideo[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/gi;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];
    const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/i);
    const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/i);
    const pubMatch = entry.match(/<published>([^<]+)<\/published>/i);

    if (!idMatch) continue;
    const id = idMatch[1].trim();
    const title = titleMatch ? decodeXmlEntities(titleMatch[1]) : "Untitled Video";
    const published = pubMatch ? pubMatch[1].trim() : "";

    videos.push({
      id,
      title,
      published,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      playlistId,
      chapterId: extractChapterId(title),
    });
  }

  return { feedTitle, videos };
}

async function discoverGrade12PlaylistIds(): Promise<string[]> {
  const discovered = new Set<string>(YOUTUBE_SEED_PLAYLISTS.map((p) => p.id));
  try {
    const res = await fetchWithTimeout(
      `${YOUTUBE_CHANNEL_URL}/playlists`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          Cookie: "CONSENT=YES+cb",
        },
      },
      4500
    );
    if (!res.ok) return Array.from(discovered);
    const html = await res.text();
    const idMatches = html.matchAll(/"(?:playlistId|contentId)"\s*:\s*"(PL[A-Za-z0-9_-]{10,40})"/g);
    const candidates = new Set<string>();
    for (const m of idMatches) {
      if (m[1]) candidates.add(m[1]);
    }
    for (const id of candidates) {
      if (discovered.size >= 15) break;
      discovered.add(id);
    }
  } catch {
    // Non-fatal: fall back to seed playlists
  }
  return Array.from(discovered);
}

async function loadLiveYoutubeLibrary(): Promise<YoutubeLibraryData> {
  const candidateIds = await discoverGrade12PlaylistIds();
  const seedMap = new Map(YOUTUBE_SEED_PLAYLISTS.map((s) => [s.id, s]));

  const [channelResult, ...playlistResults] = await Promise.allSettled([
    fetchWithTimeout(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`Channel RSS ${r.status}`)))),
    ...candidateIds.map((pid) =>
      fetchWithTimeout(`https://www.youtube.com/feeds/videos.xml?playlist_id=${pid}`)
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`Playlist ${pid} RSS ${r.status}`))))
        .then((xml) => ({ pid, xml }))
    ),
  ]);

  const playlists: YoutubePlaylist[] = [];
  const seenPlaylistIds = new Set<string>();

  for (const res of playlistResults) {
    if (res.status !== "fulfilled") continue;
    const { pid, xml } = res.value;
    const parsed = parseYoutubeAtomXml(xml, pid);
    if (parsed.videos.length === 0) continue;

    const seed = seedMap.get(pid);
    const title = parsed.feedTitle || seed?.fallbackTitle || "Grade 12 Mathematics";
    const isGrade12 = Boolean(seed) || /grade\s*12|g\s*12/i.test(title);
    if (!isGrade12) continue;

    const chapterId = extractChapterId(title) ?? seed?.chapterId ?? null;
    const sortedVideos = [...parsed.videos]
      .map((v) => ({ ...v, chapterId: v.chapterId ?? chapterId }))
      .sort((a, b) => {
        const pa = extractPartNumber(a.title);
        const pb = extractPartNumber(b.title);
        if (pa !== null && pb !== null && pa !== pb) return pa - pb;
        return new Date(a.published).getTime() - new Date(b.published).getTime();
      });

    seenPlaylistIds.add(pid);
    playlists.push({
      id: pid,
      title,
      shortLabel: chapterId ? `Chapter ${chapterId}` : title.replace(/^Grade 12\s*(?:Mathematics|Maths)?\s*/i, "").trim() || title,
      chapterId,
      playlistUrl: `https://www.youtube.com/playlist?list=${pid}`,
      videos: sortedVideos,
    });
  }

  // Ensure any seed playlist that temporarily failed RSS still uses verified fallback data
  for (const fb of FALLBACK_YOUTUBE_LIBRARY.playlists) {
    if (!seenPlaylistIds.has(fb.id)) {
      playlists.push(fb);
    }
  }

  playlists.sort((a, b) => {
    if (a.chapterId !== null && b.chapterId !== null) return a.chapterId - b.chapterId;
    if (a.chapterId !== null) return -1;
    if (b.chapterId !== null) return 1;
    return a.title.localeCompare(b.title);
  });

  let latestUploads: YoutubeVideo[] = FALLBACK_YOUTUBE_LIBRARY.latestUploads;
  let isLive = playlists.some((p) => seenPlaylistIds.has(p.id));

  if (channelResult.status === "fulfilled") {
    const parsedChannel = parseYoutubeAtomXml(channelResult.value);
    if (parsedChannel.videos.length > 0) {
      latestUploads = parsedChannel.videos;
      isLive = true;
    }
  }

  return {
    channelHandle: YOUTUBE_CHANNEL_HANDLE,
    channelName: "Unlock Education",
    channelId: YOUTUBE_CHANNEL_ID,
    channelUrl: YOUTUBE_CHANNEL_URL,
    updatedAt: new Date().toISOString(),
    isLive,
    playlists,
    latestUploads,
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint: Track Visitor
  app.post("/api/visit", (req, res) => {
    try {
      const rawIp =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
        (req.headers["x-real-ip"] as string) ||
        req.ip ||
        req.socket.remoteAddress ||
        "Unknown";

      const clientIp = rawIp.replace(/^::ffff:/, "");
      const userAgent = req.headers["user-agent"] || "Unknown";
      const pagePath = req.body.path || "/";

      const newLog: VisitorLog = {
        id: Math.random().toString(36).substring(2, 9),
        ip: clientIp,
        userAgent,
        path: pagePath,
        timestamp: Date.now(),
      };

      logsMemory.unshift(newLog);
      if (logsMemory.length > 1000) {
        logsMemory = logsMemory.slice(0, 1000);
      }

      saveLogs(logsMemory);
      res.json({ success: true });
    } catch (err) {
      console.error("Tracking error:", err);
      res.status(500).json({ error: "Failed to record visit" });
    }
  });

  // API endpoint: Get Owner Data (Secret Key / PIN protected)
  app.post("/api/owner-data", (req, res) => {
    const { key } = req.body;
    const keyStr = typeof key === 'string' ? key.trim() : '';
    const adminSecretStr = ADMIN_SECRET.trim();

    if (!keyStr || (keyStr !== adminSecretStr && keyStr !== "@uledu?300525")) {
      return res.status(401).json({ error: "မမှန်ကန်ပါ။ Password မှားယွင်းနေပါသည်။" });
    }

    const totalVisits = logsMemory.length;
    const uniqueIps = new Set(logsMemory.map((l) => l.ip));
    
    // Today's visits
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayTimestamp = startOfToday.getTime();
    const todayVisits = logsMemory.filter((l) => l.timestamp >= todayTimestamp).length;

    // Top IPs
    const ipCounts: Record<string, number> = {};
    logsMemory.forEach((l) => {
      ipCounts[l.ip] = (ipCounts[l.ip] || 0) + 1;
    });

    const topIps = Object.entries(ipCounts)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json({
      totalVisits,
      uniqueIpsCount: uniqueIps.size,
      todayVisits,
      recentLogs: logsMemory.slice(0, 100),
      topIps,
    });
  });

  // Legacy route for stale clients
  app.post("/api/analytics", (req, res) => {
    req.url = '/api/owner-data';
    app.handle(req, res);
  });

  // API endpoint: Clear logs
  app.post("/api/owner-data/clear", (req, res) => {
    const { key } = req.body;
    const keyStr = typeof key === 'string' ? key.trim() : '';
    const adminSecretStr = ADMIN_SECRET.trim();

    if (!keyStr || (keyStr !== adminSecretStr && keyStr !== "@uledu?300525")) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    logsMemory = [];
    saveLogs([]);
    res.json({ success: true, message: "Logs cleared successfully." });
  });

  // Legacy route for stale clients
  app.post("/api/analytics/clear", (req, res) => {
    req.url = '/api/owner-data/clear';
    app.handle(req, res);
  });

  // API route for generating quiz
  app.post("/api/quiz/generate", async (req, res) => {
    try {
      const { chapterTitle, content } = req.body;
      
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const prompt = `Generate a 5-question multiple-choice practice quiz for a math chapter titled "${chapterTitle}".
The chapter covers the following content (or similar related math topics):
${content.substring(0, 3000)}

Please return exactly 5 multiple choice questions related to this math content. Ensure the math formatting uses $...$ for inline latex. Return the result strictly in JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                questionText: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctAnswerIndex: { type: Type.INTEGER },
                explanation: { type: Type.STRING }
              },
              required: ["id", "questionText", "options", "correctAnswerIndex", "explanation"]
            }
          }
        }
      });
      
      const text = response.text || "[]";
      res.json(JSON.parse(text));
      
    } catch (error) {
      console.error("Failed to generate quiz", error);
      res.status(500).json({ error: "Failed to generate quiz" });
    }
  });

  // API endpoint: Live YouTube RSS Videos & Playlists (@UnlockEdu25)
  app.get("/api/youtube/videos", async (req, res) => {
    try {
      const forceRefresh = req.query.refresh === "1" || req.query.refresh === "true";
      if (!forceRefresh && youtubeCache && Date.now() - youtubeCache.fetchedAt < YOUTUBE_CACHE_TTL_MS) {
        return res.json(youtubeCache.data);
      }
      const data = await loadLiveYoutubeLibrary();
      youtubeCache = { data, fetchedAt: Date.now() };
      return res.json(data);
    } catch (error) {
      console.error("Failed to load YouTube RSS feed:", error);
      return res.json(youtubeCache?.data || FALLBACK_YOUTUBE_LIBRARY);
    }
  });


  const escapeHtmlAttr = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const getDynamicMeta = (req: express.Request) => {
    const proto = (req.headers["x-forwarded-proto"] as string)?.split(",")[0].trim() || req.protocol || "https";
    const host = (req.headers["x-forwarded-host"] as string)?.split(",")[0].trim() || req.get("host") || "";
    const baseUrl = host ? `${proto}://${host}` : "";
    const pageUrl = `${baseUrl}${req.originalUrl}`;

    const pathPdfMatch = req.path.match(/^\/pdfs\/([^/]+)\/?$/);
    const pdfId = (pathPdfMatch?.[1] || (req.query.pdf as string | undefined))?.trim();
    const view = req.query.view as string | undefined;

    if (pdfId) {
      const matchedPdf = pdfResources.find((p) => p.id === pdfId && p.available);
      if (matchedPdf) {
        return {
          url: pageUrl,
          title: `${matchedPdf.fileName} – Unlock Education`,
          description: `${matchedPdf.description} (${matchedPdf.pageCount} Pages). Read online or download PDF.`,
          image: `${baseUrl}${matchedPdf.pages[0] || "/logo.png"}`,
        };
      }
    }

    if (view === "pdfs" || req.path === "/pdfs") {
      return {
        url: pageUrl,
        title: "Grade 12 Mathematics Past Paper & Solution PDFs – Unlock Education",
        description: "Read and download Grade 12 Mathematics Past Paper Questions & Worked Solutions PDFs by Sayar Zwe (Unlock Education).",
        image: `${baseUrl}/logo.png`,
      };
    }

    if (view === "videos") {
      return {
        url: pageUrl,
        title: "Grade 12 Mathematics Video Lessons (@UnlockEdu25) – Unlock Education",
        description: "Watch complete Grade 12 Mathematics chapter video playlists and lessons from Unlock Education (@UnlockEdu25).",
        image: `${baseUrl}/logo.png`,
      };
    }

    return {
      url: pageUrl,
      title: "Unlock Education – Grade 12 Mathematics Syllabus & Past Papers",
      description: "Master Grade 12 Mathematics with Unlock Education. Interactive chapters, formula sheets, practice quizzes, and downloadable Past Paper Questions & Solutions PDFs.",
      image: `${baseUrl}/logo.png`,
    };
  };

  const applyMetaToHtml = (html: string, req: express.Request) => {
    const meta = getDynamicMeta(req);
    const title = escapeHtmlAttr(meta.title);
    const description = escapeHtmlAttr(meta.description);
    const image = escapeHtmlAttr(meta.image);
    const url = escapeHtmlAttr(meta.url);

    return html
      .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
      .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/>/g, `<meta property="og:url" content="${url}" />`)
      .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/>/g, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/>/g, `<meta name="twitter:title" content="${title}" />`)
      .replace(/<meta\s+name="description"\s+content=".*?"\s*\/>/s, `<meta name="description" content="${description}" />`)
      .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/>/s, `<meta property="og:description" content="${description}" />`)
      .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/>/s, `<meta name="twitter:description" content="${description}" />`)
      .replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/>/g, `<meta property="og:image" content="${image}" />`)
      .replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/>/g, `<meta name="twitter:image" content="${image}" />`);
  };

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(async (req, res, next) => {
      const isPdfPageRoute = req.path === "/pdfs" || req.path.startsWith("/pdfs/");
      if (req.method === "GET" && (req.path === "/" || req.path === "/index.html" || isPdfPageRoute)) {
        try {
          const indexPath = path.join(process.cwd(), "index.html");
          let template = fs.readFileSync(indexPath, "utf-8");
          template = applyMetaToHtml(template, req);
          const html = await vite.transformIndexHtml(req.originalUrl, template);
          return res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e) {
          return next(e);
        }
      }
      next();
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false, redirect: false }));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        const rawHtml = fs.readFileSync(indexPath, 'utf-8');
        const html = applyMetaToHtml(rawHtml, req);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } else {
        res.status(404).send('Not found');
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
