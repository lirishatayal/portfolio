import { motion } from 'framer-motion';
import {
  Bot,
  Code2,
  GitBranch,
  Layers,
  Plug,
  Wrench,
} from 'lucide-react';

const iconMap = {
  frontend: Layers,
  apis: Plug,
  cms: Code2,
  'version-control': GitBranch,
  tools: Wrench,
  ai: Bot,
};

export default function SkillCategoryCard({ category, index }) {
  const Icon = iconMap[category.id] || Code2;

  return (
    <motion.article
      className="skill-category"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <div className="skill-category__header">
        <div
          className="skill-category__icon"
          style={{ color: category.color, backgroundColor: `${category.color}18` }}
        >
          <Icon size={20} strokeWidth={2} />
        </div>
        <h3 className="skill-category__title">{category.title}</h3>
      </div>

      <ul className="skill-category__list">
        {category.items.map((item) => (
          <li key={item} className="skill-tag">
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
