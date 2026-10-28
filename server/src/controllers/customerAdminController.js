import Customer from '../models/Customer.js';

// @desc    Get all customers for admin
// @route   GET /api/customer/admin/all
// @access  Private (Staff / Admin with customers permission)
export async function getAllCustomersForAdmin(req, res, next) {
  try {
    const { search, status } = req.query;
    const query = {};

    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { businessName: regex },
      ];
    }

    if (status && status !== 'all') {
      query.isActive = status === 'active';
    }

    const customers = await Customer.find(query)
      .populate('savedPackages', 'name slug priceDisplay badge monthlyPrice')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Admin manually creates a new customer account
// @route   POST /api/customer/admin/create
// @access  Private (Staff / Admin with customers.create permission)
export async function createCustomerByAdmin(req, res, next) {
  try {
    const { name, email, password, phone, businessName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required to create a customer account.',
      });
    }

    const existing = await Customer.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A customer account with this email address already exists.',
      });
    }

    const customer = await Customer.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone?.trim() || '',
      businessName: businessName?.trim() || '',
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: `Customer account for ${customer.name} created successfully.`,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Admin updates customer account
// @route   PUT /api/customer/admin/:id
// @access  Private (Staff / Admin with customers.edit permission)
export async function updateCustomerByAdmin(req, res, next) {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found.',
      });
    }

    const { name, email, phone, businessName, isActive, password } = req.body;

    if (name !== undefined) customer.name = name.trim();
    if (email !== undefined) customer.email = email.toLowerCase().trim();
    if (phone !== undefined) customer.phone = phone.trim();
    if (businessName !== undefined) customer.businessName = businessName.trim();
    if (isActive !== undefined) customer.isActive = Boolean(isActive);

    if (password && password.trim().length >= 6) {
      customer.password = password.trim();
    }

    await customer.save();

    res.status(200).json({
      success: true,
      message: 'Customer details updated successfully.',
      data: customer,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Admin deletes customer account
// @route   DELETE /api/customer/admin/:id
// @access  Private (Staff / Admin with customers.delete permission)
export async function deleteCustomerByAdmin(req, res, next) {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found.',
      });
    }

    await Customer.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Customer ${customer.name} has been deleted.`,
    });
  } catch (error) {
    next(error);
  }
}
