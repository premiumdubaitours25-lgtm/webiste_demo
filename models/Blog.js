import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    default: 'Premium Dubai Tours',
  },
  authorImage: {
    type: String,
    default: '',
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  readTime: {
    type: String,
    default: '5 min read',
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  isPublished: {
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
BlogSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Clear the cached model if it exists
if (mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

export default mongoose.model('Blog', BlogSchema);
