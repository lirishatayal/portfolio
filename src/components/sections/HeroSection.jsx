import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { developer } from '../../data/portfolio';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <SectionWrapper id="hero" variant="hero">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="hero-badge">
            <Sparkles size={14} className="shrink-0" />
            Frontend Developer
          </span>
        </motion.div>

        <motion.h1
          className="type-display gradient-text neon-text px-2"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {developer.name}
        </motion.h1>

        <motion.div
          className="hero-taglines type-body-lg text-slate-400 mx-auto px-2 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {developer.taglines.map((line, index) => (
            <p
              key={line}
              className={index === 0 ? 'hero-taglines__primary m-0' : 'm-0'}
            >
              {line}
            </p>
          ))}
        </motion.div>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <Button as="a" href="#projects" variant="primary" size="lg">
            Explore Projects
          </Button>
          <Button as="a" href="#contact" variant="secondary" size="lg">
            Get in Touch
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <a href="#about" aria-label="Scroll to about section" data-cursor="pointer">
          <ChevronDown className="text-neon-cyan/50" size={24} />
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
