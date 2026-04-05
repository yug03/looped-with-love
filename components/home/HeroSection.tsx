'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { YarnBallSVG } from '@/components/ui/Icons';
import { generateWhatsAppUrl } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function HeroSection({ heroImageUrl, whatsappNumber }: { heroImageUrl: string; whatsappNumber: string }) {
  const waUrl = generateWhatsAppUrl(whatsappNumber, 'a custom crochet product', 0);
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10 dark:from-dark-bg dark:via-dark-surface dark:to-dark-card">
      <div className="absolute inset-0">
        <Image src={heroImageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90'} alt="Handmade crochet products" fill className="object-cover opacity-20 dark:opacity-10" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/40 dark:from-dark-bg/90 dark:via-dark-bg/70 dark:to-dark-bg/40" />
      </div>
      <motion.div animate={{y:[0,-15,0],rotate:[0,5,0]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut'}} className="absolute top-20 right-8 md:right-24 opacity-30">
        <YarnBallSVG className="w-24 h-24 md:w-36 md:h-36 text-primary" />
      </motion.div>
      <motion.div animate={{y:[0,12,0],rotate:[0,-8,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut',delay:1}} className="absolute bottom-24 right-16 md:right-48 opacity-20">
        <YarnBallSVG className="w-16 h-16 md:w-24 md:h-24 text-secondary" />
      </motion.div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 text-primary rounded-full text-sm font-semibold mb-6 border border-primary/20">🧶 Handcrafted with love, one stitch at a time</span>
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.1}} className="font-playfair text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary dark:text-dark-text leading-tight mb-4">
            Handmade <span className="text-gradient">with Love</span> <span className="text-4xl md:text-5xl">🧶</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.2}} className="font-playfair text-xl md:text-2xl text-text-secondary italic mb-8">Where Every Loop Tells a Story</motion.p>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.3}} className="text-text-secondary text-lg mb-10 max-w-lg leading-relaxed">Discover our collection of handcrafted crochet treasures — from eternal flower bouquets to adorable amigurumi, each piece made with patience, passion, and premium yarn.</motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.4}} className="flex flex-wrap gap-4">
            <Link href="/products"><Button size="lg" icon={<ArrowRight size={20} />} iconPosition="right" className="font-playfair text-base">Explore Collection</Button></Link>
            <a href={waUrl} target="_blank" rel="noopener noreferrer"><Button variant="secondary" size="lg" icon={<MessageCircle size={20} />} className="font-playfair text-base">Custom Orders</Button></a>
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.5}} className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-primary/20">
            {[['500+','Happy Customers'],['100%','Handmade'],['10+','Categories'],['🇮🇳','All India Shipping']].map(([v,l])=>(
              <div key={l} className="text-center"><div className="font-playfair text-2xl font-bold text-primary">{v}</div><div className="text-xs text-text-secondary font-medium">{l}</div></div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
