import Hero from "@/components/Hero";
import ImageCarousel from "@/components/ImageCarousel";
import ImageGrid from "@/components/ImageGrid";
import MasonryGallery from "@/components/MasonryGallery";
import BestPlaceSection from "@/components/BestPlaceSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Package, Camera, BookOpen, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const carouselAnimation = useScrollAnimation(0.1);
  const aboutAnimation = useScrollAnimation(0.1);
  const domesticPackagesAnimation = useScrollAnimation(0.05); // Domestic triggers first
  const internationalPackagesAnimation = useScrollAnimation(0.1); // International triggers second
  const destinationsAnimation = useScrollAnimation(0.1);
  const blogsAnimation = useScrollAnimation(0.1);
  const testimonialsAnimation = useScrollAnimation(0.1);
  const bestPlaceAnimation = useScrollAnimation(0.1);

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
            <h2 className="text-4xl font-bold mb-4 text-secondary">Discover Amazing Destinations</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our curated collection of breathtaking destinations captured through the lens of talented photographers
            </p>
          </div>
          <ImageCarousel />
        </div>
      </section>
      
      {/* About Section Preview */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div 
            ref={aboutAnimation.ref}
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              aboutAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-6 text-secondary">About JJ & Tia Tours and Travels</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              At JJ & TIA Tours and Travels, we specialize in crafting unique and personalized travel experiences 
              that take you beyond the ordinary. Founded on a passion for exploration and a deep commitment to 
              exceptional service, we transform your travel dreams into unforgettable memories.
            </p>
          </div>
          
          {/* Content Grid */}
          <div className={`grid lg:grid-cols-3 gap-8 transition-all duration-1000 ease-out delay-400 ${
            aboutAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            {/* Image Section */}
            <div className="lg:col-span-1">
              <div className="relative">
                <img 
                  src="https://res.cloudinary.com/drxzuvrbq/image/upload/v1753782292/CB6_ckhups.png" 
                  alt="Travel Experience" 
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-secondary text-white px-6 py-3 rounded-lg shadow-lg">
                  <div className="text-sm font-medium">Since 2019</div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-4xl font-bold text-secondary mb-8 text-center">Why Choose Us?</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: "🎯",
                    title: "Personalized Itineraries",
                    description: "Tailored travel plans designed specifically for your preferences and interests"
                  },
                  {
                    icon: "👥",
                    title: "Expert Local Guides",
                    description: "Insider knowledge and authentic experiences with certified local experts"
                  },
                  {
                    icon: "🛡️",
                    title: "24/7 Support",
                    description: "Round-the-clock assistance throughout your entire journey"
                  },
                  {
                    icon: "💰",
                    title: "Transparent Pricing",
                    description: "Competitive rates with no hidden costs or surprise fees"
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-3xl mb-4">{feature.icon}</div>
                    <h4 className="text-lg font-semibold text-secondary mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`text-center mt-16 transition-all duration-1000 ease-out delay-600 ${
            aboutAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <Link to="/about">
              <Button className="bg-secondary hover:bg-secondary/90 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Discover Our Story <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Domestic Packages Section Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div 
            ref={domesticPackagesAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              domesticPackagesAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-secondary">Domestic Packages</h2>
            <p className="text-lg text-muted-foreground">Discover our handpicked domestic travel packages for unforgettable experiences</p>
          </div>
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ease-out delay-300 ${
            domesticPackagesAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            {[
              {
                title: "Sikkim Darjeeling Tour",
                duration: "6D/5N",
                price: "₹24,999",
                image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=400&q=60",
                description: "Experience the beauty of Eastern Himalayas with Gangtok and Darjeeling.",
                type: "DOMESTIC"
              },
              {
                title: "Meghalaya Adventure",
                duration: "4D/3N",
                price: "₹16,500",
                image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=400&q=60",
                description: "Discover the 'Abode of Clouds' with pristine waterfalls and unique experiences.",
                type: "DOMESTIC"
              },
              {
                title: "Goa Beach Paradise",
                duration: "5D/4N",
                price: "₹18,999",
                image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                description: "Relax and unwind in the tropical paradise of Goa with pristine beaches.",
                type: "DOMESTIC"
              }
            ].map((pkg, index) => (
              <div 
                key={index} 
                className={`rounded-2xl shadow-lg overflow-hidden bg-white relative group hover:scale-105 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-1000 ease-out ${
                  domesticPackagesAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <img src={pkg.image} alt={pkg.title} className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 bg-white rounded-xl px-6 py-4 shadow text-left group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  <div className="text-xs text-muted-foreground font-medium mb-1 group-hover:text-white/80">{pkg.type}</div>
                  <div className="text-lg font-bold text-foreground group-hover:text-white">{pkg.title.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/packages/domestic">
              <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3">
                <Package className="mr-2 h-4 w-4" />
                View Domestic Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* International Packages Section Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div 
            ref={internationalPackagesAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              internationalPackagesAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-secondary">International Packages</h2>
            <p className="text-lg text-muted-foreground">Discover our handpicked international travel packages for unforgettable experiences</p>
          </div>
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ease-out delay-300 ${
            internationalPackagesAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            {[
              {
                title: "Bhutan Family Tour",
                duration: "5D/4N",
                price: "₹29,999",
                image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                description: "Explore the mystical kingdom of Bhutan with cultural heritage and natural beauty.",
                type: "INTERNATIONAL"
              },
              {
                title: "Nepal Adventure Tour",
                duration: "6D/5N",
                price: "₹35,500",
                image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                description: "Experience the majestic Himalayas and rich culture of Nepal.",
                type: "INTERNATIONAL"
              },
              {
                title: "Bali Paradise Tour",
                duration: "7D/6N",
                price: "₹42,990",
                image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                description: "Discover the tropical paradise of Bali with pristine beaches and temples.",
                type: "INTERNATIONAL"
              }
            ].map((pkg, index) => (
              <div 
                key={index} 
                className={`rounded-2xl shadow-lg overflow-hidden bg-white relative group hover:scale-105 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-1000 ease-out ${
                  internationalPackagesAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <img src={pkg.image} alt={pkg.title} className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 bg-white rounded-xl px-6 py-4 shadow text-left group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  <div className="text-xs text-muted-foreground font-medium mb-1 group-hover:text-white/80">{pkg.type}</div>
                  <div className="text-lg font-bold text-foreground group-hover:text-white">{pkg.title.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/packages/international">
              <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3">
                <Package className="mr-2 h-4 w-4" />
                View International Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations Section Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div 
            ref={destinationsAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              destinationsAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-secondary">Popular Destinations</h2>
            <p className="text-lg text-muted-foreground">Explore amazing places around the world</p>
          </div>
          <div className={`grid md:grid-cols-4 gap-6 transition-all duration-1000 ease-out delay-300 ${
            destinationsAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            {[
              { name: "Nepal", type: "INTERNATIONAL", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" },
              { name: "Bali", type: "INTERNATIONAL", image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" },
              { name: "Bhutan", type: "INTERNATIONAL", image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" },
              { name: "Goa", type: "DOMESTIC", image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" },
              { name: "Sikkim", type: "DOMESTIC", image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" },
              { name: "Andaman", type: "DOMESTIC", image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" },
              { name: "Darjeeling", type: "DOMESTIC", image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" },
              { name: "Meghalaya", type: "DOMESTIC", image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" }
            ].slice(0, 4).map((destination, index) => (
              <div 
                key={index} 
                className={`rounded-2xl shadow-lg overflow-hidden bg-white relative group hover:scale-105 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-1000 ease-out ${
                  destinationsAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <img src={destination.image} alt={destination.name} className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 bg-white rounded-xl px-6 py-4 shadow text-left group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  <div className="text-xs text-muted-foreground font-medium mb-1 group-hover:text-white/80">{destination.type}</div>
                  <div className="text-lg font-bold text-foreground group-hover:text-white">{destination.name.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/destinations">
              <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3">
                <MapPin className="mr-2 h-4 w-4" />
                View All Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blogs Section Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div 
            ref={blogsAnimation.ref}
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              blogsAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-secondary">Travel Blogs</h2>
            <p className="text-lg text-muted-foreground">Read our latest travel stories and tips</p>
          </div>
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ease-out delay-300 ${
            blogsAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            {[
              {
                title: "Goa on a Shoe-string Budget? Check out These Chic Apartments for a Comfy Stay!",
                excerpt: "Discover affordable luxury in Goa with our guide to budget-friendly accommodations...",
                image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                date: "January 15, 2025"
              },
              {
                title: "The Ultimate Guide to Hiking to the Tiger's Nest, Bhutan",
                excerpt: "Experience one of the most iconic monastery hikes in the world with our comprehensive guide...",
                image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                date: "January 10, 2025"
              },
              {
                title: "6 Red Sea Diving Experiences in Saudi to Add to Your Bucket List",
                excerpt: "Explore the underwater wonders of the Red Sea with these incredible diving spots...",
                image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                date: "January 5, 2025"
              }
            ].map((blog, index) => (
              <div 
                key={index} 
                className={`bg-card rounded-lg shadow-lg overflow-hidden group hover:scale-105 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-1000 ease-out ${
                  blogsAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 group-hover:bg-secondary/5 transition-colors duration-300">
                  <p className="text-sm text-muted-foreground mb-2 group-hover:text-secondary transition-colors duration-300">{blog.date}</p>
                  <h3 className="text-lg font-semibold mb-3 text-secondary line-clamp-2 group-hover:text-secondary transition-colors duration-300">{blog.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 group-hover:text-foreground transition-colors duration-300">{blog.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/blogs">
              <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3">
                <BookOpen className="mr-2 h-4 w-4" />
                Read All Blogs
              </Button>
            </Link>
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
            <p className="text-lg text-muted-foreground">Real experiences from our happy customers</p>
          </div>
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ease-out delay-300 ${
            testimonialsAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            {[
              {
                name: "Sarah Johnson",
                location: "Mumbai",
                review: "Amazing experience with JJ & TIA Tours! The Bhutan trip was perfectly organized and exceeded all our expectations.",
                rating: 5
              },
              {
                name: "Raj Patel",
                location: "Delhi",
                review: "Fantastic service and great value for money. Our Meghalaya tour was unforgettable!",
                rating: 5
              },
              {
                name: "Priya Sharma",
                location: "Bangalore",
                review: "Professional team with excellent attention to detail. Highly recommend for family trips!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className={`bg-card rounded-lg shadow-lg p-6 group hover:scale-105 hover:shadow-2xl transform hover:-translate-y-2 hover:bg-secondary/5 transition-all duration-1000 ease-out ${
                  testimonialsAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 100}ms` }}>★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic group-hover:text-foreground transition-colors duration-300">"{testimonial.review}"</p>
                <div>
                  <h4 className="font-semibold text-secondary group-hover:text-secondary transition-colors duration-300">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Place Section */}
      <div 
        ref={bestPlaceAnimation.ref}
        className={`transition-all duration-1000 ease-out ${
          bestPlaceAnimation.isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <BestPlaceSection 
          subtitle="Adventure Awaits"
          title="Embark on unforgettable journeys"
          destination="the World"
          buttonText="START EXPLORING"
        />
      </div>

      {/* Floating WhatsApp and Call Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
        <a
          href="https://wa.me/91970393335"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors duration-200"
          aria-label="Chat on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.08 2.34 7.09L4 29l7.18-2.29A12.93 12.93 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.85-.58-5.41-1.58l-.39-.25-4.27 1.36 1.4-4.15-.25-.4A9.94 9.94 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.82 1.16 3.02c.14.2 2.01 3.08 4.88 4.2.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/></svg>
        </a>
        <a
          href="tel:91970393335"
          className="bg-secondary hover:bg-secondary/90 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors duration-200"
          aria-label="Call us"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default Index;
