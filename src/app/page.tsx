"use client";

import { TamboProvider, useTamboThread, useTamboThreadInput } from "@tambo-ai/react";
import { components, tools, contextHelpers } from "@/lib/tambo";
import { Send, Brain, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

function ChatInterface() {
  const { thread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isPending) {
      submit();
    }
  };

  const suggestions = [
    "Show me my tasks for today",
    "Create a focus session for 25 minutes",
    "Analyze my productivity this week",
    "Show my calendar for this week",
    "Create a note about project ideas",
    "Track my daily habits",
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Personal Productivity Brain
              </h1>
              <p className="text-sm text-gray-600">
                AI-powered productivity assistant
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {thread.messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Welcome to Your Productivity Brain
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                I'm your AI assistant that adapts to your productivity needs. Tell
                me what you want to do, and I'll show you the right interface.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setValue(suggestion)}
                    className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-left border border-gray-200 hover:border-indigo-300"
                  >
                    <p className="text-sm text-gray-700">{suggestion}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            thread.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3xl ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white rounded-2xl rounded-br-sm"
                      : "bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-md"
                  } px-6 py-4`}
                >
                  {/* Text Content */}
                  {Array.isArray(message.content) ? (
                    message.content.map((part, i) =>
                      part.type === "text" ? (
                        <p key={i} className="whitespace-pre-wrap">
                          {part.text}
                        </p>
                      ) : null
                    )
                  ) : (
                    <p className="whitespace-pre-wrap">{String(message.content)}</p>
                  )}

                  {/* Rendered Component */}
                  {message.renderedComponent && (
                    <div className="mt-4">{message.renderedComponent}</div>
                  )}
                </div>
              </div>
            ))
          )}

          {isPending && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-sm shadow-md px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t shadow-lg sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Tell me what you want to do..."
              className="flex-1 px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-400"
              disabled={isPending}
            />
            <button
              type="submit"
              disabled={isPending || !value.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY || "demo_key"}
      components={components}
      tools={tools}
      contextHelpers={contextHelpers}
    >
      <ChatInterface />
    </TamboProvider>
  );
}