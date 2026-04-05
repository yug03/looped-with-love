'use client';
import { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props { value: string; onChange: (v: string) => void; autoFocus?: boolean; className?: string; }

export function ProductSearch({ value, onChange, autoFocus, className }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (autoFocus) ref.current?.focus(); }, [autoFocus]);
  return (
    <div className={cn('relative', className)}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"><Search size={18} /></div>
      <input ref={ref} type="text" value={value} onChange={e => onChange(e.target.value)}
        placeholder="Search products, categories, tags..."
        className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-primary/20 bg-white dark:bg-dark-surface text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm font-medium" />
      <AnimatePresence>
        {value && (
          <motion.button initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.8}} onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors">
            <X size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
