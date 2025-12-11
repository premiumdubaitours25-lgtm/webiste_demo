'use client'

import Hero from "../components/Hero";
import ImageCarousel from "../components/ImageCarousel";
import TourPackagesSlider from "../components/TourPackagesSlider";
import MasonryGallery from "../components/MasonryGallery";
import BestPlaceSection from "../components/BestPlaceSection";
import InquiryFormPopup from "../components/InquiryFormPopup";
import FloatingCallButton from "../components/FloatingCallButton";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowRight, MapPin, Package, Book, Phone, MessageCircle, Plane, Calendar, User, Eye, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
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
      name: "Anupam Kumar",
      role: "Adventure Traveler",
      quote: "Our Dubai adventure with Premium Dubai Tours was absolutely incredible! The team was professional, knowledgeable, and made our trip unforgettable. The city tour and desert safari were perfectly organized."
    },
    {
      id: 2,
      name: "Himanshu Sharma",
      role: "Cultural Explorer",
      quote: "The Dubai city tour was amazing! Our guide was so knowledgeable about the history and culture. Premium Dubai Tours really knows how to create authentic experiences. Highly recommended!"
    },
    {
      id: 3,
      name: "Rushabh Nandeshwar",
      role: "Family Traveler",
      quote: "We had the most wonderful family trip to Dubai! The team took care of everything - from hotel bookings to tours. The kids loved every moment. Thank you Premium Dubai Tours for making our dream trip come true!"
    },
    {
      id: 4,
      name: "Deesha Patil",
      role: "Wildlife Enthusiast",
      quote: "The desert safari experience was incredible! The dune bashing, camel rides, and traditional entertainment were amazing. The guides were experts and made sure we had the best experience. Will definitely book with Premium Dubai Tours again!"
    },
    {
      id: 5,
      name: "Abhijjetn Jaiswal",
      role: "Honeymooners",
      quote: "Our honeymoon trip to Dubai was perfect! Premium Dubai Tours arranged everything beautifully - from romantic dinners to luxury experiences. The attention to detail was outstanding. Thank you for making our special trip unforgettable!"
    },
    {
      id: 6,
      name: "Rajesh Dubey",
      role: "Trekking Enthusiast",
      quote: "The Abu Dhabi cultural tour was the experience of a lifetime! Premium Dubai Tours provided excellent support, quality service, and experienced guides. The Sheikh Zayed Mosque and Louvre Abu Dhabi were breathtaking and the experience was worth every penny!"
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
      
    

      {/* Tour Packages Slider Section */}
      <TourPackagesSlider />

      {/* Domestic Packages Section */}
      <section className="pt-8 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div 
            ref={domesticPackagesAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              domesticPackagesAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 px-4">Featured Domestic Packages</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Explore our most popular domestic tour packages featuring Meghalaya, Sikkim, and Darjeeling. Carefully crafted itineraries for an unforgettable Northeast India experience.
            </p>
          </div>
          
          {/* Package Type Selection */}
          <div className="flex justify-center mb-8 sm:mb-12 px-4">
            <div className="flex flex-col sm:flex-row md:justify-center bg-gray-100 rounded-lg p-1 w-full max-w-md sm:max-w-none">
              <Button 
                className="bg-primary text-white hover:bg-primary/90 rounded-md px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base mb-2 sm:mb-0"
                onClick={() => router.push('/packages/domestic')}
              >
                <MapPin className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Domestic Packages
              </Button>
              <Button 
                variant="outline"
                className="sm:ml-2 rounded-md px-4 sm:px-6 py-2 sm:py-3 border-primary text-primary hover:bg-primary hover:text-white text-sm sm:text-base"
                onClick={() => router.push('/packages/international')}
              >
                <Plane className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                International Packages
              </Button>
            </div>
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 px-4">
            {/* Meghalaya Deluxe Tour Package */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push('/packages/68c7d4efaefe5f51c70cb46e')}
            >
              <img 
                src="/Cherrapunji-2.webp" 
                alt="Meghalaya Deluxe Tour" 
                className="w-full h-80 object-cover"
              />
              {/* Overlay Content Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-lg p-3">
                <div className="text-xs uppercase text-gray-500 font-medium mb-1">
                  DOMESTIC
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 uppercase leading-tight">
                Enchanting Meghalaya - 7 Nights / 8 Days Budget Friendly Tour
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  Guwahati, Shillong, Amlarem Dawki, Mawlynnong & Cherrapunjee
                </p>
                <div className="text-sm sm:text-base text-gray-700 font-medium">
                  7N/8D • ₹30,500
                </div>
              </div>
            </div>

            {/* Sikkim Holiday Package */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push('/packages/68c402f0d5fd43494c1e0418')}
            >
              <img 
                src="/photo-1573398643956-2b9e6ade3456.webp" 
                alt="Sikkim Holiday Package" 
                className="w-full h-80 object-cover"
              />
              {/* Overlay Content Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-lg p-3">
                <div className="text-xs uppercase text-gray-500 font-medium mb-1">
                  DOMESTIC
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 uppercase leading-tight">
                  5 Nights 6 Days Gangtok Lachung Holiday Package with Premium 4★ Hotel.
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                Gangtok, Lachung,Tsangmo Lake, Baba Mandir, Nathula Pass.
                </p>
                <div className="text-sm sm:text-base text-gray-700 font-medium">
                  5N/6D • ₹28,500
                </div>
              </div>
            </div>

            {/* Darjeeling Budget Group Package */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push('/packages/68c3d84ab639516ef5e6e84b')}
            >
              <img 
                src="/Darjeeling1_Pranav-Bhasin.avif"
                alt="Darjeeling Budget Group Package" 
                className="w-full h-80 object-cover"
              />
              {/* Overlay Content Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-lg p-3">
                <div className="text-xs uppercase text-gray-500 font-medium mb-1">
                  DOMESTIC
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 uppercase leading-tight">
                  Darjeeling Kalimpong Mirik 4N/5D Luxury Group Package - Comfort & Togetherness
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  Darjeeling, Kalimpong & Mirik
                </p>
                <div className="text-sm sm:text-base text-gray-700 font-medium">
                  4N/5D • ₹15,500
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
              View All Domestic Packages
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
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Dubai Tour Packages - Premium Experiences with Premium Dubai Tours</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore Bhutan, Nepal, Vietnam, and more with our curated international travel packages. Stress-free planning, unforgettable experiences.
            </p>
          </div>
          
          {/* International Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Bhutan Family Tour Package */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push('/packages/68be82161c89905c297e260e')}
            >
              <img 
                src="https://www.expat.com/images/guide-cover/bhutan-hero_size-t1524808170.jpg" 
                alt="Bhutan Family Tour" 
                className="w-full h-80 object-cover"
              />
              {/* Overlay Content Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-lg p-3">
                <div className="text-xs uppercase text-gray-500 font-medium mb-1">
                  INTERNATIONAL
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 uppercase">
                Bhutan 7 Day Travel Package with Thimphu , Punakha & Tigers Nest- Budget Friendly Group Tour Bhutan.
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Explore Dubai with Premium Dubai Tours
                </p>
                <div className="text-xs text-gray-700 font-medium">
                  7D/6N • ₹25,500
                </div>
              </div>
            </div>

            {/* Nepal Adventure Tour Package */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push('/packages/68caaac3788b30a797183ac3')}
            >
              <img 
                src="https://th.bing.com/th/id/OIP.8gXMWvaXt3910oNLiGSOywHaFq?w=204&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
                alt="Nepal Adventure Tour" 
                className="w-full h-80 object-cover"
              />
              {/* Overlay Content Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-lg p-3">
                <div className="text-xs uppercase text-gray-500 font-medium mb-1">
                  INTERNATIONAL
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 uppercase">
                Best of Nepal - 6 Nights / 7 Days - Three Star
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Dubai Tour Packages - Discover the Magic with Premium Dubai Tours
                </p>
                <div className="text-xs text-gray-700 font-medium">
                  6D/5N • ₹22,500
                </div>
              </div>
            </div>

            {/* Vietnam Tour Packages */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push('/packages/68cbef63e35789a3fcfade83')}
            >
              <img 
                src="data:image/webp;base64,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" 
                alt="Vietnam Tour Packages" 
                className="w-full h-80 object-cover"
              />
              {/* Overlay Content Box */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-lg p-3">
                <div className="text-xs uppercase text-gray-500 font-medium mb-1">
                  INTERNATIONAL
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 uppercase">
                Vietnam 6N/7D South to North Tour - 5★ Luxury Package Group Tour-Budget Friendly
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Discover Southeast Asia with Traveller's Paradise
                </p>
                <div className="text-xs text-gray-700 font-medium">
                  6N/7D • ₹63,500
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
              <Book className="ml-2 h-5 w-5" />
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-secondary px-4">What Our Travelers Say</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Hear from our satisfied customers about their amazing experiences with Premium Dubai Tours
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
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                    <Card className="p-4 sm:p-6 md:p-8 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-center mb-4 sm:mb-6">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 fill-current" />
                            ))}
                          </div>
                        </div>
                        <blockquote className="text-gray-700 mb-4 sm:mb-6 md:mb-8 italic text-center text-sm sm:text-base md:text-lg leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{testimonial.name}</h4>
                            <p className="text-gray-600 text-sm sm:text-base">{testimonial.role}</p>
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
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4 bg-white/90 hover:bg-white text-gray-700 border border-gray-200 shadow-lg h-8 w-8 sm:h-10 sm:w-10"
              size="icon"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </Button>
            <Button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4 bg-white/90 hover:bg-white text-gray-700 border border-gray-200 shadow-lg h-8 w-8 sm:h-10 sm:w-10"
              size="icon"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
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
      
      {/* Floating Call Button */}
      <FloatingCallButton />
    </div>
  );
}
