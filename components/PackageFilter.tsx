'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Filter, X, ChevronDown, ChevronUp, MapPin, Calendar, Plane } from "lucide-react";

interface FilterState {
  searchTerm: string;
  priceRange: [number, number];
  durationRange: [number, number];
  location: string;
  departureCity: string[];
  tourType: string[];
  departBetween: {
    startDate: string;
    endDate: string;
  };
}

interface PackageFilterProps {
  onFilterChange: (filters: FilterState) => void;
  packageType: 'domestic' | 'international';
  availableCities?: string[];
}

const PackageFilter = ({ onFilterChange, packageType, availableCities = [] }: PackageFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    priceRange: [0, 100000],
    durationRange: [1, 30],
    location: "all",
    departureCity: [],
    tourType: [],
    departBetween: {
      startDate: "",
      endDate: ""
    }
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    duration: true,
    departure: true,
    tourType: true,
    departBetween: true
  });

  const priceRanges = [
    { label: "₹9,000 - ₹15,000", min: 9000, max: 15000 },
    { label: "₹15,000 - ₹25,000", min: 15000, max: 25000 },
    { label: "₹25,000 - ₹35,000", min: 25000, max: 35000 },
    { label: "₹35,000 - ₹50,000", min: 35000, max: 50000 },
    { label: "₹50,000 - ₹75,000", min: 50000, max: 75000 },
    { label: "₹75,000+", min: 75000, max: 100000 }
  ];

  const durationRanges = [
    { label: "4 - 7 days", min: 4, max: 7 },
    { label: "7 - 10 days", min: 7, max: 10 },
    { label: "10 - 13 days", min: 10, max: 13 },
    { label: "13+ days", min: 13, max: 30 }
  ];

  const tourTypes = [
    "Group Tour",
    "Private Tour",
    "Adventure Tour",
    "Cultural Tour",
    "Honeymoon Tour",
    "Family Tour"
  ];

  const defaultCities = [
    "Mumbai", "New Delhi", "Kolkata", "Hyderabad", "Ahmedabad", "Bangalore",
    "Chennai", "Cochin", "Coimbatore", "Goa", "Nagpur", "Pune", "Indore",
    "Bengaluru", "Joining / Leaving"
  ];

  const cities = availableCities.length > 0 ? availableCities : defaultCities;

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
    updateActiveFilters(updatedFilters);
  };

  const updateActiveFilters = (currentFilters: FilterState) => {
    const active: string[] = [];
    
    if (currentFilters.searchTerm) active.push(`Search: ${currentFilters.searchTerm}`);
    if (currentFilters.location !== "all") active.push(`Location: ${currentFilters.location}`);
    if (currentFilters.departureCity.length > 0) active.push(`Cities: ${currentFilters.departureCity.length}`);
    if (currentFilters.tourType.length > 0) active.push(`Types: ${currentFilters.tourType.length}`);
    if (currentFilters.priceRange[0] > 0 || currentFilters.priceRange[1] < 100000) {
      active.push(`Price: ₹${currentFilters.priceRange[0].toLocaleString()} - ₹${currentFilters.priceRange[1].toLocaleString()}`);
    }
    if (currentFilters.durationRange[0] > 1 || currentFilters.durationRange[1] < 30) {
      active.push(`Duration: ${currentFilters.durationRange[0]} - ${currentFilters.durationRange[1]} days`);
    }
    if (currentFilters.departBetween.startDate || currentFilters.departBetween.endDate) {
      active.push("Date Range");
    }

    setActiveFilters(active);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      searchTerm: "",
      priceRange: [0, 100000],
      durationRange: [1, 30],
      location: "all",
      departureCity: [],
      tourType: [],
      departBetween: {
        startDate: "",
        endDate: ""
      }
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onFilterChange(clearedFilters);
  };

  const removeActiveFilter = (filterToRemove: string) => {
    const filterParts = filterToRemove.split(": ");
    const filterType = filterParts[0];
    
    let updatedFilters = { ...filters };
    
    switch (filterType) {
      case "Search":
        updatedFilters.searchTerm = "";
        break;
      case "Location":
        updatedFilters.location = "all";
        break;
      case "Cities":
        updatedFilters.departureCity = [];
        break;
      case "Types":
        updatedFilters.tourType = [];
        break;
      case "Price":
        updatedFilters.priceRange = [0, 100000];
        break;
      case "Duration":
        updatedFilters.durationRange = [1, 30];
        break;
      case "Date Range":
        updatedFilters.departBetween = { startDate: "", endDate: "" };
        break;
    }
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
    updateActiveFilters(updatedFilters);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCityChange = (city: string, checked: boolean) => {
    const updatedCities = checked 
      ? [...filters.departureCity, city]
      : filters.departureCity.filter(c => c !== city);
    updateFilters({ departureCity: updatedCities });
  };

  const handleTourTypeChange = (type: string, checked: boolean) => {
    const updatedTypes = checked 
      ? [...filters.tourType, type]
      : filters.tourType.filter(t => t !== type);
    updateFilters({ tourType: updatedTypes });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <CardTitle className="text-lg">Filter Your Tour</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear All
          </Button>
        </div>
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                <span className="text-xs">{filter}</span>
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-red-500" 
                  onClick={() => removeActiveFilter(filter)}
                />
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search packages..."
            value={filters.searchTerm}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Location Filter */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Location</h4>
          <div className="flex space-x-2">
            <Button
              variant={packageType === 'domestic' ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters({ location: 'domestic' })}
              className="flex-1"
            >
              <MapPin className="h-4 w-4 mr-2" />
              India
            </Button>
            <Button
              variant={packageType === 'international' ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters({ location: 'international' })}
              className="flex-1"
            >
              <MapPin className="h-4 w-4 mr-2" />
              World
            </Button>
          </div>
        </div>

        {/* Price Range */}
        <Collapsible open={expandedSections.price} onOpenChange={() => toggleSection('price')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h4 className="font-medium text-gray-900">Price Range</h4>
            {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => updateFilters({ priceRange: [range.min, range.max] })}
                >
                  {range.label}
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{filters.priceRange[0].toLocaleString()}</span>
                <span>₹{filters.priceRange[1].toLocaleString()}</span>
              </div>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                max={100000}
                min={0}
                step={1000}
                className="w-full"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Tour Duration */}
        <Collapsible open={expandedSections.duration} onOpenChange={() => toggleSection('duration')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h4 className="font-medium text-gray-900">Tour Duration</h4>
            {expandedSections.duration ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="space-y-2">
              {durationRanges.map((range, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => updateFilters({ durationRange: [range.min, range.max] })}
                >
                  {range.label}
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Min. {filters.durationRange[0]} days</span>
                <span>Max. {filters.durationRange[1]} days</span>
              </div>
              <Slider
                value={filters.durationRange}
                onValueChange={(value) => updateFilters({ durationRange: value as [number, number] })}
                max={30}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Depart Between */}
        <Collapsible open={expandedSections.departBetween} onOpenChange={() => toggleSection('departBetween')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h4 className="font-medium text-gray-900">Depart Between</h4>
            {expandedSections.departBetween ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="space-y-2">
              <Input
                type="date"
                placeholder="Start Date"
                value={filters.departBetween.startDate}
                onChange={(e) => updateFilters({ 
                  departBetween: { ...filters.departBetween, startDate: e.target.value }
                })}
              />
              <Input
                type="date"
                placeholder="End Date"
                value={filters.departBetween.endDate}
                onChange={(e) => updateFilters({ 
                  departBetween: { ...filters.departBetween, endDate: e.target.value }
                })}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Departure City */}
        <Collapsible open={expandedSections.departure} onOpenChange={() => toggleSection('departure')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h4 className="font-medium text-gray-900">Departure City</h4>
            {expandedSections.departure ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {cities.map((city, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`city-${index}`}
                    checked={filters.departureCity.includes(city)}
                    onCheckedChange={(checked) => handleCityChange(city, checked as boolean)}
                  />
                  <label htmlFor={`city-${index}`} className="text-sm flex-1 flex justify-between">
                    <span>{city}</span>
                    <span className="text-gray-500">({Math.floor(Math.random() * 50) + 1})</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 pt-2 border-t">
              <p>Joining & Leaving</p>
              <p>Can't find tours from your city? Check our joining & leaving options.</p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Tour Type */}
        <Collapsible open={expandedSections.tourType} onOpenChange={() => toggleSection('tourType')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h4 className="font-medium text-gray-900">Tour Type</h4>
            {expandedSections.tourType ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="space-y-2">
              {tourTypes.map((type, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${index}`}
                    checked={filters.tourType.includes(type)}
                    onCheckedChange={(checked) => handleTourTypeChange(type, checked as boolean)}
                  />
                  <label htmlFor={`type-${index}`} className="text-sm">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default PackageFilter;