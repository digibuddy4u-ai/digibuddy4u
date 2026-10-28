import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';
import Package from '../models/Package.js';
import LeadActivity from '../models/LeadActivity.js';
import Lead from '../models/Lead.js';
import Enquiry from '../models/Enquiry.js';
import { ENV } from '../config/env.js';

function generateToken(id) {
  return jwt.sign({ id, type: 'customer' }, ENV.JWT_SECRET, {
    expiresIn: '30d',
  });
}

/**
 * Register Customer Account
 */
export async function registerCustomer(req, res) {
  try {
    const { name, email, phone, businessName, password, visitorId, targetPackageSlug } = req.body;

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

    const existing = await Customer.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists. Please log in.',
      });
    }

    const customer = await Customer.create({
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      businessName: businessName || '',
      password,
      anonymousVisitorIds: visitorId ? [visitorId] : [],
      lastLogin: new Date(),
    });

    const token = generateToken(customer._id);

    // Link past anonymous visitor events to this customer
    if (visitorId) {
      try {
        await LeadActivity.updateMany(
          { visitorId, customerId: { $exists: false } },
          {
            $set: {
              customerId: customer._id,
              customerEmail: customer.email,
              customerName: customer.name,
              isLoggedIn: true,
            },
          }
        );
      } catch (err) {
        // Non-blocking
      }
    }

    // Record signup event
    try {
      await LeadActivity.create({
        eventType: 'signup_completed',
        customerId: customer._id,
        customerEmail: customer.email,
        customerName: customer.name,
        visitorId: visitorId || 'registered',
        isLoggedIn: true,
        metadata: { targetPackageSlug },
      });
    } catch (err) {
      // Non-blocking
    }

    // Upsert or create CRM Lead entry
    try {
      let lead = await Lead.findOne({ email: customer.email });
      if (!lead) {
        lead = await Lead.create({
          customer: customer._id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          businessName: customer.businessName,
          status: 'New',
          visitorId: visitorId || '',
          source: 'customer_registration',
          firstVisitDate: new Date(),
          lastActivityDate: new Date(),
        });
      } else {
        lead.customer = customer._id;
        lead.name = customer.name;
        if (customer.phone) lead.phone = customer.phone;
        lead.lastActivityDate = new Date();
        await lead.save();
      }
    } catch (err) {
      // Non-blocking
    }

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      data: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        businessName: customer.businessName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed.',
    });
  }
}

/**
 * Login Customer Account
 */
export async function loginCustomer(req, res) {
  try {
    const { email, password, visitorId, targetPackageSlug } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const customer = await Customer.findOne({ email: email.toLowerCase() }).select('+password +isActive');
    if (!customer) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. No customer account found with this email.',
      });
    }

    if (!customer.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account is deactivated. Please contact support at info@digibuddy4u.com.',
      });
    }

    const isMatch = await customer.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Incorrect password.',
      });
    }

    // Update visitor IDs and last login
    if (visitorId && !customer.anonymousVisitorIds.includes(visitorId)) {
      customer.anonymousVisitorIds.push(visitorId);
    }
    customer.lastLogin = new Date();
    await customer.save();

    // Link past visitor events
    if (visitorId) {
      try {
        await LeadActivity.updateMany(
          { visitorId, customerId: { $exists: false } },
          {
            $set: {
              customerId: customer._id,
              customerEmail: customer.email,
              customerName: customer.name,
              isLoggedIn: true,
            },
          }
        );
      } catch (err) {
        // Non-blocking
      }
    }

    // Record login event
    try {
      await LeadActivity.create({
        eventType: 'login_completed',
        customerId: customer._id,
        customerEmail: customer.email,
        customerName: customer.name,
        visitorId: visitorId || 'logged_in',
        isLoggedIn: true,
        metadata: { targetPackageSlug },
      });
    } catch (err) {
      // Non-blocking
    }

    // Update CRM Lead lastActivityDate
    try {
      await Lead.findOneAndUpdate(
        { email: customer.email },
        { lastActivityDate: new Date(), customer: customer._id },
        { upsert: false }
      );
    } catch (err) {
      // Non-blocking
    }

    const token = generateToken(customer._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      data: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        businessName: customer.businessName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Login failed.',
    });
  }
}

/**
 * Get Customer Profile & Dashboard Data
 */
export async function getCustomerProfile(req, res) {
  try {
    const customer = await Customer.findById(req.customer._id)
      .populate('savedPackages', 'name slug monthlyPrice priceDisplay badge platforms keyHighlights minimumCommitment');

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found.',
      });
    }

    // Find any enquiries submitted with this email
    const enquiries = await Enquiry.find({ email: customer.email })
      .sort({ createdAt: -1 })
      .select('service brandName message status createdAt');

    res.status(200).json({
      success: true,
      data: {
        ...customer.toJSON(),
        savedPackages: customer.savedPackages || [],
        downloadedPdfs: customer.downloadedPdfs || [],
        enquiries: enquiries || [],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve customer dashboard.',
      error: error.message,
    });
  }
}

/**
 * Toggle Save / Shortlist Package
 */
export async function toggleSavePackage(req, res) {
  try {
    const { slug } = req.params;
    const pkg = await Package.findOne({ slug });

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: 'Package not found.',
      });
    }

    const customer = await Customer.findById(req.customer._id);
    const isSaved = customer.savedPackages.some(
      (pId) => pId.toString() === pkg._id.toString()
    );

    let action = 'saved';
    if (isSaved) {
      customer.savedPackages = customer.savedPackages.filter(
        (pId) => pId.toString() !== pkg._id.toString()
      );
      action = 'unsaved';
    } else {
      customer.savedPackages.push(pkg._id);
      action = 'saved';
    }

    await customer.save();

    // Record activity
    try {
      await LeadActivity.create({
        eventType: action === 'saved' ? 'package_saved' : 'package_unsaved',
        packageId: pkg._id,
        packageSlug: pkg.slug,
        packageName: pkg.name,
        customerId: customer._id,
        customerEmail: customer.email,
        customerName: customer.name,
        isLoggedIn: true,
      });
    } catch (err) {
      // Non-blocking
    }

    res.status(200).json({
      success: true,
      action,
      isSaved: action === 'saved',
      message: action === 'saved' ? `Added ${pkg.name} to your saved packages.` : `Removed ${pkg.name} from saved packages.`,
      savedPackages: customer.savedPackages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * Forgot Password Instructions
 */
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide your email address.' });
    }

    const customer = await Customer.findOne({ email: email.toLowerCase() });
    if (!customer) {
      // Return ambiguous message for privacy
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, password reset instructions have been dispatched. Contact info@digibuddy4u.com for direct assistance.',
      });
    }

    // Set simple reset token for support verification
    customer.resetPasswordToken = Math.random().toString(36).substring(2, 10).toUpperCase();
    customer.resetPasswordExpire = new Date(Date.now() + 3600000); // 1 hour
    await customer.save();

    res.status(200).json({
      success: true,
      message: 'Password reset request received. For instant verification, you can contact our support team on WhatsApp (+91 63524 78028) or email.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
