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

const PackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
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
      'vietnam', 'sri-lanka', 'bali', 'malaysia', 'singapore',
      // Legacy destinations (keeping for backward compatibility)
      'bhutan', 'nepal'
    ],
  },
  images: [ImageSchema],
  itinerary: [ItineraryDaySchema],
  transportation: [TransportationSchema],
  accommodation: [AccommodationSchema],
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

PackageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Package || mongoose.model('Package', PackageSchema);
