'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WishlistItem } from '@/lib/types';

interface WishCtx { wishlist:WishlistItem[]; addToWishlist:(i:WishlistItem)=>void; removeFromWishlist:(id:string)=>void; isInWishlist:(id:string)=>boolean; toggleWishlist:(i:WishlistItem)=>void; }
const WishlistContext = createContext<WishCtx>({ wishlist:[], addToWishlist:()=>{}, removeFromWishlist:()=>{}, isInWishlist:()=>false, toggleWishlist:()=>{} });
export function useWishlist() { return useContext(WishlistContext); }

export function Providers({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  useEffect(() => { try { const s=localStorage.getItem('lwl_wishlist'); if(s) setWishlist(JSON.parse(s)); } catch {} }, []);
  const save = (items: WishlistItem[]) => { setWishlist(items); localStorage.setItem('lwl_wishlist',JSON.stringify(items)); };
  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist: i => { if(!wishlist.find(w=>w.id===i.id)) save([...wishlist,i]); },
      removeFromWishlist: id => save(wishlist.filter(w=>w.id!==id)),
      isInWishlist: id => wishlist.some(w=>w.id===id),
      toggleWishlist: i => wishlist.some(w=>w.id===i.id) ? save(wishlist.filter(w=>w.id!==i.id)) : save([...wishlist,i]),
    }}>
      {children}
    </WishlistContext.Provider>
  );
}
