'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  User, Mail, Phone, Calendar, Users, DollarSign, Package, 
  FileText, Clock, CheckCircle, XCircle, CreditCard, X
} from 'lucide-react';

interface Booking {
  _id: string;
  packageId: string;
  packageName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string | Date;
  travelDate: string | Date;
  numberOfAdults: number;
  numberOfChildren: number;
  amount: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  specialRequests?: string;
  recordType?: 'booking' | 'inquiry';
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface ViewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export default function ViewBookingModal({ isOpen, onClose, booking }: ViewBookingModalProps) {
  if (!booking) return null;

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return 'N/A';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'N/A';
    }
  };

  const formatDateTime = (date: string | Date | undefined) => {
    if (!date) return 'N/A';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'N/A';
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      confirmed: 'default',
      cancelled: 'destructive',
      completed: 'default',
    };
    return (
      <Badge variant={variants[status] || 'outline'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      paid: 'default',
      refunded: 'destructive',
    };
    return (
      <Badge variant={variants[status] || 'outline'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6" />
            {booking.recordType === 'inquiry' ? 'Expert Inquiry Details' : 'Booking Details'}
          </DialogTitle>
          <DialogDescription>
            {booking.recordType === 'inquiry'
              ? 'Customer inquiry submitted via Enquiry'
              : 'Complete booking information and customer details'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Booking ID */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                  <p className="font-mono font-semibold text-lg">{booking._id}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {booking.recordType === 'inquiry' && (
                    <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800">
                      Expert Inquiry
                    </Badge>
                  )}
                  {getStatusBadge(booking.status)}
                  {getPaymentStatusBadge(booking.paymentStatus)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Package className="h-5 w-5" />
              Package Information
            </h3>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Package Name</p>
                  <p className="font-semibold">{booking.packageName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Package ID</p>
                  <p className="font-mono text-sm">{booking.packageId}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </h3>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Full Name
                    </p>
                    <p className="font-semibold">{booking.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email Address
                    </p>
                    <p className="font-semibold">{booking.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Phone Number
                    </p>
                    <p className="font-semibold">{booking.customerPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Booking Details
            </h3>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Booking Date
                    </p>
                    <p className="font-semibold">{formatDate(booking.bookingDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Travel Date
                    </p>
                    <p className="font-semibold">{formatDate(booking.travelDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Number of Adults
                    </p>
                    <p className="font-semibold">{booking.numberOfAdults}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Number of Children
                    </p>
                    <p className="font-semibold">{booking.numberOfChildren}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing Information
            </h3>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Price per Person</p>
                    <p className="font-semibold text-lg">AED {booking.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="font-semibold text-lg text-primary">AED {booking.totalPrice}</p>
                  </div>
                </div>
                <Separator />
                <div className="text-sm text-gray-600">
                  <p>Adults: {booking.numberOfAdults} × AED {booking.amount} = AED {booking.amount * booking.numberOfAdults}</p>
                  {booking.numberOfChildren > 0 && (
                    <p className="mt-1">Children: {booking.numberOfChildren} × AED {Math.round(booking.amount * 0.7)} = AED {Math.round(booking.amount * 0.7 * booking.numberOfChildren)}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && booking.specialRequests.trim() && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Special Requests
              </h3>
              <Card>
                <CardContent className="p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{booking.specialRequests}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Timestamps */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timestamps
            </h3>
            <Card>
              <CardContent className="p-4 space-y-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Created At</p>
                  <p className="font-semibold text-sm">{formatDateTime(booking.createdAt)}</p>
                </div>
                {booking.updatedAt && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                    <p className="font-semibold text-sm">{formatDateTime(booking.updatedAt)}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-4">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
