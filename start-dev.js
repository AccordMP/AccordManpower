import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

// Verify required environment variables
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set');
  console.error('Please make sure you have a .env file with DATABASE_URL set');
  process.exit(1);
}

console.log('Starting development server...');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('- DATABASE_URL:', process.env.DATABASE_URL ? '*** (set)' : 'Not set');

// Start the server using tsx
try {
  execSync('npx tsx server/index.ts', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}
