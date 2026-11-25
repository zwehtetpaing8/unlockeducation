const YOUTUBE_CHANNEL_HANDLE = "@UnlockEdu25";
const YOUTUBE_CHANNEL_ID = "UCRjeOhv_PQNoE8bJM26Ea9g";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@UnlockEdu25";

const YOUTUBE_SEED_PLAYLISTS: Array<{ id: string; fallbackTitle: string; chapterId: number }> = [
  { id: "PLSJTOXTAyfjg", fallbackTitle: "Grade 12 Mathematics Chapter 1", chapterId: 1 },
  { id: "PLVopMG9bjvM6G9jgqXtSAfFsPBoe2cFPB", fallbackTitle: "Grade 12 Mathematics Chapter 3", chapterId: 3 },
  { id: "PLJtCmidavJSY", fallbackTitle: "Grade 12 Mathematics Chapter 9", chapterId: 9 },
];

const YOUTUBE_FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  Cookie: "CONSENT=YES+cb",
};

interface YoutubeVideo {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  playlistId?: string;
  chapterId?: number | null;
}

interface YoutubePlaylist {
  id: string;
  title: string;
  shortLabel: string;
  chapterId: number | null;
  playlistUrl: string;
  videos: YoutubeVideo[];
}

interface YoutubeLibraryData {
  channelHandle: string;
  channelName: string;
  channelId: string;
  channelUrl: string;
  updatedAt: string;
  isLive: boolean;
  playlists: YoutubePlaylist[];
  latestUploads: YoutubeVideo[];
}

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

function parseRelativeYoutubeTime(raw: string): string | null {
  if (!raw) return null;
  const text = raw.replace(/\u00a0/g, " ").toLowerCase().trim();
  if (/just now|moments? ago/.test(text)) {
    return new Date().toISOString();
  }
  const match = text.match(/(\d+)\s*(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|wks?|w|months?|mos?|years?|yrs?|y)\b/);
  if (!match) return null;
  const value = parseInt(match[1], 10);
  if (Number.isNaN(value) || value < 0) return null;
  const unit = match[2];
  let ms = 0;
  if (unit === "s" || unit.startsWith("sec")) ms = value * 1000;
  else if (unit === "m" || unit.startsWith("min")) ms = value * 60 * 1000;
  else if (unit === "h" || unit.startsWith("hr") || unit.startsWith("hour")) ms = value * 60 * 60 * 1000;
  else if (unit === "d" || unit.startsWith("day")) ms = value * 24 * 60 * 60 * 1000;
  else if (unit === "w" || unit.startsWith("wk") || unit.startsWith("week")) ms = value * 7 * 24 * 60 * 60 * 1000;
  else if (unit.startsWith("mo")) ms = value * 30 * 24 * 60 * 60 * 1000;
  else if (unit === "y" || unit.startsWith("yr") || unit.startsWith("year")) ms = value * 365 * 24 * 60 * 60 * 1000;
  if (ms <= 0) return null;
  return new Date(Date.now() - ms).toISOString();
}

function extractRelativePublishedFromRenderer(lvm: any, vr: any): string {
  const candidates: string[] = [];
  if (typeof vr?.publishedTimeText?.simpleText === "string") {
    candidates.push(vr.publishedTimeText.simpleText);
  }
  const rows = lvm?.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows;
  if (Array.isArray(rows)) {
    for (const row of rows) {
      const parts = row?.metadataParts;
      if (!Array.isArray(parts)) continue;
      for (const part of parts) {
        if (typeof part?.accessibilityLabel === "string") candidates.push(part.accessibilityLabel);
        if (typeof part?.text?.content === "string") candidates.push(part.text.content);
      }
    }
  }
  for (const cand of candidates) {
    if (/\bago\b|just now/i.test(cand)) {
      const parsed = parseRelativeYoutubeTime(cand);
      if (parsed) return parsed;
    }
  }
  return "";
}

async function fetchWithTimeout(url: string, timeoutMs = 5500): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      headers: YOUTUBE_FETCH_HEADERS,
      signal: controller.signal,
    });
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

async function fetchLatestFromChannelVideosPage(): Promise<YoutubeVideo[]> {
  try {
    const res = await fetchWithTimeout(`${YOUTUBE_CHANNEL_URL}/videos`, 5000);
    if (!res.ok) return [];
    const html = await res.text();
    const match = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/);
    if (!match) return [];
    const data = JSON.parse(match[1]);
    const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
    const videosTab = tabs.find((t: any) => t?.tabRenderer?.selected);
    const items = videosTab?.tabRenderer?.content?.richGridRenderer?.contents || [];
    const found: YoutubeVideo[] = [];

    for (const item of items.slice(0, 15)) {
      const content = item?.richItemRenderer?.content;
      const lvm = content?.lockupViewModel;
      const vr = content?.videoRenderer;
      const id: string | undefined = lvm?.contentId || vr?.videoId;
      const title: string | undefined =
        lvm?.metadata?.lockupMetadataViewModel?.title?.content ||
        vr?.title?.runs?.map((r: any) => r.text).join("") ||
        vr?.title?.simpleText;

      if (!id || !title) continue;
      found.push({
        id,
        title: title.trim(),
        published: extractRelativePublishedFromRenderer(lvm, vr),
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        chapterId: extractChapterId(title),
      });
    }
    return found;
  } catch {
    return [];
  }
}

