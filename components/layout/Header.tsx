'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, Menu, X, Sun, Moon, ShoppingBag } from 'lucide-react';
import { useTheme } from '@/components/ui/ThemeProvider';
import { useWishlist } from '@/app/providers';
import { SiteSettings } from '@/lib/types';
import { YarnIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href:'/', label:'Home' }, { href:'/products', label:'Shop' },
  { href:'/products#categories', label:'Categories' }, { href:'/about', label:'About' },
  { href:'/contact', label:'Contact' }, { href:'/custom-orders', label:'Custom Orders' },
];

export function Header({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { setMobileOpen(false); }, [path]);

  return (
    <>
      <header className={cn('sticky top-0 z-40 w-full transition-all duration-300', scrolled ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-soft border-b border-primary/10' : 'bg-background dark:bg-dark-bg')}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <motion.div whileHover={{rotate:15,scale:1.1}} transition={{type:'spring',stiffness:300}}>
                <YarnIcon className="w-8 h-8 text-primary" />
              </motion.div>
              <div>
                <span className="font-playfair text-xl font-bold text-gradient">{settings.brand_name}</span>
                <p className="text-[10px] text-text-secondary leading-none hidden sm:block">Handmade with love 🧶</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(l => (
                <Link key={l.href} href={l.href} className={cn('px-4 py-2 rounded-xl text-sm font-semibold transition-all', path === l.href ? 'text-primary bg-primary/10' : 'text-text-secondary hover:text-primary hover:bg-primary/10')}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Link href="/products" className="hidden md:flex p-2.5 rounded-xl hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors" aria-label="Search">
                <Search size={20} />
              </Link>
              <Link href="/wishlist" className="p-2.5 rounded-xl hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors relative" aria-label="Wishlist">
                <Heart size={20} />
                {wishlist.length > 0 && <motion.span initial={{scale:0}} animate={{scale:1}} className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishlist.length}</motion.span>}
              </Link>
              <button onClick={toggleTheme} className="p-2.5 rounded-xl hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors" aria-label="Toggle dark mode">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setMobileOpen(true)} className="md:hidden p-2.5 rounded-xl hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors" aria-label="Open menu">
                <Menu size={22} />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:30,stiffness:300}} className="fixed top-0 right-0 h-full w-72 z-50 bg-white dark:bg-dark-card shadow-2xl md:hidden">
              <div className="flex items-center justify-between p-5 border-b border-primary/10">
                <div className="flex items-center gap-2">
                  <YarnIcon className="w-7 h-7 text-primary" />
                  <span className="font-playfair text-lg font-bold text-gradient">{settings.brand_name}</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-primary/10 text-text-secondary"><X size={20} /></button>
              </div>
              <nav className="p-4 space-y-1">
                {NAV_LINKS.map(l => (
                  <Link key={l.href} href={l.href} className={cn('flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-semibold transition-all', path === l.href ? 'bg-primary/15 text-primary' : 'text-text-secondary hover:bg-primary/10 hover:text-primary')}>
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-primary/10 space-y-3">
                <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-text-secondary hover:bg-primary/10 hover:text-primary transition-all">
                  <Heart size={18} /> Wishlist ({wishlist.length})
                </Link>
                <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-text-secondary hover:bg-primary/10 hover:text-primary transition-all">
                  <ShoppingBag size={18} /> Admin Panel
                </Link>
                <button onClick={toggleTheme} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-text-secondary hover:bg-primary/10 hover:text-primary transition-all w-full">
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />} {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
