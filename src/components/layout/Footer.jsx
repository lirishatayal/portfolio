import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-10 md:py-12 pb-28 md:pb-12">
      <div className="page-container flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-mono text-xs text-slate-500">
          © {new Date().getFullYear()} Lirisha Tayal. Crafted with React & Three.js
        </p>
        <motion.p
          className="font-mono text-xs text-neon-cyan/40"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          ↑↑↓↓←→←→BA
        </motion.p>
      </div>
    </footer>
  );
}
