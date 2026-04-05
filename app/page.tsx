import { Suspense } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { USPStrip, CategoryGrid, BestSellers, HowItWorks } from '@/components/home/HomeComponents';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Testimonials, AboutMaker, InstagramSection } from '@/components/home/OtherHomeComponents';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { getSiteSettings, getFeaturedProducts, getBestsellerProducts } from '@/lib/api';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, featured, bestsellers] = await Promise.all([getSiteSettings(), getFeaturedProducts(), getBestsellerProducts()]);
  const jsonLd = { '@context':'https://schema.org', '@type':'Organization', name:settings.brand_name, description:settings.tagline, url:process.env.NEXT_PUBLIC_SITE_URL, sameAs:[settings.instagram_url,settings.facebook_url,settings.youtube_url].filter(Boolean) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}} />
      <HeroSection heroImageUrl={settings.hero_image_url} whatsappNumber={settings.whatsapp_number} />
      <USPStrip />
      <Suspense fallback={<div className="section-padding"><ProductGridSkeleton count={8} /></div>}>
        <FeaturedProducts products={featured} />
      </Suspense>
      <CategoryGrid />
      <Suspense fallback={<div className="section-padding"><ProductGridSkeleton count={4} /></div>}>
        <BestSellers products={bestsellers} />
      </Suspense>
      <HowItWorks />
      <Testimonials />
      <InstagramSection instagramUrl={settings.instagram_url} />
      <AboutMaker />
    </>
  );
}
