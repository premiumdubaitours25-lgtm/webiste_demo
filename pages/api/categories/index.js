import connectDB from '../../../lib/mongodb';
import Category from '../../../models/Category';

const DEFAULT_PACKAGE_CATEGORIES = [
  'Regular Packages',
  'Premium Packages',
  'Luxury Packages',
  'Adventure Activities',
  'OMAN Tour',
  'Attraction and Activity',
];

const toSlug = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const seedDefaultCategoriesIfMissing = async () => {
  for (const name of DEFAULT_PACKAGE_CATEGORIES) {
    const slug = toSlug(name);

    const existing = await Category.findOne({
      $or: [{ name }, { slug }],
    })
      .select('_id isActive')
      .lean();

    if (!existing) {
      await Category.create({
        name,
        slug,
        isActive: true,
        pageConfig: {
          hero: { title: '', subtitle: '', backgroundImage: '' },
          sections: [],
        },
      });
    } else if (!existing.isActive) {
      await Category.findByIdAndUpdate(existing._id, { isActive: true, updatedAt: Date.now() });
    }
  }
};

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    await connectDB();

    if (req.method === 'GET') {
      await seedDefaultCategoriesIfMissing();
      const categories = await Category.find({ isActive: true }).lean();

      const orderMap = new Map(
        DEFAULT_PACKAGE_CATEGORIES.map((name, index) => [toSlug(name), index])
      );

      categories.sort((a, b) => {
        const indexA = orderMap.has(a.slug) ? orderMap.get(a.slug) : Number.MAX_SAFE_INTEGER;
        const indexB = orderMap.has(b.slug) ? orderMap.get(b.slug) : Number.MAX_SAFE_INTEGER;
        if (indexA !== indexB) return indexA - indexB;
        return a.name.localeCompare(b.name);
      });

      return res.status(200).json({ success: true, data: categories });
    }

    if (req.method === 'POST') {
      const name = req.body?.name?.trim();
      const pageConfig = req.body?.pageConfig || {};

      if (!name) {
        return res.status(400).json({ success: false, error: 'Category name is required' });
      }

      const slug = toSlug(name);
      if (!slug) {
        return res.status(400).json({ success: false, error: 'Invalid category name' });
      }

      const existingCategory = await Category.findOne({ slug }).lean();
      if (existingCategory) {
        return res.status(409).json({ success: false, error: 'Category already exists' });
      }

      const category = await Category.create({
        name,
        slug,
        isActive: true,
        pageConfig: {
          hero: {
            title: pageConfig?.hero?.title?.trim?.() || '',
            subtitle: pageConfig?.hero?.subtitle?.trim?.() || '',
            backgroundImage: pageConfig?.hero?.backgroundImage?.trim?.() || '',
          },
          sections: Array.isArray(pageConfig?.sections)
            ? pageConfig.sections.map((section) => ({
                badge: section?.badge?.trim?.() || '',
                title: section?.title?.trim?.() || '',
                subtitle: section?.subtitle?.trim?.() || '',
                layout: section?.layout === 'cards' ? 'cards' : 'simple',
                content: section?.content?.trim?.() || '',
                cards: Array.isArray(section?.cards)
                  ? section.cards.map((card) => ({
                      title: card?.title?.trim?.() || '',
                      description: card?.description?.trim?.() || '',
                      icon: card?.icon?.trim?.() || 'star',
                      iconImage: card?.iconImage?.trim?.() || '',
                    }))
                  : [],
              }))
            : [],
        },
      });
      return res.status(201).json({ success: true, data: category });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Categories API error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
}
