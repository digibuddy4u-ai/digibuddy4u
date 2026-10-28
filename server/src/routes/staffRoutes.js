import express from 'express';
import {
  getAllStaff,
  getRoleTemplates,
  createStaff,
  updateStaff,
  deleteStaff,
} from '../controllers/staffController.js';
import { protect, requirePermission } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/roles', getRoleTemplates);
router.get('/', requirePermission('staff', 'view'), getAllStaff);
router.post('/', requirePermission('staff', 'create'), createStaff);
router.put('/:id', requirePermission('staff', 'edit'), updateStaff);
router.delete('/:id', requirePermission('staff', 'delete'), deleteStaff);

export default router;
