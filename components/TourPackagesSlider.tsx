'use client'

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Package {
  _id: string;
  title: string;
  subtitle?: string;
  price: number;
  duration?: string;
  images?: string[];
  packageCategory?: string;
}

const TourPackagesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch packages from database
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Filter for Regular packages only
            const regularPackages = data.data.filter((pkg: Package) => 
              pkg.packageCategory === 'Regular' || 
              pkg.packageCategory?.toLowerCase() === 'regular'
            );
            
            // Take first 5 Regular packages (with or without images - we'll use placeholder if needed)
            const selectedPackages = regularPackages.slice(0, 5);
            setPackages(selectedPackages);
          }
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    if (packages.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % packages.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [packages.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + packages.length) % packages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % packages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Format price in AED
  const formatPrice = (price: number) => {
    return `AED ${price.toLocaleString('en-US')}`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Premium Dubai Tours offers carefully curated tour experiences designed for comfort and luxury.
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our services are accessible to travelers worldwide, with seamless arrangements from arrival to return.
              </p>
            </div>
            <div className="flex items-center justify-center h-[450px]">
              <p className="text-gray-600">Loading packages...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (packages.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Premium Dubai Tours offers carefully curated tour experiences designed for comfort and luxury.
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our services are accessible to travelers worldwide, with seamless arrangements from arrival to return.
              </p>
            </div>
            <div className="flex items-center justify-center h-[450px]">
              <p className="text-gray-600">No packages available at the moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Dubai Tours offers carefully curated tour experiences designed for comfort and luxury.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our services are accessible to travelers worldwide, with seamless arrangements from arrival to return.
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {packages.map((pkg, index) => {
                  // Get the first valid (non-empty) image URL
                  const firstImage = pkg.images && pkg.images.length > 0 ? pkg.images[0] : null;
                  const imageUrl = (typeof firstImage === 'string' && firstImage.trim() !== '')
                    ? firstImage
                    : "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
                  
                  return (
                  <div key={pkg._id} className="w-full flex-shrink-0">
                    <div className="relative h-[350px] md:h-[450px]">
                      {/* Background Image */}
                      <Image
                        src={imageUrl}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40"></div>
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white max-w-2xl px-8">
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            {pkg.title}
                          </h3>
                          {pkg.subtitle && (
                            <p className="text-lg md:text-xl mb-6 opacity-90">
                              {pkg.subtitle}
                            </p>
                          )}
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                              <span className="text-yellow-300 font-semibold text-lg">
                                {formatPrice(pkg.price)}/person
                              </span>
                            </div>
                            {pkg.duration && (
                              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                                <span className="text-white font-medium">
                                  {pkg.duration}
                                </span>
                              </div>
                            )}
                          </div>
                          <Link href={`/packages/${pkg._id}`}>
                            <Button 
                              size="lg" 
                              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg"
                            >
                              Book Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            {packages.length > 1 && (
              <>
                <Button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  size="icon"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  size="icon"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {packages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? "bg-yellow-400 scale-125" 
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TourPackagesSlider;
