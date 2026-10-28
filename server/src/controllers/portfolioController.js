import Portfolio from '../models/Portfolio.js';

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// @desc    Get published portfolio projects
// @route   GET /api/portfolio
// @access  Public
export async function getPublicProjects(req, res, next) {
  try {
    const projects = await Portfolio.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get all portfolio projects for admin
// @route   GET /api/portfolio/admin
// @access  Private (Admin)
export async function getAdminProjects(req, res, next) {
  try {
    const projects = await Portfolio.find().sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get single project by slug or ID
// @route   GET /api/portfolio/:idOrSlug
// @access  Public
export async function getProject(req, res, next) {
  try {
    const { idOrSlug } = req.params;
    const isId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);

    const query = isId ? { _id: idOrSlug } : { slug: idOrSlug };
    const project = await Portfolio.findOne(query);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Create new project
// @route   POST /api/portfolio
// @access  Private (Admin)
export async function createProject(req, res, next) {
  try {
    const {
      title,
      slug,
      client,
      tagline,
      category,
      overview,
      scope,
      challenges,
      strategy,
      deliverablesDelivered,
      status,
      isMetricsPending,
      metricsNotice,
      isFeatured,
      isPublished,
      order,
    } = req.body;

    if (!title || !client || !category || !overview) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Title, Client name, Category, and Overview.',
      });
    }

    const finalSlug = slug ? generateSlug(slug) : generateSlug(title);

    const existing = await Portfolio.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `A project with slug "${finalSlug}" already exists.`,
      });
    }

    const project = await Portfolio.create({
      title: title.trim(),
      slug: finalSlug,
      client: client.trim(),
      tagline: tagline ? tagline.trim() : '',
      category: category.trim(),
      overview: overview.trim(),
      scope: Array.isArray(scope) ? scope : [],
      challenges: Array.isArray(challenges) ? challenges : [],
      strategy: Array.isArray(strategy) ? strategy : [],
      deliverablesDelivered: Array.isArray(deliverablesDelivered) ? deliverablesDelivered : [],
      status: status || 'Active Client Engagement',
      isMetricsPending: isMetricsPending !== undefined ? Boolean(isMetricsPending) : true,
      metricsNotice: metricsNotice ? metricsNotice.trim() : undefined,
      isFeatured: Boolean(isFeatured),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      order: order !== undefined ? Number(order) : 0,
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Update project
// @route   PUT /api/portfolio/:id
// @access  Private (Admin)
export async function updateProject(req, res, next) {
  try {
    const project = await Portfolio.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    const {
      title,
      slug,
      client,
      tagline,
      category,
      overview,
      scope,
      challenges,
      strategy,
      deliverablesDelivered,
      status,
      isMetricsPending,
      metricsNotice,
      isFeatured,
      isPublished,
      order,
    } = req.body;

    if (title) project.title = title.trim();
    if (slug) {
      const newSlug = generateSlug(slug);
      if (newSlug !== project.slug) {
        const existing = await Portfolio.findOne({ slug: newSlug });
        if (existing) {
          return res.status(400).json({
            success: false,
            message: `A project with slug "${newSlug}" already exists.`,
          });
        }
        project.slug = newSlug;
      }
    }
    if (client) project.client = client.trim();
    if (tagline !== undefined) project.tagline = tagline.trim();
    if (category) project.category = category.trim();
    if (overview) project.overview = overview.trim();
    if (scope !== undefined) project.scope = Array.isArray(scope) ? scope : [];
    if (challenges !== undefined) project.challenges = Array.isArray(challenges) ? challenges : [];
    if (strategy !== undefined) project.strategy = Array.isArray(strategy) ? strategy : [];
    if (deliverablesDelivered !== undefined) project.deliverablesDelivered = Array.isArray(deliverablesDelivered) ? deliverablesDelivered : [];
    if (status !== undefined) project.status = status;
    if (isMetricsPending !== undefined) project.isMetricsPending = Boolean(isMetricsPending);
    if (metricsNotice !== undefined) project.metricsNotice = metricsNotice.trim();
    if (isFeatured !== undefined) project.isFeatured = Boolean(isFeatured);
    if (isPublished !== undefined) project.isPublished = Boolean(isPublished);
    if (order !== undefined) project.order = Number(order);

    await project.save();

    res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Delete project
// @route   DELETE /api/portfolio/:id
// @access  Private (Admin)
export async function deleteProject(req, res, next) {
  try {
    const project = await Portfolio.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
}
