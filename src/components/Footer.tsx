import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <img src={logo} alt="JJ&Tia Tours" className="h-12 w-auto brightness-0 invert" />
            <p className="text-white/80 leading-relaxed">
              At JJ&Tia Tours and Travels, we specialize in crafting unique and personalized travel experiences that take you beyond the ordinary. Founded on a passion for exploration and a deep understanding of what makes travel truly memorable.
            </p>
            <Button variant="outline" className="border-background text-white hover:bg-background hover:text-foreground">
              Read More
            </Button>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Blogs", "Refund & Cancellation Policy", "Term & Condition"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            <p className="text-white/80">Feel Free to Reach Us for Assistance</p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-white/80">9970393335, 9104862909</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-white/80">shneiur.joseph@jjtia.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span className="text-white/80">Nyati Estate, Mohammadwadi, Pune - 411060</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Newsletter</h3>
            <p className="text-white/80">Subscribe to get travel tips and special offers</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email address" 
                className="bg-background text-white border-muted-foreground/20"
              />
              <Button variant="outline" className="border-background text-white hover:bg-background hover:text-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-muted-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-white/80">Follow us:</span>
              <div className="flex space-x-3">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                WhatsApp
              </Button>
              <Button variant="outline" className="border-background text-white hover:bg-background hover:text-foreground">
                Call Me
              </Button>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-muted-foreground/20">
            <p className="text-white/80">
              © 2025 JJ&Tia Tours and Travels | Crafted TripClap - Travel Leads Marketplace
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;