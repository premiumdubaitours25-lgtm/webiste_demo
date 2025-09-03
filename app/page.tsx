'use client'

import Hero from "../components/Hero";
import ImageCarousel from "../components/ImageCarousel";

import MasonryGallery from "../components/MasonryGallery";
import BestPlaceSection from "../components/BestPlaceSection";
import InquiryFormPopup from "../components/InquiryFormPopup";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowRight, MapPin, Package, BookOpen, Phone, MessageCircle, Plane, Calendar, User, Eye, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const carouselAnimation = useScrollAnimation(0.1);
  const domesticPackagesAnimation = useScrollAnimation(0.05);
  const internationalPackagesAnimation = useScrollAnimation(0.1);

  const blogsAnimation = useScrollAnimation(0.1);
  const testimonialsAnimation = useScrollAnimation(0.1);
  const bestPlaceAnimation = useScrollAnimation(0.1);

  // Show inquiry form popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInquiryForm(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Adventure Traveler",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "Our Nepal adventure with JJ & TIA Tours was absolutely incredible! The team was professional, knowledgeable, and made our trip unforgettable. The Everest Base Camp trek was challenging but the guides made us feel safe throughout."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Cultural Explorer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "The cultural tour of Kathmandu Valley was amazing! Our guide was so knowledgeable about the history and traditions. JJ & TIA Tours really knows how to create authentic experiences. Highly recommended!"
    },
    {
      id: 3,
      name: "David Rodriguez",
      role: "Family Traveler",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "We had the most wonderful family trip to Bhutan! The team took care of everything - from visa processing to accommodation. The kids loved every moment. Thank you JJ & TIA Tours for making our dream trip come true!"
    },
    {
      id: 4,
      name: "Emma Thompson",
      role: "Wildlife Enthusiast",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "The wildlife safari in Chitwan National Park was incredible! We saw rhinos, elephants, and so many birds. The guides were experts and made sure we had the best experience. Will definitely book with JJ & TIA Tours again!"
    },
    {
      id: 5,
      name: "James & Lisa Wilson",
      role: "Honeymooners",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "Our honeymoon trip to Nepal was perfect! JJ & TIA Tours arranged everything beautifully - from romantic dinners to scenic helicopter rides. The attention to detail was outstanding. Thank you for making our special trip unforgettable!"
    },
    {
      id: 6,
      name: "Alex Kumar",
      role: "Trekking Enthusiast",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "The Annapurna Circuit trek was the adventure of a lifetime! JJ & TIA Tours provided excellent support, quality equipment, and experienced guides. The views were breathtaking and the experience was worth every penny!"
    }
  ];

  // Carousel functions
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Image Carousel Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div 
            ref={carouselAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              carouselAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-secondary">Wanderlust in Frames</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Capture the essence of Nepal through our curated collection of breathtaking moments
            </p>
          </div>
          <ImageCarousel />
        </div>
      </section>



      {/* Domestic Packages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div 
            ref={domesticPackagesAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              domesticPackagesAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Explore India with JJ&Tia Tours and Travels</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover handpicked domestic travel packages across India. From hill stations to beaches, we make your holiday seamless and unforgettable.
            </p>
          </div>
          
          {/* Package Type Selection */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button 
                className="bg-primary text-white hover:bg-primary/90 rounded-md px-6 py-3"
                onClick={() => router.push('/packages/domestic')}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Domestic Packages
              </Button>
              <Button 
                variant="outline"
                className="ml-2 rounded-md px-6 py-3 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => router.push('/packages/international')}
              >
                <Plane className="mr-2 h-4 w-4" />
                International Packages
              </Button>
            </div>
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Darjeeling & Sikkim Package */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push('/packages/domestic')}
            >
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Darjeeling & Sikkim" 
                className="w-full h-80 object-cover"
              />
              {/* Overlay Content Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-lg p-6">
                <div className="text-xs uppercase text-gray-500 font-medium mb-2">
                  DOMESTIC
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase">
                  DISCOVER THE MAGIC OF DARJEELING & SIKKIM
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Himalayan Heritage & Tea Gardens
                </p>
                <div className="text-sm text-gray-700 font-medium">
                  6D/5N • ₹24,999
                </div>
              </div>
            </div>

            {/* Seven Sisters Package */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push('/packages/domestic')}
            >
              <img 
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Seven Sisters" 
                className="w-full h-80 object-cover"
              />
              {/* Overlay Content Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-lg p-6">
                <div className="text-xs uppercase text-gray-500 font-medium mb-2">
                  DOMESTIC
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase">
                  SEVEN SISTERS, ONE EPIC ADVENTURE
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Northeast India's Natural Wonders
                </p>
                <div className="text-sm text-gray-700 font-medium">
                  4D/3N • ₹16,500
                </div>
              </div>
            </div>

            {/* Leh Ladakh Package */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push('/packages/domestic')}
            >
              <img 
                src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Leh Ladakh" 
                className="w-full h-80 object-cover"
              />
              {/* Overlay Content Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-lg p-6">
                <div className="text-xs uppercase text-gray-500 font-medium mb-2">
                  DOMESTIC
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase">
                  LEH LADAKH
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  High Altitude Desert Adventure
                </p>
                <div className="text-sm text-gray-700 font-medium">
                  5D/4N • ₹18,999
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => router.push('/packages/domestic')}
            >
              <Package className="mr-2 h-5 w-5" />
              View Domestic Packages
            </Button>
          </div>
        </div>
      </section>

      {/* International Packages Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div 
            ref={internationalPackagesAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              internationalPackagesAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">International Tour Packages Global Adventures with JJ&Tia Tours and Travels</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore Bhutan, Nepal, Vietnam, and more with our curated international travel packages. Stress-free planning, unforgettable experiences.
            </p>
          </div>
          
          {/* International Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Bhutan Family Tour Package */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push('/packages/international')}
            >
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Bhutan Family Tour" 
                className="w-full h-80 object-cover"
              />
              {/* Overlay Content Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-lg p-6">
                <div className="text-xs uppercase text-gray-500 font-medium mb-2">
                  INTERNATIONAL
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase">
                  BHUTAN FAMILY TOUR
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  The Land of Happiness with JJ&Tia Tours and Travels
                </p>
                <div className="text-sm text-gray-700 font-medium">
                  5D/4N • ₹29,999
                </div>
              </div>
            </div>

            {/* Nepal Adventure Tour Package */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push('/packages/international')}
            >
              <img 
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Nepal Adventure Tour" 
                className="w-full h-80 object-cover"
              />
              {/* Overlay Content Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-lg p-6">
                <div className="text-xs uppercase text-gray-500 font-medium mb-2">
                  INTERNATIONAL
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase">
                  NEPAL ADVENTURE TOUR
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Nepal Tour Packages Explore the Himalayas with JJ&Tia Tours and Travels
                </p>
                <div className="text-sm text-gray-700 font-medium">
                  6D/5N • ₹35,500
                </div>
              </div>
            </div>

            {/* Vietnam Tour Packages */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push('/packages/international')}
            >
              <img 
                src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Vietnam Tour Packages" 
                className="w-full h-80 object-cover"
              />
              {/* Overlay Content Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-lg p-6">
                <div className="text-xs uppercase text-gray-500 font-medium mb-2">
                  INTERNATIONAL
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase">
                  VIETNAM TOUR PACKAGES
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Discover Southeast Asia with Traveller's Paradise
                </p>
                <div className="text-sm text-gray-700 font-medium">
                  7D/6N • ₹42,990
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => router.push('/packages/international')}
            >
              <Plane className="mr-2 h-5 w-5" />
              View International Packages
            </Button>
          </div>
        </div>
      </section>



     



      {/* Blogs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div 
            ref={blogsAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              blogsAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-secondary">Travel Blog</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read our latest travel tips, destination guides, and adventure stories
            </p>
          </div>
          
          {/* Blog Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Blog Card 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="aspect-video relative">
                  <Image
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="10 Must-Visit Places in Nepal"
                    fill
                    className="object-cover"
                  />
                </div>
                <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                  Travel Guide
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">10 Must-Visit Places in Nepal for First-Time Travelers</CardTitle>
                <p className="text-gray-600 text-sm line-clamp-3">Discover the most beautiful and culturally rich destinations in Nepal that every first-time visitor should experience.</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    2024-01-15
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    Rajesh Sharma
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">⏱️</span>
                    8 min read
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Nepal</Badge>
                    <Badge variant="outline" className="text-xs">Travel Guide</Badge>
                    <Badge variant="outline" className="text-xs">First Time</Badge>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      1,250
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      89
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blog Card 2 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="aspect-video relative">
                  <Image
                    src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Everest Base Camp Trek"
                    fill
                    className="object-cover"
                  />
                </div>
                <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                  Adventure
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">Everest Base Camp Trek: A Complete Guide for Beginners</CardTitle>
                <p className="text-gray-600 text-sm line-clamp-3">Everything you need to know about trekking to Everest Base Camp, from preparation to what to expect on the trail.</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    2024-01-12
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    Priya Thapa
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">⏱️</span>
                    12 min read
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Everest</Badge>
                    <Badge variant="outline" className="text-xs">Trekking</Badge>
                    <Badge variant="outline" className="text-xs">Adventure</Badge>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      2,100
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      156
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blog Card 3 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="aspect-video relative">
                  <Image
                    src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Best Time to Visit Nepal"
                    fill
                    className="object-cover"
                  />
                </div>
                <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                  Travel Tips
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">Best Time to Visit Nepal: Weather and Seasons Guide</CardTitle>
                <p className="text-gray-600 text-sm line-clamp-3">Learn about Nepal's climate and find the perfect time to visit based on your travel preferences and activities.</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    2024-01-10
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    Amit Gurung
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">⏱️</span>
                    6 min read
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Weather</Badge>
                    <Badge variant="outline" className="text-xs">Seasons</Badge>
                    <Badge variant="outline" className="text-xs">Best Time</Badge>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      980
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      67
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => router.push('/blogs')}
            >
              Read Our Blog
              <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div 
            ref={testimonialsAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              testimonialsAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-secondary">What Our Travelers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied customers about their amazing experiences with JJ & TIA Tours
            </p>
          </div>
          
          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <Card className="p-8 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-center mb-6">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-6 w-6 fill-current" />
                            ))}
                          </div>
                        </div>
                        <blockquote className="text-gray-700 mb-8 italic text-center text-lg leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                            <p className="text-gray-600">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white text-gray-700 border border-gray-200 shadow-lg"
              size="icon"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white text-gray-700 border border-gray-200 shadow-lg"
              size="icon"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best Places Section */}
      <section className="py-0">
        <div 
          ref={bestPlaceAnimation.ref}
          className={`transition-all duration-1000 ease-out ${
            bestPlaceAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <BestPlaceSection />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to start planning your dream trip to Nepal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 font-semibold"
              onClick={() => router.push('/contact')}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Now
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => router.push('/contact')}
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => router.push('/packages')}
            >
              <Package className="mr-2 h-5 w-5" />
              View Packages
            </Button>
          </div>
        </div>
      </section>

      {/* Inquiry Form Popup */}
      {showInquiryForm && (
        <InquiryFormPopup 
          isOpen={showInquiryForm} 
          onClose={() => setShowInquiryForm(false)} 
        />
      )}
    </div>
  );
}
