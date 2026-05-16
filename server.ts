import express from "express";
import path from "path";
import fs from "fs";

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
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Handle SPA fallback for development
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        // Read index.html from root
        let template = fs.readFileSync(
          path.resolve(process.cwd(), "index.html"),
          "utf-8"
        );

        // Apply Vite HTML transforms. This injects the Vite HMR client, and
        // also applies HTML transforms from Vite plugins, e.g. global preambles
        // from @vitejs/plugin-react
        template = await vite.transformIndexHtml(url, template);

        // Send the transformed HTML back.
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        // If an error is caught, let Vite fix the stack trace so it maps back
        // to your actual source code.
        if (e instanceof Error) {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  } else {
    // In production, serve from the dist folder
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));

    // Handle SPA fallback - send all requests to index.html
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
