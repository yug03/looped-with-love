import { cn } from '@/lib/utils';
import React from 'react';

// Badge
interface BadgeProps { children: React.ReactNode; variant?: 'primary'|'success'|'danger'|'warning'|'info'|'bestseller'|'new'; className?: string; pulse?: boolean; }
const badgeStyles = { primary:'bg-primary/15 text-primary border border-primary/20', success:'bg-success/15 text-success border border-success/20', danger:'bg-danger/15 text-danger border border-danger/20', warning:'bg-accent-warm/30 text-amber-700 border border-accent-warm/40', info:'bg-accent-blue/30 text-blue-700 border border-accent-blue/40', bestseller:'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-200', new:'bg-gradient-to-r from-primary/20 to-secondary/20 text-secondary border border-secondary/30' };
export function Badge({ children, variant='primary', className, pulse }: BadgeProps) {
  return <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide', badgeStyles[variant], pulse && 'stock-pulse', className)}>{children}</span>;
}

// Skeleton
interface SkeletonProps { className?: string; rounded?: 'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'full'; style?: React.CSSProperties; }
const rMap = { sm:'rounded-sm', md:'rounded-md', lg:'rounded-lg', xl:'rounded-xl', '2xl':'rounded-2xl', '3xl':'rounded-3xl', full:'rounded-full' };
export function Skeleton({ className, rounded='xl', style }: SkeletonProps) {
  return <div style={style} className={cn('relative overflow-hidden bg-gray-100 dark:bg-dark-surface', rMap[rounded], className)} aria-hidden><div className="absolute inset-0 shimmer" /></div>;
}
export function ProductCardSkeleton() {
  return <div className="card-base overflow-hidden"><Skeleton className="w-full" style={{aspectRatio:'1/1'}} rounded="3xl" /><div className="p-4 space-y-3"><Skeleton className="h-3 w-1/3" rounded="full" /><Skeleton className="h-5 w-4/5" /><Skeleton className="h-3 w-full" /><div className="flex justify-between pt-1"><Skeleton className="h-7 w-20" /><Skeleton className="h-6 w-20" rounded="full" /></div></div></div>;
}
export function ProductGridSkeleton({ count=8 }: { count?: number }) {
  return <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">{Array.from({length:count}).map((_,i)=><ProductCardSkeleton key={i} />)}</div>;
}
