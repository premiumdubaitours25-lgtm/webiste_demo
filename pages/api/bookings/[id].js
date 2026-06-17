import connectDB from '../../../lib/mongodb';
import Booking from '../../../models/Booking';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    const db = await connectDB();
    if (!db) {
      return res.status(500).json({
        success: false,
        error: 'Database connection failed. Please check your MongoDB connection.',
      });
    }

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Booking ID is required',
      });
    }

    if (req.method === 'PUT') {
      try {
        const { status, paymentStatus } = req.body;

        const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
        const validPaymentStatuses = ['pending', 'paid', 'refunded'];

        if (status && !validStatuses.includes(status)) {
          return res.status(400).json({
            success: false,
            error: 'Invalid booking status',
          });
        }

        if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
          return res.status(400).json({
            success: false,
            error: 'Invalid payment status',
          });
        }

        const updateData = { updatedAt: new Date() };
        if (status) updateData.status = status;
        if (paymentStatus) updateData.paymentStatus = paymentStatus;

        const booking = await Booking.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        }).lean();

        if (!booking) {
          return res.status(404).json({
            success: false,
            error: 'Booking not found',
          });
        }

        return res.status(200).json({
          success: true,
          data: booking,
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
        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {
          return res.status(200).json({
            success: true,
            message: 'Booking already deleted',
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Booking deleted successfully',
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
