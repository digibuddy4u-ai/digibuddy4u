import mongoose from 'mongoose';

const caseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Case study title is required'],
      trim: true,
      maxlength: [180, 'Title cannot exceed 180 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Case study slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    client: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    category: {
      type: String,
      default: 'Digital Marketing',
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: '',
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
    },
    challenges: {
      type: [String],
      default: [],
    },
    strategy: {
      type: [String],
      default: [],
    },
    deliverables: {
      type: [String],
      default: [],
    },
    verifiedNotice: {
      type: String,
      default: 'Metrics and formal review in progress. No artificial statistics.',
    },
    status: {
      type: String,
      default: 'Active Engagement',
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

caseStudySchema.index({ order: 1, createdAt: -1 });

const CaseStudy = mongoose.models.CaseStudy || mongoose.model('CaseStudy', caseStudySchema);
export default CaseStudy;
