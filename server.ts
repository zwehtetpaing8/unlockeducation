import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import 'dotenv/config';

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
  app.post("/api/track", (req, res) => {
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

  // API endpoint: Get Analytics (Secret Key / PIN protected)
  app.post("/api/analytics", (req, res) => {
    const { key } = req.body;
    if (!key || (key !== ADMIN_SECRET && key !== "@uledu?300525")) {
      return res.status(401).json({ error: "Unauthorized. Invalid Secret Key or Password." });
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

  // API endpoint: Clear logs
  app.post("/api/analytics/clear", (req, res) => {
    const { key } = req.body;
    if (!key || (key !== ADMIN_SECRET && key !== "@uledu?300525")) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    logsMemory = [];
    saveLogs([]);
    res.json({ success: true, message: "Logs cleared successfully." });
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
