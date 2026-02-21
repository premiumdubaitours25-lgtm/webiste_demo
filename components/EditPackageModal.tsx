import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, X, Upload, Image as ImageIcon, Bold, Star } from "lucide-react";

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

interface Review {
  _id?: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface PackageData {
  _id: string;
  title: string;
  subtitle: string;
  ideaFor?: string;
  about: string;
  services: string;
  tourDetails: string;
  abstract?: string;
  tourOverview?: string;
  keyHighlights?: string[];
  hotelOptions?: string[];
  bestTimeToVisit?: {
    yearRound?: string;
    winter?: string;
    summer?: string;
  };
  whyChooseThisTrip?: string[];
  whyPremiumDubaiTours?: string[];
  price: number;
  duration: string;
  location: string;
  capacity: string;
  packageType: 'domestic' | 'international';
  place: string;
  packageCategory: string;
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
  inclusions?: string[] | Array<{
    category: string;
    items: string[];
  }>;
  exclusions?: string[] | Array<{
    category: string;
    items: string[];
  }>;
  reviews?: Review[];
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
    ideaFor: "",
    about: "",
    services: "",
    tourDetails: "",
    abstract: "",
    tourOverview: "",
    price: "",
    duration: "",
    location: "",
    capacity: "",
    packageType: "",
    place: "",
    packageCategory: "Regular",
    bestTimeToVisit: {
      yearRound: "",
      winter: "",
      summer: "",
    },
  });

  const [keyHighlights, setKeyHighlights] = useState<string[]>([]);
  const [hotelOptions, setHotelOptions] = useState<string[]>([]);
  const [whyChooseThisTrip, setWhyChooseThisTrip] = useState<string[]>([]);
  const [whyPremiumDubaiTours, setWhyPremiumDubaiTours] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [transportation, setTransportation] = useState<TransportationItem[]>([]);
  const [accommodation, setAccommodation] = useState<AccommodationItem[]>([]);
  interface InclusionExclusionCategory {
    id: string;
    category: string;
    items: string[];
  }

  const [inclusions, setInclusions] = useState<InclusionExclusionCategory[]>([]);
  const [exclusions, setExclusions] = useState<InclusionExclusionCategory[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [existingImages, setExistingImages] = useState<Array<{ public_id: string; url: string; alt: string }>>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  // Initialize form data when packageData changes
  useEffect(() => {
    if (packageData) {
      // Map category value to ensure it matches SelectItem values
      const mapCategory = (category: string | undefined): string => {
        if (!category) return "Regular";
        const catLower = category.toLowerCase();
        if (catLower === 'regular') return 'Regular';
        if (catLower === 'premium') return 'Premium';
        if (catLower === 'luxury') return 'Luxury';
        if (catLower === 'adventure') return 'Adventure';
        if (catLower === 'oman tour' || catLower === 'oman') return 'Oman Tour';
        if (catLower === 'attraction and activity' || catLower === 'attraction') return 'Attraction and Activity';
        // Return as-is if it's already a valid capitalized value
        return category;
      };

      const mappedCategory = mapCategory(packageData.packageCategory);
      console.log('Package Category:', packageData.packageCategory, 'Mapped to:', mappedCategory);

      setFormData({
        title: packageData.title || "",
        subtitle: packageData.subtitle || "",
        ideaFor: packageData.ideaFor || "",
        about: packageData.about || "",
        services: packageData.services || "",
        tourDetails: packageData.tourDetails || "",
        abstract: packageData.abstract || "",
        tourOverview: packageData.tourOverview || "",
        price: packageData.price?.toString() || "",
        duration: packageData.duration || "",
        location: packageData.location || "",
        capacity: packageData.capacity || "",
        packageType: packageData.packageType || "",
        place: packageData.place || "",
        packageCategory: mappedCategory,
        bestTimeToVisit: {
          yearRound: packageData.bestTimeToVisit?.yearRound || "",
          winter: packageData.bestTimeToVisit?.winter || "",
          summer: packageData.bestTimeToVisit?.summer || "",
        },
      });

      setKeyHighlights(packageData.keyHighlights || []);
      setHotelOptions(packageData.hotelOptions || []);
      setWhyChooseThisTrip(packageData.whyChooseThisTrip || []);
      setWhyPremiumDubaiTours(packageData.whyPremiumDubaiTours || []);

      setItinerary(
        packageData.itinerary?.map((day, index) => ({
          id: `existing_${index}`,
          day: day.day,
          title: day.title,
          descriptions: day.description ? day.description.split('\n').filter(point => point.trim()) : [""],
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

      // Handle both string array and structured inclusions/exclusions
      if (packageData.inclusions && Array.isArray(packageData.inclusions)) {
        if (packageData.inclusions.length > 0 && typeof packageData.inclusions[0] === 'object' && 'category' in packageData.inclusions[0]) {
          setInclusions((packageData.inclusions as Array<{ category: string; items: string[] }>).map((item, index) => ({
            id: `inc_${index}`,
            category: item.category || "",
            items: item.items || [""]
          })));
        } else {
          // Convert string array to structured format
          setInclusions([{ id: "1", category: "General", items: (packageData.inclusions as string[]).filter(i => i.trim() !== "") }]);
        }
      } else {
        setInclusions([{ id: "1", category: "", items: [""] }]);
      }

      if (packageData.exclusions && Array.isArray(packageData.exclusions)) {
        if (packageData.exclusions.length > 0 && typeof packageData.exclusions[0] === 'object' && 'category' in packageData.exclusions[0]) {
          setExclusions((packageData.exclusions as Array<{ category: string; items: string[] }>).map((item, index) => ({
            id: `exc_${index}`,
            category: item.category || "",
            items: item.items || [""]
          })));
        } else {
          // Convert string array to structured format
          setExclusions([{ id: "1", category: "General", items: (packageData.exclusions as string[]).filter(i => i.trim() !== "") }]);
        }
      } else {
        setExclusions([{ id: "1", category: "", items: [""] }]);
      }

      setReviews(packageData.reviews || []);

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

  // Exclusions functions
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

  // New fields helper functions
  const addKeyHighlight = () => {
    setKeyHighlights(prev => [...prev, ""]);
  };

  const removeKeyHighlight = (index: number) => {
    setKeyHighlights(prev => prev.filter((_, i) => i !== index));
  };

  const updateKeyHighlight = (index: number, value: string) => {
    setKeyHighlights(prev => prev.map((item, i) => i === index ? value : item));
  };

  const addHotelOption = () => {
    setHotelOptions(prev => [...prev, ""]);
  };

  const removeHotelOption = (index: number) => {
    setHotelOptions(prev => prev.filter((_, i) => i !== index));
  };

  const updateHotelOption = (index: number, value: string) => {
    setHotelOptions(prev => prev.map((item, i) => i === index ? value : item));
  };

  const addWhyChooseThisTrip = () => {
    setWhyChooseThisTrip(prev => [...prev, ""]);
  };

  const removeWhyChooseThisTrip = (index: number) => {
    setWhyChooseThisTrip(prev => prev.filter((_, i) => i !== index));
  };

  const updateWhyChooseThisTrip = (index: number, value: string) => {
    setWhyChooseThisTrip(prev => prev.map((item, i) => i === index ? value : item));
  };

  const addWhyPremiumDubaiTours = () => {
    setWhyPremiumDubaiTours(prev => [...prev, ""]);
  };

  const removeWhyPremiumDubaiTours = (index: number) => {
    setWhyPremiumDubaiTours(prev => prev.filter((_, i) => i !== index));
  };

  const updateWhyPremiumDubaiTours = (index: number, value: string) => {
    setWhyPremiumDubaiTours(prev => prev.map((item, i) => i === index ? value : item));
  };

  // Reviews functions
  const addReview = () => {
    const newReview: Review = {
      name: "",
      rating: 5,
      comment: "",
      date: new Date().toISOString()
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
      if (!formData.title || !formData.subtitle || !formData.about || !formData.services || !formData.tourDetails || !formData.price || !formData.duration || !formData.location || !formData.capacity || !formData.packageType || !formData.place || !formData.packageCategory) {
        alert('Please fill in all required fields including package type, category and place');
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
        abstract: formData.abstract,
        tourOverview: formData.tourOverview,
        ideaFor: formData.ideaFor,
        keyHighlights: keyHighlights.filter(h => h.trim() !== ""),
        hotelOptions: hotelOptions.filter(h => h.trim() !== ""),
        bestTimeToVisit: formData.bestTimeToVisit,
        whyChooseThisTrip: whyChooseThisTrip.filter(w => w.trim() !== ""),
        whyPremiumDubaiTours: whyPremiumDubaiTours.filter(w => w.trim() !== ""),
        itinerary: itinerary.map(day => ({
          day: day.day,
          title: day.title,
          description: day.descriptions.filter(desc => desc.trim() !== "").join("\n")
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
        reviews: reviews.filter(review => review.name.trim() !== "" && review.comment.trim() !== ""),
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
      const errorMessage = error instanceof Error ? error.message : error?.toString() || 'Unknown error occurred';
      alert(`Error updating package: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      subtitle: "",
      ideaFor: "",
      about: "",
      services: "",
      tourDetails: "",
      abstract: "",
      tourOverview: "",
      price: "",
      duration: "",
      location: "",
      capacity: "",
      packageType: "domestic",
      place: "bhutan",
      packageCategory: "Regular",
      bestTimeToVisit: {
        yearRound: "",
        winter: "",
        summer: "",
      },
    });
    setKeyHighlights([]);
    setHotelOptions([]);
    setWhyChooseThisTrip([]);
    setWhyPremiumDubaiTours([]);
    setItinerary([{ id: "1", day: 1, title: "", descriptions: [""] }]);
    setTransportation([{ id: "1", type: "", vehicle: "", description: "" }]);
    setAccommodation([{ id: "1", city: "", hotel: "", rooms: "", roomType: "", nights: "" }]);
    setInclusions([{ id: "1", category: "", items: [""] }]);
    setExclusions([{ id: "1", category: "", items: [""] }]);
    setReviews([]);
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
              placeholder="Enter the abstract for this package..."
              value={formData.abstract}
              onChange={(e) => handleInputChange('abstract', e.target.value)}
              rows={4}
            />
          </div>

          {/* Tour Overview */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tour Overview</label>
            <Textarea
              placeholder="Enter the tour overview..."
              value={formData.tourOverview}
              onChange={(e) => handleInputChange('tourOverview', e.target.value)}
              rows={6}
            />
          </div>

          {/* Key Highlights */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Key Highlights</label>
            {keyHighlights.map((highlight, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder={`Highlight ${index + 1}`}
                  value={highlight}
                  onChange={(e) => updateKeyHighlight(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeKeyHighlight(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addKeyHighlight}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Highlight
            </Button>
          </div>

          {/* Hotel Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Hotel Options</label>
            {hotelOptions.map((option, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder={`Hotel option ${index + 1}`}
                  value={option}
                  onChange={(e) => updateHotelOption(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeHotelOption(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addHotelOption}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Hotel Option
            </Button>
          </div>

          {/* Best Time to Visit */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Best Time to Visit</label>
            <div className="space-y-2">
              <label className="text-xs text-gray-600">Year Round</label>
              <Textarea
                placeholder="Year round information..."
                value={formData.bestTimeToVisit.yearRound}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  bestTimeToVisit: { ...prev.bestTimeToVisit, yearRound: e.target.value }
                }))}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-600">Winter</label>
              <Textarea
                placeholder="Winter information..."
                value={formData.bestTimeToVisit.winter}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  bestTimeToVisit: { ...prev.bestTimeToVisit, winter: e.target.value }
                }))}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-600">Summer</label>
              <Textarea
                placeholder="Summer information..."
                value={formData.bestTimeToVisit.summer}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  bestTimeToVisit: { ...prev.bestTimeToVisit, summer: e.target.value }
                }))}
                rows={2}
              />
            </div>
          </div>

          {/* Why Choose This Trip */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Why Choose This Trip?</label>
            {whyChooseThisTrip.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder={`Reason ${index + 1}`}
                  value={item}
                  onChange={(e) => updateWhyChooseThisTrip(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeWhyChooseThisTrip(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addWhyChooseThisTrip}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Reason
            </Button>
          </div>

          {/* Why Premium Dubai Tours */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Why Premium Dubai Tours for This Journey?</label>
            {whyPremiumDubaiTours.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder={`Reason ${index + 1}`}
                  value={item}
                  onChange={(e) => updateWhyPremiumDubaiTours(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeWhyPremiumDubaiTours(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addWhyPremiumDubaiTours}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Reason
            </Button>
          </div>

          {/* Package Type, Category and Place Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <label className="text-sm font-medium">Package Category *</label>
              <Select 
                value={formData.packageCategory || "Regular"} 
                onValueChange={(value) => handleInputChange('packageCategory', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="z-[200]">
                  <SelectItem value="Regular">Regular Packages</SelectItem>
                  <SelectItem value="Premium">Premium Packages</SelectItem>
                  <SelectItem value="Luxury">Luxury Packages</SelectItem>
                  <SelectItem value="Adventure">Adventure Packages</SelectItem>
                  <SelectItem value="Oman Tour">Oman Tour</SelectItem>
                  <SelectItem value="Attraction and Activity">Attraction and Activity</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Wildlife">Wildlife</SelectItem>
                  <SelectItem value="Trekking">Trekking</SelectItem>
                  <SelectItem value="Spiritual">Spiritual</SelectItem>
                  <SelectItem value="Beach">Beach</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                  <SelectItem value="regular">Regular (Legacy)</SelectItem>
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
                  <SelectItem value="dubai">Dubai</SelectItem>
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
                  <h3 className="text-lg font-semibold text-red-700">What's Not Included</h3>
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
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">Customer Reviews</h3>
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
            <div className="space-y-4 max-h-80 overflow-y-auto">
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
                      <div>
                        <label className="text-sm font-medium">Customer Name</label>
                        <Input
                          placeholder="Enter customer name..."
                          value={review.name}
                          onChange={(e) => updateReview(index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Rating (1-5)</label>
                        <Select
                          value={review.rating.toString()}
                          onValueChange={(value) => updateReview(index, 'rating', parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Star</SelectItem>
                            <SelectItem value="2">2 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="5">5 Stars</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Review Comment</label>
                      <Textarea
                        placeholder="Enter customer review..."
                        value={review.comment}
                        onChange={(e) => updateReview(index, 'comment', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Date: {new Date(review.date).toLocaleDateString()}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {reviews.length === 0 && (
                <div className="text-center py-8 text-gray-500">
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
            {uploading ? 'Updating...' : 'Update Package'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPackageModal;
