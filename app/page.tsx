'use client'

import Hero from "../components/Hero";
import ImageCarousel from "../components/ImageCarousel";
import TourPackagesSlider from "../components/TourPackagesSlider";
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
import { useState } from "react";
import { useInquiryForm } from "../contexts/InquiryFormContext";

export default function Home() {
  const router = useRouter();
  const { isOpen: showInquiryForm, closeForm } = useInquiryForm();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const carouselAnimation = useScrollAnimation(0.1);
  const domesticPackagesAnimation = useScrollAnimation(0.05);
  const internationalPackagesAnimation = useScrollAnimation(0.1);

  const blogsAnimation = useScrollAnimation(0.1);
  const luxuryPackagesAnimation = useScrollAnimation(0.05);
  const testimonialsAnimation = useScrollAnimation(0.1);
  const bestPlaceAnimation = useScrollAnimation(0.1);

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

      {/* Dubai Tour Packages Section (Deluxe) */}
      <section className="pt-12 pb-24 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div
            ref={domesticPackagesAnimation.ref}
            className={`text-center mb-16 transition-all duration-1000 ease-out ${domesticPackagesAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
              }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              The <span className="text-primary italic font-serif">Deluxe</span> Experience
            </h2>
            <div className="w-20 h-1 bg-primary/30 mx-auto mb-6 rounded-full"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed font-light">
              Discover the magic of Dubai with our elegantly curated deluxe packages. From iconic landmarks to hidden cultural gems, experience the city with unmatched grace and value.
            </p>
          </div>

          {/* Package Type Selection */}
          <div className="flex justify-center mb-8 sm:mb-12 px-4">
            <div className="flex flex-col sm:flex-row md:justify-center bg-white shadow-sm border border-gray-100 rounded-xl p-1 w-full max-w-md sm:max-w-none">
              <Button
                className="bg-primary text-white hover:bg-primary/90 rounded-lg px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base mb-2 sm:mb-0 transition-all shadow-md active:scale-95"
                onClick={() => router.push('/packages/international')}
              >
                <Plane className="mr-2 h-4 w-4" />
                Dubai Packages
              </Button>
              <Button
                variant="ghost"
                className="sm:ml-2 rounded-lg px-6 sm:px-8 py-2 sm:py-3 text-gray-600 hover:text-primary hover:bg-primary/5 text-sm sm:text-base border border-transparent"
                onClick={() => router.push('/packages')}
              >
                <Package className="mr-2 h-4 w-4" />
                All Packages
              </Button>
            </div>
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 px-4">
            {/* Dubai City Tour Package */}
            <div
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => router.push('/packages')}
            >
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Dubai City Tour"
                  className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              {/* Overlay Content Box */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/90 font-bold mb-1">
                  BEST SELLER
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 uppercase leading-tight tracking-wide">
                  Dubai City Experience
                </h3>
                <p className="text-xs text-white/80 mb-3 line-clamp-1">
                  Burj Khalifa, Dubai Mall, Dubai Fountain & Marina
                </p>
                <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                  <span className="text-sm text-white font-medium">1 Day</span>
                  <span className="text-sm text-white font-bold text-primary-foreground bg-primary/80 px-2 py-0.5 rounded">AED 5,500</span>
                </div>
              </div>
            </div>

            {/* Desert Safari Package */}
            <div
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => router.push('/packages')}
            >
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Dubai Desert Safari"
                  className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              {/* Overlay Content Box */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/90 font-bold mb-1">
                  ADVENTURE
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 uppercase leading-tight tracking-wide">
                  Ultimate Desert Safari
                </h3>
                <p className="text-xs text-white/80 mb-3 line-clamp-1">
                  Dune Bashing, Camel Ride, BBQ Dinner & Shows
                </p>
                <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                  <span className="text-sm text-white font-medium">Half Day</span>
                  <span className="text-sm text-white font-bold text-primary-foreground bg-primary/80 px-2 py-0.5 rounded">AED 2,500</span>
                </div>
              </div>
            </div>

            {/* Abu Dhabi Tour Package */}
            <div
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => router.push('/packages')}
            >
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Abu Dhabi Tour"
                  className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              {/* Overlay Content Box */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/90 font-bold mb-1">
                  CULTURAL
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 uppercase leading-tight tracking-wide">
                  Abu Dhabi Day Tour
                </h3>
                <p className="text-xs text-white/80 mb-3 line-clamp-1">
                  Sheikh Zayed Grand Mosque & Louvre
                </p>
                <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                  <span className="text-sm text-white font-medium">1 Day</span>
                  <span className="text-sm text-white font-bold text-primary-foreground bg-primary/80 px-2 py-0.5 rounded">AED 4,500</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-10 py-6 rounded-full shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
              onClick={() => router.push('/packages/international')}
            >
              <Package className="mr-2 h-5 w-5" />
              Discover All Packages
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Collection Section */}
      <section className="py-24 bg-gradient-to-b from-white via-zinc-50/50 to-white relative overflow-hidden border-y border-gray-100">
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={luxuryPackagesAnimation.ref}
            className={`text-center mb-16 transition-all duration-1000 ease-out ${luxuryPackagesAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
              }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 tracking-tighter">
              THE <span className="text-primary underline decoration-primary/30 underline-offset-8">PREMIUM</span> COLLECTION
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed font-medium">
              Elevate your journey with our top-tier premium selections. Professional service meets high-end comfort for those who demand excellence in every detail of their Dubai adventure.
            </p>
          </div>

          {/* Premium Package Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
            {/* Package 1 */}
            <div
              className="group relative rounded-3xl overflow-hidden border border-gray-200 bg-white hover:border-primary/50 transition-all duration-700 cursor-pointer shadow-xl hover:shadow-2xl"
              onClick={() => router.push('/packages')}
            >
              <div className="relative h-[450px] overflow-hidden">
                <img
                  src="https://royaldhowcruise.com/wp-content/uploads/2025/06/five-star-mega-yacht-marina-deal-dubai-featuring-lotus-mega-yacht-5-star-dinner-cruise-with-buffet-dinner-live-entertainment-and-sightseeing-of-Dubai-Marina-luxury-cruise.webp"
                  alt="Premium Yacht Dubai"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 pt-0">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="h-[1px] w-8 bg-primary"></div>
                  <span className="text-[10px] tracking-[0.3em] font-bold text-primary uppercase">PREMIUM SERVICE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                  Dubai Marina Premium Cruise
                </h3>
                <p className="text-sm text-gray-300 mb-6 line-clamp-2 font-light">
                  VIP Boarding, Buffet Dining, Live Entertainment & Skyline Views
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-[10px] text-gray-300 uppercase tracking-wider mb-1">Price per person</span>
                    <span className="text-xl font-bold text-white">AED 4,500</span>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-primary/50 flex items-center justify-center group-hover:bg-primary transition-all">
                    <ArrowRight className="h-5 w-5 text-primary group-hover:text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Package 2 */}
            <div
              className="group relative rounded-3xl overflow-hidden border border-gray-200 bg-white hover:border-primary/50 transition-all duration-700 cursor-pointer shadow-xl hover:shadow-2xl"
              onClick={() => router.push('/packages')}
            >
              <div className="relative h-[450px] overflow-hidden">
                <img
                  src="https://www.arabiaweddings.com/sites/default/files/styles/max980/public/listing/2023/12/05/middle_east_desert_safaris_0.jpg?itok=TdvA--qJ"
                  alt="Premium Desert Experience"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 pt-0">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="h-[1px] w-8 bg-primary"></div>
                  <span className="text-[10px] tracking-[0.3em] font-bold text-primary uppercase">ELITE ADVENTURE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                  Premium Dune Safari & Camp
                </h3>
                <p className="text-sm text-gray-300 mb-6 line-clamp-2 font-light">
                  4x4 Desert Thrills, Traditional Welcome & Elite Dining Under Stars
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-[10px] text-gray-300 uppercase tracking-wider mb-1">Price per person</span>
                    <span className="text-xl font-bold text-white">AED 3,200</span>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-primary/50 flex items-center justify-center group-hover:bg-primary transition-all">
                    <ArrowRight className="h-5 w-5 text-primary group-hover:text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Package 3 */}
            <div
              className="group relative rounded-3xl overflow-hidden border border-gray-200 bg-white hover:border-primary/50 transition-all duration-700 cursor-pointer shadow-xl hover:shadow-2xl"
              onClick={() => router.push('/packages')}
            >
              <div className="relative h-[450px] overflow-hidden">
                <img
                  src="data:image/webp;base64,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"
                  alt="Premium City Tour"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 pt-0">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="h-[1px] w-8 bg-primary"></div>
                  <span className="text-[10px] tracking-[0.3em] font-bold text-primary uppercase">CITY ELITE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                  Premium Dubai City Highlights
                </h3>
                <p className="text-sm text-gray-300 mb-6 line-clamp-2 font-light">
                  Chauffeur Driven Tour, Burj Khalifa Entry & Museum tickets
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-[10px] text-gray-300 uppercase tracking-wider mb-1">Price per person</span>
                    <span className="text-xl font-bold text-white">AED 5,800</span>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-primary/50 flex items-center justify-center group-hover:bg-primary transition-all">
                    <ArrowRight className="h-5 w-5 text-primary group-hover:text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold px-12 py-7 rounded-full shadow-lg transition-all active:scale-95"
              onClick={() => router.push('/packages')}
            >
              <Package className="mr-2 h-5 w-5" />
              VIEW ALL PREMIUM OFFERS
            </Button>
          </div>
        </div>
      </section>

      {/* Ultimate Luxury Voyages Section */}
      <section className="py-24 bg-[#0a0a0b] relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-500/20 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={internationalPackagesAnimation.ref}
            className={`text-center mb-16 transition-all duration-1000 ease-out ${internationalPackagesAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
              }`}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tighter">
              ULTIMATE <span className="text-amber-500 underline decoration-amber-500/30 underline-offset-8">LUXURY</span> VOYAGES
            </h2>
            <div className="w-20 h-1 bg-amber-500/20 mx-auto mb-6 rounded-full"></div>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto px-4 leading-relaxed font-light">
              The pinnacle of Arabian opulence. Indulge in exclusive experiences designed for those who seek the extraordinary, from royal retreats to private sky voyages.
            </p>
          </div>

          {/* Luxury Voyages Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {/* Voyage 1 */}
            <div
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all duration-700 cursor-pointer shadow-2xl"
              onClick={() => router.push('/packages')}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Exclusive Dubai Luxury"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-none text-[10px] tracking-widest font-bold">ROYAL CHOICE</Badge>
                  <span className="text-[10px] text-gray-400 font-medium">4N/5D</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">
                  Royal Dubai Palace Retreat - 5 Days
                </h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2 font-light">
                  Palace Stay, Private Butler, Gold-Class Desert Safari & VIP Yacht
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-amber-500 font-bold">AED 45,000</div>
                  <div className="text-gray-400 text-xs flex items-center group-hover:text-amber-500 transition-colors">
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Voyage 2 */}
            <div
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all duration-700 cursor-pointer shadow-2xl"
              onClick={() => router.push('/packages')}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="data:image/webp;base64,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"
                  alt="Premium UAE Journey"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-none text-[10px] tracking-widest font-bold">EXECUTIVE</Badge>
                  <span className="text-[10px] text-gray-400 font-medium">5N/6D</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">
                  Grand Emirates Grandeur - 6 Days
                </h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2 font-light">
                  First-Class Private Jets, Penthouse Suites & 7-Star Dining
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-amber-500 font-bold">AED 55,000</div>
                  <div className="text-gray-400 text-xs flex items-center group-hover:text-amber-500 transition-colors">
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Voyage 3 */}
            <div
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all duration-700 cursor-pointer shadow-2xl"
              onClick={() => router.push('/packages')}
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Sovereign Luxury"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 bg-amber-500 text-[#0a0a0b] text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">SOVEREIGN</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-none text-[10px] tracking-widest font-bold">THE PEAK</Badge>
                  <span className="text-[10px] text-gray-400 font-medium">7N/8D</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">
                  The Sovereign Dubai Estate - 8 Days
                </h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2 font-light">
                  Ultimate Private Island Stay, Helicopter Commutes & Bespoke Concierge
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-amber-500 font-bold">AED 75,000</div>
                  <div className="text-gray-400 text-xs flex items-center group-hover:text-amber-500 transition-colors">
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-[#0a0a0b] font-bold px-12 py-7 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all active:scale-95"
              onClick={() => router.push('/packages/international')}
            >
              EXPLORE ULTIMATE LUXURY
              <Star className="ml-2 h-5 w-5 fill-[#0a0a0b]" />
            </Button>
          </div>
        </div>
      </section>







      {/* Blogs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            ref={blogsAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ease-out ${blogsAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
              }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-secondary">Dubai Travel Blog</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover Dubai through our expert guides, travel tips, and insider stories. Everything you need to know for an unforgettable Dubai experience.
            </p>
          </div>

          {/* Blog Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Blog Card 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="aspect-video relative">
                  <Image
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Top 10 Must-Visit Places in Dubai"
                    fill
                    className="object-cover"
                  />
                </div>
                <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                  Travel Guide
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">Top 10 Must-Visit Places in Dubai for First-Time Travelers</CardTitle>
                <p className="text-gray-600 text-sm line-clamp-3">Discover Dubai's iconic landmarks, from the world's tallest building to man-made islands. Your complete guide to Dubai's must-see attractions.</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    2024-01-15
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    Premium Dubai Tours
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">⏱️</span>
                    8 min read
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Dubai</Badge>
                    <Badge variant="outline" className="text-xs">Travel Guide</Badge>
                    <Badge variant="outline" className="text-xs">Attractions</Badge>
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
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Dubai Desert Safari Experience"
                    fill
                    className="object-cover"
                  />
                </div>
                <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                  Adventure
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">Dubai Desert Safari: Complete Guide to Dune Bashing & More</CardTitle>
                <p className="text-gray-600 text-sm line-clamp-3">Experience the thrill of Dubai's desert safari - from dune bashing to camel rides, traditional entertainment, and BBQ dinners under the stars.</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    2024-01-12
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    Premium Dubai Tours
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">⏱️</span>
                    10 min read
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Desert Safari</Badge>
                    <Badge variant="outline" className="text-xs">Adventure</Badge>
                    <Badge variant="outline" className="text-xs">Dubai</Badge>
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
                    src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Best Time to Visit Dubai"
                    fill
                    className="object-cover"
                  />
                </div>
                <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                  Travel Tips
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">Best Time to Visit Dubai: Weather, Events & Travel Tips</CardTitle>
                <p className="text-gray-600 text-sm line-clamp-3">Plan your perfect Dubai trip! Learn about Dubai's climate, best months to visit, festivals, and tips for making the most of your Dubai experience.</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    2024-01-10
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    Premium Dubai Tours
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">⏱️</span>
                    7 min read
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Dubai</Badge>
                    <Badge variant="outline" className="text-xs">Travel Tips</Badge>
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
            className={`text-center mb-12 transition-all duration-1000 ease-out ${testimonialsAnimation.isVisible
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? "bg-primary" : "bg-gray-300"
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
          className={`transition-all duration-1000 ease-out ${bestPlaceAnimation.isVisible
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
          <h2 className="text-4xl font-bold mb-4">Ready for Your Dubai Adventure?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to start planning your dream trip to Dubai. Experience luxury, adventure, and unforgettable memories with Premium Dubai Tours.
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
      {
        showInquiryForm && (
          <InquiryFormPopup
            isOpen={showInquiryForm}
            onClose={closeForm}
          />
        )
      }

      {/* Floating Call Button */}
      <FloatingCallButton />
    </div>
  );
}
