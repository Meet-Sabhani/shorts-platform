import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ["user", "ai"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
