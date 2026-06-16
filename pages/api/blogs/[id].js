import connectDB from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

export default async function handler(req, res) {
  // Ensure we always return JSON
  res.setHeader('Content-Type', 'application/json');

  try {
    const db = await connectDB();
    if (!db) {
      return res.status(500).json({
        success: false,
        error: 'Database connection failed. Please check your MongoDB connection settings.',
      });
    }

    const { id } = req.query;

    if (req.method === 'GET') {
      try {
        const blog = await Blog.findById(id);
        
        if (!blog) {
          return res.status(404).json({
            success: false,
            error: 'Blog not found',
          });
        }

        return res.status(200).json({
          success: true,
          data: blog,
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
        return res.status(500).json({
          success: false,
          error: error.message || 'Failed to fetch blog',
        });
      }
    }

    if (req.method === 'PUT') {
      try {
        const { title, excerpt, content, author, authorImage, readTime, category, image, tags, isPublished } = req.body;

        const blog = await Blog.findByIdAndUpdate(
          id,
          {
            title,
            excerpt,
            content,
            author,
            authorImage,
            readTime,
            category,
            image,
            tags,
            isPublished,
            updatedAt: Date.now(),
          },
          { new: true, runValidators: true }
        );

        if (!blog) {
          return res.status(404).json({
            success: false,
            error: 'Blog not found',
          });
        }

        return res.status(200).json({
          success: true,
          data: blog,
        });
      } catch (error) {
        console.error('Error updating blog:', error);
        return res.status(500).json({
          success: false,
          error: error.message || 'Failed to update blog',
        });
      }
    }

    if (req.method === 'DELETE') {
      try {
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
          return res.status(404).json({
            success: false,
            error: 'Blog not found',
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Blog deleted successfully',
        });
      } catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).json({
          success: false,
          error: error.message || 'Failed to delete blog',
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
