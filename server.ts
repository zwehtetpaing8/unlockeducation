import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import 'dotenv/config';
import axios from 'axios';

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



// ---------------------------------------------------------
// TELEGRAM VIDEO STREAMING API
// ---------------------------------------------------------
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// Route to stream video from Telegram

// Route to handle webhook for getting file_ids easily
app.post('/api/telegram-webhook', express.json(), async (req, res) => {
  if (!TELEGRAM_BOT_TOKEN) return res.sendStatus(200);

  console.log("WEBHOOK RECEIVED:", JSON.stringify(req.body, null, 2));

  const message = req.body?.message || req.body?.channel_post;
  if (!message) return res.sendStatus(200);

  const chatId = message.chat.id;

  // Check if there is a video or document
  const video = message.video || message.document || message.animation;
  
  // Match telegram post links like https://t.me/c/12345/67
  const linkMatch = message.text && message.text.match(/t\.me\/(?:c\/)?(\d+)\/(\d+)/);
  if (linkMatch) {
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: `Oops! I cannot download videos directly from a link because of Telegram's privacy rules for bots.\n\nPlease **forward** the actual video message to me, or send the video file directly.`
      });
      return res.sendStatus(200);
    } catch (e) {}
  }

  if (video) {
    const fileId = video.file_id;
    const fileName = video.file_name || 'Video File';
    
    try {
      // Send the file_id back to the user
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: `✅ Video Received!\n\n📄 **Name:** ${fileName}\n🔑 **file_id:** \n\n\`${fileId}\`\n\n(Tap the file_id to copy it)`,
        parse_mode: 'Markdown'
      });
    } catch (e) {
      console.error("Error sending message to Telegram:", e.message);
    }
  } else if (message.text === '/start') {
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: `👋 Hello! Send me a video and I will give you the file_id.`
      });
    } catch(e) {}
  } else {
     try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: `No video detected. Please send a Video file.`
      });
    } catch(e) {}
  }

  res.sendStatus(200);
});

// NEW: Direct link resolver
app.get('/api/resolve-telegram-link/:fileId', async (req, res) => {
  const fileId = req.params.fileId;
  if (!TELEGRAM_BOT_TOKEN) return res.status(500).json({ error: 'No token' });
  try {
    const fileRes = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`);
    if (!fileRes.data.ok) return res.status(404).json({ error: 'Not found' });
    const url = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${fileRes.data.result.file_path}`;
    res.json({ url });
  } catch (e) {
    res.status(500).json({ error: 'Error resolving' });
  }
});

app.get('/api/stream/telegram/:fileId', async (req, res) => {
  const fileId = req.params.fileId;
  if (!TELEGRAM_BOT_TOKEN) {
    return res.status(500).json({ error: 'Telegram Bot Token is not configured' });
  }

  try {
    // 1. Get file path from Telegram API
    const fileResponse = await axios.get(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`
    );

    if (!fileResponse.data.ok) {
      return res.status(404).json({ error: 'File not found on Telegram' });
    }

    const filePath = fileResponse.data.result.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;

    // 2. Stream the file to the client with Range support
    const range = req.headers.range;
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream',
      headers: range ? { Range: range } : {},
      validateStatus: (status) => status < 500, // Handle partial content manually if needed
    });

    // Forward headers from Telegram to support seeking (Range)
    res.status(response.status);
    if (response.headers['content-length']) res.setHeader('Content-Length', response.headers['content-length']);
    
    // Force video/mp4 content type for video files, because Telegram often sends application/octet-stream
    if (filePath.endsWith('.mp4') || filePath.endsWith('.mkv')) {
        res.setHeader('Content-Type', 'video/mp4');
    } else if (response.headers['content-type']) {
        res.setHeader('Content-Type', response.headers['content-type']);
    }
    if (response.headers['content-range']) res.setHeader('Content-Range', response.headers['content-range']);
    if (response.headers['accept-ranges']) res.setHeader('Accept-Ranges', response.headers['accept-ranges']);

    // Pipe the video stream directly to the client
    response.data.pipe(res);

  } catch (error) {
    console.error('Error streaming from Telegram:', error.message);
    res.status(500).json({ error: 'Failed to stream video' });
  }
});
// ---------------------------------------------------------


// Route to handle webhook for getting file_ids easily
app.post('/api/telegram-webhook', express.json(), async (req, res) => {
  if (!TELEGRAM_BOT_TOKEN) return res.sendStatus(200);

  const message = req.body?.message || req.body?.channel_post;
  if (!message) return res.sendStatus(200);

  const chatId = message.chat.id;

  // Check if there is a video or document
  const video = message.video || message.document || message.animation;
  
  if (video) {
    const fileId = video.file_id;
    const fileName = video.file_name || 'Video File';
    
    try {
      // Send the file_id back to the user
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: `✅ Video Received!\n\n📄 **Name:** ${fileName}\n🔑 **file_id:** \n\n\`${fileId}\`\n\n(Tap the file_id to copy it)`,
        parse_mode: 'Markdown'
      });
    } catch (e) {
      console.error("Error sending message to Telegram:", e.message);
    }
  }

  res.sendStatus(200);
});

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
