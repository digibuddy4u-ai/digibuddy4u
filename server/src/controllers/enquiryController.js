import Enquiry from '../models/Enquiry.js';

// @desc    Submit public contact enquiry
// @route   POST /api/enquiries
// @access  Public
export async function createEnquiry(req, res, next) {
  try {
    const { name, email, phone, brandName, service, message } = req.body;

    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields (Name, Email, Phone, Service, Message).',
      });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      brandName: brandName ? brandName.trim() : '',
      service: service.trim(),
      message: message.trim(),
      ipAddress,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will get back to you shortly.',
      enquiryId: enquiry._id,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get all enquiries with filters & pagination
// @route   GET /api/enquiries
// @access  Private (Admin)
export async function getEnquiries(req, res, next) {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { brandName: searchRegex },
        { service: searchRegex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [enquiries, total] = await Promise.all([
      Enquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Enquiry.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: enquiries,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get single enquiry by ID
// @route   GET /api/enquiries/:id
// @access  Private (Admin)
export async function getEnquiryById(req, res, next) {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Update enquiry status or notes
// @route   PATCH /api/enquiries/:id
// @access  Private (Admin)
export async function updateEnquiry(req, res, next) {
  try {
    const { status, internalNotes } = req.body;

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    if (status) {
      const validStatuses = ['new', 'in-progress', 'contacted', 'closed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
        });
      }
      enquiry.status = status;
    }

    if (internalNotes !== undefined) {
      enquiry.internalNotes = internalNotes;
    }

    await enquiry.save();

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully.',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
export async function deleteEnquiry(req, res, next) {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
}
