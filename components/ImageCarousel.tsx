import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      url: "https://th.bing.com/th/id/OIP.iXztSitPES1lHVu1s40-4gHaDt?w=335&h=174&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      title: "Best of BHUTAN",
      description: "Phuentsholing → Thimphu → Punakha → Paro → Tiger's Nest Hike\n\n6N/7D\nGroup Tour (Min 6 People) @ 28,999/person\nPrivate Tour @35,999/person"
    },
    {
      url: "https://res.cloudinary.com/drxzuvrbq/image/upload/v1753780417/CB1_ochijh.png",
      title: "Nepal",
      description: "Explore Kathmandu, Pokhara & Nagarkot\n\n4 Nights / 5 Days Tour Package\n\n₹9,999/person"
    },
    {
      url: "https://res.cloudinary.com/drxzuvrbq/image/upload/v1753780653/CB3_esmfup.png",
      title: "Meghalaya",
      description: "Guwahati, Shillong, Amlarem Dawki, Mawlynnong & Cherrapunjee\n\n4 Nights / 5 Days Tour Package\n\n₹19,900/person"
    },
    {
      url: "https://res.cloudinary.com/drxzuvrbq/image/upload/v1753780735/CB4_w9kx2n.png",
      title: "Darjeeling Budgeted Tour",
      description: "4 Nights / 5 Days\n\nDarjeeling, Kalimpong & Mirik\n\n₹16,500/person"
    },
    {
      url: "https://res.cloudinary.com/drxzuvrbq/image/upload/v1753780830/CB5_audraq.png",
      title: "Sikkim",
      description: "Gangtok, Tsangmo Lake & Pelling\n\n4N/5D\n\n₹18,500/person"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative h-[400px] md:h-[450px] overflow-hidden rounded-lg">
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {/* Black Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/50"></div>
            
            {/* Content with left alignment and vertical center */}
            <div className="absolute inset-0 flex items-center justify-start p-8 text-white">
              <div className="flex flex-col max-w-2xl ml-8">
                {/* Title */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
                  {image.title}
                </h3>
                
                {/* Description with better formatting */}
                <div className="space-y-2 mb-6">
                  {image.description.split('\n').map((line, index) => (
                    <div key={index} className={line.trim() === '' ? 'h-2' : ''}>
                      {line.trim() !== '' && (
                        <div className={`text-sm md:text-base lg:text-lg ${
                          line.includes('@') || line.includes('₹') 
                            ? 'font-semibold text-yellow-400' 
                            : 'text-white'
                        }`}>
                          {line}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Book Now Button */}
                <Link href="/contact">
                  <Button 
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 text-lg rounded-lg shadow-lg"
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30"
        size="icon"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30"
        size="icon"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ImageCarousel; 