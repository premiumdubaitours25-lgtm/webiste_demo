import connectDB from '../../../lib/mongodb';
import Booking from '../../../models/Booking';
import { getStripe } from '../../../lib/stripe';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { session_id: sessionId } = req.query;

    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ success: false, error: 'session_id is required' });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const bookingId = session.metadata?.bookingId;
    if (!bookingId) {
      return res.status(404).json({ success: false, error: 'Booking not found for this session' });
    }

    const db = await connectDB();
    if (!db) {
      return res.status(503).json({ success: false, error: 'Database not connected' });
    }

    let booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    if (session.payment_status === 'paid' && booking.paymentStatus !== 'paid') {
      booking.paymentStatus = 'paid';
      booking.status = 'confirmed';
      booking.stripeSessionId = session.id;
      booking.stripePaymentIntentId =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id || '';
      booking.updatedAt = Date.now();
      await booking.save();
    }

    booking = await Booking.findById(bookingId).lean();

    return res.status(200).json({
      success: true,
      data: {
        paymentStatus: session.payment_status,
        booking,
      },
    });
  } catch (error) {
    console.error('Stripe verify session error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to verify payment session',
    });
  }
}