async function discoverGrade12PlaylistIds(): Promise<string[]> {
  const discovered = new Set<string>(YOUTUBE_SEED_PLAYLISTS.map((p) => p.id));
  try {
    const res = await fetchWithTimeout(`${YOUTUBE_CHANNEL_URL}/playlists`, 4500);
    if (!res.ok) return Array.from(discovered);
    const html = await res.text();
    const idMatches = html.matchAll(/"(?:playlistId|contentId)"\s*:\s*"(PL[A-Za-z0-9_-]{10,40})"/g);
    for (const m of idMatches) {
      if (m[1]) {
        discovered.add(m[1]);
        if (discovered.size >= 15) break;
      }
    }
  } catch {
    // Non-fatal
  }
  return Array.from(discovered);
}

export default async function handler(req: any, res: any) {
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const [candidateIds, channelRssResult, pageVideosResult] = await Promise.all([
      discoverGrade12PlaylistIds(),
      fetchWithTimeout(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`)
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`Channel RSS ${r.status}`))))
        .then((value) => ({ status: "fulfilled" as const, value }))
        .catch((reason) => ({ status: "rejected" as const, reason })),
      fetchLatestFromChannelVideosPage(),
    ]);

    const seedMap = new Map(YOUTUBE_SEED_PLAYLISTS.map((s) => [s.id, s]));
    const playlistResults = await Promise.allSettled(
      candidateIds.map((pid) =>
        fetchWithTimeout(`https://www.youtube.com/feeds/videos.xml?playlist_id=${pid}`)
          .then((r) => (r.ok ? r.text() : Promise.reject(new Error(`Playlist ${pid} RSS ${r.status}`))))
          .then((xml) => ({ pid, xml }))
      )
    );

    const playlists: YoutubePlaylist[] = [];
    for (const result of playlistResults) {
      if (result.status !== "fulfilled") continue;
      const { pid, xml } = result.value;
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

      playlists.push({
        id: pid,
        title,
        shortLabel: chapterId
          ? `Chapter ${chapterId}`
          : title.replace(/^Grade 12\s*(?:Mathematics|Maths)?\s*/i, "").trim() || title,
        chapterId,
        playlistUrl: `https://www.youtube.com/playlist?list=${pid}`,
        videos: sortedVideos,
      });
    }

    let latestUploads: YoutubeVideo[] = [];
    let isLive = playlists.length > 0;

    if (channelRssResult.status === "fulfilled") {
      const parsedChannel = parseYoutubeAtomXml(channelRssResult.value);
      if (parsedChannel.videos.length > 0) {
        latestUploads = parsedChannel.videos;
        isLive = true;
      }
    }

    if (pageVideosResult.length > 0) {
      isLive = true;
      const existingIds = new Set(latestUploads.map((v) => v.id));
      const brandNew: YoutubeVideo[] = [];
      const nowMs = Date.now();
      for (let i = 0; i < pageVideosResult.length; i++) {
        const v = pageVideosResult[i];
        if (existingIds.has(v.id)) {
          break;
        }
        brandNew.push({
          ...v,
          published: v.published || new Date(nowMs - i * 1000).toISOString(),
        });
        existingIds.add(v.id);
      }
      if (brandNew.length > 0) {
        latestUploads = [...brandNew, ...latestUploads];
      }
    }

    for (const v of latestUploads) {
      if (v.chapterId && /grade\s*12|g\s*12/i.test(v.title) && extractPartNumber(v.title) !== null) {
        const targetPl = playlists.find((pl) => pl.chapterId === v.chapterId);
        if (targetPl && !targetPl.videos.some((pv) => pv.id === v.id)) {
          targetPl.videos.push({ ...v, playlistId: targetPl.id });
          targetPl.videos.sort((a, b) => {
            const pa = extractPartNumber(a.title);
            const pb = extractPartNumber(b.title);
            if (pa !== null && pb !== null && pa !== pb) return pa - pb;
            return new Date(a.published || 0).getTime() - new Date(b.published || 0).getTime();
          });
        }
      }
    }

    playlists.sort((a, b) => {
      if (a.chapterId !== null && b.chapterId !== null) return a.chapterId - b.chapterId;
      if (a.chapterId !== null) return -1;
      if (b.chapterId !== null) return 1;
      return a.title.localeCompare(b.title);
    });

    const forceRefresh = req.query?.refresh === "1" || req.query?.refresh === "true";
    res.setHeader(
      "Cache-Control",
      forceRefresh || latestUploads.length === 0
        ? "no-store"
        : "public, s-maxage=60, stale-while-revalidate=120"
    );

    const payload: YoutubeLibraryData = {
      channelHandle: YOUTUBE_CHANNEL_HANDLE,
      channelName: "Unlock Education",
      channelId: YOUTUBE_CHANNEL_ID,
      channelUrl: YOUTUBE_CHANNEL_URL,
      updatedAt: new Date().toISOString(),
      isLive,
      playlists,
      latestUploads,
    };

    return res.status(200).json(payload);
  } catch {
    res.setHeader("Cache-Control", "no-store");
    return res.status(503).json({ error: "Failed to load YouTube videos" });
  }
}
