import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Package name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    badge: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    monthlyPrice: {
      type: String,
      required: [true, 'Price display is required'],
      trim: true,
      default: 'Custom Plan',
    },
    isRecommended: {
      type: Boolean,
      default: false,
      index: true,
    },
    features: {
      type: [String],
      required: true,
      default: [],
    },
    ctaText: {
      type: String,
      default: 'Get Started',
      trim: true,
    },
    ctaLink: {
      type: String,
      default: '/contact',
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

pricingSchema.index({ order: 1, createdAt: 1 });

const Pricing = mongoose.models.Pricing || mongoose.model('Pricing', pricingSchema);
export default Pricing;
