import express from 'express';
import authRoutes from './authRoutes.js';
import enquiryRoutes from './enquiryRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import portfolioRoutes from './portfolioRoutes.js';
import caseStudyRoutes from './caseStudyRoutes.js';
import pricingRoutes from './pricingRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';
import faqRoutes from './faqRoutes.js';
import settingRoutes from './settingRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import packageRoutes from './packageRoutes.js';
import addonRoutes from './addonRoutes.js';
import customerAuthRoutes from './customerAuthRoutes.js';
import leadAnalyticsRoutes from './leadAnalyticsRoutes.js';
import staffRoutes from './staffRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/staff', staffRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/categories', categoryRoutes);
router.use('/services', serviceRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/case-studies', caseStudyRoutes);
router.use('/pricing', pricingRoutes);
router.use('/packages', packageRoutes);
router.use('/addons', addonRoutes);
router.use('/customer', customerAuthRoutes);
router.use('/tracking', leadAnalyticsRoutes);
router.use('/leads', leadAnalyticsRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/faqs', faqRoutes);
router.use('/settings', settingRoutes);
router.use('/dashboard', dashboardRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DigiBuddy4U API is live and operational.',
    timestamp: new Date().toISOString(),
  });
});

export default router;
