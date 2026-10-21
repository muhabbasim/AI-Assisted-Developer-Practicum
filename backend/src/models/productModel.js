const { pool } = require('../config/database');

const productModel = {
  // Get all products
  async getAll() {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY id ASC'
    );
    return result.rows;
  },

  // Get product by ID
  async getById(id) {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  // Get products by category
  async getByCategory(category) {
    const result = await pool.query(
      'SELECT * FROM products WHERE category = $1 ORDER BY id ASC',
      [category]
    );
    return result.rows;
  },

  // Search products by name
  async search(searchTerm) {
    const result = await pool.query(
      'SELECT * FROM products WHERE name ILIKE $1 ORDER BY id ASC',
      [`%${searchTerm}%`]
    );
    return result.rows;
  },

  // Create product (for seeding)
  async create(name, price, category, image, stockQuantity, description) {
    const result = await pool.query(
      'INSERT INTO products (name, price, category, image, stock_quantity, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, price, category, image, stockQuantity, description]
    );
    return result.rows[0];
  },

  // Update stock quantity
  async updateStock(id, quantity) {
    const result = await pool.query(
      'UPDATE products SET stock_quantity = stock_quantity + $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    return result.rows[0];
  }
};

module.exports = productModel;
