import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts
} from '../controllers/productController.js';

const router = express.Router();

// All routes are public (no authentication required for browsing products)
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

export default router;
