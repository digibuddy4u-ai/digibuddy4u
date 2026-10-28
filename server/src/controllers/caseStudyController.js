import CaseStudy from '../models/CaseStudy.js';

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getPublicCaseStudies(req, res, next) {
  try {
    const studies = await CaseStudy.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: studies });
  } catch (error) {
    next(error);
  }
}

export async function getAdminCaseStudies(req, res, next) {
  try {
    const studies = await CaseStudy.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: studies });
  } catch (error) {
    next(error);
  }
}

export async function getCaseStudy(req, res, next) {
  try {
    const { idOrSlug } = req.params;
    const isId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);
    const query = isId ? { _id: idOrSlug } : { slug: idOrSlug };
    const study = await CaseStudy.findOne(query);

    if (!study) {
      return res.status(404).json({ success: false, message: 'Case study not found.' });
    }
    res.status(200).json({ success: true, data: study });
  } catch (error) {
    next(error);
  }
}

export async function createCaseStudy(req, res, next) {
  try {
    const { title, slug, client, category, subtitle, overview, challenges, strategy, deliverables, status, isPublished, order } = req.body;

    if (!title || !client || !overview) {
      return res.status(400).json({ success: false, message: 'Title, Client and Overview are required.' });
    }

    const finalSlug = slug ? generateSlug(slug) : generateSlug(title);
    const existing = await CaseStudy.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(400).json({ success: false, message: `Slug "${finalSlug}" already exists.` });
    }

    const study = await CaseStudy.create({
      title: title.trim(),
      slug: finalSlug,
      client: client.trim(),
      category: category ? category.trim() : 'Digital Marketing',
      subtitle: subtitle ? subtitle.trim() : '',
      overview: overview.trim(),
      challenges: Array.isArray(challenges) ? challenges : [],
      strategy: Array.isArray(strategy) ? strategy : [],
      deliverables: Array.isArray(deliverables) ? deliverables : [],
      status: status || 'Active Engagement',
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      order: order !== undefined ? Number(order) : 0,
    });

    res.status(201).json({ success: true, message: 'Case study created.', data: study });
  } catch (error) {
    next(error);
  }
}

export async function updateCaseStudy(req, res, next) {
  try {
    const study = await CaseStudy.findById(req.params.id);
    if (!study) {
      return res.status(404).json({ success: false, message: 'Case study not found.' });
    }

    const { title, slug, client, category, subtitle, overview, challenges, strategy, deliverables, status, isPublished, order } = req.body;

    if (title) study.title = title.trim();
    if (slug) {
      const newSlug = generateSlug(slug);
      if (newSlug !== study.slug) {
        const existing = await CaseStudy.findOne({ slug: newSlug });
        if (existing) return res.status(400).json({ success: false, message: 'Slug already taken.' });
        study.slug = newSlug;
      }
    }
    if (client) study.client = client.trim();
    if (category) study.category = category.trim();
    if (subtitle !== undefined) study.subtitle = subtitle.trim();
    if (overview) study.overview = overview.trim();
    if (challenges !== undefined) study.challenges = Array.isArray(challenges) ? challenges : [];
    if (strategy !== undefined) study.strategy = Array.isArray(strategy) ? strategy : [];
    if (deliverables !== undefined) study.deliverables = Array.isArray(deliverables) ? deliverables : [];
    if (status !== undefined) study.status = status;
    if (isPublished !== undefined) study.isPublished = Boolean(isPublished);
    if (order !== undefined) study.order = Number(order);

    await study.save();
    res.status(200).json({ success: true, message: 'Case study updated.', data: study });
  } catch (error) {
    next(error);
  }
}

export async function deleteCaseStudy(req, res, next) {
  try {
    const study = await CaseStudy.findByIdAndDelete(req.params.id);
    if (!study) {
      return res.status(404).json({ success: false, message: 'Case study not found.' });
    }
    res.status(200).json({ success: true, message: 'Case study deleted.' });
  } catch (error) {
    next(error);
  }
}
