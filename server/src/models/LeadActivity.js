import mongoose from 'mongoose';

const leadActivitySchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: true,
      enum: [
        'package_card_view',
        'package_details_click',
        'login_prompt_shown',
        'signup_started',
        'signup_completed',
        'login_completed',
        'package_details_view',
        'package_saved',
        'package_unsaved',
        'package_pdf_download',
        'package_enquiry_started',
        'package_enquiry_submitted',
        'whatsapp_cta_clicked',
        'contact_cta_clicked',
      ],
      index: true,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      index: true,
    },
    packageSlug: {
      type: String,
      trim: true,
      index: true,
    },
    packageName: {
      type: String,
      trim: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      index: true,
    },
    customerEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    customerName: {
      type: String,
      trim: true,
    },
    visitorId: {
      type: String,
      trim: true,
      index: true,
    },
    referrer: {
      type: String,
      default: '',
    },
    landingPage: {
      type: String,
      default: '',
    },
    utmSource: {
      type: String,
      default: '',
    },
    utmMedium: {
      type: String,
      default: '',
    },
    utmCampaign: {
      type: String,
      default: '',
    },
    device: {
      type: String,
      enum: ['mobile', 'tablet', 'desktop', 'unknown'],
      default: 'desktop',
    },
    ipAddress: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

leadActivitySchema.index({ visitorId: 1, eventType: 1, createdAt: -1 });
leadActivitySchema.index({ customerId: 1, createdAt: -1 });
leadActivitySchema.index({ packageSlug: 1, eventType: 1 });

const LeadActivity = mongoose.model('LeadActivity', leadActivitySchema);
export default LeadActivity;
