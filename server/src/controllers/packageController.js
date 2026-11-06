import Package from '../models/Package.js';
import LeadActivity from '../models/LeadActivity.js';
import Customer from '../models/Customer.js';
import { generatePackagePDF } from '../services/pdfGenerator.js';
import { PACKAGES_CATALOG } from '../utils/packagesCatalog.js';

/**
 * Ensure database is seeded with initial PDF packages if empty
 */
export async function seedPackagesIfEmpty() {
  try {
    const count = await Package.countDocuments();
    if (count === 0) {
      console.log('📦 Seeding initial packages from PDF catalog...');
      await Package.insertMany(PACKAGES_CATALOG);
      console.log('✅ 5 Packages seeded successfully into MongoDB Atlas.');
    }
  } catch (err) {
    console.error('Error seeding packages:', err.message);
  }
}

/**
 * Public: Get all published packages (overview)
 */
export async function getPublicPackages(req, res) {
  try {
    let packages = await Package.find({ isPublished: true }).sort({ order: 1, monthlyPrice: 1 });
    
    // Auto-seed if empty
    if (packages.length === 0) {
      await Package.insertMany(PACKAGES_CATALOG);
      packages = await Package.find({ isPublished: true }).sort({ order: 1, monthlyPrice: 1 });
    }

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve packages catalogue.',
      error: error.message,
    });
  }
}

/**
 * Public / Protected: Get single package by slug
 * Returns full details if visitor is logged in or if package does not require login
 */
export async function getPackageBySlug(req, res) {
  try {
    const { slug } = req.params;
    let pkg = await Package.findOne({ slug, isPublished: true });

    if (!pkg) {
      const catalogItem = PACKAGES_CATALOG.find((p) => p.slug === slug);
      if (catalogItem) {
        pkg = catalogItem;
      } else {
        return res.status(404).json({
          success: false,
          message: 'Requested package was not found or is currently unavailable.',
        });
      }
    }

    const isLoggedIn = !!req.customer;

    // Record activity if visitorId or customer is present
    const visitorId = req.headers['x-visitor-id'] || req.query.visitorId;
    if (visitorId || req.customer) {
      try {
        await LeadActivity.create({
          eventType: 'package_details_view',
          packageId: pkg._id,
          packageSlug: pkg.slug,
          packageName: pkg.name,
          customerId: req.customer?._id,
          customerEmail: req.customer?.email,
          customerName: req.customer?.name,
          visitorId: visitorId || req.customer?.anonymousVisitorIds?.[0] || 'anonymous',
          isLoggedIn,
          device: req.headers['user-agent']?.toLowerCase().includes('mobile') ? 'mobile' : 'desktop',
        });
      } catch (e) {
        // Non-blocking tracking
      }
    }

    res.status(200).json({
      success: true,
      requiresLogin: false,
      data: pkg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve package detail.',
      error: error.message,
    });
  }
}

/**
 * Download individual package PDF
 */
export async function downloadPackagePDF(req, res) {
  try {
    const { slug } = req.params;
    let pkg = await Package.findOne({ slug, isPublished: true });

    if (!pkg) {
      pkg = PACKAGES_CATALOG.find((p) => p.slug === slug);
    }

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: 'Package not found for PDF generation.',
      });
    }

    // Record download event
    const visitorId = req.headers['x-visitor-id'] || req.query.visitorId;
    try {
      await LeadActivity.create({
        eventType: 'package_pdf_download',
        packageId: pkg._id,
        packageSlug: pkg.slug,
        packageName: pkg.name,
        customerId: req.customer?._id,
        customerEmail: req.customer?.email,
        customerName: req.customer?.name,
        visitorId: visitorId || req.customer?.anonymousVisitorIds?.[0] || 'anonymous',
        isLoggedIn: !!req.customer,
      });

      if (req.customer) {
        await Customer.findByIdAndUpdate(req.customer._id, {
          $push: {
            downloadedPdfs: {
              packageSlug: pkg.slug,
              packageName: pkg.name,
              downloadedAt: new Date(),
            },
          },
        });
      }
    } catch (e) {
      // Non-blocking tracking
    }

    const filename = `DigiBuddy4U_${pkg.name}_Package.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    generatePackagePDF(pkg, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate package PDF.',
      error: error.message,
    });
  }
}

/**
 * Admin: Get all packages (including drafts)
 */
export async function adminGetAllPackages(req, res) {
  try {
    let packages = await Package.find().sort({ order: 1, createdAt: 1 });
    if (packages.length === 0) {
      await Package.insertMany(PACKAGES_CATALOG);
      packages = await Package.find().sort({ order: 1, createdAt: 1 });
    }

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load packages.',
      error: error.message,
    });
  }
}

/**
 * Admin: Create package
 */
export async function adminCreatePackage(req, res) {
  try {
    const newPackage = await Package.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Package created successfully.',
      data: newPackage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create package.',
    });
  }
}

/**
 * Admin: Update package
 */
export async function adminUpdatePackage(req, res) {
  try {
    const existing = await Package.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Package not found.',
      });
    }

    // Ensure vital string deliverables are never sent as empty strings
    if (!req.body.storiesCount || !String(req.body.storiesCount).trim()) {
      req.body.storiesCount = existing.storiesCount || '8 stories/month';
    }
    if (!req.body.reelsCount || !String(req.body.reelsCount).trim()) {
      req.body.reelsCount = existing.reelsCount || '2–3 reels/month';
    }
    if (!req.body.postsCount || !String(req.body.postsCount).trim()) {
      req.body.postsCount = existing.postsCount || '8 posts/month';
    }
    if (!req.body.shootsCount || !String(req.body.shootsCount).trim()) {
      req.body.shootsCount = existing.shootsCount || 'Not included';
    }

    const updated = await Package.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Package not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Package updated successfully. Public website and PDF downloads reflect the new information.',
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update package.',
    });
  }
}

/**
 * Admin: Delete package
 */
export async function adminDeletePackage(req, res) {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Package not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Package removed successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Admin: Toggle package status / login requirements
 */
export async function adminToggleStatus(req, res) {
  try {
    const { isPublished, isFeatured, requiresLoginForDetails, requiresLoginForPdf, showOnHome } = req.body;
    const updates = {};
    if (typeof isPublished === 'boolean') updates.isPublished = isPublished;
    if (typeof isFeatured === 'boolean') updates.isFeatured = isFeatured;
    if (typeof requiresLoginForDetails === 'boolean') updates.requiresLoginForDetails = requiresLoginForDetails;
    if (typeof requiresLoginForPdf === 'boolean') updates.requiresLoginForPdf = requiresLoginForPdf;
    if (typeof showOnHome === 'boolean') updates.showOnHome = showOnHome;

    const updated = await Package.findByIdAndUpdate(req.params.id, updates, { returnDocument: 'after' });
    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Admin: Reorder packages
 */
export async function adminReorderPackages(req, res) {
  try {
    const { orders } = req.body; // array of { id, order }
    if (Array.isArray(orders)) {
      const promises = orders.map(({ id, order }) =>
        Package.findByIdAndUpdate(id, { order })
      );
      await Promise.all(promises);
    }

    res.status(200).json({
      success: true,
      message: 'Package display sequence reordered successfully.',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
