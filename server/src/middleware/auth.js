import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { ENV } from '../config/env.js';

export async function protect(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Authentication token missing.',
    });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('+isActive');

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account not found or inactive. Please login again.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token. Please log in again.',
    });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You do not have permissions for this action.',
      });
    }
    next();
  };
}

export function requirePermission(moduleName, action = 'view') {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    // Superadmin has full access
    if (req.admin.role === 'superadmin') {
      return next();
    }
    const modulePerms = req.admin.permissions?.[moduleName];
    if (!modulePerms || !modulePerms[action]) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: You do not have '${action}' permission for '${moduleName}'.`,
      });
    }
    next();
  };
}
