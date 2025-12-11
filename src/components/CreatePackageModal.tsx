import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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

interface CreatePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPackageCreated: (packageData: any) => void;
}

const CreatePackageModal = ({ isOpen, onClose, onPackageCreated }: CreatePackageModalProps) => {
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

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { id: "1", day: 1, title: "", description: "" }
  ]);

  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        // Reorder days
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
      const newImages = Array.from(files).slice(0, 5 - images.length);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    const packageData = {
      id: Date.now().toString(),
      ...formData,
      itinerary,
      images: images.map((file, index) => ({
        id: `img_${index}`,
        name: file.name,
        url: URL.createObjectURL(file), // For preview purposes
        file: file
      })),
      createdAt: new Date().toISOString(),
      bookings: 0,
      rating: 0
    };
    
    onPackageCreated(packageData);
    handleClose();
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
    setImages([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Package</DialogTitle>
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
            <label className="text-sm font-medium">About Premium Dubai Tours</label>
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

          {/* Image Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Package Images</label>
              <span className="text-xs text-gray-500">Max 5 images</span>
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

            {/* Upload button */}
            {images.length < 5 && (
              <Button
                type="button"
                variant="outline"
                onClick={openFileDialog}
                className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400"
              >
                <div className="flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <div className="text-center">
                    <p className="text-sm font-medium">Upload Images</p>
                    <p className="text-xs text-gray-500">Click to browse or drag and drop</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB each</p>
                  </div>
                </div>
              </Button>
            )}

            {/* Image previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {images.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
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
            )}

            {/* Upload more button when less than 5 images */}
            {images.length > 0 && images.length < 5 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add More Images ({images.length}/5)
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
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Create Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePackageModal;
