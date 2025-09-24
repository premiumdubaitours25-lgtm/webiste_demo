import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BestPlaceSectionProps {
  subtitle?: string;
  title?: string;
  destination?: string;
  buttonText?: string;
  buttonLink?: string;
}

const BestPlaceSection = ({ 
  subtitle = "Best Place",
  title = "Discover amazing places",
  destination = "North East",
  buttonText = "BOOK NOW",
  buttonLink = "/contact"
}: BestPlaceSectionProps) => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="w-full px-8 lg:px-16 xl:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="text-white mb-8 lg:mb-0 lg:mr-8">
            <p className="text-lg font-light mb-2 opacity-90">{subtitle}</p>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              {title}<br />
              in <span className="text-primary">{destination}</span>
            </h2>
          </div>
          
          {/* Call to Action Button */}
          <div>
            <Link href={buttonLink}>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestPlaceSection; 