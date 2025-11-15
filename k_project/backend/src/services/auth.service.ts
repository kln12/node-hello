// backend/src/services/auth.service.ts
import { db } from '../config/database'; // correct import
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-prod';

export const authService = {
  async login(email: string, password: string) {
    // PostgreSQL query using pg Pool
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (!result.rows || result.rows.length === 0) {
      const e: any = new Error('Invalid email or password');
      e.code = 'INVALID';
      throw e;
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      const e: any = new Error('Invalid email or password');
      e.code = 'INVALID';
      throw e;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      user: { id: user.id, email: user.email },
      token,
    };
  },
};

export default authService;
