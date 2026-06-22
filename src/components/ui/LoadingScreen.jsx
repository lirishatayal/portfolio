import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';

const LoadingOrb = lazy(() =>
  import('../three/LoadingOrb').then((m) => ({ default: m.LoadingOrb }))
);

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 500);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (done) {
      const timeout = setTimeout(onComplete, 800);
      return () => clearTimeout(timeout);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-space-950"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="w-48 h-48 mb-8">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Suspense fallback={null}>
                <LoadingOrb />
              </Suspense>
            </Canvas>
          </div>

          <motion.h1
            className="font-display text-2xl md:text-3xl font-bold gradient-text mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Lirisha Tayal
          </motion.h1>

          <div className="w-64 h-1 bg-space-800 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <span className="font-mono text-sm text-neon-cyan/60">
            Initializing cosmos... {Math.min(Math.round(progress), 100)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
