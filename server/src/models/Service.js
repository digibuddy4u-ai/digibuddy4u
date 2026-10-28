import mongoose from 'mongoose';

const subServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Sub-service name is required'],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      default: '',
    },
    detailedDescription: {
      type: String,
      trim: true,
      default: '',
    },
    icon: {
      type: String,
      default: 'CheckCircle2',
      trim: true,
    },
    deliverables: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const processStepSchema = new mongoose.Schema(
  {
    stepNumber: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const serviceFaqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: [140, 'Title cannot exceed 140 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Service slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceCategory',
      index: true,
    },
    categorySlug: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'digital-marketing',
      index: true,
    },
    categoryName: {
      type: String,
      trim: true,
      default: 'Digital Marketing',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [400, 'Short description cannot exceed 400 characters'],
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required'],
      trim: true,
    },
    icon: {
      type: String,
      default: 'Share2',
      trim: true,
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    subServices: {
      type: [subServiceSchema],
      default: [],
    },
    problemsSolved: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    useCases: {
      type: [String],
      default: [],
    },
    processSteps: {
      type: [processStepSchema],
      default: [],
    },
    targetIndustries: {
      type: [String],
      default: [],
    },
    deliverables: {
      type: [String],
      default: [],
    },
    highlight: {
      type: String,
      trim: true,
      default: '',
    },
    relatedServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
    faqs: {
      type: [serviceFaqSchema],
      default: [],
    },
    seo: {
      title: {
        type: String,
        trim: true,
        default: '',
      },
      metaDescription: {
        type: String,
        trim: true,
        default: '',
      },
      keywords: {
        type: [String],
        default: [],
      },
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: true,
      index: true,
    },
    showOnHome: {
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

serviceSchema.index({ categorySlug: 1, order: 1, createdAt: 1 });
serviceSchema.index({ status: 1, order: 1 });

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export default Service;
