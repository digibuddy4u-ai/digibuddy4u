import express from 'express';
import {
  getPublicSettings,
  getAdminSettings,
  updateSettings,
} from '../controllers/settingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPublicSettings);
router.get('/admin', protect, getAdminSettings);
router.put('/', protect, updateSettings);

export default router;
