import express from 'express';
import {
  getPublicCaseStudies,
  getAdminCaseStudies,
  getCaseStudy,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} from '../controllers/caseStudyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPublicCaseStudies);
router.get('/:idOrSlug', getCaseStudy);

router.get('/admin/all', protect, getAdminCaseStudies);
router.post('/', protect, createCaseStudy);
router.put('/:id', protect, updateCaseStudy);
router.delete('/:id', protect, deleteCaseStudy);

export default router;
