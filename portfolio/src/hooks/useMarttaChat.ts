"use client";

import { useCallback, useState } from "react";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type ChatStatus = "idle" | "loading" | "error";

const INTRO_MESSAGE =
  "Hi! I'm Martta's AI assistant. How can I help you explore Martta's work today? Here are some questions people like to ask her about.";

const MOCK_REPLY =
  "That's a great question. I'd love to talk about that — feel free to ask anything else, or reach out directly on LinkedIn.";

async function getAssistantReply(prompt: string): Promise<string> {
  // Placeholder for future API integration.
  void prompt;
  return MOCK_REPLY;
}

export function useMarttaChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: INTRO_MESSAGE },
  ]);
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<ChatStatus>("idle");

  const sendMessage = useCallback(async (text: string) => {
    const normalized = text.trim();
    if (!normalized) return;

    setStarted(true);
    setStatus("loading");
    setMessages((prev) => [...prev, { role: "user", content: normalized }]);

    try {
      const reply = await getAssistantReply(normalized);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, []);

  return {
    messages,
    started,
    status,
    sendMessage,
  };
}
