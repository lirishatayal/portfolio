import { useState, useEffect, useRef, useCallback } from 'react';

export function useKonamiCode(onActivate) {
  const sequence = useRef([]);
  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  const handleKey = useCallback(
    (e) => {
      sequence.current.push(e.code);
      if (sequence.current.length > code.length) {
        sequence.current.shift();
      }
      if (sequence.current.join(',') === code.join(',')) {
        sequence.current = [];
        onActivate?.();
      }
    },
    [onActivate, code]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);
}

export function useTypingEffect(text, speed = 50, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const index = useRef(0);

  useEffect(() => {
    setDisplayed('');
    index.current = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index.current < text.length) {
          setDisplayed(text.slice(0, index.current + 1));
          index.current++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return displayed;
}
