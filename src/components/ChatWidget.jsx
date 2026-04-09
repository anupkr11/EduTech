import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import API from "../api/api";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
  { role: "bot", text: "Hi 👋 I'm EduLearn AI. Ask me anything!" }
]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef();

  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  // GROQ API CALL 
  const fetchAIResponse = async (prompt) => {
  try {
    setLoading(true);

    const res = await API.post("/ai/chat", {
      message: prompt,
    });

    return res.data.reply;

  } catch (err) {
    console.error(err);
    return "⚠️ Something went wrong. Try again.";
  } finally {
    setLoading(false);
  }
};
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    // AI reply
    const aiText = await fetchAIResponse(input);

    const botMsg = { role: "bot", text: aiText };
    setMessages((prev) => [...prev, botMsg]);
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50 cursor-pointer"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {/* CHAT BOX */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 font-semibold">
            EduLearn AI Assistant
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[75%] text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* LOADING */}
            {loading && (
              <div className="text-gray-500 text-sm animate-pulse">
                AI is typing...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 border px-3 py-2 rounded-lg focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-700 transition disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}