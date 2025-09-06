'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Users, Star, Search, Globe, Plane, Camera } from "lucide-react";
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
  packageType: string;
  place: string;
  images: Array<{
    url: string;
    alt: string;
  }>;
  bookings: number;
  rating: number;
}

const InternationalPackagesPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    filterPackages();
  }, [packages, searchTerm, priceFilter, durationFilter, locationFilter]);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const result = await response.json();
      if (result.success) {
        // Filter for international packages based on packageType and legacy destinations
        const internationalPackages = result.data.filter((pkg: Package) =>
          pkg.packageType === 'international' || pkg.place === 'nepal' || pkg.place === 'bhutan'
        );
        setPackages(internationalPackages);
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
          case "10k-25k":
            return pkg.price >= 10000 && pkg.price < 25000;
          case "25k-50k":
            return pkg.price >= 25000 && pkg.price < 50000;
          case "50k-100k":
            return pkg.price >= 50000 && pkg.price < 100000;
          case "100k-200k":
            return pkg.price >= 100000 && pkg.price < 200000;
          case "200k-500k":
            return pkg.price >= 200000 && pkg.price < 500000;
          case "over-500k":
            return pkg.price >= 500000;
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
      filtered = filtered.filter(pkg => {
        const place = pkg.place.toLowerCase();
        return place === locationFilter;
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

  const popularCountries = [
    { name: "Vietnam", icon: Globe, packages: packages.filter(p => p.place === 'vietnam').length },
    { name: "Sri Lanka", icon: Camera, packages: packages.filter(p => p.place === 'sri-lanka').length },
    { name: "Bali", icon: Plane, packages: packages.filter(p => p.place === 'bali').length },
    { name: "Malaysia", icon: Globe, packages: packages.filter(p => p.place === 'malaysia').length },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading international packages...</p>
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
            backgroundImage: `url('/Incredible-Infra-Services-Reviews.jpg')`
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 whitespace-nowrap">
              International Packages
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-12 opacity-90">
              Explore the world with our carefully crafted international tour packages
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Globe className="h-4 w-4 mr-2" />
                {packages.length} International Packages
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Global Destinations
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Countries */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Popular International Destinations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {popularCountries.map((country, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <country.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {country.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {country.packages} Package{country.packages !== 1 ? 's' : ''}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search international packages..."
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
                  <SelectItem value="10k-25k">₹10,000 - ₹25,000</SelectItem>
                  <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                  <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="100k-200k">₹1,00,000 - ₹2,00,000</SelectItem>
                  <SelectItem value="200k-500k">₹2,00,000 - ₹5,00,000</SelectItem>
                  <SelectItem value="over-500k">Over ₹5,00,000</SelectItem>
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
                  <SelectItem value="vietnam">Vietnam</SelectItem>
                  <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                  <SelectItem value="bali">Bali</SelectItem>
                  <SelectItem value="malaysia">Malaysia</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                  <SelectItem value="nepal">Nepal</SelectItem>
                  <SelectItem value="bhutan">Bhutan</SelectItem>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No international packages found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setPriceFilter("all");
                  setDurationFilter("all");
                  setLocationFilter("all");
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredPackages.length} International Package{filteredPackages.length !== 1 ? 's' : ''} Found
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
                            <Globe className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                          {formatPrice(pkg.price)}
                        </Badge>
                        <Badge className="absolute top-4 left-4 bg-primary text-white">
                          {pkg.place === 'vietnam' ? 'Vietnam' : 
                           pkg.place === 'sri-lanka' ? 'Sri Lanka' :
                           pkg.place === 'bali' ? 'Bali' :
                           pkg.place === 'malaysia' ? 'Malaysia' :
                           pkg.place === 'singapore' ? 'Singapore' : pkg.place}
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

      {/* Why Choose International Travel Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose International Travel?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the benefits of exploring destinations beyond Nepal
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Cultural Diversity
                </h3>
                <p className="text-gray-600">
                  Experience different cultures, traditions, and ways of life around the world
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Plane className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Easy Travel
                </h3>
                <p className="text-gray-600">
                  We handle all visa processing, flights, and logistics for a hassle-free experience
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Unique Experiences
                </h3>
                <p className="text-gray-600">
                  Visit iconic landmarks, try exotic cuisines, and create unforgettable memories
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
              Ready to Explore the World?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let us create the perfect international adventure for you
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

export default InternationalPackagesPage;
