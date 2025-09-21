import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, X, Upload, Image as ImageIcon, Bold } from "lucide-react";

// Utility function to render text with bold formatting
const renderBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index} className="font-bold">{boldText}</strong>;
    }
    return part;
  });
};

// Utility function to make selected text bold
const makeTextBold = (textareaRef: React.RefObject<HTMLTextAreaElement>, updateFunction: (value: string) => void, currentValue: string) => {
  if (!textareaRef.current) return;
  
  const textarea = textareaRef.current;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  
  if (start === end) {
    // No text selected, insert bold markers at cursor position
    const newValue = currentValue.slice(0, start) + '****' + currentValue.slice(start);
    updateFunction(newValue);
    
    // Set cursor position between the markers
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, start + 2);
    }, 0);
  } else {
    // Text is selected, wrap it with bold markers
    const selectedText = currentValue.slice(start, end);
    const newValue = currentValue.slice(0, start) + `**${selectedText}**` + currentValue.slice(end);
    updateFunction(newValue);
    
    // Restore selection to the wrapped text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, end + 2);
    }, 0);
  }
};

interface ItineraryDay {
  id: string;
  day: number;
  title: string;
  descriptions: string[];
}

interface TransportationItem {
  id: string;
  type: string;
  vehicle: string;
  description: string;
}

