import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock } from "lucide-react";
import BestPlaceSection from "@/components/BestPlaceSection";

const DestinationsPage = () => {
  const destinations = [
    {
      id: 1,
      name: "Nepal",
      category: "International",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      description: "Discover the majestic Himalayas and rich cultural heritage of Nepal",
      rating: 4.8,
      duration: "5-12 days",
      highlights: ["Mount Everest", "Kathmandu Valley", "Pokhara Lakes", "Cultural Heritage"]
    },
    {
      id: 2,
      name: "Bali",
      category: "International",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop",
      description: "Experience the tropical paradise with stunning beaches and vibrant culture",
      rating: 4.9,
      duration: "4-8 days",
      highlights: ["Beautiful Beaches", "Rice Terraces", "Hindu Temples", "Volcanic Landscapes"]
    },
    {
      id: 3,
      name: "Vietnam",
      category: "International",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop",
      description: "Explore the diverse landscapes from bustling cities to serene countryside",
      rating: 4.7,
      duration: "6-10 days",
      highlights: ["Ha Long Bay", "Ho Chi Minh City", "Ancient Hoi An", "Mekong Delta"]
    },
    {
      id: 4,
      name: "Andaman",
      category: "Domestic",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
      description: "Pristine beaches and crystal clear waters in India's tropical paradise",
      rating: 4.6,
      duration: "4-7 days",
      highlights: ["Radhanagar Beach", "Cellular Jail", "Water Sports", "Marine Life"]
    },
    {
      id: 5,
      name: "Bhutan",
      category: "International",
      image: "https://images.unsplash.com/photo-1566054757965-e80f2fb03d1c?w=800&h=600&fit=crop",
      description: "The Last Shangri-La with ancient monasteries and pristine nature",
      rating: 4.9,
      duration: "5-8 days",
      highlights: ["Tiger's Nest", "Thimphu", "Gross National Happiness", "Buddhist Culture"]
    },
    {
      id: 6,
      name: "Sikkim",
      category: "Domestic",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      description: "Himalayan beauty with stunning mountain views and monasteries",
      rating: 4.5,
      duration: "4-6 days",
      highlights: ["Kanchenjunga Views", "Gangtok", "Tsomgo Lake", "Rumtek Monastery"]
    },
    {
      id: 7,
      name: "Goa",
      category: "Domestic",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
      description: "India's beach capital with Portuguese heritage and vibrant nightlife",
      rating: 4.4,
      duration: "3-5 days",
      highlights: ["Beach Paradise", "Portuguese Architecture", "Nightlife", "Water Sports"]
    },
    {
      id: 8,
      name: "Darjeeling",
      category: "Domestic",
      image: "https://images.unsplash.com/photo-1478061653917-455ba9be5635?w=800&h=600&fit=crop",
      description: "Famous hill station known for tea gardens and mountain railways",
      rating: 4.3,
      duration: "3-5 days",
      highlights: ["Tea Gardens", "Toy Train", "Tiger Hill", "Himalayan Views"]
    },
    {
      id: 9,
      name: "Meghalaya",
      category: "Domestic",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      description: "The Abode of Clouds with living root bridges and pristine waterfalls",
      rating: 4.7,
      duration: "4-7 days",
      highlights: ["Living Root Bridges", "Cherrapunji", "Shillong", "Waterfalls"]
    }
  ];

  const categories = ["All", "International", "Domestic"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDestinations = selectedCategory === "All" 
    ? destinations 
    : destinations.filter(dest => dest.category === selectedCategory);

  return (
    <div className="min-h-screen bg-travel-light-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=2070&q=80')`
          }}
        ></div>
        {/* Removed overlay */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center space-y-6 fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              Destinations
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Explore our curated list of amazing destinations around the world
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4 scale-in">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="hover-lift"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <Card key={destination.id} className={`overflow-hidden hover-lift bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${index % 3 === 0 ? 'slide-up' : index % 3 === 1 ? 'scale-in' : 'fade-in'}`}>
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-56 object-cover"
                  />
                  <Badge className={`absolute top-4 left-4 ${destination.category === 'International' ? 'bg-primary' : 'bg-secondary'} text-white`}>
                    {destination.category}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{destination.name}</h3>
                      <p className="text-muted-foreground text-sm">{destination.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{destination.category}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Highlights:</h4>
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.slice(0, 3).map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
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

                    <Button className="w-full bg-primary hover:bg-primary/90 hover-lift">
                      Explore {destination.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Best Place Section */}
      <BestPlaceSection 
        subtitle="Explore More"
        title="Discover hidden gems in"
        destination="Northeast India"
        buttonText="EXPLORE NOW"
        buttonLink="/destinations"
      />
    </div>
  );
};

export default DestinationsPage;