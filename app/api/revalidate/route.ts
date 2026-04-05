import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
export async function POST(req: NextRequest) {
  if (req.nextUrl.searchParams.get('secret') !== process.env.REVALIDATION_SECRET)
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  revalidatePath('/'); revalidatePath('/products'); revalidatePath('/products/[slug]','page');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
