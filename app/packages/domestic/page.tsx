'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Users, Star, Search, Mountain, Camera, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PackageFilter from "@/components/PackageFilter";

interface Package {
  _id: string;
  title: string;
  subtitle: string;
  about: string;
  services: string[];
  tourDetails: string;
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  price: number;
  duration: string;
  location: string;
  capacity: string;
  packageType: string;
  place: string;
  images: Array<{
    url: string;
    alt: string;
  }>;
  bookings: number;
  rating: number;
}

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

const DomesticPackagesPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    priceRange: [0, 50000],
    durationRange: [1, 30],
    location: "domestic",
    departureCity: [],
    tourType: [],
    departBetween: {
      startDate: "",
      endDate: ""
    }
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    filterPackages();
  }, [packages, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const result = await response.json();
      if (result.success) {
        // Filter for domestic packages based on packageType
        const domesticPackages = result.data.filter((pkg: Package) =>
          pkg.packageType === 'domestic'
        );
        setPackages(domesticPackages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPackages = () => {
    let filtered = packages;

    // Search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(pkg =>
        pkg.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        pkg.subtitle.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(pkg => 
      pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1]
    );

    // Duration range filter
    filtered = filtered.filter(pkg => {
      const durationMatch = pkg.duration.match(/(\d+)/);
      if (durationMatch) {
        const duration = parseInt(durationMatch[1]);
        return duration >= filters.durationRange[0] && duration <= filters.durationRange[1];
      }
      return true;
    });

    // Location filter
    if (filters.location !== "all") {
      filtered = filtered.filter(pkg => {
        if (filters.location === "domestic") {
          return pkg.packageType === 'domestic' || 
                 ['darjeeling', 'sikkim', 'meghalaya', 'arunachal', 'himachal-pradesh', 'kashmir', 'leh-ladakh'].includes(pkg.place);
        }
        return pkg.place === filters.location;
      });
    }

    // Tour type filter (if we had tour type data)
    if (filters.tourType.length > 0) {
      filtered = filtered.filter(pkg => {
        // This would need to be implemented based on your data structure
        // For now, we'll skip this filter
        return true;
      });
    }

    // Departure city filter (if we had departure city data)
    if (filters.departureCity.length > 0) {
      filtered = filtered.filter(pkg => {
        // This would need to be implemented based on your data structure
        // For now, we'll skip this filter
        return true;
      });
    }

    // Date range filter (if we had departure date data)
    if (filters.departBetween.startDate || filters.departBetween.endDate) {
      filtered = filtered.filter(pkg => {
        // This would need to be implemented based on your data structure
        // For now, we'll skip this filter
        return true;
      });
    }

    setFilteredPackages(filtered);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const popularDestinations = [
    { name: "Darjeeling", icon: Mountain, packages: packages.filter(p => p.place === 'darjeeling').length },
    { name: "Sikkim", icon: Camera, packages: packages.filter(p => p.place === 'sikkim').length },
    { name: "Meghalaya", icon: Heart, packages: packages.filter(p => p.place === 'meghalaya').length },
    { name: "Himachal Pradesh", icon: Mountain, packages: packages.filter(p => p.place === 'himachal-pradesh').length },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading domestic packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('/domestic-tour-packages-services.jpg')`
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-10">
              Domestic Packages
            </h1>
            <p className="text-3xl md:text-4xl lg:text-5xl mb-12 opacity-90">
              Explore the incredible beauty of India with our carefully crafted domestic tour packages
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <MapPin className="h-4 w-4 mr-2" />
                {packages.length} Domestic Packages
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Local Expertise
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Popular Destinations in India
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {popularDestinations.map((destination, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <destination.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {destination.packages} Package{destination.packages !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-100 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filter Sidebar */}
              <div className="lg:col-span-1">
                <PackageFilter 
                  onFilterChange={handleFilterChange}
                  packageType="domestic"
                />
              </div>
              
              {/* Packages Grid */}
              <div className="lg:col-span-3">
            {filteredPackages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No domestic packages found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                <Button onClick={() => {
                  setFilters({
                    searchTerm: "",
                    priceRange: [0, 50000],
                    durationRange: [1, 30],
                    location: "domestic",
                    departureCity: [],
                    tourType: [],
                    departBetween: {
                      startDate: "",
                      endDate: ""
                    }
                  });
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredPackages.length} Domestic Package{filteredPackages.length !== 1 ? 's' : ''} Found
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPackages.map((pkg) => (
                    <Card key={pkg._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        {pkg.images && pkg.images.length > 0 ? (
                          <div className="aspect-video relative">
                            <Image
                              src={pkg.images[0].url}
                              alt={pkg.images[0].alt || pkg.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video bg-gray-200 flex items-center justify-center">
                            <Mountain className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                          {formatPrice(pkg.price)}
                        </Badge>
                        <Badge className="absolute top-4 left-4 bg-primary text-white">
                          {pkg.place === 'darjeeling' ? 'Darjeeling' : 
                           pkg.place === 'sikkim' ? 'Sikkim' :
                           pkg.place === 'meghalaya' ? 'Meghalaya' :
                           pkg.place === 'arunachal' ? 'Arunachal' :
                           pkg.place === 'himachal-pradesh' ? 'Himachal Pradesh' :
                           pkg.place === 'kashmir' ? 'Kashmir' :
                           pkg.place === 'leh-ladakh' ? 'Leh Ladakh' : pkg.place}
                        </Badge>
                      </div>
                      
                      <CardHeader>
                        <CardTitle className="text-xl">{pkg.title}</CardTitle>
                        <p className="text-gray-600">{pkg.subtitle}</p>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {pkg.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {pkg.duration}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            {pkg.capacity}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="h-4 w-4 mr-2" />
                            {pkg.rating}/5
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mt-4 line-clamp-3">
                          {pkg.about}
                        </p>
                        
                        <div className="mt-6 flex space-x-2">
                          <Link href={`/packages/${pkg._id}`} className="flex-1">
                            <Button className="w-full">
                              View Details
                            </Button>
                          </Link>
                          <Link href="/contact" className="flex-1">
                            <Button variant="outline" className="w-full">
                              Book Now
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Nepal Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose India for Your Next Adventure?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the unique experiences that make India a must-visit destination
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Mountain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Himalayan Majesty
                </h3>
                <p className="text-gray-600">
                  Home to the majestic Himalayas with stunning peaks and breathtaking landscapes
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Rich Culture
                </h3>
                <p className="text-gray-600">
                  Experience diverse cultures, ancient temples, and warm hospitality
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Adventure Sports
                </h3>
                <p className="text-gray-600">
                  Trekking, rafting, paragliding, and wildlife safaris
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore India?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let us create the perfect India adventure for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Link href="/packages/international">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  View International Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DomesticPackagesPage;
