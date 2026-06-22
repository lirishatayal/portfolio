import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Info, MousePointer2, Play } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from '../ui/Button';

const ENGINES = [
  {
    id: 'framer',
    label: 'Framer Motion',
    subtitle: 'React UI motion',
    description:
      'Declarative animations for React — great for page transitions, hover effects, and gesture-driven UI.',
    instruction: 'Hover the cards below to preview hover animations. Looping buttons show continuous motion.',
  },
  {
    id: 'gsap',
    label: 'GSAP',
    subtitle: 'Timeline animations',
    description:
      'Timeline-based animation engine — ideal for sequenced motion, staggers, and complex choreography.',
    instruction: 'Watch the auto-playing timeline, then click "Run Stagger" to reveal the grid.',
  },
];

function LabInstructions({ text }) {
  return (
    <p className="mgz-instructions">
      <Info size={14} className="mgz-instructions-icon" aria-hidden="true" />
      <span>{text}</span>
    </p>
  );
}

function DemoSection({ title, hint, children }) {
  return (
    <section className="alab-section">
      <div className="alab-section-header">
        <h4 className="alab-section-title">{title}</h4>
        {hint && (
          <span className="alab-section-hint">
            <MousePointer2 size={12} aria-hidden="true" />
            {hint}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

const HOVER_DEMOS = [
  { label: 'Scale', hint: 'Grows on hover', motion: { scale: 1.12 } },
  { label: 'Rotate', hint: 'Tilts on hover', motion: { rotate: 12 } },
  { label: 'Bounce', hint: 'Springs up', motion: { y: -12 }, transition: { type: 'spring', stiffness: 400 } },
  { label: 'Slide', hint: 'Shifts right', motion: { x: 14 } },
];

function FramerDemos() {
  return (
    <div className="alab-demos">
      <DemoSection title="Hover Interactions" hint="Hover each card">
        <div className="alab-card-grid">
          {HOVER_DEMOS.map(({ label, hint, motion: hoverMotion, transition }) => (
            <motion.div
              key={label}
              className="alab-demo-card"
              whileHover={hoverMotion}
              whileTap={{ scale: 0.96 }}
              transition={transition ?? { type: 'tween', duration: 0.25 }}
              data-cursor="pointer"
            >
              <span className="alab-demo-card-label">{label}</span>
              <span className="alab-demo-card-hint">{hint}</span>
            </motion.div>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Scroll Progress" hint="Scroll inside modal">
        <motion.div
          className="alab-progress-track"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="alab-progress-fill"
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
        </motion.div>
        <p className="alab-caption">Bar fills when this section scrolls into view</p>
      </DemoSection>

      <DemoSection title="Looping Motion" hint="Always animating">
        <div className="alab-loop-row">
          {[
            { label: 'Pulse', animate: { scale: [1, 1.08, 1] } },
            { label: 'Wiggle', animate: { rotate: [0, -6, 6, 0] } },
            { label: 'Flip', animate: { rotateY: [0, 180, 360] } },
          ].map(({ label, animate }) => (
            <motion.div
              key={label}
              className="alab-loop-chip"
              animate={animate}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </DemoSection>

      <ScrollLinkedDemo />
    </div>
  );
}

function ScrollLinkedDemo() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.2, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.85, 1, 0.85]);

  return (
    <DemoSection title="Scroll-Linked Fade" hint="Scroll to see fade in/out">
      <div ref={ref} className="alab-scroll-stage">
        <motion.div style={{ opacity, scale }} className="alab-scroll-content">
          <p className="font-display text-neon-cyan text-sm">Scroll-Linked</p>
          <p className="font-mono text-xs text-slate-400 mt-1">Opacity & scale follow scroll position</p>
        </motion.div>
      </div>
    </DemoSection>
  );
}

function GsapDemos() {
  const boxRef = useRef(null);
  const timelineRef = useRef(null);
  const [staggerRan, setStaggerRan] = useState(false);

  useGSAP(() => {
    timelineRef.current = gsap.timeline({ repeat: -1, yoyo: true });
    timelineRef.current
      .to(boxRef.current, { x: 120, rotation: 360, duration: 2.2, ease: 'power2.inOut' })
      .to(boxRef.current, { borderRadius: '50%', duration: 0.8 })
      .to(boxRef.current, { backgroundColor: '#a855f7', duration: 0.8 });
  }, []);

  const runStagger = () => {
    gsap.fromTo(
      '.gsap-stagger-item',
      { opacity: 0, y: 24, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.45,
        ease: 'back.out(1.6)',
      }
    );
    setStaggerRan(true);
  };

  const resetStagger = () => {
    gsap.set('.gsap-stagger-item', { opacity: 0, y: 24, scale: 0.9 });
    setStaggerRan(false);
  };

  return (
    <div className="alab-demos">
      <DemoSection title="Timeline Loop" hint="Auto-playing sequence">
        <div className="alab-scroll-stage alab-gsap-stage">
          <div
            ref={boxRef}
            className="alab-gsap-box"
          />
        </div>
        <p className="alab-caption">Move → rotate → morph shape & color on a repeating timeline</p>
      </DemoSection>

      <DemoSection title="Stagger Reveal" hint="Click the button">
        <div className="alab-stagger-actions">
          <Button variant="primary" size="md" onClick={runStagger} data-cursor="pointer">
            <Play size={14} />
            Run Stagger
          </Button>
          {staggerRan && (
            <Button variant="secondary" size="md" onClick={resetStagger} data-cursor="pointer">
              Reset
            </Button>
          )}
        </div>
        <div className="alab-stagger-grid">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="gsap-stagger-item alab-stagger-cell" />
          ))}
        </div>
        <p className="alab-caption">
          {staggerRan ? 'Cells revealed with staggered timing' : 'Grid starts hidden — click Run Stagger to animate'}
        </p>
      </DemoSection>
    </div>
  );
}

const demos = { framer: FramerDemos, gsap: GsapDemos };

export default function AnimationLab() {
  const [engine, setEngine] = useState('framer');
  const active = ENGINES.find((e) => e.id === engine);
  const ActiveDemo = demos[engine];

  return (
    <div className="alab-root">
      <p className="alab-intro type-body-sm text-slate-400">
        Compare two animation approaches I use in production. Pick an engine below to explore live demos.
      </p>

      <nav className="mgz-tabs" aria-label="Animation engine">
        {ENGINES.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setEngine(e.id)}
            className={`mgz-tab alab-tab ${engine === e.id ? 'mgz-tab--active' : ''}`}
            aria-selected={engine === e.id}
            data-cursor="pointer"
          >
            <span className="alab-tab-label">{e.label}</span>
            <span className="alab-tab-sub">{e.subtitle}</span>
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={engine}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="alab-engine-desc">
            <p className="type-body-sm text-slate-300 leading-relaxed">{active?.description}</p>
          </div>

          <LabInstructions text={active?.instruction ?? ''} />

          <ActiveDemo />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
