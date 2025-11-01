

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send, Bot, User, Trash2 } from "lucide-react";

function ChatAi({ problem }) {
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [
        {
          text: "Hey! I'm CodeVerse Bot 👋 Ready to tackle this problem together? What would you like to work on first?",
        },
      ],
      timestamp: new Date(),
      color: "bg-primary text-primary-content",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Colors to cycle through for bot messages
  const botColors = [
    "bg-primary text-primary-content",
    "bg-secondary text-secondary-content",
    "bg-accent text-accent-content",
    "bg-info text-info-content",
    "bg-success text-success-content",
    "bg-warning text-warning-content",
    "bg-error text-error-content",
    "bg-neutral text-neutral-content",
  ];

  const clearChat = () => {
    setMessages([
      {
        role: "model",
        parts: [
          {
            text: "Chat cleared! 🧹 I'm ready to help you with this problem. What would you like to discuss?",
          },
        ],
        timestamp: new Date(),
        color: "bg-primary text-primary-content",
      },
    ]);
    setError(null);
  };

  const onSubmit = async (data) => {
    if (!data.message.trim() || loading) return;

    const userMessage = {
      role: "user",
      parts: [{ text: data.message.trim() }],
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    reset();
    setLoading(true);
    setError(null);

    try {
      const updatedMessages = [...messages, userMessage];

      const response = await axiosClient.post("/ai/chat", {
        messages: updatedMessages,
        title: problem.title,
        description: problem.description,
        testCases: problem.visibleTestCases,
        startCode: problem.startCode,
      });

      // Pick a color for bot message based on number of bot messages
      const botMessageCount = updatedMessages.filter((m) => m.role === "model").length;
      const color = botColors[botMessageCount % botColors.length];

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: response.data.message }],
          timestamp: new Date(),
          color,
        },
      ]);
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to get response. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [
            {
              text: "⚠️ Sorry, I'm having trouble connecting. Please check your internet and try again.",
            },
          ],
          timestamp: new Date(),
          color: "bg-error text-error-content",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px] bg-base-100 rounded-lg border border-base-300 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-200 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-content rounded-full">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-base-content">CodeVerse Bot</h3>
            <p className="text-xs text-base-content/70">AI Coding Assistant</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="btn btn-ghost btn-sm text-base-content/60 hover:text-error"
          title="Clear chat"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === "user" ? "bg-primary text-primary-content" : "bg-secondary text-secondary-content"
              }`}
            >
              {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block px-4 py-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-primary text-primary-content rounded-br-none"
                    : `${msg.color} rounded-bl-none border border-base-300`
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.parts[0].text}</p>
              </div>
              <div className={`text-xs text-base-content/50 mt-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-content flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="max-w-[80%]">
              <div className="inline-block px-4 py-3 rounded-2xl bg-base-200 text-base-content rounded-bl-none border border-base-300">
                <div className="flex items-center gap-2 text-sm">
                  <span className="loading loading-dots loading-sm"></span>
                  <span className="text-base-content/70">CodeVerse Bot is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mt-2">
          <div className="alert alert-error alert-sm">
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sticky bottom-0 p-4 bg-base-100 border-t border-base-300 rounded-b-lg"
      >
        <div className="flex items-center gap-2">
          <input
            placeholder="Ask CodeVerse Bot about the problem, code, or concepts..."
            className="input input-bordered flex-1 focus:input-primary"
            {...register("message", {
              required: "Message is required",
              minLength: { value: 2, message: "Message must be at least 2 characters" },
              maxLength: { value: 1000, message: "Message is too long" },
            })}
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary btn-square" disabled={loading || errors.message}>
            {loading ? <span className="loading loading-spinner loading-sm"></span> : <Send size={18} />}
          </button>
        </div>
        {errors.message && <p className="text-error text-xs mt-2 text-center">{errors.message.message}</p>}
      </form>
    </div>
  );
}

export default ChatAi;
