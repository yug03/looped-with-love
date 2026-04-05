'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{opacity:0,scale:0.5}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.5}} whileHover={{scale:1.1}} whileTap={{scale:0.9}}
          onClick={() => window.scrollTo({top:0,behavior:'smooth'})}
          className="fixed bottom-24 md:bottom-24 left-4 md:left-6 z-40 w-11 h-11 bg-white dark:bg-dark-card rounded-full shadow-card-hover border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label="Back to top">
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
