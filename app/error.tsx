'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { RefreshCw, Home } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">🧶</div>
        <h2 className="font-playfair text-3xl font-bold text-text-primary dark:text-dark-text mb-3">Oops! A Stitch Dropped</h2>
        <p className="text-text-secondary mb-8 leading-relaxed">Something went wrong. Don't worry — try refreshing the page or go back home.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={reset} icon={<RefreshCw size={16} />}>Try Again</Button>
          <Link href="/"><Button variant="secondary" icon={<Home size={16} />}>Go Home</Button></Link>
        </div>
      </div>
    </div>
  );
}
