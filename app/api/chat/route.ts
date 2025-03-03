import { NextResponse } from "next/server";
import { VertexAI } from "@google-cloud/vertexai";
import { connectToDatabase } from "@/lib/db";
import Message from "@/models/message";

const projectId = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
const location = "us-central1";
const model = "gemini-1.5-flash-001";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message)
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );

    // Connect to MongoDB
    await connectToDatabase();

    // Save user message to MongoDB
    await Message.create({ role: "user", content: message });

    // Initialize Vertex AI
    const vertexAI = new VertexAI({ project: projectId, location });
    const generativeModel = vertexAI.getGenerativeModel({ model });
    const chat = generativeModel.startChat({});

    const responseStream = await chat.sendMessageStream(message);
    let aiResponse = "";

    for await (const item of responseStream.stream) {
      aiResponse += item.candidates?.[0]?.content?.parts?.[0]?.text || "";
    }

    // Save AI response to MongoDB
    await Message.create({ role: "ai", content: aiResponse });

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
