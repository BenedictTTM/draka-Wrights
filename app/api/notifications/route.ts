import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  
  try {
    const notifications = await db.query(
      'SELECT * FROM "Notification" WHERE read = false ORDER BY created_at DESC LIMIT 20'
    );

    return NextResponse.json(notifications.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await request.json();
  const db = getDb();
  
  try {
    const updated = await db.query(
      'UPDATE "Notification" SET read = true WHERE id = $1 RETURNING *',
      [id]
    );

    if (updated.rows.length === 0) {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    }

    return NextResponse.json(updated.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
  }
}
