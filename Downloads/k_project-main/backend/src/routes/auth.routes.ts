// backend/src/routes/auth.routes.ts
import express from 'express';
import { authService } from '../services/auth.service';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  try {
    const result = await authService.login(email, password);
    return res.json(result);
  } catch (err: any) {
    if (err.code === 'INVALID') return res.status(401).json({ message: 'Invalid email or password' });
    console.error('Auth error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
