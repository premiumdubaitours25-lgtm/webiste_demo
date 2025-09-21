'use client'

import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 flex flex-col gap-2 sm:gap-3">
      {/* WhatsApp Button */}
      <Button
        size="icon"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation"
        onClick={() => window.open('https://wa.me/919970393335', '_blank')}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
      
      {/* Phone Button */}
      <Button
        size="icon"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation"
        onClick={() => window.open('tel:+919970393335', '_self')}
        aria-label="Call us"
      >
        <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>
  );
};

export default FloatingButtons;
