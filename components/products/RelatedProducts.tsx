'use client';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="mt-16">
      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-10">
        <h2 className="section-title">You Might Also Love... 💕</h2>
        <p className="section-subtitle">More handmade treasures from the same collection</p>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}
