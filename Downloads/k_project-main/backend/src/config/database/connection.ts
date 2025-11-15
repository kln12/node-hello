import mysql from 'mysql2/promise';
import { getDatabaseConfig } from './config';

class DatabaseConnection {
  private static pool: mysql.Pool;

  public static async getPool(): Promise<mysql.Pool> {
    if (!this.pool) {
      this.pool = mysql.createPool(getDatabaseConfig());
      await this.testConnection();
    }
    return this.pool;
  }

  private static async testConnection(): Promise<void> {
    try {
      const connection = await this.pool.getConnection();
      console.log('Database connected successfully');
      connection.release();
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }
}

export const getDatabase = () => DatabaseConnection.getPool();