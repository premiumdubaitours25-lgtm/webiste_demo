import Stripe from 'stripe';

let stripeClient = null;

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

export function getAppUrl(req) {
  const forwardedHost = req?.headers?.['x-forwarded-host'];
  const host =
    (typeof forwardedHost === 'string' ? forwardedHost.split(',')[0].trim() : forwardedHost) ||
    req?.headers?.host;

  if (host && !host.includes('localhost') && !host.startsWith('127.0.0.1')) {
    const protoHeader = req?.headers?.['x-forwarded-proto'];
    const proto =
      typeof protoHeader === 'string' ? protoHeader.split(',')[0].trim() : 'https';
    return `${proto}://${host}`.replace(/\/$/, '');
  }

  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '');
  if (configuredUrl && !configuredUrl.includes('localhost')) {
    return configuredUrl;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (req?.headers?.origin) {
    return req.headers.origin;
  }

  return configuredUrl || 'http://localhost:3000';
}
