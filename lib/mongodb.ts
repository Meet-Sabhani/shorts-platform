import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

if (!MONGODB_URL) {
  throw new Error("Missing MONGODB_URL environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function ConnectToDatabase() {
  if (cached?.conn) {
    return cached?.conn;
  }

  if (cached?.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGODB_URL, opts)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.conn;
    console.log("🚀 ~ ConnectToDatabase ~ succedd fully:");
  } catch (error) {
    cached.promise = null;
    console.log("🚀 ~ ConnectToDatabase ~ error:", error);
    throw error;
  }

  return cached.conn;
}
