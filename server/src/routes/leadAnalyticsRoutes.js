import express from 'express';
import {
  recordTrackingEvent,
  submitPackageEnquiry,
  adminGetLeads,
  adminGetLeadById,
  adminUpdateLeadStatus,
  adminAddLeadNote,
  adminAssignLead,
  adminExportLeadsCSV,
  adminGetPackageAnalytics,
} from '../controllers/leadAnalyticsController.js';
import { protect as protectAdmin } from '../middleware/auth.js';
import { optionalCustomer } from '../middleware/customerAuth.js';

const router = express.Router();

// Public telemetry tracking and enquiry endpoints
router.post('/event', optionalCustomer, recordTrackingEvent);
router.post('/enquiry', optionalCustomer, submitPackageEnquiry);

// Admin CRM & Analytics endpoints (protected by Admin JWT)
router.get('/admin/leads', protectAdmin, adminGetLeads);
router.get('/admin/leads/export/csv', protectAdmin, adminExportLeadsCSV);
router.get('/admin/leads/:id', protectAdmin, adminGetLeadById);
router.patch('/admin/leads/:id/status', protectAdmin, adminUpdateLeadStatus);
router.post('/admin/leads/:id/notes', protectAdmin, adminAddLeadNote);
router.patch('/admin/leads/:id/assign', protectAdmin, adminAssignLead);
router.get('/admin/analytics', protectAdmin, adminGetPackageAnalytics);

export default router;
