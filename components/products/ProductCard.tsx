'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { Badge } from '@/components/ui/Skeleton';
import { StockBadge } from './StockBadge';
import { useWishlist } from '@/app/providers';
import { formatPrice, calculateDiscount, isNewProduct, getGoogleDriveImageUrl, cn } from '@/lib/utils';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWish = isInWishlist(product.id);
  const isNew = isNewProduct(product.timestamp);
  const hasDisc = product.mrp && product.mrp > product.price;
  const pct = hasDisc ? calculateDiscount(product.price, product.mrp!) : 0;
  const img1 = getGoogleDriveImageUrl(product.image1);
  const img2 = product.image2 ? getGoogleDriveImageUrl(product.image2) : null;
  const fallback = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70';

  return (
    <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-50px'}} transition={{duration:0.4,delay:index*0.05}}>
      <Link href={`/products/${product.slug}`} className="block group">
        <motion.article whileHover={{y:-4}} transition={{type:'spring',stiffness:300,damping:25}}
          onHoverStart={()=>setHovered(true)} onHoverEnd={()=>setHovered(false)}
          className="card-base overflow-hidden product-card cursor-pointer h-full">
          <div className="product-card-image-container relative bg-gray-50 dark:bg-dark-surface" style={{aspectRatio:'1/1'}}>
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
              {isNew && <Badge variant="new">✨ New</Badge>}
              {product.is_bestseller && <Badge variant="bestseller">🔥 Best Seller</Badge>}
              {hasDisc && <Badge variant="warning">{pct}% OFF</Badge>}
            </div>
            <motion.button whileTap={{scale:0.85}} onClick={e=>{e.preventDefault();e.stopPropagation();toggleWishlist({id:product.id,name:product.name,price:product.price,image1:product.image1,slug:product.slug,category:product.category,stock_status:product.stock_status});}}
              className={cn('absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-soft backdrop-blur-sm transition-all', inWish ? 'bg-primary text-white' : 'bg-white/80 text-text-secondary hover:text-primary hover:bg-white')}
              aria-label={inWish ? 'Remove from wishlist' : 'Add to wishlist'}>
              <Heart size={16} fill={inWish ? 'currentColor' : 'none'} strokeWidth={2} />
            </motion.button>
            <div className="relative w-full h-full">
              <Image src={imgErr ? fallback : img1} alt={product.name} fill className={cn('object-cover transition-all duration-500', hovered && img2 ? 'opacity-0' : 'opacity-100')} sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw" onError={()=>setImgErr(true)} />
              {img2 && hovered && <Image src={img2} alt={`${product.name} alt`} fill className="object-cover" sizes="(max-width:640px) 50vw,25vw" />}
            </div>
            {product.stock_status === 'Out of Stock' && (
              <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                <span className="bg-white px-3 py-1.5 rounded-full text-xs font-bold text-danger shadow-soft">Out of Stock</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <p className="text-[11px] font-semibold text-secondary uppercase tracking-wider mb-1">{product.category}</p>
            <h3 className="font-playfair font-semibold text-text-primary dark:text-dark-text text-base leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
            <p className="text-xs text-text-secondary line-clamp-2 mb-3">{product.short_description}</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-playfair text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                {hasDisc && <span className="ml-2 text-sm text-text-secondary line-through">{formatPrice(product.mrp!)}</span>}
              </div>
              <StockBadge status={product.stock_status} quantity={product.quantity} compact />
            </div>
            <motion.div initial={{opacity:0,height:0}} animate={hovered ? {opacity:1,height:'auto'} : {opacity:0,height:0}} className="overflow-hidden">
              <div className="pt-3 mt-3 border-t border-primary/10">
                <div className="flex items-center gap-2 text-xs text-primary font-semibold"><ShoppingCart size={14} />View & Buy</div>
              </div>
            </motion.div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
