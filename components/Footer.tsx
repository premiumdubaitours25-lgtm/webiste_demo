import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">TIA Tours</h3>
                <p className="text-sm text-gray-400">Travel & Tourism</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner for unforgettable travel experiences in Nepal and beyond. 
              We create memories that last a lifetime.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
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
              <li className="text-gray-300 text-sm">Domestic Tours</li>
              <li className="text-gray-300 text-sm">International Tours</li>
              <li className="text-gray-300 text-sm">Adventure Sports</li>
              <li className="text-gray-300 text-sm">Cultural Tours</li>
              <li className="text-gray-300 text-sm">Trekking & Hiking</li>
              <li className="text-gray-300 text-sm">Hotel Booking</li>
              <li className="text-gray-300 text-sm">Flight Booking</li>
              <li className="text-gray-300 text-sm">Travel Insurance</li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-300 text-sm">
                  Thamel, Kathmandu, Nepal
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-gray-300 text-sm">
                  +977-1-1234567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-gray-300 text-sm">
                  info@tiatours.com
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h5 className="font-semibold">Newsletter</h5>
              <p className="text-gray-300 text-sm">
                Subscribe to get updates on new packages and offers.
              </p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
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
              © 2024 TIA Tours & Travels. All rights reserved.
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