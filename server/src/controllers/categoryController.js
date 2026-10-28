import ServiceCategory from '../models/ServiceCategory.js';
import Service from '../models/Service.js';

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// @desc    Get active categories for public website
// @route   GET /api/categories
// @access  Public
export async function getPublicCategories(req, res, next) {
  try {
    const categories = await ServiceCategory.find({ isActive: true }).sort({
      displayOrder: 1,
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get all categories for admin panel
// @route   GET /api/categories/admin/all
// @access  Private (Admin)
export async function getAdminCategories(req, res, next) {
  try {
    const categories = await ServiceCategory.find().sort({
      displayOrder: 1,
      createdAt: 1,
    });

    // Also count services per category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Service.countDocuments({
          $or: [{ categoryId: cat._id }, { categorySlug: cat.slug }],
        });
        const obj = cat.toObject();
        obj.servicesCount = count;
        return obj;
      })
    );

    res.status(200).json({
      success: true,
      data: categoriesWithCount,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get single category by slug or id
// @route   GET /api/categories/:idOrSlug
// @access  Public
export async function getCategory(req, res, next) {
  try {
    const { idOrSlug } = req.params;
    const isId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);

    const query = isId ? { _id: idOrSlug } : { slug: idOrSlug.toLowerCase().trim() };
    const category = await ServiceCategory.findOne(query);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Admin)
export async function createCategory(req, res, next) {
  try {
    const { name, slug, description, icon, image, displayOrder, isActive } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Category Name and Description.',
      });
    }

    const finalSlug = slug ? generateSlug(slug) : generateSlug(name);

    const existing = await ServiceCategory.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `A category with slug "${finalSlug}" already exists.`,
      });
    }

    const category = await ServiceCategory.create({
      name: name.trim(),
      slug: finalSlug,
      description: description.trim(),
      icon: icon || 'Layers',
      image: image || '',
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully.',
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
export async function updateCategory(req, res, next) {
  try {
    const category = await ServiceCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    const { name, slug, description, icon, image, displayOrder, isActive } = req.body;

    if (name) category.name = name.trim();
    if (slug) {
      const newSlug = generateSlug(slug);
      if (newSlug !== category.slug) {
        const existing = await ServiceCategory.findOne({ slug: newSlug });
        if (existing) {
          return res.status(400).json({
            success: false,
            message: `A category with slug "${newSlug}" already exists.`,
          });
        }
        category.slug = newSlug;
      }
    }
    if (description !== undefined) category.description = description.trim();
    if (icon !== undefined) category.icon = icon.trim();
    if (image !== undefined) category.image = image.trim();
    if (displayOrder !== undefined) category.displayOrder = Number(displayOrder);
    if (isActive !== undefined) category.isActive = Boolean(isActive);

    await category.save();

    // Also update services that reference this category
    await Service.updateMany(
      { categoryId: category._id },
      { categoryName: category.name, categorySlug: category.slug }
    );

    res.status(200).json({
      success: true,
      message: 'Category updated successfully.',
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
export async function deleteCategory(req, res, next) {
  try {
    const category = await ServiceCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    // Check if services are attached
    const servicesCount = await Service.countDocuments({
      $or: [{ categoryId: category._id }, { categorySlug: category.slug }],
    });

    if (servicesCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. There are ${servicesCount} service(s) currently linked to it. Please reassign or delete those services first.`,
      });
    }

    await ServiceCategory.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
}
