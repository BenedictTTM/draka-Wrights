import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';

// PUBLIC: anyone can submit
export async function POST(request: Request) {
  try {
    const { title, description, category, anonymous, location, incident_date, incident_time, is_online, evidence_notes } = await request.json();

    if (!description || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resolvedTitle = title || `${category} Report — ${new Date().toLocaleDateString()}`;

    const db = getDb();
    const id = `RPT-${Math.floor(1000 + Math.random() * 9000)}`;
    const priority = (category === 'Sexual Harassment' || category === 'Stalking / Bullying') ? 'High' : 'Medium';

    const report = await db.query(
      'INSERT INTO "Report" (id, title, description, category, anonymous, priority, location, incident_date, incident_time, is_online, evidence_notes) '
      + 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
      [
        id,
        resolvedTitle,
        description,
        category,
        anonymous ?? true,
        priority,
        location || null,
        incident_date || null,
        incident_time || null,
        is_online || false,
        evidence_notes || null,
      ]
    );

    return NextResponse.json({ success: true, reportId: report.rows[0]?.id }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}

// PROTECTED: admin only
export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const reports = await db.query('SELECT * FROM "Report" ORDER BY created_at DESC');
  return NextResponse.json(reports.rows);
}

// PROTECTED: admin status update
export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, status, priority } = await request.json();
  const db = getDb();

  try {
    const updates: string[] = [];
    const values: Array<string> = [];
    let index = 1;

    if (status) {
      updates.push(`status = $${index++}`);
      values.push(status);
    }
    if (priority) {
      updates.push(`priority = $${index++}`);
      values.push(priority);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    values.push(id);
    const updated = await db.query(
      `UPDATE "Report" SET ${updates.join(', ')} WHERE id = $${index} RETURNING *`,
      values
    );

    if (updated.rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(updated.rows[0]);
  } catch (e) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
