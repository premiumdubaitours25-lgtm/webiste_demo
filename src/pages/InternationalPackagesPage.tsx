import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Eye, Phone, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BestPlaceSection from "@/components/BestPlaceSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import PackageFilter from "@/components/PackageFilter";

const InternationalPackagesPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'bhutan' | 'nepal'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    destination: null,
    priceRange: null,
    tourDuration: [1, 15],
    departBetween: { start: null, end: null },
    departureCities: [],
    tourType: null
  });
  
  // Page-specific scroll animations
  const heroAnimation = useScrollAnimation(0.2, 'international-hero');
  const packagesAnimation = useScrollAnimation(0.2, 'international-packages');

  const internationalPackages = [
    {
      id: 1,
      title: "Nepal 3-Star Tour for 3 Nights / 4 Days",
      description: "Discover the enchanting beauty of Nepal with our comprehensive 3N/4D tour covering Chandargiri & Kathmandu. Experience the birthplace of Lord Buddha, stunning Himalayan views, and rich cultural heritage including Pashupatinath Temple, Boudhanath Stupa, and Swayambhunath Monkey Temple.",
      duration: "3N/4D",
      destination: "Nepal",
      price: "9,999.00",
      originalPrice: "12,000.00",
      discount: "17% OFF",
      image: "https://res.cloudinary.com/duh46icya/image/upload/v1756805328/Swayambhunath_or_Monkey_Temple_Kathmandu_hlcvuw.jpg",
      highlights: ["Chandargiri & Kathmandu", "Pashupatinath Temple", "Boudhanath Stupa", "Swayambhunath Monkey Temple", "Kathmandu Durbar Square", "Cultural Heritage"],
      type: "INTERNATIONAL"
    },
    {
      id: 2,
      title: "Bhutan Tour for 3 Nights / 4 Days",
      description: "Experience the mystical kingdom of Bhutan with our comprehensive 3N/4D tour covering Thimphu & Paro. This package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
      duration: "3N/4D",
      destination: "Bhutan",
      price: "18,500.00",
      originalPrice: "22,000.00",
      discount: "16% OFF",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=60",
      highlights: ["Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage", "Guided Tours"],
      type: "INTERNATIONAL"
    },
    {
      id: 3,
      title: "Bhutan Tour for 4 Nights / 5 Days",
      description: "Experience the mystical kingdom of Bhutan with our comprehensive 4N/5D tour covering Phuentsholing, Thimphu & Paro. This extended package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
      duration: "4N/5D",
      destination: "Bhutan",
      price: "59,700.00",
      originalPrice: "75,000.00",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=400&q=60",
      highlights: ["Phuentsholing", "Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage"],
      type: "INTERNATIONAL"
    },
    {
      id: 4,
      title: "Bhutan Tour for 4 Nights / 5 Days - Budget",
      description: "Experience the mystical kingdom of Bhutan with our comprehensive 4N/5D tour covering Phuentsholing, Thimphu & Paro. This package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
      duration: "4N/5D",
      destination: "Bhutan",
      price: "25,200.00",
      originalPrice: "30,000.00",
      discount: "16% OFF",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=400&q=60",
      highlights: ["Phuentsholing", "Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage"],
      type: "INTERNATIONAL"
    },
    {
      id: 5,
      title: "EXPLORE THE ENCHANTING KINGDOM OF BHUTAN – 5N/6D",
      description: "Discover Bhutan – The Land of Happiness! Embark on a magical journey to Bhutan, a land where stunning landscapes, ancient monasteries, and vibrant culture come together to create an unforgettable experience.",
      duration: "6D/5N",
      destination: "Bhutan",
      price: "31,900.00",
      originalPrice: "37,900.00",
      discount: "16% OFF",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=60",
      highlights: ["Tiger's Nest Monastery", "Thimphu Exploration", "Cultural Immersion", "Mountain Trekking"],
      type: "INTERNATIONAL"
    },
    {
      id: 6,
      title: "50% OFF BUDGET FRIENDLY BHUTAN TOUR: DISCOVER PARO, THIMPHU, & PUNAKHA 4N/5D",
      description: "Experience an all-inclusive 5-Day Bhutan Tour, covering Thimphu, Paro, and Punakha, with rich cultural insights and stunning natural beauty. Bhutan, the last Himalayan kingdom, veiled in mystery and magic.",
      duration: "5D/4N",
      destination: "Bhutan",
      price: "22,500.00",
      originalPrice: "45,000.00",
      discount: "50% OFF",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=60",
      highlights: ["Punakha Dzong", "Buddha Dordenma", "Weekend Markets", "Fortress Visits"],
      type: "INTERNATIONAL"
    },
    {
      id: 7,
      title: "Bhutan Luxury Experience - 6 Nights",
      description: "Premium Bhutan tour with luxury accommodations, private guides, and exclusive experiences. Visit the most beautiful monasteries, enjoy traditional Bhutanese hospitality, and create memories that last a lifetime.",
      duration: "6D/5N",
      destination: "Bhutan",
      price: "75,000.00",
      originalPrice: "95,000.00",
      discount: "21% OFF",
      image: "https://images.unsplash.com/photo-1500673922987-e212871f0ed716?auto=format&fit=crop&w=400&q=60",
      highlights: ["Luxury Accommodations", "Private Guides", "Exclusive Experiences", "Traditional Hospitality"],
      type: "INTERNATIONAL"
    }
  ];

  const handleBookNow = () => {
    navigate('/contact');
  };

  // Filter logic - memoized for better performance
  const filteredPackages = React.useMemo(() => {
    let filtered = internationalPackages;
    
    // Basic filter
    if (filter === 'bhutan') {
      filtered = filtered.filter((pkg) => pkg.destination === "Bhutan");
    } else if (filter === 'nepal') {
      filtered = filtered.filter((pkg) => pkg.destination === "Nepal");
    }
    
    // Advanced filters
    if (advancedFilters.destination === 'world') {
      filtered = filtered.filter((pkg) => pkg.type === "INTERNATIONAL");
    }
    
    if (advancedFilters.priceRange) {
      // Parse price range and filter accordingly
      if (advancedFilters.priceRange.includes('₹35,000 - ₹1.5L')) {
        filtered = filtered.filter((pkg) => {
          const price = parseFloat(pkg.price.replace(/,/g, ''));
          return price >= 35000 && price <= 150000;
        });
      } else if (advancedFilters.priceRange.includes('₹1.5L - ₹2.7L')) {
        filtered = filtered.filter((pkg) => {
          const price = parseFloat(pkg.price.replace(/,/g, ''));
          return price >= 150000 && price <= 270000;
        });
      } else if (advancedFilters.priceRange.includes('₹2.7L - ₹3.9L')) {
        filtered = filtered.filter((pkg) => {
          const price = parseFloat(pkg.price.replace(/,/g, ''));
          return price >= 270000 && price <= 390000;
        });
      } else if (advancedFilters.priceRange.includes('₹3.9L & above')) {
        filtered = filtered.filter((pkg) => {
          const price = parseFloat(pkg.price.replace(/,/g, ''));
          return price >= 390000;
        });
      }
    }
    
    if (advancedFilters.tourDuration) {
      const [minDays, maxDays] = advancedFilters.tourDuration;
      filtered = filtered.filter((pkg) => {
        // Handle different duration formats: "4N/5D", "5D/4N", "3N/4D"
        let duration = 0;
        if (pkg.duration.includes('D')) {
          const dayMatch = pkg.duration.match(/(\d+)D/);
          if (dayMatch) {
            duration = parseInt(dayMatch[1]);
          }
        }
        return duration >= minDays && duration <= maxDays;
      });
    }
    
    console.log('Filter:', filter, 'Filtered packages:', filtered.length, 'All packages:', internationalPackages.length);
    return filtered;
  }, [filter, advancedFilters]);

  return (
    <div className="min-h-screen bg-travel-light-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1200&q=60')`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-20">
          <div 
            ref={heroAnimation.ref}
            className={`text-center space-y-6 transition-all duration-1000 ease-out ${
              heroAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white" style={{textShadow: '3px 3px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.8), 0 0 50px rgba(0,0,0,0.7)'}}>
              International <span className="text-secondary">Packages</span>
            </h1>
            <p className="text-xl text-white font-medium max-w-3xl mx-auto" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.7)'}}>
              Discover incredible destinations around the world with our carefully curated international travel packages
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <div className="container mx-auto px-4 mt-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="lg:w-80">
            <div className="lg:hidden mb-4">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              <PackageFilter
                onFilterChange={setAdvancedFilters}
                className="sticky top-6"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:flex-1">
            {/* Basic Filter Buttons */}
            <div className="flex justify-start gap-3 mb-6">
              <Button
                variant={filter === 'nepal' ? "default" : "outline"}
                className={`flex items-center gap-2 rounded-full px-6 py-2 text-base font-semibold shadow-md ${filter === 'nepal' ? 'bg-secondary text-white' : 'bg-white text-secondary border-secondary'}`}
                onClick={() => setFilter('nepal')}
              >
                Nepal
              </Button>
              <Button
                variant={filter === 'bhutan' ? "default" : "outline"}
                className={`flex items-center gap-2 rounded-full px-6 py-2 text-base font-semibold shadow-md ${filter === 'bhutan' ? 'bg-secondary text-white' : 'bg-white text-secondary border-secondary'}`}
                onClick={() => setFilter('bhutan')}
              >
                Bhutan
              </Button>
              <Button
                variant={filter === 'all' ? "default" : "outline"}
                className={`flex items-center gap-2 rounded-full px-6 py-2 text-base font-semibold shadow-md ${filter === 'all' ? 'bg-secondary text-white' : 'bg-white text-secondary border-secondary'}`}
                onClick={() => setFilter('all')}
              >
                Show All
              </Button>
            </div>

            {/* Packages Grid */}
            <section className="py-20">
        <div 
          ref={packagesAnimation.ref}
          className={`container mx-auto px-4 transition-all duration-1000 ease-out ${
            packagesAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <Card key={pkg.id} className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    loading="lazy"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
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
                      <span className="text-2xl font-bold text-secondary">₹ {pkg.price}</span>
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
                    className="w-full bg-secondary hover:bg-secondary/90 hover-lift"
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
        </div>
      </div>
      
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