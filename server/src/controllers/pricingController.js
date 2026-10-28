import Pricing from '../models/Pricing.js';

export async function getPublicPricing(req, res, next) {
  try {
    const packages = await Pricing.find({ isPublished: true }).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    next(error);
  }
}

export async function getAdminPricing(req, res, next) {
  try {
    const packages = await Pricing.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    next(error);
  }
}

export async function createPricing(req, res, next) {
  try {
    const { name, badge, description, monthlyPrice, isRecommended, features, ctaText, ctaLink, order, isPublished } = req.body;

    if (!name || !description) {
      return res.status(400).json({ success: false, message: 'Package name and description are required.' });
    }

    const pkg = await Pricing.create({
      name: name.trim(),
      badge: badge ? badge.trim() : '',
      description: description.trim(),
      monthlyPrice: monthlyPrice ? monthlyPrice.trim() : 'Custom Plan',
      isRecommended: Boolean(isRecommended),
      features: Array.isArray(features) ? features : [],
      ctaText: ctaText || 'Get Started',
      ctaLink: ctaLink || '/contact',
      order: order !== undefined ? Number(order) : 0,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    });

    res.status(201).json({ success: true, message: 'Pricing package created.', data: pkg });
  } catch (error) {
    next(error);
  }
}

export async function updatePricing(req, res, next) {
  try {
    const pkg = await Pricing.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found.' });
    }

    const { name, badge, description, monthlyPrice, isRecommended, features, ctaText, ctaLink, order, isPublished } = req.body;

    if (name) pkg.name = name.trim();
    if (badge !== undefined) pkg.badge = badge.trim();
    if (description) pkg.description = description.trim();
    if (monthlyPrice !== undefined) pkg.monthlyPrice = monthlyPrice.trim();
    if (isRecommended !== undefined) pkg.isRecommended = Boolean(isRecommended);
    if (features !== undefined) pkg.features = Array.isArray(features) ? features : [];
    if (ctaText !== undefined) pkg.ctaText = ctaText.trim();
    if (ctaLink !== undefined) pkg.ctaLink = ctaLink.trim();
    if (order !== undefined) pkg.order = Number(order);
    if (isPublished !== undefined) pkg.isPublished = Boolean(isPublished);

    await pkg.save();
    res.status(200).json({ success: true, message: 'Pricing package updated.', data: pkg });
  } catch (error) {
    next(error);
  }
}

export async function deletePricing(req, res, next) {
  try {
    const pkg = await Pricing.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found.' });
    }
    res.status(200).json({ success: true, message: 'Pricing package deleted.' });
  } catch (error) {
    next(error);
  }
}
