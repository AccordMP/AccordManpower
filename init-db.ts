import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

async function initDb() {
  console.log('Initializing database...');
  
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  const db = drizzle(pool);

  try {
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('Connected to database successfully');

    // Create tables
    console.log('Creating tables...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'editor',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        meta_title TEXT,
        meta_description TEXT,
        canonical_url TEXT,
        is_published BOOLEAN DEFAULT false,
        author_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt TEXT,
        featured_image TEXT,
        meta_title TEXT,
        meta_description TEXT,
        canonical_url TEXT,
        tags TEXT[],
        category TEXT,
        is_published BOOLEAN DEFAULT false,
        published_at TIMESTAMP,
        author_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'new',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS seo_settings (
        id SERIAL PRIMARY KEY,
        page_type TEXT NOT NULL UNIQUE,
        meta_title TEXT,
        meta_description TEXT,
        canonical_url TEXT,
        og_title TEXT,
        og_description TEXT,
        og_image TEXT,
        twitter_card TEXT,
        twitter_title TEXT,
        twitter_description TEXT,
        twitter_image TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    console.log('Tables created successfully!');
    
    // Create default admin user if not exists
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING',
      ['admin', adminEmail, hashedPassword, 'admin']
    );
    
    console.log('Default admin user created (if it did not exist)');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    
    console.log('\nDatabase initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:');
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDb();
