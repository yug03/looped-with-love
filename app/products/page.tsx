'use client';
import { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductSearch } from '@/components/products/ProductSearch';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { FilterState, Product } from '@/lib/types';
import { filterAndSortProducts, debounce } from '@/lib/utils';
import { SAMPLE_PRODUCTS } from '@/lib/constants';

function ProductsContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    categories: params.get('category') ? [params.get('category')!] : [],
    priceRange: 'all',
    inStockOnly: false,
    sort: (params.get('sort') as FilterState['sort']) || 'newest',
    search: params.get('q') || '',
  });

  useEffect(() => {
    fetch('/api/products').then(r=>r.json()).then(setProducts).catch(()=>setProducts(SAMPLE_PRODUCTS as Product[])).finally(()=>setLoading(false));
  }, []);

  const updateURL = useCallback(debounce((f: FilterState) => {
    const p = new URLSearchParams();
    if (f.search) p.set('q',f.search);
    if (f.categories.length===1) p.set('category',f.categories[0]);
    if (f.sort!=='newest') p.set('sort',f.sort);
    router.replace(`/products?${p.toString()}`, { scroll: false });
  }, 300), [router]);

  const handleChange = (f: FilterState) => { setFilters(f); updateURL(f); };
  const filtered = useMemo(() => filterAndSortProducts(products, filters), [products, filters]);
  const autoFocus = params.get('focus') === 'search';

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      <div className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}}>
            <span className="text-primary font-semibold text-sm">Our Collection</span>
            <h1 className="font-playfair text-4xl font-bold text-text-primary dark:text-dark-text mt-1 mb-3">All Products 🛍️</h1>
            <p className="text-text-secondary">Every piece handcrafted with love — browse, discover, and find your perfect match</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6"><ProductSearch value={filters.search} onChange={v=>handleChange({...filters,search:v})} autoFocus={autoFocus} /></div>
        {(filters.categories.length>0||filters.priceRange!=='all'||filters.inStockOnly) && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} className="flex flex-wrap gap-2 mb-5">
            {filters.categories.map(c=><button key={c} onClick={()=>handleChange({...filters,categories:filters.categories.filter(x=>x!==c)})} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/15 text-primary rounded-full text-xs font-semibold hover:bg-primary/25">{c} ×</button>)}
            {filters.priceRange!=='all'&&<button onClick={()=>handleChange({...filters,priceRange:'all'})} className="px-3 py-1.5 bg-secondary/15 text-secondary rounded-full text-xs font-semibold">Price ×</button>}
            {filters.inStockOnly&&<button onClick={()=>handleChange({...filters,inStockOnly:false})} className="px-3 py-1.5 bg-success/15 text-success rounded-full text-xs font-semibold">In Stock Only ×</button>}
          </motion.div>
        )}
        <div className="flex gap-8">
          <ProductFilters filters={filters} onChange={handleChange} totalResults={filtered.length} />
          <div className="flex-1 min-w-0">
            {loading ? <ProductGridSkeleton count={8} /> : <ProductGrid products={filtered} showCount totalCount={products.filter(p=>p.is_visible).length} emptyMessage={filters.search?`No products matching "${filters.search}"`:"No products match your filters"} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16"><ProductGridSkeleton count={8} /></div>}><ProductsContent /></Suspense>;
}
