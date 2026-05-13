import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  const db = getDb();

  try {
    // Seed admins if empty
    const adminCount = await db.query('SELECT COUNT(*)::int AS count FROM "Admin"');
    if (adminCount.rows[0]?.count === 0) {
      await db.query(
        'INSERT INTO "Admin" (email, password, name) VALUES ($1, $2, $3), ($4, $5, $6)',
        [
          'admin@ug.edu.gh',
          'admin123',
          'Admin User',
          'ashc@ug.edu.gh',
          'admin123',
          'ASHC Officer',
        ]
      );
    }

    // Seed sample reports if empty
    const rptCount = await db.query('SELECT COUNT(*)::int AS count FROM "Report"');
    if (rptCount.rows[0]?.count === 0) {
      await db.query(
        'INSERT INTO "Report" (id, title, description, category, status, priority, location) VALUES '
        + '($1, $2, $3, $4, $5, $6, $7), '
        + '($8, $9, $10, $11, $12, $13, $14), '
        + '($15, $16, $17, $18, $19, $20, $21), '
        + '($22, $23, $24, $25, $26, $27, $28)',
        [
          'RPT-8422',
          'Safety Concern in Lab 4',
          'Equipment left running unattended during the afternoon shift, creating a fire hazard.',
          'Safety Concern',
          'New',
          'High',
          'Lab 4, Science Block',
          'RPT-8421',
          'Inappropriate Comments from Lecturer',
          'Repeated inappropriate comments to female students during a tutorial session.',
          'Sexual Harassment',
          'In Progress',
          'High',
          'Room 204, Arts Building',
          'RPT-8420',
          'Anonymous Integrity Report',
          'Witnessed falsifying attendance records for laboratory sessions.',
          'Policy Violation',
          'Resolved',
          'Low',
          null,
          'RPT-8419',
          'Stalking on Campus',
          'Followed by an unknown individual on campus on three separate occasions this week.',
          'Stalking / Bullying',
          'Escalated',
          'Critical',
          'Main Campus Walkway',
        ]
      );
    }

    return NextResponse.json({ success: true, message: 'Database initialized' });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
