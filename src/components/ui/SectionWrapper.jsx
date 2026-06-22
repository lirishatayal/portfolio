import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const SectionWrapper = forwardRef(function SectionWrapper(
  { id, children, className = '', variant = 'default' },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'relative z-10 w-full',
        variant === 'hero' ? 'section-hero' : 'section-padding',
        className
      )}
    >
      <div className="page-container">{children}</div>
    </section>
  );
});

export default SectionWrapper;

export function SectionTitle({ subtitle, title, align = 'center' }) {
  return (
    <motion.header
      className={cn(
        'section-header',
        align === 'center' && 'text-center mx-auto'
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      {subtitle && (
        <span className="type-overline block mb-4">
          {subtitle}
        </span>
      )}
      <h2 className="type-heading-lg gradient-text">
        {title}
      </h2>
    </motion.header>
  );
}

export function SectionIntro({ children, className = '' }) {
  return (
    <p className={cn('section-intro type-body text-slate-400', className)}>
      {children}
    </p>
  );
}
