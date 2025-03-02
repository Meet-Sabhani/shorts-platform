"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AIChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch chat history from MongoDB
    const fetchMessages = async () => {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    if (userMessage) {
      setMessages((prev) => [...prev, userMessage]);
    }
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const { response: aiResponse } = await response.json();
      if (aiResponse) {
        setMessages((prev) => [...prev, { role: "ai", content: aiResponse }]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen background p-4">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardHeader className="primary text-white p-4 rounded-t-2xl">
          <CardTitle className="text-center text-xl font-bold">
            AI Chat Bot
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ScrollArea className="h-80 border p-2 rounded-md bg-white overflow-y-auto">
            {messages.length &&
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg ${
                    msg.role === "user" ? "bg-blue-100 self-end" : "bg-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
          </ScrollArea>
          <div className="flex gap-2 mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Send"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
