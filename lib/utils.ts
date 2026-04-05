import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Product, FilterState } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateDiscount(price: number, mrp: number): number {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function isNewProduct(timestamp: string, days = 7): boolean {
  try {
    const diffDays = (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= days;
  } catch { return false; }
}

export function generateWhatsAppUrl(
  phoneNumber: string,
  productName: string,
  price: number,
  productUrl?: string
): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const msg = productUrl
    ? `Hi! I want to buy *${productName}* (₹${price}). Is it available? 🧶\n\nProduct link: ${productUrl}`
    : `Hi! I want to buy *${productName}* (₹${price}). Is it available? 🧶`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
}

export function generateShareText(productName: string, price: number, url: string): string {
  return `✨ Check out "${productName}" (₹${price}) on LoopedWithLove! 🧶\nHandmade with love 💝\n${url}`;
}

export function getGoogleDriveImageUrl(url: string): string {
  if (!url) return '';
  if (!url.includes('drive.google.com')) return url;
  const patterns = [
    /https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view/,
    /https:\/\/drive\.google\.com\/open\?id=([^&]+)/,
    /https:\/\/drive\.google\.com\/uc\?(?:export=[^&]+&)?id=([^&]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m?.[1]) return `https://drive.google.com/uc?export=view&id=${m[1]}`;
  }
  return url;
}

export function slugify(text: string): string {
  return text.toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export function getProductImages(product: Product): string[] {
  return [product.image1, product.image2, product.image3, product.image4, product.image5, product.image6]
    .filter((u): u is string => Boolean(u))
    .map(getGoogleDriveImageUrl);
}

export function filterAndSortProducts(products: Product[], options: Partial<FilterState>): Product[] {
  let result = products.filter(p => p.is_visible);

  if (options.search?.trim()) {
    const q = options.search.toLowerCase().trim();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.short_description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags && p.tags.toLowerCase().includes(q))
    );
  }

  if (options.categories?.length) {
    result = result.filter(p =>
      options.categories!.some(cat =>
        slugify(p.category).includes(cat) || p.category.toLowerCase().replace(/\s+/g, '-').includes(cat)
      )
    );
  }

  switch (options.priceRange) {
    case 'under_200': result = result.filter(p => p.price < 200); break;
    case '200_500': result = result.filter(p => p.price >= 200 && p.price <= 500); break;
    case '500_1000': result = result.filter(p => p.price > 500 && p.price <= 1000); break;
    case 'above_1000': result = result.filter(p => p.price > 1000); break;
  }

  if (options.inStockOnly) result = result.filter(p => p.stock_status === 'In Stock');

  switch (options.sort) {
    case 'price_asc': result = [...result].sort((a, b) => a.price - b.price); break;
    case 'price_desc': result = [...result].sort((a, b) => b.price - a.price); break;
    case 'bestseller': result = [...result].sort((a, b) => Number(b.is_bestseller) - Number(a.is_bestseller)); break;
    default: result = [...result].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
  return result;
}

export function truncate(text: string, max: number): string {
  if (!text) return '';
  return text.length <= max ? text : text.slice(0, max).trim() + '...';
}

export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}
