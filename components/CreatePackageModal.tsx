import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, X, Star } from "lucide-react";

interface ItineraryDay {
  id: string;
  day: number;
  title: string;
  description: string;
}

interface InclusionExclusionItem {
  id: string;
  category: string;
  items: string[];
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

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface CreatePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPackageCreated: (packageData: any) => void;
}

const DEFAULT_INCLUSIONS: InclusionExclusionItem[] = [
  {
    id: "inc-1",
    category: "Ticket Inclusions",
    items: [
      "Entry ticket to Burj Khalifa – At The Top (Levels 124 & 125)",
      "Access during Prime Hours",
      "Use of observation decks and digital telescopes",
    ],
  },
  {
    id: "inc-2",
    category: "Timings (Prime Hours)",
    items: [
      "12:00 PM – 08:00 PM",
      "(Sunset hours are the most popular and fill quickly)",
      "Exact entry time is subject to availability at the time of booking.",
    ],
  },
  {
    id: "inc-3",
    category: "Pricing (Per Person)",
    items: [
      "Adult: AED 260",
      "Child (3–8 years): AED 210",
      "Children below 3 years: Free of charge",
    ],
  },
];

const DEFAULT_EXCLUSIONS: InclusionExclusionItem[] = [
  {
    id: "exc-1",
    category: "Transfers",
    items: [
      "Tickets are sold without transfers by default (Private pickup and drop-off can be arranged on request)",
    ],
  },
  {
    id: "exc-2",
    category: "Terms & Conditions",
    items: [
      "Tickets are subject to availability, especially during sunset hours",
      "Entry is valid only for the selected date and time slot",
      "Tickets are non-refundable and non-transferable",
      "Guests must arrive at least 15 minutes before the scheduled time",
      "Large bags, outside food, and drinks are not permitted",
      "Prime hour definition is determined by Burj Khalifa management",
      "Management reserves the right to adjust timings or access levels",
    ],
  },
  {
    id: "exc-3",
    category: "Child Policy",
    items: [
      "Children below 3 years: Free of charge",
      "Children from 3 to 8 years: Child ticket applies",
      "Children above 8 years: Adult ticket applies",
      "Children under 16 years must be accompanied by an adult",
    ],
  },
  {
    id: "exc-4",
    category: "Add On",
    items: [
      "Highly recommended to combine with Dubai Mall, Fountain Show, or Downtown dining",
    ],
  },
];

const DEFAULT_PACKAGE_TYPE_OPTIONS = [
  'Regular Packages',
  'Premium Packages',
  'Luxury Packages',
  'Adventure Activities',
  'OMAN Tour',
  'Attraction and Activity',
];

