'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { FilterState, SortOption, PriceRange } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const PRICES: {value:PriceRange;label:string}[] = [{value:'all',label:'All Prices'},{value:'under_200',label:'Under ₹200'},{value:'200_500',label:'₹200 – ₹500'},{value:'500_1000',label:'₹500 – ₹1000'},{value:'above_1000',label:'Above ₹1000'}];
const SORTS: {value:SortOption;label:string}[] = [{value:'newest',label:'Newest First'},{value:'price_asc',label:'Price: Low to High'},{value:'price_desc',label:'Price: High to Low'},{value:'bestseller',label:'Best Sellers'}];

export function ProductFilters({ filters, onChange, totalResults }: { filters: FilterState; onChange: (f: FilterState) => void; totalResults: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState({category:true,price:true,availability:true,sort:true});
  const toggle = (k: keyof typeof expanded) => setExpanded(p => ({...p,[k]:!p[k]}));
  const toggleCat = (slug: string) => {
    const cats = filters.categories.includes(slug) ? filters.categories.filter(c=>c!==slug) : [...filters.categories,slug];
    onChange({...filters,categories:cats});
  };
  const clearAll = () => onChange({categories:[],priceRange:'all',inStockOnly:false,sort:'newest',search:filters.search});
  const hasActive = filters.categories.length > 0 || filters.priceRange !== 'all' || filters.inStockOnly;

  const Content = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-playfair font-semibold text-text-primary dark:text-dark-text">Filters</h3>
        {hasActive && <button onClick={clearAll} className="text-xs text-primary hover:underline font-semibold">Clear All</button>}
      </div>
      <p className="text-sm text-text-secondary">{totalResults} products found</p>
      {[{key:'sort',label:'Sort By',items:SORTS,type:'radio',field:'sort'},{key:'price',label:'Price Range',items:PRICES,type:'radio',field:'priceRange'}].map(s => (
        <div key={s.key}>
          <button onClick={()=>toggle(s.key as keyof typeof expanded)} className="flex items-center justify-between w-full font-semibold text-sm text-text-primary dark:text-dark-text mb-3">
            {s.label}<ChevronDown size={16} className={cn('transition-transform',expanded[s.key as keyof typeof expanded] && 'rotate-180')} />
          </button>
          <AnimatePresence>{expanded[s.key as keyof typeof expanded] && (
            <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden space-y-2">
              {s.items.map((item: {value:string;label:string}) => (
                <label key={item.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input type="radio" name={s.key} value={item.value} checked={filters[s.field as keyof FilterState] === item.value} onChange={()=>onChange({...filters,[s.field]:item.value})} className="accent-primary" />
                  <span className="text-sm text-text-secondary group-hover:text-primary transition-colors">{item.label}</span>
                </label>
              ))}
            </motion.div>
          )}</AnimatePresence>
          <div className="border-t border-primary/10 mt-4" />
        </div>
      ))}
      <div>
        <button onClick={()=>toggle('availability')} className="flex items-center justify-between w-full font-semibold text-sm text-text-primary dark:text-dark-text mb-3">
          Availability<ChevronDown size={16} className={cn('transition-transform',expanded.availability && 'rotate-180')} />
        </button>
        <AnimatePresence>{expanded.availability && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={filters.inStockOnly} onChange={e=>onChange({...filters,inStockOnly:e.target.checked})} className="accent-primary w-4 h-4" />
              <span className="text-sm text-text-secondary group-hover:text-primary transition-colors">In Stock Only</span>
            </label>
          </motion.div>
        )}</AnimatePresence>
        <div className="border-t border-primary/10 mt-4" />
      </div>
      <div>
        <button onClick={()=>toggle('category')} className="flex items-center justify-between w-full font-semibold text-sm text-text-primary dark:text-dark-text mb-3">
          Category<ChevronDown size={16} className={cn('transition-transform',expanded.category && 'rotate-180')} />
        </button>
        <AnimatePresence>{expanded.category && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden space-y-2">
            {CATEGORIES.map(c => (
              <label key={c.slug} className="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" checked={filters.categories.includes(c.slug)} onChange={()=>toggleCat(c.slug)} className="accent-primary w-4 h-4" />
                <span className="text-sm text-text-secondary group-hover:text-primary transition-colors">{c.emoji} {c.name}</span>
              </label>
            ))}
          </motion.div>
        )}</AnimatePresence>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="card-base p-6 sticky top-24"><Content /></div>
      </aside>
      <div className="lg:hidden mb-4">
        <Button variant="secondary" onClick={()=>setMobileOpen(true)} icon={<Filter size={16} />} className="w-full justify-center">
          Filters & Sort {hasActive && <span className="ml-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">{filters.categories.length+(filters.inStockOnly?1:0)+(filters.priceRange!=='all'?1:0)}</span>}
        </Button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={()=>setMobileOpen(false)} />
            <motion.div initial={{x:'-100%'}} animate={{x:0}} exit={{x:'-100%'}} transition={{type:'spring',damping:30,stiffness:300}} className="relative w-80 max-w-full h-full bg-white dark:bg-dark-card overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b border-primary/10 sticky top-0 bg-white dark:bg-dark-card z-10">
                <h2 className="font-playfair font-bold text-lg text-text-primary dark:text-dark-text">Filters & Sort</h2>
                <button onClick={()=>setMobileOpen(false)} className="p-2 rounded-xl hover:bg-primary/10 text-text-secondary"><X size={20} /></button>
              </div>
              <div className="p-5"><Content /></div>
              <div className="sticky bottom-0 p-4 bg-white dark:bg-dark-card border-t border-primary/10">
                <Button className="w-full justify-center" onClick={()=>setMobileOpen(false)}>Show {totalResults} Results</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
