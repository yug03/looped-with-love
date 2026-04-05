import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { adminUpdateProduct } from '@/lib/api';

const PW = process.env.ADMIN_PASSWORD || 'admin123';
const COOKIE = 'lwl_admin_session';
const ALLOWED = ['stock_status','quantity','is_bestseller','is_featured','is_visible'];

function auth() {
  const s = cookies().get(COOKIE);
  if (!s?.value) return false;
  try {
    const [ts, pw] = Buffer.from(s.value, 'base64').toString().split(':');
    return pw === PW && Date.now() - parseInt(ts) <= 86400000;
  } catch { return false; }
}

export async function POST(req: NextRequest) {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id, field, value } = await req.json();
    if (!id || !field || value === undefined) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    if (!ALLOWED.includes(field)) return NextResponse.json({ error: 'Invalid field' }, { status: 400 });
    return NextResponse.json(await adminUpdateProduct({ id, field, value }));
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
