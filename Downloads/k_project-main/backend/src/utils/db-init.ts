import pool from '../config/database';
import bcrypt from 'bcryptjs';

async function initializeDatabase() {
  try {
    // Create database if it doesn't exist
    await pool.execute('CREATE DATABASE IF NOT EXISTS k_market');
    await pool.execute('USE k_market');

    // Create users table if it doesn't exist
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if test user exists
    const [existingUsers] = await pool.execute<any[]>(
      'SELECT * FROM users WHERE email = ?',
      ['test@example.com']
    );

    // Create test user if it doesn't exist
    if (!existingUsers || existingUsers.length === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await pool.execute(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        ['test@example.com', hashedPassword]
      );
      console.log('Test user created successfully');
    }

    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error; // Re-throw to handle it in the calling code
  }
}

export default initializeDatabase;