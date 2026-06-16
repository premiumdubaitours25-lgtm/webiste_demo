import connectDB from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

export default async function handler(req, res) {
  // Ensure we always return JSON
  res.setHeader('Content-Type', 'application/json');

  // Handle CORS if needed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Connect to database first
    let db;
    try {
      db = await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      // Return empty array instead of error
      return res.status(200).json({
        success: true,
        data: [],
        message: 'Database connection error. Please check your MongoDB connection.',
      });
    }
    
    // If database connection fails, return empty array instead of error
    if (!db) {
      console.warn('Database not connected, returning empty blogs array');
      return res.status(200).json({
        success: true,
        data: [],
        message: 'Database not connected. Please check your MongoDB connection.',
      });
    }

    if (req.method === 'GET') {
      try {
        // Check if Blog model is available
        if (!Blog) {
          console.error('Blog model is not available');
          return res.status(500).json({
            success: false,
            error: 'Blog model not available',
            data: [],
          });
        }

        // In development, also check for blogs without isPublished filter
        let blogs = await Blog.find({ isPublished: true })
          .sort({ publishDate: -1 })
          .lean();
        
        // If no published blogs found, try finding all blogs (for development)
        if (!blogs || blogs.length === 0) {
          blogs = await Blog.find({})
            .sort({ publishDate: -1 })
            .lean();
          console.log(`No published blogs found, checking all blogs: ${blogs ? blogs.length : 0} total blogs`);
        } else {
          console.log(`Found ${blogs.length} published blogs`);
        }
        
        return res.status(200).json({
          success: true,
          data: blogs || [],
        });
      } catch (error) {
        console.error('Error fetching blogs:', error);
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
        return res.status(500).json({
          success: false,
          error: error.message || 'Failed to fetch blogs',
          data: [],
        });
      }
    }

    if (req.method === 'POST') {
      try {
        const { title, excerpt, content, author, authorImage, readTime, category, image, tags } = req.body;

        // Validate required fields
        if (!title || !title.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Title is required',
          });
        }
        if (!excerpt || !excerpt.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Excerpt is required',
          });
        }
        if (!content || !content.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Content is required',
          });
        }
        if (!category || !category.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Category is required',
          });
        }
        if (!image || !image.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Image URL is required',
          });
        }

        // Create blog
        const blog = await Blog.create({
          title: title.trim(),
          excerpt: excerpt.trim(),
          content: content.trim(),
          author: author ? author.trim() : 'Premium Dubai Tours',
          authorImage: authorImage ? authorImage.trim() : '',
          readTime: readTime ? readTime.trim() : '5 min read',
          category: category.trim(),
          image: image.trim(),
          tags: Array.isArray(tags) ? tags : [],
          isPublished: true,
        });

        return res.status(201).json({
          success: true,
          data: blog,
        });
      } catch (error) {
        console.error('Error creating blog:', error);
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
        return res.status(500).json({
          success: false,
          error: error.message || 'Failed to create blog',
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
