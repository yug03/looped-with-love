'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQS = [
  {q:'How do I place a custom order?',a:'Simply contact us via WhatsApp with your requirements — product type, colors, size, and quantity. We'll give you a quote within 24 hours!'},
  {q:'How long does shipping take?',a:'Standard shipping takes 5–10 business days across India. Express shipping (3–5 days) is available on select platforms.'},
  {q:'What materials do you use?',a:'We use high-quality acrylic and cotton yarns sourced from reputable Indian suppliers. All materials are chosen for durability, softness, and color fastness.'},
  {q:'Can I return or exchange a product?',a:'Since all products are handmade, we accept returns only for damaged or defective items. Please reach out within 48 hours of delivery with photos.'},
  {q:'Do you accept bulk or wholesale orders?',a:'Absolutely! We love bulk orders for weddings, corporate gifting, baby showers, and festivals. Contact us on WhatsApp for bulk pricing.'},
  {q:'How do I care for my crochet product?',a:'Most products are best spot-cleaned or hand-washed gently in cold water. Avoid machine washing unless specified. Keep away from moisture.'},
  {q:'Can I request a specific color?',a:'Yes! For custom orders, you can specify exact colors. We have a wide range of yarn colors available.'},
  {q:'Do you ship internationally?',a:'Currently we ship within India only. We're working on expanding! Stay tuned to our Instagram for updates.'},
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number|null>(0);
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {FAQS.map((f,i)=>(
        <div key={i} className="card-base overflow-hidden">
          <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex items-center justify-between p-5 text-left gap-4">
            <span className="font-semibold text-text-primary dark:text-dark-text text-sm sm:text-base">{f.q}</span>
            <ChevronDown size={18} className={cn('flex-shrink-0 text-primary transition-transform duration-200',open===i&&'rotate-180')} />
          </button>
          <AnimatePresence>
            {open===i&&(
              <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25}} className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
