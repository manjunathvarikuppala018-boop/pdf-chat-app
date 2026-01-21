import React, { useEffect, useRef, useState } from "react";
import { useDocuments } from "../context/DocumentContext";

export default function ChatPage() {
  const {
    activeDocument,
    getMessagesForActiveDoc,
    addMessageToActiveDoc,
  } = useDocuments();

  const messages = getMessagesForActiveDoc();
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !activeDocument) return;

    addMessageToActiveDoc({
      id: crypto.randomUUID(),
      text: input,
      from: "user",
    });

    addMessageToActiveDoc({
      id: crypto.randomUUID(),
      text: `Answer based on "${activeDocument.name}"`,
      from: "bot",
    });

    setInput("");
  };

  if (!activeDocument) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a document to start chatting
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-white">
        <h1 className="text-2xl font-semibold">Chat</h1>
        <p className="text-sm text-gray-500">
          Chatting with {activeDocument.name}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-28">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-24">
            Ask a question to start chatting
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${
                msg.from === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input fixed at bottom */}
      <div className="border-t bg-white px-6 py-4">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask a question about the document..."
            className="flex-1 rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
