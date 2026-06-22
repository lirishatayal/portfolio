import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../../data/skills';

const demos = {
  React: ReactDemo,
  CSS: CSSDemo,
  JavaScript: JSDemo,
};

function ReactDemo() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(['Component', 'Hook', 'State']);

  return (
    <div className="space-y-4">
      <div className="glass rounded-xl p-4">
        <p className="font-mono text-xs text-neon-cyan mb-3">// Counter Component</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount((c) => c - 1)}
            className="w-10 h-10 rounded-lg glass font-bold"
            data-cursor="pointer"
          >
            -
          </button>
          <motion.span
            key={count}
            initial={{ scale: 1.5, color: '#00f0ff' }}
            animate={{ scale: 1, color: '#e2e8f0' }}
            className="font-display text-3xl font-bold w-12 text-center"
          >
            {count}
          </motion.span>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-10 h-10 rounded-lg glass font-bold"
            data-cursor="pointer"
          >
            +
          </button>
        </div>
      </div>

      <div className="glass rounded-xl p-4">
        <p className="font-mono text-xs text-neon-cyan mb-3">// Dynamic List Rendering</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {items.map((item) => (
            <motion.span
              key={item}
              layout
              className="px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan text-xs font-mono"
            >
              {item}
            </motion.span>
          ))}
        </div>
        <button
          onClick={() => setItems((prev) => [...prev, `Item ${prev.length + 1}`])}
          className="text-xs font-mono text-slate-400 hover:text-neon-cyan"
          data-cursor="pointer"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
}

function CSSDemo() {
  const [animStyle, setAnimStyle] = useState('bounce');

  const animations = {
    bounce: { y: [0, -20, 0] },
    spin: { rotate: 360 },
    pulse: { scale: [1, 1.2, 1] },
    glow: { boxShadow: ['0 0 0px #00f0ff', '0 0 30px #00f0ff', '0 0 0px #00f0ff'] },
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {Object.keys(animations).map((style) => (
          <button
            key={style}
            onClick={() => setAnimStyle(style)}
            className={`px-3 py-1 rounded-lg font-mono text-xs capitalize ${
              animStyle === style ? 'bg-neon-purple/20 text-neon-purple' : 'glass text-slate-400'
            }`}
            data-cursor="pointer"
          >
            {style}
          </button>
        ))}
      </div>

      <div className="h-40 rounded-xl glass flex items-center justify-center">
        <motion.div
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple"
          animate={animations[animStyle]}
          transition={
            animStyle === 'spin'
              ? { repeat: Infinity, duration: 2, ease: 'linear' }
              : { repeat: Infinity, duration: 1.5 }
          }
        />
      </div>
    </div>
  );
}

function JSDemo() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);

  const runLogic = () => {
    const results = [];
    const nums = input.split(',').map(Number).filter((n) => !isNaN(n));
    if (nums.length) {
      results.push(`Sum: ${nums.reduce((a, b) => a + b, 0)}`);
      results.push(`Max: ${Math.max(...nums)}`);
      results.push(`Avg: ${(nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2)}`);
      results.push(`Reversed: [${[...nums].reverse().join(', ')}]`);
      results.push(`Even: [${nums.filter((n) => n % 2 === 0).join(', ')}]`);
    }
    setOutput(results);
  };

  return (
    <div className="space-y-4">
      <div className="glass rounded-xl p-4">
        <p className="font-mono text-xs text-neon-cyan mb-3">// Array Logic Demo</p>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter numbers: 1, 2, 3, 4, 5"
          className="w-full px-3 py-2 rounded-lg bg-space-900 font-mono text-sm mb-3 focus:outline-none"
        />
        <button
          onClick={runLogic}
          className="px-4 py-2 rounded-lg bg-neon-cyan/20 text-neon-cyan font-mono text-xs"
          data-cursor="pointer"
        >
          Run Logic
        </button>
      </div>

      <AnimatePresence>
        {output.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="glass rounded-xl p-4 font-mono text-xs space-y-1"
          >
            {output.map((line) => (
              <p key={line} className="text-neon-cyan/80">{line}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const simulatorSkills = ['React', 'CSS', 'JavaScript'];

export default function SkillSimulator({ initialSkill = 'React' }) {
  const [selected, setSelected] = useState(
    simulatorSkills.includes(initialSkill) ? initialSkill : 'React'
  );
  const skill = skills.find((s) => s.name === selected);
  const Demo = demos[selected];

  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {simulatorSkills.map((name) => (
          <button
            key={name}
            onClick={() => setSelected(name)}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-all ${
              selected === name
                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                : 'glass text-slate-400'
            }`}
            data-cursor="pointer"
          >
            {name}
          </button>
        ))}
      </div>

      {skill && (
        <div className="mb-4 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: skill.color }} />
          <span className="font-mono text-sm text-slate-400">{skill.description}</span>
          <span className="font-mono text-xs ml-auto" style={{ color: skill.color }}>{skill.level}%</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Demo />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
