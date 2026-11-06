import mongoose from 'mongoose';

const addOnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Add-on title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      default: 'General Add-On',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    priceDisplay: {
      type: String,
      required: [true, 'Price display string is required'],
      default: 'Custom Quote',
      trim: true,
    },
    startingPrice: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      trim: true,
      default: 'Add-On',
    },
    iconName: {
      type: String,
      default: 'Sparkles',
      trim: true,
    },
    deliverables: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 1,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    showOnHome: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
addOnSchema.index({ slug: 1, isPublished: 1 });
addOnSchema.index({ order: 1, createdAt: -1 });

const AddOn = mongoose.models.AddOn || mongoose.model('AddOn', addOnSchema);

export default AddOn;
