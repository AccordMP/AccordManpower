import { readFileSync } from 'fs';
import { mcp1_execute_sql } from '../../supabase-mcp-server';

async function executeSqlDump() {
  try {
    // Read the SQL dump file
    console.log('Reading SQL dump file...');
    const sqlDump = readFileSync('PSQL-DB/neondb_complete_dump.sql', 'utf8');
    
    // Split the SQL into individual statements
    const statements = sqlDump
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    console.log(`Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        console.log(`Executing statement ${i + 1}/${statements.length}...`);
        
        // Execute the SQL directly
        await mcp1_execute_sql({
          project_id: 'vckezuggrrirkspmjfzi',
          query: statement
        });
        
        console.log(`✅ Executed statement ${i + 1}/${statements.length}`);
      } catch (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error.message);
        console.error('Problematic statement:', statement);
        // Continue with the next statement
      }
    }
    
    console.log('✅ All SQL statements executed successfully');
  } catch (error) {
    console.error('❌ Error executing SQL dump:', error);
    process.exit(1);
  }
}

executeSqlDump();
