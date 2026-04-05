'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

export function AnnouncementBar({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const d = localStorage.getItem('lwl_ann');
    if (!d || Date.now() - parseInt(d) > 86400000) setVisible(true);
  }, []);
  const dismiss = () => { setVisible(false); localStorage.setItem('lwl_ann', String(Date.now())); };
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3}} className="announcement-gradient text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            <div className="flex-1" />
            <div className="flex items-center gap-2 text-sm font-medium text-center">
              <Sparkles size={14} className="flex-shrink-0 animate-pulse" />
              <span>{text}</span>
              <Sparkles size={14} className="flex-shrink-0 animate-pulse" />
            </div>
            <div className="flex-1 flex justify-end">
              <button onClick={dismiss} className="p-1 rounded-full hover:bg-white/20 transition-colors flex-shrink-0" aria-label="Dismiss">
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
