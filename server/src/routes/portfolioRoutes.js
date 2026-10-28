import express from 'express';
import {
  getPublicProjects,
  getAdminProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/portfolioController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', getPublicProjects);
router.get('/:idOrSlug', getProject);

// Admin Protected
router.get('/admin/all', protect, getAdminProjects);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
