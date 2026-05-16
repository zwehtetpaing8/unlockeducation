import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Simple API health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa", // Explicitly set to spa
    });
    
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);

    // Handle SPA fallback for development
    app.use("*", async (req, res, next) => {
      // Don't fallback for API routes
      if (req.originalUrl.startsWith("/api")) {
        return next();
      }

      const url = req.originalUrl;
      try {
        // Always read the latest index.html from root in dev
        let template = fs.readFileSync(
          path.resolve(process.cwd(), "index.html"),
          "utf-8"
        );

        // Apply Vite HTML transforms
        template = await vite.transformIndexHtml(url, template);

        // Send the transformed HTML back
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        if (e instanceof Error) {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  } else {
    // In production, serve from the dist folder
    // Since the server is bundled to dist/server.js, __dirname is already the dist folder
    const distPath = __dirname;
    
    // Serve static files first
    app.use(express.static(distPath, {
      index: false // We handle the index serving below for SPA support
    }));

    // Handle SPA fallback - send all requests to index.html
    app.get("*", (req, res, next) => {
      // Don't fallback for API routes
      if (req.originalUrl.startsWith("/api")) {
        return next();
      }
      
      const indexPath = path.join(distPath, "index.html");
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error("Error sending index.html:", err);
          res.status(500).send("Error loading application");
        }
      });
    });
  }

  // Final catch-all for anything else (e.g. unmatched API routes)
  app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
