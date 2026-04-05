import { Product, Category, SiteSettings } from './types';
import { SAMPLE_PRODUCTS } from './constants';

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || '';
const API_KEY = process.env.APPS_SCRIPT_API_KEY || '';
const USE_SAMPLE = !APPS_SCRIPT_URL;

async function fetchFromScript<T>(action: string, params: Record<string, string> = {}): Promise<T | null> {
  if (USE_SAMPLE) return null;
  try {
    const url = new URL(APPS_SCRIPT_URL);
    url.searchParams.set('action', action);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json() as T;
  } catch (e) {
    console.error(`[API] ${action}:`, e);
    return null;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await fetchFromScript<Product[]>('getProducts');
  return data || (SAMPLE_PRODUCTS as Product[]);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await fetchFromScript<Product>('getProduct', { slug });
  if (data) return data;
  return (SAMPLE_PRODUCTS as Product[]).find(p => p.slug === slug) || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await fetchFromScript<Product[]>('getFeatured');
  if (data) return data;
  return (SAMPLE_PRODUCTS as Product[]).filter(p => p.is_featured && p.is_visible);
}

export async function getBestsellerProducts(): Promise<Product[]> {
  const data = await fetchFromScript<Product[]>('getBestsellers');
  if (data) return data;
  return (SAMPLE_PRODUCTS as Product[]).filter(p => p.is_bestseller && p.is_visible);
}

export async function getCategories(): Promise<Category[]> {
  return (await fetchFromScript<Category[]>('getCategories')) || [];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await fetchFromScript<SiteSettings>('getSettings');
  return data || {
    brand_name: 'LoopedWithLove',
    tagline: 'Handmade with Love, One Stitch at a Time',
    whatsapp_number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999',
    instagram_url: 'https://instagram.com/loopedwithlove',
    facebook_url: '',
    youtube_url: '',
    email: 'hello@loopedwithlove.in',
    announcement_text: '🎉 Free shipping on orders above ₹499! Use code HANDMADE10 for 10% off.',
    hero_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90',
  };
}

export async function adminUpdateProduct(payload: { id: string; field: string; value: string | number | boolean }): Promise<{ success: boolean; message: string }> {
  if (USE_SAMPLE) return { success: true, message: 'Updated (demo mode — connect Google Sheets to save permanently)' };
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
      body: JSON.stringify({ action: 'updateProduct', ...payload }),
    });
    return await res.json();
  } catch {
    return { success: false, message: 'Update failed. Please try again.' };
  }
}

export async function getRelatedProducts(category: string, excludeSlug: string): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter(p => p.category === category && p.slug !== excludeSlug && p.is_visible).slice(0, 4);
}
