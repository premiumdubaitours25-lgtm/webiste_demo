import connectDB from '../../../lib/mongodb';
import Testimonial from '../../../models/Testimonial';

export default async function handler(req, res) {
  // Ensure we always return JSON
  res.setHeader('Content-Type', 'application/json');

  try {
    // Check if model loaded
    if (!Testimonial) {
      return res.status(500).json({
        success: false,
        error: 'Testimonial model failed to load',
      });
    }

    // Connect to database first
    await connectDB();

    if (req.method === 'GET') {
      try {
        const testimonials = await Testimonial.find({ isActive: true })
          .sort({ createdAt: -1 })
          .lean();
        
        return res.status(200).json({
          success: true,
          data: testimonials,
        });
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        return res.status(500).json({
          success: false,
          error: error.message || 'Failed to fetch testimonials',
        });
      }
    }

    if (req.method === 'POST') {
      try {
        const { name, role, quote, rating, image } = req.body;

        // Validate required fields
        if (!name || !name.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Name is required',
          });
        }
        if (!role || !role.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Role is required',
          });
        }
        if (!quote || !quote.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Quote is required',
          });
        }

        // Validate rating
        const ratingValue = rating ? parseInt(rating) : 5;
        if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
          return res.status(400).json({
            success: false,
            error: 'Rating must be between 1 and 5',
          });
        }

        // Create testimonial
        const testimonial = await Testimonial.create({
          name: name.trim(),
          role: role.trim(),
          quote: quote.trim(),
          rating: ratingValue,
          image: image ? image.trim() : '',
          isActive: true,
        });

        return res.status(201).json({
          success: true,
          data: testimonial,
        });
      } catch (error) {
        console.error('Error creating testimonial:', error);
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
        return res.status(500).json({
          success: false,
          error: error.message || 'Failed to create testimonial',
        });
      }
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('API handler error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
