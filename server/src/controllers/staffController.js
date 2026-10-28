import Admin, { DEFAULT_PERMISSIONS } from '../models/Admin.js';

// @desc    Get all staff members
// @route   GET /api/staff
// @access  Private (Superadmin or staff permission)
export async function getAllStaff(req, res, next) {
  try {
    const { search, role, status } = req.query;
    const query = {};

    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ name: regex }, { email: regex }, { department: regex }];
    }

    if (role && role !== 'all') {
      query.role = role;
    }

    if (status && status !== 'all') {
      query.isActive = status === 'active';
    }

    const staffList = await Admin.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: staffList.length,
      data: staffList,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Get default role templates and permissions matrix
// @route   GET /api/staff/roles
// @access  Private
export async function getRoleTemplates(req, res) {
  res.status(200).json({
    success: true,
    data: {
      defaultPermissions: DEFAULT_PERMISSIONS,
      roles: [
        {
          key: 'sales',
          label: 'Sales Executive',
          description: 'Access to Leads CRM, Enquiries, Lead Analytics, and Customer Accounts.',
          badgeColor: 'blue',
          department: 'Sales & CRM',
        },
        {
          key: 'package_manager',
          label: 'Package & Pricing Manager',
          description: 'Handles Package catalogs, pricing models, and package analytics.',
          badgeColor: 'purple',
          department: 'Pricing & Packages',
        },
        {
          key: 'services_manager',
          label: 'Services & Tech Manager',
          description: 'Manages website services, portfolio projects, and case studies.',
          badgeColor: 'emerald',
          department: 'IT & Digital Services',
        },
        {
          key: 'marketing',
          label: 'Marketing Specialist',
          description: 'Oversees content reviews, testimonials, FAQs, and brand settings.',
          badgeColor: 'amber',
          department: 'Digital Marketing',
        },
        {
          key: 'superadmin',
          label: 'Superadmin (Full Control)',
          description: 'Unrestricted full access to all modules, settings, and staff accounts.',
          badgeColor: 'cyan',
          department: 'Executive Administration',
        },
        {
          key: 'custom',
          label: 'Custom Role',
          description: 'Tailored granular permissions configured manually by administrator.',
          badgeColor: 'slate',
          department: 'Custom Operations',
        },
      ],
    },
  });
}

// @desc    Create new staff member
// @route   POST /api/staff
// @access  Private (Superadmin or staff.create)
export async function createStaff(req, res, next) {
  try {
    const { name, email, password, role = 'sales', department, phone, permissions } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A staff member with this email address already exists.',
      });
    }

    // Determine permissions: use custom if provided, otherwise default for role
    const finalPermissions =
      permissions && typeof permissions === 'object'
        ? permissions
        : DEFAULT_PERMISSIONS[role] || DEFAULT_PERMISSIONS.sales;

    const newStaff = await Admin.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role,
      department: department?.trim() || 'General Operations',
      phone: phone?.trim() || '',
      permissions: finalPermissions,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: `Staff member ${newStaff.name} created successfully with role ${newStaff.role}.`,
      data: newStaff,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Update staff member
// @route   PUT /api/staff/:id
// @access  Private (Superadmin or staff.edit)
export async function updateStaff(req, res, next) {
  try {
    const { id } = req.params;
    const staff = await Admin.findById(id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found.',
      });
    }

    const { name, email, department, phone, role, permissions, isActive, password } = req.body;

    if (name !== undefined) staff.name = name.trim();
    if (email !== undefined) staff.email = email.toLowerCase().trim();
    if (department !== undefined) staff.department = department.trim();
    if (phone !== undefined) staff.phone = phone.trim();
    if (role !== undefined) staff.role = role;
    if (isActive !== undefined) staff.isActive = Boolean(isActive);

    if (permissions && typeof permissions === 'object') {
      staff.permissions = permissions;
    } else if (role && role !== staff.role) {
      staff.permissions = DEFAULT_PERMISSIONS[role] || staff.permissions;
    }

    if (password && password.trim().length >= 6) {
      staff.password = password.trim();
    }

    await staff.save();

    res.status(200).json({
      success: true,
      message: 'Staff member updated successfully.',
      data: staff,
    });
  } catch (error) {
    next(error);
  }
}

// @desc    Delete staff member
// @route   DELETE /api/staff/:id
// @access  Private (Superadmin or staff.delete)
export async function deleteStaff(req, res, next) {
  try {
    const { id } = req.params;

    // Safety: prevent deleting yourself
    if (req.admin && req.admin._id.toString() === id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own logged-in account.',
      });
    }

    const staff = await Admin.findById(id);
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found.',
      });
    }

    await Admin.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Staff member ${staff.name} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
}
