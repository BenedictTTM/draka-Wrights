import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  
  try {
    const result = await db.query(
      'SELECT r.*, m.id AS message_id, m.content AS message_content, m.sender AS message_sender, m.is_internal AS message_is_internal, m.created_at AS message_created_at '
      + 'FROM "Report" r '
      + 'LEFT JOIN LATERAL ('
      + '  SELECT * FROM "Message" m WHERE m.report_id = r.id ORDER BY m.created_at DESC LIMIT 1'
      + ') m ON true '
      + 'ORDER BY r.created_at DESC'
    );

    const sessions = result.rows.map((row: any) => {
      const message = row.message_id
        ? {
            id: row.message_id,
            report_id: row.id,
            content: row.message_content,
            sender: row.message_sender,
            is_internal: row.message_is_internal,
            created_at: row.message_created_at,
          }
        : null;

      const {
        message_id,
        message_content,
        message_sender,
        message_is_internal,
        message_created_at,
        ...report
      } = row;

      return {
        ...report,
        messages: message ? [message] : [],
      };
    });

    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}
