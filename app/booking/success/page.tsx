'use client'

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError('Missing payment session.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/stripe/verify-session?session_id=${encodeURIComponent(sessionId)}`);
        const result = await response.json();

        if (response.ok && result.success) {
          setBooking(result.data.booking);
        } else {
          setError(result.error || 'Could not verify payment.');
        }
      } catch (err) {
        console.error(err);
        setError('Could not verify payment. Please contact support.');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Verification Issue</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/contact">
              <Button>Contact Support</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-lg w-full shadow-xl">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful</h1>
          <p className="text-gray-600 mb-6">
            Thank you! Your booking has been confirmed.
          </p>

          {booking && (
            <div className="text-left bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
              <p><span className="font-medium">Package:</span> {booking.packageName}</p>
              {booking.pricingTierName && (
                <p><span className="font-medium">Tier:</span> {booking.pricingTierName}</p>
              )}
              <p><span className="font-medium">Total Paid:</span> AED {booking.totalPrice}</p>
              <p><span className="font-medium">Travel Date:</span> {new Date(booking.travelDate).toLocaleDateString()}</p>
              <p><span className="font-medium">Email:</span> {booking.customerEmail}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/packages">
              <Button variant="outline">Browse Packages</Button>
            </Link>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
}
