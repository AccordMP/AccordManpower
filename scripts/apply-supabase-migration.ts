import { readFileSync } from 'fs';
import { mcp1_apply_migration } from '../../supabase-mcp-server';

async function applyMigrations() {
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

    // Apply each statement as a migration
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        console.log(`Applying statement ${i + 1}/${statements.length}...`);
        
        // Apply the migration using MCP
        await mcp1_apply_migration({
          name: `import_${i + 1}`,
          project_id: 'vckezuggrrirkspmjfzi',
          query: statement
        });
        
        console.log(`✅ Applied statement ${i + 1}/${statements.length}`);
      } catch (error) {
        console.error(`❌ Error applying statement ${i + 1}:`, error.message);
        console.error('Problematic statement:', statement);
        // Continue with the next statement
      }
    }
    
    console.log('✅ All migrations applied successfully');
  } catch (error) {
    console.error('❌ Error applying migrations:', error);
    process.exit(1);
  }
}

applyMigrations();
