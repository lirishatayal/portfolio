import { motion } from 'framer-motion';
import { Sun, Moon, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const MODES = [
  {
    id: 'light',
    label: 'Light Mode',
    description: 'Bright background with readable contrast',
    icon: Sun,
    iconClass: 'text-amber-500',
    swatch: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
  },
  {
    id: 'dark',
    label: 'Dark Mode',
    description: 'Space theme with neon accents',
    icon: Moon,
    iconClass: 'text-neon-cyan',
    swatch: 'linear-gradient(135deg, #030014 0%, #1a1a3e 50%, #0a0a1a 100%)',
  },
];

export default function ThemeCustomizer() {
  const { mode, setMode } = useTheme();

  return (
    <div className="theme-customizer">
      <p className="theme-customizer-intro type-body-sm text-slate-400">
        Choose how the portfolio looks. Your preference is saved automatically.
      </p>

      <div className="theme-customizer-grid">
        {MODES.map(({ id, label, description, icon: Icon, iconClass, swatch }) => {
          const active = mode === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`theme-customizer-option ${active ? 'theme-customizer-option--active' : ''}`}
              aria-pressed={active}
              data-cursor="pointer"
            >
              <div className="theme-customizer-swatch" style={{ background: swatch }} aria-hidden="true">
                <Icon size={22} className={iconClass} />
              </div>
              <div className="theme-customizer-copy">
                <p className="theme-customizer-label">{label}</p>
                <p className="theme-customizer-desc">{description}</p>
              </div>
              {active && (
                <motion.span
                  className="theme-customizer-check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  aria-hidden="true"
                >
                  <Check size={14} />
                </motion.span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
