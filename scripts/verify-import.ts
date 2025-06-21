import { Pool } from 'pg';
import 'dotenv/config';

async function verifyImport() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();
    
    try {
      // Get list of all tables in the public schema
      const tablesQuery = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        ORDER BY table_name;
      `;
      
      const tablesResult = await client.query(tablesQuery);
      const tables = tablesResult.rows.map(row => row.table_name);
      
      console.log('\nTables in the database:');
      console.log('----------------------');
      
      // Get row count for each table
      for (const table of tables) {
        try {
          const countQuery = `SELECT COUNT(*) FROM public.${table};`;
          const countResult = await client.query(countQuery);
          console.log(`${table}: ${countResult.rows[0].count} rows`);
          
          // Show first few rows for non-empty tables
          if (countResult.rows[0].count > 0) {
            const sampleQuery = `SELECT * FROM public.${table} LIMIT 3;`;
            const sampleResult = await client.query(sampleQuery);
            console.log(`Sample data from ${table}:`, JSON.stringify(sampleResult.rows, null, 2));
          }
        } catch (error) {
          console.error(`Error querying table ${table}:`, error.message);
        }
        console.log('');
      }
      
      // Check for any views
      const viewsQuery = `
        SELECT table_name 
        FROM information_schema.views 
        WHERE table_schema = 'public';
      `;
      
      const viewsResult = await client.query(viewsQuery);
      if (viewsResult.rows.length > 0) {
        console.log('\nViews in the database:');
        console.log('---------------------');
        viewsResult.rows.forEach(row => console.log(`- ${row.table_name}`));
      }
      
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error verifying import:', error);
  } finally {
    await pool.end();
  }
}

verifyImport();
