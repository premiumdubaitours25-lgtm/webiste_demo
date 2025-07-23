import { Users, MapPin, Award, Heart, Globe, Shield, Clock, Star, CheckCircle, Phone, Mail, MapPin as LocationPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import aboutVideo from "@/assets/About.mp4";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "John Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      description: "Travel enthusiast with 15+ years of experience in the tourism industry."
    },
    {
      name: "Tia Anderson",
      role: "Travel Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      description: "Expert in crafting personalized travel experiences and cultural tours."
    },
    {
      name: "David Chen",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      description: "Ensures seamless travel operations and customer satisfaction."
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
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2070&q=80')`
          }}
        ></div>
        {/* Removed overlay */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center space-y-6 fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              About <span className="text-primary">JJ&Tia Tours</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Crafting unique and personalized travel experiences that take you beyond the ordinary
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 slide-up">
              <h2 className="text-4xl font-bold text-foreground">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2019, JJ&Tia Tours and Travels was born from a simple yet powerful vision: to make extraordinary travel experiences accessible to everyone. What started as a passion project between two travel enthusiasts has grown into a trusted name in the travel industry.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our founders, John and Tia, met during a backpacking trip through Southeast Asia. Their shared love for authentic travel experiences and cultural immersion led them to create a company that would help others discover the world in meaningful ways.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we've helped over 500 travelers explore more than 50 destinations across the globe, each journey carefully crafted to create lasting memories and meaningful connections.
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
                  <h3 className="text-2xl font-bold text-primary">5+ Years</h3>
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
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Achievements</h2>
            <p className="text-lg text-muted-foreground">Numbers that tell our story</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg hover-lift">
                <div className="text-primary mb-4 flex justify-center">
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
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To create extraordinary travel experiences that inspire, educate, and transform our travelers while promoting sustainable tourism practices that benefit local communities and preserve natural environments.
              </p>
              <div className="flex items-center space-x-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Sustainable Tourism</span>
              </div>
              <div className="flex items-center space-x-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Cultural Preservation</span>
              </div>
              <div className="flex items-center space-x-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Community Support</span>
              </div>
            </div>
            <div className="space-y-6 fade-in">
              <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the leading travel company that bridges cultures, creates lasting memories, and fosters a deeper understanding of our beautiful world through authentic and meaningful travel experiences.
              </p>
              <div className="flex items-center space-x-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Global Connection</span>
              </div>
              <div className="flex items-center space-x-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Authentic Experiences</span>
              </div>
              <div className="flex items-center space-x-2 text-primary">
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
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover-lift">
                <CardContent className="space-y-4">
                  <div className="text-primary flex justify-center">
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
            <h2 className="text-4xl font-bold mb-4 text-foreground">Meet Our Team</h2>
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
                  <p className="text-primary font-medium mb-3">{member.role}</p>
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
              <h2 className="text-4xl font-bold text-foreground">Why Choose JJ&Tia Tours?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">24/7 Support</h3>
                    <p className="text-muted-foreground">Round-the-clock assistance throughout your journey</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Safe & Secure</h3>
                    <p className="text-muted-foreground">Your safety is our top priority with comprehensive insurance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Local Expertise</h3>
                    <p className="text-muted-foreground">Insider knowledge and authentic local experiences</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Star className="h-6 w-6 text-primary" />
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
              <div className="absolute -top-6 -right-6 bg-primary text-white p-6 rounded-lg shadow-lg">
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
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-white">Ready to Start Your Journey?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Let us help you create the perfect travel experience. Contact our team of experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
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
    </div>
  );
};

export default AboutPage;