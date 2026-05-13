import 'dotenv/config';
import pkg from 'pg';
import crypto from 'crypto';

const { Client } = pkg;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  console.log('Seeding Setting table...');
  await client.query(`
    INSERT INTO "Setting" (id, "orgName", "supportEmail", "dataRetention") 
    VALUES ('default', 'University of Ghana ASHC', 'ashc-support@ug.edu.gh', '3 Years')
    ON CONFLICT (id) DO UPDATE SET 
      "orgName" = EXCLUDED."orgName",
      "supportEmail" = EXCLUDED."supportEmail",
      "dataRetention" = EXCLUDED."dataRetention"
  `);

  console.log('Seeding Report table...');
  const reports = [
    {
      id: crypto.randomUUID(),
      title: 'Harassment Incident in Library',
      description: 'I was repeatedly bothered by a study group in the Balme library despite asking them to stop.',
      category: 'Harassment',
      anonymous: true,
      priority: 'High',
      location: 'Balme Library',
      incident_date: '2026-05-10',
      incident_time: '14:30',
      is_online: false,
      evidence_notes: 'None',
      status: 'In Progress'
    },
    {
      id: crypto.randomUUID(),
      title: 'Unfair Grading Request',
      description: 'The lecturer refused to re-mark my paper despite clear errors in the grading rubric matching.',
      category: 'Academic Issue',
      anonymous: false,
      priority: 'Medium',
      location: 'CS Department',
      incident_date: '2026-05-08',
      incident_time: '10:00',
      is_online: false,
      evidence_notes: 'Attached paper copy (offline)',
      status: 'New'
    },
    {
      id: crypto.randomUUID(),
      title: 'Online Abuse via Student Portal',
      description: 'Someone is continually sending abusive messages to my account on the student portal.',
      category: 'Cyberbullying',
      anonymous: true,
      priority: 'High',
      location: 'Online',
      incident_date: '2026-05-12',
      incident_time: '09:15',
      is_online: true,
      evidence_notes: 'Screenshots available on request',
      status: 'Resolved'
    },
    {
      id: crypto.randomUUID(),
      title: 'Broken Equipment in Lab 3',
      description: 'Several computers in Lab 3 are missing peripherals or not turning on during practicals.',
      category: 'Infrastructure',
      anonymous: true,
      priority: 'Low',
      location: 'Lab 3',
      incident_date: '2026-05-11',
      incident_time: '13:00',
      is_online: false,
      evidence_notes: 'PC numbers 12, 14, 15',
      status: 'New'
    }
  ];

  for (const report of reports) {
    await client.query(`
      INSERT INTO "Report" (id, title, description, category, anonymous, priority, location, incident_date, incident_time, is_online, evidence_notes, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (id) DO NOTHING
    `, [report.id, report.title, report.description, report.category, report.anonymous, report.priority, report.location, report.incident_date, report.incident_time, report.is_online, report.evidence_notes, report.status]);
  }

  console.log('Seeding Message table...');
  const messages = [
    {
      id: crypto.randomUUID(),
      report_id: reports[0].id,
      sender: 'ASHC Officer',
      content: 'We have received your report and are reviewing camera footage from the library.',
      is_internal: false
    },
    {
      id: crypto.randomUUID(),
      report_id: reports[0].id,
      sender: 'Admin',
      content: 'I will contact the library security team today.',
      is_internal: true
    },
    {
      id: crypto.randomUUID(),
      report_id: reports[2].id,
      sender: 'Support Agent',
      content: 'We have traced the portal account and taken disciplinary action. Case closed.',
      is_internal: false
    }
  ];

  for (const msg of messages) {
    await client.query(`
      INSERT INTO "Message" (id, report_id, sender, content, is_internal)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO NOTHING
    `, [msg.id, msg.report_id, msg.sender, msg.content, msg.is_internal]);
  }

  console.log('Seeding Notification table...');
  const notifications = [
    {
      id: crypto.randomUUID(),
      message: 'New high priority report submitted: Harassment Incident.',
      type: 'Alert',
      read: false
    },
    {
      id: crypto.randomUUID(),
      message: 'Message added to Unfair Grading Request.',
      type: 'Info',
      read: true
    },
    {
      id: crypto.randomUUID(),
      message: 'System maintenance scheduled for tonight.',
      type: 'System',
      read: false
    }
  ];

  for (const notif of notifications) {
    await client.query(`
      INSERT INTO "Notification" (id, message, type, read)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO NOTHING
    `, [notif.id, notif.message, notif.type, notif.read]);
  }

  console.log('Dummy data seeded successfully!');

  await client.end();
}

main().catch((error) => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
