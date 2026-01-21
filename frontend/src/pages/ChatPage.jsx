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

  const sendMessage = async () => {
    if (!input.trim() || !activeDocument) return;

    const question = input;
    setInput("");

    // 1️⃣ USER MESSAGE
    addMessageToActiveDoc({
      id: crypto.randomUUID(),
      text: question,
      from: "user",
    });

    // 2️⃣ LOADING MESSAGE
    const loadingMessageId = crypto.randomUUID();
    addMessageToActiveDoc({
      id: loadingMessageId,
      text: "Generating response...",
      from: "bot",
      loading: true,
    });

    try {
      const response = await fetch("http://localhost:8081/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: activeDocument.id,
          question,
        }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      // 3️⃣ REPLACE LOADING WITH FINAL ANSWER
      addMessageToActiveDoc({
        id: loadingMessageId,
        replace: true,
        text: data.answer || "No response from server",
        from: "bot",
      });
    } catch (error) {
      // 4️⃣ REPLACE LOADING WITH ERROR
      addMessageToActiveDoc({
        id: loadingMessageId,
        replace: true,
        text: "Error generating response. Is Ollama running?",
        from: "bot",
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-white">
        <h1 className="text-2xl font-semibold">Chat</h1>
        {activeDocument && (
          <p className="text-sm text-gray-500">
            Chatting with {activeDocument.name}
          </p>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-28">
        {/* Empty State */}
        {activeDocument && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 gap-4">
            <p className="text-sm font-medium">Ask questions like:</p>
            <ul className="text-sm space-y-2">
              <li>• Summarize this document</li>
              <li>• What are the key points?</li>
              <li>• Explain this PDF in simple terms</li>
            </ul>
            <p className="text-xs text-gray-500">
              Tip: Be specific to get better answers
            </p>
          </div>
        )}

        {/* Messages */}
        {activeDocument &&
          messages.map((msg) => (
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
                {msg.loading ? (
                  <span className="italic text-gray-500 animate-pulse">
                    {msg.text}
                  </span>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
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
