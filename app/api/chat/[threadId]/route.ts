import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ threadId: string }> }) {
  const { threadId } = await params;
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  
  const isAdmin = !!session;

  const db = getDb();
  
  try {
    const messages = await db.query(
      'SELECT * FROM "Message" WHERE report_id = $1 AND ($2::boolean OR is_internal = false) ORDER BY created_at ASC',
      [threadId, isAdmin]
    );

    return NextResponse.json(messages.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ threadId: string }> }) {
  const { threadId } = await params;
  const { content, is_internal, sender } = await request.json();
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  
  const db = getDb();
  
  try {
    const message = await db.query(
      'INSERT INTO "Message" (report_id, content, is_internal, sender) VALUES ($1, $2, $3, $4) RETURNING *',
      [threadId, content, !!is_internal, sender || (session ? 'admin' : 'user')]
    );

    return NextResponse.json(message.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
