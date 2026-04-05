import Link from 'next/link';
import { Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🧶</div>
        <h1 className="font-playfair text-5xl font-bold text-primary mb-3">404</h1>
        <h2 className="font-playfair text-2xl font-semibold text-text-primary dark:text-dark-text mb-4">Oops! This loop got tangled</h2>
        <p className="text-text-secondary mb-8 leading-relaxed">We couldn't find the page you're looking for. Let's get you back to the good stuff!</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center gap-2"><Home size={16} /> Go Home</Link>
          <Link href="/products" className="btn-secondary inline-flex items-center gap-2"><ShoppingBag size={16} /> Browse Shop</Link>
        </div>
      </div>
    </div>
  );
}
