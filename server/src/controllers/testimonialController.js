import Testimonial from '../models/Testimonial.js';

export async function getPublicTestimonials(req, res, next) {
  try {
    const list = await Testimonial.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
}

export async function getAdminTestimonials(req, res, next) {
  try {
    const list = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
}

export async function createTestimonial(req, res, next) {
  try {
    const { clientName, clientRole, clientCompany, content, rating, isVerified, isFeatured, isPublished, order } = req.body;

    if (!clientName || !content) {
      return res.status(400).json({ success: false, message: 'Client name and testimonial content are required.' });
    }

    const item = await Testimonial.create({
      clientName: clientName.trim(),
      clientRole: clientRole ? clientRole.trim() : '',
      clientCompany: clientCompany ? clientCompany.trim() : '',
      content: content.trim(),
      rating: rating !== undefined ? Number(rating) : 5,
      isVerified: isVerified !== undefined ? Boolean(isVerified) : true,
      isFeatured: Boolean(isFeatured),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      order: order !== undefined ? Number(order) : 0,
    });

    res.status(201).json({ success: true, message: 'Testimonial created.', data: item });
  } catch (error) {
    next(error);
  }
}

export async function updateTestimonial(req, res, next) {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }

    const { clientName, clientRole, clientCompany, content, rating, isVerified, isFeatured, isPublished, order } = req.body;

    if (clientName) item.clientName = clientName.trim();
    if (clientRole !== undefined) item.clientRole = clientRole.trim();
    if (clientCompany !== undefined) item.clientCompany = clientCompany.trim();
    if (content) item.content = content.trim();
    if (rating !== undefined) item.rating = Number(rating);
    if (isVerified !== undefined) item.isVerified = Boolean(isVerified);
    if (isFeatured !== undefined) item.isFeatured = Boolean(isFeatured);
    if (isPublished !== undefined) item.isPublished = Boolean(isPublished);
    if (order !== undefined) item.order = Number(order);

    await item.save();
    res.status(200).json({ success: true, message: 'Testimonial updated.', data: item });
  } catch (error) {
    next(error);
  }
}

export async function deleteTestimonial(req, res, next) {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }
    res.status(200).json({ success: true, message: 'Testimonial deleted.' });
  } catch (error) {
    next(error);
  }
}
