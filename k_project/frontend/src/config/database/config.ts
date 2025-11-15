import { DatabaseConfig } from './types';
import { DB_CONFIG } from './constants';
import dotenv from 'dotenv';

dotenv.config();

export const getDatabaseConfig = (): DatabaseConfig => ({
  host: process.env.DB_HOST || DB_CONFIG.DEFAULT_HOST,
  port: Number(process.env.DB_PORT) || DB_CONFIG.DEFAULT_PORT,
  user: process.env.DB_USER || DB_CONFIG.DEFAULT_USER,
  password: process.env.DB_PASSWORD || DB_CONFIG.DEFAULT_PASSWORD,
  database: process.env.DB_NAME || DB_CONFIG.DEFAULT_DATABASE,
  waitForConnections: true,
  connectionLimit: DB_CONFIG.CONNECTION_LIMIT,
  queueLimit: DB_CONFIG.QUEUE_LIMIT
});