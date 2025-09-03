'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Star, Clock, Users, Mountain, Camera, Heart, Globe, Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DestinationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const destinations = [
    {
      id: 1,
      name: "Kathmandu Valley",
      country: "Nepal",
      type: "Cultural",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Explore ancient temples, palaces, and rich cultural heritage in the heart of Nepal.",
      highlights: ["Pashupatinath Temple", "Boudhanath Stupa", "Swayambhunath", "Durbar Square"],
      duration: "3-5 days",
      bestTime: "Oct - May",
      rating: 4.8,
      packages: 12
    },
    {
      id: 2,
      name: "Pokhara",
      country: "Nepal",
      type: "Adventure",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Gateway to the Annapurna region with stunning lakes and mountain views.",
      highlights: ["Phewa Lake", "Annapurna Range", "Paragliding", "Trekking"],
      duration: "2-4 days",
      bestTime: "Oct - May",
      rating: 4.9,
      packages: 8
    },
    {
      id: 3,
      name: "Chitwan National Park",
      country: "Nepal",
      type: "Wildlife",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Experience wildlife safaris and see the endangered one-horned rhinoceros.",
      highlights: ["Jungle Safari", "Rhino Spotting", "Bird Watching", "Elephant Ride"],
      duration: "2-3 days",
      bestTime: "Oct - Mar",
      rating: 4.7,
      packages: 6
    },
    {
      id: 4,
      name: "Everest Base Camp",
      country: "Nepal",
      type: "Trekking",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Trek to the base of the world's highest mountain for an unforgettable adventure.",
      highlights: ["Everest Views", "Sherpa Culture", "High Altitude", "Lukla Flight"],
      duration: "12-14 days",
      bestTime: "Mar - May, Sep - Nov",
      rating: 4.9,
      packages: 5
    },
    {
      id: 5,
      name: "Lumbini",
      country: "Nepal",
      type: "Spiritual",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Birthplace of Lord Buddha and a UNESCO World Heritage Site.",
      highlights: ["Maya Devi Temple", "Peace Pagoda", "Monasteries", "Sacred Garden"],
      duration: "1-2 days",
      bestTime: "Oct - Mar",
      rating: 4.6,
      packages: 4
    },
    {
      id: 6,
      name: "Bhutan",
      country: "Bhutan",
      type: "Cultural",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "The Land of the Thunder Dragon with pristine nature and rich Buddhist culture.",
      highlights: ["Tiger's Nest", "Thimphu", "Paro Valley", "Gross National Happiness"],
      duration: "5-7 days",
      bestTime: "Mar - May, Sep - Nov",
      rating: 4.8,
      packages: 7
    },
    {
      id: 7,
      name: "Tibet",
      country: "China",
      type: "Spiritual",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "The roof of the world with ancient monasteries and breathtaking landscapes.",
      highlights: ["Potala Palace", "Mount Kailash", "Lhasa", "Tibetan Culture"],
      duration: "8-12 days",
      bestTime: "May - Oct",
      rating: 4.7,
      packages: 6
    },
    {
      id: 8,
      name: "India - Golden Triangle",
      country: "India",
      type: "Cultural",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Explore Delhi, Agra, and Jaipur to discover India's rich history and culture.",
      highlights: ["Taj Mahal", "Red Fort", "Amber Palace", "Qutub Minar"],
      duration: "6-8 days",
      bestTime: "Oct - Mar",
      rating: 4.6,
      packages: 9
    },
    {
      id: 9,
      name: "Thailand",
      country: "Thailand",
      type: "Beach",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Tropical paradise with beautiful beaches, temples, and vibrant culture.",
      highlights: ["Bangkok", "Phuket", "Chiang Mai", "Floating Markets"],
      duration: "5-10 days",
      bestTime: "Nov - Mar",
      rating: 4.5,
      packages: 8
    }
  ];

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const destinationTypes = [
    { name: "Cultural", icon: Heart, count: destinations.filter(d => d.type === "Cultural").length },
    { name: "Adventure", icon: Mountain, count: destinations.filter(d => d.type === "Adventure").length },
    { name: "Wildlife", icon: Camera, count: destinations.filter(d => d.type === "Wildlife").length },
    { name: "Trekking", icon: Mountain, count: destinations.filter(d => d.type === "Trekking").length },
    { name: "Spiritual", icon: Heart, count: destinations.filter(d => d.type === "Spiritual").length },
    { name: "Beach", icon: Globe, count: destinations.filter(d => d.type === "Beach").length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-32 md:py-40 lg:py-48 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('/thumbnail_2_6_15_6_33_261.webp')`
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-10">
              Destinations
            </h1>
            <p className="text-3xl md:text-4xl lg:text-5xl mb-12 opacity-90">
              Discover amazing destinations across Nepal and beyond
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <MapPin className="h-4 w-4 mr-2" />
                {destinations.length} Destinations
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Globe className="h-4 w-4 mr-2" />
                Multiple Countries
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-lg py-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Destination Types */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Explore by Type
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {destinationTypes.map((type, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                      <type.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {type.name}
                    </h3>
                    <p className="text-xs text-primary font-medium">
                      {type.count} Destination{type.count !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredDestinations.length} Destination{filteredDestinations.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-video relative">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                      {destination.type}
                    </Badge>
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      {destination.country}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{destination.name}</CardTitle>
                    <p className="text-gray-600">{destination.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {destination.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        Best time: {destination.bestTime}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 mr-2" />
                        {destination.rating}/5 ({destination.packages} packages)
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlights:</h4>
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.slice(0, 3).map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {destination.highlights.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{destination.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex space-x-2">
                      <Link href={`/packages?destination=${destination.name}`} className="flex-1">
                        <Button className="w-full">
                          View Packages
                        </Button>
                      </Link>
                      <Button variant="outline" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                <Button onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Destinations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our most popular destinations that travelers love
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.slice(0, 6).map((destination) => (
                <div key={destination.id} className="relative group">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                      <p className="text-sm opacity-90 mb-3">{destination.country}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          {destination.rating}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {destination.packages} packages
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let us help you plan the perfect trip to your dream destination
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  <Plane className="h-5 w-5 mr-2" />
                  View All Packages
                </Button>
              </Link>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;
