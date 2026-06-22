import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function GlassPanel({
  children,
  className = '',
  hover = true,
  glow = false,
  ...props
}) {
  return (
    <motion.div
      className={cn(
        'card-base',
        glow && 'neon-border',
        hover && 'transition-all duration-300 hover:border-neon-cyan/25',
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
