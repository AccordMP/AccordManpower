import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'pg-connection-string';

// Read the SQL dump file
console.log('Reading SQL dump file...');
const sqlDump = readFileSync('PSQL-DB/neondb_complete_dump.sql', 'utf8');

// Split the SQL into sections
const sections = sqlDump.split('\n\n');
const convertedStatements: string[] = [];

// Process each section
for (const section of sections) {
  if (section.startsWith('COPY')) {
    // This is a COPY statement with data
    const lines = section.split('\n');
    const copyStatement = lines[0];
    const tableMatch = copyStatement.match(/COPY public\.(\w+)\s*\(([^)]*)\)/i);
    
    if (tableMatch) {
      const tableName = tableMatch[1];
      const columns = tableMatch[2].split(',').map(col => col.trim());
      
      // Process data lines (skip the first and last line which are COPY and \.)
      for (let i = 1; i < lines.length - 1; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Parse the tab-separated values
        // This is a simplified parser - may need adjustments for complex data
        const values = line.split('\t').map(value => {
          if (value === '\N') return 'NULL';
          if (value === 't') return 'true';
          if (value === 'f') return 'false';
          // Escape single quotes and wrap in single quotes
          return `'${value.replace(/'/g, "''")}'`;
        });
        
        // Create an INSERT statement
        const insertStmt = `INSERT INTO public.${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')});`;
        convertedStatements.push(insertStmt);
      }
    }
  } else if (section.startsWith('--') || section.startsWith('SET ') || section.startsWith('SELECT ')) {
    // Skip comments and SET statements
    continue;
  } else if (section.trim()) {
    // Keep other SQL statements as-is
    convertedStatements.push(section);
  }
}

// Write the converted SQL to a new file
const outputFile = 'PSQL-DB/neondb_converted.sql';
writeFileSync(outputFile, convertedStatements.join('\n\n'));

console.log(`✅ Converted SQL saved to ${outputFile}`);
console.log('You can now import this file into Supabase SQL Editor');
