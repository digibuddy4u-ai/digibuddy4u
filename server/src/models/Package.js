import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Package name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    badge: {
      type: String,
      trim: true,
      default: '',
    },
    monthlyPrice: {
      type: Number,
      required: [true, 'Monthly price is required'],
      min: 0,
    },
    priceDisplay: {
      type: String,
      required: [true, 'Price display string is required'],
      default: '₹0/month',
    },
    alternativePriceWithoutAds: {
      type: Number,
      default: null,
    },
    alternativePriceDisplay: {
      type: String,
      default: '',
    },
    optionalMetaAdsCost: {
      type: Number,
      default: 0,
    },
    minimumCommitment: {
      type: String,
      default: 'Monthly',
      trim: true,
    },
    platforms: {
      type: [String],
      required: true,
      default: ['Instagram'],
    },
    reelsCount: {
      type: String,
      trim: true,
      default: '2–3 reels/month',
    },
    reelsDetails: {
      type: String,
      trim: true,
      default: '',
    },
    postsCount: {
      type: String,
      trim: true,
      default: '8 posts/month',
    },
    postsDetails: {
      type: String,
      trim: true,
      default: '',
    },
    storiesCount: {
      type: String,
      trim: true,
      default: '8 stories/month',
    },
    storiesDetails: {
      type: String,
      trim: true,
      default: '',
    },
    shootsCount: {
      type: String,
      trim: true,
      default: 'Not included',
    },
    shootsDetails: {
      type: String,
      trim: true,
      default: '',
    },
    influencerReels: {
      type: String,
      trim: true,
      default: 'Not included',
    },
    captionsAndHashtags: {
      type: String,
      trim: true,
      default: '',
    },
    contentCalendar: {
      type: String,
      trim: true,
      default: '',
    },
    postingAndScheduling: {
      type: String,
      trim: true,
      default: 'We schedule and post for you',
    },
    competitorCaseStudy: {
      type: String,
      trim: true,
      default: '',
    },
    metaAds: {
      type: String,
      trim: true,
      default: '',
    },
    metaAdsCampaignsCount: {
      type: Number,
      default: 0,
    },
    minSuggestedAdBudget: {
      type: String,
      trim: true,
      default: '',
    },
    commentsAndDMs: {
      type: String,
      trim: true,
      default: 'Not included',
    },
    revisions: {
      type: String,
      trim: true,
      default: '1 per item',
    },
    reporting: {
      type: String,
      trim: true,
      default: 'Basic monthly summary',
    },
    keyHighlights: {
      type: [String],
      default: [],
    },
    fullInclusions: {
      type: [String],
      default: [],
    },
    exclusions: {
      type: [String],
      default: [],
    },
    clientRequirements: {
      type: [String],
      default: [],
    },
    monthlyWorkflow: [
      {
        dayRange: { type: String, required: true },
        activity: { type: String, required: true },
      },
    ],
    generalTerms: {
      type: [String],
      default: [],
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
    showOnHome: {
      type: Boolean,
      default: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    requiresLoginForDetails: {
      type: Boolean,
      default: true,
    },
    requiresLoginForPdf: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

packageSchema.index({ slug: 1, isPublished: 1 });

const Package = mongoose.model('Package', packageSchema);
export default Package;
