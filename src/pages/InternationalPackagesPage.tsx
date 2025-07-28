import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Eye, Phone, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BestPlaceSection from "@/components/BestPlaceSection";

const InternationalPackagesPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'bhutan'>('all');

  const internationalPackages = [
    {
      id: 1,
      title: "Bhutan Tour for 3 Nights / 4 Days",
      description: "Experience the mystical kingdom of Bhutan with our comprehensive 3N/4D tour covering Thimphu & Paro. This package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
      duration: "3N/4D",
      destination: "Bhutan",
      price: "18,500.00",
      originalPrice: "22,000.00",
      discount: "16% OFF",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage", "Guided Tours"],
      type: "INTERNATIONAL"
    },
    {
      id: 2,
      title: "Bhutan Tour for 4 Nights / 5 Days",
      description: "Experience the mystical kingdom of Bhutan with our comprehensive 4N/5D tour covering Phuentsholing, Thimphu & Paro. This extended package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
      duration: "4N/5D",
      destination: "Bhutan",
      price: "59,700.00",
      originalPrice: "75,000.00",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Phuentsholing", "Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage"],
      type: "INTERNATIONAL"
    },
    {
      id: 3,
      title: "Bhutan Tour for 4 Nights / 5 Days - Budget",
      description: "Experience the mystical kingdom of Bhutan with our comprehensive 4N/5D tour covering Phuentsholing, Thimphu & Paro. This package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
      duration: "4N/5D",
      destination: "Bhutan",
      price: "25,200.00",
      originalPrice: "30,000.00",
      discount: "16% OFF",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Phuentsholing", "Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage"],
      type: "INTERNATIONAL"
    },
    {
      id: 4,
      title: "EXPLORE THE ENCHANTING KINGDOM OF BHUTAN – 5N/6D",
      description: "Discover Bhutan – The Land of Happiness! Embark on a magical journey to Bhutan, a land where stunning landscapes, ancient monasteries, and vibrant culture come together to create an unforgettable experience.",
      duration: "6D/5N",
      destination: "Bhutan",
      price: "31,900.00",
      originalPrice: "37,900.00",
      discount: "16% OFF",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Tiger's Nest Monastery", "Thimphu Exploration", "Cultural Immersion", "Mountain Trekking"],
      type: "INTERNATIONAL"
    },
    {
      id: 5,
      title: "50% OFF BUDGET FRIENDLY BHUTAN TOUR: DISCOVER PARO, THIMPHU, & PUNAKHA 4N/5D",
      description: "Experience an all-inclusive 5-Day Bhutan Tour, covering Thimphu, Paro, and Punakha, with rich cultural insights and stunning natural beauty. Bhutan, the last Himalayan kingdom, veiled in mystery and magic.",
      duration: "5D/4N",
      destination: "Bhutan",
      price: "22,500.00",
      originalPrice: "45,000.00",
      discount: "50% OFF",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Punakha Dzong", "Buddha Dordenma", "Weekend Markets", "Fortress Visits"],
      type: "INTERNATIONAL"
    },
    {
      id: 6,
      title: "Bhutan Luxury Experience - 6 Nights",
      description: "Premium Bhutan tour with luxury accommodations, private guides, and exclusive experiences. Visit the most beautiful monasteries, enjoy traditional Bhutanese hospitality, and create memories that last a lifetime.",
      duration: "6D/5N",
      destination: "Bhutan",
      price: "75,000.00",
      originalPrice: "95,000.00",
      discount: "21% OFF",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Luxury Accommodations", "Private Guides", "Exclusive Experiences", "Traditional Hospitality"],
      type: "INTERNATIONAL"
    }
  ];

  const handleBookNow = () => {
    navigate('/contact');
  };

  // Filter logic
  const filteredPackages =
    filter === 'bhutan'
      ? internationalPackages.filter((pkg) => pkg.destination === "Bhutan")
      : internationalPackages;

  return (
    <div className="min-h-screen bg-travel-light-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=2070&q=80')`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center space-y-6 fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              International <span className="text-primary">Packages</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover incredible destinations around the world with our carefully curated international travel packages
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
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
                  <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                    {pkg.type}
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
      
      {/* Best Place Section */}
      <BestPlaceSection 
        subtitle="Discover the World"
        title="Explore amazing destinations in"
        destination="Bhutan & Beyond"
        buttonText="VIEW ALL PACKAGES"
        buttonLink="/packages"
      />
    </div>
  );
};

export default InternationalPackagesPage; 