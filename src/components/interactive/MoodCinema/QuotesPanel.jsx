import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Copy, Check, Share2, MessageCircle, Bookmark } from 'lucide-react';
import { fetchMoodQuote } from '../../../services/quotes';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import TypewriterQuote from './TypewriterQuote';
import { QuoteSkeleton } from './Skeletons';

function shareQuote(quote, platform) {
  const text = `"${quote.content}" — ${quote.author}`;
  const encoded = encodeURIComponent(text);

  if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank', 'noopener,noreferrer');
  } else if (platform === 'whatsapp') {
    window.open(`https://wa.me/?text=${encoded}`, '_blank', 'noopener,noreferrer');
  }
}

export default function QuotesPanel({ moodId, shuffleKey }) {
  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [typewriterKey, setTypewriterKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [savedQuotes, setSavedQuotes] = useLocalStorage('mood-cinema-quotes', []);
  const lastQuoteIdRef = useRef(null);

  const loadQuote = useCallback(async (id, { force = false } = {}) => {
    setQuoteLoading(true);
    try {
      const excludeId = force ? lastQuoteIdRef.current : null;
      const data = await fetchMoodQuote(id, { excludeId });
      lastQuoteIdRef.current = data.id;
      setQuote(data);
      setTypewriterKey((k) => k + 1);
    } finally {
      setQuoteLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuote(moodId, { force: shuffleKey > 0 });
  }, [moodId, shuffleKey, loadQuote]);

  const shuffleQuote = () => loadQuote(moodId, { force: true });

  const toggleSavedQuote = useCallback(() => {
    if (!quote) return;
    setSavedQuotes((prev) => {
      const exists = prev.some((q) => q.id === quote.id);
      if (exists) return prev.filter((q) => q.id !== quote.id);
      return [...prev, { ...quote, savedAt: Date.now() }];
    });
  }, [quote, setSavedQuotes]);

  const isQuoteSaved = quote ? savedQuotes.some((q) => q.id === quote.id) : false;

  const copyQuote = async () => {
    if (!quote) return;
    try {
      await navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard denied */
    }
  };

  return (
    <div className="mc-tab-panel">
      <div className="mc-section-row">
        <h4 className="mc-inline-label">Your quote</h4>
        <button
          type="button"
          className="mc-icon-btn mc-icon-btn--shuffle"
          onClick={shuffleQuote}
          disabled={quoteLoading}
          aria-label="Shuffle quote"
          data-cursor="pointer"
        >
          <Shuffle size={14} className={quoteLoading ? 'animate-spin' : ''} />
          Shuffle
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${moodId}-${typewriterKey}`}
          className="mc-quote"
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{ duration: 0.35 }}
        >
          {quoteLoading ? (
            <QuoteSkeleton />
          ) : quote ? (
            <>
              <blockquote className="mc-quote-text">
                <TypewriterQuote key={typewriterKey} text={`"${quote.content}"`} />
              </blockquote>
              <cite className="mc-quote-author">— {quote.author}</cite>
              {quote.fallback && (
                <p className="mc-quote-fallback">Curated offline quote</p>
              )}
              <div className="mc-quote-actions">
                <button type="button" className="mc-icon-btn" onClick={copyQuote} data-cursor="pointer">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  type="button"
                  className="mc-icon-btn"
                  onClick={() => shareQuote(quote, 'twitter')}
                  data-cursor="pointer"
                >
                  <Share2 size={14} />
                  Share
                </button>
                <button
                  type="button"
                  className="mc-icon-btn"
                  onClick={() => shareQuote(quote, 'whatsapp')}
                  data-cursor="pointer"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </button>
                <button
                  type="button"
                  className={`mc-icon-btn ${isQuoteSaved ? 'mc-icon-btn--active' : ''}`}
                  onClick={toggleSavedQuote}
                  data-cursor="pointer"
                >
                  <Bookmark size={14} fill={isQuoteSaved ? 'currentColor' : 'none'} />
                  {isQuoteSaved ? 'Saved' : 'Save quote'}
                </button>
              </div>
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>

      {savedQuotes.length > 0 && (
        <section className="mc-saved-quotes">
          <h4 className="mc-inline-label">Saved quotes</h4>
          <div className="mc-saved-quotes-list">
            {savedQuotes.slice().reverse().map((q) => (
              <blockquote key={q.id} className="mc-saved-quote-item">
                <p>&ldquo;{q.content}&rdquo;</p>
                <cite>— {q.author}</cite>
              </blockquote>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
