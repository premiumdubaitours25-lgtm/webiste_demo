'use client'

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, User, Mail, Phone, Users, DollarSign, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Package {
  _id: string;
  title: string;
  price: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: Package | null;
  onBookingSuccess?: () => void;
}

export default function BookingModal({ isOpen, onClose, packageData, onBookingSuccess }: BookingModalProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    bookingDate: '',
    travelDate: '',
    numberOfAdults: 1,
    numberOfChildren: 0,
    specialRequests: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Calculate total price
  const calculateTotal = () => {
    if (!packageData) return 0;
    const adultPrice = packageData.price * formData.numberOfAdults;
    const childPrice = packageData.price * 0.7 * formData.numberOfChildren; // 70% for children
    return adultPrice + childPrice;
  };

  const totalPrice = calculateTotal();

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        bookingDate: new Date().toISOString().split('T')[0],
        travelDate: '',
        numberOfAdults: 1,
        numberOfChildren: 0,
        specialRequests: '',
      });
      setError('');
      setSuccess(false);
    } else {
      // Set booking date to today when modal opens
      setFormData(prev => ({
        ...prev,
        bookingDate: new Date().toISOString().split('T')[0],
      }));
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfAdults' || name === 'numberOfChildren' 
        ? parseInt(value) || 0 
        : value,
    }));
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      setError('Customer name is required');
      return false;
    }
    if (!formData.customerEmail.trim()) {
      setError('Customer email is required');
      return false;
    }
    if (!formData.customerEmail.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.customerPhone.trim()) {
      setError('Customer phone is required');
      return false;
    }
    if (!formData.travelDate) {
      setError('Travel date is required');
      return false;
    }
    if (formData.numberOfAdults < 1) {
      setError('At least one adult is required');
      return false;
    }
    if (!packageData) {
      setError('Package information is missing');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    if (!packageData) {
      setError('Package information is missing');
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        packageId: packageData._id,
        packageName: packageData.title,
        customerName: formData.customerName.trim(),
        customerEmail: formData.customerEmail.trim(),
        customerPhone: formData.customerPhone.trim(),
        bookingDate: formData.bookingDate,
        travelDate: formData.travelDate,
        numberOfAdults: formData.numberOfAdults,
        numberOfChildren: formData.numberOfChildren,
        amount: packageData.price,
        totalPrice: totalPrice,
        status: 'pending',
        paymentStatus: 'pending',
        specialRequests: formData.specialRequests.trim(),
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          if (onBookingSuccess) {
            onBookingSuccess();
          }
          onClose();
        }, 2000);
      } else {
        setError(data.error || 'Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('An error occurred while creating the booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!packageData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Book Your Package</DialogTitle>
          <DialogDescription>
            Fill in your details to complete the booking
          </DialogDescription>
        </DialogHeader>

        {/* Package Info Card */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">{packageData.title}</h3>
                <Badge variant="outline" className="mt-2">
                  Package ID: {packageData._id.slice(-8)}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Price per person</p>
                <p className="text-2xl font-bold text-primary">AED {packageData.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="customerName"
                    name="customerName"
                    type="text"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="customerPhone"
                    name="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="+971 XX XXX XXXX"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Booking Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bookingDate">Booking Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="bookingDate"
                    name="bookingDate"
                    type="date"
                    value={formData.bookingDate}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelDate">Travel Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="travelDate"
                    name="travelDate"
                    type="date"
                    value={formData.travelDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfAdults">Number of Adults *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="numberOfAdults"
                    name="numberOfAdults"
                    type="number"
                    min="1"
                    value={formData.numberOfAdults}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfChildren">Number of Children</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="numberOfChildren"
                    name="numberOfChildren"
                    type="number"
                    min="0"
                    value={formData.numberOfChildren}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests</Label>
            <Textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Any special requests or notes..."
              rows={3}
            />
          </div>

          {/* Price Summary */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Adults ({formData.numberOfAdults} × AED {packageData.price})</span>
                  <span>AED {packageData.price * formData.numberOfAdults}</span>
                </div>
                {formData.numberOfChildren > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Children ({formData.numberOfChildren} × AED {Math.round(packageData.price * 0.7)})</span>
                    <span>AED {Math.round(packageData.price * 0.7 * formData.numberOfChildren)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-primary">AED {totalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <X className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              <p className="font-semibold">Booking created successfully!</p>
              <p className="text-sm">Redirecting...</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading || success}
            >
              {loading ? 'Creating Booking...' : success ? 'Booking Created!' : 'Confirm Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
