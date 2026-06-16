import connectDB from '../../../lib/mongodb';
import Testimonial from '../../../models/Testimonial';

export default async function handler(req, res) {
  try {
    const db = await connectDB();
    if (!db) {
      return res.status(500).json({
        success: false,
        error: 'Database connection failed. Please check your MongoDB connection.',
      });
    }

    const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { name, role, quote, rating, image, isActive } = req.body;

      const testimonial = await Testimonial.findByIdAndUpdate(
        id,
        {
          name,
          role,
          quote,
          rating,
          image,
          isActive,
          updatedAt: Date.now(),
        },
        { new: true, runValidators: true }
      );

      if (!testimonial) {
        return res.status(404).json({
          success: false,
          error: 'Testimonial not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: testimonial,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const testimonial = await Testimonial.findByIdAndDelete(id);

      if (!testimonial) {
        return res.status(404).json({
          success: false,
          error: 'Testimonial not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('API handler error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
