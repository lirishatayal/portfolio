import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleOver = (e) => {
      const target = e.target;
      if (target.closest('a, button, [data-cursor="pointer"], input, textarea, select')) {
        setHovering(true);
      }
    };

    const handleOut = () => setHovering(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [visible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            className="custom-cursor fixed top-0 left-0 w-4 h-4 rounded-full border border-neon-cyan pointer-events-none z-[9999] mix-blend-difference"
            animate={{
              x: position.x - 8,
              y: position.y - 8,
              scale: hovering ? 2.5 : 1,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
          />
          <motion.div
            className="custom-cursor fixed top-0 left-0 w-8 h-8 rounded-full border border-neon-purple/30 pointer-events-none z-[9998]"
            animate={{
              x: position.x - 16,
              y: position.y - 16,
              scale: hovering ? 1.5 : 1,
            }}
            transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.8 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
