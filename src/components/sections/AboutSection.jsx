import { motion } from 'framer-motion';
import {
  ArrowDownToLine,
  Briefcase,
  Clock,
  Coffee,
  Cpu,
  Rocket,
} from 'lucide-react';
import { about, developer } from '../../data/portfolio';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';

const highlightIcons = {
  clock: Clock,
  rocket: Rocket,
  cpu: Cpu,
  coffee: Coffee,
  briefcase: Briefcase,
};

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 11) % 100}%`,
  top: `${(i * 23 + 7) % 100}%`,
  size: `${2 + (i % 3)}px`,
  delay: `${(i % 6) * 0.8}s`,
  duration: `${4 + (i % 5)}s`,
}));

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightTech(text, terms) {
  if (!terms.length) return text;

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'g');
  const parts = text.split(pattern).filter(Boolean);

  return parts.map((part, index) =>
    terms.includes(part) ? (
      <span key={`${part}-${index}`} className="about-section__tech">
        {part}
      </span>
    ) : (
      part
    )
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
};

function StatCards() {
  return (
    <div className="about-section__stats content-grid content-grid--stats">
      {about.highlights.map((item, i) => {
        const Icon = highlightIcons[item.icon] || Briefcase;
        return (
          <motion.article
            key={item.label}
            className="about-section__stat"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="about-section__stat-icon" aria-hidden="true">
              <Icon size={17} />
            </div>
            <p className="about-section__stat-text">
              <span className="about-section__stat-value">{item.value}</span>
              {' '}
              {item.label}
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="about-section">
      <div className="about-section__bg" aria-hidden="true">
        <div className="about-section__orb about-section__orb--1" />
        <div className="about-section__orb about-section__orb--2" />
        <div className="about-section__orb about-section__orb--3" />
        <div className="about-section__stars" />
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="about-section__particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="about-section__grid">
        <motion.div
          className="about-section__avatar-col"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="about-avatar-wrap">
            <motion.div
              className="about-avatar-orbit"
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="about-avatar-glow"
              aria-hidden="true"
              animate={{ opacity: [0.55, 0.95, 0.55], scale: [0.96, 1.05, 0.96] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="about-avatar-ring"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={developer.avatar}
                alt={`${developer.name} — ${developer.title}`}
                className="about-avatar"
                width={320}
                height={320}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="about-section__stats-col">
          <StatCards />
        </div>

        <div className="about-section__right">
          <motion.header
            className="about-section__header"
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <span className="about-section__eyebrow type-overline">About Me</span>
            <h2 className="about-section__title">Navigating the Digital Cosmos</h2>
            <div className="about-section__title-line" aria-hidden="true" />
          </motion.header>

          <div className="about-section__copy">
            {about.bio.map((paragraph, index) => (
              <motion.p
                key={index}
                className="about-section__paragraph"
                {...fadeUp}
                transition={{ duration: 0.55, delay: 0.2 + index * 0.1 }}
              >
                {highlightTech(paragraph, about.techTerms)}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="about-section__cta"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Button as="a" href="#projects" variant="primary" size="md" className="about-section__btn">
              <Briefcase size={16} aria-hidden="true" />
              View Projects
            </Button>
            <Button
              as="a"
              href={developer.resume}
              variant="secondary"
              size="md"
              className="about-section__btn about-section__btn--outline"
              download="Lirisha_Tayal_Resume.pdf"
            >
              <ArrowDownToLine size={16} aria-hidden="true" />
              Download Resume
            </Button>
          </motion.div>

          <motion.div
            className="about-section__interests"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.58 }}
          >
            <p className="about-section__interests-label type-overline">Interests</p>
            <div className="about-section__tags">
              {about.interests.map((interest) => (
                <span key={interest} className="about-section__tag">
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
