import { Users, MapPin, Award, Heart, Globe, Shield, Clock, Star, CheckCircle, Phone, Mail, MapPin as LocationPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BestPlaceSection from "@/components/BestPlaceSection";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Anita Chettri",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      description: "Co-founder with a passion for creating seamless and personalized travel experiences."
    },
    {
      name: "Sabya Chettri",
      role: "Founder & Travel Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      description: "Co-founder specializing in crafting memorable journeys with insider knowledge and personal care."
    },
    {
      name: "Travel Team",
      role: "Operations & Support",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      description: "Dedicated professionals ensuring seamless travel operations and exceptional customer satisfaction."
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passion for Travel",
      description: "We're driven by our love for exploration and discovery."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Reliability",
      description: "Your safety and satisfaction are our top priorities."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Cultural Respect",
      description: "We honor and celebrate the diversity of cultures we encounter."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service."
    }
  ];

  const achievements = [
    {
      number: "500+",
      label: "Happy Travelers",
      icon: <Users className="h-6 w-6" />
    },
    {
      number: "50+",
      label: "Destinations",
      icon: <MapPin className="h-6 w-6" />
    },
    {
      number: "5+",
      label: "Years Experience",
      icon: <Award className="h-6 w-6" />
    },
    {
      number: "100%",
      label: "Satisfaction Rate",
      icon: <Heart className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-travel-light-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://res.cloudinary.com/dflzbvz9i/video/upload/v1756455913/277097_small_mbub0k.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Removed overlay */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center space-y-6 fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              About <span className="text-secondary">JJ & TIA Tours</span>
            </h1>
            <p className="text-2xl text-white font-semibold mb-4 max-w-4xl mx-auto" style={{textShadow: '3px 3px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.8), 0 0 50px rgba(0,0,0,0.7)'}}>
              "Travel with Heart, Explore with Us"
            </p>
            <p className="text-xl text-white font-medium max-w-3xl mx-auto" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.7)'}}>
              Founded by two sisters, JJ & Tia Tours and Travels turns your holidays into memorable journeys across Bhutan, Nepal, India, and beyond. Every trip is personal, seamless, and unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 slide-up">
              <h2 className="text-4xl font-bold text-secondary">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                JJ & Tia Tours and Travels was born out of a shared passion for exploring the world and creating unforgettable experiences. Founded 5 years ago by two sisters, Anita and Sabya Chettri, our journey began with a simple idea: to make travel seamless, personalized, and memorable for every traveler.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                What started as a dream has now blossomed into a trusted travel company, offering carefully crafted itineraries across Bhutan, Nepal, India, Vietnam, and beyond. Being sisters, we bring a unique blend of personal care, attention to detail, and insider knowledge, ensuring that every trip feels like a journey with family.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At JJ & Tia Tours and Travels, we believe that travel is more than sightseeing—it's about experiencing culture, connecting with nature, and creating memories that last a lifetime. For us, every traveler is part of our extended family, and every journey is a story waiting to be told.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join us, and let's turn your holidays into lifelong memories.
              </p>
            </div>
            
            <div className="relative scale-in">
              <img 
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Our Journey"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-secondary">5+ Years</h3>
                  <p className="text-muted-foreground">of Creating Memories</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Our Achievements</h2>
            <p className="text-lg text-muted-foreground">Numbers that tell our story</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-secondary/5 to-secondary/5 rounded-lg hover-lift">
                <div className="text-secondary mb-4 flex justify-center">
                  {achievement.icon}
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">{achievement.number}</h3>
                <p className="text-muted-foreground">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 fade-in">
              <h2 className="text-3xl font-bold text-secondary">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To create extraordinary travel experiences that inspire, educate, and transform our travelers while promoting sustainable tourism practices that benefit local communities and preserve natural environments.
              </p>
              <div className="flex items-center space-x-2 text-secondary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Sustainable Tourism</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Cultural Preservation</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Community Support</span>
              </div>
            </div>
            <div className="space-y-6 fade-in">
              <h2 className="text-3xl font-bold text-secondary">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the leading travel company that bridges cultures, creates lasting memories, and fosters a deeper understanding of our beautiful world through authentic and meaningful travel experiences.
              </p>
              <div className="flex items-center space-x-2 text-secondary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Global Connection</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Authentic Experiences</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Cultural Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Our Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover-lift">
                <CardContent className="space-y-4">
                  <div className="text-secondary flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">The passionate people behind your perfect journey</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover-lift">
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 slide-up">
              <h2 className="text-4xl font-bold text-secondary">Why Choose JJ & TIA Tours?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">24/7 Support</h3>
                    <p className="text-muted-foreground">Round-the-clock assistance throughout your journey</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Safe & Secure</h3>
                    <p className="text-muted-foreground">Your safety is our top priority with comprehensive insurance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Globe className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Local Expertise</h3>
                    <p className="text-muted-foreground">Insider knowledge and authentic local experiences</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Star className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Quality Guaranteed</h3>
                    <p className="text-muted-foreground">Carefully selected accommodations and experiences</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative scale-in">
              <img 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Why Choose Us"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -top-6 -right-6 bg-secondary text-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">100%</h3>
                  <p className="text-sm">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-secondary to-secondary/80">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-white">Ready to Start Your Journey?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Let us help you create the perfect travel experience. Contact our team of experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90">
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-white/80">
              <div className="flex items-center space-x-2">
                <LocationPin className="h-5 w-5" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>info@jjtiatours.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Best Place Section */}
      <BestPlaceSection 
        subtitle="Trusted Experience"
        title="Crafting memories with"
        destination="Excellence"
        buttonText="LEARN MORE"
        buttonLink="/packages"
      />
    </div>
  );
};

export default AboutPage;