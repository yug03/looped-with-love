'use client';
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary/90 shadow-button focus:ring-primary/40',
  secondary: 'bg-white dark:bg-dark-card text-primary border-2 border-primary/30 hover:border-primary hover:bg-primary/5 focus:ring-primary/30',
  ghost: 'text-text-secondary hover:text-primary hover:bg-primary/10 focus:ring-primary/20',
  danger: 'bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20 focus:ring-danger/30',
  success: 'bg-success/10 text-success border border-success/30 hover:bg-success/20 focus:ring-success/30',
};
const sizes = { sm: 'px-3 py-1.5 text-sm rounded-xl gap-1.5', md: 'px-5 py-2.5 text-sm rounded-2xl gap-2', lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5' };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, iconPosition = 'left', children, className, disabled, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileTap={{ scale: disabled || loading ? 1 : 0.96 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn('inline-flex items-center justify-center font-semibold font-nunito transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none', variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {loading ? <Loader2 className="animate-spin" size={16} /> : (iconPosition === 'left' && icon)}
      {children}
      {!loading && iconPosition === 'right' && icon}
    </motion.button>
  )
);
Button.displayName = 'Button';
