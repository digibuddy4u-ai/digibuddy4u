import AddOn from '../models/AddOn.js';
import { ADDONS_CATALOG } from '../utils/addonsCatalog.js';

/**
 * Auto-seed initial 15 add-ons if collection is empty
 */
export async function seedAddOnsIfEmpty() {
  try {
    const count = await AddOn.countDocuments();
    if (count === 0) {
      console.log('📦 Seeding initial 15 add-ons catalog...');
      await AddOn.insertMany(ADDONS_CATALOG);
      console.log('✅ 15 Add-ons seeded successfully into MongoDB Atlas.');
    }
  } catch (err) {
    console.error('Error seeding add-ons:', err.message);
  }
}

/**
 * Public: Get all published add-ons
 */
export async function getPublicAddOns(req, res) {
  try {
    let addons = await AddOn.find({ isPublished: true }).sort({ order: 1, createdAt: 1 });

    // Auto-seed if empty
    if (addons.length === 0) {
      await AddOn.insertMany(ADDONS_CATALOG);
      addons = await AddOn.find({ isPublished: true }).sort({ order: 1, createdAt: 1 });
    }

    res.status(200).json({
      success: true,
      count: addons.length,
      data: addons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve add-ons catalogue.',
      error: error.message,
    });
  }
}

/**
 * Public: Get single add-on by slug
 */
export async function getAddOnBySlug(req, res) {
  try {
    const { slug } = req.params;
    const addon = await AddOn.findOne({ slug, isPublished: true });

    if (!addon) {
      return res.status(404).json({
        success: false,
        message: 'Requested add-on service was not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: addon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve add-on detail.',
      error: error.message,
    });
  }
}

/**
 * Admin: Get all add-ons (including unpublished/drafts)
 */
export async function adminGetAllAddOns(req, res) {
  try {
    let addons = await AddOn.find().sort({ order: 1, createdAt: -1 });

    if (addons.length === 0) {
      await AddOn.insertMany(ADDONS_CATALOG);
      addons = await AddOn.find().sort({ order: 1, createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: addons.length,
      data: addons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin add-ons list.',
      error: error.message,
    });
  }
}

/**
 * Admin: Create new add-on
 */
export async function adminCreateAddOn(req, res) {
  try {
    const data = req.body;

    // Generate slug from title if missing
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Check slug collision
    const existing = await AddOn.findOne({ slug: data.slug });
    if (existing) {
      data.slug = `${data.slug}-${Date.now().toString().slice(-4)}`;
    }

    const addon = await AddOn.create(data);

    res.status(201).json({
      success: true,
      message: 'Add-on created successfully.',
      data: addon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create add-on.',
    });
  }
}

/**
 * Admin: Update existing add-on
 */
export async function adminUpdateAddOn(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const addon = await AddOn.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!addon) {
      return res.status(404).json({
        success: false,
        message: 'Add-on not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Add-on updated successfully.',
      data: addon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update add-on.',
    });
  }
}

/**
 * Admin: Delete add-on
 */
export async function adminDeleteAddOn(req, res) {
  try {
    const { id } = req.params;
    const addon = await AddOn.findByIdAndDelete(id);

    if (!addon) {
      return res.status(404).json({
        success: false,
        message: 'Add-on not found for deletion.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Add-on deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete add-on.',
    });
  }
}

/**
 * Admin: Toggle active status (publish / unpublish)
 */
export async function adminToggleStatus(req, res) {
  try {
    const { id } = req.params;
    const addon = await AddOn.findById(id);

    if (!addon) {
      return res.status(404).json({
        success: false,
        message: 'Add-on not found.',
      });
    }

    addon.isPublished = !addon.isPublished;
    await addon.save();

    res.status(200).json({
      success: true,
      message: `Add-on ${addon.isPublished ? 'published' : 'hidden'} successfully.`,
      isPublished: addon.isPublished,
      data: addon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to toggle add-on status.',
    });
  }
}

/**
 * Admin: Reorder add-ons
 */
export async function adminReorderAddOns(req, res) {
  try {
    const { orderedIds } = req.body; // Array of IDs in desired order

    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({
        success: false,
        message: 'orderedIds must be an array of IDs.',
      });
    }

    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index + 1 },
      },
    }));

    await AddOn.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: 'Add-ons reordered successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to reorder add-ons.',
    });
  }
}
