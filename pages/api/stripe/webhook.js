import connectDB from '../../../lib/mongodb';
import Booking from '../../../models/Booking';
import { getStripe } from '../../../lib/stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

async function markBookingPaid(bookingId, paymentIntentId, sessionId) {
  const db = await connectDB();
  if (!db || !bookingId) return;

  await Booking.findByIdAndUpdate(
    bookingId,
    {
      paymentStatus: 'paid',
      status: 'confirmed',
      stripeSessionId: sessionId || '',
      stripePaymentIntentId: paymentIntentId || '',
      updatedAt: Date.now(),
    },
    { new: true }
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.warn('STRIPE_WEBHOOK_SECRET is not set. Webhook ignored.');
    return res.status(200).json({ received: true, skipped: true });
  }

  try {
    const stripe = getStripe();
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      console.error('Stripe webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;

      if (session.payment_status === 'paid' && bookingId) {
        await markBookingPaid(
          bookingId,
          typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
          session.id
        );
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Stripe webhook handler error:', error);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
}
