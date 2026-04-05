import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Clock } from 'lucide-react';
import { getSiteSettings } from '@/lib/api';

export const metadata: Metadata = { title:'Custom Orders', description:'Order a personalised handmade crochet piece! Custom bouquets, keychains, toys & more — made especially for you.' };
export const revalidate = 3600;

const STEPS = [
  {emoji:'💬',step:'01',title:'Share Your Idea',desc:"Contact us via WhatsApp. Tell us what you'd like — product type, size, colors, occasion, and any special requirements."},
  {emoji:'💰',step:'02',title:'Get a Quote',desc:"We'll send you a detailed quote within 24 hours. No hidden charges!"},
  {emoji:'🧶',step:'03',title:'We Craft It',desc:"Once you confirm and pay, we start crafting your piece with love. We share progress photos on WhatsApp."},
  {emoji:'📦',step:'04',title:'Receive It',desc:"Your custom creation is beautifully packaged and shipped to your door with tracking."},
];

const PRICING = [
  {cat:'Keychains & Small Items',range:'₹99 – ₹299',ex:'Keychains, bookmarks, earrings',days:'2–3 days'},
  {cat:'Flowers & Bouquets',range:'₹149 – ₹1,499',ex:'Single stems, bouquets, wreaths',days:'3–5 days'},
  {cat:'Amigurumi Toys',range:'₹399 – ₹999',ex:'Stuffed animals, dolls, characters',days:'5–7 days'},
  {cat:'Gift Hampers',range:'₹599 – ₹2,499',ex:'Curated sets, festival hampers',days:'5–7 days'},
  {cat:'Home Décor',range:'₹249 – ₹1,999',ex:'Coasters, wall hangings, baskets',days:'5–10 days'},
  {cat:'Wearables',range:'₹149 – ₹699',ex:'Scrunchies, headbands, bags',days:'3–5 days'},
];

export default async function CustomOrdersPage() {
  const s = await getSiteSettings();
  const waUrl = `https://wa.me/${s.whatsapp_number.replace(/\D/g,'')}?text=${encodeURIComponent("Hi! I'd like to place a custom crochet order 🧶\n\nProduct idea:\nColors preferred:\nOccasion:\nQuantity:\nDeadline:")}`;
  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      <section className="section-padding bg-gradient-to-br from-secondary/10 via-background to-primary/10">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-secondary font-semibold text-sm block mb-3">Made Just for You</span>
              <h1 className="section-title text-5xl mb-6">Custom Orders 🎨</h1>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">Can't find exactly what you're looking for? We create custom, personalised crochet pieces tailored to your vision — from wedding favors to birthday gifts, corporate hampers to nursery décor.</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {['✅ Personalised designs','✅ Custom color choices','✅ Bulk order discounts','✅ Progress updates','✅ Gift packaging','✅ Festival specials'].map(i=><div key={i} className="text-sm font-medium text-text-secondary">{i}</div>)}
              </div>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2"><MessageCircle size={20}/>Start Your Custom Order</a>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover" style={{aspectRatio:'4/3'}}>
              <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85" alt="Custom crochet" fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
              <div className="absolute bottom-4 left-4 card-base px-4 py-3"><p className="font-playfair font-bold text-primary text-base">Starting ₹99</p><p className="text-xs text-text-secondary">For most custom pieces</p></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-white dark:bg-dark-card">
        <div className="container-max">
          <div className="text-center mb-14"><h2 className="section-title">How Custom Orders Work</h2><p className="section-subtitle">Simple, transparent, and fun!</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s,i)=>(
              <div key={i} className="card-base p-6 text-center hover:shadow-card-hover transition-shadow">
                <div className="relative w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl">
                  {s.emoji}<span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">{s.step}</span>
                </div>
                <h3 className="font-playfair font-bold text-lg text-text-primary dark:text-dark-text mb-2">{s.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12"><h2 className="section-title">Pricing Guide</h2><p className="section-subtitle">Transparent pricing, no surprises</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {PRICING.map(p=>(
              <div key={p.cat} className="card-base p-6 hover:shadow-card-hover transition-shadow">
                <h3 className="font-playfair font-semibold text-base text-text-primary dark:text-dark-text mb-1">{p.cat}</h3>
                <p className="font-bold text-2xl text-primary mb-2">{p.range}</p>
                <p className="text-xs text-text-secondary mb-2">{p.ex}</p>
                <div className="flex items-center gap-1.5 text-xs text-success font-semibold"><Clock size={11}/>Turnaround: {p.days}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-text-secondary mt-6">* Prices vary based on complexity, size, and quantity. Final quote provided on WhatsApp.</p>
          <div className="mt-12 card-base p-10 md:p-16 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <div className="text-5xl mb-4">🧶</div>
            <h2 className="section-title mb-4">Ready to Create Something Special?</h2>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2"><MessageCircle size={20}/>WhatsApp Us Now</a>
              <Link href="/contact" className="btn-secondary text-base px-8 py-4">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
