import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true,
  },
  packageName: {
    type: String,
    required: true,
    trim: true,
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  travelDate: {
    type: Date,
    required: true,
  },
  numberOfAdults: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
  numberOfChildren: {
    type: Number,
    default: 0,
    min: 0,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  pricingTierName: {
    type: String,
    default: '',
    trim: true,
  },
  pricingTierPricePerPerson: {
    type: Number,
    default: 0,
    min: 0,
  },
  pricingTierDescription: {
    type: String,
    default: '',
    trim: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  recordType: {
    type: String,
    enum: ['booking', 'inquiry'],
    default: 'booking',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending',
  },
  stripeSessionId: {
    type: String,
    default: '',
    trim: true,
  },
  stripePaymentIntentId: {
    type: String,
    default: '',
    trim: true,
  },
  specialRequests: {
    type: String,
    default: '',
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

// Update the updatedAt field before saving
BookingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Clear the cached model if it exists
if (mongoose.models.Booking) {
  delete mongoose.models.Booking;
}

export default mongoose.model('Booking', BookingSchema);
