import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { Pool } from 'pg';
import 'dotenv/config';

async function importSqlDump() {
  // Load environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const databaseUrl = process.env.DATABASE_URL;

  if (!supabaseUrl || !supabaseKey || !databaseUrl) {
    console.error('Missing required environment variables');
    process.exit(1);
  }

  try {
    console.log('Connecting to Supabase...');
    
    // Create a Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Create a PostgreSQL client using the connection string
    const pool = new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false
      }
    });

    // Read the SQL file
    console.log('Reading SQL dump file...');
    const sql = readFileSync('PSQL-DB/neondb_complete_dump.sql', 'utf8');
    
    // Split the SQL into individual statements
    const statements = sql
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        try {
          console.log(`Executing statement ${i + 1}/${statements.length}...`);
          await client.query(statement);
        } catch (error) {
          console.error(`Error executing statement ${i + 1}:`, error.message);
          console.error('Problematic statement:', statement);
          throw error; // Stop execution on error
        }
      }
      
      await client.query('COMMIT');
      console.log('Successfully imported SQL dump');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error importing SQL dump:', error);
      throw error;
    } finally {
      client.release();
      await pool.end();
    }
  } catch (error) {
    console.error('Failed to import SQL dump:', error);
    process.exit(1);
  }
}

importSqlDump();
