import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const DEFAULT_PERMISSIONS = {
  superadmin: {
    leads: { view: true, create: true, edit: true, delete: true },
    enquiries: { view: true, create: true, edit: true, delete: true },
    packages: { view: true, create: true, edit: true, delete: true },
    packageAnalytics: { view: true },
    services: { view: true, create: true, edit: true, delete: true },
    portfolio: { view: true, create: true, edit: true, delete: true },
    caseStudies: { view: true, create: true, edit: true, delete: true },
    testimonials: { view: true, create: true, edit: true, delete: true },
    faqs: { view: true, create: true, edit: true, delete: true },
    customers: { view: true, create: true, edit: true, delete: true },
    settings: { view: true, edit: true },
    staff: { view: true, create: true, edit: true, delete: true },
  },
  admin: {
    leads: { view: true, create: true, edit: true, delete: true },
    enquiries: { view: true, create: true, edit: true, delete: true },
    packages: { view: true, create: true, edit: true, delete: true },
    packageAnalytics: { view: true },
    services: { view: true, create: true, edit: true, delete: true },
    portfolio: { view: true, create: true, edit: true, delete: true },
    caseStudies: { view: true, create: true, edit: true, delete: true },
    testimonials: { view: true, create: true, edit: true, delete: true },
    faqs: { view: true, create: true, edit: true, delete: true },
    customers: { view: true, create: true, edit: true, delete: true },
    settings: { view: true, edit: true },
    staff: { view: true, create: false, edit: false, delete: false },
  },
  sales: {
    leads: { view: true, create: true, edit: true, delete: false },
    enquiries: { view: true, create: true, edit: true, delete: false },
    packages: { view: true, create: false, edit: false, delete: false },
    packageAnalytics: { view: true },
    services: { view: false, create: false, edit: false, delete: false },
    portfolio: { view: false, create: false, edit: false, delete: false },
    caseStudies: { view: false, create: false, edit: false, delete: false },
    testimonials: { view: false, create: false, edit: false, delete: false },
    faqs: { view: false, create: false, edit: false, delete: false },
    customers: { view: true, create: true, edit: true, delete: false },
    settings: { view: false, edit: false },
    staff: { view: false, create: false, edit: false, delete: false },
  },
  package_manager: {
    leads: { view: false, create: false, edit: false, delete: false },
    enquiries: { view: true, create: false, edit: false, delete: false },
    packages: { view: true, create: true, edit: true, delete: true },
    packageAnalytics: { view: true },
    services: { view: false, create: false, edit: false, delete: false },
    portfolio: { view: false, create: false, edit: false, delete: false },
    caseStudies: { view: false, create: false, edit: false, delete: false },
    testimonials: { view: false, create: false, edit: false, delete: false },
    faqs: { view: false, create: false, edit: false, delete: false },
    customers: { view: false, create: false, edit: false, delete: false },
    settings: { view: false, edit: false },
    staff: { view: false, create: false, edit: false, delete: false },
  },
  services_manager: {
    leads: { view: false, create: false, edit: false, delete: false },
    enquiries: { view: false, create: false, edit: false, delete: false },
    packages: { view: false, create: false, edit: false, delete: false },
    packageAnalytics: { view: false },
    services: { view: true, create: true, edit: true, delete: true },
    portfolio: { view: true, create: true, edit: true, delete: true },
    caseStudies: { view: true, create: true, edit: true, delete: true },
    testimonials: { view: false, create: false, edit: false, delete: false },
    faqs: { view: false, create: false, edit: false, delete: false },
    customers: { view: false, create: false, edit: false, delete: false },
    settings: { view: false, edit: false },
    staff: { view: false, create: false, edit: false, delete: false },
  },
  marketing: {
    leads: { view: true, create: false, edit: true, delete: false },
    enquiries: { view: true, create: false, edit: true, delete: false },
    packages: { view: true, create: false, edit: false, delete: false },
    packageAnalytics: { view: true },
    services: { view: false, create: false, edit: false, delete: false },
    portfolio: { view: false, create: false, edit: false, delete: false },
    caseStudies: { view: false, create: false, edit: false, delete: false },
    testimonials: { view: true, create: true, edit: true, delete: true },
    faqs: { view: true, create: true, edit: true, delete: true },
    customers: { view: true, create: false, edit: false, delete: false },
    settings: { view: true, edit: true },
    staff: { view: false, create: false, edit: false, delete: false },
  },
  custom: {
    leads: { view: false, create: false, edit: false, delete: false },
    enquiries: { view: false, create: false, edit: false, delete: false },
    packages: { view: false, create: false, edit: false, delete: false },
    packageAnalytics: { view: false },
    services: { view: false, create: false, edit: false, delete: false },
    portfolio: { view: false, create: false, edit: false, delete: false },
    caseStudies: { view: false, create: false, edit: false, delete: false },
    testimonials: { view: false, create: false, edit: false, delete: false },
    faqs: { view: false, create: false, edit: false, delete: false },
    customers: { view: false, create: false, edit: false, delete: false },
    settings: { view: false, edit: false },
    staff: { view: false, create: false, edit: false, delete: false },
  },
};

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Admin email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    department: {
      type: String,
      trim: true,
      default: 'General Management',
    },
    role: {
      type: String,
      enum: [
        'superadmin',
        'admin',
        'sales',
        'package_manager',
        'services_manager',
        'marketing',
        'custom',
      ],
      default: 'sales',
    },
    permissions: {
      type: mongoose.Schema.Types.Mixed,
      default: function () {
        return DEFAULT_PERMISSIONS[this.role] || DEFAULT_PERMISSIONS.sales;
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exclude password in JSON output
adminSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
