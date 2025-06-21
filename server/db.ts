import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";
import dotenv from 'dotenv';

// Load environment variables from .env file
const envPath = process.cwd() + '/.env';
console.log('Loading .env file from:', envPath);

try {
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    console.error('Error loading .env file:', result.error);
  } else {
    console.log('Successfully loaded .env file');
  }
} catch (error) {
  console.error('Failed to load .env file:', error);
}

// Log available environment variables (excluding sensitive ones)
console.log('Available environment variables:', Object.keys(process.env).filter(k => !k.toLowerCase().includes('pass') && !k.toLowerCase().includes('secret')));

// Verify required environment variables
const requiredVars = ['DATABASE_URL'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('ERROR: Missing required environment variables:');
  missingVars.forEach(varName => console.error(`- ${varName}`));
  console.error('\nPlease make sure your .env file contains all required variables.');
  process.exit(1);
}

console.log('Database configuration:');
console.log('- Using database URL:', process.env.DATABASE_URL ? '*** (set)' : 'Not set');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');

// Configure SSL for Supabase connection
const ssl = process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false;

console.log('Creating database connection pool...');

// Create and configure the database connection pool
const createDatabasePool = (): Pool => {
  try {
    // Create a connection pool for Supabase
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl,
      // Add connection timeout to handle potential network issues
      connectionTimeoutMillis: 10000,
      // Add query timeout to prevent long-running queries
      query_timeout: 10000,
      // Add statement timeout
      statement_timeout: 10000,
      // Add idle timeout to close idle clients
      idle_in_transaction_session_timeout: 10000,
    });

    // Handle connection errors
    pool.on('error', (err: Error) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

    console.log('Successfully created database connection pool');
    return pool;
  } catch (error) {
    console.error('Failed to create database connection pool:', error);
    process.exit(1);
  }
};

// Initialize the database pool
const pool = createDatabasePool();

// Create a drizzle instance with the connection pool and schema
export const db = drizzle(pool, { schema });

// Export the pool for direct query access if needed
export { pool as dbPool };

// Test the database connection on startup
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to Supabase PostgreSQL database');
    client.release();
  } catch (error) {
    console.error('Error connecting to Supabase PostgreSQL database:', error);
    throw error;
  }
}

// Execute the connection test
testConnection().catch(console.error);