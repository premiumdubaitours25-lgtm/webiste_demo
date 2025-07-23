import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Eye, Phone, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const PackagesPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'bhutan'>('all');

  const packages = [
    {
      id: 1,
      title: "4 NIGHTS 5 DAYS BHUTAN FAMILY TOUR PACKAGES",
      description: "The Bhutan Family Tour Packages offer a blend of cultural heritage, natural beauty, and adventure, perfect for families looking to explore this mystical kingdom. With stops in Paro, Thimphu, and…",
      duration: "5D/4N",
      destination: "Bhutan",
      price: "29,999.00",
      originalPrice: "35,999.00",
      discount: "17% OFF",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Cultural Heritage Sites", "Mountain Views", "Traditional Cuisine", "Guided Tours"]
    },
    {
      id: 2,
      title: "20% OFF- BUDGET FRIENDLY 3 NIGHTS / 4 DAYS MEGHALAYA TOUR PACKAGE",
      description: "Embark on a mesmerizing journey to Meghalaya, the \"Abode of Clouds,\" where pristine natural beauty, cascading waterfalls, and unique cultural experiences await. This 3-night, 4-day package offers a perfect mix…",
      duration: "4D/3N",
      destination: "Meghalaya",
      price: "16,500.00",
      originalPrice: "20,625.00",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Living Root Bridges", "Waterfalls", "Cave Exploration", "Local Villages"]
    },
    {
      id: 3,
      title: "EXPLORE THE ENCHANTING KINGDOM OF BHUTAN – 5N/6D",
      description: "Discover Bhutan – The Land of Happiness! Embark on a magical journey to Bhutan, a land where stunning landscapes, ancient monasteries, and vibrant culture come together to create an unforgettable…",
      duration: "6D/5N",
      destination: "Bhutan",
      price: "31,900.00",
      originalPrice: "37,900.00",
      discount: "16% OFF",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Tiger's Nest Monastery", "Thimphu Exploration", "Cultural Immersion", "Mountain Trekking"]
    },
    {
      id: 4,
      title: "ENCHANTING NORTH EAST: 7 NIGHTS/8 DAYS TOUR PACKAGE",
      description: "Immerse yourself in the natural beauty and cultural charm of North East India with this carefully crafted 7-night, 8-day tour. Covering the highlights of Assam and Meghalaya, this itinerary offers…",
      duration: "8D/7N",
      destination: "Meghalaya",
      price: "34,990.00",
      originalPrice: "42,990.00",
      discount: "19% OFF",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Kaziranga National Park", "Shillong Hills", "Tea Gardens", "River Cruises"]
    },
    {
      id: 5,
      title: "50% OFF BUDGET FRIENDLY BHUTAN TOUR: DISCOVER PARO, THIMPHU, & PUNAKHA 4N/5D",
      description: "Experience an all-inclusive 5-Day Bhutan Tour, covering Thimphu, Paro, and Punakha, with rich cultural insights and stunning natural beauty. Bhutan, the last Himalayan kingdom, veiled in mystery and magic…",
      duration: "5D/4N",
      destination: "Bhutan",
      price: "22,500.00",
      originalPrice: "45,000.00",
      discount: "50% OFF",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Punakha Dzong", "Buddha Dordenma", "Weekend Markets", "Fortress Visits"]
    },
    {
      id: 6,
      title: "GOA BEACH PARADISE - 4 NIGHTS 5 DAYS",
      description: "Relax and unwind in the tropical paradise of Goa with its pristine beaches, vibrant nightlife, and rich Portuguese heritage. Perfect for couples and families seeking a beach getaway.",
      duration: "5D/4N",
      destination: "Goa",
      price: "18,999.00",
      originalPrice: "24,999.00",
      discount: "24% OFF",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Beach Activities", "Water Sports", "Heritage Tours", "Sunset Cruises"]
    }
  ];

  const handleBookNow = () => {
    navigate('/contact');
  };

  // Filter logic
  const filteredPackages =
    filter === 'bhutan'
      ? packages.filter((pkg) => pkg.destination === "Bhutan")
      : packages;

  return (
    <div className="min-h-screen bg-travel-light-bg">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Travel Packages"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              Our <span className="text-primary">Packages</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover amazing travel packages designed to create unforgettable memories
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons - Left aligned */}
      <div className="container mx-auto px-4 mt-10 flex justify-start gap-3">
        <Button
          variant={filter === 'bhutan' ? "default" : "outline"}
          className={`flex items-center gap-2 rounded-full px-6 py-2 text-base font-semibold shadow-md ${filter === 'bhutan' ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
          onClick={() => setFilter('bhutan')}
        >
          Bhutan
        </Button>
        <Button
          variant={filter === 'all' ? "default" : "outline"}
          className={`flex items-center gap-2 rounded-full px-6 py-2 text-base font-semibold shadow-md ${filter === 'all' ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
          onClick={() => setFilter('all')}
        >
          Show All
        </Button>
      </div>

      {/* Packages Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <Card key={pkg.id} className={`overflow-hidden hover-lift bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${index % 2 === 0 ? 'slide-up' : 'scale-in'}`}>
                <div className="relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                    {pkg.discount}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-foreground line-clamp-2">
                    {pkg.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{pkg.destination}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {pkg.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-foreground">Package Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.highlights.slice(0, 2).map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {pkg.highlights.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{pkg.highlights.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">₹ {pkg.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₹ {pkg.originalPrice}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <Link to={`/package/${pkg.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 hover-lift"
                    onClick={handleBookNow}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;