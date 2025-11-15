import { PoolOptions } from 'mysql2/promise';

export interface DatabaseConfig extends PoolOptions {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
  queueLimit: number;
}