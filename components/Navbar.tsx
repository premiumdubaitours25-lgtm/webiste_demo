'use client'

import { useState } from "react";
import { Menu, X, Phone, Mail, ChevronDown, MessageCircle, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { 
      name: 'Packages', 
      href: '/packages',
      submenu: [
        { name: 'Domestic Packages', href: '/packages/domestic' },
        { name: 'International Packages', href: '/packages/international' },
        { name: 'All Packages', href: '/packages' }
      ]
    },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href) || false;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 9970393335</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>shneiur.joseph@jjtia.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="JJ & TIA Tours Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">JJ & TIA Tours</h1>
              <p className="text-xs text-gray-600">Travel & Tourism</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`flex items-center space-x-1 ${
                          isActive(item.href) 
                            ? 'text-primary font-semibold' 
                            : 'text-gray-700 hover:text-primary'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link 
                            href={subItem.href}
                            className={`w-full ${
                              isActive(subItem.href) 
                                ? 'text-primary font-semibold' 
                                : 'text-gray-700'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors ${
                      isActive(item.href) 
                        ? 'text-primary font-semibold' 
                        : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/contact">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <div className="font-medium text-gray-900 mb-2">{item.name}</div>
                      <div className="pl-4 space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block py-2 text-sm transition-colors ${
                              isActive(subItem.href) 
                                ? 'text-primary font-semibold' 
                                : 'text-gray-600 hover:text-primary'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-2 font-medium transition-colors ${
                        isActive(item.href) 
                          ? 'text-primary font-semibold' 
                          : 'text-gray-700 hover:text-primary'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 border-t space-y-2">
                <Link href="/contact" className="block">
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
