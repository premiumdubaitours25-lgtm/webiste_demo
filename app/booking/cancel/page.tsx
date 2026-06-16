'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

function BookingCancelContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams?.get('booking_id');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-lg w-full shadow-xl">
        <CardContent className="p-8 text-center">
          <XCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600 mb-6">
            Your payment was not completed. Your booking is still saved as pending.
            {bookingId ? ' You can try payment again from the package page.' : ''}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/packages">
              <Button>Back to Packages</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function BookingCancelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <BookingCancelContent />
    </Suspense>
  );
}
