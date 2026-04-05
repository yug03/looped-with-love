'use client';
import { motion } from 'framer-motion';
import { ExternalLink, MessageCircle, ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/types';
import { generateWhatsAppUrl } from '@/lib/utils';

const MARKETS = [
  { key:'link_amazon', name:'Buy on Amazon', emoji:'🛒', bg:'bg-[#FFF8EE]', text:'text-[#C45500]', border:'border-[#FF9900]/40', hover:'hover:bg-[#FF9900]/10' },
  { key:'link_flipkart', name:'Buy on Flipkart', emoji:'🛍️', bg:'bg-[#EEF4FF]', text:'text-[#2874F0]', border:'border-[#2874F0]/40', hover:'hover:bg-[#2874F0]/10' },
  { key:'link_meesho', name:'Buy on Meesho', emoji:'🏪', bg:'bg-[#FFF0F8]', text:'text-[#F43397]', border:'border-[#F43397]/40', hover:'hover:bg-[#F43397]/10' },
  { key:'link_etsy', name:'Buy on Etsy', emoji:'🌿', bg:'bg-[#FFF4EE]', text:'text-[#F56400]', border:'border-[#F56400]/40', hover:'hover:bg-[#F56400]/10' },
  { key:'link_instagram', name:'View on Instagram', emoji:'📸', bg:'bg-[#FFF0F5]', text:'text-[#E1306C]', border:'border-[#E1306C]/40', hover:'hover:bg-[#E1306C]/10' },
];

export function BuyLinks({ product, whatsappNumber, siteUrl }: { product: Product; whatsappNumber: string; siteUrl?: string }) {
  const productUrl = siteUrl ? `${siteUrl}/products/${product.slug}` : (typeof window !== 'undefined' ? `${window.location.origin}/products/${product.slug}` : '');
  const waUrl = generateWhatsAppUrl(whatsappNumber, product.name, product.price, productUrl);
  const available = MARKETS.filter(m => Boolean(product[m.key as keyof Product]));

  return (
    <div className="card-base p-6">
      <h2 className="font-playfair text-xl font-bold text-text-primary dark:text-dark-text mb-2 flex items-center gap-2">
        <ShoppingBag size={22} className="text-primary" />Get Yours Now
      </h2>
      <p className="text-text-secondary text-sm mb-6">Choose your preferred platform to purchase:</p>
      <div className="space-y-3">
        {available.map((m, i) => (
          <motion.a key={m.key} href={String(product[m.key as keyof Product])} target="_blank" rel="noopener noreferrer"
            initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}}
            whileHover={{scale:1.01,x:4}} whileTap={{scale:0.98}}
            className={`flex items-center justify-between gap-3 w-full py-4 px-5 rounded-2xl border-2 font-bold text-base transition-all ${m.bg} ${m.text} ${m.border} ${m.hover}`}>
            <span className="flex items-center gap-3"><span className="text-xl">{m.emoji}</span>{m.name}</span>
            <ExternalLink size={18} className="opacity-60" />
          </motion.a>
        ))}
        <motion.a href={waUrl} target="_blank" rel="noopener noreferrer"
          initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:available.length*0.08}}
          whileHover={{scale:1.01,x:4}} whileTap={{scale:0.98}}
          className="flex items-center justify-between gap-3 w-full py-4 px-5 rounded-2xl bg-[#EDFFF4] text-[#25D366] border-2 border-[#25D366]/40 hover:bg-[#25D366]/10 font-bold text-base transition-all">
          <span className="flex items-center gap-3"><MessageCircle size={22} />WhatsApp Order</span>
          <span className="text-xs opacity-70 font-normal">Chat & Buy</span>
        </motion.a>
        {product.link_other_url && product.link_other_name && (
          <motion.a href={product.link_other_url} target="_blank" rel="noopener noreferrer" whileHover={{scale:1.01,x:4}} whileTap={{scale:0.98}}
            className="flex items-center justify-between gap-3 w-full py-4 px-5 rounded-2xl bg-secondary/10 text-secondary border-2 border-secondary/30 hover:bg-secondary/20 font-bold text-base transition-all">
            <span className="flex items-center gap-3"><ShoppingBag size={20} />{product.link_other_name}</span>
            <ExternalLink size={18} className="opacity-60" />
          </motion.a>
        )}
      </div>
      <p className="text-xs text-text-secondary mt-4 text-center">💝 All links open in a new tab. Safe & secure shopping.</p>
    </div>
  );
}
