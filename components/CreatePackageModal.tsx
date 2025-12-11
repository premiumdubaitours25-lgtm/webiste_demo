import { useState, useRef } from "react";
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

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

interface CreatePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPackageCreated: (packageData: any) => void;
}

const CreatePackageModal = ({ isOpen, onClose, onPackageCreated }: CreatePackageModalProps) => {
  const [formData, setFormData] = useState({
    title: "Bhutan Budgeted Tour for 3 Nights / 4 Days",
    subtitle: "Destinations Covered: Thimphu & Paro.",
    tourDetails: "Customized travel planning, Guided tours & local experiences, Group & family vacations, Luxury & adventure travel, Honeymoons & romantic getaways, Corporate & incentive travel",
    price: "28500",
    duration: "3N/4D",
    location: "Bhutan",
    capacity: "2 Adults",
    packageType: "international",
    place: "bhutan",
    packageCategory: "Cultural",
  });

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { 
      id: "1", 
      day: 1, 
      title: "Day: 1 Welcome to Bhutan from NJP Station/ Airport - Phuentsholing to Thimphu.", 
      descriptions: [
        "Upon arrival, you will be greeted by our driver or tour representative at the Railway Station. On arrival in Phuentsholing, our tour representative will assist you with the Bhutan immigration process. Immigration formalities include submitting your travel permits and identification (passport or voter ID for Indian citizens).",
        "After which you will be transferred to Thimpu. The capital of Bhutan via Gedu, which is located about 9000 ft. above the sea and on the way you can enjoy the view of Chukha Dam.",
        "We will have a quick stopover for photo session at Wankha Waterfalls. The journey from Phuentsholing to Thimphu is a scenic drive, and there are several noteworthy stops en route where you can relax, enjoy the views, and experience Bhutan's natural beauty and culture."
      ]
    },
    { 
      id: "2", 
      day: 2, 
      title: "Day: 2 Thimphu Local Sightseeing to Paro Transfer.", 
      descriptions: [
        "**The National Memorial Chorten:** Built-in the memory of the third Druk Gyalpo (Head of Kingdom) of Bhutan, the National Memorial Chorten is devoted to World Peace. The Chorten popular amongst the localities for various major Buddhist religious festivals and it is one of the best places to see in Thimphu Bhutan.",
        "**Buddha Dordenma Statue -** Atop a hill in Thimphu, is a massive, golden Buddha sitting atop a gilded meditation hall. Hidden inside it has 125,000 smaller Buddha's. This means that in Thimphu, there are more Buddha statues than this city's population (100000), it is also known as Budda point.",
        "**Changangkha Lhakhang –** In Thimphu there are many monasteries and temple that you will get to see and among them. Changangkha Lhakhang is one of the most religious structures. It was built in the 12th century and its one of the oldest Lhakhang located in Thimphu .It's also known as the wish fulfilling temple, from here you can see the amazing view of Thimphu city",
        "**The motitang Takin Preserve – **For animal lovers, Motithang Takin Preserve is one of the best places to visit in Thimphu. This attractive preserved area was built as a small zoo but later it was converted into an animal preserve center. Takin -The national animal of Bhutan, lives in the Motithang Takin Preserve in Thimphu",
        "**Tashi Chho Dzong (It is open @ 5pm for 1 Hrs only) -** It is a monastery which is located next to bank of Wang Chhu River, It is also known as Thimphu Dzong. Annual 3 days Tsechu festival is also hosted every year at TashiChho Dzong. It was built in 1216 A.D."
      ]
    },
    { 
      id: "3", 
      day: 3, 
      title: "Day: 3 Paro Local Sightseeing.", 
      descriptions: [
        "**Simtokha Dzong :** This Dzong, was built in the year 1629 also known as Sangak Zabdhon Phodrang by Zhabdrung Ngawang Namgyal, Simtokha Dzong was built in the 17th century and it is one of the oldest Dzong built .An very important and oldest structure..",
        "**National Museum of Bhutan:** An ancient watchtower that now displays hundreds of ancient Bhutanese artifacts and artwork including traditional costumes, armor, weaponry, and handcrafted implements for daily life. The collections represent the rich cultural traditions of the country.",
        "**Drukgyal Dzong:** Drukgyal Dzong was a Buddhist Monastery. It is also translates as the 'Victorious Fortress'. This is the place where several victories over marauding Tibetan invaders. It is considered the most beautiful and famous archaeological site in Bhutan.",
        "**Paro Airport View:** This is one of the most stunning airports in the World and also the country's first and only international airport. With a breathtaking view, this airport became a must-visit place in Paro",
        "**Kyichu Lhakhang –** It is also known as Kyerchu Buddhist Temple, Kyichu Lhakhang is a pilgrimage place as it is part of 108 temples which was built by the king ,it's very old and very beautiful and most visited"
      ]
    },
    { 
      id: "4", 
      day: 4, 
      title: "Day: 4 Departure from Paro to Bagdogra airport / NJP Station.", 
      descriptions: [
        "After soaking in the beauty of Bhutan's sights, you will be greeted with a delightful breakfast. After which you'll be transferred to NJP (New Jalpaiguri Station) or Bagdogra in Siliguri, passing through the scenic Phuentsholing, as you embark on your journey back home, carrying unforgettable memories of your Bhutan adventure."
      ]
    }
  ]);

  const [transportation, setTransportation] = useState<TransportationItem[]>([
    { 
      id: "1", 
      type: "In Bhutan", 
      vehicle: "Hyundai Creta", 
      description: "Transportations: - Using Swift Desire transfers from Bagdogra Airport/NJP Station." 
    }
  ]);

  const [accommodation, setAccommodation] = useState<AccommodationItem[]>([
    { 
      id: "1", 
      city: "Thimphu", 
      hotel: "Himalayan Star Lodge or Similar", 
      rooms: "1 Room", 
      roomType: "Double Sharing", 
      nights: "01" 
    },
    { 
      id: "2", 
      city: "Paro", 
      hotel: "Himalayan Star Resort or Similar", 
      rooms: "1 Room", 
      roomType: "Double Sharing", 
      nights: "02" 
    }
  ]);

  const [inclusions, setInclusions] = useState<string[]>([
    "Accommodation in twin sharing",
    "Transportation: Exclusive vehicle for transfers & sightseeing",
    "Breakfast and Dinner included",
    "All tourists taxes",
    "Entry permits to Bhutan",
    "Pick and drop till Airport",
    "All sightseeing tours as per itinerary",
    "Experience Tour guide",
    "Govts SDF fee taxes Rs.1200 per night per person included",
    "Daily mineral water during the tour",
    "Rates are valid for INDIAN NATIONALS only"
  ]);

  const [exclusions, setExclusions] = useState<string[]>([
    "Air Fare / Train fare",
    "Personal expenses such as laundry, telephone calls, tips & gratuity",
    "Entrance Fees, (Monument fee)",
    "Additional sightseeing or extra usage of vehicles",
    "Any cost arising due to natural calamities",
    "Any increase in taxes or fuel price",
    "Anything which is not included in the inclusion"
  ]);

  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: "1",
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Amazing experience! The tour was well organized and the guide was very knowledgeable. Highly recommended!"
    },
    {
      id: "2", 
      name: "Priya Sharma",
      rating: 4,
      comment: "Great value for money. Beautiful destinations and comfortable accommodation. Will definitely book again."
    }
  ]);

  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = {
      ...prev,
      [field]: value
      };
      
      // Reset place when package type changes
      if (field === 'packageType') {
        newData.place = '';
      }
      
      return newData;
    });
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
        // Reorder days
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

  // Inclusions and Exclusions handlers
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

  const addExclusion = () => {
    setExclusions(prev => [...prev, ""]);
  };

  const removeExclusion = (index: number) => {
    if (exclusions.length > 1) {
      setExclusions(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Reviews functions
  const addReview = () => {
    const newId = Date.now().toString();
    setReviews(prev => [...prev, { id: newId, name: "", rating: 5, comment: "" }]);
  };

  const removeReview = (id: string) => {
    if (reviews.length > 1) {
      setReviews(prev => prev.filter(review => review.id !== id));
    }
  };

  const updateReview = (id: string, field: 'name' | 'rating' | 'comment', value: string | number) => {
    setReviews(prev => prev.map(review => 
      review.id === id ? { ...review, [field]: value } : review
    ));
  };

  const updateExclusion = (index: number, value: string) => {
    setExclusions(prev => prev.map((item, i) => i === index ? value : item));
  };

  const updateAccommodation = (id: string, field: 'city' | 'hotel' | 'rooms' | 'roomType' | 'nights', value: string) => {
    setAccommodation(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
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

  const handleSubmit = async () => {
    try {
      setUploading(true);
      
      // Upload images first if any
      let uploadedImages: Array<{url: string, public_id: string}> = [];
      if (images.length > 0) {
        console.log('Uploading', images.length, 'images to Cloudinary...');
        const formData = new FormData();
        images.forEach((file) => {
          formData.append('images', file);
          console.log('Added file to FormData:', file.name, file.size, 'bytes');
        });

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        console.log('Upload response status:', uploadResponse.status);
        
        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          console.log('Upload result:', uploadResult);
          uploadedImages = uploadResult.data || [];
          console.log('Successfully uploaded images:', uploadedImages.length);
        } else {
          const errorResult = await uploadResponse.json();
          console.error('Upload failed:', errorResult);
          throw new Error(`Failed to upload images: ${errorResult.error}`);
        }
      } else {
        console.log('No images to upload');
      }

      // Validate required fields
      console.log('Form data before validation:', formData);
      console.log('Itinerary before validation:', itinerary);
      
      if (!formData.title || !formData.subtitle || !formData.tourDetails || !formData.price || !formData.duration || !formData.location || !formData.capacity || !formData.packageType || !formData.place || !formData.packageCategory) {
        console.log('Validation failed: Missing required fields');
        alert('Please fill in all required fields including package type, category and place');
        return;
      }

      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        console.log('Validation failed: Invalid price');
        alert('Please enter a valid price');
        return;
      }

      // Prepare package data
      const packageData = {
        ...formData,
        about: "Welcome to Premium Dubai Tours - Your Gateway to Unforgettable Dubai Adventures! We specialize in creating unique travel experiences that combine luxury, culture, and comfort. With extensive experience in the travel industry, we have been helping travelers discover the wonders of Dubai and the UAE.\n\nAt Premium Dubai Tours, we believe that travel is about more than just sightseeing; it's about creating memories, fostering meaningful connections, and experiencing Dubai in a way that enriches your life. Let us take you on a journey you'll never forget.",
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
        reviews: reviews.filter(review => review.name.trim() !== "" && review.comment.trim() !== ""),
        images: uploadedImages.filter(img => img.url && img.public_id), // Only include properly uploaded images
        bookings: 0,
        rating: 0
      };
      
      console.log('Final package data being sent:', JSON.stringify(packageData, null, 2));
      onPackageCreated(packageData);
      handleClose();
    } catch (error) {
      console.error('Error creating package:', error);
      alert('Error creating package. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      subtitle: "",
      tourDetails: "",
      price: "",
      duration: "",
      location: "",
      capacity: "",
      packageType: "",
      place: "",
      packageCategory: "",
    });
    setItinerary([{ id: "1", day: 1, title: "", descriptions: [""] }]);
    setTransportation([{ id: "1", type: "", vehicle: "", description: "" }]);
    setAccommodation([{ id: "1", city: "", hotel: "", rooms: "", roomType: "", nights: "" }]);
    setReviews([
      {
        id: "1",
        name: "Rajesh Kumar",
        rating: 5,
        comment: "Amazing experience! The tour was well organized and the guide was very knowledgeable. Highly recommended!"
      },
      {
        id: "2", 
        name: "Priya Sharma",
        rating: 4,
        comment: "Great value for money. Beautiful destinations and comfortable accommodation. Will definitely book again."
      }
    ]);
    setImages([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Package</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new tour package. You can upload up to 5 images and add multiple itinerary days.
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
              <Select value={formData.packageCategory} onValueChange={(value) => handleInputChange('packageCategory', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Adventure">Adventure</SelectItem>
                  <SelectItem value="Wildlife">Wildlife</SelectItem>
                  <SelectItem value="Trekking">Trekking</SelectItem>
                  <SelectItem value="Spiritual">Spiritual</SelectItem>
                  <SelectItem value="Beach">Beach</SelectItem>
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
                  {formData.packageType === 'international' ? (
                    <>
                      <SelectItem value="vietnam">Vietnam</SelectItem>
                      <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                      <SelectItem value="bali">Bali</SelectItem>
                      <SelectItem value="malaysia">Malaysia</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="nepal">Nepal</SelectItem>
                      <SelectItem value="bhutan">Bhutan</SelectItem>
                    </>
                  ) : formData.packageType === 'domestic' ? (
                    <>
                      <SelectItem value="darjeeling">Darjeeling</SelectItem>
                      <SelectItem value="sikkim">Sikkim</SelectItem>
                      <SelectItem value="meghalaya">Meghalaya</SelectItem>
                      <SelectItem value="arunachal">Arunachal</SelectItem>
                      <SelectItem value="himachal-pradesh">Himachal Pradesh</SelectItem>
                      <SelectItem value="kashmir">Kashmir</SelectItem>
                      <SelectItem value="leh-ladakh">Leh Ladakh</SelectItem>
                    </>
                  ) : (
                    <>
                  <SelectItem value="bhutan">Bhutan</SelectItem>
                  <SelectItem value="nepal">Nepal</SelectItem>
                    </>
                  )}
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

          {/* Inclusions and Exclusions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inclusions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-green-700">What's Included</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addInclusion}
                  className="text-green-600 border-green-300 hover:bg-green-50"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
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
                        className="text-red-500 hover:text-red-700 p-1"
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
                <label className="text-sm font-medium text-red-700">What's Not Included</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addExclusion}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
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
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Reviews Section - Full Width */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-blue-700">Customer Reviews</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addReview}
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Review
              </Button>
            </div>
            <div className="space-y-6 max-h-80 overflow-y-auto">
              {reviews.map((review) => (
                <Card key={review.id} className="p-6 w-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-medium text-gray-700">Review #{reviews.indexOf(review) + 1}</h4>
                      {reviews.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeReview(review.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Customer Name</label>
                        <Input
                          value={review.name}
                          onChange={(e) => updateReview(review.id, 'name', e.target.value)}
                          placeholder="Enter customer name..."
                          className="w-full text-base h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Rating (1-5)</label>
                        <Select
                          value={review.rating.toString()}
                          onValueChange={(value) => updateReview(review.id, 'rating', parseInt(value))}
                        >
                          <SelectTrigger className="w-full text-base h-11">
                            <SelectValue />
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
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Review Comment</label>
                      <Textarea
                        value={review.comment}
                        onChange={(e) => updateReview(review.id, 'comment', e.target.value)}
                        placeholder="Enter customer review..."
                        className="w-full text-base min-h-[100px] resize-none"
                        rows={4}
                      />
                    </div>
                  </div>
                </Card>
              ))}
              {reviews.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No reviews added yet. Click "Add Review" to add customer reviews.</p>
                </div>
              )}
            </div>
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
