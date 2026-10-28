import Service from '../models/Service.js';
import ServiceCategory from '../models/ServiceCategory.js';

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// @desc    Get published services for public website
// @route   GET /api/services
// @access  Public
export async function getPublicServices(req, res, next) {
  try {
    const { category, featured, search, home, showOnHome } = req.query;

    const query = {
      $or: [{ status: 'published' }, { isPublished: true }],
    };

    if (category) {
      query.categorySlug = category.toLowerCase().trim();
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (home === 'true' || showOnHome === 'true') {
      query.showOnHome = { $ne: false };
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { shortDescription: searchRegex },
        { 'subServices.name': searchRegex },
      ];
    }

    const services = await Service.find(query).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get categories with their published services for navbar & homepage
// @route   GET /api/services/overview
// @access  Public
export async function getCategoriesOverview(req, res, next) {
  try {
    const categories = await ServiceCategory.find({ isActive: true }).sort({
      displayOrder: 1,
      createdAt: 1,
    });

    const overview = await Promise.all(
      categories.map(async (category) => {
        const services = await Service.find({
          $or: [
            { categoryId: category._id },
            { categorySlug: category.slug },
          ],
          $and: [{ $or: [{ status: 'published' }, { isPublished: true }] }],
        })
          .select('title slug shortDescription icon isFeatured order subServices highlight')
          .sort({ order: 1, createdAt: 1 });

        return {
          category: {
            id: category._id,
            name: category.name,
            slug: category.slug,
            description: category.description,
            icon: category.icon,
            image: category.image,
            displayOrder: category.displayOrder,
          },
          services,
          count: services.length,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: overview,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get single service by slug or id
// @route   GET /api/services/:idOrSlug
// @access  Public
export async function getService(req, res, next) {
  try {
    const { idOrSlug } = req.params;
    const isId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);

    const query = isId ? { _id: idOrSlug } : { slug: idOrSlug.toLowerCase().trim() };
    const service = await Service.findOne(query).populate('relatedServices', 'title slug shortDescription icon categorySlug');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    // If relatedServices is empty, fetch up to 3 services in the same category
    let related = service.relatedServices || [];
    if (!related.length) {
      related = await Service.find({
        categorySlug: service.categorySlug,
        slug: { $ne: service.slug },
        $or: [{ status: 'published' }, { isPublished: true }],
      })
        .select('title slug shortDescription icon categorySlug')
        .limit(3);
    }

    const serviceObj = service.toObject();
    serviceObj.relatedServices = related;

    res.status(200).json({
      success: true,
      data: serviceObj,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get all services for a specific category
// @route   GET /api/services/category/:categorySlug
// @access  Public
export async function getServicesByCategory(req, res, next) {
  try {
    const { categorySlug } = req.params;
    const cleanSlug = categorySlug.toLowerCase().trim();

    const category = await ServiceCategory.findOne({ slug: cleanSlug });

    const services = await Service.find({
      categorySlug: cleanSlug,
      $or: [{ status: 'published' }, { isPublished: true }],
    }).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      category,
      data: services,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get all services for admin panel
// @route   GET /api/services/admin/all
// @access  Private (Admin)
export async function getAdminServices(req, res, next) {
  try {
    const { category, status, search } = req.query;
    const query = {};

    if (category && category !== 'all') {
      query.categorySlug = category.toLowerCase().trim();
    }

    if (status && status !== 'all') {
      if (status === 'published') {
        query.$or = [{ status: 'published' }, { isPublished: true }];
      } else if (status === 'draft') {
        query.$or = [{ status: 'draft' }, { isPublished: false }];
      }
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { slug: searchRegex },
        { shortDescription: searchRegex },
        { 'subServices.name': searchRegex },
      ];
    }

    const services = await Service.find(query).sort({ categorySlug: 1, order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Admin)
export async function createService(req, res, next) {
  try {
    const {
      title,
      slug,
      categoryId,
      categorySlug,
      categoryName,
      shortDescription,
      fullDescription,
      icon,
      image,
      subServices,
      problemsSolved,
      benefits,
      useCases,
      processSteps,
      targetIndustries,
      deliverables,
      highlight,
      relatedServices,
      faqs,
      seo,
      status,
      isPublished,
      isFeatured,
      order,
    } = req.body;

    if (!title || !shortDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least Title and Short Description.',
      });
    }

    const finalSlug = slug ? generateSlug(slug) : generateSlug(title);

    const existing = await Service.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `A service with slug "${finalSlug}" already exists.`,
      });
    }

    // Determine category details
    let resolvedCategoryId = categoryId;
    let resolvedCategorySlug = categorySlug || 'digital-marketing';
    let resolvedCategoryName = categoryName || 'Digital Marketing';

    if (categoryId) {
      const cat = await ServiceCategory.findById(categoryId);
      if (cat) {
        resolvedCategorySlug = cat.slug;
        resolvedCategoryName = cat.name;
      }
    } else if (categorySlug) {
      const cat = await ServiceCategory.findOne({ slug: categorySlug.toLowerCase().trim() });
      if (cat) {
        resolvedCategoryId = cat._id;
        resolvedCategoryName = cat.name;
      }
    }

    const finalStatus = status || (isPublished === false ? 'draft' : 'published');
    const finalIsPublished = finalStatus === 'published';

    const service = await Service.create({
      title: title.trim(),
      slug: finalSlug,
      categoryId: resolvedCategoryId,
      categorySlug: resolvedCategorySlug,
      categoryName: resolvedCategoryName,
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription ? fullDescription.trim() : shortDescription.trim(),
      icon: icon || 'Share2',
      image: image || '',
      subServices: Array.isArray(subServices) ? subServices : [],
      problemsSolved: Array.isArray(problemsSolved) ? problemsSolved : [],
      benefits: Array.isArray(benefits) ? benefits : [],
      useCases: Array.isArray(useCases) ? useCases : [],
      processSteps: Array.isArray(processSteps) ? processSteps : [],
      targetIndustries: Array.isArray(targetIndustries) ? targetIndustries : [],
      deliverables: Array.isArray(deliverables) ? deliverables : [],
      highlight: highlight ? highlight.trim() : '',
      relatedServices: Array.isArray(relatedServices) ? relatedServices : [],
      faqs: Array.isArray(faqs) ? faqs : [],
      seo: seo || {
        title: `${title.trim()} | DigiBuddy4U`,
        metaDescription: shortDescription.trim(),
        keywords: [],
      },
      status: finalStatus,
      isPublished: finalIsPublished,
      isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : true,
      showOnHome: req.body.showOnHome !== undefined ? Boolean(req.body.showOnHome) : true,
      order: order !== undefined ? Number(order) : 0,
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: service,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin)
export async function updateService(req, res, next) {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    const {
      title,
      slug,
      categoryId,
      categorySlug,
      categoryName,
      shortDescription,
      fullDescription,
      icon,
      image,
      subServices,
      problemsSolved,
      benefits,
      useCases,
      processSteps,
      targetIndustries,
      deliverables,
      highlight,
      relatedServices,
      faqs,
      seo,
      status,
      isPublished,
      isFeatured,
      order,
    } = req.body;

    if (title) service.title = title.trim();

    if (slug) {
      const newSlug = generateSlug(slug);
      if (newSlug !== service.slug) {
        const existing = await Service.findOne({ slug: newSlug });
        if (existing) {
          return res.status(400).json({
            success: false,
            message: `A service with slug "${newSlug}" already exists.`,
          });
        }
        service.slug = newSlug;
      }
    }

    if (categoryId !== undefined) {
      service.categoryId = categoryId;
      const cat = await ServiceCategory.findById(categoryId);
      if (cat) {
        service.categorySlug = cat.slug;
        service.categoryName = cat.name;
      }
    } else if (categorySlug !== undefined) {
      service.categorySlug = categorySlug.toLowerCase().trim();
      const cat = await ServiceCategory.findOne({ slug: service.categorySlug });
      if (cat) {
        service.categoryId = cat._id;
        service.categoryName = cat.name;
      }
    }

    if (categoryName !== undefined) service.categoryName = categoryName.trim();
    if (shortDescription !== undefined) service.shortDescription = shortDescription.trim();
    if (fullDescription !== undefined) service.fullDescription = fullDescription.trim();
    if (icon !== undefined) service.icon = icon.trim();
    if (image !== undefined) service.image = image.trim();
    if (subServices !== undefined) service.subServices = Array.isArray(subServices) ? subServices : [];
    if (problemsSolved !== undefined) service.problemsSolved = Array.isArray(problemsSolved) ? problemsSolved : [];
    if (benefits !== undefined) service.benefits = Array.isArray(benefits) ? benefits : [];
    if (useCases !== undefined) service.useCases = Array.isArray(useCases) ? useCases : [];
    if (processSteps !== undefined) service.processSteps = Array.isArray(processSteps) ? processSteps : [];
    if (targetIndustries !== undefined) service.targetIndustries = Array.isArray(targetIndustries) ? targetIndustries : [];
    if (deliverables !== undefined) service.deliverables = Array.isArray(deliverables) ? deliverables : [];
    if (highlight !== undefined) service.highlight = highlight.trim();
    if (relatedServices !== undefined) service.relatedServices = Array.isArray(relatedServices) ? relatedServices : [];
    if (faqs !== undefined) service.faqs = Array.isArray(faqs) ? faqs : [];
    if (seo !== undefined) service.seo = seo;

    if (status !== undefined) {
      service.status = status;
      service.isPublished = status === 'published';
    } else if (isPublished !== undefined) {
      service.isPublished = Boolean(isPublished);
      service.status = isPublished ? 'published' : 'draft';
    }

    if (isFeatured !== undefined) service.isFeatured = Boolean(isFeatured);
    if (req.body.showOnHome !== undefined) service.showOnHome = Boolean(req.body.showOnHome);
    if (order !== undefined) service.order = Number(order);

    await service.save();

    res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: service,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Duplicate a service
// @route   POST /api/services/:id/duplicate
// @access  Private (Admin)
export async function duplicateService(req, res, next) {
  try {
    const original = await Service.findById(req.params.id);

    if (!original) {
      return res.status(404).json({
        success: false,
        message: 'Service to duplicate not found.',
      });
    }

    const copyObj = original.toObject();
    delete copyObj._id;
    delete copyObj.createdAt;
    delete copyObj.updatedAt;

    copyObj.title = `${original.title} (Copy)`;
    let copySlug = `${original.slug}-copy`;
    const existing = await Service.findOne({ slug: copySlug });
    if (existing) {
      copySlug = `${copySlug}-${Date.now().toString().slice(-4)}`;
    }
    copyObj.slug = copySlug;
    copyObj.status = 'draft';
    copyObj.isPublished = false;
    copyObj.order = (original.order || 0) + 1;

    const duplicated = await Service.create(copyObj);

    res.status(201).json({
      success: true,
      message: `Duplicated "${original.title}" as draft.`,
      data: duplicated,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Toggle service status (draft/published)
// @route   PATCH /api/services/:id/status
// @access  Private (Admin)
export async function toggleServiceStatus(req, res, next) {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    const newStatus = service.status === 'published' ? 'draft' : 'published';
    service.status = newStatus;
    service.isPublished = newStatus === 'published';

    await service.save();

    res.status(200).json({
      success: true,
      message: `Service status set to ${newStatus}.`,
      data: service,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
export async function deleteService(req, res, next) {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
}
