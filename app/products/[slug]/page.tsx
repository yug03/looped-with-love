import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Truck, RotateCcw, Shield, Scissors } from 'lucide-react';
import { getProductBySlug, getRelatedProducts, getSiteSettings, getAllProducts } from '@/lib/api';
import { ImageGallery } from '@/components/products/ImageGallery';
import { BuyLinks } from '@/components/products/BuyLinks';
import { StockBadge } from '@/components/products/StockBadge';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { ShareButtons } from '@/components/products/ShareButtons';
import { Badge } from '@/components/ui/Skeleton';
import { formatPrice, calculateDiscount, getProductImages } from '@/lib/utils';

export const revalidate = 60;

export async function generateStaticParams() {
  try { return (await getAllProducts()).map(p=>({slug:p.slug})); } catch { return []; }
}

export async function generateMetadata({ params }: { params:{slug:string} }): Promise<Metadata> {
  const p = await getProductBySlug(params.slug);
  if (!p) return { title:'Not Found' };
  return { title:`${p.name} — ₹${p.price}`, description:p.short_description, openGraph:{ title:p.name, description:p.short_description, images:[{url:p.image1,width:800,height:800,alt:p.name}] } };
}

export default async function ProductDetailPage({ params }: { params:{slug:string} }) {
  const [product, settings] = await Promise.all([getProductBySlug(params.slug), getSiteSettings()]);
  if (!product || !product.is_visible) notFound();

  const related = await getRelatedProducts(product.category, product.slug);
  const images = getProductImages(product);
  const hasDisc = product.mrp && product.mrp > product.price;
  const pct = hasDisc ? calculateDiscount(product.price, product.mrp!) : 0;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const productUrl = `${siteUrl}/products/${product.slug}`;

  const jsonLd = { '@context':'https://schema.org', '@type':'Product', name:product.name, description:product.description, image:images, offers:{ '@type':'Offer', price:product.price, priceCurrency:'INR', availability:product.stock_status==='In Stock'?'https://schema.org/InStock':'https://schema.org/OutOfStock', url:productUrl } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}} />
      <div className="min-h-screen bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <nav className="flex items-center gap-1.5 text-sm text-text-secondary mb-8 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link><ChevronRight size={14} />
            <Link href="/products" className="hover:text-primary transition-colors">Shop</Link><ChevronRight size={14} />
            <Link href={`/products?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link><ChevronRight size={14} />
            <span className="text-text-primary dark:text-dark-text font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
            <ImageGallery images={images} productName={product.name} />
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {product.is_bestseller&&<Badge variant="bestseller">🔥 Best Seller</Badge>}
                {product.is_featured&&<Badge variant="new">✨ Featured</Badge>}
                {hasDisc&&<Badge variant="warning">{pct}% OFF</Badge>}
              </div>
              <p className="text-secondary font-semibold text-sm uppercase tracking-wider">{product.category}</p>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text leading-snug">{product.name}</h1>
              <div className="flex items-baseline gap-3">
                <span className="font-playfair text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
                {hasDisc&&<><span className="text-xl text-text-secondary line-through">{formatPrice(product.mrp!)}</span><span className="text-sm font-bold text-success">Save {formatPrice(product.mrp!-product.price)}</span></>}
              </div>
              <StockBadge status={product.stock_status} quantity={product.quantity} />
              <p className="text-text-secondary leading-relaxed">{product.short_description}</p>
              <div className="card-base p-5 space-y-3">
                {product.material&&<div className="flex gap-3"><Scissors size={16} className="text-primary flex-shrink-0 mt-0.5"/><div><span className="text-xs text-text-secondary uppercase tracking-wide font-semibold">Material</span><p className="text-sm text-text-primary dark:text-dark-text font-medium">{product.material}</p></div></div>}
                {product.dimensions&&<div className="flex gap-3"><span className="text-base flex-shrink-0">📐</span><div><span className="text-xs text-text-secondary uppercase tracking-wide font-semibold">Dimensions</span><p className="text-sm text-text-primary dark:text-dark-text font-medium">{product.dimensions}</p></div></div>}
                {product.care_instructions&&<div className="flex gap-3"><span className="text-base flex-shrink-0">🧺</span><div><span className="text-xs text-text-secondary uppercase tracking-wide font-semibold">Care</span><p className="text-sm text-text-primary dark:text-dark-text font-medium">{product.care_instructions}</p></div></div>}
              </div>
              <BuyLinks product={product} whatsappNumber={settings.whatsapp_number} siteUrl={siteUrl} />
              <div className="grid grid-cols-3 gap-3">
                {[{icon:<Truck size={16}/>,label:'All India Shipping'},{icon:<Shield size={16}/>,label:'Secure Purchase'},{icon:<RotateCcw size={16}/>,label:'Easy Returns'}].map(b=>(
                  <div key={b.label} className="flex flex-col items-center gap-1.5 p-3 bg-primary/5 rounded-2xl text-center">
                    <span className="text-primary">{b.icon}</span><span className="text-[10px] font-semibold text-text-secondary leading-tight">{b.label}</span>
                  </div>
                ))}
              </div>
              <ShareButtons productName={product.name} price={product.price} productUrl={productUrl} whatsappNumber={settings.whatsapp_number} />
            </div>
          </div>
          <div className="mt-14 card-base p-8">
            <h2 className="font-playfair text-2xl font-bold text-text-primary dark:text-dark-text mb-5">About This Product</h2>
            <div className="text-text-secondary leading-relaxed whitespace-pre-line text-sm">{product.description}</div>
          </div>
          <RelatedProducts products={related} />
        </div>
      </div>
      <div className="fixed bottom-16 left-0 right-0 z-30 px-4 md:hidden pb-safe">
        <div className="flex gap-2 bg-white dark:bg-dark-card rounded-2xl shadow-card-hover p-3 border border-primary/10">
          <div className="flex-1 min-w-0">
            <p className="font-playfair font-bold text-primary text-xl leading-none">{formatPrice(product.price)}</p>
            <p className="text-xs text-text-secondary mt-0.5 truncate">{product.name}</p>
          </div>
          <a href={product.link_amazon||product.link_flipkart||product.link_meesho||`https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(`Hi! I want to buy ${product.name} (₹${product.price}). Is it available?`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">Buy Now</a>
        </div>
      </div>
    </>
  );
}
