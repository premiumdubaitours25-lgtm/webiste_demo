import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

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

  // Transparent on homepage only
  const isHome = location.pathname === "/";

  return (
    <header
      className={`
        ${isHome ?
          "bg-transparent absolute top-0 left-0 w-full z-50 transition-colors duration-300" :
          "bg-background shadow-lg sticky top-0 z-50 transition-colors duration-300"
        }
      `}
      style={{backdropFilter: isHome ? 'blur(2px)' : undefined}}
    >
      {/* Top bar */}
      <div className={`${isHome ? "bg-transparent text-white" : "bg-primary text-primary-foreground"} py-2 transition-colors duration-300`}>
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
            <img src="/lovable-uploads/13166268-8dd7-4f78-a633-ef4e288bfd2a.png" alt="JJ&Tia Tours" className="h-12 w-auto" />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors duration-200 font-medium ${
                  location.pathname === item.href ? 'text-primary' : isHome ? 'text-white hover:text-primary' : 'text-foreground hover:text-primary'
                }`}
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
                  className={`transition-colors duration-200 font-medium ${
                    location.pathname === item.href ? 'text-primary' : isHome ? 'text-white hover:text-primary' : 'text-foreground hover:text-primary'
                  }`}
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