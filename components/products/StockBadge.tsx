import { cn } from '@/lib/utils';

interface StockBadgeProps { status: 'In Stock' | 'Out of Stock'; quantity?: number | null; compact?: boolean; }

export function StockBadge({ status, quantity, compact = false }: StockBadgeProps) {
  const isLow = quantity != null && quantity <= 5 && quantity > 0;
  const isOut = status === 'Out of Stock';
  const base = cn('inline-flex items-center gap-1 rounded-full font-semibold', compact ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs');
  if (isOut) return <span className={cn(base, 'bg-danger/10 text-danger border border-danger/20')}>❌ {compact ? 'Sold Out' : 'Out of Stock'}</span>;
  if (isLow) return <span className={cn(base, 'bg-amber-50 text-amber-700 border border-amber-200 stock-pulse')}>⚡ {compact ? `${quantity} left` : `Only ${quantity} left!`}</span>;
  return <span className={cn(base, 'bg-success/10 text-success border border-success/20')}>✅ {compact ? 'In Stock' : quantity ? `In Stock (${quantity})` : 'In Stock'}</span>;
}
