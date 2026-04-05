'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Flame, Search, ShoppingCart, Package } from 'lucide-react';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { CATEGORIES } from '@/lib/constants';

// USP Strip
const USP = [
  {icon:'🧶',text:'100% Handmade'},{icon:'🎁',text:'Perfect for Gifting'},{icon:'📦',text:'All India Shipping'},
  {icon:'⭐',text:'500+ Happy Customers'},{icon:'💝',text:'Custom Orders Available'},{icon:'✨',text:'Premium Yarn Quality'},
];
export function USPStrip() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-4 overflow-hidden">
      <motion.div className="flex gap-8 whitespace-nowrap" animate={{x:[0,'-50%']}} transition={{duration:20,repeat:Infinity,ease:'linear'}}>
        {[...USP,...USP].map((item,i) => (
          <div key={i} className="flex items-center gap-2 text-white font-semibold text-sm flex-shrink-0">
            <span className="text-base">{item.icon}</span><span>{item.text}</span><span className="text-white/40 ml-4">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// Category Grid
export function CategoryGrid() {
  return (
    <section id="categories" className="section-padding bg-white dark:bg-dark-card">
      <div className="container-max">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-12">
          <span className="text-primary font-semibold text-sm mb-2 block">Explore</span>
          <h2 className="section-title">Shop by Category 🛍️</h2>
          <p className="section-subtitle">Find exactly what you're looking for</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat,i) => (
            <motion.div key={cat.slug} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}}>
              <Link href={`/products?category=${cat.slug}`}>
                <motion.div whileHover={{y:-6,scale:1.02}} whileTap={{scale:0.97}} transition={{type:'spring',stiffness:300,damping:20}}
                  className={`relative overflow-hidden rounded-3xl p-6 cursor-pointer border border-primary/10 shadow-card hover:shadow-card-hover transition-shadow ${cat.color}`}>
                  <div className="text-4xl mb-3">{cat.emoji}</div>
                  <h3 className="font-playfair font-semibold text-sm leading-snug mb-1.5 text-text-primary dark:text-dark-text">{cat.name}</h3>
                  <p className="text-xs text-text-secondary mb-3">{cat.description}</p>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${cat.accent}`}>Browse <ArrowRight size={12} /></div>
                  <div className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-20 ${cat.accent.replace('text-','bg-')}`} />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Best Sellers
export function BestSellers({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="section-padding bg-gradient-to-br from-accent-warm/20 via-background to-primary/10 dark:from-dark-surface dark:via-dark-bg dark:to-dark-card">
      <div className="container-max">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-12">
          <span className="flex items-center justify-center gap-2 text-orange-500 font-semibold text-sm mb-2"><Flame size={16} />Most Loved</span>
          <h2 className="section-title">Best Sellers 🔥</h2>
          <p className="section-subtitle">Our customers' most-loved handmade pieces</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.slice(0,6).map((p,i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="text-center mt-10">
          <Link href="/products?sort=bestseller"><Button variant="secondary" size="lg">See All Best Sellers →</Button></Link>
        </motion.div>
      </div>
    </section>
  );
}

// How It Works
const STEPS = [
  {emoji:'🔍',step:'01',title:'Browse',description:'Explore our beautiful handcrafted collection. Filter by category, price, and availability.',color:'text-primary',bg:'bg-primary/10'},
  {emoji:'🛒',step:'02',title:'Choose Platform',description:'Buy from Amazon, Flipkart, Meesho, Etsy, or order directly via WhatsApp — your choice!',color:'text-secondary',bg:'bg-secondary/10'},
  {emoji:'📦',step:'03',title:'Receive',description:'Get your handmade treasure delivered right to your door, lovingly packed with care.',color:'text-success',bg:'bg-success/10'},
];
export function HowItWorks() {
  return (
    <section className="section-padding bg-white dark:bg-dark-card">
      <div className="container-max">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-16">
          <span className="text-primary font-semibold text-sm mb-2 block">Simple Process</span>
          <h2 className="section-title">How It Works 💫</h2>
          <p className="section-subtitle">Getting your handmade treasure is easy!</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {STEPS.map((s,i) => (
            <motion.div key={s.step} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.15}} className="flex flex-col items-center text-center">
              <motion.div whileHover={{scale:1.08,rotate:5}} transition={{type:'spring',stiffness:300}} className={`w-24 h-24 ${s.bg} rounded-3xl flex items-center justify-center mb-6 shadow-soft text-4xl relative`}>
                {s.emoji}
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-white dark:bg-dark-card rounded-full border-2 border-primary/20 flex items-center justify-center text-xs font-bold text-primary shadow-soft">{s.step}</span>
              </motion.div>
              <h3 className={`font-playfair text-xl font-bold mb-3 ${s.color}`}>{s.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed max-w-xs">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
