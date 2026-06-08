import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDb, isDbReady } from "./db.js";
import authRoutes from "./routes/auth.js";
import registrationRoutes from "./routes/registrations.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(",") || "*",
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    db: isDbReady() ? "connected" : "disconnected",
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
      "Check MONGODB_URI and Atlas Network Access (allow 0.0.0.0/0 for Render)."
    );
    console.error("The API will start, but database operations will return 503.");
  }

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

start();
