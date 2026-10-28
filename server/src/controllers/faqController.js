import FAQ from '../models/FAQ.js';

export async function getPublicFAQs(req, res, next) {
  try {
    const faqs = await FAQ.find({ isPublished: true }).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    next(error);
  }
}

export async function getAdminFAQs(req, res, next) {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    next(error);
  }
}

export async function createFAQ(req, res, next) {
  try {
    const { question, answer, category, order, isPublished } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ success: false, message: 'Question and answer are required.' });
    }

    const faq = await FAQ.create({
      question: question.trim(),
      answer: answer.trim(),
      category: category ? category.trim() : 'General',
      order: order !== undefined ? Number(order) : 0,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    });

    res.status(201).json({ success: true, message: 'FAQ created successfully.', data: faq });
  } catch (error) {
    next(error);
  }
}

export async function updateFAQ(req, res, next) {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found.' });
    }

    const { question, answer, category, order, isPublished } = req.body;

    if (question) faq.question = question.trim();
    if (answer) faq.answer = answer.trim();
    if (category) faq.category = category.trim();
    if (order !== undefined) faq.order = Number(order);
    if (isPublished !== undefined) faq.isPublished = Boolean(isPublished);

    await faq.save();
    res.status(200).json({ success: true, message: 'FAQ updated successfully.', data: faq });
  } catch (error) {
    next(error);
  }
}

export async function deleteFAQ(req, res, next) {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found.' });
    }
    res.status(200).json({ success: true, message: 'FAQ deleted successfully.' });
  } catch (error) {
    next(error);
  }
}
