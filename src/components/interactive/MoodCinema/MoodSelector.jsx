import { motion, AnimatePresence } from 'framer-motion';
import { MOODS } from '../../../data/moods';

export default function MoodSelector({ moodId, onChange, mood, context = 'quotes' }) {
  const tagline = context === 'movies' ? mood.movieTagline : mood.quoteTagline;

  return (
    <div className="mc-mood-block">
      <h4 className="mc-mood-block-label">Your mood</h4>
      <div className="mc-mood-grid" role="listbox" aria-label="Select mood">
        {MOODS.map((m) => (
          <button
            key={m.id}
            type="button"
            role="option"
            aria-selected={moodId === m.id}
            className={`mc-mood-btn ${moodId === m.id ? 'mc-mood-btn--active' : ''}`}
            onClick={() => onChange(m.id)}
            data-cursor="pointer"
          >
            <span className="mc-mood-emoji" aria-hidden="true">{m.emoji}</span>
            <span className="mc-mood-label">{m.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={`${context}-${moodId}`}
          className="mc-mood-tagline"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
        >
          {tagline}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
