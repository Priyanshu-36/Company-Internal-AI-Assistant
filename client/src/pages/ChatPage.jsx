import { useEffect, useRef, useState } from "react";

import api from "../api/axios";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your Company Internal AI Assistant. Ask me anything about the company documents.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Auto scroll when new messages are added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (question) => {
    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const response = await api.post("/chat", {
        question,
      });

      const assistantMessage = {
        role: "assistant",
        content: response.data.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong while generating the response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-neutral-950 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900 px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-lg font-semibold">Company AI</h1>

          <p className="mt-1 text-xs text-neutral-400">
            Internal Knowledge Assistant
          </p>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-5 py-8">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {loading && (
          <div className="mx-auto w-full max-w-4xl">
            <div className="text-sm text-neutral-500">
              Searching company knowledge...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      {/* Input */}
      <div className="border-t border-neutral-800 bg-neutral-950 pt-4">
        <ChatInput onSend={sendMessage} loading={loading} />

        <p className="pb-3 text-center text-xs text-neutral-600">
          Answers are generated from internal company documents.
        </p>
      </div>
    </div>
  );
}

export default ChatPage;
