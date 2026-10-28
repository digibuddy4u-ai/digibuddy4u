import express from 'express';
import {
  getPublicPricing,
  getAdminPricing,
  createPricing,
  updatePricing,
  deletePricing,
} from '../controllers/pricingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPublicPricing);
router.get('/admin/all', protect, getAdminPricing);
router.post('/', protect, createPricing);
router.put('/:id', protect, updatePricing);
router.delete('/:id', protect, deletePricing);

export default router;
