import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      url: "https://res.cloudinary.com/drxzuvrbq/image/upload/v1753780534/CB2_lzq57f.png",
      title: "Mountain Adventures",
      description: "Explore the world's most breathtaking peaks"
    },
    {
      url: "https://res.cloudinary.com/drxzuvrbq/image/upload/v1753780417/CB1_ochijh.png",
      title: "Tropical Paradise",
      description: "Discover pristine beaches and crystal clear waters"
    },
    {
      url: "https://res.cloudinary.com/drxzuvrbq/image/upload/v1753780653/CB3_esmfup.png",
      title: "Cultural Heritage",
      description: "Immerse yourself in rich traditions and history"
    },
    {
      url: "https://res.cloudinary.com/drxzuvrbq/image/upload/v1753780735/CB4_w9kx2n.png",
      title: "Wildlife Encounters",
      description: "Experience nature's most magnificent creatures"
    },
    {
      url: "https://res.cloudinary.com/drxzuvrbq/image/upload/v1753780830/CB5_audraq.png",
      title: "Waterfall Wonders",
      description: "Witness nature's most spectacular displays"
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
    <section className="relative h-96 md:h-[500px] overflow-hidden rounded-lg">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">{image.title}</h3>
              <p className="text-lg md:text-xl opacity-90">{image.description}</p>
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