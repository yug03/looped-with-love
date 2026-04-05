'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton({ phoneNumber }: { phoneNumber: string }) {
  const [visible, setVisible] = useState(false);
  const [tip, setTip] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 2000); return () => clearTimeout(t); }, []);
  const url = `https://wa.me/${phoneNumber.replace(/\D/g,'')}?text=${encodeURIComponent("Hi! I'm visiting your shop and would love to know more about your handmade products 🧶✨")}`;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}} className="fixed bottom-24 md:bottom-8 right-4 md:right-6 z-50 flex flex-col items-end gap-2">
          <AnimatePresence>
            {tip && (
              <motion.div initial={{opacity:0,scale:0.8,y:10}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.8,y:10}} className="bg-white dark:bg-dark-card shadow-card-hover rounded-2xl px-4 py-3 text-sm font-medium text-text-primary border border-primary/10 max-w-[180px] text-center">
                💬 Chat with us on WhatsApp!
              </motion.div>
            )}
          </AnimatePresence>
          <motion.a href={url} target="_blank" rel="noopener noreferrer"
            whileHover={{scale:1.1}} whileTap={{scale:0.95}}
            animate={{y:[0,-6,0]}} transition={{y:{repeat:Infinity,duration:2.5,ease:'easeInOut'}}}
            onMouseEnter={()=>setTip(true)} onMouseLeave={()=>setTip(false)}
            className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center"
            aria-label="Chat on WhatsApp">
            <MessageCircle size={26} fill="white" strokeWidth={0} />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
