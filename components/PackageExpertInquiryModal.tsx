'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, User, Calendar, MessageCircle } from 'lucide-react';

interface PackageExpertInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: {
    _id: string;
    title: string;
    price: number;
  } | null;
  tierName?: string;
  tierPrice?: number;
  initialTravelDate?: string;
  initialAdults?: number;
  initialChildren?: number;
}

export default function PackageExpertInquiryModal({
  isOpen,
  onClose,
  packageData,
  tierName,
  tierPrice,
  initialTravelDate = '',
  initialAdults = 1,
  initialChildren = 0,
}: PackageExpertInquiryModalProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    travelDate: '',
    numberOfAdults: 1,
    numberOfChildren: 0,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      travelDate: initialTravelDate,
      numberOfAdults: initialAdults || 1,
      numberOfChildren: initialChildren || 0,
      message: '',
    });
    setError('');
    setSuccess(false);
  }, [isOpen, initialTravelDate, initialAdults, initialChildren]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'numberOfAdults' || name === 'numberOfChildren'
          ? parseInt(value, 10) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageData) return;

    setError('');
    setLoading(true);

    try {
      const pricePerPerson = tierPrice && tierPrice > 0 ? tierPrice : packageData.price;
      const adults = Math.max(1, formData.numberOfAdults);
      const children = Math.max(0, formData.numberOfChildren);
      const childPrice = pricePerPerson * 0.7 * children;
      const totalPrice = pricePerPerson * adults + childPrice;

      const inquiryNotes = [
        formData.message.trim(),
        tierName ? `Selected tier: ${tierName}` : '',
        'Submitted via Enquiry',
      ]
        .filter(Boolean)
        .join('\n');

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: packageData._id,
          packageName: packageData.title,
          customerName: formData.customerName.trim(),
          customerEmail: formData.customerEmail.trim(),
          customerPhone: formData.customerPhone.trim(),
          bookingDate: new Date().toISOString().split('T')[0],
          travelDate: formData.travelDate,
          numberOfAdults: adults,
          numberOfChildren: children,
          amount: pricePerPerson,
          totalPrice,
          pricingTierName: tierName || '',
          pricingTierPricePerPerson: pricePerPerson,
          status: 'pending',
          paymentStatus: 'pending',
          recordType: 'inquiry',
          specialRequests: inquiryNotes,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  if (!packageData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Enquiry</DialogTitle>
          <DialogDescription>
            Send an inquiry for <strong>{packageData.title}</strong>
            {tierName ? ` (${tierName})` : ''}. Our team will contact you shortly.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center text-green-800">
            <MessageCircle className="mx-auto mb-3 h-10 w-10" />
            <p className="font-semibold">Inquiry submitted successfully!</p>
            <p className="mt-1 text-sm">We will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="customerName">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="pl-9"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="customerEmail">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  required
                  className="pl-9"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="customerPhone">Phone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="customerPhone"
                  name="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                  className="pl-9"
                  placeholder="+971 50 000 0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="travelDate">Travel Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="travelDate"
                    name="travelDate"
                    type="date"
                    value={formData.travelDate}
                    onChange={handleChange}
                    required
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Guests *</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="numberOfAdults"
                    type="number"
                    min="1"
                    value={formData.numberOfAdults}
                    onChange={handleChange}
                    placeholder="Adults"
                  />
                  <Input
                    name="numberOfChildren"
                    type="number"
                    min="0"
                    value={formData.numberOfChildren}
                    onChange={handleChange}
                    placeholder="Kids"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your trip plans or questions..."
              />
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
                {loading ? 'Submitting...' : 'Submit Inquiry'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
