# Premium Dubai Tours - Next.js Application

A modern tour package management system built with Next.js, MongoDB, and Cloudinary.

## Features

- 🏔️ Tour package management
- 📸 Image upload with Cloudinary
- 🗄️ MongoDB database integration
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast performance with Next.js

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: MongoDB with Mongoose
- **File Storage**: Cloudinary
- **Deployment**: Vercel

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb+srv://toursjjtia_db_user:rLz2ZFHjsJoL13mi@cluster0.w7cd5cx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
CLOUDINARY_CLOUD_NAME=duh46icya
CLOUDINARY_API_KEY=323563858275155
CLOUDINARY_API_SECRET=TDgP1AOf2dYskJTPjdKC_4RRXOg
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file with your environment variables

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

- `GET /api/packages` - Get all packages
- `POST /api/packages` - Create a new package
- `GET /api/packages/[id]` - Get a specific package
- `PUT /api/packages/[id]` - Update a package
- `DELETE /api/packages/[id]` - Delete a package
- `POST /api/upload` - Upload images to Cloudinary

## Database Schema

### Package Model
```javascript
{
  title: String,
  subtitle: String,
  about: String,
  services: String,
  tourDetails: String,
  price: Number,
  duration: String,
  location: String,
  capacity: String,
  images: [{
    public_id: String,
    url: String,
    alt: String
  }],
  itinerary: [{
    day: Number,
    title: String,
    description: String
  }],
  bookings: Number,
  rating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Vercel

Add these in your Vercel project settings:
- `MONGODB_URI`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── dashboard/         # Dashboard page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── mongodb.js         # MongoDB connection
│   └── cloudinary.js      # Cloudinary configuration
├── models/                # Mongoose models
├── pages/                 # API routes
│   └── api/               # API endpoints
└── public/                # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.