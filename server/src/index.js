import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDb, ensureDb, isDbReady } from "./db.js";
import authRoutes from "./routes/auth.js";
import registrationRoutes from "./routes/registrations.js";

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (allowedOrigins.length === 0) return true;
  if (allowedOrigins.includes(origin)) return true;
  // Vercel production + preview deployments
  if (/^https:\/\/[\w-]+\.vercel\.app$/.test(origin)) return true;
  return false;
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) return callback(null, true);
      console.warn("CORS blocked origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  const connected = isDbReady() || (await ensureDb());
  res.json({
    status: "ok",
    db: connected ? "connected" : "disconnected",
    time: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/registrations", registrationRoutes);

app.use((_req, res) => res.status(404).json({ message: "Not found" }));

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
});

async function start() {
  try {
    await connectDb();
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.error(
      "Check MONGODB_URI on Render and Atlas Network Access (0.0.0.0/0)."
    );
    console.error("The API will start and retry DB on each request.");
  }

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

start();
