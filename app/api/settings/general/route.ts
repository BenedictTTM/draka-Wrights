import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  
  try {
    const existing = await db.query('SELECT * FROM "Setting" WHERE id = $1', ['default']);

    if (existing.rows.length > 0) {
      return NextResponse.json(existing.rows[0]);
    }

    const created = await db.query(
      'INSERT INTO "Setting" (id) VALUES ($1) RETURNING *',
      ['default']
    );

    return NextResponse.json(created.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch settings', details: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { orgName, supportEmail, dataRetention } = await request.json();
  const db = getDb();
  
  try {
    const updates: string[] = [];
    const values: Array<string> = [];
    let index = 1;

    if (orgName) {
      updates.push(`"orgName" = $${index++}`);
      values.push(orgName);
    }
    if (supportEmail) {
      updates.push(`"supportEmail" = $${index++}`);
      values.push(supportEmail);
    }
    if (dataRetention) {
      updates.push(`"dataRetention" = $${index++}`);
      values.push(dataRetention);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    values.push('default');
    const updated = await db.query(
      `UPDATE "Setting" SET ${updates.join(', ')} WHERE id = $${index} RETURNING *`,
      values
    );

    return NextResponse.json(updated.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
