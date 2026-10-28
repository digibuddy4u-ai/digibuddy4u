import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
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
    tagline: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
    },
    overview: {
      type: String,
      required: [true, 'Project overview is required'],
      trim: true,
    },
    scope: {
      type: [String],
      default: [],
    },
    challenges: {
      type: [String],
      default: [],
    },
    strategy: {
      type: [String],
      default: [],
    },
    deliverablesDelivered: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      default: 'Active Client Engagement',
      trim: true,
    },
    isMetricsPending: {
      type: Boolean,
      default: true,
    },
    metricsNotice: {
      type: String,
      default: 'Authentic performance metrics and verified client testimonials will be published once the current campaign cycle completes client review. DigiBuddy4U strictly avoids fabricated statistics.',
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

portfolioSchema.index({ order: 1, createdAt: -1 });

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
