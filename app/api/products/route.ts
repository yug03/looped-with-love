import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/api';
export const revalidate = 60;
export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } });
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
