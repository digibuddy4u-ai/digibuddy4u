import express from 'express';
import {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
  toggleSavePackage,
  forgotPassword,
} from '../controllers/customerAuthController.js';
import {
  getAllCustomersForAdmin,
  createCustomerByAdmin,
  updateCustomerByAdmin,
  deleteCustomerByAdmin,
} from '../controllers/customerAdminController.js';
import { protectCustomer } from '../middleware/customerAuth.js';
import { protect as protectAdmin, requirePermission } from '../middleware/auth.js';

const router = express.Router();

// Public & Customer Endpoints
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.get('/me', protectCustomer, getCustomerProfile);
router.post('/save-package/:slug', protectCustomer, toggleSavePackage);
router.post('/forgot-password', forgotPassword);

// Admin / Staff Customer Management Endpoints
router.get('/admin/all', protectAdmin, requirePermission('customers', 'view'), getAllCustomersForAdmin);
router.post('/admin/create', protectAdmin, requirePermission('customers', 'create'), createCustomerByAdmin);
router.put('/admin/:id', protectAdmin, requirePermission('customers', 'edit'), updateCustomerByAdmin);
router.delete('/admin/:id', protectAdmin, requirePermission('customers', 'delete'), deleteCustomerByAdmin);

export default router;
