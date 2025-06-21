import 'dotenv/config';
import { Pool } from 'pg';

async function testConnection() {
  console.log('Testing database connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '*** (set)' : 'Not set');
  
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL is not set');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database!');
    
    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('Current database time:', result.rows[0].now);
    
    // List all tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\nDatabase tables:');
    tables.rows.forEach(row => console.log(`- ${row.table_name}`));
    
    client.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testConnection();
