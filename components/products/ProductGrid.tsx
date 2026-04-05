'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PackageSearch } from 'lucide-react';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/Button';

interface Props { products: Product[]; emptyMessage?: string; showCount?: boolean; totalCount?: number; }

export function ProductGrid({ products, emptyMessage = 'No products found', showCount, totalCount }: Props) {
  if (products.length === 0) {
    return (
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6"><PackageSearch size={40} className="text-primary" /></div>
        <h3 className="font-playfair text-2xl font-semibold text-text-primary dark:text-dark-text mb-3">No Products Found 🧶</h3>
        <p className="text-text-secondary mb-8 max-w-sm">{emptyMessage}. Try adjusting your filters or browse all our products.</p>
        <Link href="/products"><Button variant="primary">Browse All Products</Button></Link>
      </motion.div>
    );
  }
  return (
    <div>
      {showCount && <p className="text-sm text-text-secondary mb-6">Showing <span className="font-semibold text-text-primary dark:text-dark-text">{products.length}</span>{totalCount && totalCount !== products.length && <> of <span className="font-semibold text-text-primary dark:text-dark-text">{totalCount}</span></>} products</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
}
