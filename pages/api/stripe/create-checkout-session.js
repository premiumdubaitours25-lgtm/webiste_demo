import connectDB from '../../../lib/mongodb';
import Booking from '../../../models/Booking';
import { getStripe, getAppUrl } from '../../../lib/stripe';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ success: false, error: 'Booking ID is required' });
    }

    const db = await connectDB();
    if (!db) {
      return res.status(503).json({ success: false, error: 'Database not connected' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    if (booking.paymentStatus === 'paid') {
      return res.status(400).json({ success: false, error: 'This booking is already paid' });
    }

    const stripe = getStripe();
    const appUrl = getAppUrl(req);
    const amountInFils = Math.round(booking.totalPrice * 100);

    if (!amountInFils || amountInFils < 1) {
      return res.status(400).json({ success: false, error: 'Invalid booking amount' });
    }

    const tierLabel = booking.pricingTierName ? ` (${booking.pricingTierName})` : '';
    const productName = `${booking.packageName}${tierLabel}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: booking.customerEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'aed',
            unit_amount: amountInFils,
            product_data: {
              name: productName,
              description: `Travel date: ${new Date(booking.travelDate).toLocaleDateString()} | Adults: ${booking.numberOfAdults}, Children: ${booking.numberOfChildren}`,
            },
          },
        },
      ],
      metadata: {
        bookingId: booking._id.toString(),
        packageName: booking.packageName,
        pricingTierName: booking.pricingTierName || '',
      },
      success_url: `${appUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/booking/cancel?booking_id=${booking._id.toString()}`,
    });

    booking.stripeSessionId = session.id;
    booking.updatedAt = Date.now();
    await booking.save();

    return res.status(200).json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url,
      },
    });
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to create checkout session',
    });
  }
}
