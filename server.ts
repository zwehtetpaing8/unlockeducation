import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import 'dotenv/config';
import { pdfResources } from "./src/data/pdfResources";

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
