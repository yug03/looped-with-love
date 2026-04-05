import Link from 'next/link';
import { Instagram, Youtube, Facebook, Mail, MapPin, Heart } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import { YarnIcon, StitchPatternSVG } from '@/components/ui/Icons';

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-dark-card border-t border-primary/10 pb-20 md:pb-0">
      <div className="w-full overflow-hidden"><StitchPatternSVG className="w-full h-8 text-primary/20" /></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <YarnIcon className="w-8 h-8 text-primary" />
              <span className="font-playfair text-xl font-bold text-gradient">{settings.brand_name}</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">{settings.tagline}. Every product is handcrafted with love, one stitch at a time.</p>
            <div className="flex items-center gap-3">
              {[
                { url: settings.instagram_url, Icon: Instagram, label: 'Instagram' },
                { url: settings.facebook_url, Icon: Facebook, label: 'Facebook' },
                { url: settings.youtube_url, Icon: Youtube, label: 'YouTube' },
                { url: settings.email ? `mailto:${settings.email}` : '', Icon: Mail, label: 'Email' },
              ].filter(s => s.url).map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" aria-label={s.label}>
                  <s.Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-playfair font-semibold text-text-primary dark:text-dark-text mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/products', 'All Products'], ['/about', 'About Us'], ['/custom-orders', 'Custom Orders'], ['/contact', 'Contact'], ['/wishlist', 'My Wishlist']].map(([h, l]) => (
                <li key={h}><Link href={h} className="text-sm text-text-secondary hover:text-primary transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-playfair font-semibold text-text-primary dark:text-dark-text mb-4">Shop by Category</h3>
            <ul className="space-y-3">
              {[['bouquets-flowers','💐 Bouquets & Flowers'],['keychains-charms','🔑 Keychains & Charms'],['earrings-jewelry','👂 Earrings & Jewelry'],['amigurumi','🧸 Amigurumi Toys'],['gift-hampers','🎁 Gift Hampers'],['home-decor','🏠 Home Décor']].map(([s,l]) => (
                <li key={s}><Link href={`/products?category=${s}`} className="text-sm text-text-secondary hover:text-primary transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-playfair font-semibold text-text-primary dark:text-dark-text mb-4">Find Us On</h3>
            <div className="space-y-3">
              {[['🛒 Amazon','text-orange-500'],['🛍️ Flipkart','text-blue-500'],['🏪 Meesho','text-pink-500'],['🌿 Etsy','text-orange-600']].map(([l,c]) => (
                <div key={l} className={`text-sm font-medium ${c}`}>{l}</div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary/5 rounded-2xl">
              <p className="text-xs text-text-secondary"><MapPin size={12} className="inline mr-1" />Ships all across India 🇮🇳</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">© {year} {settings.brand_name}. All rights reserved.</p>
          <p className="text-sm text-text-secondary flex items-center gap-1">Made with <Heart size={14} className="text-primary fill-primary" /> and yarn</p>
        </div>
      </div>
    </footer>
  );
}
