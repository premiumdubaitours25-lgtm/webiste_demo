'use client'

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const TourPackagesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/Thimphu-scaled (1).webp",
      title: "Best of BHUTAN",
      description: "Phuentsholing → Thimphu → Punakha → Paro → Tiger's Nest Hike.",
      price: "₹27,500/person",
      duration: "6N/7D",
      redirectUrl: "/packages/68be80a25a2c1b909c974b1f"
    },
    {
      id: 2,
      image: "/1400__1502124997_Kathmandu6.webp",
      title: "Nepal",
      description: "Explore Kathmandu, Pokhara & Nagarkot.",
      price: "₹9,999/person",
      duration: "4N/5D",
      redirectUrl: "/packages/68caaac3788b30a797183ac3"
    },
    {
      id: 3,
      image: "/Cherrapunji-2.webp",
      title: "Meghalaya",
      description: "Guwahati, Shillong, Amlarem Dawki, Mawlynnong & Cherrapunjee.",
      price: "₹19,900/person",
      duration: "4N/5D",
      redirectUrl: "/packages/68c7d4efaefe5f51c70cb46e"
    },
    {
      id: 4,
      image: "/Darjeeling1_Pranav-Bhasin.avif",
      title: "Darjeeling Budgeted Tour",
      description: "Darjeeling, Kalimpong & Mirik.",
      price: "₹16,500/person",
      duration: "4N/5D",
      redirectUrl: "/packages/68c3d699db2b6c7c9996ba45"
    },
    {
      id: 5,
      image: "/photo-1573398643956-2b9e6ade3456.webp",
      title: "Sikkim",
      description: "Gangtok, Tsangmo Lake & Pelling",
      price: "₹18,500/person",
      duration: "4N/5D",
      redirectUrl: "/packages/68c4024bd5fd43494c1e03d0"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            JJ & TIA Tours and Travels offers All Inclusive tour packages.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No matter where you are in India or around the World, Choose from a wide range of tours, conveniently departing from your city.
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.id} className="w-full flex-shrink-0">
                    <div className="relative h-[350px] md:h-[450px]">
                      {/* Background Image */}
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={slide.id === 1}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40"></div>
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white max-w-2xl px-8">
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            {slide.title}
                          </h3>
                          <p className="text-lg md:text-xl mb-6 opacity-90">
                            {slide.description}
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                              <span className="text-yellow-300 font-semibold text-lg">
                                {slide.price}
                              </span>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                              <span className="text-white font-medium">
                                {slide.duration}
                              </span>
                            </div>
                          </div>
                          <Link href={slide.redirectUrl}>
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
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
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
              {slides.map((_, index) => (
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
          </div>

        </div>
      </div>
    </section>
  );
};

export default TourPackagesSlider;
