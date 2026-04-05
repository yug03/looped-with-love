import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const PW = process.env.ADMIN_PASSWORD || 'admin123';
const COOKIE = 'lwl_admin_session';
const MAX = 24 * 60 * 60;

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (password !== PW) return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
    const token = Buffer.from(`${Date.now()}:${PW}`).toString('base64');
    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE, token, { httpOnly:true, secure:process.env.NODE_ENV==='production', sameSite:'strict', maxAge:MAX, path:'/' });
    return res;
  } catch { return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}

export async function GET() {
  const session = cookies().get(COOKIE);
  if (!session?.value) return NextResponse.json({ authenticated: false }, { status: 401 });
  try {
    const [ts, pw] = Buffer.from(session.value, 'base64').toString().split(':');
    if (pw !== PW || Date.now() - parseInt(ts) > MAX * 1000) return NextResponse.json({ authenticated: false }, { status: 401 });
    return NextResponse.json({ authenticated: true });
  } catch { return NextResponse.json({ authenticated: false }, { status: 401 }); }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(COOKIE);
  return res;
}