const CreatePackageModal = ({ isOpen, onClose, onPackageCreated }: CreatePackageModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    ideaFor: "",
    abstract: "",
    tourOverview: "",
    about: "",
    services: "",
    tourDetails: "",
    price: "",
    duration: "",
    location: "",
    capacity: "",
    packageCategory: "Regular Packages",
    bestTimeToVisit: {
      yearRound: "",
      winter: "",
      summer: "",
    },
  });

  const [hotelOptions, setHotelOptions] = useState<string[]>([""]);
  const [keyHighlights, setKeyHighlights] = useState<string[]>([""]);
  const [whyChooseThisTrip, setWhyChooseThisTrip] = useState<string[]>([""]);
  const [whyPremiumDubaiTours, setWhyPremiumDubaiTours] = useState<string[]>([""]);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { id: "1", day: 1, title: "", description: "" }
  ]);
  const [inclusions, setInclusions] = useState<InclusionExclusionItem[]>(DEFAULT_INCLUSIONS);
  const [exclusions, setExclusions] = useState<InclusionExclusionItem[]>(DEFAULT_EXCLUSIONS);
  const [images, setImages] = useState<string[]>([""]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [transportation, setTransportation] = useState<TransportationItem[]>([
    { id: "1", type: "", vehicle: "", description: "" }
  ]);
  const [accommodation, setAccommodation] = useState<AccommodationItem[]>([
    { id: "1", city: "", hotel: "", rooms: "", roomType: "", nights: "" }
  ]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>(DEFAULT_PACKAGE_TYPE_OPTIONS);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCategoryOptions = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (response.ok && data.success && Array.isArray(data.data) && data.data.length > 0) {
          const names = data.data
            .map((item: { name?: string }) => item?.name?.trim())
            .filter((name: string | undefined): name is string => Boolean(name));
          if (names.length > 0) {
            setCategoryOptions(Array.from(new Set(names)));
          }
        }
      } catch (error) {
        console.error('Error loading category options:', error);
      }
    };

    if (isOpen) {
      fetchCategoryOptions();
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBestTimeToVisitChange = (field: 'yearRound' | 'winter' | 'summer', value: string) => {
    setFormData(prev => ({
      ...prev,
      bestTimeToVisit: {
        ...prev.bestTimeToVisit,
        [field]: value
      }
    }));
  };

  // Hotel Options handlers
  const addHotelOption = () => {
    setHotelOptions(prev => [...prev, ""]);
  };

  const removeHotelOption = (index: number) => {
    if (hotelOptions.length > 1) {
      setHotelOptions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateHotelOption = (index: number, value: string) => {
    setHotelOptions(prev => prev.map((item, i) => i === index ? value : item));
  };

  // Key Highlights handlers
  const addKeyHighlight = () => {
    setKeyHighlights(prev => [...prev, ""]);
  };

  const removeKeyHighlight = (index: number) => {
    if (keyHighlights.length > 1) {
      setKeyHighlights(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateKeyHighlight = (index: number, value: string) => {
    setKeyHighlights(prev => prev.map((item, i) => i === index ? value : item));
  };

  // Why Choose This Trip handlers
  const addWhyChooseThisTrip = () => {
    setWhyChooseThisTrip(prev => [...prev, ""]);
  };

  const removeWhyChooseThisTrip = (index: number) => {
    if (whyChooseThisTrip.length > 1) {
      setWhyChooseThisTrip(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateWhyChooseThisTrip = (index: number, value: string) => {
    setWhyChooseThisTrip(prev => prev.map((item, i) => i === index ? value : item));
  };

  // Why Premium Dubai Tours handlers
  const addWhyPremiumDubaiTours = () => {
    setWhyPremiumDubaiTours(prev => [...prev, ""]);
  };

  const removeWhyPremiumDubaiTours = (index: number) => {
    if (whyPremiumDubaiTours.length > 1) {
      setWhyPremiumDubaiTours(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateWhyPremiumDubaiTours = (index: number, value: string) => {
    setWhyPremiumDubaiTours(prev => prev.map((item, i) => i === index ? value : item));
  };

  // Itinerary handlers
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

  // Inclusions handlers
  const addInclusionCategory = () => {
    const newId = Date.now().toString();
    setInclusions(prev => [...prev, { id: newId, category: "", items: [""] }]);
  };

  const removeInclusionCategory = (id: string) => {
    if (inclusions.length > 1) {
      setInclusions(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateInclusionCategory = (id: string, value: string) => {
    setInclusions(prev => prev.map(item =>
      item.id === id ? { ...item, category: value } : item
    ));
  };

  const addInclusionItem = (categoryId: string) => {
    setInclusions(prev => prev.map(item =>
      item.id === categoryId ? { ...item, items: [...item.items, ""] } : item
    ));
  };

  const removeInclusionItem = (categoryId: string, itemIndex: number) => {
    setInclusions(prev => prev.map(item =>
      item.id === categoryId
        ? { ...item, items: item.items.filter((_, i) => i !== itemIndex) }
        : item
    ));
  };

  const updateInclusionItem = (categoryId: string, itemIndex: number, value: string) => {
    setInclusions(prev => prev.map(item =>
      item.id === categoryId
        ? { ...item, items: item.items.map((itm, i) => i === itemIndex ? value : itm) }
        : item
    ));
  };

  // Exclusions handlers
  const addExclusionCategory = () => {
    const newId = Date.now().toString();
    setExclusions(prev => [...prev, { id: newId, category: "", items: [""] }]);
  };

  const removeExclusionCategory = (id: string) => {
    if (exclusions.length > 1) {
      setExclusions(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateExclusionCategory = (id: string, value: string) => {
    setExclusions(prev => prev.map(item =>
      item.id === id ? { ...item, category: value } : item
    ));
  };

  const addExclusionItem = (categoryId: string) => {
    setExclusions(prev => prev.map(item =>
      item.id === categoryId ? { ...item, items: [...item.items, ""] } : item
    ));
  };

  const removeExclusionItem = (categoryId: string, itemIndex: number) => {
    setExclusions(prev => prev.map(item =>
      item.id === categoryId
        ? { ...item, items: item.items.filter((_, i) => i !== itemIndex) }
        : item
    ));
  };

  const updateExclusionItem = (categoryId: string, itemIndex: number, value: string) => {
    setExclusions(prev => prev.map(item =>
      item.id === categoryId
        ? { ...item, items: item.items.map((itm, i) => i === itemIndex ? value : itm) }
        : item
    ));
  };

  // Image handlers
  const addImage = () => setImages(prev => [...prev, ""]);
  const removeImage = (index: number) => {
    if (images.length > 1) {
      setImages(prev => prev.filter((_, i) => i !== index));
    }
  };
  const updateImage = (index: number, value: string) => {
    setImages(prev => prev.map((item, i) => (i === index ? value : item)));
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const remainingSlots = 5 - (images.filter((url) => url.trim() !== "").length + imageFiles.length);
      if (remainingSlots <= 0) return;
      const selectedFiles = Array.from(files).slice(0, remainingSlots);
      setImageFiles(prev => [...prev, ...selectedFiles]);
    }
    event.target.value = "";
  };
  const removeImageFile = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Transportation handlers
  const addTransportation = () => {
    setTransportation(prev => [...prev, { id: Date.now().toString(), type: "", vehicle: "", description: "" }]);
  };
  const removeTransportation = (id: string) => {
    if (transportation.length > 1) {
      setTransportation(prev => prev.filter(item => item.id !== id));
    }
  };
  const updateTransportation = (id: string, field: keyof TransportationItem, value: string) => {
    setTransportation(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Accommodation handlers
  const addAccommodation = () => {
    setAccommodation(prev => [...prev, { id: Date.now().toString(), city: "", hotel: "", rooms: "", roomType: "", nights: "" }]);
  };
  const removeAccommodation = (id: string) => {
    if (accommodation.length > 1) {
      setAccommodation(prev => prev.filter(item => item.id !== id));
    }
  };
  const updateAccommodation = (id: string, field: keyof AccommodationItem, value: string) => {
    setAccommodation(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Reviews handlers
  const addReview = () => {
    const newReview: Review = {
      name: "",
      rating: 5,
      comment: "",
      date: new Date().toISOString(),
    };
    setReviews(prev => [...prev, newReview]);
  };

  const removeReview = (index: number) => {
    setReviews(prev => prev.filter((_, i) => i !== index));
  };

  const updateReview = (index: number, field: keyof Review, value: string | number) => {
    setReviews(prev => prev.map((review, i) =>
      i === index ? { ...review, [field]: value } : review
    ));
  };

  const handleClose = () => {
    // Reset form
    setFormData({
      title: "",
      subtitle: "",
      ideaFor: "",
      abstract: "",
      tourOverview: "",
      about: "",
      services: "",
      tourDetails: "",
      price: "",
      duration: "",
      location: "",
      capacity: "",
      packageCategory: "Regular Packages",
      bestTimeToVisit: {
        yearRound: "",
        winter: "",
        summer: "",
      },
    });
    setHotelOptions([""]);
    setKeyHighlights([""]);
    setWhyChooseThisTrip([""]);
    setWhyPremiumDubaiTours([""]);
    setItinerary([{ id: "1", day: 1, title: "", description: "" }]);
    setInclusions(DEFAULT_INCLUSIONS);
    setExclusions(DEFAULT_EXCLUSIONS);
    setImages([""]);
    setImageFiles([]);
    setTransportation([{ id: "1", type: "", vehicle: "", description: "" }]);
    setAccommodation([{ id: "1", city: "", hotel: "", rooms: "", roomType: "", nights: "" }]);
    setReviews([]);
    onClose();
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);

      let uploadedImages: Array<{ url: string; alt?: string; public_id?: string }> = [];
      if (imageFiles.length > 0) {
        const uploadFormData = new FormData();
        imageFiles.forEach((file) => uploadFormData.append("images", file));
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });
        if (!uploadResponse.ok) {
          throw new Error("Failed to upload package images");
        }
        const uploadResult = await uploadResponse.json();
        uploadedImages = uploadResult.data || [];
      }

      // Validate required fields
      if (!formData.title || !formData.subtitle || !formData.about || !formData.services || !formData.tourDetails || !formData.price || !formData.duration || !formData.location || !formData.capacity) {
        alert('Please fill all required fields');
        return;
      }

      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        alert('Please enter a valid price');
        return;
      }

      // Prepare package data
      const packageData = {
        title: formData.title,
        subtitle: formData.subtitle,
        ideaFor: formData.ideaFor,
        abstract: formData.abstract,
        tourOverview: formData.tourOverview,
        keyHighlights: keyHighlights.filter(item => item.trim() !== ""),
        hotelOptions: hotelOptions.filter(item => item.trim() !== ""),
        bestTimeToVisit: formData.bestTimeToVisit,
        whyChooseThisTrip: whyChooseThisTrip.filter(item => item.trim() !== ""),
        whyPremiumDubaiTours: whyPremiumDubaiTours.filter(item => item.trim() !== ""),
        itinerary: itinerary.map(day => ({
          day: day.day,
          title: day.title,
          description: day.description
        })),
        inclusions: inclusions
          .filter(item => item.category.trim() !== "" || item.items.some(i => i.trim() !== ""))
          .map(item => ({
            category: item.category,
            items: item.items.filter(i => i.trim() !== "")
          })),
        exclusions: exclusions
          .filter(item => item.category.trim() !== "" || item.items.some(i => i.trim() !== ""))
          .map(item => ({
            category: item.category,
            items: item.items.filter(i => i.trim() !== "")
          })),
        about: formData.about,
        services: formData.services,
        tourDetails: formData.tourDetails,
        price: price,
        duration: formData.duration,
        location: formData.location,
        capacity: formData.capacity,
        packageType: "international",
        place: "dubai",
        packageCategory: formData.packageCategory || "Regular Packages",
        images: [
          ...images
          .filter((url) => url.trim() !== "")
          .map((url) => ({ url: url.trim(), alt: formData.title })),
          ...uploadedImages.map((image) => ({
            url: image.url,
            alt: image.alt || formData.title,
            ...(image.public_id ? { public_id: image.public_id } : {}),
          })),
        ].slice(0, 5),
        transportation: transportation
          .filter(item => item.type.trim() && item.vehicle.trim())
          .map(item => ({
            type: item.type.trim(),
            vehicle: item.vehicle.trim(),
            description: item.description.trim()
          })),
        accommodation: accommodation
          .filter(item => item.city.trim() && item.hotel.trim() && item.rooms.trim() && item.roomType.trim() && item.nights.trim())
          .map(item => ({
            city: item.city.trim(),
            hotel: item.hotel.trim(),
            rooms: item.rooms.trim(),
            roomType: item.roomType.trim(),
            nights: item.nights.trim()
          })),
        reviews: reviews.filter(review => review.name.trim() !== "" && review.comment.trim() !== ""),
        bookings: 0,
        rating: 0
      };

      console.log('Package data being sent:', JSON.stringify(packageData, null, 2));
      onPackageCreated(packageData);
      handleClose();
    } catch (error) {
      console.error('Error creating package:', error);
      const errorMessage = error instanceof Error ? error.message : error?.toString() || 'Unknown error occurred';
      alert(`Failed to create package: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Package</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new tour package
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title *</label>
            <Input
              placeholder="Enter package title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Subtitle *</label>
            <Input
              placeholder="Enter package subtitle"
              value={formData.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
            />
          </div>

          {/* Idea For */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Idea For</label>
            <Input
              placeholder="e.g., Airline stopovers, short holidays, business travelers"
              value={formData.ideaFor}
              onChange={(e) => handleInputChange('ideaFor', e.target.value)}
            />
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Abstract</label>
            <Textarea
              placeholder="Enter abstract description"
              value={formData.abstract}
              onChange={(e) => handleInputChange('abstract', e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Tour Overview */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tour Overview</label>
            <Textarea
              placeholder="Enter tour overview"
              value={formData.tourOverview}
              onChange={(e) => handleInputChange('tourOverview', e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">About Premium Dubai Tours *</label>
            <Textarea
              placeholder="Write about your company and this package..."
              value={formData.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Our Services *</label>
            <Textarea
              placeholder="List the services included in this package..."
              value={formData.services}
              onChange={(e) => handleInputChange('services', e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tour Details *</label>
            <Textarea
              placeholder="Provide detailed information about the tour..."
              value={formData.tourDetails}
              onChange={(e) => handleInputChange('tourDetails', e.target.value)}
              rows={4}
            />
          </div>

          {/* Package Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Package Type *</label>
            <Select 
              value={formData.packageCategory} 
              onValueChange={(value) => setFormData({ ...formData, packageCategory: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select package type" />
              </SelectTrigger>
              <SelectContent className="z-[200]">
                {categoryOptions.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Price (₹) *</label>
              <Input
                type="number"
                placeholder="29999"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration *</label>
              <Input
                placeholder="e.g., 4N/5D"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Capacity *</label>
              <Input
                placeholder="e.g., 4 Adults"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location *</label>
            <Input
              placeholder="e.g., Downtown Dubai"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Package Images (URLs or Upload)</label>
              <span className="text-xs text-gray-500">Max 5 images total</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex flex-wrap gap-2">
              {images.length < 5 && (
                <Button type="button" variant="outline" size="sm" onClick={addImage} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add URL
                </Button>
              )}
              {(images.filter((url) => url.trim() !== "").length + imageFiles.length) < 5 && (
                <Button type="button" variant="outline" size="sm" onClick={openFileDialog} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Upload from device
                </Button>
              )}
            </div>
            {images.map((image, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder={`https://... image ${index + 1}`}
                  value={image}
                  onChange={(e) => updateImage(index, e.target.value)}
                />
                {images.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeImage(index)} className="text-red-500">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {imageFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">New Uploads</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {imageFiles.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="relative group">
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
                        onClick={() => removeImageFile(index)}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Key Highlights */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Key Highlights</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addKeyHighlight}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Highlight
              </Button>
            </div>
            <div className="space-y-2">
              {keyHighlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Highlight ${index + 1}`}
                    value={highlight}
                    onChange={(e) => updateKeyHighlight(index, e.target.value)}
                  />
                  {keyHighlights.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKeyHighlight(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hotel Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Hotel Options</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addHotelOption}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Option
              </Button>
            </div>
            <div className="space-y-2">
              {hotelOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Hotel option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateHotelOption(index, e.target.value)}
                  />
                  {hotelOptions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHotelOption(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Itinerary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Detailed Itinerary</label>
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
                        placeholder={`Day ${day.day} description...`}
                        value={day.description}
                        onChange={(e) => updateItineraryDay(day.id, 'description', e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Transportation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Transportation</label>
              <Button type="button" variant="outline" size="sm" onClick={addTransportation} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Transportation
              </Button>
            </div>
            {transportation.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="e.g., In Dubai, Transfers"
                      value={item.type}
                      onChange={(e) => updateTransportation(item.id, 'type', e.target.value)}
                    />
                    <Input
                      placeholder="e.g., Ertiga, Swift Desire"
                      value={item.vehicle}
                      onChange={(e) => updateTransportation(item.id, 'vehicle', e.target.value)}
                    />
                  </div>
                  <Textarea
                    placeholder="e.g., transfers from Airport/Station"
                    value={item.description}
                    onChange={(e) => updateTransportation(item.id, 'description', e.target.value)}
                    rows={2}
                  />
                  {transportation.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeTransportation(item.id)} className="text-red-500">
                      <Minus className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Accommodation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Accommodation</label>
              <Button type="button" variant="outline" size="sm" onClick={addAccommodation} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Accommodation
              </Button>
            </div>
            {accommodation.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="e.g., Thimphu, Paro"
                      value={item.city}
                      onChange={(e) => updateAccommodation(item.id, 'city', e.target.value)}
                    />
                    <Input
                      placeholder="e.g., Hotel Park or Similar"
                      value={item.hotel}
                      onChange={(e) => updateAccommodation(item.id, 'hotel', e.target.value)}
                    />
                    <Input
                      placeholder="e.g., 2 Rooms"
                      value={item.rooms}
                      onChange={(e) => updateAccommodation(item.id, 'rooms', e.target.value)}
                    />
                    <Input
                      placeholder="e.g., Double Sharing"
                      value={item.roomType}
                      onChange={(e) => updateAccommodation(item.id, 'roomType', e.target.value)}
                    />
                    <Input
                      placeholder="e.g., 01, 02"
                      value={item.nights}
                      onChange={(e) => updateAccommodation(item.id, 'nights', e.target.value)}
                    />
                  </div>
                  {accommodation.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeAccommodation(item.id)} className="text-red-500">
                      <Minus className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Best Time to Visit */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Best Time to Visit Dubai</label>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">Year Round</label>
                <Textarea
                  placeholder="Available year-round description..."
                  value={formData.bestTimeToVisit.yearRound}
                  onChange={(e) => handleBestTimeToVisitChange('yearRound', e.target.value)}
                  rows={2}
                  className="resize-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Winter</label>
                <Textarea
                  placeholder="Winter season description..."
                  value={formData.bestTimeToVisit.winter}
                  onChange={(e) => handleBestTimeToVisitChange('winter', e.target.value)}
                  rows={2}
                  className="resize-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Summer</label>
                <Textarea
                  placeholder="Summer season description..."
                  value={formData.bestTimeToVisit.summer}
                  onChange={(e) => handleBestTimeToVisitChange('summer', e.target.value)}
                  rows={2}
                  className="resize-none"
                />
              </div>
            </div>
          </div>

          {/* Why Choose This Trip */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Why Choose This Trip?</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addWhyChooseThisTrip}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Point
              </Button>
            </div>
            <div className="space-y-2">
              {whyChooseThisTrip.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Point ${index + 1}`}
                    value={point}
                    onChange={(e) => updateWhyChooseThisTrip(index, e.target.value)}
                  />
                  {whyChooseThisTrip.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWhyChooseThisTrip(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Why Premium Dubai Tours */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Why Premium Dubai Tours for This Journey?</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addWhyPremiumDubaiTours}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Point
              </Button>
            </div>
            <div className="space-y-2">
              {whyPremiumDubaiTours.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Point ${index + 1}`}
                    value={point}
                    onChange={(e) => updateWhyPremiumDubaiTours(index, e.target.value)}
                  />
                  {whyPremiumDubaiTours.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWhyPremiumDubaiTours(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">What's Included</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addInclusionCategory}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </div>
            <div className="space-y-4">
              {inclusions.map((category) => (
                <Card key={category.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Category name"
                        value={category.category}
                        onChange={(e) => updateInclusionCategory(category.id, e.target.value)}
                        className="max-w-xs"
                      />
                      {inclusions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInclusionCategory(category.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <Input
                          placeholder={`Item ${itemIndex + 1}`}
                          value={item}
                          onChange={(e) => updateInclusionItem(category.id, itemIndex, e.target.value)}
                        />
                        {category.items.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeInclusionItem(category.id, itemIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addInclusionItem(category.id)}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Item
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">What's Not Included</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addExclusionCategory}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </div>
            <div className="space-y-4">
              {exclusions.map((category) => (
                <Card key={category.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Category name"
                        value={category.category}
                        onChange={(e) => updateExclusionCategory(category.id, e.target.value)}
                        className="max-w-xs"
                      />
                      {exclusions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExclusionCategory(category.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <Input
                          placeholder={`Item ${itemIndex + 1}`}
                          value={item}
                          onChange={(e) => updateExclusionItem(category.id, itemIndex, e.target.value)}
                        />
                        {category.items.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExclusionItem(category.id, itemIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addExclusionItem(category.id)}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Item
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Customer Reviews</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addReview}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Review
              </Button>
            </div>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Review {index + 1}</CardTitle>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeReview(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Customer name"
                        value={review.name}
                        onChange={(e) => updateReview(index, 'name', e.target.value)}
                      />
                      <Select
                        value={review.rating.toString()}
                        onValueChange={(value) => updateReview(index, 'rating', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <SelectItem key={rating} value={rating.toString()}>
                              {rating} Star{rating !== 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Textarea
                      placeholder="Enter customer review..."
                      value={review.comment}
                      onChange={(e) => updateReview(index, 'comment', e.target.value)}
                      rows={3}
                    />
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Date: {new Date(review.date).toLocaleDateString()}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {reviews.length === 0 && (
                <div className="text-center py-6 text-gray-500 border border-dashed rounded-md">
                  <p>No reviews added yet. Click "Add Review" to add customer reviews.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={uploading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700" disabled={uploading}>
            {uploading ? 'Creating...' : 'Create Package'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePackageModal;
