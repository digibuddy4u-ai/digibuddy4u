import express from 'express';
import {
  getPublicFAQs,
  getAdminFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from '../controllers/faqController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPublicFAQs);
router.get('/admin/all', protect, getAdminFAQs);
router.post('/', protect, createFAQ);
router.put('/:id', protect, updateFAQ);
router.delete('/:id', protect, deleteFAQ);

export default router;
