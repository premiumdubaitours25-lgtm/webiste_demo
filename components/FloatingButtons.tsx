'use client'

import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <Button
        size="icon"
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => window.open('https://wa.me/919970393335', '_blank')}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      {/* Phone Button */}
      <Button
        size="icon"
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => window.open('tel:+919970393335', '_self')}
      >
        <Phone className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default FloatingButtons;
