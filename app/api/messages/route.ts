import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Message from "@/models/message";

export async function GET() {
  try {
    await connectToDatabase(); // Ensure MongoDB is connected
    const messages = await Message.find().sort({ timestamp: 1 });

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
