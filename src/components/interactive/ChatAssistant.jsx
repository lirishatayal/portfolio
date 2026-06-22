import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { getChatResponse } from '../../data/chatResponses';

const suggestions = [
  'What are your skills?',
  'Tell me about your experience',
  'Show me your projects',
  'How can I contact you?',
];

function TypingIndicator() {
  return (
    <div className="flex gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-neon-cyan/60"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Lirisha's portfolio assistant. Ask me anything about skills, projects, or experience!" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

    const response = getChatResponse(text);
    setTyping(false);
    setMessages((prev) => [...prev, { role: 'assistant', text: response }]);
  };

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'assistant' ? 'bg-neon-cyan/20' : 'bg-neon-purple/20'
              }`}>
                {msg.role === 'assistant' ? <Bot size={16} className="text-neon-cyan" /> : <User size={16} className="text-neon-purple" />}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                msg.role === 'assistant' ? 'glass' : 'bg-neon-purple/10 border border-neon-purple/20'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="px-3 py-1 rounded-full glass text-xs font-mono text-slate-400 hover:text-neon-cyan transition-colors"
            data-cursor="pointer"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about me..."
          className="flex-1 px-4 py-2 rounded-xl glass font-mono text-sm focus:outline-none focus:border-neon-cyan/50"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 transition-colors"
          data-cursor="pointer"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
