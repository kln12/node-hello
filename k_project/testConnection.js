import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// Load environment variables from the .env file in the project/src directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = `${__dirname}\\src\\.env`; // Updated path to point directly to src
console.log(`Loading environment variables from: ${envPath}`);

// Log the current working directory
console.log(`Current working directory: ${process.cwd()}`);

// Log the contents of the .env file
if (fs.existsSync(envPath)) {
    console.log('Contents of .env file:');
    console.log(fs.readFileSync(envPath, 'utf-8')); // Log the contents of the .env file
} else {
    console.error('The .env file does not exist at the specified path.');
}

dotenv.config({ path: envPath });

// Log the loaded environment variables
console.log('Loaded environment variables:');
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`User: ${process.env.DB_USER}`);
console.log(`Database: ${process.env.DB_NAME}`);

const testConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('Database connected successfully');
    await connection.end();
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

testConnection();
