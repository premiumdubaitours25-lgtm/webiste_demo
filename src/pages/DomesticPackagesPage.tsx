import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Eye, Phone, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BestPlaceSection from "@/components/BestPlaceSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import PackageFilter from "@/components/PackageFilter";

const DomesticPackagesPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'sikkim'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    destination: null,
    priceRange: null,
    tourDuration: [5, 13],
    departBetween: { start: null, end: null },
    departureCities: [],
    tourType: null
  });
  
  // Page-specific scroll animations
  const heroAnimation = useScrollAnimation(0.2, 'domestic-hero');
  const packagesAnimation = useScrollAnimation(0.2, 'domestic-packages');

  const domesticPackages = [
    {
      id: 1,
      title: "Sikkim Darjeeling Gangtok Tour Package",
      description: "Experience the beauty of the Eastern Himalayas with our comprehensive Sikkim and Darjeeling tour. Visit the capital city of Gangtok, explore the tea gardens of Darjeeling, and witness the majestic Kanchenjunga.",
      duration: "6D/5N",
      destination: "Sikkim",
      price: "24,999.00",
      originalPrice: "32,000.00",
      discount: "22% OFF",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=400&q=60",
      highlights: ["Gangtok City Tour", "Darjeeling Tea Gardens", "Kanchenjunga View", "Buddhist Monasteries"],
      type: "DOMESTIC"
    },
    {
      id: 2,
      title: "Sikkim Adventure Package - 4 Nights",
      description: "Embark on an adventurous journey through Sikkim with trekking, river rafting, and mountain biking. Perfect for adventure enthusiasts seeking thrill in the lap of Himalayas.",
      duration: "4D/3N",
      destination: "Sikkim",
      price: "18,500.00",
      originalPrice: "25,000.00",
      discount: "26% OFF",
      image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15?auto=format&fit=crop&w=400&q=60",
      highlights: ["Trekking", "River Rafting", "Mountain Biking", "Camping"],
      type: "DOMESTIC"
    },
    {
      id: 3,
      title: "Sikkim Cultural Heritage Tour",
      description: "Immerse yourself in the rich cultural heritage of Sikkim. Visit ancient monasteries, explore local markets, and experience the traditional lifestyle of the Sikkimese people.",
      duration: "5D/4N",
      destination: "Sikkim",
      price: "21,999.00",
      originalPrice: "28,500.00",
      discount: "23% OFF",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=60",
      highlights: ["Monastery Visits", "Local Markets", "Cultural Shows", "Traditional Cuisine"],
      type: "DOMESTIC"
    },
    {
      id: 4,
      title: "Sikkim Luxury Retreat Package",
      description: "Experience luxury in the lap of nature with our premium Sikkim package. Stay in luxury resorts, enjoy spa treatments, and indulge in gourmet dining with mountain views.",
      duration: "7D/6N",
      destination: "Sikkim",
      price: "45,999.00",
      originalPrice: "58,000.00",
      discount: "21% OFF",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=400&q=60",
      highlights: ["Luxury Resorts", "Spa Treatments", "Gourmet Dining", "Private Tours"],
      type: "DOMESTIC"
    },
    {
      id: 5,
      title: "Sikkim Family Package - 5 Nights",
      description: "Perfect family getaway to Sikkim with kid-friendly activities, comfortable accommodations, and guided tours suitable for all age groups. Create lasting memories with your loved ones.",
      duration: "5D/4N",
      destination: "Sikkim",
      price: "32,500.00",
      originalPrice: "42,000.00",
      discount: "23% OFF",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=400&q=60",
      highlights: ["Kid-friendly Activities", "Family Tours", "Comfortable Stays", "Guided Tours"],
      type: "DOMESTIC"
    },
    {
      id: 6,
      title: "Sikkim Honeymoon Special Package",
      description: "Romantic getaway to Sikkim with candlelight dinners, couple spa sessions, and private mountain view rooms. Perfect for newlyweds seeking a romantic escape.",
      duration: "6D/5N",
      destination: "Sikkim",
      price: "38,999.00",
      originalPrice: "52,000.00",
      discount: "25% OFF",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=60",
      highlights: ["Candlelight Dinners", "Couple Spa", "Private Rooms", "Romantic Tours"],
      type: "DOMESTIC"
    }
  ];

  const handleBookNow = () => {
    navigate('/contact');
  };

  // Filter logic - memoized for better performance
  const filteredPackages = React.useMemo(() => {
    let filtered = domesticPackages;
    
    // Basic filter
    if (filter === 'sikkim') {
      filtered = filtered.filter((pkg) => pkg.destination === "Sikkim");
    }
    
    // Advanced filters
    if (advancedFilters.destination === 'india') {
      filtered = filtered.filter((pkg) => pkg.type === "DOMESTIC");
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
        const duration = parseInt(pkg.duration.split('D')[0]);
        return duration >= minDays && duration <= maxDays;
      });
    }
    
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
            backgroundImage: `url('https://images.unsplash.com/photo-1438565434616-3ef039228b15?auto=format&fit=crop&w=1200&q=60')`
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
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              Domestic <span className="text-secondary">Packages</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Explore the incredible beauty of India with our carefully curated domestic travel packages
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
                variant={filter === 'sikkim' ? "default" : "outline"}
                className={`flex items-center gap-2 rounded-full px-6 py-2 text-base font-semibold shadow-md ${filter === 'sikkim' ? 'bg-secondary text-white' : 'bg-white text-secondary border-secondary'}`}
                onClick={() => setFilter('sikkim')}
              >
                Sikkim
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
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
              ))}
            </div>
          ) : (
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
          )}
        </div>
            </section>
          </div>
        </div>
      </div>
      
      {/* Best Place Section */}
      <BestPlaceSection 
        subtitle="Discover India"
        title="Explore amazing destinations in"
        destination="Sikkim & Beyond"
        buttonText="VIEW ALL PACKAGES"
        buttonLink="/packages"
      />
    </div>
  );
};

export default DomesticPackagesPage; 