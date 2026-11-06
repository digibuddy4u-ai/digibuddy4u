import express from 'express';
import {
  getPublicAddOns,
  getAddOnBySlug,
  adminGetAllAddOns,
  adminCreateAddOn,
  adminUpdateAddOn,
  adminDeleteAddOn,
  adminToggleStatus,
  adminReorderAddOns,
} from '../controllers/addonController.js';
import { protect as protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPublicAddOns);
router.get('/:slug', getAddOnBySlug);

// Admin routes (Protected by Admin JWT)
router.get('/admin/all', protectAdmin, adminGetAllAddOns);
router.post('/admin', protectAdmin, adminCreateAddOn);
router.put('/admin/:id', protectAdmin, adminUpdateAddOn);
router.delete('/admin/:id', protectAdmin, adminDeleteAddOn);
router.patch('/admin/:id/status', protectAdmin, adminToggleStatus);
router.post('/admin/reorder', protectAdmin, adminReorderAddOns);

export default router;
