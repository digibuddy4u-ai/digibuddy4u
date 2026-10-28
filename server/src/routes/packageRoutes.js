import express from 'express';
import {
  getPublicPackages,
  getPackageBySlug,
  downloadPackagePDF,
  adminGetAllPackages,
  adminCreatePackage,
  adminUpdatePackage,
  adminDeletePackage,
  adminToggleStatus,
  adminReorderPackages,
} from '../controllers/packageController.js';
import { protect as protectAdmin } from '../middleware/auth.js';
import { optionalCustomer, protectCustomer } from '../middleware/customerAuth.js';

const router = express.Router();

// Public / Semi-protected customer routes
router.get('/', getPublicPackages);
router.get('/:slug', optionalCustomer, getPackageBySlug);
router.get('/:slug/pdf', optionalCustomer, downloadPackagePDF);

// Admin routes (Protected by Admin JWT)
router.get('/admin/all', protectAdmin, adminGetAllPackages);
router.post('/admin', protectAdmin, adminCreatePackage);
router.put('/admin/:id', protectAdmin, adminUpdatePackage);
router.delete('/admin/:id', protectAdmin, adminDeletePackage);
router.patch('/admin/:id/status', protectAdmin, adminToggleStatus);
router.post('/admin/reorder', protectAdmin, adminReorderPackages);

export default router;
