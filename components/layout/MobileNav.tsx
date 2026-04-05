'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Search, Heart, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '@/app/providers';
import { cn } from '@/lib/utils';

const NAV = [
  { href:'/', icon:Home, label:'Home' },
  { href:'/products', icon:ShoppingBag, label:'Shop' },
  { href:'/products?focus=search', icon:Search, label:'Search' },
  { href:'/wishlist', icon:Heart, label:'Wishlist' },
  { href:'/admin', icon:Settings, label:'Admin' },
];

export function MobileNav() {
  const path = usePathname();
  const { wishlist } = useWishlist();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/90 dark:bg-dark-card/90 backdrop-blur-md border-t border-primary/10 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = path === href || (href !== '/' && path.startsWith(href.split('?')[0]));
          const isWish = href === '/wishlist';
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl relative">
              <motion.div animate={active ? {scale:1.1} : {scale:1}} className={cn('relative p-1.5 rounded-xl transition-colors', active ? 'text-primary' : 'text-text-secondary')}>
                <Icon size={22} fill={active ? 'currentColor' : 'none'} />
                {isWish && wishlist.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">{wishlist.length}</span>}
              </motion.div>
              <span className={cn('text-[10px] font-semibold', active ? 'text-primary' : 'text-text-secondary')}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
