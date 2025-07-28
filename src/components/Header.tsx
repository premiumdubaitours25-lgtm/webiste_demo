import { useState } from "react";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/image-Photoroom.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
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
            {/* Home */}
            <Link
              to="/"
              className={`transition-colors duration-200 font-medium text-white hover:text-primary ${location.pathname === "/" ? 'text-primary' : ''}`}
            >
              Home
            </Link>
            
            {/* About Us */}
            <Link
              to="/about"
              className={`transition-colors duration-200 font-medium text-white hover:text-primary ${location.pathname === "/about" ? 'text-primary' : ''}`}
            >
              About Us
            </Link>
            
            {/* Packages Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:text-primary hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-primary">
                    Packages
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4 md:w-[250px] md:grid-cols-1 lg:w-[300px] bg-white rounded-lg shadow-lg">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/packages/domestic"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none text-foreground">Domestic</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Explore amazing destinations within India
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/packages/international"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none text-foreground">International</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Discover incredible destinations worldwide
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Destinations */}
            <Link
              to="/destinations"
              className={`transition-colors duration-200 font-medium text-white hover:text-primary ${location.pathname === "/destinations" ? 'text-primary' : ''}`}
            >
              Destinations
            </Link>
            
            {/* Blogs */}
            <Link
              to="/blogs"
              className={`transition-colors duration-200 font-medium text-white hover:text-primary ${location.pathname === "/blogs" ? 'text-primary' : ''}`}
            >
              Blogs
            </Link>
            
            {/* Contact Us */}
            <Link
              to="/contact"
              className={`transition-colors duration-200 font-medium text-white hover:text-primary ${location.pathname === "/contact" ? 'text-primary' : ''}`}
            >
              Contact Us
            </Link>

            <Link to="/contact">
              <Button className="bg-secondary hover:bg-secondary/90 hover-lift">
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
              {/* Home */}
              <Link
                to="/"
                className={`transition-colors duration-200 font-medium text-white hover:text-primary ${location.pathname === "/" ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* About Us */}
              <Link
                to="/about"
                className={`transition-colors duration-200 font-medium text-white hover:text-primary ${location.pathname === "/about" ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              
              {/* Mobile Packages Dropdown */}
              <div className="space-y-2">
                <div className="font-medium text-white">Packages</div>
                <div className="ml-4 space-y-2">
                  <Link
                    to="/packages/domestic"
                    className="block text-white/80 hover:text-primary transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Domestic
                  </Link>
                  <Link
                    to="/packages/international"
                    className="block text-white/80 hover:text-primary transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    International
                  </Link>
                </div>
              </div>
              
              {/* Destinations */}
              <Link
                to="/destinations"
                className={`transition-colors duration-200 font-medium text-white hover:text-primary ${location.pathname === "/destinations" ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </Link>
              
              {/* Blogs */}
              <Link
                to="/blogs"
                className={`transition-colors duration-200 font-medium text-white hover:text-primary ${location.pathname === "/blogs" ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              
              {/* Contact Us */}
              <Link
                to="/contact"
                className={`transition-colors duration-200 font-medium text-white hover:text-primary ${location.pathname === "/contact" ? 'text-primary' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              
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