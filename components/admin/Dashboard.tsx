'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle, XCircle, LogOut, Plus, RefreshCw, LayoutGrid } from 'lucide-react';
import { Product } from '@/lib/types';
import { SAMPLE_PRODUCTS } from '@/lib/constants';
import { ProductTable } from './ProductTable';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { YarnIcon } from '@/components/ui/Icons';

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      setProducts(await res.json());
    } catch { setProducts(SAMPLE_PRODUCTS as Product[]); }
    finally { setLoading(false); setRefreshing(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const stats = {
    total: products.length,
    inStock: products.filter(p => p.stock_status === 'In Stock').length,
    outOfStock: products.filter(p => p.stock_status === 'Out of Stock').length,
    featured: products.filter(p => p.is_featured).length,
    bestsellers: products.filter(p => p.is_bestseller).length,
    hidden: products.filter(p => !p.is_visible).length,
  };

  const catMap = products.reduce<Record<string,number>>((a,p) => ({...a,[p.category]:(a[p.category]||0)+1}), {});
  const formUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || '#';

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      <header className="bg-white dark:bg-dark-card border-b border-primary/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <YarnIcon className="w-7 h-7 text-primary" />
            <div>
              <h1 className="font-playfair font-bold text-lg text-text-primary dark:text-dark-text">Admin Dashboard</h1>
              <p className="text-xs text-text-secondary">LoopedWithLove Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => { setRefreshing(true); load(); }} loading={refreshing} icon={<RefreshCw size={15} />}><span className="hidden sm:inline">Refresh</span></Button>
            <a href={formUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-4 py-2 inline-flex items-center gap-2"><Plus size={15} /><span className="hidden sm:inline">Add Product</span></a>
            <Button variant="ghost" size="sm" onClick={onLogout} icon={<LogOut size={15} />}><span className="hidden sm:inline">Logout</span></Button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h2 className="font-playfair text-xl font-bold text-text-primary dark:text-dark-text mb-4">Overview</h2>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">{Array.from({length:6}).map((_,i)=><Skeleton key={i} className="h-24" rounded="2xl" />)}</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {label:'Total',value:stats.total,icon:Package,color:'text-primary',bg:'bg-primary/10'},
                {label:'In Stock',value:stats.inStock,icon:CheckCircle,color:'text-success',bg:'bg-success/10'},
                {label:'Out of Stock',value:stats.outOfStock,icon:XCircle,color:'text-danger',bg:'bg-danger/10'},
                {label:'Featured',value:stats.featured,icon:LayoutGrid,color:'text-secondary',bg:'bg-secondary/10'},
                {label:'Best Sellers',value:stats.bestsellers,icon:Package,color:'text-amber-500',bg:'bg-amber-50 dark:bg-amber-900/20'},
                {label:'Hidden',value:stats.hidden,icon:XCircle,color:'text-text-secondary',bg:'bg-gray-100 dark:bg-dark-surface'},
              ].map((s,i) => (
                <motion.div key={s.label} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}} className="card-base p-4 flex flex-col gap-2">
                  <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center`}><s.icon size={18} className={s.color} /></div>
                  <p className={`font-playfair text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-text-secondary leading-tight">{s.label}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        {!loading && Object.keys(catMap).length > 0 && (
          <div className="card-base p-6">
            <h3 className="font-playfair font-semibold text-text-primary dark:text-dark-text mb-4">Products by Category</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(catMap).sort((a,b)=>b[1]-a[1]).map(([cat,count]) => (
                <span key={cat} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold">{cat} ({count})</span>
              ))}
            </div>
          </div>
        )}
        <div className="bg-accent-blue/20 dark:bg-accent-blue/10 rounded-2xl p-4 border border-accent-blue/30">
          <p className="text-sm text-text-secondary"><strong>💡 To add new products:</strong> Click "Add Product" above to open the Google Form. Fill in the details and the product will appear on the site within 1–2 minutes automatically!</p>
        </div>
        <div>
          <h2 className="font-playfair text-xl font-bold text-text-primary dark:text-dark-text mb-4">Manage Products</h2>
          {loading ? (
            <div className="space-y-3">{Array.from({length:8}).map((_,i)=><Skeleton key={i} className="h-16" rounded="xl" />)}</div>
          ) : (
            <ProductTable products={products} onUpdate={p => setProducts(prev => prev.map(x => x.id===p.id?p:x))} />
          )}
        </div>
      </main>
    </div>
  );
}
