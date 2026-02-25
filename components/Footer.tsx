import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
             <div className="flex items-center space-x-3">
               <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-lg p-2 sm:p-3 md:p-4 shadow-md flex items-center justify-center">
                 <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16">
                   <Image
                     src="/pdt_logo_whitebg.jpeg"
                     alt="Premium Dubai Tours Logo"
                     fill
                     sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 64px"
                     className="object-contain"
                     priority
                   />
                 </div>
               </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">Premium Dubai Tours</h3>
                <p className="text-xs sm:text-sm text-gray-400">Dubai Travel Specialists</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Premium Dubai Tours specializes in well-curated travel experiences across Dubai, the UAE, and beyond. We focus on comfort, transparency, and professional service for travelers who value quality over shortcuts.
            </p>
            <div className="flex space-x-4">
                <Link href="https://www.facebook.com/share/1EkLqFyM9F/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="https://www.instagram.com/jj_tia_travels" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
          
              <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Premium Dubai Tours</li>
              <li className="text-gray-300 text-sm">Luxury & Private Tours</li>
              <li className="text-gray-300 text-sm">Adventure Activities in Dubai</li>
              <li className="text-gray-300 text-sm">Dubai Day Tours & Tickets</li>
              <li className="text-gray-300 text-sm">Other Emirates Tours</li>
              <li className="text-gray-300 text-sm">Oman Tours from Dubai</li>
              <li className="text-gray-300 text-sm">Customized Travel Services</li>
              <li className="text-gray-300 text-sm">Visa Assistance</li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-white mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <div>Building A1, Dubai Digital Park</div>
                  <div>Dubai Silicon Oasis, Dubai</div>
                  <div>United Arab Emirates</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-white" />
                <span className="text-gray-300 text-sm">
                  +971 50 401 5632, +971 50 214 2541
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-white" />
                <span className="text-gray-300 text-sm">
                  info@premiumdubaitours.com
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h5 className="font-semibold">Newsletter</h5>
              <p className="text-gray-300 text-sm">
                Subscribe for curated travel insights, updates, and exclusive experiences.

              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Premium Dubai Tours. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;