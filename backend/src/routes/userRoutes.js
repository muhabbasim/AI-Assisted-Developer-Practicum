import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateUpdateProfile } from '../middleware/validation.js';

const router = express.Router();

// All user routes require authentication
router.use(requireAuth);

router.get('/profile', getProfile);
router.put('/profile', validateUpdateProfile, updateProfile);

export default router;
