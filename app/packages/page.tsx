'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Users, Star, Search, Filter, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  packageCategory: string;
  images: Array<{
    url: string;
    alt: string;
  }>;
  bookings: number;
  rating: number;
}

const PackagesPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    // Check for URL query parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const locationParam = urlParams.get('location');
    const categoryParam = urlParams.get('category');
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    if (locationParam) {
      setLocationFilter(locationParam);
    }
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
    
    // Fetch packages with the search parameter from URL
    const fetchInitialPackages = async () => {
      try {
        const url = searchParam ? `/api/packages?search=${encodeURIComponent(searchParam)}` : '/api/packages';
        const response = await fetch(url);
        const result = await response.json();
        if (result.success) {
          setPackages(result.data);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialPackages();
  }, []);

  // Refetch packages when searchTerm changes
  useEffect(() => {
    if (searchTerm !== undefined) { // Only fetch if searchTerm has been initialized
      fetchPackages();
    }
  }, [searchTerm]);

  // Simple URL parameter check on mount (since we use force refresh now)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    
    if (searchParam && searchParam !== searchTerm) {
      setSearchTerm(searchParam);
    }
  }, []); // Run only on mount

  useEffect(() => {
    filterPackages();
  }, [packages, searchTerm, priceFilter, durationFilter, locationFilter, categoryFilter]);

  const fetchPackages = async () => {
    try {
      // Build URL with search parameter if searchTerm exists
      const url = searchTerm ? `/api/packages?search=${encodeURIComponent(searchTerm)}` : '/api/packages';
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        setPackages(result.data);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPackages = () => {
    let filtered = packages;

    // Price filter
    if (priceFilter !== "all") {
      filtered = filtered.filter(pkg => {
        switch (priceFilter) {
          case "under-50k":
            return pkg.price < 50000;
          case "50k-100k":
            return pkg.price >= 50000 && pkg.price < 100000;
          case "100k-200k":
            return pkg.price >= 100000 && pkg.price < 200000;
          case "over-200k":
            return pkg.price >= 200000;
          default:
            return true;
        }
      });
    }

    // Duration filter
    if (durationFilter !== "all") {
      filtered = filtered.filter(pkg => {
        const duration = pkg.duration.toLowerCase();
        switch (durationFilter) {
          case "short":
            return duration.includes("3") || duration.includes("4") || duration.includes("5");
          case "medium":
            return duration.includes("6") || duration.includes("7") || duration.includes("8") || duration.includes("9") || duration.includes("10");
          case "long":
            return duration.includes("11") || duration.includes("12") || duration.includes("14") || duration.includes("15");
          default:
            return true;
        }
      });
    }

    // Location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter(pkg =>
        pkg.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(pkg => pkg.packageCategory === categoryFilter);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              Tour Packages
            </h1>
            <p className="text-2xl md:text-3xl mb-10 opacity-90">
              Discover amazing destinations with our carefully crafted tour packages
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <MapPin className="h-4 w-4 mr-2" />
                {packages.length} Packages Available
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Best Price Guarantee
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search packages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Adventure">Adventure</SelectItem>
                  <SelectItem value="Wildlife">Wildlife</SelectItem>
                  <SelectItem value="Trekking">Trekking</SelectItem>
                  <SelectItem value="Spiritual">Spiritual</SelectItem>
                  <SelectItem value="Beach">Beach</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                  <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="100k-200k">₹1,00,000 - ₹2,00,000</SelectItem>
                  <SelectItem value="over-200k">Over ₹2,00,000</SelectItem>
                </SelectContent>
              </Select>

              {/* Duration Filter */}
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="short">Short (3-5 days)</SelectItem>
                  <SelectItem value="medium">Medium (6-10 days)</SelectItem>
                  <SelectItem value="long">Long (11+ days)</SelectItem>
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="nepal">Nepal</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="bhutan">Bhutan</SelectItem>
                  <SelectItem value="tibet">Tibet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredPackages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setPriceFilter("all");
                  setDurationFilter("all");
                  setLocationFilter("all");
                  setCategoryFilter("all");
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredPackages.length} Package{filteredPackages.length !== 1 ? 's' : ''} Found
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Filter className="h-4 w-4" />
                    <span>Filtered results</span>
                  </div>
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
                            <MapPin className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute top-4 right-4 space-y-2">
                          <Badge className="bg-white text-gray-900 block">
                            {formatPrice(pkg.price)}
                          </Badge>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary block">
                            {pkg.packageCategory || 'Cultural'}
                          </Badge>
                        </div>
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
                            {pkg.rating}/5 ({pkg.bookings} bookings)
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
                              <Calendar className="h-4 w-4 mr-2" />
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
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We can create a custom package tailored to your specific needs and preferences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Link href="/packages/domestic">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  View Domestic Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;
