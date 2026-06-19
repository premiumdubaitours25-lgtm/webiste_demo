'use client'

import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Mail, ChevronDown, MessageCircle, User, LogOut, Search, MapPin, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useInquiryForm } from "../contexts/InquiryFormContext";
import { cn } from "@/lib/utils";

const PACKAGE_LISTING_SLUGS = new Set([
  'regular',
  'premium',
  'luxury',
  'adventure',
  'oman',
  'attractions',
]);

function isPackageDetailPath(pathname: string | null) {
  if (!pathname) return false;
  const match = pathname.match(/^\/packages\/([^/]+)$/);
  if (!match) return false;
  return !PACKAGE_LISTING_SLUGS.has(match[1]);
}

interface SearchPackage {
  _id: string;
  slug?: string;
  title: string;
  subtitle: string;
  location: string;
  price: number;
  duration: string;
  images: Array<{ url: string; alt: string }>;
  rating: number;
}

interface NavigationItem {
  name: string;
  href: string;
  submenu?: Array<{ name: string; href: string }>;
}

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
}

import { LEGACY_CATEGORY_ROUTES, getPackagePath } from '@/lib/packageSlug';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchPackage[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const isNavbarHiddenRef = useRef(false);
  const pathname = usePathname();
  const router = useRouter();
  const { openForm } = useInquiryForm();
  const isPackageDetailPage = isPackageDetailPath(pathname);

  // Initialize search term from URL on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const searchParam = urlParams.get('search');
      if (searchParam) {
        setSearchTerm(searchParam);
      }
    }
  }, []);

  // Set mounted to true after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !navRef.current) return;
    const updateHeight = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [mounted, pathname]);

  // Hide navbar on scroll down (package detail pages only)
  useEffect(() => {
    if (!mounted || !isPackageDetailPage) {
      isNavbarHiddenRef.current = false;
      setIsNavbarHidden(false);
      return;
    }

    let ticking = false;

    const updateNavbarVisibility = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      let nextHidden = isNavbarHiddenRef.current;

      if (currentY < 96) {
        nextHidden = false;
      } else if (delta > 16) {
        nextHidden = true;
      } else if (delta < -16) {
        nextHidden = false;
      }

      if (nextHidden !== isNavbarHiddenRef.current) {
        isNavbarHiddenRef.current = nextHidden;
        setIsNavbarHidden(nextHidden);
      }

      lastScrollY.current = currentY;
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateNavbarVisibility);
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, isPackageDetailPage, pathname]);

  useEffect(() => {
    if (!mounted) return;

    const offset = isPackageDetailPage ? '1rem' : '0px';
    document.documentElement.style.setProperty('--site-navbar-offset', offset);

    return () => {
      document.documentElement.style.removeProperty('--site-navbar-offset');
    };
  }, [mounted, isPackageDetailPage]);

  // Check if hero section is in view (only on home page)
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (typeof window !== 'undefined' && pathname === '/') {
        const heroSection = document.getElementById('home');
        if (heroSection) {
          const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
          const scrollPosition = window.scrollY + 100; // Add some offset for better UX
          setIsInHeroSection(scrollPosition < heroBottom);
        } else {
          setIsInHeroSection(false);
        }
      } else {
        setIsInHeroSection(false);
      }
    };

    // Check on mount and route change
    handleScroll();

    // Check on scroll
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, mounted]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (response.ok && data.success && Array.isArray(data.data)) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Error loading navbar categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const packageSubmenu = categories.length > 0
    ? categories.map((category) => ({
        name: category.name,
        href: LEGACY_CATEGORY_ROUTES[category.slug] || `/packages/category/${category.slug}`,
      }))
    : [
        { name: 'Regular Packages', href: '/packages/regular' },
        { name: 'Premium Packages', href: '/packages/premium' },
        { name: 'Luxury Packages', href: '/packages/luxury' },
        { name: 'Adventure Activities', href: '/packages/adventure' },
        { name: 'OMAN Tour', href: '/packages/oman' },
        { name: 'Attraction and Activity', href: '/packages/attractions' },
      ];

  const navigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { 
      name: 'Packages', 
      href: '/packages',
      submenu: packageSubmenu
    },
    { name: 'Travel Blog ', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href) || false;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to packages page with search query
      router.push(`/packages?search=${encodeURIComponent(searchTerm.trim())}`);
      // Don't clear the search term - keep it visible
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearchOpen(value.trim().length > 0);
  };

  // Search for packages
  const searchPackages = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/packages/search?q=${encodeURIComponent(query)}&limit=5`);
      const result = await response.json();
      if (result.success) {
        setSearchResults(result.data);
        setIsSearchOpen(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPackages(searchTerm);
    }, 300); // 300ms delay for live search

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/packages?search=${encodeURIComponent(searchTerm.trim())}`;
      setIsSearchOpen(false);
    }
  };

  const goToSearchResults = () => {
    if (!searchTerm.trim()) return;
    setIsSearchOpen(false);
    window.location.href = `/packages?search=${encodeURIComponent(searchTerm.trim())}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {isPackageDetailPage && (
        <div aria-hidden style={{ height: navHeight || 108 }} />
      )}
      <nav
        ref={navRef}
        className={cn(
          'z-[120] will-change-transform transition-transform duration-300 ease-in-out',
          isPackageDetailPage ? 'fixed top-0 left-0 right-0 w-full' : 'sticky top-0',
          isPackageDetailPage && isNavbarHidden && '-translate-y-full pointer-events-none',
          isInHeroSection
            ? 'bg-transparent shadow-none border-b-0'
            : 'bg-white shadow-lg border-b border-gray-300'
        )}
      >
      {/* Top Bar */}
      <div className="bg-black text-white py-px">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center text-[11px]">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3" />
                  <span>+971 50 401 5632, +971 50 214 2541</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3" />
                  <span>info@premiumdubaitours.com</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-gray-800 text-[11px] px-2 py-1 h-auto"
                  onClick={() => window.open('https://wa.me/971504015632', '_blank')}
                >
                  <MessageCircle className="h-3 w-3 mr-1.5" />
                  Live Chat
                </Button>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800 text-[11px] px-2 py-1 h-auto">
                    <User className="h-3 w-3 mr-1.5" />
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Full Width */}
        <div className="md:hidden px-4 space-y-0.5">
          {/* Row 1: Phone Numbers */}
          <div className="flex items-center justify-center space-x-1.5 text-xs">
            <Phone className="h-3 w-3" />
            <span>+971 50 401 5632, +971 50 214 2541</span>
          </div>
          
          {/* Row 2: Email */}
          <div className="flex items-center justify-center space-x-1.5 text-sm mt-1">
            <Mail className="h-3 w-3" />
            <span>info@premiumdubaitours.com</span>
          </div>
          
          {/* Row 3: Live Chat & Login */}
          <div className="flex items-center justify-center -space-x-2" style={{marginTop: '-6px'}}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-gray-800 text-sm px-3 py-1.5"
              onClick={() => window.open('https://wa.me/971504015632', '_blank')}
            >
              <MessageCircle className="h-4 w-4 mr-1.5" />
              Live Chat
            </Button>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800 text-sm px-3 py-1.5">
                <User className="h-4 w-4 mr-1.5" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-0.5">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-12 h-12">
              <Image
                src="/pdt_logo.png"
                alt="Premium Dubai Tours Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className={`text-xs sm:text-sm font-bold uppercase leading-tight ${isInHeroSection ? 'text-white' : 'text-black'}`} style={{ textShadow: isInHeroSection ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none', fontWeight: 700 }}>
                PREMIUM DUBAI TOURS
              </h1>
              <p className={`text-[9px] sm:text-[10px] font-normal uppercase tracking-wide ${isInHeroSection ? 'text-white' : 'text-black'}`} style={{ textShadow: isInHeroSection ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none' }}>
                Refined Dubai Travel Experiences 
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div ref={searchRef} className="relative w-full">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    isInHeroSection ? 'text-white' : 'text-gray-400'
                  }`} />
                  <Input
                    type="text"
                    placeholder="Search Dubai tours…"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={`pl-10 pr-4 py-2 w-full ${
                      isInHeroSection
                        ? 'bg-transparent border-white/50 text-white placeholder-white/70 focus:border-white focus:ring-white'
                        : 'bg-transparent border-gray-300 text-white placeholder-white/70 focus:border-primary focus:ring-primary'
                    }`}
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    </div>
                  )}
                </div>
              </form>

              {/* Search Results Dropdown */}
              {isSearchOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      <div className="text-xs text-gray-500 mb-2 px-2">
                        {searchResults.length} package{searchResults.length !== 1 ? 's' : ''} found
                      </div>
                      {searchResults.map((pkg) => (
                        <Link
                          key={pkg._id}
                          href={getPackagePath(pkg)}
                          className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          <div className="flex items-start space-x-3">
                            {pkg.images && pkg.images.length > 0 ? (
                              <div className="w-16 h-12 relative flex-shrink-0">
                                <Image
                                  src={pkg.images[0].url}
                                  alt={pkg.images[0].alt || pkg.title}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                <MapPin className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 truncate">{pkg.title}</h4>
                              <p className="text-sm text-gray-600 truncate">{pkg.subtitle}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <div className="flex items-center text-xs text-gray-500">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {pkg.location}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {pkg.duration}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Star className="h-3 w-3 mr-1" />
                                  {pkg.rating}/5
                                </div>
                              </div>
                              <div className="text-sm font-semibold text-black mt-1">
                                {formatPrice(pkg.price)}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div className="border-t pt-2 mt-2">
                        <button
                          onClick={goToSearchResults}
                          className="block w-full text-center text-sm text-primary hover:text-primary/80 py-2"
                        >
                          View all results for "{searchTerm}"
                        </button>
                      </div>
                    </div>
                  ) : searchTerm.trim() && !isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No packages found for "{searchTerm}"</p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item: NavigationItem) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`flex items-center space-x-1 text-sm ${
                          isInHeroSection
                            ? isActive(item.href)
                              ? 'text-white font-semibold'
                              : 'text-white hover:text-gray-200'
                            : isActive(item.href)
                              ? 'text-black font-semibold'
                              : 'text-gray-800 hover:text-black'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 z-[130]">
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link 
                            href={subItem.href}
                            className={`w-full ${
                              isActive(subItem.href) 
                                ? 'text-black font-semibold' 
                                : 'text-gray-800'
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
                    className={`font-medium text-sm transition-colors ${
                      isInHeroSection
                        ? isActive(item.href)
                          ? 'text-white font-semibold'
                          : 'text-white hover:text-gray-200'
                        : isActive(item.href)
                          ? 'text-black font-semibold'
                          : 'text-gray-800 hover:text-black'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3 ml-8 flex-shrink-0">
            <Button 
              size="sm" 
              className="bg-black hover:bg-gray-800 text-white whitespace-nowrap"
              onClick={openForm}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors ${
              isInHeroSection 
                ? 'text-white hover:text-gray-200 hover:bg-white/10' 
                : 'text-gray-800 hover:text-black hover:bg-gray-100'
            }`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            {/* Mobile Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isInHeroSection ? 'text-white' : 'text-gray-400'
                    }`} />
                    <Input
                      type="text"
                      placeholder="Search packages..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className={`pl-10 pr-4 py-2 w-full ${
                        isInHeroSection
                          ? 'bg-transparent border-white/50 text-white placeholder-white/70 focus:border-white focus:ring-white'
                          : 'bg-transparent border-gray-300 text-white placeholder-white/70 focus:border-primary focus:ring-primary'
                      }`}
                    />
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className={`animate-spin rounded-full h-4 w-4 border-b-2 ${
                          isInHeroSection ? 'border-white' : 'border-black'
                        }`}></div>
                      </div>
                    )}
                  </div>
                </form>

                {/* Mobile Search Results */}
                {isSearchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      <div className="p-2">
                        <div className="text-xs text-gray-500 mb-2 px-2">
                          {searchResults.length} package{searchResults.length !== 1 ? 's' : ''} found
                        </div>
                        {searchResults.map((pkg) => (
                          <Link
                            key={pkg._id}
                            href={getPackagePath(pkg)}
                            className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setIsMenuOpen(false);
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              {pkg.images && pkg.images.length > 0 ? (
                                <div className="w-12 h-10 relative flex-shrink-0">
                                  <Image
                                    src={pkg.images[0].url}
                                    alt={pkg.images[0].alt || pkg.title}
                                    fill
                                    className="object-cover rounded"
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-10 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                  <MapPin className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 text-sm truncate">{pkg.title}</h4>
                                <p className="text-xs text-gray-600 truncate">{pkg.subtitle}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <div className="flex items-center text-xs text-gray-500">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {pkg.location}
                                  </div>
                                  <div className="text-xs font-semibold text-primary">
                                    {formatPrice(pkg.price)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                        <div className="border-t pt-2 mt-2">
                          <button
                            onClick={() => {
                              setIsMenuOpen(false);
                              goToSearchResults();
                            }}
                            className="block w-full text-center text-sm text-primary hover:text-primary/80 py-2"
                          >
                            View all results for "{searchTerm}"
                          </button>
                        </div>
                      </div>
                    ) : searchTerm.trim() && !isSearching ? (
                      <div className="p-4 text-center text-gray-500">
                        <Search className="h-6 w-6 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No packages found for "{searchTerm}"</p>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              {navigation.map((item: NavigationItem) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <div className="font-medium text-lg text-gray-900 mb-2">{item.name}</div>
                      <div className="pl-4 space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block py-2 text-lg transition-colors ${
                              isActive(subItem.href) 
                                ? 'text-black font-semibold' 
                                : 'text-gray-800 hover:text-black'
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
                      className={`block py-2 font-medium text-lg transition-colors ${
                        isActive(item.href) 
                          ? 'text-black font-semibold' 
                          : 'text-gray-800 hover:text-black'
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
                <Button 
                  size="sm" 
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  onClick={() => {
                    openForm();
                    setIsMenuOpen(false);
                  }}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
