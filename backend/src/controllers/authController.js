import userModel from '../models/userModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Register new user
export const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  // Check if user already exists
  const existingUser = await userModel.findByEmail(email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  // Create new user
  const user = await userModel.create(email, password, name);

  // Create session
  req.session.userId = user.id;

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at
    }
  });
});

// Login user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await userModel.findByEmail(email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Verify password
  const isValidPassword = await userModel.verifyPassword(password, user.password_hash);
  if (!isValidPassword) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Create session
  req.session.userId = user.id;

  res.json({
    success: true,
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at
    }
  });
});

// Logout user
export const logout = asyncHandler(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Logout failed'
      });
    }

    res.clearCookie('connect.sid');
    res.json({
      success: true,
      message: 'Logout successful'
    });
  });
});

// Get current user
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.session.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at
    }
  });
});
