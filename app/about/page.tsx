import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Award, Users } from 'lucide-react';

export const metadata: Metadata = { title:'About Us — Our Story', description:'Learn about the maker behind LoopedWithLove — the passion, the journey, and the love that goes into every handmade crochet product.' };

const VALS = [
  {icon:Heart,title:'Made with Love',desc:'Every product is handcrafted with genuine care and attention. No machines, no shortcuts — just pure craftsmanship.',c:'text-primary',bg:'bg-primary/10'},
  {icon:Star,title:'Quality First',desc:'We use only premium yarns and materials. Each piece is carefully checked before it reaches you.',c:'text-amber-500',bg:'bg-amber-50 dark:bg-amber-900/20'},
  {icon:Award,title:'Unique Designs',desc:'Our designs are original and thoughtfully created. When you shop here, you get something truly one of a kind.',c:'text-secondary',bg:'bg-secondary/10'},
  {icon:Users,title:'Community',desc:'Every purchase supports a small handmade business and keeps craftsmanship alive.',c:'text-success',bg:'bg-success/10'},
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm block mb-3">Our Story</span>
              <h1 className="section-title text-5xl mb-6">Where Yarn Meets <span className="text-gradient">Heart</span> 🧶</h1>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p className="text-lg">Hi! I'm the maker behind LoopedWithLove. What started as a quiet hobby during lockdown has blossomed into a full-blown passion — and now, a little shop that brings handmade joy to hundreds of homes across India.</p>
                <p>I remember buying my first crochet hook with absolutely no idea what I was doing. YouTube tutorials, tangled yarn, lots of frogging — but I kept going. There was something magical about turning a simple strand of yarn into something beautiful.</p>
                <p>Today, every stitch I make carries that same sense of wonder. Whether it's a tiny keychain or an elaborate bouquet, each product gets my full attention and care. 💝</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/products" className="btn-primary">Shop My Collection</Link>
                <Link href="/custom-orders" className="btn-secondary">Custom Orders</Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-card-hover" style={{aspectRatio:'4/5'}}>
                <Image src="https://images.unsplash.com/photo-1594544109078-3b5ad55c54b7?w=700&q=85" alt="The maker crocheting" fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" priority />
              </div>
              <div className="absolute -bottom-4 -left-4 card-base p-4 shadow-card-hover"><p className="font-playfair text-lg font-bold text-primary">🧶 Made in India</p><p className="text-xs text-text-secondary">Handcrafted with premium yarn</p></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-white dark:bg-dark-card">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[['🧶','3+ Years','of Crocheting'],['❤️','500+','Happy Customers'],['🎨','50+','Unique Designs'],['🇮🇳','Pan India','Shipping']].map(([e,v,l])=>(
              <div key={l} className="card-base p-6 text-center hover:shadow-card-hover transition-shadow">
                <div className="text-4xl mb-3">{e}</div>
                <p className="font-playfair text-2xl font-bold text-primary mb-1">{v}</p>
                <p className="text-sm text-text-secondary">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12"><h2 className="section-title">What We Stand For 💫</h2><p className="section-subtitle">The values that guide every stitch</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALS.map(v=>(
              <div key={v.title} className="card-base p-6 hover:shadow-card-hover transition-shadow">
                <div className={`w-12 h-12 ${v.bg} rounded-2xl flex items-center justify-center mb-4`}><v.icon size={22} className={v.c} /></div>
                <h3 className="font-playfair font-bold text-lg text-text-primary dark:text-dark-text mb-2">{v.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
