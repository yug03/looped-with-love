import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/api';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://loopedwithlove.vercel.app';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const statics: MetadataRoute.Sitemap = [
    {url:SITE,lastModified:new Date(),changeFrequency:'daily',priority:1},
    {url:`${SITE}/products`,lastModified:new Date(),changeFrequency:'hourly',priority:0.9},
    {url:`${SITE}/about`,lastModified:new Date(),changeFrequency:'monthly',priority:0.6},
    {url:`${SITE}/contact`,lastModified:new Date(),changeFrequency:'monthly',priority:0.6},
    {url:`${SITE}/custom-orders`,lastModified:new Date(),changeFrequency:'monthly',priority:0.7},
  ];
  const dynamic: MetadataRoute.Sitemap = products.filter(p=>p.is_visible).map(p=>({url:`${SITE}/products/${p.slug}`,lastModified:new Date(p.timestamp),changeFrequency:'weekly' as const,priority:0.8}));
  return [...statics,...dynamic];
}
