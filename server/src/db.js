import mongoose from "mongoose";

export async function connectDb() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hackathon";

  // Fail fast instead of buffering queries for 10s then crashing the process.
  mongoose.set("bufferCommands", false);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("MongoDB connected");
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
