import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function main() {
  console.log('🔄 [System] Initializing database connection check...');
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not set.');
    }

    console.log('⏳ [System] Attempting to connect to the database...');
    const sql = neon(databaseUrl);

    console.log('⏳ [System] Running a simple diagnostic query...');
    const result = await sql`SELECT 1 as is_alive`;
    console.log('✅ [Success] Query executed successfully. Diagnostic result:', result);
  } catch (error) {
    console.error('❌ [Error] Unexpected error while trying to connect to the database:');
    console.error(error);
    process.exitCode = 1;
  }
}

main();