import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const db = getDb();

  const adminResult = await db.query(
    'SELECT id, email, password, name FROM "Admin" WHERE email = $1 LIMIT 1',
    [email]
  );

  const admin = adminResult.rows[0];

  if (!admin || admin.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true, name: admin.name });

  response.cookies.set('admin-session', JSON.stringify({ email: admin.email, name: admin.name }), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
  });

  return response;
}
