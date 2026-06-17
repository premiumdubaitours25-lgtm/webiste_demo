'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Booking {
  _id: string;
  packageName: string;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  recordType?: 'booking' | 'inquiry';
}

interface EditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedBooking: Booking) => void;
  booking: Booking | null;
}

export default function EditBookingModal({
  isOpen,
  onClose,
  onSuccess,
  booking,
}: EditBookingModalProps) {
  const [status, setStatus] = useState<Booking['status']>('pending');
  const [paymentStatus, setPaymentStatus] = useState<Booking['paymentStatus']>('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (booking) {
      setStatus(booking.status || 'pending');
      setPaymentStatus(booking.paymentStatus || 'pending');
      setError('');
    }
  }, [booking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/bookings/${booking._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, paymentStatus }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update booking');
      }

      onSuccess(data.data);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking');
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Booking Status</DialogTitle>
          <DialogDescription>
            Update status for <strong>{booking.customerName}</strong>
            {booking.recordType === 'inquiry' && (
              <Badge variant="outline" className="ml-2 border-amber-300 bg-amber-50 text-amber-800">
                Expert Inquiry
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg border bg-slate-50 p-3 text-sm">
            <p className="font-medium text-slate-900">{booking.packageName}</p>
            <p className="text-slate-600">{booking.customerEmail}</p>
          </div>

          <div className="space-y-2">
            <Label>Booking Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as Booking['status'])}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Payment Status</Label>
            <Select
              value={paymentStatus}
              onValueChange={(value) => setPaymentStatus(value as Booking['paymentStatus'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
