export interface Product {
  id: string;
  timestamp: string;
  name: string;
  slug: string;
  category: string;
  short_description: string;
  description: string;
  price: number;
  mrp: number | null;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  link_amazon?: string;
  link_flipkart?: string;
  link_meesho?: string;
  link_etsy?: string;
  link_instagram?: string;
  link_other_name?: string;
  link_other_url?: string;
  stock_status: 'In Stock' | 'Out of Stock';
  quantity: number | null;
  is_bestseller: boolean;
  is_featured: boolean;
  is_visible: boolean;
  material?: string;
  dimensions?: string;
  care_instructions?: string;
  tags?: string;
}

export interface Category {
  category_name: string;
  category_slug: string;
  category_description: string;
  category_image: string;
  display_order: number;
  is_active: boolean;
}

export interface SiteSettings {
  brand_name: string;
  tagline: string;
  whatsapp_number: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  email: string;
  announcement_text: string;
  hero_image_url: string;
}

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'bestseller';
export type PriceRange = 'under_200' | '200_500' | '500_1000' | 'above_1000' | 'all';

export interface FilterState {
  categories: string[];
  priceRange: PriceRange;
  inStockOnly: boolean;
  sort: SortOption;
  search: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image1: string;
  slug: string;
  category: string;
  stock_status: string;
}
