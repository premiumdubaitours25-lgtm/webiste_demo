import multer from 'multer';
import cloudinary from '../../lib/cloudinary';

// Use memory storage instead of CloudinaryStorage
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    console.log('Upload API: Starting image upload process...');
    console.log('Upload API: Cloudinary config check:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set'
    });
    
    await new Promise((resolve, reject) => {
      upload.array('images', 5)(req, res, (err) => {
        if (err) {
          console.error('Upload API: Multer error:', err);
          reject(err);
        } else {
          console.log('Upload API: Multer processing completed');
          resolve();
        }
      });
    });

    const files = req.files;
    console.log('Upload API: Files received:', files ? files.length : 0);
    
    if (!files || files.length === 0) {
      console.log('Upload API: No files uploaded');
      return res.status(400).json({ success: false, error: 'No files uploaded' });
    }

    // Upload files to Cloudinary directly
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        console.log('Upload API: Processing file:', file.originalname);
        
        try {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: 'tia-tours/packages',
                resource_type: 'auto',
                transformation: [{ width: 800, height: 600, crop: 'limit' }]
              },
              (error, result) => {
                if (error) {
                  console.error('Cloudinary upload error:', error);
                  reject(error);
                } else {
                  console.log('Cloudinary upload success:', result);
                  resolve(result);
                }
              }
            );
            
            uploadStream.end(file.buffer);
          });
          
          console.log('Upload API: Cloudinary result:', result);
          
          return {
            public_id: result.public_id,
            url: result.secure_url,
            alt: file.originalname
          };
        } catch (error) {
          console.error('Upload API: Error uploading to Cloudinary:', error);
          throw error;
        }
      })
    );

    console.log('Upload API: Successfully uploaded images:', uploadedImages.length);
    res.status(200).json({ 
      success: true, 
      data: uploadedImages 
    });
  } catch (error) {
    console.error('Upload API: Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
