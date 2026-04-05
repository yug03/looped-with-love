'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Heart, ArrowRight, Instagram } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

// Testimonials
export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx(i=>(i+1)%TESTIMONIALS.length);
  const prev = () => setIdx(i=>(i-1+TESTIMONIALS.length)%TESTIMONIALS.length);
  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-dark-surface dark:via-dark-bg dark:to-dark-card">
      <div className="container-max">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-14">
          <span className="text-primary font-semibold text-sm mb-2 block">Customer Love</span>
          <h2 className="section-title">What They Say 💌</h2>
          <p className="section-subtitle">Real words from our happiest customers</p>
        </motion.div>
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t,i) => (
            <motion.div key={t.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="card-base p-6 relative">
              <Quote size={24} className="text-primary/20 mb-4" />
              <p className="text-text-secondary text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{t.avatar}</div>
                <div><p className="font-semibold text-sm text-text-primary dark:text-dark-text">{t.name}</p><p className="text-xs text-text-secondary">{t.location} · {t.date}</p></div>
              </div>
              <div className="flex items-center gap-0.5 mt-3">{Array.from({length:t.rating}).map((_,j)=><Star key={j} size={13} className="text-accent-warm fill-accent-warm" />)}</div>
              <div className="absolute top-4 right-4"><span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">{t.product}</span></div>
            </motion.div>
          ))}
        </div>
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{duration:0.3}} className="card-base p-6">
              <Quote size={24} className="text-primary/20 mb-4" />
              <p className="text-text-secondary text-sm leading-relaxed mb-5 italic">"{TESTIMONIALS[idx].text}"</p>
              <div className="flex items-center gap-0.5 mb-4">{Array.from({length:TESTIMONIALS[idx].rating}).map((_,j)=><Star key={j} size={14} className="text-accent-warm fill-accent-warm" />)}</div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">{TESTIMONIALS[idx].avatar}</div>
                <div><p className="font-semibold text-sm text-text-primary dark:text-dark-text">{TESTIMONIALS[idx].name}</p><p className="text-xs text-text-secondary">{TESTIMONIALS[idx].location}</p></div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all"><ChevronLeft size={16} /></button>
            <div className="flex gap-1.5">{TESTIMONIALS.map((_,i)=><button key={i} onClick={()=>setIdx(i)} className={`h-1.5 rounded-full transition-all ${i===idx?'w-6 bg-primary':'w-1.5 bg-primary/30'}`} />)}</div>
            <button onClick={next} className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

// About Maker
export function AboutMaker() {
  return (
    <section className="section-padding bg-white dark:bg-dark-card">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover" style={{aspectRatio:'4/5'}}>
              <Image src="https://images.unsplash.com/photo-1594544109078-3b5ad55c54b7?w=600&q=80" alt="The maker handcrafting with love" fill className="object-cover" sizes="(max-width:768px) 100vw,50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            <motion.div animate={{y:[0,-8,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}} className="absolute -bottom-6 -right-4 md:-right-8 card-base p-4 shadow-card-hover max-w-[160px]">
              <p className="font-playfair text-2xl font-bold text-primary">500+</p>
              <p className="text-xs text-text-secondary">Happy customers across India 🇮🇳</p>
            </motion.div>
          </motion.div>
          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <span className="flex items-center gap-2 text-primary font-semibold text-sm mb-4"><Heart size={16} fill="currentColor" />Our Story</span>
            <h2 className="section-title mb-6">Hi, I'm the Maker Behind the Magic! 🌸</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>I started with a single crochet hook and a dream — to create something beautiful with my own hands. What began as a hobby quickly became a passion, and soon enough, a little business built on love!</p>
              <p>Every product in this shop is handcrafted by me, right here from my cozy craft corner. I pour my heart into each stitch, making sure every piece that leaves my hands is something truly special.</p>
              <p>When you buy from LoopedWithLove, you're not just getting a product — you're getting a piece of art made with patience, care, and a whole lot of yarn. 🧶</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">Read Our Full Story <ArrowRight size={16} /></Link>
              <Link href="/custom-orders" className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all">Custom Orders <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Instagram Section
const IG_IMAGES = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&q=80',
  'https://images.unsplash.com/photo-1490750967868-88df5691cc1e?w=400&q=80',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
  'https://images.unsplash.com/photo-1590333748338-d629e4564ad9?w=400&q=80',
];

export function InstagramSection({ instagramUrl }: { instagramUrl: string }) {
  return (
    <section className="section-padding bg-gradient-to-br from-background to-primary/5 dark:from-dark-bg dark:to-dark-surface overflow-hidden">
      <div className="container-max">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-10">
          <span className="flex items-center justify-center gap-2 text-[#E1306C] font-semibold text-sm mb-3"><Instagram size={16} />Follow Our Journey</span>
          <h2 className="section-title">@loopedwithlove 📸</h2>
          <p className="section-subtitle">Behind the stitches, the process, and the joy</p>
        </motion.div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-8">
          {IG_IMAGES.map((img,i) => (
            <motion.a key={i} href={instagramUrl||'https://instagram.com'} target="_blank" rel="noopener noreferrer"
              initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*0.07}}
              whileHover={{scale:1.05,zIndex:10}} className="relative rounded-2xl overflow-hidden shadow-card group" style={{aspectRatio:'1/1'}}>
              <Image src={img} alt={`Instagram post ${i+1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:768px) 33vw,16vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram size={22} className="text-white" />
              </div>
            </motion.a>
          ))}
        </div>
        <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center">
          <a href={instagramUrl||'https://instagram.com'} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg">
            <Instagram size={18} />Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
