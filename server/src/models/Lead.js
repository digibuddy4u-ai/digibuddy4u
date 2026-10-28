import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Lead name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Lead email is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    businessName: {
      type: String,
      trim: true,
      default: '',
    },
    preferredPackage: {
      type: String,
      trim: true,
      default: '',
    },
    preferredPackageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
    },
    preferredContactMethod: {
      type: String,
      enum: ['email', 'phone', 'whatsapp'],
      default: 'whatsapp',
    },
    status: {
      type: String,
      enum: [
        'New',
        'Interested',
        'Contacted',
        'Qualified',
        'Proposal Sent',
        'Negotiation',
        'Won',
        'Lost',
        'Not Interested',
      ],
      default: 'New',
      index: true,
    },
    assignedTo: {
      type: String,
      trim: true,
      default: 'Unassigned',
    },
    followUpDate: {
      type: Date,
    },
    internalNotes: [
      {
        note: { type: String, required: true },
        author: { type: String, default: 'Admin' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    contactAttempts: [
      {
        date: { type: Date, default: Date.now },
        method: { type: String, default: 'phone' },
        notes: { type: String, default: '' },
        by: { type: String, default: 'Admin' },
      },
    ],
    lostReason: {
      type: String,
      trim: true,
      default: '',
    },
    visitorId: {
      type: String,
      trim: true,
      index: true,
    },
    source: {
      type: String,
      default: 'package_inquiry',
    },
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
    firstVisitDate: {
      type: Date,
      default: Date.now,
    },
    lastActivityDate: {
      type: Date,
      default: Date.now,
    },
    viewsCount: {
      type: Number,
      default: 1,
    },
    downloadsCount: {
      type: Number,
      default: 0,
    },
    enquiriesCount: {
      type: Number,
      default: 0,
    },
    latestEnquiryMessage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ email: 1, visitorId: 1 });

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
