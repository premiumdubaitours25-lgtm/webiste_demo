import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  pageConfig: {
    hero: {
      title: { type: String, default: '' },
      subtitle: { type: String, default: '' },
      backgroundImage: { type: String, default: '' },
    },
    sections: [
      {
        badge: { type: String, default: '' },
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        layout: { type: String, default: 'simple' },
        content: { type: String, default: '' },
        cards: [
          {
            title: { type: String, default: '' },
            description: { type: String, default: '' },
            icon: { type: String, default: 'star' },
            iconImage: { type: String, default: '' },
          },
        ],
      },
    ],
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

CategorySchema.pre('save', function saveHook(next) {
  this.updatedAt = Date.now();
  next();
});

if (mongoose.models.Category) {
  delete mongoose.models.Category;
}

export default mongoose.model('Category', CategorySchema);
