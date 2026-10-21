import express from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/orderController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// All order routes require authentication
router.use(requireAuth);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);

export default router;
