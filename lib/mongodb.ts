import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

export async function connectDB() {
  if (connection.isConnected) {
    console.log("✅ Already connected to MongoDB.");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
    console.log("🚀 MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
