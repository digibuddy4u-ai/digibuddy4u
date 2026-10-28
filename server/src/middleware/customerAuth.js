import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';
import { ENV } from '../config/env.js';

export async function protectCustomer(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.customerToken) {
    token = req.cookies.customerToken;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in or create an account to view full package specifications.',
      requiresAuth: true,
    });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    const customer = await Customer.findById(decoded.id).select('+isActive');

    if (!customer || !customer.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account not found or inactive. Please log in again.',
        requiresAuth: true,
      });
    }

    req.customer = customer;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Session expired. Please log in again.',
      requiresAuth: true,
    });
  }
}

export async function optionalCustomer(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.customerToken) {
    token = req.cookies.customerToken;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET);
      const customer = await Customer.findById(decoded.id);
      if (customer && customer.isActive) {
        req.customer = customer;
      }
    } catch {
      // Ignore invalid optional tokens
    }
  }

  next();
}
