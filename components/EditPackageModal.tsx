import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, X, Upload, Image as ImageIcon } from "lucide-react";

interface ItineraryDay {
  id: string;
  day: number;
  title: string;
  description: string;
}

interface PackageData {
  _id: string;
  title: string;
  subtitle: string;
  about: string;
  services: string;
  tourDetails: string;
  price: number;
  duration: string;
  location: string;
  capacity: string;
  images: Array<{
    public_id: string;
    url: string;
    alt: string;
  }>;
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  bookings: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

interface EditPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: PackageData | null;
  onPackageUpdated: (updatedPackage: PackageData) => void;
}

const EditPackageModal = ({ isOpen, onClose, packageData, onPackageUpdated }: EditPackageModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    about: "",
    services: "",
    tourDetails: "",
    price: "",
    duration: "",
    location: "",
    capacity: "",
  });

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [existingImages, setExistingImages] = useState<Array<{public_id: string; url: string; alt: string}>>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form data when packageData changes
  useEffect(() => {
    if (packageData) {
      setFormData({
        title: packageData.title || "",
        subtitle: packageData.subtitle || "",
        about: packageData.about || "",
        services: packageData.services || "",
        tourDetails: packageData.tourDetails || "",
        price: packageData.price?.toString() || "",
        duration: packageData.duration || "",
        location: packageData.location || "",
        capacity: packageData.capacity || "",
      });

      setItinerary(
        packageData.itinerary?.map((day, index) => ({
          id: `existing_${index}`,
          day: day.day,
          title: day.title,
          description: day.description,
        })) || [{ id: "1", day: 1, title: "", description: "" }]
      );

      setExistingImages(packageData.images || []);
      setNewImages([]);
    }
  }, [packageData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addItineraryDay = () => {
    const newDay = itinerary.length + 1;
    setItinerary(prev => [
      ...prev,
      { id: Date.now().toString(), day: newDay, title: "", description: "" }
    ]);
  };

  const removeItineraryDay = (id: string) => {
    if (itinerary.length > 1) {
      setItinerary(prev => {
        const filtered = prev.filter(day => day.id !== id);
        return filtered.map((day, index) => ({
          ...day,
          day: index + 1
        }));
      });
    }
  };

  const updateItineraryDay = (id: string, field: 'title' | 'description', value: string) => {
    setItinerary(prev => prev.map(day => 
      day.id === id ? { ...day, [field]: value } : day
    ));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 5 - (existingImages.length + newImages.length));
      setNewImages(prev => [...prev, ...newFiles]);
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);
      
      // Upload new images first if any
      let uploadedNewImages = [];
      if (newImages.length > 0) {
        console.log('Uploading', newImages.length, 'new images to Cloudinary...');
        const formData = new FormData();
        newImages.forEach((file) => {
          formData.append('images', file);
        });

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          uploadedNewImages = uploadResult.data || [];
        } else {
          throw new Error('Failed to upload new images');
        }
      }

      // Validate required fields
      if (!formData.title || !formData.subtitle || !formData.about || !formData.services || !formData.tourDetails || !formData.price || !formData.duration || !formData.location || !formData.capacity) {
        alert('Please fill in all required fields');
        return;
      }

      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        alert('Please enter a valid price');
        return;
      }

      // Prepare updated package data
      const updatedPackageData = {
        ...formData,
        price: price,
        itinerary: itinerary.map(day => ({
          day: day.day,
          title: day.title,
          description: day.description
        })),
        images: [...existingImages, ...uploadedNewImages],
        bookings: packageData?.bookings || 0,
        rating: packageData?.rating || 0
      };
      
      // Update package via API
      const response = await fetch(`/api/packages/${packageData?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPackageData),
      });

      if (response.ok) {
        const result = await response.json();
        onPackageUpdated(result.data);
        handleClose();
        alert('Package updated successfully!');
      } else {
        const errorResult = await response.json();
        throw new Error(errorResult.error || 'Failed to update package');
      }
    } catch (error) {
      console.error('Error updating package:', error);
      alert(`Error updating package: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      subtitle: "",
      about: "",
      services: "",
      tourDetails: "",
      price: "",
      duration: "",
      location: "",
      capacity: "",
    });
    setItinerary([{ id: "1", day: 1, title: "", description: "" }]);
    setExistingImages([]);
    setNewImages([]);
    onClose();
  };

  if (!packageData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Package</DialogTitle>
          <DialogDescription>
            Update the details for "{packageData.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Package Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Package Title</label>
            <Input
              placeholder="e.g., Nepal 3-Star Tour for 4 Nights / 5 Days"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          {/* Package Subtitle */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Package Subtitle</label>
            <Input
              placeholder="e.g., Nepal 4N/5D 4 Adult"
              value={formData.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
            />
          </div>

          {/* Package Details - Three Small Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Input
                placeholder="e.g., 4N/5D"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="e.g., Nepal"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Capacity</label>
              <Input
                placeholder="e.g., 4 Adults"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
              />
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">About JJ & TIA Tours and Travels</label>
            <Textarea
              placeholder="Write about your company and this package..."
              value={formData.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
              rows={4}
            />
          </div>

          {/* Services */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Our Services</label>
            <Textarea
              placeholder="List the services included in this package..."
              value={formData.services}
              onChange={(e) => handleInputChange('services', e.target.value)}
              rows={4}
            />
          </div>

          {/* Tour Details */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tour Details</label>
            <Textarea
              placeholder="Provide detailed information about the tour..."
              value={formData.tourDetails}
              onChange={(e) => handleInputChange('tourDetails', e.target.value)}
              rows={4}
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Price (₹)</label>
            <Input
              type="number"
              placeholder="29999"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
            />
          </div>

          {/* Image Management Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Package Images</label>
              <span className="text-xs text-gray-500">Max 5 images total</span>
            </div>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Current Images</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {existingImages.map((image, index) => (
                    <div key={`existing_${index}`} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                        <img
                          src={image.url}
                          alt={image.alt || `Existing image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeExistingImage(index)}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images */}
            {newImages.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">New Images</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {newImages.map((file, index) => (
                    <div key={`new_${index}`} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`New image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeNewImage(index)}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="mt-1">
                        <p className="text-xs text-gray-600 truncate">{file.name}</p>
                        <p className="text-xs text-gray-400">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload more button when less than 5 images */}
            {(existingImages.length + newImages.length) < 5 && (
              <Button
                type="button"
                variant="outline"
                onClick={openFileDialog}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add More Images ({(existingImages.length + newImages.length)}/5)
              </Button>
            )}
          </div>

          {/* Itinerary Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Itinerary</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addItineraryDay}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Day
              </Button>
            </div>

            <div className="space-y-4">
              {itinerary.map((day) => (
                <Card key={day.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Badge variant="secondary">Day {day.day}</Badge>
                      </CardTitle>
                      {itinerary.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItineraryDay(day.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Day {day.day} Title</label>
                      <Input
                        placeholder={`Day ${day.day} title...`}
                        value={day.title}
                        onChange={(e) => updateItineraryDay(day.id, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Day {day.day} Description</label>
                      <Textarea
                        placeholder={`Describe the activities for day ${day.day}...`}
                        value={day.description}
                        onChange={(e) => updateItineraryDay(day.id, 'description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={uploading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700" disabled={uploading}>
            {uploading ? 'Updating...' : 'Update Package'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPackageModal;
