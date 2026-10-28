import express from 'express';
import {
  getPublicCategories,
  getAdminCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPublicCategories);
router.get('/:idOrSlug', getCategory);

// Admin protected routes
router.get('/admin/all', protect, getAdminCategories);
router.post('/', protect, createCategory);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);

export default router;
