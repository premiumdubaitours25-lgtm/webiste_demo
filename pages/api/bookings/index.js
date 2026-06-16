import connectDB from '../../../lib/mongodb';
import Booking from '../../../models/Booking';

export default async function handler(req, res) {
  // Ensure we always return JSON
  res.setHeader('Content-Type', 'application/json');

  try {
    // Connect to database first
    const db = await connectDB();
    
    // If database connection fails, return empty array instead of error
    if (!db) {
      console.warn('Database not connected, returning empty bookings array');
      return res.status(200).json({
        success: true,
        data: [],
        message: 'Database not connected. Please check your MongoDB connection.',
      });
    }

    if (req.method === 'GET') {
      try {
        // Check if Booking model is available
        if (!Booking) {
          console.error('Booking model is not available');
          return res.status(500).json({
            success: false,
            error: 'Booking model not available',
            data: [],
          });
        }

        const bookings = await Booking.find({})
          .sort({ createdAt: -1 })
          .lean();
        
        console.log(`Found ${bookings ? bookings.length : 0} bookings`);
        
        return res.status(200).json({
          success: true,
          data: bookings || [],
        });
      } catch (error) {
        console.error('Error fetching bookings:', error);
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
        return res.status(500).json({
          success: false,
          error: error.message || 'Failed to fetch bookings',
          data: [],
        });
      }
    }

    if (req.method === 'POST') {
      try {
        const { 
          packageId, 
          packageName, 
          customerName, 
          customerEmail, 
          customerPhone, 
          bookingDate, 
          travelDate, 
          numberOfAdults, 
          numberOfChildren, 
          amount, 
          totalPrice, 
          status, 
          paymentStatus, 
          specialRequests 
        } = req.body;

        // Validate required fields
        if (!packageId) {
          return res.status(400).json({
            success: false,
            error: 'Package ID is required',
          });
        }
        if (!packageName || !packageName.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Package name is required',
          });
        }
        if (!customerName || !customerName.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Customer name is required',
          });
        }
        if (!customerEmail || !customerEmail.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Customer email is required',
          });
        }
        if (!customerPhone || !customerPhone.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Customer phone is required',
          });
        }
        if (!bookingDate) {
          return res.status(400).json({
            success: false,
            error: 'Booking date is required',
          });
        }
        if (!travelDate) {
          return res.status(400).json({
            success: false,
            error: 'Travel date is required',
          });
        }
        if (!amount || amount < 0) {
          return res.status(400).json({
            success: false,
            error: 'Valid amount is required',
          });
        }
        if (!totalPrice || totalPrice < 0) {
          return res.status(400).json({
            success: false,
            error: 'Valid total price is required',
          });
        }

        // Create booking
        const booking = await Booking.create({
          packageId,
          packageName: packageName.trim(),
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          customerPhone: customerPhone.trim(),
          bookingDate: new Date(bookingDate),
          travelDate: new Date(travelDate),
          numberOfAdults: numberOfAdults || 1,
          numberOfChildren: numberOfChildren || 0,
          amount,
          totalPrice,
          status: status || 'pending',
          paymentStatus: paymentStatus || 'pending',
          specialRequests: specialRequests ? specialRequests.trim() : '',
        });

        return res.status(201).json({
          success: true,
          data: booking,
        });
      } catch (error) {
        console.error('Error creating booking:', error);
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
        return res.status(500).json({
          success: false,
          error: error.message || 'Failed to create booking',
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
