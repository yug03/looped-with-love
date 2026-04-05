'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';

export function FeaturedProducts({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left'|'right') => ref.current?.scrollBy({left:dir==='left'?-280:280,behavior:'smooth'});
  if (!products.length) return null;
  return (
    <section className="section-padding bg-gradient-to-b from-background to-primary/5 dark:from-dark-bg dark:to-dark-surface/50">
      <div className="container-max">
        <div className="flex items-end justify-between mb-10">
          <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
            <span className="flex items-center gap-2 text-primary font-semibold text-sm mb-2"><Sparkles size={16} />Just Crafted</span>
            <h2 className="section-title">Fresh Off the Hook ✨</h2>
            <p className="section-subtitle">Our latest handmade creations</p>
          </motion.div>
          <div className="hidden md:flex items-center gap-2">
            {(['left','right'] as const).map(dir => (
              <motion.button key={dir} whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={()=>scroll(dir)}
                className="w-10 h-10 rounded-full bg-white dark:bg-dark-card border border-primary/20 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary shadow-soft transition-all">
                {dir==='left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </motion.button>
            ))}
          </div>
        </div>
        <div ref={ref} className="flex gap-4 overflow-x-auto no-scrollbar pb-2 md:hidden snap-x-mandatory">
          {products.map((p,i) => <div key={p.id} className="w-52 flex-shrink-0 snap-start"><ProductCard product={p} index={i} /></div>)}
        </div>
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0,8).map((p,i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mt-10">
          <Link href="/products"><Button variant="secondary" size="lg">View All Products →</Button></Link>
        </motion.div>
      </div>
    </section>
  );
}
