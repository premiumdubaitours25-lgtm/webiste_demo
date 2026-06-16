import mongoose from 'mongoose';

const ItineraryDaySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ImageSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
});

const TransportationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

const AccommodationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  hotel: {
    type: String,
    required: true,
  },
  rooms: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  nights: {
    type: String,
    required: true,
  },
});

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const InclusionExclusionItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  items: [{
    type: String,
    required: true,
  }],
}, { _id: false });

const PackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  ideaFor: {
    type: String,
    default: '',
  },
  about: {
    type: String,
    required: true,
  },
  services: {
    type: String,
    default: "Customized travel planning, Guided tours & local experiences, Group & family vacations, Luxury & adventure travel, Honeymoons & romantic getaways, Corporate & incentive travel",
  },
  tourDetails: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    default: '',
  },
  tourOverview: {
    type: String,
    default: '',
  },
  keyHighlights: [{
    type: String,
  }],
  hotelOptions: [{
    type: String,
  }],
  bestTimeToVisit: {
    yearRound: {
      type: String,
      default: '',
    },
    winter: {
      type: String,
      default: '',
    },
    summer: {
      type: String,
      default: '',
    },
  },
  whyChooseThisTrip: [{
    type: String,
  }],
  whyPremiumDubaiTours: [{
    type: String,
  }],
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  packageType: {
    type: String,
    required: true,
    enum: ['domestic', 'international'],
  },
  place: {
    type: String,
    required: true,
    enum: [
      // Domestic destinations
      'darjeeling', 'sikkim', 'meghalaya', 'arunachal', 'himachal-pradesh', 'kashmir', 'leh-ladakh',
      // International destinations
      'vietnam', 'sri-lanka', 'bali', 'malaysia', 'singapore', 'dubai', 'oman',
      // Legacy destinations (keeping for backward compatibility)
      'bhutan', 'nepal'
    ],
  },
  packageCategory: {
    type: String,
    required: true,
    enum: ['Regular', 'Premium', 'Luxury', 'Adventure', 'Oman Tour', 'Attraction and Activity', 'Deluxe', 'Cultural', 'Wildlife', 'Trekking', 'Spiritual', 'Beach', 'regular'],
    default: 'Regular',
  },
  images: [ImageSchema],
  itinerary: [ItineraryDaySchema],
  transportation: [TransportationSchema],
  accommodation: [AccommodationSchema],
  inclusions: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  exclusions: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  reviews: [ReviewSchema],
  bookings: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

PackageSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Clear cached model if it exists to ensure schema changes are picked up
if (mongoose.models.Package) {
  delete mongoose.models.Package;
}

export default mongoose.model('Package', PackageSchema);
