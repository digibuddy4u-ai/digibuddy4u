import mongoose from 'mongoose';

const serviceCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      maxlength: [100, 'Category name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Category description is required'],
      trim: true,
      maxlength: [300, 'Category description cannot exceed 300 characters'],
    },
    icon: {
      type: String,
      default: 'Layers',
      trim: true,
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

serviceCategorySchema.index({ displayOrder: 1, createdAt: 1 });

const ServiceCategory =
  mongoose.models.ServiceCategory || mongoose.model('ServiceCategory', serviceCategorySchema);

export default ServiceCategory;
