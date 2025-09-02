import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Calendar, Filter, X, ChevronUp, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterState {
  destination: 'india' | 'world' | null;
  priceRange: string | null;
  tourDuration: [number, number];
  departBetween: { start: Date | null; end: Date | null };
  departureCities: string[];
  tourType: string | null;
}

interface PackageFilterProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

const PackageFilter: React.FC<PackageFilterProps> = ({ onFilterChange, className = "" }) => {
  const [filters, setFilters] = useState<FilterState>({
    destination: null,
    priceRange: null,
    tourDuration: [5, 13],
    departBetween: { start: null, end: null },
    departureCities: [],
    tourType: null
  });

  // Individual open states for each filter section
  const [openSections, setOpenSections] = useState({
    destination: true,
    priceRange: true,
    tourDuration: true,
    departBetween: true,
    departureCity: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const priceRanges = [
    "₹9,000 - ₹15,000",
    "₹15,000 - ₹25,000", 
    "₹25,000 - ₹35,000",
    "₹35,000 - ₹50,000",
    "₹50,000 & above"
  ];

  const durationRanges = [
    "5 - 7 days",
    "7 - 9 days", 
    "9 - 11 days",
    "11 - 13 days"
  ];

  const departureCities = [
    { name: "Joining / Leaving", count: 25 },
    { name: "Pune", count: 4 },
    { name: "Nagpur", count: 8 },
    { name: "Goa", count: 8 },
    { name: "Indore", count: 9 },
    { name: "Cochin", count: 11 },
    { name: "Chennai", count: 11 },
    { name: "Hyderabad", count: 14 },
    { name: "New Delhi", count: 15 },
    { name: "Bangalore", count: 15 },
    { name: "Ahmedabad", count: 15 },
    { name: "Kolkata", count: 16 },
    { name: "Mumbai", count: 49 }
  ];

  const joiningLeavingCities = [
    { name: "Amritsar", count: 1 },
    { name: "Udaipur", count: 2 },
    { name: "Lucknow", count: 2 },
    { name: "Jaipur", count: 2 },
    { name: "Guwahati", count: 2 },
    { name: "Delhi", count: 3 },
    { name: "Cochin", count: 3 },
    { name: "Ahmedabad", count: 5 }
  ];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      destination: null,
      priceRange: null,
      tourDuration: [5, 13],
      departBetween: { start: null, end: null },
      departureCities: [],
      tourType: null
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const removeFilter = (filterType: keyof FilterState, value?: string) => {
    if (filterType === 'tourType') {
      updateFilters({ tourType: null });
    } else if (filterType === 'departureCities' && value) {
      updateFilters({ 
        departureCities: filters.departureCities.filter(city => city !== value) 
      });
    }
  };

  const toggleCity = (cityName: string) => {
    const isSelected = filters.departureCities.includes(cityName);
    if (isSelected) {
      updateFilters({ 
        departureCities: filters.departureCities.filter(city => city !== cityName) 
      });
    } else {
      updateFilters({ 
        departureCities: [...filters.departureCities, cityName] 
      });
    }
  };

  const hasActiveFilters = filters.tourType || filters.departureCities.length > 0;

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Filter Your Tour</h3>
        </div>
        <div className="flex gap-3">
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {filters.tourType && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.tourType}
                <button
                  onClick={() => removeFilter('tourType')}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.departureCities.map((city) => (
              <Badge key={city} variant="secondary" className="flex items-center gap-1">
                {city}
                <button
                  onClick={() => removeFilter('departureCities', city)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Destination Selection */}
      <Collapsible open={openSections.destination} onOpenChange={() => toggleSection('destination')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer group">
          <span className="font-medium text-gray-900 group-hover:text-gray-700">Destination</span>
          {openSections.destination ? <ChevronUp className="h-4 w-4 text-gray-500 group-hover:text-gray-700" /> : <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 transition-all duration-200 ease-in-out">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={filters.destination === 'india' ? 'default' : 'outline'}
              className="w-full"
              onClick={() => updateFilters({ destination: filters.destination === 'india' ? null : 'india' })}
            >
              India
            </Button>
            <Button
              variant={filters.destination === 'world' ? 'default' : 'outline'}
              className="w-full"
              onClick={() => updateFilters({ destination: filters.destination === 'world' ? null : 'world' })}
            >
              World
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible open={openSections.priceRange} onOpenChange={() => toggleSection('priceRange')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer group">
          <span className="font-medium text-gray-900 group-hover:text-gray-700">Price Range</span>
          {openSections.priceRange ? <ChevronUp className="h-4 w-4 text-gray-500 group-hover:text-gray-700" /> : <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 transition-all duration-200 ease-in-out">
          <div className="grid grid-cols-2 gap-3">
            {priceRanges.map((range) => (
              <Button
                key={range}
                variant={filters.priceRange === range ? 'default' : 'outline'}
                className="w-full text-sm"
                onClick={() => updateFilters({ priceRange: filters.priceRange === range ? null : range })}
              >
                {range}
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Tour Duration */}
      <Collapsible open={openSections.tourDuration} onOpenChange={() => toggleSection('tourDuration')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer group">
          <span className="font-medium text-gray-900 group-hover:text-gray-700">Tour Duration</span>
          {openSections.tourDuration ? <ChevronUp className="h-4 w-4 text-gray-500 group-hover:text-gray-700" /> : <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 transition-all duration-200 ease-in-out">
          <div className="space-y-4">
            <div className="px-2">
              <Slider
                value={filters.tourDuration}
                onValueChange={(value) => updateFilters({ tourDuration: value as [number, number] })}
                max={13}
                min={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Min. {filters.tourDuration[0]} days</span>
                <span>Max. {filters.tourDuration[1]} days</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {durationRanges.map((range) => (
                <Button
                  key={range}
                  variant="outline"
                  className="w-full text-sm"
                >
                  {range}
              </Button>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Depart Between */}
      <Collapsible open={openSections.departBetween} onOpenChange={() => toggleSection('departBetween')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer group">
          <span className="font-medium text-gray-900 group-hover:text-gray-700">Depart Between</span>
          {openSections.departBetween ? <ChevronUp className="h-4 w-4 text-gray-500 group-hover:text-gray-700" /> : <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 transition-all duration-200 ease-in-out">
          <div className="relative">
            <input
              type="text"
              placeholder="Start Date - End Date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Departure City */}
      <Collapsible open={openSections.departureCity} onOpenChange={() => toggleSection('departureCity')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer group">
          <span className="font-medium text-gray-900 group-hover:text-gray-700">Departure City</span>
          {openSections.departureCity ? <ChevronUp className="h-4 w-4 text-gray-500 group-hover:text-gray-700" /> : <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 transition-all duration-200 ease-in-out">
          <div className="space-y-4">
            {departureCities.map((city) => (
              <label key={city.name} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.departureCities.includes(city.name)}
                    onChange={() => toggleCity(city.name)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{city.name}</span>
                </div>
                <span className="text-xs text-gray-500">({city.count})</span>
              </label>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Joining & Leaving</h4>
              <p className="text-xs text-gray-600 mb-3">
                Can't find tours from your city? Check our Joining & leaving option. Book your own flights and join directly at the first destination of the tour.
              </p>
              {joiningLeavingCities.map((city) => (
                <label key={city.name} className="flex items-center justify-between cursor-pointer mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.departureCities.includes(city.name)}
                      onChange={() => toggleCity(city.name)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">{city.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">({city.count})</span>
                </label>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default PackageFilter;
