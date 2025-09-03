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
  images: Array<{
    url: string;
    alt: string;
  }>;
  bookings: number;
  rating: number;
}

const DomesticPackagesPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    filterPackages();
  }, [packages, searchTerm, priceFilter, durationFilter]);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const result = await response.json();
      if (result.success) {
        // Filter for domestic packages (Nepal-based)
        const domesticPackages = result.data.filter((pkg: Package) =>
          pkg.location.toLowerCase().includes('nepal') ||
          pkg.location.toLowerCase().includes('kathmandu') ||
          pkg.location.toLowerCase().includes('pokhara') ||
          pkg.location.toLowerCase().includes('chitwan') ||
          pkg.location.toLowerCase().includes('lumbini') ||
          pkg.location.toLowerCase().includes('everest') ||
          pkg.location.toLowerCase().includes('annapurna')
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
    if (searchTerm) {
      filtered = filtered.filter(pkg =>
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter !== "all") {
      filtered = filtered.filter(pkg => {
        switch (priceFilter) {
          case "under-10k":
            return pkg.price < 10000;
          case "10k-20k":
            return pkg.price >= 10000 && pkg.price < 20000;
          case "20k-30k":
            return pkg.price >= 20000 && pkg.price < 30000;
          case "30k-50k":
            return pkg.price >= 30000 && pkg.price < 50000;
          case "50k-100k":
            return pkg.price >= 50000 && pkg.price < 100000;
          case "over-100k":
            return pkg.price >= 100000;
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
    { name: "Kathmandu Valley", icon: Mountain, packages: packages.filter(p => p.location.toLowerCase().includes('kathmandu')).length },
    { name: "Pokhara", icon: Camera, packages: packages.filter(p => p.location.toLowerCase().includes('pokhara')).length },
    { name: "Chitwan National Park", icon: Heart, packages: packages.filter(p => p.location.toLowerCase().includes('chitwan')).length },
    { name: "Everest Region", icon: Mountain, packages: packages.filter(p => p.location.toLowerCase().includes('everest')).length },
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
      <section className="relative text-white py-32 md:py-40 lg:py-48 overflow-hidden">
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
              Explore the incredible beauty of Nepal with our carefully crafted domestic tour packages
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <MapPin className="h-4 w-4 mr-2" />
                {packages.length} Nepal Packages
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
              Popular Destinations in Nepal
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search domestic packages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Price Filter */}
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-10k">Under ₹10,000</SelectItem>
                  <SelectItem value="10k-20k">₹10,000 - ₹20,000</SelectItem>
                  <SelectItem value="20k-30k">₹20,000 - ₹30,000</SelectItem>
                  <SelectItem value="30k-50k">₹30,000 - ₹50,000</SelectItem>
                  <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="over-100k">Over ₹1,00,000</SelectItem>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No domestic packages found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setPriceFilter("all");
                  setDurationFilter("all");
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
                          Nepal
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
      </section>

      {/* Why Choose Nepal Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Nepal for Your Next Adventure?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the unique experiences that make Nepal a must-visit destination
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
                  Home to 8 of the world's 14 highest peaks, including Mount Everest
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
              Ready to Explore Nepal?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let us create the perfect Nepal adventure for you
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
