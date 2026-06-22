import { motion } from 'framer-motion';
import {
  Braces,
  Box,
  Code2,
  FileCode,
  GitBranch,
  Globe,
  Layers,
  Move,
  Palette,
  PenTool,
  Server,
  Wind,
  Zap,
} from 'lucide-react';

const iconMap = {
  React: Layers,
  TypeScript: FileCode,
  'Three.js': Box,
  CSS: Palette,
  JavaScript: Braces,
  'Node.js': Server,
  GSAP: Zap,
  'Framer Motion': Move,
  Tailwind: Wind,
  Git: GitBranch,
  Figma: PenTool,
  'Next.js': Globe,
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  animation: 'Animation',
  tools: 'Tools',
  design: 'Design',
  '3d': '3D',
};

export default function SkillCard({ skill, index }) {
  const Icon = iconMap[skill.name] || Code2;
  const category = categoryLabels[skill.category] || skill.category;

  return (
    <motion.article
      className="skill-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <div className="skill-card__header">
        <div
          className="skill-card__icon"
          style={{ color: skill.color, backgroundColor: `${skill.color}18` }}
        >
          <Icon size={20} strokeWidth={2} />
        </div>
        <div className="skill-card__meta">
          <h3 className="skill-card__name">{skill.name}</h3>
          <span className="skill-card__category">{category}</span>
        </div>
      </div>

      <div className="skill-card__progress">
        <div className="skill-card__progress-track">
          <motion.div
            className="skill-card__progress-fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.04 + 0.15, ease: 'easeOut' }}
          />
        </div>
        <span className="skill-card__percent">{skill.level}%</span>
      </div>
    </motion.article>
  );
}
