'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [touch, setTouch] = useState<number|null>(null);
  const valid = images.filter(Boolean);
  if (!valid.length) return null;

  const next = useCallback(() => setActive(i=>(i+1)%valid.length), [valid.length]);
  const prev = useCallback(() => setActive(i=>(i-1+valid.length)%valid.length), [valid.length]);

  return (
    <>
      <div className="space-y-3">
        <div className="relative bg-gray-50 dark:bg-dark-surface rounded-3xl overflow-hidden cursor-zoom-in group" style={{aspectRatio:'1/1'}}
          onTouchStart={e=>setTouch(e.targetTouches[0].clientX)} onTouchEnd={e=>{if(touch==null)return;const d=touch-e.changedTouches[0].clientX;if(Math.abs(d)>50){d>0?next():prev()};setTouch(null);}}
          onClick={()=>setLightbox(true)}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.25}} className="absolute inset-0">
              <Image src={valid[active]} alt={`${productName} - image ${active+1}`} fill className="object-cover" sizes="(max-width:768px) 100vw,50vw" priority={active===0} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-4 right-4 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-soft">
            <ZoomIn size={18} className="text-text-secondary" />
          </div>
          {valid.length > 1 && <>
            <button onClick={e=>{e.stopPropagation();prev();}} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"><ChevronLeft size={18} /></button>
            <button onClick={e=>{e.stopPropagation();next();}} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"><ChevronRight size={18} /></button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
              {valid.map((_,i)=><button key={i} onClick={e=>{e.stopPropagation();setActive(i);}} className={cn('h-1.5 rounded-full transition-all',i===active?'w-5 bg-primary':'w-1.5 bg-white/70')} />)}
            </div>
          </>}
        </div>
        {valid.length > 1 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {valid.map((img,i)=>(
              <motion.button key={i} whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={()=>setActive(i)} className={cn('relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all',i===active?'border-primary shadow-button':'border-transparent opacity-60 hover:opacity-90 hover:border-primary/40')}>
                <Image src={img} alt={`${productName} thumb ${i+1}`} fill className="object-cover" sizes="64px" />
              </motion.button>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={()=>setLightbox(false)}>
            <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20" onClick={()=>setLightbox(false)}><X size={20} /></button>
            {valid.length > 1 && <>
              <button onClick={e=>{e.stopPropagation();prev();}} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"><ChevronLeft size={22} /></button>
              <button onClick={e=>{e.stopPropagation();next();}} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"><ChevronRight size={22} /></button>
            </>}
            <motion.div key={active} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0}} className="relative w-full max-w-2xl" style={{aspectRatio:'1/1'}} onClick={e=>e.stopPropagation()}>
              <Image src={valid[active]} alt={`${productName} - image ${active+1}`} fill className="object-contain" sizes="(max-width:768px) 100vw,700px" />
            </motion.div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">{active+1} / {valid.length}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
