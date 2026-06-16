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
import { ArrowRight, MapPin, Package, Book, Phone, MessageCircle, Plane, Calendar, User, Eye, Heart, Star, ChevronLeft, ChevronRight, Clock, Car } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { useInquiryForm } from "../contexts/InquiryFormContext";

interface PackageImage {
  url: string;
  alt?: string;
}

interface DeluxePackage {
  _id: string;
  title: string;
  subtitle?: string;
  price: number;
  duration?: string;
  images?: Array<PackageImage | string>;
  packageCategory?: string;
}

interface PremiumPackage {
  _id: string;
  title: string;
  subtitle?: string;
  price: number;
  duration?: string;
  images?: Array<PackageImage | string>;
  packageCategory?: string;
}

interface LuxuryPackage {
  _id: string;
  title: string;
  subtitle?: string;
  price: number;
  duration?: string;
  images?: Array<PackageImage | string>;
  packageCategory?: string;
}

export default function Home() {
  const router = useRouter();
  const { isOpen: showInquiryForm, closeForm } = useInquiryForm();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [deluxePackages, setDeluxePackages] = useState<DeluxePackage[]>([]);
  const [loadingDeluxe, setLoadingDeluxe] = useState(true);
  const [premiumPackages, setPremiumPackages] = useState<PremiumPackage[]>([]);
  const [loadingPremium, setLoadingPremium] = useState(true);
  const [luxuryPackages, setLuxuryPackages] = useState<LuxuryPackage[]>([]);
  const [loadingLuxury, setLoadingLuxury] = useState(true);
  const [testimonials, setTestimonials] = useState<Array<{
    _id: string;
    name: string;
    role: string;
    quote: string;
    rating: number;
    image?: string;
  }>>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [blogs, setBlogs] = useState<Array<{
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    authorImage?: string;
    publishDate: string;
    readTime: string;
    category: string;
    image: string;
    views: number;
    likes: number;
    tags: string[];
  }>>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  const carouselAnimation = useScrollAnimation(0.1);
  const domesticPackagesAnimation = useScrollAnimation(0.05);
  const internationalPackagesAnimation = useScrollAnimation(0.1);

  const blogsAnimation = useScrollAnimation(0.1);
  const luxuryPackagesAnimation = useScrollAnimation(0.05);
  const testimonialsAnimation = useScrollAnimation(0.1);
  const bestPlaceAnimation = useScrollAnimation(0.1);

  // Fetch Testimonials from database
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoadingTestimonials(true);
        const response = await fetch('/api/testimonials');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setTestimonials(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoadingTestimonials(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Fetch Blogs from database
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoadingBlogs(true);
        const response = await fetch('/api/blogs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Limit to 3 blogs for home page
            const blogsArray = Array.isArray(data.data) ? data.data : [];
            setBlogs(blogsArray.slice(0, 3));
          } else {
            setBlogs([]);
          }
        } else {
          console.error('Failed to fetch blogs:', response.status, response.statusText);
          setBlogs([]);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  // Carousel functions
  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  // Fetch Deluxe packages from database
  useEffect(() => {
    const fetchDeluxePackages = async () => {
      try {
        const response = await fetch('/api/packages');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Filter for Deluxe packages and limit to 3
            const deluxe = data.data
              .filter((pkg: DeluxePackage) => 
                pkg.packageCategory === 'Deluxe' || 
                pkg.packageCategory?.toLowerCase() === 'deluxe'
              )
              .slice(0, 3);
            setDeluxePackages(deluxe);
          }
        }
      } catch (error) {
        console.error('Error fetching deluxe packages:', error);
      } finally {
        setLoadingDeluxe(false);
      }
    };

    fetchDeluxePackages();
  }, []);

  // Format price in AED
  const formatPrice = (price: number) => {
    return `AED ${price.toLocaleString('en-US')}`;
  };

  // Get image URL with fallback
  const getImageUrl = (pkg: DeluxePackage | PremiumPackage | LuxuryPackage) => {
    if (pkg.images && pkg.images.length > 0) {
      const firstImage = pkg.images[0];
      if (typeof firstImage === 'string' && firstImage.trim() !== '') {
        return firstImage;
      }
      if (typeof firstImage === 'object' && firstImage?.url) {
        return firstImage.url;
      }
    }
    return "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  };

  // Fetch Premium packages from database
  useEffect(() => {
    const fetchPremiumPackages = async () => {
      try {
        const response = await fetch('/api/packages');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Filter for Premium packages and limit to 3
            const premium = data.data
              .filter((pkg: PremiumPackage) => 
                pkg.packageCategory === 'Premium' || 
                pkg.packageCategory?.toLowerCase() === 'premium'
              )
              .slice(0, 3);
            setPremiumPackages(premium);
          }
        }
      } catch (error) {
        console.error('Error fetching premium packages:', error);
      } finally {
        setLoadingPremium(false);
      }
    };

    fetchPremiumPackages();
  }, []);

  // Fetch Luxury packages from database
  useEffect(() => {
    const fetchLuxuryPackages = async () => {
      try {
        const response = await fetch('/api/packages');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Filter for Luxury packages and limit to 3
            const luxury = data.data
              .filter((pkg: LuxuryPackage) => 
                pkg.packageCategory === 'Luxury' || 
                pkg.packageCategory?.toLowerCase() === 'luxury'
              )
              .slice(0, 3);
            setLuxuryPackages(luxury);
          }
        }
      } catch (error) {
        console.error('Error fetching luxury packages:', error);
      } finally {
        setLoadingLuxury(false);
      }
    };

    fetchLuxuryPackages();
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Tour Packages Slider Section */}
      <TourPackagesSlider />

      

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
              A curated selection of elevated travel experiences designed around comfort, privacy, and refined service. Each journey reflects our commitment to thoughtful planning and exceptional care.
            </p>
          </div>

          {/* Premium Package Cards */}
          {loadingPremium ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
              <div className="flex items-center justify-center h-[450px] col-span-3">
                <p className="text-gray-600">Loading premium packages...</p>
              </div>
            </div>
          ) : premiumPackages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
              {premiumPackages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="group relative rounded-3xl overflow-hidden border border-gray-200 bg-white hover:border-primary/50 transition-all duration-700 cursor-pointer shadow-xl hover:shadow-2xl"
                  onClick={() => router.push(`/packages/${pkg._id}`)}
                >
                  <div className="relative h-[450px] overflow-hidden">
                    <img
                      src={getImageUrl(pkg)}
                      alt={pkg.title}
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
                      {pkg.title}
                    </h3>
                    {pkg.subtitle && (
                      <p className="text-sm text-gray-300 mb-6 line-clamp-2 font-light">
                        {pkg.subtitle}
                      </p>
                    )}
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="block text-[10px] text-gray-300 uppercase tracking-wider mb-1">Price per person</span>
                        <span className="text-xl font-bold text-white">{formatPrice(pkg.price)}</span>
                      </div>
                      <div className="h-12 w-12 rounded-full border border-primary/50 flex items-center justify-center group-hover:bg-primary transition-all">
                        <ArrowRight className="h-5 w-5 text-primary group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
              <div className="flex items-center justify-center h-[450px] col-span-3">
                <p className="text-gray-600">No Premium packages available at the moment.</p>
              </div>
            </div>
          )}

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
              SIGNATURE <span className="text-amber-500 underline decoration-amber-500/30 underline-offset-8">LUXURY</span> JOURNEYS
            </h2>
            <div className="w-20 h-1 bg-amber-500/20 mx-auto mb-6 rounded-full"></div>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto px-4 leading-relaxed font-light">
             Highly curated travel experiences defined by privacy, comfort, and seamless execution.
            </p>
          </div>

          {/* Luxury Voyages Cards */}
          {loadingLuxury ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
              <div className="flex items-center justify-center h-[600px] col-span-3">
                <p className="text-gray-400">Loading luxury packages...</p>
              </div>
            </div>
          ) : luxuryPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
              {luxuryPackages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-amber-500/50 transition-all duration-700 cursor-pointer shadow-2xl"
                  onClick={() => router.push(`/packages/${pkg._id}`)}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={getImageUrl(pkg)}
                      alt={pkg.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-none text-[10px] tracking-widest font-bold">LUXURY</Badge>
                      {pkg.duration && (
                        <span className="text-[10px] text-gray-400 font-medium">{pkg.duration}</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">
                      {pkg.title}
                    </h3>
                    {pkg.subtitle && (
                      <p className="text-sm text-gray-400 mb-6 line-clamp-2 font-light">
                        {pkg.subtitle}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="text-amber-500 font-bold">{formatPrice(pkg.price)}</div>
                      <div className="text-gray-400 text-xs flex items-center group-hover:text-amber-500 transition-colors">
                        View Details <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
              <div className="flex items-center justify-center h-[600px] col-span-3">
                <p className="text-gray-400">No Luxury packages available at the moment.</p>
              </div>
            </div>
          )}

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
              Insights, local knowledge, and practical advice that help you to plan your Dubai and the UAE journey with confidence.
            </p>
          </div>

          {/* Blog Cards */}
          {loadingBlogs ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center justify-center h-96 col-span-3">
                <p className="text-gray-600">Loading blogs...</p>
              </div>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog) => (
                <Card 
                  key={blog._id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(`/blogs/${blog._id}`)}
                >
                  <div className="relative">
                    <div className="aspect-video relative">
                      <Image
                        src={blog.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                      {blog.category}
                    </Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-3">{blog.excerpt}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {blog.publishDate ? new Date(blog.publishDate).toLocaleDateString() : 'N/A'}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        {blog.author || 'Premium Dubai Tours'}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">⏱️</span>
                        {blog.readTime || '5 min read'}
                      </div>
                    </div>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-1">
                          {blog.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {blog.views || 0}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {blog.likes || 0}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center justify-center h-96 col-span-3">
                <p className="text-gray-600">No blogs available at the moment.</p>
              </div>
            </div>
          )}

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
            {loadingTestimonials ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading testimonials...</p>
              </div>
            ) : testimonials.length > 0 ? (
              <>
                {/* Carousel Container */}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                  >
                    {testimonials.map((testimonial) => (
                      <div key={testimonial._id} className="w-full flex-shrink-0 px-2 sm:px-4">
                        <Card className="p-4 sm:p-6 md:p-8 hover:shadow-lg transition-shadow">
                          <CardContent className="p-0">
                            <div className="flex items-center justify-center mb-4 sm:mb-6">
                              <div className="flex text-yellow-400">
                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 fill-current" />
                                ))}
                              </div>
                            </div>
                            <blockquote className="text-gray-700 mb-4 sm:mb-6 md:mb-8 italic text-center text-sm sm:text-base md:text-lg leading-relaxed">
                              "{testimonial.quote}"
                            </blockquote>
                            <div className="flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mx-auto mb-3 border border-gray-200">
                                  <Image
                                    src={testimonial.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"}
                                    alt={testimonial.name}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
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
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No testimonials available at the moment.</p>
              </div>
            )}
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
          <h2 className="text-4xl font-bold mb-4">Ready to Plan Your Dubai & The UAE Experience?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Speak with our team to design a well-planned Dubai & the UAE journey focused on comfort, clarity, and professional service.
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
