import { useState, useEffect } from 'react';

export default function TypewriterQuote({ text, speed = 28, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    if (!text) return undefined;

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <span aria-live="polite">
      {displayed}
      {!done && <span className="mc-typewriter-cursor" aria-hidden="true">|</span>}
    </span>
  );
}
