'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useWishlist } from '@/app/providers';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { StockBadge } from '@/components/products/StockBadge';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3">
            <Heart size={28} className="text-primary" fill="currentColor" />
            <div>
              <h1 className="font-playfair text-4xl font-bold text-text-primary dark:text-dark-text">My Wishlist</h1>
              <p className="text-text-secondary mt-1">{wishlist.length===0?'Your wishlist is empty':`${wishlist.length} item${wishlist.length!==1?'s':''} saved`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlist.length===0 ? (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex flex-col items-center justify-center py-24 text-center">
            <motion.div animate={{scale:[1,1.05,1]}} transition={{duration:2,repeat:Infinity}} className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center mb-6"><Heart size={48} className="text-primary"/></motion.div>
            <h2 className="font-playfair text-2xl font-bold text-text-primary dark:text-dark-text mb-3">Your Wishlist is Empty 🧶</h2>
            <p className="text-text-secondary mb-8 max-w-sm">Discover our handmade collection and save your favourite pieces here for later!</p>
            <Link href="/products"><Button size="lg" icon={<ShoppingBag size={18}/>}>Start Exploring</Button></Link>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
              <AnimatePresence mode="popLayout">
                {wishlist.map(item=>(
                  <motion.div key={item.id} layout initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.8}} className="card-base overflow-hidden group">
                    <Link href={`/products/${item.slug}`} className="block">
                      <div className="relative" style={{aspectRatio:'1/1'}}>
                        <Image src={item.image1} alt={item.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width:640px) 50vw,20vw" />
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] font-semibold text-secondary uppercase tracking-wide mb-0.5">{item.category}</p>
                        <h3 className="font-playfair font-semibold text-sm text-text-primary dark:text-dark-text line-clamp-2 mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                        <p className="font-bold text-primary text-lg">{formatPrice(item.price)}</p>
                        <div className="mt-2"><StockBadge status={item.stock_status as 'In Stock'|'Out of Stock'} compact /></div>
                      </div>
                    </Link>
                    <div className="px-3 pb-3">
                      <button onClick={()=>removeFromWishlist(item.id)} className="flex items-center gap-1.5 text-xs text-danger hover:bg-danger/10 px-2.5 py-1.5 rounded-lg font-semibold transition-colors w-full justify-center">
                        <Trash2 size={12}/>Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="text-center"><Link href="/products"><Button variant="secondary" icon={<ShoppingBag size={16}/>}>Continue Shopping</Button></Link></div>
          </>
        )}
      </div>
    </div>
  );
}
