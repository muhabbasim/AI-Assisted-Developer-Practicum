import express from 'express';
import { register, login, logout, getCurrentUser } from '../controllers/authController.js';
import { requireAuth, requireGuest } from '../middleware/auth.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', requireGuest, validateRegister, register);
router.post('/login', requireGuest, validateLogin, login);

// Protected routes
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, getCurrentUser);

export default router;
