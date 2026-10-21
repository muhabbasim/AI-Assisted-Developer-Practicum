import userModel from '../models/userModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Get user profile
export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.session.userId;

  const user = await userModel.findById(userId);

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

// Update user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.session.userId;
  const { name, email } = req.body;

  // Get current user data
  const currentUser = await userModel.findById(userId);

  if (!currentUser) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Use current values if not provided
  const updatedName = name || currentUser.name;
  const updatedEmail = email || currentUser.email;

  // Check if email is already taken by another user
  if (email && email !== currentUser.email) {
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already in use'
      });
    }
  }

  // Update profile
  const updatedUser = await userModel.updateProfile(userId, updatedName, updatedEmail);

  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      createdAt: updatedUser.created_at
    }
  });
});
