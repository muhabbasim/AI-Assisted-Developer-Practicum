import productModel from '../models/productModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Get all products (with optional category filter and search)
export const getAllProducts = asyncHandler(async (req, res) => {
  const { category, search } = req.query;

  let products;

  if (search) {
    // Search products by name
    products = await productModel.search(search);
  } else if (category && category !== 'All') {
    // Filter by category
    products = await productModel.getByCategory(category);
  } else {
    // Get all products
    products = await productModel.getAll();
  }

  res.json({
    success: true,
    count: products.length,
    products
  });
});

// Get single product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await productModel.getById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    product
  });
});

// Get products by category
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const products = await productModel.getByCategory(category);

  res.json({
    success: true,
    category,
    count: products.length,
    products
  });
});

// Search products
export const searchProducts = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || !q.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }

  const products = await productModel.search(q);

  res.json({
    success: true,
    query: q,
    count: products.length,
    products
  });
});
