import orderModel from '../models/orderModel.js';
import cartModel from '../models/cartModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Create order (checkout)
export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.session.userId;

  // Get cart items
  const cartItems = await cartModel.getByUserId(userId);

  if (cartItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Cart is empty'
    });
  }

  // Validate stock availability for all items
  for (const item of cartItems) {
    if (item.stock_quantity < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for ${item.name}. Only ${item.stock_quantity} available.`
      });
    }
  }

  // Calculate total
  const total = await cartModel.getCartTotal(userId);

  // Create order (this also clears the cart and updates stock)
  const order = await orderModel.create(userId, total, cartItems);

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order: {
      id: order.id,
      totalAmount: parseFloat(order.total_amount),
      status: order.status,
      createdAt: order.created_at
    }
  });
});

// Get user's orders
export const getOrders = asyncHandler(async (req, res) => {
  const userId = req.session.userId;

  const orders = await orderModel.getByUserId(userId);

  res.json({
    success: true,
    count: orders.length,
    orders: orders.map(order => ({
      id: order.id,
      totalAmount: parseFloat(order.total_amount),
      status: order.status,
      createdAt: order.created_at
    }))
  });
});

// Get single order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;

  const order = await orderModel.getById(id, userId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  res.json({
    success: true,
    order: {
      id: order.id,
      totalAmount: parseFloat(order.total_amount),
      status: order.status,
      createdAt: order.created_at,
      items: order.items.map(item => ({
        id: item.id,
        productId: item.product_id,
        name: item.name,
        image: item.image,
        category: item.category,
        quantity: item.quantity,
        priceAtPurchase: parseFloat(item.price_at_purchase),
        subtotal: parseFloat(item.subtotal)
      }))
    }
  });
});
