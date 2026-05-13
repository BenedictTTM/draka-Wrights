import 'dotenv/config';
import pkg from 'pg';

const { Client } = pkg;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const users = [
    ['admin@ug.edu.gh', 'admin123', 'Admin User', 'Support Agent', 'Active'],
    ['ashc@ug.edu.gh', 'admin123', 'ASHC Officer', 'Support Agent', 'Active'],
  ];

  for (const [email, password, name, role, status] of users) {
    await client.query(
      'INSERT INTO "Admin" (email, password, name, role, status) VALUES ($1, $2, $3, $4, $5) '
        + 'ON CONFLICT (email) DO UPDATE SET '
        + 'password = EXCLUDED.password, '
        + 'name = EXCLUDED.name, '
        + 'role = EXCLUDED.role, '
        + 'status = EXCLUDED.status',
      [email, password, name, role, status]
    );
  }

  const result = await client.query(
    'SELECT email, name, role, status FROM "Admin" WHERE email IN ($1, $2) ORDER BY email',
    ['admin@ug.edu.gh', 'ashc@ug.edu.gh']
  );

  console.log('Demo users ready:');
  console.table(result.rows);

  await client.end();
}

main().catch((error) => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
