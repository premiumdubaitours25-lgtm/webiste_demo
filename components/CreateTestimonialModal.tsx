'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import ImageUrlOrUpload, { uploadImageToCloudinary } from '@/components/ImageUrlOrUpload';

interface CreateTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateTestimonialModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateTestimonialModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
    rating: 5,
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      // Get response text first to handle both JSON and HTML errors
      const responseText = await response.text();
      
      // Check if response is ok
      if (!response.ok) {
        let errorMessage = 'Failed to create testimonial';
        try {
          // Try to parse as JSON
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          // If not JSON, use the text as error message
          errorMessage = responseText || errorMessage;
        }
        setError(errorMessage);
        setLoading(false);
        return;
      }

      // Parse successful response as JSON
      const data = JSON.parse(responseText);

      if (data.success) {
        onSuccess();
        handleClose();
      } else {
        setError(data.error || 'Failed to create testimonial');
      }
    } catch (err) {
      console.error('Error creating testimonial:', err);
      const errorMessage = err instanceof Error ? err.message : err?.toString() || 'Unknown error occurred';
      setError(`Network error: ${errorMessage}. Please check your connection and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      role: '',
      quote: '',
      rating: 5,
      image: '',
    });
    setError('');
    setImageFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Testimonial</DialogTitle>
          <DialogDescription>
            Add a new customer testimonial to display on the home page
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Customer name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g., Adventure Traveler, Family Traveler"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote">Testimonial Quote *</Label>
            <Textarea
              id="quote"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              placeholder="Customer testimonial text"
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating *</Label>
            <Select
              value={formData.rating.toString()}
              onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2">{rating} Star{rating !== 1 ? 's' : ''}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ImageUrlOrUpload
            id="image"
            label="Image (Optional)"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            onFileChange={setImageFile}
            placeholder="https://example.com/image.jpg"
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (imageFile ? 'Uploading...' : 'Creating...') : 'Create Testimonial'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
