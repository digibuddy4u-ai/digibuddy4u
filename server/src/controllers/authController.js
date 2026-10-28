import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { ENV } from '../config/env.js';
import { isDbConnected } from '../config/db.js';

function generateToken(id) {
  return jwt.sign({ id }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });
}

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export async function login(req, res, next) {
  try {
    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message:
          'Database not connected. Please replace "<db_username>" in server/.env with your MongoDB Atlas database username, then run "npm run seed".',
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'This account has been deactivated. Please contact your system administrator.',
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        department: admin.department,
        permissions: admin.permissions,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private (Admin)
export async function getMe(req, res) {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
}

// @desc    Admin logout
// @route   POST /api/auth/logout
// @access  Private (Admin)
export async function logout(req, res) {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
}

// @desc    Update admin profile
// @route   PATCH /api/auth/profile
// @access  Private (Admin)
export async function updateProfile(req, res, next) {
  try {
    const { name, email } = req.body;
    const admin = req.admin;

    if (name) admin.name = name.trim();
    if (email) {
      const emailLower = email.toLowerCase().trim();
      if (emailLower !== admin.email) {
        const existing = await Admin.findOne({ email: emailLower });
        if (existing) {
          return res.status(400).json({
            success: false,
            message: 'Email is already in use by another admin.',
          });
        }
        admin.email = emailLower;
      }
    }

    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      admin,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Change admin password
// @route   PATCH /api/auth/change-password
// @access  Private (Admin)
export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new passwords.',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.',
      });
    }

    const admin = await Admin.findById(req.admin._id).select('+password');
    const isMatch = await admin.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password does not match.',
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (error) {
    next(error);
  }
}
