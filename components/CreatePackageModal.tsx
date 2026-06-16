import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, X } from "lucide-react";

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

interface CreatePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPackageCreated: (packageData: any) => void;
}

const CreatePackageModal = ({ isOpen, onClose, onPackageCreated }: CreatePackageModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    ideaFor: "",
    abstract: "",
    tourOverview: "",
    packageCategory: "Regular",
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
  const [inclusions, setInclusions] = useState<InclusionExclusionItem[]>([
    { id: "1", category: "", items: [""] }
  ]);
  const [exclusions, setExclusions] = useState<InclusionExclusionItem[]>([
    { id: "1", category: "", items: [""] }
  ]);
  const [uploading, setUploading] = useState(false);

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

  const handleClose = () => {
    // Reset form
    setFormData({
      title: "",
      subtitle: "",
      ideaFor: "",
      abstract: "",
      tourOverview: "",
      packageCategory: "Regular",
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
    setInclusions([{ id: "1", category: "", items: [""] }]);
    setExclusions([{ id: "1", category: "", items: [""] }]);
    onClose();
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);

      // Validate required fields
      if (!formData.title || !formData.subtitle) {
        alert('Please fill in Title and Subtitle');
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
        // Required fields for model
        about: formData.abstract || formData.tourOverview || "",
        tourDetails: formData.tourOverview || formData.abstract || "",
        price: 0,
        duration: "",
        location: "Dubai, UAE",
        capacity: "",
        packageType: "international",
        place: "dubai",
        packageCategory: formData.packageCategory || "Regular",
        images: [],
        transportation: [],
        accommodation: [],
        reviews: [],
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

          {/* Package Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Package Category *</label>
            <Select 
              value={formData.packageCategory} 
              onValueChange={(value) => setFormData({ ...formData, packageCategory: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
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
              </SelectContent>
            </Select>
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
              <label className="text-sm font-medium">Inclusions</label>
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
              <label className="text-sm font-medium">Exclusions</label>
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
