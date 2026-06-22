import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { getChatResponse } from '../../data/chatResponses';
import { looksLikeTypo } from '../../utils/gibberishDetection';

const MAX_INPUT_LENGTH = 250;
const MIN_INPUT_LENGTH = 3;

const suggestions = [
  'What are your skills?',
  'Tell me about your experience',
  'Show me your projects',
  'How can I contact you?',
];

const validationMessages = {
  too_short: 'Please type at least 3 characters.',
  too_long: `Keep your message under ${MAX_INPUT_LENGTH} characters.`,
  no_letters: 'Use words rather than symbols or numbers only.',
  gibberish: 'This seems like a typo. Try asking something about me.',
};

function validateChatInput(text) {
  const trimmed = text.trim().replace(/\s+/g, ' ');

  if (trimmed.length < MIN_INPUT_LENGTH) {
    return { ok: false, reason: 'too_short' };
  }

  if (trimmed.length > MAX_INPUT_LENGTH) {
    return { ok: false, reason: 'too_long' };
  }

  if (!/[a-zA-Z]/.test(trimmed)) {
    return { ok: false, reason: 'no_letters' };
  }

  if (looksLikeTypo(trimmed)) {
    return { ok: false, reason: 'gibberish' };
  }

  const letters = (trimmed.match(/[a-zA-Z]/g) || []).length;
  if (letters / trimmed.length < 0.3) {
    return { ok: false, reason: 'gibberish' };
  }

  return { ok: true, value: trimmed };
}

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
  const [inputError, setInputError] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    if (typing) return;

    const validation = validateChatInput(text);
    if (!validation.ok) {
      setInputError(validationMessages[validation.reason]);
      return;
    }

    setInputError('');
    const userMsg = { role: 'user', text: validation.value };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

    const response = getChatResponse(validation.value);
    setTyping(false);
    setMessages((prev) => [...prev, { role: 'assistant', text: response }]);
  };

  const canSend = input.trim().length > 0 && !typing;

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
            type="button"
            onClick={() => sendMessage(s)}
            disabled={typing}
            className="px-3 py-1 rounded-full glass text-xs font-mono text-slate-400 hover:text-neon-cyan transition-colors disabled:opacity-50 disabled:pointer-events-none"
            data-cursor="pointer"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex flex-col gap-1.5"
      >
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (inputError) setInputError('');
            }}
            placeholder="Ask about me..."
            maxLength={MAX_INPUT_LENGTH}
            disabled={typing}
            aria-invalid={Boolean(inputError)}
            aria-describedby={inputError ? 'chat-input-error' : undefined}
            className={`flex-1 px-4 py-2 rounded-xl glass font-mono text-sm focus:outline-none disabled:opacity-60 ${
              inputError
                ? 'border border-red-400/40 focus:border-red-400/60'
                : 'focus:border-neon-cyan/50'
            }`}
          />
          <button
            type="submit"
            disabled={!canSend}
            className="p-2 rounded-xl bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            data-cursor="pointer"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
        {inputError && (
          <p id="chat-input-error" className="font-mono text-xs text-red-400/90 px-1">
            {inputError}
          </p>
        )}
      </form>
    </div>
  );
}
