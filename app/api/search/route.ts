import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  
  if (!q) return NextResponse.json({ reports: [], users: [] });

  const db = getDb();
  const term = `%${q}%`;
  
  try {
    const reports = await db.query(
      'SELECT * FROM "Report" WHERE title ILIKE $1 OR description ILIKE $1 OR id ILIKE $1 LIMIT 5',
      [term]
    );

    const users = await db.query(
      'SELECT id, name, email, role FROM "Admin" WHERE name ILIKE $1 OR email ILIKE $1 LIMIT 5',
      [term]
    );

    return NextResponse.json({ reports: reports.rows, users: users.rows });
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
