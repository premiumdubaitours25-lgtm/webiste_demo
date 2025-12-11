import connectDB from '../../../lib/mongodb';
import Package from '../../../models/Package';
import { isConnected } from '../../../lib/mongodb';

// Demo data for when database is unavailable
const getDemoPackages = () => {
  return [
    {
      _id: 'demo-1',
      title: 'Dubai City Tour',
      subtitle: 'Explore the stunning city of Dubai',
      about: 'Experience the best of Dubai with our comprehensive city tour package. Visit iconic landmarks, enjoy luxury shopping, and witness the perfect blend of traditional and modern architecture.',
      services: 'Customized travel planning, Guided tours & local experiences, Group & family vacations, Luxury & adventure travel',
      tourDetails: 'Full-day city tour including visits to Burj Khalifa, Dubai Mall, Palm Jumeirah, and traditional souks.',
      price: 299,
      duration: '1 Day',
      location: 'Dubai, UAE',
      capacity: '2-10 persons',
      packageType: 'international',
      place: 'dubai',
      packageCategory: 'Cultural',
      images: [
        {
          public_id: 'demo-dubai-1',
          url: '/placeholder.svg',
          alt: 'Dubai Skyline'
        }
      ],
      itinerary: [
        {
          day: 1,
          title: 'City Exploration',
          description: 'Morning visit to Burj Khalifa, afternoon shopping at Dubai Mall, evening desert safari.'
        }
      ],
      transportation: [],
      accommodation: [],
      inclusions: ['Entrance fees', 'Transportation', 'Guide'],
      exclusions: ['Meals', 'Personal expenses'],
      reviews: [],
      bookings: 25,
      rating: 4.5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: 'demo-2',
      title: 'Abu Dhabi Cultural Experience',
      subtitle: 'Discover the capital city of UAE',
      about: 'Immerse yourself in the rich culture and heritage of Abu Dhabi. Visit the magnificent Sheikh Zayed Mosque, explore the Louvre Abu Dhabi, and experience traditional Emirati hospitality.',
      services: 'Cultural tours, Museum visits, Traditional experiences',
      tourDetails: 'Full-day cultural tour covering major landmarks and cultural sites.',
      price: 349,
      duration: '1 Day',
      location: 'Abu Dhabi, UAE',
      capacity: '2-15 persons',
      packageType: 'international',
      place: 'dubai',
      packageCategory: 'Cultural',
      images: [
        {
          public_id: 'demo-abu-dhabi-1',
          url: '/placeholder.svg',
          alt: 'Abu Dhabi Mosque'
        }
      ],
      itinerary: [
        {
          day: 1,
          title: 'Cultural Immersion',
          description: 'Visit Sheikh Zayed Mosque, Louvre Abu Dhabi, and traditional markets.'
        }
      ],
      transportation: [],
      accommodation: [],
      inclusions: ['Entrance fees', 'Transportation', 'Professional guide'],
      exclusions: ['Meals', 'Personal expenses'],
      reviews: [],
      bookings: 18,
      rating: 4.7,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: 'demo-3',
      title: 'Desert Safari Adventure',
      subtitle: 'Thrilling desert experience',
      about: 'Enjoy an unforgettable desert safari experience with dune bashing, camel rides, traditional entertainment, and a delicious BBQ dinner under the stars.',
      services: 'Adventure activities, Cultural shows, Dining experiences',
      tourDetails: 'Evening desert safari with multiple activities and traditional dinner.',
      price: 199,
      duration: '6 Hours',
      location: 'Dubai Desert, UAE',
      capacity: '1-20 persons',
      packageType: 'international',
      place: 'dubai',
      packageCategory: 'Adventure',
      images: [
        {
          public_id: 'demo-desert-1',
          url: '/placeholder.svg',
          alt: 'Desert Safari'
        }
      ],
      itinerary: [
        {
          day: 1,
          title: 'Desert Adventure',
          description: 'Dune bashing, camel rides, sandboarding, traditional shows, and BBQ dinner.'
        }
      ],
      transportation: [],
      accommodation: [],
      inclusions: ['All activities', 'BBQ dinner', 'Transportation', 'Entertainment'],
      exclusions: ['Alcohol', 'Personal expenses'],
      reviews: [],
      bookings: 42,
      rating: 4.8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
};

export default async function handler(req, res) {
  const dbConnection = await connectDB();
  const useDemoData = !dbConnection || !isConnected();

  if (req.method === 'GET') {
    try {
      if (useDemoData) {
        console.log('Using demo data for packages');
        let packages = getDemoPackages();
        
        // Apply search filter if provided
        const { search } = req.query;
        if (search) {
          const searchLower = search.toLowerCase();
          packages = packages.filter(pkg => 
            pkg.title.toLowerCase().includes(searchLower) ||
            pkg.subtitle.toLowerCase().includes(searchLower) ||
            pkg.location.toLowerCase().includes(searchLower) ||
            pkg.about.toLowerCase().includes(searchLower) ||
            pkg.tourDetails.toLowerCase().includes(searchLower)
          );
        }
        
        return res.status(200).json({ success: true, data: packages, demo: true });
      }

      const { search } = req.query;
      let query = {};
      
      // If search parameter is provided, create a search query
      if (search) {
        query = {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { subtitle: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } },
            { about: { $regex: search, $options: 'i' } },
            { tourDetails: { $regex: search, $options: 'i' } }
          ]
        };
      }
      
      const packages = await Package.find(query).sort({ createdAt: -1 });
      
      // If no packages found, return demo data
      if (packages.length === 0) {
        console.log('No packages found in database, using demo data');
        return res.status(200).json({ success: true, data: getDemoPackages(), demo: true });
      }
      
      res.status(200).json({ success: true, data: packages });
    } catch (error) {
      console.error('Error fetching packages, using demo data:', error.message);
      // Return demo data on error
      res.status(200).json({ success: true, data: getDemoPackages(), demo: true });
    }
  } else if (req.method === 'POST') {
    if (useDemoData) {
      return res.status(503).json({ 
        success: false, 
        error: 'Database not available. Cannot save package in demo mode.' 
      });
    }
    
    try {
      console.log('Received package data:', JSON.stringify(req.body, null, 2));
      const packageData = req.body;
      const newPackage = new Package(packageData);
      const savedPackage = await newPackage.save();
      console.log('Package saved successfully:', savedPackage._id);
      res.status(201).json({ success: true, data: savedPackage });
    } catch (error) {
      console.error('Error creating package:', error);
      res.status(500).json({ success: false, error: error.message, details: error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
