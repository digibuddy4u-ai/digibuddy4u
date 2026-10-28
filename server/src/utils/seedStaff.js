import mongoose from 'mongoose';
import Admin, { DEFAULT_PERMISSIONS } from '../models/Admin.js';
import { ENV } from '../config/env.js';

async function seedStaff() {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas.');

    const sampleStaff = [
      {
        name: 'Rohan Mehta (Sales Lead)',
        email: 'sales@digibuddy4u.com',
        password: 'Sales@123456',
        role: 'sales',
        department: 'Sales & Inbound CRM',
        phone: '+91 98250 11223',
        permissions: DEFAULT_PERMISSIONS.sales,
        isActive: true,
      },
      {
        name: 'Ananya Patel (Pricing Specialist)',
        email: 'package@digibuddy4u.com',
        password: 'Package@123456',
        role: 'package_manager',
        department: 'Packages & Commercial Pricing',
        phone: '+91 98250 33445',
        permissions: DEFAULT_PERMISSIONS.package_manager,
        isActive: true,
      },
      {
        name: 'Vikas Shah (Tech & Projects Lead)',
        email: 'services@digibuddy4u.com',
        password: 'Services@123456',
        role: 'services_manager',
        department: 'Website & IT Services',
        phone: '+91 98250 55667',
        permissions: DEFAULT_PERMISSIONS.services_manager,
        isActive: true,
      },
      {
        name: 'Pooja Joshi (Growth Marketer)',
        email: 'marketing@digibuddy4u.com',
        password: 'Marketing@123456',
        role: 'marketing',
        department: 'Content & Brand Marketing',
        phone: '+91 98250 77889',
        permissions: DEFAULT_PERMISSIONS.marketing,
        isActive: true,
      },
    ];

    for (const s of sampleStaff) {
      const existing = await Admin.findOne({ email: s.email });
      if (!existing) {
        await Admin.create(s);
        console.log(`✅ Created staff account: ${s.email} (${s.role})`);
      } else {
        existing.role = s.role;
        existing.permissions = s.permissions;
        existing.department = s.department;
        await existing.save();
        console.log(`🔄 Updated staff account: ${s.email} (${s.role})`);
      }
    }

    console.log('✨ Staff accounts seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed staff:', err.message);
    process.exit(1);
  }
}

seedStaff();
