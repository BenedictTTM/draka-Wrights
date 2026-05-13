import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  
  try {
    const users = await db.query(
      'SELECT id, email, name, role, status FROM "Admin" ORDER BY id ASC'
    );

    return NextResponse.json(users.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { email, password, name, role, status } = await request.json();
  const db = getDb();
  
  try {
    const user = await db.query(
      'INSERT INTO "Admin" (email, password, name, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, role, status',
      [
        email,
        password,
        name,
        role || 'Support Agent',
        status || 'Active',
      ]
    );

    return NextResponse.json(user.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
