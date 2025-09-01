import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/dflzbvz9i/video/upload/v1756455931/140036-774012838_small_fduxuj.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Removed overlay */}
      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="space-y-6 fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight" style={{textShadow: '3px 3px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.8), 0 0 50px rgba(0,0,0,0.7)'}}>
              Turning Holidays into Lifelong 
              <span className="text-primary block slide-up" style={{textShadow: '3px 3px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.8), 0 0 50px rgba(0,0,0,0.7)'}}>
                Memories
              </span>
            </h1>
            <p className="text-xl text-white font-bold max-w-3xl mx-auto scale-in" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.7)'}}>
              At JJ & Tia Tours and Travels, we specialize in crafting Curated tours, seamless planning, and unforgettable experiences Because every holiday should be a story worth telling.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 scale-in">
            <Link to="/packages">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 hover-lift text-lg px-8 py-4">
                Explore Packages
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-black">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;