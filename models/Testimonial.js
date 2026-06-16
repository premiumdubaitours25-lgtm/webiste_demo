import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  quote: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5,
  },
  image: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
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
TestimonialSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Clear the cached model if it exists
if (mongoose.models.Testimonial) {
  delete mongoose.models.Testimonial;
}

export default mongoose.model('Testimonial', TestimonialSchema);