interface AccommodationItem {
  id: string;
  city: string;
  hotel: string;
  rooms: string;
  roomType: string;
  nights: string;
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
  packageType: 'domestic' | 'international';
  place: string;
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
  transportation: Array<{
    type: string;
    vehicle: string;
    description: string;
  }>;
  accommodation: Array<{
    city: string;
    hotel: string;
    rooms: string;
    roomType: string;
    nights: string;
  }>;
  inclusions?: string[];
  exclusions?: string[];
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
    packageType: "",
    place: "",
  });

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [transportation, setTransportation] = useState<TransportationItem[]>([]);
  const [accommodation, setAccommodation] = useState<AccommodationItem[]>([]);
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<Array<{public_id: string; url: string; alt: string}>>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

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
        packageType: packageData.packageType || "",
        place: packageData.place || "",
      });

      setItinerary(
        packageData.itinerary?.map((day, index) => ({
          id: `existing_${index}`,
          day: day.day,
          title: day.title,
          descriptions: day.description ? day.description.split('\n• ').filter(point => point.trim()) : [""],
        })) || [{ id: "1", day: 1, title: "", descriptions: [""] }]
      );

      setTransportation(
        packageData.transportation?.map((item, index) => ({
          id: `transport_${index}`,
          type: item.type || "",
          vehicle: item.vehicle || "",
          description: item.description || "",
        })) || [{ id: "1", type: "", vehicle: "", description: "" }]
      );

      setAccommodation(
        packageData.accommodation?.map((item, index) => ({
          id: `accommodation_${index}`,
          city: item.city || "",
          hotel: item.hotel || "",
          rooms: item.rooms || "",
          roomType: item.roomType || "",
          nights: item.nights || "",
        })) || [{ id: "1", city: "", hotel: "", rooms: "", roomType: "", nights: "" }]
      );

      setInclusions(packageData.inclusions || []);
      setExclusions(packageData.exclusions || []);

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
      { id: Date.now().toString(), day: newDay, title: "", descriptions: [""] }
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

  const updateItineraryDay = (id: string, field: 'title', value: string) => {
    setItinerary(prev => prev.map(day => 
      day.id === id ? { ...day, [field]: value } : day
    ));
  };

  const updateItineraryDescription = (dayId: string, descriptionIndex: number, value: string) => {
    setItinerary(prev => prev.map(day => 
      day.id === dayId 
        ? { 
            ...day, 
            descriptions: day.descriptions.map((desc, index) => 
              index === descriptionIndex ? value : desc
            )
          } 
        : day
    ));
  };

  const addItineraryDescription = (dayId: string) => {
    setItinerary(prev => prev.map(day => 
      day.id === dayId 
        ? { ...day, descriptions: [...day.descriptions, ""] }
        : day
    ));
  };

  const removeItineraryDescription = (dayId: string, descriptionIndex: number) => {
    setItinerary(prev => prev.map(day => 
      day.id === dayId 
        ? { 
            ...day, 
            descriptions: day.descriptions.filter((_, index) => index !== descriptionIndex)
          }
        : day
    ));
  };

  // Transportation functions
  const addTransportation = () => {
    const newId = Date.now().toString();
    setTransportation(prev => [
      ...prev,
      { id: newId, type: "", vehicle: "", description: "" }
    ]);
  };

  const removeTransportation = (id: string) => {
    if (transportation.length > 1) {
      setTransportation(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateTransportation = (id: string, field: 'type' | 'vehicle' | 'description', value: string) => {
    setTransportation(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Accommodation functions
  const addAccommodation = () => {
    const newId = Date.now().toString();
    setAccommodation(prev => [
      ...prev,
      { id: newId, city: "", hotel: "", rooms: "", roomType: "", nights: "" }
    ]);
  };

  const removeAccommodation = (id: string) => {
    if (accommodation.length > 1) {
      setAccommodation(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateAccommodation = (id: string, field: 'city' | 'hotel' | 'rooms' | 'roomType' | 'nights', value: string) => {
    setAccommodation(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Inclusions functions
  const addInclusion = () => {
    setInclusions(prev => [...prev, ""]);
  };

  const removeInclusion = (index: number) => {
    if (inclusions.length > 1) {
      setInclusions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateInclusion = (index: number, value: string) => {
    setInclusions(prev => prev.map((item, i) => i === index ? value : item));
  };

  // Exclusions functions
  const addExclusion = () => {
    setExclusions(prev => [...prev, ""]);
  };

  const removeExclusion = (index: number) => {
    if (exclusions.length > 1) {
      setExclusions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateExclusion = (index: number, value: string) => {
    setExclusions(prev => prev.map((item, i) => i === index ? value : item));
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
      if (!formData.title || !formData.subtitle || !formData.about || !formData.services || !formData.tourDetails || !formData.price || !formData.duration || !formData.location || !formData.capacity || !formData.packageType || !formData.place) {
        alert('Please fill in all required fields including package type and place');
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
          description: day.descriptions.filter(desc => desc.trim() !== "").join("\n• ")
        })),
        transportation: transportation.map(item => ({
          type: item.type,
          vehicle: item.vehicle,
          description: item.description
        })),
        accommodation: accommodation.map(item => ({
          city: item.city,
          hotel: item.hotel,
          rooms: item.rooms,
          roomType: item.roomType,
          nights: item.nights
        })),
        inclusions: inclusions.filter(item => item.trim() !== ""),
        exclusions: exclusions.filter(item => item.trim() !== ""),
        images: [...existingImages, ...uploadedNewImages],
        bookings: packageData?.bookings || 0,
        rating: packageData?.rating || 0
      };
      
      // Update package via API
      console.log('Updating package with ID:', packageData?._id);
      console.log('Sending package data:', JSON.stringify(updatedPackageData, null, 2));
      
      const response = await fetch(`/api/packages/${packageData?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPackageData),
      });
      
      console.log('Update response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        onPackageUpdated(result.data);
        handleClose();
        alert('Package updated successfully!');
      } else {
        let errorMessage = 'Failed to update package';
        try {
          const errorResult = await response.json();
          errorMessage = errorResult.error || errorMessage;
        } catch (parseError) {
          // If response is not JSON, get the text content
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
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
      packageType: "domestic",
      place: "bhutan",
    });
    setItinerary([{ id: "1", day: 1, title: "", descriptions: [""] }]);
    setTransportation([{ id: "1", type: "", vehicle: "", description: "" }]);
    setAccommodation([{ id: "1", city: "", hotel: "", rooms: "", roomType: "", nights: "" }]);
    setInclusions([""]);
    setExclusions([""]);
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

          {/* Package Type and Place Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Package Type *</label>
              <Select value={formData.packageType} onValueChange={(value) => handleInputChange('packageType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select package type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Place *</label>
              <Select value={formData.place} onValueChange={(value) => handleInputChange('place', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select place" />
                </SelectTrigger>
                <SelectContent>
                  {/* Domestic Places */}
                  <SelectItem value="darjeeling">Darjeeling</SelectItem>
                  <SelectItem value="sikkim">Sikkim</SelectItem>
                  <SelectItem value="meghalaya">Meghalaya</SelectItem>
                  <SelectItem value="arunachal">Arunachal</SelectItem>
                  <SelectItem value="himachal-pradesh">Himachal Pradesh</SelectItem>
                  <SelectItem value="kashmir">Kashmir</SelectItem>
                  <SelectItem value="leh-ladakh">Leh Ladakh</SelectItem>
                  {/* International Places */}
                  <SelectItem value="vietnam">Vietnam</SelectItem>
                  <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                  <SelectItem value="bali">Bali</SelectItem>
                  <SelectItem value="malaysia">Malaysia</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                  {/* Legacy Places */}
                  <SelectItem value="bhutan">Bhutan</SelectItem>
                  <SelectItem value="nepal">Nepal</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <label className="text-sm font-medium">Day {day.day} Descriptions</label>
                          <p className="text-xs text-gray-500">Select text and click the Bold button to make it bold</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addItineraryDescription(day.id)}
                          className="flex items-center gap-1 h-7 px-2"
                        >
                          <Plus className="h-3 w-3" />
                          Add Point
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {day.descriptions.map((description, descIndex) => (
                          <div key={descIndex} className="flex items-start gap-2">
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium mt-1 flex-shrink-0">
                              •
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-2 mb-2">
                                <Textarea
                                  ref={(el) => {
                                    textareaRefs.current[`${day.id}-${descIndex}`] = el;
                                  }}
                                  placeholder={`Description point ${descIndex + 1} for day ${day.day}...`}
                                  value={description}
                                  onChange={(e) => updateItineraryDescription(day.id, descIndex, e.target.value)}
                                  rows={2}
                                  className="flex-1"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => makeTextBold(
                                    { current: textareaRefs.current[`${day.id}-${descIndex}`] },
                                    (value) => updateItineraryDescription(day.id, descIndex, value),
                                    description
                                  )}
                                  className="px-3 h-auto"
                                  title="Make selected text bold"
                                >
                                  <Bold className="h-4 w-4" />
                                </Button>
                              </div>
                              {description && (
                                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border">
                                  <span className="font-medium">Preview:</span>
                                  <div className="mt-1">{renderBoldText(description)}</div>
                                </div>
                              )}
                            </div>
                            {day.descriptions.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItineraryDescription(day.id, descIndex)}
                                className="text-red-500 hover:text-red-700 h-8 w-8 p-0 flex-shrink-0 mt-1"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Transportation Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Transportation</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTransportation}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Transportation
              </Button>
            </div>

            <div className="space-y-4">
              {transportation.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Transportation Details</CardTitle>
                      {transportation.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTransportation(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Type</label>
                        <Input
                          placeholder="e.g., In Bhutan, Transfers"
                          value={item.type}
                          onChange={(e) => updateTransportation(item.id, 'type', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Vehicle</label>
                        <Input
                          placeholder="e.g., Ertiga, Swift Desire"
                          value={item.vehicle}
                          onChange={(e) => updateTransportation(item.id, 'vehicle', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="e.g., transfers from Airport/Station"
                        value={item.description}
                        onChange={(e) => updateTransportation(item.id, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Accommodation Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Accommodation</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAccommodation}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Accommodation
              </Button>
            </div>

            <div className="space-y-4">
              {accommodation.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Accommodation Details</CardTitle>
                      {accommodation.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAccommodation(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">City</label>
                        <Input
                          placeholder="e.g., Thimphu, Paro"
                          value={item.city}
                          onChange={(e) => updateAccommodation(item.id, 'city', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Hotel/Resort</label>
                        <Input
                          placeholder="e.g., Hotel Park or Similar"
                          value={item.hotel}
                          onChange={(e) => updateAccommodation(item.id, 'hotel', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-sm font-medium">Rooms</label>
                        <Input
                          placeholder="e.g., 2 Rooms"
                          value={item.rooms}
                          onChange={(e) => updateAccommodation(item.id, 'rooms', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Room Type</label>
                        <Input
                          placeholder="e.g., Double Sharing"
                          value={item.roomType}
                          onChange={(e) => updateAccommodation(item.id, 'roomType', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Nights</label>
                        <Input
                          placeholder="e.g., 01, 02"
                          value={item.nights}
                          onChange={(e) => updateAccommodation(item.id, 'nights', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Inclusions and Exclusions Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-green-700">What's Included</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addInclusion}
                    className="text-green-600 border-green-300 hover:bg-green-50"
                  >
                    <Plus className="h-4 w-4" />
                    Add Inclusion
                  </Button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {inclusions.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <Input
                        value={item}
                        onChange={(e) => updateInclusion(index, e.target.value)}
                        placeholder="Enter inclusion item..."
                        className="flex-1"
                      />
                      {inclusions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInclusion(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-red-700">What's Not Included</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addExclusion}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Plus className="h-4 w-4" />
                    Add Exclusion
                  </Button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {exclusions.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-xs">✗</span>
                      </div>
                      <Input
                        value={item}
                        onChange={(e) => updateExclusion(index, e.target.value)}
                        placeholder="Enter exclusion item..."
                        className="flex-1"
                      />
                      {exclusions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExclusion(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
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
