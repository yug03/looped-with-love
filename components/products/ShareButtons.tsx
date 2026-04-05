'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, MessageCircle, Share2 } from 'lucide-react';
import { generateShareText } from '@/lib/utils';

export function ShareButtons({ productName, price, productUrl, whatsappNumber }: { productName:string;price:number;productUrl:string;whatsappNumber:string }) {
  const [copied, setCopied] = useState(false);
  const text = generateShareText(productName, price, productUrl);
  const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  const copy = async () => { try { await navigator.clipboard.writeText(productUrl); setCopied(true); setTimeout(()=>setCopied(false),2000); } catch {} };
  return (
    <div className="pt-2">
      <p className="text-xs text-text-secondary font-semibold uppercase tracking-wide mb-3">Share This Product</p>
      <div className="flex items-center gap-2 flex-wrap">
        <motion.button whileTap={{scale:0.95}} onClick={copy} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors">
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Link'}
        </motion.button>
        <motion.a whileTap={{scale:0.95}} href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#25D366]/10 text-[#25D366] text-sm font-semibold hover:bg-[#25D366]/20 transition-colors">
          <MessageCircle size={14} />Share on WhatsApp
        </motion.a>
      </div>
    </div>
  );
}
