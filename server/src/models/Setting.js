import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: 'DigiBuddy4U',
      trim: true,
    },
    tagline: {
      type: String,
      default: 'Your Digital Growth Partner',
      trim: true,
    },
    email: {
      type: String,
      default: 'info@digibuddy4u.com',
      trim: true,
    },
    phone: {
      type: String,
      default: '+91 63524 78028',
      trim: true,
    },
    whatsappNumber: {
      type: String,
      default: '+91 63524 78028',
      trim: true,
    },
    whatsappUrl: {
      type: String,
      default: 'https://wa.me/916352478028?text=Hi%20DigiBuddy4U%2C%20I%20would%20like%20to%20discuss%20growing%20my%20brand%20online.',
      trim: true,
    },
    address: {
      type: String,
      default: 'India',
      trim: true,
    },
    socials: {
      instagram: {
        type: String,
        default: 'https://instagram.com/digibuddy4u',
      },
      linkedin: {
        type: String,
        default: 'https://linkedin.com/company/digibuddy4u',
      },
      facebook: {
        type: String,
        default: 'https://facebook.com/digibuddy4u',
      },
      whatsapp: {
        type: String,
        default: 'https://wa.me/916352478028',
      },
    },
    footerBio: {
      type: String,
      default: 'DigiBuddy4U is your dedicated digital growth partner. We empower modern brands through data-backed social media management, scroll-stopping content creation, viral-ready video reels, and ROI-focused digital marketing.',
    },
    servicesSettings: {
      showMainServicesSection: {
        type: Boolean,
        default: true,
      },
      homepageDisplayMode: {
        type: String,
        enum: ['services_grid', 'category_cards'],
        default: 'services_grid',
      },
      maxHomeServices: {
        type: Number,
        default: 14,
      },
      defaultCategoryTab: {
        type: String,
        default: 'all',
      },
      initialCardsCount: {
        type: Number,
        default: 2,
      },
      showMoreButtonLabel: {
        type: String,
        default: 'Show More Services',
      },
      showLessButtonLabel: {
        type: String,
        default: 'Show Less',
      },
      initialCategories: {
        type: [String],
        default: ['digital-marketing', 'it-services'],
      },
    },
    showFaqs: {
      type: Boolean,
      default: true,
    },
    faqSettings: {
      showOnHome: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);
export default Setting;
