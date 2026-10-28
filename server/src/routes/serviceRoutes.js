import express from 'express';
import {
  getPublicServices,
  getCategoriesOverview,
  getAdminServices,
  getService,
  getServicesByCategory,
  createService,
  updateService,
  deleteService,
  duplicateService,
  toggleServiceStatus,
} from '../controllers/serviceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPublicServices);
router.get('/overview', getCategoriesOverview);
router.get('/category/:categorySlug', getServicesByCategory);
router.get('/:idOrSlug', getService);

// Admin Protected routes
router.get('/admin/all', protect, getAdminServices);
router.get('/admin/:idOrSlug', protect, getService);
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);
router.post('/:id/duplicate', protect, duplicateService);
router.patch('/:id/status', protect, toggleServiceStatus);

export default router;
