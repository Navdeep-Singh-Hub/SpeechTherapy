import mongoose from "mongoose";

let connecting = null;

export async function connectDb() {
  if (mongoose.connection.readyState === 1) return;

  if (connecting) return connecting;

  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hackathon";
  mongoose.set("bufferCommands", false);

  connecting = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .finally(() => {
      connecting = null;
    });

  return connecting;
}

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected — will reconnect on next request");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err.message);
});

export async function ensureDb() {
  if (mongoose.connection.readyState === 1) return true;
  try {
    await connectDb();
    return mongoose.connection.readyState === 1;
  } catch (err) {
    console.error("MongoDB reconnect failed:", err.message);
    return false;
  }
}

export function isDbReady() {
  return mongoose.connection.readyState === 1;
}

export function dbUnavailable(res) {
  return res.status(503).json({
    message:
      "Database is temporarily unavailable. Please try again in a moment.",
  });
}
