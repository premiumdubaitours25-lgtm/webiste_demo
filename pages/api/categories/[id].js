import connectDB from '../../../lib/mongodb';
import Category from '../../../models/Category';

const toSlug = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    await connectDB();
    const { id } = req.query;

    if (req.method === 'DELETE') {
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ success: false, error: 'Category not found' });
      }
      return res.status(200).json({ success: true, data: deletedCategory });
    }

    if (req.method === 'PUT') {
      const name = req.body?.name?.trim();
      if (!name) {
        return res.status(400).json({ success: false, error: 'Category name is required' });
      }

      const slug = toSlug(name);
      if (!slug) {
        return res.status(400).json({ success: false, error: 'Invalid category name' });
      }

      const existingWithSlug = await Category.findOne({ slug, _id: { $ne: id } }).lean();
      if (existingWithSlug) {
        return res.status(409).json({ success: false, error: 'Another category with this name already exists' });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, slug, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ success: false, error: 'Category not found' });
      }

      return res.status(200).json({ success: true, data: updatedCategory });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Category by id API error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
}
