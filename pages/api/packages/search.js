import connectDB from '../../../lib/mongodb';
import Package from '../../../models/Package';
import { isConnected } from '../../../lib/mongodb';

// Demo data helper for search
const getDemoPackages = () => {
  return [
    {
      _id: 'demo-1',
      title: 'Dubai City Tour',
      subtitle: 'Explore the stunning city of Dubai',
      location: 'Dubai, UAE',
      price: 299,
      duration: '1 Day',
      images: [{ public_id: 'demo-dubai-1', url: '/placeholder.svg', alt: 'Dubai Skyline' }],
      rating: 4.5
    },
    {
      _id: 'demo-2',
      title: 'Abu Dhabi Cultural Experience',
      subtitle: 'Discover the capital city of UAE',
      location: 'Abu Dhabi, UAE',
      price: 349,
      duration: '1 Day',
      images: [{ public_id: 'demo-abu-dhabi-1', url: '/placeholder.svg', alt: 'Abu Dhabi Mosque' }],
      rating: 4.7
    },
    {
      _id: 'demo-3',
      title: 'Desert Safari Adventure',
      subtitle: 'Thrilling desert experience',
      location: 'Dubai Desert, UAE',
      price: 199,
      duration: '6 Hours',
      images: [{ public_id: 'demo-desert-1', url: '/placeholder.svg', alt: 'Desert Safari' }],
      rating: 4.8
    }
  ];
};

export default async function handler(req, res) {
  const dbConnection = await connectDB();
  const useDemoData = !dbConnection || !isConnected();

  if (req.method === 'GET') {
    try {
      const { q, limit = 5 } = req.query;
      
      if (!q || q.trim() === '') {
        return res.status(200).json({ success: true, data: [] });
      }

      if (useDemoData) {
        console.log('Using demo data for search:', q);
        let packages = getDemoPackages();
        
        // Filter demo packages based on search query
        const searchLower = q.toLowerCase();
        packages = packages.filter(pkg => 
          pkg.title.toLowerCase().includes(searchLower) ||
          pkg.subtitle.toLowerCase().includes(searchLower) ||
          pkg.location.toLowerCase().includes(searchLower)
        ).slice(0, parseInt(limit));
        
        return res.status(200).json({ success: true, data: packages, demo: true });
      }

      const searchQuery = {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { subtitle: { $regex: q, $options: 'i' } },
          { location: { $regex: q, $options: 'i' } },
          { about: { $regex: q, $options: 'i' } },
          { tourDetails: { $regex: q, $options: 'i' } }
        ]
      };

      const packages = await Package.find(searchQuery)
        .select('title subtitle location price duration images rating')
        .limit(parseInt(limit))
        .sort({ rating: -1, createdAt: -1 });

      // If no results, return demo data
      if (packages.length === 0) {
        console.log('No search results found, using demo data');
        let demoPackages = getDemoPackages();
        const searchLower = q.toLowerCase();
        demoPackages = demoPackages.filter(pkg => 
          pkg.title.toLowerCase().includes(searchLower) ||
          pkg.subtitle.toLowerCase().includes(searchLower) ||
          pkg.location.toLowerCase().includes(searchLower)
        ).slice(0, parseInt(limit));
        return res.status(200).json({ success: true, data: demoPackages, demo: true });
      }

      res.status(200).json({ success: true, data: packages });
    } catch (error) {
      console.error('Error searching packages, using demo data:', error.message);
      // Return demo data on error
      const { q, limit = 5 } = req.query;
      if (!q || q.trim() === '') {
        return res.status(200).json({ success: true, data: [] });
      }
      let packages = getDemoPackages();
      const searchLower = q.toLowerCase();
      packages = packages.filter(pkg => 
        pkg.title.toLowerCase().includes(searchLower) ||
        pkg.subtitle.toLowerCase().includes(searchLower) ||
        pkg.location.toLowerCase().includes(searchLower)
      ).slice(0, parseInt(limit));
      res.status(200).json({ success: true, data: packages, demo: true });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
