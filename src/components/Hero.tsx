import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2070&q=80')`
        }}
      ></div>
      {/* Removed overlay */}
      <div className="container mx-auto px-4 py-20 relative z-20">
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
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-black">
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