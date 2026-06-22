import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const variants = {
  primary:
    'btn-primary',
  secondary:
    'btn-secondary',
  ghost:
    'text-slate-400 hover:text-neon-cyan hover:bg-white/5',
};

const sizes = {
  sm: 'btn--sm',
  md: '',
  lg: 'btn--lg',
};

const Button = forwardRef(function Button(
  {
    as: Component = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
  },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'btn',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Button;
