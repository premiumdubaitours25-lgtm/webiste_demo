'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Award, Heart, Globe, Mountain, Camera, Star } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  const stats = [
    { icon: Users, label: "Happy Travelers", value: "10,000+" },
    { icon: Globe, label: "Countries Covered", value: "25+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Star, label: "5-Star Reviews", value: "4.9/5" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Travel",
      description: "We are passionate about creating unforgettable travel experiences that connect you with the world's most beautiful destinations."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our priority. We go above and beyond to ensure every journey exceeds your expectations."
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "With over 15 years of experience, we deliver exceptional service and attention to detail in every package."
    },
    {
      icon: Globe,
      title: "Sustainable Tourism",
      description: "We promote responsible tourism practices that benefit local communities and preserve natural beauty."
    }
  ];

  const team = [
    {
      name: "Shneiur Joseph",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      description: "15+ years in tourism industry"
    },
    {
      name: "Priya Thapa",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      description: "Expert in adventure tourism"
    },
    {
      name: "Amit Gurung",
      role: "Travel Consultant",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      description: "Specialist in cultural tours"
    },
    {
      name: "Sunita Lama",
      role: "Customer Relations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      description: "Ensuring exceptional service"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-32 md:py-40">
                 <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style={{
             backgroundImage: "url('/bhutan-travel-guide.webp')"
           }}
         ></div>
         <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              About JJ & TIA Tours
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl mb-12 opacity-90 leading-relaxed">
              Your trusted partner for unforgettable travel experiences in Nepal and beyond
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <Badge variant="secondary" className="text-xl px-6 py-3">
                <MapPin className="h-5 w-5 mr-3" />
                Based in Pune, India
              </Badge>
              <Badge variant="secondary" className="text-xl px-6 py-3">
                <Award className="h-5 w-5 mr-3" />
                Licensed Tour Operator
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">15+</div>
                <div className="text-lg opacity-80">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
                <div className="text-lg opacity-80">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">25+</div>
                <div className="text-lg opacity-80">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">4.9/5</div>
                <div className="text-lg opacity-80">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded in 2008, JJ & TIA Tours & Travels began as a small family business with a simple mission: 
                    to share the incredible beauty and rich culture of India and Nepal with travelers from around the world.
                  </p>
                  <p>
                    What started as local tours in Pune has grown into a comprehensive travel company offering 
                    domestic and international packages, adventure sports, cultural experiences, and luxury travel options.
                  </p>
                  <p>
                    Today, we're proud to have served over 10,000 satisfied customers and continue to expand our 
                    offerings while maintaining our commitment to quality, safety, and authentic experiences.
                  </p>
                </div>
                <div className="mt-8">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Explore Our Packages
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="JJ & TIA Tours Team"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Mountain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Adventure Awaits</h4>
                      <p className="text-sm text-gray-600">Since 2008</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do and every experience we create
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The passionate professionals who make your travel dreams come true
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-600">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let us create an unforgettable travel experience tailored just for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                <Camera className="h-5 w-5 mr-2" />
                View Our Gallery
              </Button>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
