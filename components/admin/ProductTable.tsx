'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, EyeOff, Star, ToggleLeft, ToggleRight, Minus, Plus } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice, isNewProduct, cn } from '@/lib/utils';

export function ProductTable({ products, onUpdate }: { products: Product[]; onUpdate: (p: Product) => void }) {
  const [search, setSearch] = useState('');
  const [upd, setUpd] = useState<Record<string,boolean>>({});
  const [qEdits, setQEdits] = useState<Record<string,string>>({});

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q));
  }, [products, search]);

  const update = async (product: Product, field: string, value: string|number|boolean) => {
    const key = `${product.id}_${field}`;
    setUpd(s=>({...s,[key]:true}));
    try {
      const res = await fetch('/api/admin/update', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id:product.id,field,value}) });
      if (res.ok) onUpdate({...product,[field]:value} as Product);
    } catch (e) { console.error(e); }
    finally { setUpd(s=>({...s,[key]:false})); }
  };

  const isUpd = (id:string,f:string) => Boolean(upd[`${id}_${f}`]);

  return (
    <div>
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." className="input-base pl-10" />
      </div>
      <p className="text-sm text-text-secondary mb-4">Showing {filtered.length} of {products.length} products</p>

      {/* Desktop */}
      <div className="hidden md:block card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary/10 bg-primary/5">
                {['Product','Category','Price','Stock','Qty','Flags','Visible'].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold text-text-secondary uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              <AnimatePresence>
                {filtered.map(p => (
                  <motion.tr key={p.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className={cn('hover:bg-primary/5 transition-colors', !p.is_visible && 'opacity-50')}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                          <Image src={p.image1} alt={p.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-text-primary dark:text-dark-text truncate max-w-[160px]">{p.name}</p>
                          {isNewProduct(p.timestamp) && <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">NEW</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs font-medium text-text-secondary bg-secondary/10 px-2 py-1 rounded-lg">{p.category}</span></td>
                    <td className="px-4 py-3"><span className="font-bold text-primary text-sm">{formatPrice(p.price)}</span></td>
                    <td className="px-4 py-3">
                      <button onClick={()=>update(p,'stock_status',p.stock_status==='In Stock'?'Out of Stock':'In Stock')} disabled={isUpd(p.id,'stock_status')}
                        className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all', p.stock_status==='In Stock'?'bg-success/10 text-success border-success/20 hover:bg-success/20':'bg-danger/10 text-danger border-danger/20 hover:bg-danger/20', isUpd(p.id,'stock_status')&&'opacity-50 cursor-wait')}>
                        {p.stock_status==='In Stock'?<ToggleRight size={14}/>:<ToggleLeft size={14}/>}
                        {isUpd(p.id,'stock_status')?'...':p.stock_status}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={()=>update(p,'quantity',Math.max(0,(p.quantity||0)-1))} disabled={isUpd(p.id,'quantity')} className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 disabled:opacity-50"><Minus size={10}/></button>
                        <input type="number" min="0"
                          value={qEdits[p.id]!==undefined?qEdits[p.id]:p.quantity??''} 
                          onChange={e=>setQEdits(prev=>({...prev,[p.id]:e.target.value}))}
                          onBlur={e=>{const v=parseInt(e.target.value);if(!isNaN(v))update(p,'quantity',v);setQEdits(prev=>{const c={...prev};delete c[p.id];return c;});}}
                          className="w-12 text-center text-sm font-semibold border border-primary/20 rounded-lg py-0.5 bg-white dark:bg-dark-surface text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/40" />
                        <button onClick={()=>update(p,'quantity',(p.quantity||0)+1)} disabled={isUpd(p.id,'quantity')} className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 disabled:opacity-50"><Plus size={10}/></button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button title="Toggle Best Seller" onClick={()=>update(p,'is_bestseller',!p.is_bestseller)} disabled={isUpd(p.id,'is_bestseller')}
                          className={cn('p-1.5 rounded-lg transition-all text-sm',p.is_bestseller?'bg-orange-100 text-orange-500 dark:bg-orange-900/30':'bg-gray-100 dark:bg-dark-surface text-text-secondary hover:bg-orange-50 hover:text-orange-400')}>🔥</button>
                        <button title="Toggle Featured" onClick={()=>update(p,'is_featured',!p.is_featured)} disabled={isUpd(p.id,'is_featured')}
                          className={cn('p-1.5 rounded-lg transition-all',p.is_featured?'bg-primary/15 text-primary':'bg-gray-100 dark:bg-dark-surface text-text-secondary hover:bg-primary/10 hover:text-primary')}>
                          <Star size={13} fill={p.is_featured?'currentColor':'none'} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={()=>update(p,'is_visible',!p.is_visible)} disabled={isUpd(p.id,'is_visible')}
                        className={cn('p-2 rounded-xl transition-all',p.is_visible?'bg-success/10 text-success hover:bg-success/20':'bg-gray-100 dark:bg-dark-surface text-text-secondary hover:bg-success/10 hover:text-success',isUpd(p.id,'is_visible')&&'opacity-50 cursor-wait')}>
                        {p.is_visible?<Eye size={15}/>:<EyeOff size={15}/>}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(p => (
          <div key={p.id} className={cn('card-base p-4',!p.is_visible&&'opacity-60')}>
            <div className="flex items-start gap-3 mb-4">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0"><Image src={p.image1} alt={p.name} fill className="object-cover" sizes="56px" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-text-primary line-clamp-1">{p.name}</h3>
                <p className="text-xs text-text-secondary">{p.category}</p>
                <p className="font-bold text-primary text-base mt-0.5">{formatPrice(p.price)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                {field:'stock_status',label:p.stock_status,val:p.stock_status==='In Stock'?'Out of Stock':'In Stock',active:p.stock_status==='In Stock',cls:p.stock_status==='In Stock'?'bg-success/10 text-success border-success/20':'bg-danger/10 text-danger border-danger/20'},
                {field:'is_visible',label:p.is_visible?'Visible':'Hidden',val:!p.is_visible,active:p.is_visible,cls:p.is_visible?'bg-success/10 text-success border-success/20':'bg-gray-100 dark:bg-dark-surface text-text-secondary border-gray-200'},
                {field:'is_bestseller',label:p.is_bestseller?'Bestseller':'Not Bestseller',val:!p.is_bestseller,active:p.is_bestseller,cls:p.is_bestseller?'bg-orange-100 text-orange-600 border-orange-200':'bg-gray-100 dark:bg-dark-surface text-text-secondary border-gray-200'},
                {field:'is_featured',label:p.is_featured?'Featured':'Not Featured',val:!p.is_featured,active:p.is_featured,cls:p.is_featured?'bg-primary/15 text-primary border-primary/20':'bg-gray-100 dark:bg-dark-surface text-text-secondary border-gray-200'},
              ].map(btn=>(
                <button key={btn.field} onClick={()=>update(p,btn.field,btn.val)} className={cn('flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all',btn.cls)}>
                  {btn.field==='is_bestseller'&&'🔥 '}
                  {btn.field==='is_featured'&&<Star size={11} fill={p.is_featured?'currentColor':'none'} className="mr-0.5"/>}
                  {btn.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs font-semibold text-text-secondary">Qty:</span>
              <div className="flex items-center gap-1.5">
                <button onClick={()=>update(p,'quantity',Math.max(0,(p.quantity||0)-1))} className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20"><Minus size={12}/></button>
                <span className="w-10 text-center text-sm font-bold text-text-primary dark:text-dark-text">{p.quantity??'∞'}</span>
                <button onClick={()=>update(p,'quantity',(p.quantity||0)+1)} className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20"><Plus size={12}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length===0&&<div className="text-center py-12 text-text-secondary"><p className="text-lg">No products found matching "{search}"</p></div>}
    </div>
  );
}
