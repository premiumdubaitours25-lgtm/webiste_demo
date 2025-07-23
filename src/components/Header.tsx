import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/image-Photoroom.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Packages", href: "/packages" },
    { name: "Destinations", href: "/destinations" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ];

  // Always transparent overlay for all hero sections
  const isOverlayHero = true;

  return (
    <header
      className="absolute top-0 left-0 w-full z-50 transition-colors duration-300 bg-transparent"
      style={{ background: "transparent" }}
    >
      {/* Top bar */}
      <div className="bg-transparent text-white py-2 transition-colors duration-300">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>9970393335, 9104862909</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>shneiur.joseph@jjtia.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="flex items-center justify-center bg-white rounded-full shadow" style={{width: '72px', height: '72px'}}>
              <img src={logo} alt="JJ&Tia Tours" className="h-14 w-14 object-contain" style={{maxHeight: '56px', maxWidth: '56px'}} />
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors duration-200 font-medium text-white hover:text-primary ${location.pathname === item.href ? 'text-primary' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90 hover-lift">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors duration-200 font-medium text-white hover:text-primary ${location.pathname === item.href ? 'text-primary' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 w-fit">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;