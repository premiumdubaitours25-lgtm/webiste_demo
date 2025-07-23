import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="space-y-6 fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Discover Your Next
              <span className="text-primary block slide-up">Adventure</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto scale-in">
              At JJ&Tia Tours and Travels, we specialize in crafting unique and personalized travel experiences that take you beyond the ordinary.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 scale-in">
            <Link to="/packages">
              <Button size="lg" className="bg-primary hover:bg-primary/90 hover-lift text-lg px-8 py-4">
                View Packages
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="hover-lift text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-black">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;