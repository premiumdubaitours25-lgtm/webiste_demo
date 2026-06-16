'use client'

import { useState, useEffect } from "react";
import { Playfair_Display, Cormorant_Garamond, Poppins } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin, Clock, Users, Star, Calendar, Phone, Mail, ArrowLeft,
  CheckCircle, Plane, Camera, Globe, Heart, Share, Car, Hotel,
  Utensils, Info, X, Car as CarIcon, Building, Bed,
  Calendar as CalendarIcon, ChevronRight, ChevronDown, PlayCircle, Sparkles, ShieldCheck, Ticket, ArrowRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import BookingModal from "@/components/BookingModal";

// Utility function to render text with bold formatting
const renderBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index} className="font-bold text-gray-900">{boldText}</strong>;
    }
    return part;
  });
};

interface Package {
  _id: string;
  title: string;
  subtitle: string;
  ideaFor?: string;
  about: string;
  services: string[] | string;
  tourDetails: string;
  abstract?: string;
  tourOverview?: string;
  keyHighlights?: string[];
  hotelOptions?: string[];
  pricingOptions?: Array<{
    name: string;
    description?: string;
    price: number;
  }>;
  bestTimeToVisit?: {
    yearRound?: string;
    winter?: string;
    summer?: string;
  };
  whyChooseThisTrip?: string[];
  whyPremiumDubaiTours?: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }> | [];
  transportation: Array<{
    type: string;
    vehicle: string;
    description: string;
  }> | [];
  accommodation: Array<{
    city: string;
    hotel: string;
    rooms: string;
    roomType: string;
    nights: string;
  }> | [];
  inclusions?: string[] | Array<{ category: string; items: string[] }>;
  exclusions?: string[] | Array<{ category: string; items: string[] }>;
  reviews?: Array<{
    name: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  price: number;
  duration: string;
  location: string;
  capacity: string;
  packageType: 'domestic' | 'international';
  place: string;
  packageCategory?: string;
  images: Array<{
    public_id?: string;
    url: string;
    alt: string;
  }>;
  bookings: number;
  rating: number;
}

type PricingTier = {
  name: string;
  description: string;
  price: number;
};

const getPackagePricingTiers = (pkg: Package | null): PricingTier[] => {
  if (!pkg) return [];

  const raw = pkg.pricingOptions;
  if (Array.isArray(raw) && raw.length > 0) {
    const structured = typeof raw[0] === 'object' && raw[0] !== null && 'name' in raw[0];
    if (structured) {
      return raw
        .map((tier) => ({
          name: String(tier.name || '').trim(),
          description: String(tier.description || '').trim(),
          price: Number(tier.price) > 0 ? Number(tier.price) : pkg.price,
        }))
        .filter((tier) => tier.name);
    }
  }

  return [];
};

const PackageDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'policy'>('overview');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [expandedPricingTier, setExpandedPricingTier] = useState('');

  useEffect(() => {
    if (!packageData) {
      setExpandedPricingTier('');
      return;
    }

    const tiers = getPackagePricingTiers(packageData);
    if (tiers.length > 0) {
      setExpandedPricingTier((prev) =>
        tiers.some((tier) => tier.name === prev) ? prev : tiers[0].name
      );
    } else {
      setExpandedPricingTier('');
    }
  }, [packageData]);

  useEffect(() => {
    const fetchPackage = async () => {
      if (!params?.id) return;
      
      // Ensure id is a string (Next.js params can be string | string[])
      const packageId = Array.isArray(params.id) ? params.id[0] : params.id;
      if (!packageId) return;
      
      // Skip API fetch for demo packages (handled by second useEffect)
      // Attraction packages (like burj-khalifa-tickets) should always fetch from API
      const demoPackageIds = [
        'demo-package-id', 
        'premium-dubai-tours-default',
        'dubai-grand-signature-journey', 
        'dubai-signature-explorer',
        'dubai-stopover-signature', 
        'dubai-transit-escape',
        'dubai-grand-explorer', 
        'dubai-essential-experience',
        'dubai-grand-experience', 
        'classic-discovery-dubai-abu-dhabi',
        'dubai-private-classic-discovery', 
        'dubai-elite-grand-explorer'
      ];
      
      // For attraction packages, always fetch from API (no hardcoded fallback)
      const isAttractionPackage = packageId.includes('ticket') || packageId.includes('attraction') || packageId === 'burj-khalifa-tickets';
      
      if (!isAttractionPackage && demoPackageIds.includes(packageId)) {
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        // Always fetch from API for attraction packages
        const response = await fetch(`/api/packages/${packageId}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          // Transform images if needed
          const transformedData = {
            ...result.data,
            images: result.data.images?.map((img: any) => ({
              url: img.url || img.public_id,
              alt: img.alt || result.data.title,
              public_id: img.public_id
            })) || []
          };
          setPackageData(transformedData);
        } else {
          // For attraction packages, show error if not found (no fallback)
          if (isAttractionPackage) {
            setError('Attraction package not found. Please check the package ID or contact support.');
          } else {
            setError('Package not found');
          }
        }
      } catch (err) {
        console.error('Error fetching package:', err);
        // For attraction packages, show specific error message
        if (isAttractionPackage) {
          setError('Failed to load attraction package details. Please try again or contact support.');
        } else {
          setError('Failed to load package details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [params?.id]);

  // Keep old hardcoded data as fallback for demo (only for specific demo IDs)
  // Attraction packages should NEVER use hardcoded data - only API data
  useEffect(() => {
    if (!params?.id) return;
    
    // Ensure id is a string (Next.js params can be string | string[])
    const packageId = Array.isArray(params.id) ? params.id[0] : params.id;
    if (!packageId) return;
    
    // Skip hardcoded data for attraction packages - they must use API data only
    const isAttractionPackage = packageId.includes('ticket') || packageId.includes('attraction') || packageId === 'burj-khalifa-tickets';
    if (isAttractionPackage) {
      return; // Don't set any hardcoded data for attraction packages
    }
    
    // Only set hardcoded data for specific demo IDs, skip API fetch for these
      if (packageId === 'demo-package-id') {
        // Set hardcoded demo data
        setPackageData({
          _id: 'demo-package-id',
          title: 'Royal Dubai Experience',
          subtitle: 'Luxury Desert & City Tour',
          about: 'Experience the ultimate luxury in Dubai with our premium package including 5-star accommodation, private desert safari, and VIP access to Burj Khalifa.',
          services: ['5-Star Hotel', 'Private Transfer', 'Guide', 'All Meals'],
          tourDetails: 'A comprehensive 5-day tour of Dubai.',
          itinerary: [
            { day: 1, title: 'Arrival in Style', description: 'Private transfer to Atlantis The Palm. Welcome dinner at Nobu.' },
            { day: 2, title: 'Modern Dubai', description: 'VIP tour of Burj Khalifa (Level 148). Shopping at Dubai Mall. Fountain show.' },
            { day: 3, title: 'Desert Magic', description: 'Luxury desert safari with private dinner under the stars.' },
            { day: 4, title: 'Cultural Heritage', description: 'Visit Al Fahidi Fort and Dubai Museum. Abra ride across Dubai Creek.' },
            { day: 5, title: 'Departure', description: 'Leisure time before private transfer to airport.' }
          ],
          price: 5500,
          duration: '5 Days',
          location: 'Dubai',
          capacity: '2 - 4 People',
          packageType: 'domestic',
          place: 'Dubai', // Cast generic string to specific literal if needed, or update interface
          images: [
            { url: '/domestic-tour-packages-services.jpg', alt: 'Royal Dubai Experience' },
            { url: '/slider-image-2.jpeg', alt: 'Burj Al Arab' },
            { url: '/slider-image-3.jpg', alt: 'Desert Safari' }
          ],
          bookings: 128,
          rating: 4.9,
          inclusions: ['5N Accommodation', 'Breakfast & Dinner', 'Airport Transfers', 'All Entry Tickets'],
          exclusions: ['Flight Tickets', 'Personal Expenses', 'Lunch'],
          transportation: [
            { type: 'Transfers', vehicle: 'Luxury Sedan', description: 'Airport and inter-hotel transfers' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Atlantis The Palm', rooms: '1', roomType: 'Ocean Queen', nights: '5' }
          ],
          reviews: [
            { name: "John Doe", rating: 5, comment: "Absolutely stunning experience! The service was impeccable.", date: "2024-01-15" }
          ]
        } as any); // Cast to any to bypass strict literal type check for 'place' if it mismatches
        setLoading(false);
      } else if (packageId === 'premium-dubai-tours-default') {
        // Set Dubai Signature Private Escape premium package data
        setPackageData({
          _id: 'premium-dubai-tours-default',
          title: 'Dubai Signature Private Escape',
          subtitle: '3 Nights / 4 Days Premium Private Tour Package',
          about: 'The Dubai Signature Private Escape is a carefully crafted premium short-stay itinerary designed for travelers who want to experience Dubai in comfort, privacy, and style.',
          services: [
            'Fully private airport transfers and sightseeing',
            'Exclusive private yacht dinner cruise at Dubai Marina',
            'Personalized Dubai city tour (Old & New Dubai)',
            'Morning private desert safari experience',
            'Luxury 1-hour limousine ride',
            'Optional access to Burj Khalifa, Dubai Aquarium & Ain Dubai',
            'Flexible hotel options or no-hotel package available'
          ],
          tourDetails: `Abstract

The Dubai Signature Private Escape is a carefully crafted premium short-stay itinerary designed for travelers who want to experience Dubai in comfort, privacy, and style. This tour blends iconic city landmarks, exclusive experiences, and relaxed pacing, making it ideal for families, honeymoon couples, and small groups who prefer private services over crowded group tours.

From a private yacht dinner at Dubai Marina to a personalized city tour, desert safari, and luxury limousine ride, this package focuses on meaningful experiences rather than rushed sightseeing. Every element is customizable, allowing travelers to shape the journey according to their preferences, travel pace, and budget.

Tour Overview

Dubai is a city best experienced with thoughtful planning, especially for travelers seeking privacy and flexibility. The Dubai Signature Private Escape has been designed as an entry-level premium package that introduces Dubai’s highlights while maintaining a relaxed and elegant flow.

Unlike regular group tours, this itinerary operates entirely on a private basis, ensuring personalized attention, flexible timing, and a stress-free experience. Guests travel in a private vehicle with professional drivers and dedicated coordination support throughout the trip.

The itinerary begins with a warm welcome at the airport, followed by a scenic private yacht dinner cruise, setting the tone for a refined Dubai experience. A full private city tour allows guests to explore both modern and traditional Dubai at their own pace, while optional attraction tickets are arranged only after confirming the number of travelers, ensuring transparency and fair pricing.

A morning desert safari, scheduled to avoid peak heat, offers a serene desert experience ideal for families and first-time visitors. The journey concludes with luxury touches such as a chauffeur-driven limousine ride and optional access to Dubai’s iconic Ain Dubai observation wheel.

This package is perfect for travelers who want quality over quantity, privacy over crowds, and flexibility over fixed schedules.

Key Highlights

• Fully private airport transfers and sightseeing
• Exclusive private yacht dinner cruise at Dubai Marina
• Personalized Dubai city tour (Old & New Dubai)
• Morning private desert safari experience
• Luxury 1-hour limousine ride
• Optional access to Burj Khalifa, Dubai Aquarium & Ain Dubai
• Flexible hotel options or no-hotel package available

Best Time to Visit

Dubai is a year-round destination, and this package is designed accordingly.

• October to April: Pleasant weather, ideal for outdoor sightseeing
• May to September: More affordable pricing; activities are planned indoors or during cooler morning and evening hours

Summer travelers benefit from reduced hotel rates and fewer crowds, making this package especially attractive for budget-conscious premium travelers.

Why Choose This Trip?

• Ideal length for a premium Dubai introduction
• Designed for travelers who value privacy and comfort
• No forced shopping stops or shared transportation
• Perfect for families, couples, and honeymooners
• Customizable activities and flexible scheduling

Why Premium Dubai Tours for This Trip?

At Premium Dubai Tours, luxury is not about exaggeration; it’s about execution, reliability, and transparency.

• Private-first approach: No shared vehicles or rushed group schedules
• Per-vehicle pricing: Better value for families and small groups
• Custom planning: Tours adjusted based on guest preferences
• Local expertise: On-ground coordination and experienced staff
• Honest pricing: Attraction tickets arranged only after confirmation

We focus on delivering smooth, well-managed journeys rather than selling oversized promises.`,
          itinerary: [
            {
              day: 1,
              title: 'Arrival in Dubai & Private Yacht Dinner Cruise',
              description: 'Upon arrival at Dubai International Airport, you will be greeted by our representative and transferred to your hotel in a private vehicle (if accommodation is selected). In the evening, experience a private yacht dinner cruise at Dubai Marina, sailing through the illuminated skyline while enjoying a relaxed onboard dining experience. Overnight: Dubai.'
            },
            {
              day: 2,
              title: 'Private Dubai City Tour',
              description: 'After breakfast, begin a private guided city tour covering Dubai’s cultural and contemporary highlights. Visit Old Dubai heritage areas, Jumeirah Mosque, Burj Al Arab (photo stop), Dubai Mall, and enjoy optional visits to Burj Khalifa and Dubai Aquarium. The tour runs at a comfortable pace with time for exploration, photography, and breaks. Overnight: Dubai.'
            },
            {
              day: 3,
              title: 'Morning Desert Safari & Evening Luxury Experience',
              description: 'Start early for a private morning desert safari featuring dune bashing and scenic desert views in a calm environment, ideal for families and travelers avoiding late-night safaris. In the evening, enjoy a 1-hour private limousine ride, followed by an optional visit to Ain Dubai Observation Wheel for panoramic city views. Overnight: Dubai.'
            },
            {
              day: 4,
              title: 'Departure',
              description: 'After breakfast, enjoy a private transfer to Dubai International Airport for departure.'
            }
          ],
          price: 0,
          duration: '3 Nights / 4 Days',
          location: 'Dubai, UAE',
          capacity: 'Up to 6 guests per vehicle',
          packageType: 'domestic',
          place: 'dubai',
          images: [
            { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
            { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
            { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
            { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
          ],
          bookings: 0,
          rating: 5,
          inclusions: [
            'Private airport and hotel transfers',
            'All sightseeing tours on a private basis',
            'Private yacht dinner cruise',
            'Private desert safari experience',
            'Private limousine ride',
            'Daily breakfast (if hotel option selected)',
            'Staff salaries, government taxes, and operational expenses'
          ],
          exclusions: [
            'International airfare (assistance available on request)',
            'UAE entry visa (assistance available on request)',
            'Attraction tickets (Burj Khalifa, Aquarium, Ain Dubai)',
            'Personal expenses (meals, shopping, insurance, etc.)',
            'Tourism dirhams and staff tips (if applicable)'
          ],
          transportation: [
            { type: 'Private Vehicle', vehicle: 'Luxury Sedan/SUV/Van', description: 'Private vehicle-based tours (up to 6 guests per vehicle). Other vehicles available for larger groups.' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Without hotel / 4-star / 5-star options', rooms: 'As per requirement', roomType: 'No hotel / 4-star / 5-star', nights: '3 Nights' }
          ],
          reviews: [
            { name: 'Anna Roberts', rating: 5, comment: 'Perfect private escape for our anniversary. The yacht cruise and limousine ride were unforgettable.', date: '2024-02-18' },
            { name: 'Khalid Ahmad', rating: 5, comment: 'Ideal for our family. Fully private, flexible timing, and excellent coordination.', date: '2024-03-02' }
          ],
          packageCategory: 'premium',
          bestTimeToVisit: {
            yearRound: 'Dubai is a year-round destination, and this package is designed accordingly.',
            winter: 'October to April: Pleasant weather, ideal for outdoor sightseeing.',
            summer: 'May to September: More affordable pricing with activities planned indoors or during cooler morning and evening hours. Summer travelers benefit from reduced hotel rates and fewer crowds.'
          },
          whyChooseThisTrip: [
            'Ideal length for a premium Dubai introduction',
            'Designed for travelers who value privacy and comfort',
            'No forced shopping stops or shared transportation',
            'Perfect for families, couples, and honeymooners',
            'Customizable activities and flexible scheduling'
          ],
          whyPremiumDubaiTours: [
            'Private-first approach with no shared vehicles or rushed group schedules',
            'Per-vehicle pricing that offers better value for families and small groups',
            'Custom planning with tours adjusted based on guest preferences',
            'Local expertise with on-ground coordination and experienced staff',
            'Honest pricing with attraction tickets arranged only after confirmation'
          ],
          faqs: [
            {
              question: 'Is this package suitable for families with children?',
              answer: 'Yes, the itinerary is family-friendly and fully customizable to suit the needs of families traveling with children.'
            },
            {
              question: 'Can I book this tour without a hotel?',
              answer: 'Yes, a no-hotel option is available. You can choose to book only the private tours and services without accommodation.'
            },
            {
              question: 'Are attraction tickets included?',
              answer: 'No, attraction tickets are optional and arranged after confirming the number of travelers to ensure fair and transparent pricing.'
            },
            {
              question: 'Is this a private tour?',
              answer: 'Yes, all services including transfers, tours, yacht cruise, and desert safari are operated on a private basis exclusively for your group.'
            }
          ]
        } as any);
        setLoading(false);
      } else if (packageId === 'dubai-grand-signature-journey') {
        // Set Dubai Grand Signature Journey package data
        setPackageData({
          _id: 'dubai-grand-signature-journey',
          title: 'Dubai Grand Signature Journey',
          subtitle: '5 Nights / 6 Days Premium Private Dubai Tour',
          about: 'The Dubai Grand Signature Journey – 5 Nights / 6 Days is a refined private Dubai travel experience designed for travelers who want more time, more depth, and more flexibility while exploring the UAE.',
          services: [
            'Private airport transfers in a dedicated vehicle',
            'Private yacht dinner cruise at Dubai Marina',
            'Guided private Dubai city tour',
            'Visit to Burj Khalifa, Dubai Mall, and Dubai Aquarium (optional tickets)',
            'Dubai Frame, Miracle Garden, and Butterfly Garden visits',
            'Evening leisure at Global Village or Ain Dubai',
            'Private Abu Dhabi city tour with one theme park',
            'Dolphin show experience at Dubai Creek',
            'One-hour private limousine ride',
            'Private desert safari with premium BBQ dinner and entertainment',
            'Fully customizable itinerary with flexible hotel options'
          ],
          tourDetails: `Abstract

The Dubai Grand Signature Journey – 5 Nights / 6 Days is a refined private Dubai travel experience designed for travelers who want more time, more depth, and more flexibility while exploring the UAE. This premium itinerary expands beyond Dubai’s highlights to include Abu Dhabi, creating a well-rounded journey that balances sightseeing, leisure, and exclusive experiences.

Crafted for families with children, honeymooners, and small private groups, this tour prioritizes privacy, personalized pacing, and premium services. All sightseeing and transfers are conducted in private vehicles, ensuring comfort and ease throughout the journey. Experiences such as a private yacht dinner cruise, private desert safari, and one-hour limousine ride elevate the travel experience without overloading the itinerary.

Guests may select from three pricing options: tour-only (without hotel), 4-star hotel accommodation, or 5-star luxury accommodation. Attraction tickets are intentionally excluded at the planning stage to allow complete customization based on traveler interests and group size, with tickets provided later at discounted rates.

Tour Overview

This 5 Nights / 6 Days Premium Dubai Tour Package offers an immersive yet relaxed introduction to Dubai and Abu Dhabi. The itinerary is thoughtfully designed to avoid long travel days and overcrowded schedules while still covering the UAE’s most iconic attractions.

The journey begins with a calm arrival and an evening private yacht dinner cruise at Dubai Marina. Guests then explore Dubai’s modern and cultural landmarks through a private city tour featuring Burj Khalifa, Dubai Mall, and Dubai Aquarium. Midway through the journey, visitors enjoy Dubai’s creative attractions, Dubai Frame, Miracle Garden, and Global Village, before heading to Abu Dhabi for a private city tour with one theme park of choice.

The final days focus on premium leisure, including dolphin shows, limousine rides, and a private desert safari with BBQ dinner at a premium desert camp. With per-vehicle pricing for up to six guests, this package offers exceptional value for families and private groups seeking comfort and exclusivity.

Key Highlights

• Private airport transfers in a dedicated vehicle
• Private yacht dinner cruise at Dubai Marina
• Guided private Dubai city tour
• Visit to Burj Khalifa, Dubai Mall, and Dubai Aquarium (optional tickets)
• Dubai Frame, Miracle Garden, and Butterfly Garden visits
• Evening leisure at Global Village or Ain Dubai
• Private Abu Dhabi city tour with one theme park
• Dolphin show experience at Dubai Creek
• One-hour private limousine ride
• Private desert safari with premium BBQ dinner and entertainment
• Fully customizable itinerary with flexible hotel options

Pricing Options (Per Vehicle – Up to 6 Guests)

• Tour Only (Without Hotel Accommodation)
• Premium 4-Star Hotel Accommodation
• Luxury 5-Star Hotel Accommodation

Best Time to Visit Dubai

This tour is available throughout the year.

• October to April: Pleasant weather for outdoor activities
• May to September: Lower costs and fewer crowds, with activities scheduled indoors or in the evening

Why Choose This Trip?

• Covers both Dubai and Abu Dhabi
• Private tours ensure comfort and flexibility
• Ideal for families, couples, and private groups
• Balanced mix of sightseeing and leisure

Why Premium Dubai Tours for This Journey?

• Dedicated private vehicles and professional drivers
• Custom itinerary adjustments based on preferences
• Discounted attraction tickets arranged on request
• Transparent pricing and local expertise`,
          itinerary: [
            { 
              day: 1, 
              title: 'Arrival in Dubai & Private Yacht Dinner Cruise',
              description: `Arrive at Dubai International Airport, where you will be greeted by our representative and transferred via private vehicle to your hotel (if accommodation is selected).

In the evening, enjoy a private yacht dinner cruise at Dubai Marina. Glide past illuminated skyscrapers while enjoying dinner in a calm, exclusive setting, an ideal start to a premium Dubai holiday.

Overnight in Dubai.`
            },
            { 
              day: 2, 
              title: 'Private Dubai City Tour & Iconic Attractions',
              description: `After breakfast, begin a private Dubai city tour covering the city’s most important landmarks.

Highlights include:
• Drive along Sheikh Zayed Road
• Photo stops at Burj Al Arab and Jumeirah area
• Visit to Burj Khalifa (optional ticket)
• Leisure time at Dubai Mall
• Dubai Aquarium & Underwater Zoo visit (optional ticket)

Return to the hotel with time to relax or explore independently.

Overnight in Dubai.`
            },
            { 
              day: 3, 
              title: 'Dubai Frame, Miracle Garden & Evening Entertainment',
              description: `This day showcases Dubai’s architectural creativity and leisure attractions.

Morning visits include:
• Dubai Frame
• Miracle Garden
• Butterfly Garden

In the evening, choose between:
• Global Village for cultural entertainment
OR
• Ain Dubai Ferris Wheel experience

Overnight in Dubai.`
            },
            { 
              day: 4, 
              title: 'Private Abu Dhabi City Tour with One Theme Park',
              description: `After breakfast, travel in a private vehicle to Abu Dhabi, the UAE’s capital.

The city tour includes:
• Sheikh Zayed Grand Mosque (external visit as per guidelines)
• Corniche drive and city landmarks

Later, enjoy one theme park experience of your choice:
• Ferrari World
• Warner Bros. World
• SeaWorld Abu Dhabi

Return to Dubai in the evening.

Overnight in Dubai.`
            },
            { 
              day: 5, 
              title: 'Dolphin Show, Limousine Ride & Private Desert Safari',
              description: `Begin the day with a dolphin show at Dubai Creek, a favorite for families.

Later, enjoy a one-hour private limousine ride, offering a stylish way to experience the city.

In the afternoon, proceed for a private desert safari, featuring dune bashing, sandboarding, camel rides, and a premium desert camp experience with BBQ dinner and live performances.

Overnight in Dubai.`
            },
            { 
              day: 6, 
              title: 'Departure', 
              description: `After breakfast, enjoy a relaxed morning before your private transfer to the airport, concluding your premium Dubai journey.`
            }
          ],
          price: 0,
          duration: '5 Nights / 6 Days',
          location: 'Dubai, UAE',
          capacity: 'Up to 6 guests per vehicle',
          packageType: 'domestic',
          place: 'dubai',
          images: [
            { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
            { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
            { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
            { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Abu Dhabi' }
          ],
          bookings: 0,
          rating: 5,
          inclusions: [
            {
              category: 'Airport & Hotel Transfers',
              items: ['Private airport and hotel transfers']
            },
            {
              category: 'Tours',
              items: ['All private tours as outlined']
            },
            {
              category: 'Experiences',
              items: [
                'Private yacht dinner cruise',
                'Private desert safari',
                'Private limousine ride'
              ]
            },
            {
              category: 'Meals',
              items: ['Breakfast with hotel accommodation (if selected)']
            },
            {
              category: 'Staff & Taxes',
              items: ['Field staff salaries, government taxes, and office expenses']
            }
          ],
          exclusions: [
            {
              category: 'International Airfare',
              items: ['International airfare (assistance available on request)']
            },
            {
              category: 'UAE Entry Visa',
              items: ['UAE entry visa (assistance available on request)']
            },
            {
              category: 'Personal Expenses',
              items: ['Personal expenses']
            },
            {
              category: 'Attraction Tickets',
              items: ['Attraction entry tickets (arranged at discounted rates)']
            },
            {
              category: 'Tourism Dirham Fees',
              items: ['Tourism dirham fees (if applicable)']
            },
            {
              category: 'Tips & Gratuities',
              items: ['Tips and gratuities']
            }
          ],
          transportation: [
            { type: 'Private Vehicle', vehicle: 'Luxury Sedan/SUV/Van', description: 'Private vehicle-based tours (up to 6 guests per vehicle). Other vehicles available for larger groups.' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Tour Only / 4-Star / 5-Star options', rooms: 'As per requirement', roomType: 'Without hotel / 4-star / 5-star', nights: '5 Nights' }
          ],
          reviews: [
            { name: 'Sophia Lee', rating: 5, comment: 'Perfect balance of Dubai and Abu Dhabi with enough free time built in.', date: '2024-02-10' },
            { name: 'Ahmed Khan', rating: 5, comment: 'Our family loved the private services and flexibility throughout the trip.', date: '2024-03-08' }
          ],
          packageCategory: 'premium',
          bestTimeToVisit: {
            yearRound: 'This tour is available throughout the year.',
            octoberToApril: 'Pleasant weather for outdoor activities.',
            mayToSeptember: 'Lower costs and fewer crowds, with activities scheduled indoors or in the evening.'
          },
          whyChooseThisTrip: [
            'Covers both Dubai and Abu Dhabi',
            'Private tours ensure comfort and flexibility',
            'Ideal for families, couples, and private groups',
            'Balanced mix of sightseeing and leisure'
          ],
          whyPremiumDubaiTours: [
            'Dedicated private vehicles and professional drivers',
            'Custom itinerary adjustments based on preferences',
            'Discounted attraction tickets arranged on request',
            'Transparent pricing and local expertise'
          ],
          faqs: [
            {
              question: 'Is this tour suitable for families with children?',
              answer: 'Yes, all experiences are family-friendly and can be tailored to suit the needs of families with children.'
            },
            {
              question: 'Can the Abu Dhabi theme park be changed?',
              answer: 'Yes, guests may select any one park from the available options.'
            },
            {
              question: 'Is pricing per person?',
              answer: 'No, pricing is per vehicle for up to six guests, offering excellent value for private groups.'
            },
            {
              question: 'Can hotels be upgraded or changed?',
              answer: 'Yes, accommodation options are fully flexible and can be upgraded or changed based on your preferences.'
            }
          ]
        } as any);
        setLoading(false);
      } else if (packageId === 'dubai-elite-grand-explorer') {
        // Set Dubai Elite Grand Explorer package data
        setPackageData({
          _id: 'dubai-elite-grand-explorer',
          title: 'Dubai Elite Grand Explorer',
          subtitle: '6 Nights / 7 Days Premium Private Dubai & UAE Tour',
          about: 'The Dubai Elite Grand Explorer – 6 Nights / 7 Days Premium Tour is a comprehensive private travel experience designed for travelers who want to explore Dubai beyond the basics, while also discovering neighboring Emirates in comfort and privacy.',
          services: [
            'Private airport transfers in a dedicated premium vehicle',
            'Fully guided private Dubai city tour',
            'Visit to Burj Khalifa, Dubai Mall & Dubai Aquarium (optional tickets)',
            'Dubai Frame, Miracle Garden & Butterfly Garden',
            'Evening entertainment at Global Village or Ain Dubai',
            'Private Abu Dhabi city tour with one theme park experience',
            'Cultural private Sharjah city tour',
            'Private yacht dinner cruise at Dubai Marina',
            'Dolphin show experience at Dubai Creek',
            'One-hour private limousine ride',
            'Private desert safari with premium BBQ dinner & live entertainment',
            'Flexible hotel options and customizable daily schedules'
          ],
          tourDetails: `Abstract

The Dubai Elite Grand Explorer – 6 Nights / 7 Days Premium Tour is a comprehensive private travel experience designed for travelers who want to explore Dubai beyond the basics, while also discovering neighboring Emirates in comfort and privacy. This itinerary offers the perfect balance of sightseeing, leisure, and exclusive experiences, allowing guests to experience Dubai’s modern icons, cultural landmarks, and luxury lifestyle at a relaxed pace.

This premium package is ideal for families with children, honeymoon couples, and small private groups who value privacy, flexibility, and personalized service. All tours and transfers are conducted in private vehicles, and premium experiences such as a private yacht dinner cruise, private desert safari, and private limousine ride are included to elevate the journey.

Guests can choose from three pricing options:
• Tour only (without hotel accommodation)
• 4-star hotel accommodation
• 5-star luxury hotel accommodation

Attraction tickets are not pre-included, allowing full customization based on group size and interests, with tickets arranged later at discounted rates.

Tour Overview

This 6 Nights / 7 Days Premium Dubai Tour Package is carefully designed to avoid rushed sightseeing while ensuring comprehensive coverage of Dubai, Abu Dhabi, and Sharjah. The itinerary allows sufficient time for relaxation, shopping, and optional upgrades while maintaining a smooth travel flow.

The journey begins with a relaxed arrival and continues with a private Dubai city tour, iconic attractions such as Burj Khalifa and Dubai Mall, creative landmarks like Dubai Frame and Miracle Garden, and immersive experiences such as Global Village. Guests then enjoy a private Abu Dhabi city tour with one world-renowned theme park before discovering Sharjah’s cultural heritage.

Luxury elements are woven throughout the itinerary, including a private yacht dinner cruise, one-hour limousine ride, and a private desert safari with BBQ dinner at a premium desert camp. With pricing structured per vehicle for up to six guests, this package delivers strong value for private travelers seeking a refined UAE holiday.

Key Highlights

• Private airport transfers in a dedicated premium vehicle
• Fully guided private Dubai city tour
• Visit to Burj Khalifa, Dubai Mall & Dubai Aquarium (optional tickets)
• Dubai Frame, Miracle Garden & Butterfly Garden
• Evening entertainment at Global Village or Ain Dubai
• Private Abu Dhabi city tour with one theme park experience
• Cultural private Sharjah city tour
• Private yacht dinner cruise at Dubai Marina
• Dolphin show experience at Dubai Creek
• One-hour private limousine ride
• Private desert safari with premium BBQ dinner & live entertainment
• Flexible hotel options and customizable daily schedules

Pricing Options (Per Vehicle – Up to 6 Guests)

• Tour Only (Without Hotel Accommodation)
• Premium 4-Star Hotel Accommodation
• Luxury 5-Star Hotel Accommodation

Best Time to Visit Dubai

This tour operates year-round.

• October to April: Ideal weather for sightseeing and outdoor attractions
• May to September: More affordable travel with activities scheduled indoors or during evenings

Why Choose This Trip?

• Covers Dubai, Abu Dhabi, and Sharjah
• Fully private and flexible itinerary
• Ideal for families, honeymooners, and small groups
• Balanced mix of culture, luxury, and leisure

Why Premium Dubai Tours for This Journey?

• Per-vehicle pricing for better value
• Private vehicles and experienced local staff
• Custom attraction tickets at discounted rates
• Transparent planning and reliable operations`,
          itinerary: [
            {
              day: 1,
              title: 'Arrival in Dubai & Hotel Transfer',
              description: `Arrive at Dubai International Airport, where you will be welcomed by our representative and transferred in a private air-conditioned vehicle to your selected hotel.

The rest of the day is kept free to recover from travel or enjoy light exploration at your own pace.

Overnight in Dubai.`
            },
            {
              day: 2,
              title: 'Private Dubai City Tour & Iconic Landmarks',
              description: `After breakfast, begin a private Dubai city tour showcasing the city’s evolution from heritage roots to global metropolis.

Highlights include:
• Sheikh Zayed Road skyline drive
• Photo stop at Burj Al Arab
• Jumeirah area landmarks
• Visit to Burj Khalifa (optional ticket)
• Leisure time at Dubai Mall
• Dubai Aquarium & Underwater Zoo (optional ticket)

Return to the hotel with the evening at leisure.

Overnight in Dubai.`
            },
            {
              day: 3,
              title: 'Dubai Frame, Miracle Garden & Evening Experience',
              description: `Explore Dubai’s architectural and creative attractions today.

Morning visits include:
• Dubai Frame
• Miracle Garden
• Butterfly Garden

In the evening, choose between:
• Global Village cultural experience
OR
• Ain Dubai Ferris Wheel experience

Overnight in Dubai.`
            },
            {
              day: 4,
              title: 'Private Abu Dhabi City Tour with One Theme Park',
              description: `Travel to Abu Dhabi in a private vehicle for a full-day guided city tour.

Tour highlights include:
• Sheikh Zayed Grand Mosque (external visit as permitted)
• Corniche drive
• City landmarks and cultural stops

Later, enjoy one theme park experience of your choice:
• Ferrari World
• Warner Bros. World
• SeaWorld Abu Dhabi

Return to Dubai in the evening.

Overnight in Dubai.`
            },
            {
              day: 5,
              title: 'Private Sharjah City Tour & Yacht Dinner Cruise',
              description: `Discover the cultural capital of the UAE with a private Sharjah city tour, exploring museums, heritage areas, and traditional markets.

In the evening, return to Dubai Marina for a private yacht dinner cruise, enjoying skyline views and a relaxed dining experience on the water.

Overnight in Dubai.`
            },
            {
              day: 6,
              title: 'Dolphin Show, Limousine Ride & Private Desert Safari',
              description: `Begin the day with a dolphin show at Dubai Creek, suitable for all ages.

Later, enjoy a one-hour private limousine ride, offering a unique way to explore Dubai in comfort.

In the afternoon, proceed for a private desert safari, including dune bashing, camel rides, sandboarding, and a premium desert camp experience with BBQ dinner and live entertainment.

Overnight in Dubai.`
            },
            {
              day: 7,
              title: 'Departure',
              description: `After breakfast, enjoy a relaxed morning before your private airport transfer, marking the end of your premium UAE journey.`
            }
          ],
          price: 0,
          duration: '6 Nights / 7 Days',
          location: 'Dubai, UAE',
          capacity: 'Up to 6 guests per vehicle',
          packageType: 'domestic',
          place: 'dubai',
          images: [
            { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
            { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Abu Dhabi' },
            { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
            { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' }
          ],
          bookings: 0,
          rating: 5,
          inclusions: [
            {
              category: 'Airport & Hotel Transfers',
              items: ['Private airport and hotel transfers']
            },
            {
              category: 'Tours',
              items: ['All private tours as outlined']
            },
            {
              category: 'Experiences',
              items: [
                'Private yacht dinner cruise',
                'Private desert safari experience',
                'Private limousine ride'
              ]
            },
            {
              category: 'Meals',
              items: ['Breakfast with hotel accommodation (if selected)']
            },
            {
              category: 'Staff & Taxes',
              items: ['Field staff salaries, government taxes, and office expenses']
            }
          ],
          exclusions: [
            {
              category: 'International Airfare',
              items: ['International airfare (assistance available on request)']
            },
            {
              category: 'UAE Entry Visa',
              items: ['UAE entry visa (assistance available on request)']
            },
            {
              category: 'Personal Expenses',
              items: ['Personal expenses']
            },
            {
              category: 'Attraction Tickets',
              items: ['Attraction entry tickets (arranged at discounted rates)']
            },
            {
              category: 'Tourism Dirham Fees',
              items: ['Tourism dirham fees (if applicable)']
            },
            {
              category: 'Tips & Gratuities',
              items: ['Tips and gratuities']
            }
          ],
          transportation: [
            { type: 'Private Vehicle', vehicle: 'Luxury Sedan/SUV/Van', description: 'Private vehicle-based tours (up to 6 guests per vehicle). Other vehicles available for larger groups.' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Tour Only / 4-Star / 5-Star options', rooms: 'As per requirement', roomType: 'Without hotel / 4-star / 5-star', nights: '6 Nights' }
          ],
          reviews: [
            { name: 'Laura Mitchell', rating: 5, comment: 'Perfect mix of Dubai, Abu Dhabi, and Sharjah with complete privacy and comfort.', date: '2024-02-25' },
            { name: 'Rahul Mehta', rating: 5, comment: 'The private tours and flexible pace made this ideal for our multi-generational family.', date: '2024-03-12' }
          ],
          packageCategory: 'premium',
          bestTimeToVisit: {
            yearRound: 'This tour operates year-round.',
            octoberToApril: 'Ideal weather for sightseeing and outdoor attractions.',
            mayToSeptember: 'More affordable travel with activities scheduled indoors or during evenings.'
          },
          whyChooseThisTrip: [
            'Covers Dubai, Abu Dhabi, and Sharjah',
            'Fully private and flexible itinerary',
            'Ideal for families, honeymooners, and small groups',
            'Balanced mix of culture, luxury, and leisure'
          ],
          whyPremiumDubaiTours: [
            'Per-vehicle pricing for better value',
            'Private vehicles and experienced local staff',
            'Custom attraction tickets at discounted rates',
            'Transparent planning and reliable operations'
          ],
          faqs: [
            {
              question: 'Is this tour suitable for children and senior travelers?',
              answer: 'Yes, the itinerary is flexible and paced for comfort, making it suitable for both children and senior travelers.'
            },
            {
              question: 'Can the Sharjah tour be replaced with another activity?',
              answer: 'Yes, the itinerary is fully customizable and the Sharjah tour can be replaced with another activity of your choice.'
            },
            {
              question: 'Is pricing per person or per vehicle?',
              answer: 'Pricing is per vehicle for up to six guests, offering excellent value for families and small groups.'
            },
            {
              question: 'Can hotels be changed or upgraded?',
              answer: 'Yes, hotel options are flexible and can be adjusted or upgraded based on your preferences.'
            }
          ]
        } as any);
        setLoading(false);
      } else if (packageId === 'dubai-private-classic-discovery') {
        // Set Dubai Private Classic Discovery package data
        setPackageData({
          _id: 'dubai-private-classic-discovery',
          title: 'Dubai Private Classic Discovery',
          subtitle: '4 Nights / 5 Days Premium Private Tour Package',
          about: 'The Dubai Signature Escape – 4 Nights / 5 Days is a carefully curated premium Dubai tour designed for travelers who value privacy, comfort, flexibility, and refined experiences. This journey blends Dubai\'s iconic landmarks with exclusive private services, allowing guests to experience the city at a relaxed, unhurried pace.',
          services: [
            'Private airport transfers in a dedicated vehicle',
            'Evening private yacht dinner cruise at Dubai Marina',
            'Fully guided private Dubai city tour',
            'Visit to Burj Khalifa, Dubai Mall, and Dubai Aquarium (tickets optional)',
            'Leisure attractions including Dubai Frame, Miracle Garden, and Butterfly Garden',
            'Evening visit to Global Village or Ain Dubai',
            'Dolphin show experience at Dubai Creek',
            'One-hour private limousine ride',
            'Private desert safari with premium camp, BBQ dinner, and live entertainment',
            'Customizable itinerary with flexible hotel and attraction options'
          ],
          tourDetails: `Abstract
The Dubai Signature Escape – 4 Nights / 5 Days is a carefully curated premium Dubai tour designed for travelers who value privacy, comfort, flexibility, and refined experiences. This journey blends Dubai's iconic landmarks with exclusive private services, allowing guests to experience the city at a relaxed, unhurried pace.
Unlike standard group tours, this package is structured around private vehicles, private tours, and customizable schedules, making it ideal for families with children, honeymooners, and small groups seeking a personalized Dubai holiday. From a private yacht dinner at Dubai Marina to a premium desert safari experience, each day is balanced to ensure both discovery and leisure.
Guests can choose between three flexible pricing options, without hotel accommodation, with 4-star hotels, or with 5-star luxury hotel, allowing full control over comfort level and budget. Attractions and experience tickets are intentionally excluded so that itineraries can be customized based on the number of travelers, interests, and preferred pacing, with tickets offered at discounted rates once final selections are confirmed.

Tour Overview
This 4 Nights / 5 Days Premium Dubai Tour is designed as a complete introduction to Dubai, combining modern landmarks, cultural attractions, leisure experiences, and signature luxury elements. The itinerary follows a logical flow, avoiding rushed days and overcrowded schedules.
The journey begins with a relaxed arrival and a private yacht dinner cruise, setting the tone for an elegant Dubai experience. The following days explore the city's highlights, including Burj Khalifa, Dubai Mall, Dubai Frame, Miracle Garden, and Global Village, all handled through private transport and guided assistance.
A full day is dedicated to signature premium experiences, including a dolphin show, private limousine ride, and a private desert safari with BBQ dinner at a premium camp. The itinerary ensures that no single day feels overwhelming, preserving the premium nature of the journey.
This package operates on a per-vehicle pricing model, accommodating up to 6 guests per vehicle, which offers excellent value for families and small private groups.`,
          itinerary: [
            { 
              day: 1, 
              title: 'Arrival in Dubai & Private Yacht Dinner Cruise', 
              description: `Upon arrival at Dubai International Airport, guests are warmly received by our professional representative and escorted to a private vehicle for a smooth transfer to the hotel (if accommodation is selected).

In the evening, enjoy a private yacht dinner cruise at Dubai Marina, offering a relaxed introduction to the city's skyline. Cruise through the illuminated waters of the marina while enjoying a freshly prepared dinner on board. This experience is ideal for couples and families, offering privacy, scenic views, and a calm atmosphere after travel.

Overnight in Dubai` 
            },
            { 
              day: 2, 
              title: 'Private Dubai City Tour & Iconic Landmarks', 
              description: `After breakfast, embark on a private Dubai city tour, covering both Old and New Dubai. The tour is paced comfortably, allowing time for photo stops and exploration.

Highlights include:
Drive through Sheikh Zayed Road
Photo stops at Burj Al Arab and Jumeirah landmarks
Visit to Burj Khalifa (optional ticket)
Leisure time at Dubai Mall
Visit to Dubai Aquarium & Underwater Zoo (optional ticket)

The remainder of the day is free for relaxation or shopping.

Overnight in Dubai` 
            },
            { 
              day: 3, 
              title: 'Dubai Frame, Miracle Garden & Evening Entertainment', 
              description: `Today focuses on Dubai's creative and cultural attractions.

Morning visits include:
Dubai Frame, offering panoramic views of old and new Dubai
Miracle Garden, home to seasonal floral installations
Butterfly Garden, ideal for families and nature lovers

In the evening, choose between:
Global Village, showcasing international culture, food, and performances
OR
Ain Dubai Ferris Wheel experience for city views

Overnight in Dubai` 
            },
            { 
              day: 4, 
              title: 'Dolphin Show, Limousine Ride & Private Desert Safari', 
              description: `Begin the day with a visit to a dolphin show at Dubai Creek, a family-friendly experience enjoyed by all age groups.

Later, enjoy a one-hour private limousine ride, perfect for special occasions, photography, or simply experiencing Dubai in style.

In the afternoon, proceed for a private desert safari in a 4x4 vehicle. Experience dune bashing, sandboarding, and camel rides, followed by a premium desert camp experience with:
• BBQ dinner
• Live entertainment
• Comfortable seating arrangements
• Return to the hotel in the evening.

Overnight in Dubai` 
            },
            { 
              day: 5, 
              title: 'Departure', 
              description: `After breakfast, enjoy a relaxed morning before your private transfer to the airport for departure, concluding a thoughtfully planned premium Dubai journey.` 
            }
          ],
          price: 0, // Custom pricing per vehicle
          duration: '4 Nights / 5 Days',
          location: 'Dubai, UAE',
          capacity: 'Up to 6 guests per vehicle',
          packageType: 'domestic',
          place: 'dubai',
          images: [
            { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
            { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
            { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
            { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' },
            { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Frame' }
          ],
          bookings: 0,
          rating: 5,
          inclusions: [
            'Private airport and hotel transfers',
            'All private tours as per itinerary',
            'Private yacht dinner cruise',
            'Private desert safari',
            'Private limousine ride',
            'Breakfast with hotel accommodation (if selected)',
            'Field staff salaries, government taxes, and office expenses'
          ],
          exclusions: [
            'International airfare (assistance available on request)',
            'UAE entry visa (assistance available on request)',
            'Personal expenses',
            'Attraction entry tickets (arranged at discounted rates)',
            'Tourism dirham fees (if applicable)',
            'Tips and gratuities'
          ],
          transportation: [
            { type: 'Private Vehicle', vehicle: 'Luxury Sedan/SUV/Van', description: 'Private vehicle-based tours (up to 6 guests per vehicle). Other vehicles available for larger groups.' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Optional - Choose from 3 options', rooms: 'As per requirement', roomType: 'Without hotel / 4-star / 5-star', nights: '4 Nights' }
          ],
          reviews: [
            { name: "David Thompson", rating: 5, comment: "Perfect 4-night itinerary! The yacht dinner and desert safari were highlights. Highly recommend for families.", date: "2024-03-20" },
            { name: "Lisa Anderson", rating: 5, comment: "Excellent balance of sightseeing and relaxation. The private tours made all the difference.", date: "2024-04-05" },
            { name: "Robert Martinez", rating: 5, comment: "The dolphin show and limousine ride were fantastic additions. Great value for a premium experience.", date: "2024-04-15" }
          ],
          packageCategory: 'premium',
          // Additional fields for the specific content sections
          idealFor: 'Families, honeymooners, first-time Dubai visitors, luxury travelers',
          pricingModel: 'Per vehicle (up to 6 guests)',
          hotelOptions: [
            'Without hotel accommodation',
            '4-star premium hotels',
            '5-star luxury hotels'
          ],
          keyHighlights: [
            'Private airport transfers in a dedicated vehicle',
            'Evening private yacht dinner cruise at Dubai Marina',
            'Fully guided private Dubai city tour',
            'Visit to Burj Khalifa, Dubai Mall, and Dubai Aquarium (tickets optional)',
            'Leisure attractions including Dubai Frame, Miracle Garden, and Butterfly Garden',
            'Evening visit to Global Village or Ain Dubai',
            'Dolphin show experience at Dubai Creek',
            'One-hour private limousine ride',
            'Private desert safari with premium camp, BBQ dinner, and live entertainment',
            'Customizable itinerary with flexible hotel and attraction options'
          ],
          whyChooseThisTrip: [
            'Balanced itinerary with no rushed days',
            'Ideal for families, honeymooners, and private groups',
            'Premium experiences without rigid schedules',
            'Flexible pricing and customization options'
          ],
          whyPremiumDubaiTours: [
            'Dedicated private vehicles and professional drivers',
            'Discounted attraction tickets arranged on request',
            'Flexible itineraries tailored to guest preferences',
            'Transparent pricing with no hidden costs',
            'Experienced local team with on-ground support'
          ],
          bestTimeToVisit: {
            octoberToApril: 'Ideal weather for outdoor sightseeing',
            mayToSeptember: 'Lower costs; itineraries focus on indoor attractions and evening experiences'
          },
          pricingOptions: [
            'Tour Only (No Hotel Accommodation)',
            'Premium 4-Star Hotel Accommodation',
            'Luxury 5-Star Hotel Accommodation'
          ],
          faqs: [
            {
              question: 'Is this tour suitable for children?',
              answer: 'Yes, the itinerary is family-friendly and fully customizable.'
            },
            {
              question: 'Can attractions be changed or removed?',
              answer: 'Absolutely. All tours are flexible.'
            },
            {
              question: 'Is pricing per person or per vehicle?',
              answer: 'Pricing is per vehicle (up to 6 guests).'
            },
            {
              question: 'Can hotel category be upgraded?',
              answer: 'Yes, guests may choose between no hotel, 4-star, or 5-star options.'
            }
          ]
        } as any);
        setLoading(false);
      } else if (packageId === 'dubai-grand-explorer') {
        // Set Dubai Grand Explorer package data
        setPackageData({
          _id: 'dubai-grand-explorer',
          title: 'Dubai Grand Explorer',
          subtitle: '7 Nights / 8 Days Dubai Tour Package',
          about: 'The Dubai Grand Explorer – 7 Nights / 8 Days tour is designed for travelers who want to experience Dubai at an unhurried pace while covering the city\'s most iconic attractions along with regional highlights. This itinerary balances guided sightseeing with free time, allowing you to explore Dubai comfortably without feeling rushed.',
          services: [
            '7 nights hotel accommodation with daily breakfast',
            'Half-day Dubai city tour (Old & New Dubai)',
            'Desert safari with BBQ dinner and camp activities',
            'Dhow cruise dinner at Dubai Marina',
            'Burj Khalifa & Dubai Mall visit',
            'Abu Dhabi city tour with one theme park option',
            'Dubai Frame, Miracle Garden & Museum of the Future',
            'Global Village evening tour',
            'Shopping and leisure day',
            'Private airport transfers'
          ],
          tourDetails: `Abstract

The Dubai Grand Explorer – 7 Nights / 8 Days tour is designed for travelers who want to experience Dubai at an unhurried pace while covering the city's most iconic attractions along with regional highlights. This itinerary balances guided sightseeing with free time, allowing you to explore Dubai comfortably without feeling rushed.

From modern landmarks and cultural districts to desert landscapes, waterfront dining, and leisure days, this tour delivers a complete Dubai experience. It is ideal for families, senior travelers, and long-stay guests who value organization, comfort, and clear planning.

With carefully scheduled activities, shared city tours, private airport transfers, and multiple accommodation options, this Regular Dubai Tour Package offers excellent value while maintaining service reliability and professional coordination throughout your stay.

Tour Overview

Dubai is a city best enjoyed with time, time to explore, time to relax, and time to absorb the contrast between tradition and modern ambition. The Dubai Grand Explorer package gives you exactly that.

Over eight days, you will explore Dubai's historical neighborhoods, iconic skyscrapers, shopping districts, and entertainment zones, while also venturing beyond the city with a guided Abu Dhabi tour. The itinerary includes Dubai's essential experiences, such as a desert safari with BBQ dinner, a dhow cruise dinner at Dubai Marina, Burj Khalifa visit, Miracle Garden, Dubai Frame, Museum of the Future, Global Village, and cultural sightseeing.

Unlike rushed itineraries, this tour spreads activities across multiple days and includes free time for shopping or rest. All major sightseeing tours are conducted on a sharing (SIC) basis, ensuring affordability, while airport transfers and hotel stays remain private and comfortable.

This package operates year-round. During summer months, activities are scheduled in air-conditioned venues or evenings, making it suitable even in warmer seasons, often at more economical pricing.

Key Highlights`,
          itinerary: [
            {
              day: 1,
              title: 'Arrival in Dubai & Hotel Transfer',
              description: 'Upon arrival at Dubai International Airport, you will be welcomed and transferred to your hotel in a private, air-conditioned vehicle. After check-in, the rest of the day is free to relax or explore nearby areas at your own pace. Overnight: Dubai'
            },
            {
              day: 2,
              title: 'Half-Day Dubai City Tour, Burj Khalifa & Dubai Mall',
              description: 'After breakfast, proceed on a guided half-day Dubai city tour covering both Old and New Dubai. Highlights include photo stops at Jumeirah Mosque, Burj Al Arab, Palm Jumeirah, Atlantis The Palm, and Dubai Marina, along with visits to heritage areas and traditional souks. Later, visit Dubai Mall and ascend Burj Khalifa (124th/125th floor – optional upgrade) for panoramic city views. Overnight: Dubai'
            },
            {
              day: 3,
              title: 'Abu Dhabi City Tour with One Park',
              description: 'Today, travel to the UAE capital, Abu Dhabi. Visit the Sheikh Zayed Grand Mosque, Corniche, Heritage Village, and key landmarks. The tour includes one theme park or attraction (Ferrari World / Warner Bros / Yas Waterworld – ticket arranged at actual cost). Return to Dubai in the evening. Overnight: Dubai'
            },
            {
              day: 4,
              title: 'Dubai Frame, Miracle Garden, Museum of the Future & Dhow Cruise Dinner',
              description: 'Explore Dubai Frame for a visual journey between old and new Dubai. Visit Miracle Garden (seasonal) and enjoy an external or optional internal visit to the Museum of the Future. In the evening, enjoy a Dhow Cruise Dinner at Dubai Marina, featuring international buffet dining, soft entertainment, and skyline views. Overnight: Dubai'
            },
            {
              day: 5,
              title: 'Dolphin Show & Global Village (Evening)',
              description: 'After breakfast, attend a Dolphin or Seal Show, suitable for families and children. In the evening, visit Global Village, Dubai\'s multicultural entertainment and shopping destination with live performances and international pavilions. Overnight: Dubai'
            },
            {
              day: 6,
              title: 'Dhow Cruise Dinner at Marina',
              description: 'Daytime is free for shopping, optional activities, or rest. In the evening, enjoy another leisure-focused Marina experience, ideal for relaxed sightseeing, dining, and waterfront exploration. Overnight: Dubai'
            },
            {
              day: 7,
              title: 'Free Day for Shopping or Leisure',
              description: 'Enjoy a full free day to shop at malls, visit local markets, or add optional experiences such as theme parks, yacht cruises, or spa sessions. Overnight: Dubai'
            },
            {
              day: 8,
              title: 'Departure',
              description: 'After breakfast, check out from the hotel and transfer to Dubai International Airport for your onward journey.'
            }
          ],
          price: 0,
          duration: '7 Nights / 8 Days',
          location: 'Dubai, UAE',
          capacity: '2-6 Guests',
          packageType: 'domestic',
          place: 'dubai',
          images: [
            { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
            { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
            { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Abu Dhabi' },
            { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
            { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
          ],
          bookings: 0,
          rating: 4.8,
          inclusions: [
            {
              category: 'Airport Transfers',
              items: ['Private airport arrival & departure transfers']
            },
            {
              category: 'Hotel Accommodation',
              items: ['7 nights hotel accommodation (twin sharing)']
            },
            {
              category: 'Meals',
              items: [
                'Daily breakfast at hotel',
                'Dinners during desert safari and dhow cruise'
              ]
            },
            {
              category: 'Sightseeing & Tours',
              items: [
                'Half-day Dubai city tour (SIC basis)',
                'Abu Dhabi city tour (SIC basis)',
                'Other tours as per the itinerary'
              ]
            },
            {
              category: 'Experiences',
              items: [
                'Desert safari in 4x4 vehicle with BBQ dinner (sharing)',
                'Dhow cruise dinner at Marina (sharing)'
              ]
            },
            {
              category: 'Guide & Assistance',
              items: ['English-speaking guide during tours']
            },
            {
              category: 'Taxes',
              items: ['All government taxes and service charges']
            }
          ],
          exclusions: [
            {
              category: 'International Airfare',
              items: ['International airfare']
            },
            {
              category: 'UAE Entry Visa',
              items: ['UAE entry visa (arranged on request)']
            },
            {
              category: 'Entry Tickets',
              items: ['Entry tickets to parks and attractions (arranged at actual cost)']
            },
            {
              category: 'Personal Expenses',
              items: ['Shopping, drinks, laundry, insurance, tourism dirhams']
            },
            {
              category: 'Tips and Gratuities',
              items: ['Tips and gratuities']
            }
          ],
          transportation: [
            { type: 'Private Transfer', vehicle: 'Air-conditioned vehicle', description: 'Private airport transfers for arrival and departure' },
            { type: 'Shared Vehicle', vehicle: '4x4 / Coach', description: 'Shared transportation for city tours and desert safari' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Choice of 3-Star, 4-Star, or 5-Star', rooms: 'Twin sharing', roomType: 'Deluxe/Gold/Platinum', nights: '7 Nights' }
          ],
          reviews: [
            { name: 'Robert Taylor', rating: 5, comment: 'Perfect extended tour of Dubai! The pace was relaxed and we covered everything we wanted to see.', date: '2024-02-10' },
            { name: 'Maria Garcia', rating: 5, comment: 'Excellent for families with children. The free days were much appreciated!', date: '2024-03-05' },
            { name: 'David Wilson', rating: 4, comment: 'Comprehensive itinerary with great balance of activities and leisure time.', date: '2024-04-12' }
          ],
          packageCategory: 'regular',
          highlights: [
            '7 nights hotel accommodation with daily breakfast',
            'Half-day Dubai city tour (Old & New Dubai)',
            'Desert safari with BBQ dinner and camp activities',
            'Dhow cruise dinner at Dubai Marina',
            'Burj Khalifa & Dubai Mall visit',
            'Abu Dhabi city tour with one theme park option',
            'Dubai Frame, Miracle Garden & Museum of the Future',
            'Global Village evening tour',
            'Shopping and leisure day',
            'Private airport transfers',
            'English-speaking guide'
          ],
          hotelOptions: [
            'Deluxe Package (3★ Hotels)',
            'Gold Package (4★ Hotels)',
            'Platinum Package (5★ Hotels)'
          ],
          bestTimeToVisit: {
            yearRound: 'Dubai can be visited throughout the year.',
            novemberToMarch: 'Pleasant weather, peak season',
            aprilToOctober: 'Hotter months, but tours are mostly indoor or evening-based and offered at more economical prices'
          },
          whyChoosePremiumDubaiTours: [
            'Clear itineraries with no rushed schedules',
            'Professional coordination and transparent inclusions',
            'Comfortable vehicles and experienced guides',
            'Multiple hotel category options under one package',
            'Suitable for families, seniors, and long-stay travelers',
            'Reliable support before and during the tour'
          ]
        } as any);
        setLoading(false);
      } else if (packageId === 'dubai-transit-escape') {
        // Set Dubai Transit Escape package data
        setPackageData({
          _id: 'dubai-transit-escape',
          title: 'Dubai Transit Escape',
          subtitle: '1 Night / 2 Days Stopover Tour',
          about: 'The Dubai Transit Escape – 1 Night 2 Days is a thoughtfully curated stopover tour designed for travelers passing through Dubai with limited time. Whether you are on an overnight airline layover or a short business visit, this package allows you to experience the essence of Dubai without rushed schedules or complex planning.',
          services: [
            'Ideal for airline stopovers and overnight transit stays',
            'Private airport transfers for stress-free arrival and departure',
            'Choice of Desert Safari or Marina Dhow Cruise',
            'Guided Dubai city sightseeing tour',
            'Flexible scheduling aligned with flight timings'
          ],
          tourDetails: `Abstract

The Dubai Transit Escape – 1 Night 2 Days is a thoughtfully curated stopover tour designed for travelers passing through Dubai with limited time. Whether you are on an overnight airline layover or a short business visit, this package allows you to experience the essence of Dubai without rushed schedules or complex planning.

This transit-focused itinerary prioritizes timing efficiency, comfort, and seamless coordination, ensuring you enjoy Dubai's iconic experiences while maintaining flexibility around flight schedules. With private airport transfers, comfortable hotel accommodation, and a choice of evening experiences, even a short stay becomes a meaningful travel experience.

Overview

Dubai is one of the world's most important aviation hubs, welcoming millions of transit passengers each year. Many travelers pass through the city without realizing that even a single night is enough to experience its contrast, modern skylines, cultural heritage, and desert landscapes. The Dubai Transit Escape is designed precisely for this purpose.

This package eliminates the uncertainty that often comes with short stays. From the moment you land at Dubai or any airport in the United Arab Emirates, every aspect of your stopover is professionally managed. A private airport transfer ensures a smooth arrival, followed by check-in at a carefully selected hotel based on your chosen category: Deluxe (3★), Gold (4★), or Platinum (5★).

The highlight of this transit tour is its flexible evening experience, allowing you to choose between two iconic Dubai activities:

1. Desert Safari with BBQ Dinner, ideal for travelers wanting a glimpse of the Arabian landscape
2. Dhow Cruise Dinner at Dubai Marina, perfect for a relaxed evening with skyline views

Both experiences are scheduled to accommodate late arrivals and jet lag considerations, making them suitable even for travelers arriving in the afternoon or early evening.

The second day focuses on a half-day Dubai sightseeing tour, covering both Old Dubai and New Dubai. This guided tour provides a structured introduction to the city, ensuring you return to the airport with a clear sense of Dubai's identity—modern ambition balanced with cultural roots.

The Dubai Transit Escape proves that even a brief stay can be enriching when planned with care, timing precision, and professional support.

Highlights

• Ideal for airline stopovers and overnight transit stays
• Private airport transfers for stress-free arrival and departure
• Choice of Desert Safari or Marina Dhow Cruise
• Guided Dubai city sightseeing tour
• Flexible scheduling aligned with flight timings

Hotel Options

• Deluxe Package: 3★ Hotel
• Gold Package: 4★ Hotel
• Platinum Package: 5★ Hotel

Best Time to Visit

This transit tour operates throughout the year.

• October to April: Pleasant weather, higher demand
• May to September: Lower prices, indoor and evening-focused experiences

Dubai's infrastructure ensures comfort even during warmer months.

Why Premium Dubai Tours for This Transit Trip?

• Expertise in short-stay and stopover logistics
• Flight-time-sensitive planning
• Clear inclusions with no hidden surprises
• Professional coordination from airport to departure

Optional Add-Ons

• Burj Khalifa observation deck
• Private city tour upgrade
• Late check-out (subject to availability)`,
          itinerary: [
            {
              day: 1,
              title: 'Arrival in Dubai & Evening Experience',
              description: `Arrival at Dubai International Airport

Meet & greet followed by private hotel transfer

Check-in at selected hotel

Evening activity (choose one):
• Desert Safari with BBQ Dinner OR
• Dhow Cruise Dinner at Dubai Marina

Overnight stay in Dubai`
            },
            {
              day: 2,
              title: 'Dubai City Tour & Departure',
              description: `Breakfast at the hotel

Half-day guided Dubai city tour (sharing basis) covering Old and New Dubai

Return to hotel or airport transfer

Departure as per flight schedule`
            }
          ],
          price: 0,
          duration: '1 Night / 2 Days',
          location: 'Dubai, UAE',
          capacity: '2-6 Guests',
          packageType: 'domestic',
          place: 'dubai',
          images: [
            { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
            { url: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Airport' },
            { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
            { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
          ],
          bookings: 0,
          rating: 4.5,
          inclusions: [
            {
              category: 'Airport Transfers',
              items: ['Arrival and departure airport transfers in a private, air-conditioned vehicle']
            },
            {
              category: 'Hotel Accommodation',
              items: [
                'Twin-sharing accommodation based on selected category:',
                'Deluxe Package: 3-star hotel',
                'Gold Package: 4-star hotel',
                'Platinum Package: 5-star hotel'
              ]
            },
            {
              category: 'Meals',
              items: [
                'Daily breakfast at the hotel',
                'BBQ Dinner during Desert Safari',
                'Dinner during Dhow Cruise'
              ]
            },
            {
              category: 'Sightseeing & Tours',
              items: ['Half-day Dubai City Tour (Old & New Dubai) on a sharing (SIC) basis']
            },
            {
              category: 'Experiences',
              items: [
                '4x4 Desert Safari with dune bashing, camel ride, sandboarding & camp activities',
                'Dhow Cruise Dinner on a sharing basis'
              ]
            },
            {
              category: 'Guide & Assistance',
              items: [
                'English-speaking guide during city tours',
                'Local assistance and coordination throughout the trip'
              ]
            },
            {
              category: 'Taxes',
              items: ['Government taxes and official service charges']
            }
          ],
          exclusions: [
            {
              category: 'International Airfare',
              items: ['Flights to and from Dubai (can be arranged upon request)']
            },
            {
              category: 'UAE Entry Visa',
              items: ['Dubai visa fees (assistance available if required)']
            },
            {
              category: 'Entry Tickets',
              items: ['Theme parks, attractions, and monument tickets (Arranged at actual cost based on traveler preference)']
            },
            {
              category: 'Personal Expenses',
              items: [
                'Lunches, beverages, shopping',
                'Tourism Dirham fees',
                'Laundry, phone calls, minibar usage'
              ]
            },
            {
              category: 'Insurance',
              items: ['Travel and medical insurance']
            },
            {
              category: 'Early Check-in / Late Check-out',
              items: ['Subject to hotel policy and availability']
            }
          ],
          transportation: [
            { type: 'Private Transfer', vehicle: 'Air-conditioned vehicle', description: 'Private airport transfers for arrival and departure' },
            { type: 'Shared Vehicle', vehicle: '4x4 / Coach', description: 'Shared transportation for city tours and desert safari or dhow cruise' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Choice of 3-Star, 4-Star, or 5-Star', rooms: 'Twin sharing', roomType: 'Deluxe/Gold/Platinum', nights: '1 Night' }
          ],
          reviews: [
            { name: 'Michael Johnson', rating: 5, comment: 'Perfect for a layover! Made the most of our transit time in Dubai. The flexibility with flight schedules was great.', date: '2024-03-15' },
            { name: 'Sarah Williams', rating: 5, comment: 'Excellent stopover package. The desert safari was amazing and well-timed for our evening arrival.', date: '2024-04-01' },
            { name: 'David Chen', rating: 4, comment: 'Great value for a short stay. The city tour was comprehensive and the hotel was comfortable.', date: '2024-04-20' }
          ],
          packageCategory: 'regular',
          highlights: [
            'Ideal for airline stopovers and overnight transit stays',
            'Private airport transfers for stress-free arrival and departure',
            'Choice of Desert Safari or Marina Dhow Cruise',
            'Guided Dubai city sightseeing tour',
            'Flexible scheduling aligned with flight timings'
          ],
          hotelOptions: [
            'Deluxe Package: 3★ Hotel - Twin sharing, breakfast included',
            'Gold Package: 4★ Hotel - Twin sharing, breakfast included',
            'Platinum Package: 5★ Hotel - Twin sharing, breakfast included'
          ],
          bestTimeToVisit: {
            yearRound: 'This transit tour operates throughout the year',
            octoberToApril: 'Pleasant weather, higher demand',
            mayToSeptember: 'Lower prices, indoor and evening-focused experiences. Dubai\'s infrastructure ensures comfort even during warmer months'
          },
          whyChoosePremiumDubaiTours: [
            'Expertise in short-stay and stopover logistics',
            'Flight-time-sensitive planning',
            'Clear inclusions with no hidden surprises',
            'Professional coordination from airport to departure'
          ],
          optionalAddOns: [
            'Burj Khalifa observation deck',
            'Private city tour upgrade',
            'Late check-out (subject to availability)'
          ]
        } as any);
        setLoading(false);
      } else if (packageId === 'classic-discovery-dubai-abu-dhabi') {
        // Set Classic Discovery of Dubai and Abu Dhabi package data
        setPackageData({
          _id: 'classic-discovery-dubai-abu-dhabi',
          title: 'Classic Discovery of Dubai and Abu Dhabi',
          subtitle: '4 Nights / 5 Days Dubai Tour',
          about: 'The Dubai Classic Discovery – 4 Nights / 5 Days tour is thoughtfully designed for travelers who want to experience Dubai in a balanced and unhurried way. This itinerary combines the city\'s iconic attractions, cultural experiences, and modern leisure with the added depth of an Abu Dhabi visit.',
          services: [
            'Private airport transfers for arrival and departure',
            'Half-day guided Dubai city tour covering old and new districts',
            'Desert Safari with BBQ dinner and cultural activities',
            'Evening Marina Dhow Cruise Dinner',
            'Abu Dhabi city tour with one optional theme park',
            'Free day for shopping and personal exploration',
            'Choice of 3-Star, 4-Star, or 5-Star hotels'
          ],
          tourDetails: `Abstract
The Dubai Classic Discovery – 4 Nights / 5 Days tour is thoughtfully designed for travelers who want to experience Dubai in a balanced and unhurried way. This itinerary combines the city's iconic attractions, cultural experiences, and modern leisure with the added depth of an Abu Dhabi visit.
Rather than rushing through highlights, this package focuses on comfort, clarity, and smooth logistics, ensuring that guests enjoy Dubai at a natural pace. It is especially suitable for families and international travelers who value reliable service, comfortable transportation, and carefully structured sightseeing.
With flexible hotel categories and a mix of guided tours and personal free time, this tour delivers a complete Dubai holiday without overwhelming the traveler.

Tour Overview 
Dubai is a destination of contrasts, historic neighborhoods sit beside futuristic skylines, calm desert landscapes balance vibrant urban life, and traditional hospitality blends seamlessly with modern luxury. The Dubai Classic Discovery tour has been crafted to reflect this diversity while maintaining simplicity and ease throughout the journey.
From the moment you arrive, all major travel logistics are handled by Premium Dubai Tours, allowing you to focus entirely on enjoying the destination. Private airport transfers ensure a smooth arrival, while carefully scheduled sightseeing days prevent fatigue.
The tour introduces Dubai gradually, starting with a relaxed arrival day followed by guided city exploration. Guests experience both Old Dubai, with its heritage areas and traditional markets, and New Dubai, known for architectural landmarks and modern districts.
A desert safari offers a cultural contrast to the city experience, providing insight into the region's natural landscape and traditional Bedouin lifestyle. The evening Marina Dhow Cruise delivers a calm, scenic dining experience, ideal for families and couples alike.
The inclusion of an Abu Dhabi city tour adds depth to the itinerary, offering a broader understanding of the United Arab Emirates beyond Dubai. A dedicated free day allows guests to shop, relax, or explore independently, an essential element for a comfortable holiday.
This tour is suitable throughout the year. During summer months, activities are planned indoors or during cooler hours, and pricing tends to be more economical, making it an excellent value-oriented option.`,
          itinerary: [
            {
              day: 1,
              title: 'Arrival in Dubai & Marina Dhow Cruise Dinner',
              description: `Upon arrival at Dubai International Airport, you will be greeted by our representative and transferred to your hotel in a private, air-conditioned vehicle. After check-in, the afternoon is kept free to allow you to rest or settle in.

In the evening, you will proceed for a Marina Dhow Cruise Dinner on a sharing basis. Enjoy a relaxed cruise through Dubai Marina, surrounded by illuminated skyscrapers, while savoring an international buffet dinner. After the cruise, return to your hotel for an overnight stay.`
            },
            {
              day: 2,
              title: 'Dubai City Tour & Desert Safari with BBQ Dinner',
              description: `After breakfast, depart for a half-day guided Dubai city tour on a shared basis. This tour introduces you to both historic and modern sides of Dubai, including traditional neighborhoods, cultural landmarks, and modern districts.

Following the city tour, return to the hotel for rest. In the afternoon, you will be picked up for a desert safari experience in a shared 4x4 vehicle. Activities include dune bashing, sandboarding, and cultural performances at the desert camp. The evening concludes with a BBQ dinner before returning to the hotel.`
            },
            {
              day: 3,
              title: 'Abu Dhabi City Tour',
              description: `After breakfast, proceed for a full-day Abu Dhabi city tour on a shared basis. This tour provides insight into the capital city of the UAE, known for its wide boulevards, cultural institutions, and modern landmarks.

The itinerary includes major highlights and one optional theme park (entry tickets arranged separately). After completing the tour, return to Dubai in the evening for overnight stay.`
            },
            {
              day: 4,
              title: 'Free Day for Shopping & Leisure',
              description: `This day is kept completely free for personal activities. Guests may explore Dubai Mall, visit Burj Khalifa (tickets can be arranged separately), shop at local markets, or simply relax at the hotel.

This flexibility allows travelers to customize their experience based on interests and energy levels.`
            },
            {
              day: 5,
              title: 'Departure',
              description: `After breakfast and hotel check-out, you will be transferred privately to Dubai International Airport for your onward journey.`
            }
          ],
          price: 0,
          duration: '4 Nights / 5 Days',
          location: 'Dubai, UAE',
          capacity: '2-6 Guests',
          packageType: 'domestic',
          place: 'dubai',
          images: [
            { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
            { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
            { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Abu Dhabi' },
            { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' }
          ],
          bookings: 0,
          rating: 4.8,
          inclusions: [
            'Private airport and hotel transfers',
            'Hotel accommodation on twin sharing basis',
            'Daily breakfast',
            'Dinners during desert safari and dhow cruise',
            'Dubai and Abu Dhabi city tours on SIC basis',
            'Desert safari in shared 4x4 vehicle',
            'Marina dhow cruise on sharing basis',
            'English-speaking guide during tours',
            'Government taxes and office expenses'
          ],
          exclusions: [
            'International airfare',
            'UAE entry visa (can be arranged on request)',
            'Personal expenses (shopping, meals, drinks, laundry, tourism dirhams, insurance)',
            'Entry tickets to parks and attractions (arranged at actual cost)'
          ],
          transportation: [
            { type: 'Shared Vehicle', vehicle: '4x4 / Coach', description: 'Shared transportation for tours and transfers' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Choice of 3-Star, 4-Star, or 5-Star', rooms: 'Twin sharing', roomType: 'Standard/Deluxe/Luxury', nights: '4 Nights' }
          ],
          reviews: [
            { name: "Jennifer Smith", rating: 5, comment: "Perfect balance of guided tours and free time. The Abu Dhabi tour was a highlight!", date: "2024-03-25" },
            { name: "Mark Johnson", rating: 4, comment: "Great value for money. The desert safari and dhow cruise were excellent experiences.", date: "2024-04-10" },
            { name: "Sarah Williams", rating: 5, comment: "Well-organized tour with comfortable accommodations. Highly recommend for families.", date: "2024-04-20" }
          ],
          packageCategory: 'regular',
          highlights: [
            'Private airport transfers for arrival and departure',
            'Half-day guided Dubai city tour covering old and new districts',
            'Desert Safari with BBQ dinner and cultural activities',
            'Evening Marina Dhow Cruise Dinner',
            'Abu Dhabi city tour with one optional theme park',
            'Free day for shopping and personal exploration',
            'Choice of 3-Star, 4-Star, or 5-Star hotels'
          ],
          bestTimeToVisit: {
            winter: 'Ideal for outdoor activities',
            summer: 'More economical pricing, with tours scheduled indoors or during evenings for comfort'
          },
          whyChoosePremiumDubaiTours: [
            'Carefully paced itinerary to avoid travel fatigue',
            'Transparent inclusions and exclusions',
            'Trusted local operations and licensed services',
            'Flexible hotel categories without changing itinerary quality',
            'Dedicated support before and during the trip'
          ]
        } as any);
        setLoading(false);
      } else if (packageId === 'dubai-essential-experience') {
        // Set Dubai Essential Experience package data
        setPackageData({
          _id: 'dubai-essential-experience',
          title: 'Dubai Essential Experience',
          subtitle: '3 Nights / 4 Days Dubai Tour',
          about: 'The Dubai Essential Experience – 3 Nights 4 Days is a thoughtfully designed short holiday that introduces travelers to Dubai\'s iconic landmarks, cultural contrasts, and leisure lifestyle. This package balances guided sightseeing with relaxed pacing, making it ideal for travelers who want a meaningful Dubai experience within a limited timeframe.',
          services: [
            'Half-day guided Dubai city tour',
            'Desert Safari with BBQ dinner and cultural activities',
            'Burj Khalifa and Dubai Mall visit',
            'Dubai Marina Dhow Cruise Dinner',
            'Flexible hotel options (3★, 4★, 5★)',
            'Private airport transfers',
            'Daily breakfast at the hotel'
          ],
          tourDetails: `Abstract
The Dubai Essential Experience – 3 Nights 4 Days is a thoughtfully designed short holiday that introduces travelers to Dubai's iconic landmarks, cultural contrasts, and leisure lifestyle. This package balances guided sightseeing with relaxed pacing, making it ideal for travelers who want a meaningful Dubai experience within a limited timeframe.

Overview
Dubai is a destination that rewards thoughtful planning. In just a few days, visitors can witness historic neighborhoods, futuristic skylines, golden deserts, and vibrant waterfronts. The Dubai Essential Experience is curated for travelers who want to see the highlights without feeling rushed or overwhelmed.

This package begins with a smooth airport arrival and private hotel transfer, ensuring comfort from the very first moment. The sightseeing flow is structured to avoid early fatigue—city tours are scheduled during favorable hours, while experiential activities such as desert safaris and dhow cruises are placed in the evenings for maximum comfort.

A half-day Dubai city tour introduces both Old Dubai, with its traditional markets and cultural quarters, and New Dubai, showcasing architectural icons and modern infrastructure. The desert safari adds cultural depth, offering insight into Bedouin heritage through traditional activities and a relaxed BBQ dinner.

A dedicated day for Burj Khalifa and Dubai Mall allows guests to explore at their own pace, followed by a scenic Marina Dhow Cruise Dinner, providing a calm and memorable conclusion to the journey.

This tour is suitable year-round, with summer departures focusing on air-conditioned attractions and evening experiences. Hotel categories allow travelers to choose comfort levels without altering the core itinerary.

Highlights`,
          itinerary: [
            {
              day: 1,
              title: 'Arrival & Hotel Transfer',
              description: 'Arrival at Dubai International Airport followed by private transfer to the hotel. Rest of the day at leisure.'
            },
            {
              day: 2,
              title: 'Dubai City Tour & Desert Safari',
              description: 'Morning half-day city tour covering major highlights of Old and New Dubai. Afternoon, desert safari with dune bashing, camp activities, and BBQ dinner.'
            },
            {
              day: 3,
              title: 'Burj Khalifa, Dubai Mall & Marina Dhow Cruise',
              description: 'Visit Dubai Mall and Burj Khalifa (ticket optional). Evening Marina Dhow Cruise with dinner.'
            },
            {
              day: 4,
              title: 'Departure',
              description: 'Private transfer to the airport for departure.'
            }
          ],
          price: 0,
          duration: '3 Nights / 4 Days',
          location: 'Dubai, UAE',
          capacity: '2-6 Guests',
          packageType: 'domestic',
          place: 'dubai',
          images: [
            { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
            { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
            { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
            { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
          ],
          bookings: 0,
          rating: 4.7,
          inclusions: [
            {
              category: 'Airport Transfers',
              items: ['Arrival and departure airport transfers in a private, air-conditioned vehicle']
            },
            {
              category: 'Hotel Accommodation',
              items: [
                'Twin-sharing accommodation based on selected category:',
                'Deluxe Package: 3-star hotel',
                'Gold Package: 4-star hotel',
                'Platinum Package: 5-star hotel'
              ]
            },
            {
              category: 'Meals',
              items: [
                'Daily breakfast at the hotel',
                'BBQ Dinner during Desert Safari',
                'Buffet Dinner during Dhow Cruise'
              ]
            },
            {
              category: 'Sightseeing & Tours',
              items: ['Half-day Dubai City Tour (Old & New Dubai) on a sharing (SIC) basis']
            },
            {
              category: 'Experiences',
              items: [
                '4x4 Desert Safari with dune bashing, camel ride, sandboarding & camp activities',
                'Dhow Cruise Dinner on a sharing basis'
              ]
            },
            {
              category: 'Guide & Assistance',
              items: [
                'English-speaking guide during city tours',
                'Local assistance and coordination throughout the trip'
              ]
            },
            {
              category: 'Taxes',
              items: ['Government taxes and official service charges']
            }
          ],
          exclusions: [
            {
              category: 'International Airfare',
              items: ['Flights to and from Dubai (can be arranged upon request)']
            },
            {
              category: 'UAE Entry Visa',
              items: ['Dubai visa fees (assistance available if required)']
            },
            {
              category: 'Entry Tickets',
              items: ['Theme parks, attractions, and monument tickets (Arranged at actual cost based on traveler preference)']
            },
            {
              category: 'Personal Expenses',
              items: [
                'Lunches, beverages, shopping',
                'Tourism Dirham fees',
                'Laundry, phone calls, minibar usage'
              ]
            },
            {
              category: 'Insurance',
              items: ['Travel and medical insurance']
            },
            {
              category: 'Early Check-in / Late Check-out',
              items: ['Subject to hotel policy and availability']
            }
          ],
          transportation: [
            { type: 'Private Transfer', vehicle: 'Air-conditioned vehicle', description: 'Private airport transfers for arrival and departure' },
            { type: 'Shared Vehicle', vehicle: '4x4 / Coach', description: 'Shared transportation for city tours and desert safari' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Choice of 3-Star, 4-Star, or 5-Star', rooms: 'Twin sharing', roomType: 'Standard/Deluxe/Luxury', nights: '3 Nights' }
          ],
          reviews: [
            { name: "David Thompson", rating: 5, comment: "Perfect short trip! Covered all the essentials without feeling rushed. The desert safari was amazing!", date: "2024-02-15" },
            { name: "Lisa Anderson", rating: 4, comment: "Great value for money. The city tour and dhow cruise were highlights. Highly recommend!", date: "2024-03-10" },
            { name: "Robert Martinez", rating: 5, comment: "Well-organized tour with excellent guides. The Burj Khalifa visit was unforgettable.", date: "2024-04-05" }
          ],
          packageCategory: 'regular',
          highlights: [
            'Half-day guided Dubai city tour',
            'Desert Safari with BBQ dinner and cultural activities',
            'Burj Khalifa and Dubai Mall visit',
            'Dubai Marina Dhow Cruise Dinner',
            'Flexible hotel options (3★, 4★, 5★)'
          ],
          hotelOptions: [
            'Deluxe Package: 3★ hotels, twin sharing, breakfast included',
            'Gold Package: 4★ hotels, twin sharing, breakfast included',
            'Platinum Package: 5★ hotels, twin sharing, breakfast included'
          ],
          bestTimeToVisit: {
            yearRound: 'Dubai can be visited throughout the year',
            summer: 'Summer months offer lower package costs, with activities planned indoors or during evenings'
          },
          whyChoosePremiumDubaiTours: [
            'Clear itineraries with realistic pacing',
            'Transparent inclusions and exclusions',
            'Reliable ground handling and local expertise',
            'Flexible hotel category options'
          ]
        } as any);
        setLoading(false);
      } else if (packageId === 'dubai-grand-experience') {
        // Set Dubai Grand Experience package data
        setPackageData({
          _id: 'dubai-grand-experience',
          title: 'Dubai Grand Experience',
          subtitle: '6 Nights / 7 Days Dubai Tour',
          about: 'The Dubai Grand Experience – 6 Nights / 7 Days tour is thoughtfully curated for travelers who want to explore Dubai in depth while maintaining a relaxed and enjoyable pace. This itinerary allows guests to experience the city\'s iconic landmarks, cultural heritage, leisure attractions, and neighboring Abu Dhabi without feeling rushed.',
          services: [
            'Private airport transfers on arrival and departure',
            'Half-day Dubai city tour covering old and new Dubai',
            'Burj Khalifa and Dubai Mall visit',
            'Desert safari with BBQ dinner and cultural activities',
            'Full-day Abu Dhabi city tour with one optional park',
            'Dubai Frame, Miracle Garden, and Museum of the Future',
            'Dolphin show and Global Village evening visit',
            'Free day for shopping or optional activities',
            'Choice of 3★, 4★, or 5★ hotel accommodations'
          ],
          tourDetails: `Abstract
The Dubai Grand Experience – 6 Nights / 7 Days tour is thoughtfully curated for travelers who want to explore Dubai in depth while maintaining a relaxed and enjoyable pace. This itinerary allows guests to experience the city's iconic landmarks, cultural heritage, leisure attractions, and neighboring Abu Dhabi without feeling rushed.
By combining guided sightseeing with free leisure time, this package offers flexibility while ensuring that all major highlights are covered. It is especially suitable for families and travelers who value comfort, structured planning, and dependable local support throughout their journey.

Tour Overview
Dubai is not a city to be rushed. Its diversity, from ancient trading routes to ultra-modern architecture, requires time to fully appreciate. The Dubai Grand Experience is designed for travelers who want a more comprehensive understanding of the city and its surroundings.

Over the course of seven days, guests explore Dubai's old quarters, modern skyline, desert landscapes, and world-famous attractions. The itinerary includes essential experiences such as a half-day city tour, Burj Khalifa and Dubai Mall visit, a traditional desert safari, and a relaxing dhow cruise through Dubai Marina.

A full-day excursion to Abu Dhabi, the capital of the UAE, adds significant depth to the trip. This visit provides cultural and architectural contrast, helping travelers understand the broader national identity beyond Dubai.

Additional experiences such as Dubai Frame, Miracle Garden, and the Museum of the Future ensure exposure to both cultural storytelling and innovative design. The tour also includes a dolphin show and an evening visit to Global Village, offering entertainment suitable for all age groups.

A dedicated free day allows guests to rest, shop, or add optional activities based on personal interests. This balance between planned sightseeing and leisure time makes the tour suitable year-round, including the summer season when many activities are scheduled indoors or during cooler evening hours.

Key Highlights`,
          itinerary: [
            {
              day: 1,
              title: 'Arrival in Dubai & Hotel Transfer',
              description: 'Arrive at Dubai International Airport, where you will be greeted by our representative and transferred privately to your hotel. After check-in, the remainder of the day is free for rest or a short walk around the hotel area. Overnight stay in Dubai.'
            },
            {
              day: 2,
              title: 'Half-Day Dubai City Tour, Burj Khalifa & Dubai Mall',
              description: 'After breakfast, depart for a half-day Dubai city tour on a shared basis. The tour introduces major cultural and modern landmarks, offering insight into the city\'s transformation. In the afternoon, proceed to Dubai Mall, followed by time at the Burj Khalifa area. Guests may choose to add observation deck tickets as an optional experience. Return to the hotel for overnight stay.'
            },
            {
              day: 3,
              title: 'Abu Dhabi City Tour with One Park',
              description: 'After breakfast, travel to Abu Dhabi for a full-day city tour on a shared basis. The tour includes major landmarks of the capital and one theme park visit (tickets arranged at actual cost). This day provides a broader understanding of the UAE\'s culture, governance, and architectural development. Return to Dubai in the evening. Overnight stay at the hotel.'
            },
            {
              day: 4,
              title: 'Dubai Frame, Miracle Garden, Museum of the Future & Marina Dhow Cruise Dinner',
              description: 'After breakfast, proceed for a sightseeing tour including Dubai Frame, Miracle Garden, and the Museum of the Future (entry tickets arranged separately). In the evening, enjoy a Marina Dhow Cruise Dinner on a sharing basis. Experience Dubai Marina\'s skyline from the water while enjoying a buffet dinner. Return to the hotel for overnight stay.'
            },
            {
              day: 5,
              title: 'Dolphin Show & Global Village Evening Tour',
              description: 'After breakfast, the day begins with a visit to a dolphin show, a popular attraction for families and children. In the evening, proceed to Global Village, a seasonal attraction offering international pavilions, shopping stalls, and live entertainment. Return to the hotel for overnight stay.'
            },
            {
              day: 6,
              title: 'Shopping & Free Day',
              description: 'After breakfast, enjoy a free day for shopping or independent exploration. Guests may visit malls, local markets, or add optional tours such as theme parks or cultural experiences. Overnight stay at the hotel.'
            },
            {
              day: 7,
              title: 'Departure',
              description: 'After breakfast and hotel check-out, you will be transferred privately to Dubai International Airport for your onward journey.'
            }
          ],
          price: 0,
          duration: '6 Nights / 7 Days',
          location: 'Dubai, UAE',
          capacity: '2-6 Guests',
          packageType: 'domestic',
          place: 'dubai',
          images: [
            { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
            { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
            { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Abu Dhabi' },
            { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
            { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
          ],
          bookings: 0,
          rating: 4.8,
          inclusions: [
            {
              category: 'Airport & Hotel Transfers',
              items: ['Private airport and hotel transfers']
            },
            {
              category: 'Hotel Accommodation',
              items: ['Hotel accommodation on twin sharing basis']
            },
            {
              category: 'Meals',
              items: [
                'Daily breakfast',
                'Dinners during desert safari and dhow cruise'
              ]
            },
            {
              category: 'Sightseeing & Tours',
              items: [
                'Dubai and Abu Dhabi city tours on SIC basis',
                'All the tours as per the itinerary'
              ]
            },
            {
              category: 'Experiences',
              items: [
                'Desert safari in shared 4x4 vehicle with camp activities',
                'Marina dhow cruise on sharing basis'
              ]
            },
            {
              category: 'Guide & Assistance',
              items: ['English-speaking guide during tours']
            },
            {
              category: 'Taxes',
              items: ['Government taxes and office expenses']
            }
          ],
          exclusions: [
            {
              category: 'International Airfare',
              items: ['International airfare']
            },
            {
              category: 'UAE Entry Visa',
              items: ['UAE entry visa (available on request)']
            },
            {
              category: 'Personal Expenses',
              items: ['Personal expenses (shopping, drinks, laundry, tourism dirhams, insurance)']
            },
            {
              category: 'Entry Tickets',
              items: ['Entry tickets to parks and attractions (arranged at actual cost)']
            }
          ],
          transportation: [
            { type: 'Private Transfer', vehicle: 'Air-conditioned vehicle', description: 'Private airport transfers for arrival and departure' },
            { type: 'Shared Vehicle', vehicle: '4x4 / Coach', description: 'Shared transportation for city tours and desert safari' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Choice of 3-Star, 4-Star, or 5-Star', rooms: 'Twin sharing', roomType: 'Standard/Deluxe/Luxury', nights: '6 Nights' }
          ],
          reviews: [
            { name: "Michael Brown", rating: 5, comment: "Comprehensive tour covering all major attractions. The Abu Dhabi visit was a great addition!", date: "2024-01-20" },
            { name: "Emily Davis", rating: 5, comment: "Perfect for families! The dolphin show and Global Village were hits with the kids.", date: "2024-02-28" },
            { name: "James Wilson", rating: 4, comment: "Well-paced itinerary with good balance of guided tours and free time. Highly recommend!", date: "2024-03-15" }
          ],
          packageCategory: 'regular',
          highlights: [
            'Private airport transfers on arrival and departure',
            'Half-day Dubai city tour covering old and new Dubai',
            'Burj Khalifa and Dubai Mall visit',
            'Desert safari with BBQ dinner and cultural activities',
            'Full-day Abu Dhabi city tour with one optional park',
            'Dubai Frame, Miracle Garden, and Museum of the Future',
            'Dolphin show and Global Village evening visit',
            'Free day for shopping or optional activities',
            'Choice of 3★, 4★, or 5★ hotel accommodations'
          ],
          bestTimeToVisit: {
            yearRound: 'Dubai can be visited throughout the year',
            winter: 'Winter offers pleasant outdoor conditions',
            summer: 'Summer months provide better value with lower accommodation costs. Most sightseeing during summer is scheduled indoors or in the evening for comfort'
          },
          whyChoosePremiumDubaiTours: [
            'Well-balanced itinerary without rushed sightseeing',
            'Clear inclusions and transparent pricing',
            'Licensed local operators and experienced guides',
            'Flexible hotel options to suit different budgets',
            'Dedicated customer support before and during travel'
          ]
        } as any);
      setLoading(false);
      } else if (packageId === 'dubai-signature-explorer') {
        // Set Dubai Signature Explorer package data
        setPackageData({
          _id: 'dubai-signature-explorer',
          title: 'Dubai Signature Explorer',
          subtitle: '5 Nights / 6 Days Dubai Tour',
          about: 'The Dubai Signature Explorer – 5 Nights / 6 Days tour is designed for travelers who wish to experience Dubai in a more immersive and relaxed way, without rushing through major attractions. This itinerary carefully balances guided sightseeing, iconic landmarks, cultural experiences, and personal free time, allowing guests to absorb the city at a comfortable pace.',
          services: [
            'Private airport transfers for arrival and departure',
            'Half-day Dubai city tour covering old and new districts',
            'Burj Khalifa and Dubai Mall visit',
            'Desert safari with BBQ dinner and cultural activities',
            'Full-day Abu Dhabi city tour with one optional theme park',
            'Free day for shopping and independent exploration',
            'Choice of Deluxe, Gold, or Platinum hotel categories'
          ],
          tourDetails: `Abstract
The Dubai Signature Explorer – 5 Nights / 6 Days tour is designed for travelers who wish to experience Dubai in a more immersive and relaxed way, without rushing through major attractions. This itinerary carefully balances guided sightseeing, iconic landmarks, cultural experiences, and personal free time, allowing guests to absorb the city at a comfortable pace.
With the inclusion of both Dubai and Abu Dhabi highlights, modern attractions, desert landscapes, and waterfront experiences, this tour offers a well-rounded introduction to the UAE. Whether you are traveling with family, as a couple, or independently, this package ensures smooth logistics, dependable service, and transparent planning from arrival to departure.

Tour Overview
Dubai is a city that rewards time. While shorter trips offer glimpses of its skyline, a 5-night stay allows travelers to truly settle in, explore beyond surface-level attractions, and enjoy the rhythm of the city.

The Dubai Signature Explorer tour begins with a relaxed arrival day, followed by guided sightseeing that introduces both Old and New Dubai. Guests gain cultural context through heritage districts and iconic landmarks while enjoying the convenience of shared city tours led by experienced guides.

A dedicated Burj Khalifa and Dubai Mall visit allows time to appreciate the city's architectural achievements and retail culture. The experience is complemented by a desert safari, offering a striking contrast to the urban environment through natural landscapes and traditional entertainment.

The inclusion of a full-day Abu Dhabi city tour broadens the journey, showcasing the UAE's political and cultural capital. This addition provides perspective on the country's development beyond Dubai alone.

Unlike tightly packed itineraries, this package intentionally includes a free shopping and leisure day, recognizing that travelers value flexibility, whether for relaxation, shopping, or optional experiences.

This tour is available year-round. While winter months are ideal for outdoor exploration, summer travel offers cost-effective pricing, with most activities conducted indoors or during cooler evening hours.

Key Highlights`,
          itinerary: [
            {
              day: 1,
              title: 'Arrival in Dubai & Hotel Transfer',
              description: 'Upon arrival at Dubai International Airport, our representative will welcome you and assist with a private transfer to your hotel. After check-in, the rest of the day is free for relaxation or light exploration nearby. Overnight stay at the hotel.'
            },
            {
              day: 2,
              title: 'Half-Day Dubai City Tour, Burj Khalifa & Dubai Mall',
              description: 'After breakfast, depart for a half-day Dubai city tour on a shared basis. This guided experience introduces you to both historic and modern areas of the city, providing cultural insight and orientation. In the afternoon, proceed to Dubai Mall, one of the world\'s largest shopping destinations, followed by a visit to the Burj Khalifa area (observation deck tickets can be arranged separately if required). Return to the hotel for overnight stay.'
            },
            {
              day: 3,
              title: 'Abu Dhabi City Tour with One Park',
              description: 'After breakfast, depart for a full-day Abu Dhabi city tour on a shared basis. The tour includes major landmarks of the UAE capital and one optional theme park (entry tickets arranged at actual cost). This day offers a deeper understanding of the country\'s cultural, political, and architectural development. Return to Dubai in the evening. Overnight stay at the hotel.'
            },
            {
              day: 4,
              title: 'Dubai Frame, Miracle Garden, Museum of the Future & Marina Dhow Cruise Dinner',
              description: 'After breakfast, proceed for a sightseeing day covering Dubai Frame, Miracle Garden, and the Museum of the Future (entry tickets arranged separately if required). In the evening, enjoy a Marina Dhow Cruise Dinner on a sharing basis. Relax aboard a traditional wooden dhow while cruising through Dubai Marina, accompanied by a buffet dinner and city views at night. Return to the hotel for overnight stay.'
            },
            {
              day: 5,
              title: 'Shopping & Global Village Evening Tour',
              description: 'After breakfast, the day is kept free for shopping and leisure. Guests may visit popular shopping areas, malls, or local markets. In the evening, proceed for a visit to Global Village, a seasonal cultural attraction featuring international pavilions, shopping stalls, and entertainment. Return to the hotel for overnight stay.'
            },
            {
              day: 6,
              title: 'Departure',
              description: 'After breakfast and check-out, you will be transferred privately to Dubai International Airport for your onward journey.'
            }
          ],
          price: 0,
          duration: '5 Nights / 6 Days',
          location: 'Dubai, UAE',
          capacity: '2-6 Guests',
          packageType: 'domestic',
          place: 'dubai',
          images: [
            { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
            { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
            { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Abu Dhabi' },
            { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
            { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
          ],
          bookings: 0,
          rating: 4.8,
          inclusions: [
            {
              category: 'Airport & Hotel Transfers',
              items: ['Private airport and hotel transfers']
            },
            {
              category: 'Hotel Accommodation',
              items: ['Hotel accommodation on twin sharing basis']
            },
            {
              category: 'Meals',
              items: [
                'Daily breakfast',
                'Dinners during desert safari and dhow cruise'
              ]
            },
            {
              category: 'Sightseeing & Tours',
              items: [
                'Dubai and Abu Dhabi city tours on SIC basis'
              ]
            },
            {
              category: 'Experiences',
              items: [
                'Desert safari in shared 4x4 vehicle with camp activities',
                'Marina dhow cruise on sharing basis'
              ]
            },
            {
              category: 'Guide & Assistance',
              items: ['English-speaking guide during tours']
            },
            {
              category: 'Taxes',
              items: ['Government taxes and office expenses']
            }
          ],
          exclusions: [
            {
              category: 'International Airfare',
              items: ['International airfare']
            },
            {
              category: 'UAE Entry Visa',
              items: ['UAE entry visa (can be arranged on request)']
            },
            {
              category: 'Personal Expenses',
              items: ['Personal expenses (shopping, drinks, laundry, tourism dirhams, insurance)']
            },
            {
              category: 'Entry Tickets',
              items: ['Entry tickets to parks and attractions (arranged at actual cost)']
            }
          ],
          transportation: [
            { type: 'Private Transfer', vehicle: 'Air-conditioned vehicle', description: 'Private airport transfers for arrival and departure' },
            { type: 'Shared Vehicle', vehicle: '4x4 / Coach', description: 'Shared transportation for city tours and desert safari' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Choice of 3-Star, 4-Star, or 5-Star', rooms: 'Twin sharing', roomType: 'Standard/Deluxe/Luxury', nights: '5 Nights' }
          ],
          reviews: [
            { name: "Sarah Johnson", rating: 5, comment: "Perfect balance of guided tours and free time. The Abu Dhabi tour was exceptional!", date: "2024-02-10" },
            { name: "Michael Chen", rating: 5, comment: "Great itinerary covering all major attractions. The Global Village visit was a highlight!", date: "2024-03-05" },
            { name: "Emma Williams", rating: 4, comment: "Well-organized tour with excellent guides. The free day allowed us to explore at our own pace.", date: "2024-04-12" }
          ],
          packageCategory: 'regular',
          highlights: [
            'Private airport transfers for arrival and departure',
            'Half-day Dubai city tour covering old and new districts',
            'Burj Khalifa and Dubai Mall visit',
            'Desert safari with BBQ dinner and cultural activities',
            'Full-day Abu Dhabi city tour with one optional theme park',
            'Free day for shopping and independent exploration',
            'Choice of Deluxe, Gold, or Platinum hotel categories'
          ],
          bestTimeToVisit: {
            yearRound: 'Dubai is a year-round destination',
            winter: 'Winter months offer pleasant outdoor weather',
            summer: 'Summer months provide more economical pricing, with sightseeing planned indoors or during evening hours for comfort'
          },
          whyChoosePremiumDubaiTours: [
            'Balanced itinerary with adequate rest and flexibility',
            'Transparent pricing with clearly listed inclusions',
            'Trusted local operators and licensed guides',
            'Multiple hotel categories without compromising service quality',
            'Dedicated assistance before and during travel'
          ]
        } as any);
        setLoading(false);
      } else if (packageId === 'dubai-stopover-signature') {
        // Set Dubai Stopover Signature package data
        setPackageData({
          _id: 'dubai-stopover-signature',
          title: 'Dubai Stopover Signature',
          subtitle: '2 Nights / 3 Days Stopover Tour',
          about: 'The Dubai Stopover Signature – 2 Nights 3 Days is designed for travelers who want to experience Dubai beyond a single night, without committing to a long holiday. Perfect for airline stopovers and short leisure breaks, this itinerary balances guided sightseeing with signature experiences such as desert safaris and marina cruises.',
          services: [
            'Designed for 2–3 day airline stopovers',
            'Balanced mix of sightseeing and leisure',
            'Marina Dhow Cruise & Desert Safari included',
            'Flexible departure day schedule',
            'Multiple hotel category options'
          ],
          tourDetails: `Abstract
The Dubai Stopover Signature – 2 Nights 3 Days is designed for travelers who want to experience Dubai beyond a single night, without committing to a long holiday. Perfect for airline stopovers and short leisure breaks, this itinerary balances guided sightseeing with signature experiences such as desert safaris and marina cruises.
With structured planning, flexible pacing, and professional coordination, this stopover package allows you to enjoy Dubai's highlights while maintaining comfort and clarity throughout your stay.

Overview
Dubai rewards travelers who take even a little extra time to explore. With two nights at your disposal, the city unfolds at a more relaxed pace, allowing you to experience both its cultural depth and modern appeal. The Dubai Stopover Signature is crafted for travelers who want a complete experience within a short timeframe.

Your journey begins with a smooth airport arrival and private hotel transfer. After settling in, the first evening introduces you to Dubai Marina through a Dhow Cruise Dinner, offering skyline views, calm waters, and a relaxed dining atmosphere.

Day two is dedicated to exploration. A half-day Dubai city tour provides insight into the city's evolution, from historic neighborhoods and traditional markets to modern landmarks. In the afternoon, the pace shifts as you venture into the desert safari by a 4x4 desert safari vehicle, featuring dune driving, cultural activities, and a BBQ dinner under the stars.

The final day is intentionally unstructured, allowing time for shopping, leisure, or last-minute exploration before departure. This flexibility makes the package ideal for travelers managing return flights or onward connections.

Key Highlights`,
          itinerary: [
            {
              day: 1,
              title: 'Arrival & Marina Cruise',
              description: 'Arrival and private airport transfer. Hotel check-in. Evening Dhow Cruise Dinner at Dubai Marina. Overnight stay.'
            },
            {
              day: 2,
              title: 'City Tour & Desert Safari',
              description: 'Breakfast at hotel. Half-day Dubai city sightseeing tour and back to hotel. Desert Safari with other activities and BBQ Dinner. Overnight stay.'
            },
            {
              day: 3,
              title: 'Shopping & Departure',
              description: 'Breakfast. Free time for shopping or leisure. Private airport transfer. Departure.'
            }
          ],
          price: 0,
          duration: '2 Nights / 3 Days',
          location: 'Dubai, UAE',
          capacity: '2-6 Guests',
          packageType: 'domestic',
          place: 'dubai',
          images: [
            { url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
            { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
            { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' },
            { url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' }
          ],
          bookings: 0,
          rating: 4.6,
          inclusions: [
            {
              category: 'Airport Transfers',
              items: ['Arrival and departure airport transfers in a private, air-conditioned vehicle']
            },
            {
              category: 'Hotel Accommodation',
              items: [
                'Twin-sharing accommodation based on selected category:',
                'Deluxe Package: 3-star hotel',
                'Gold Package: 4-star hotel',
                'Platinum Package: 5-star hotel'
              ]
            },
            {
              category: 'Meals',
              items: [
                'Daily breakfast at the hotel',
                'BBQ Dinner during Desert Safari',
                'Buffet Dinner during Dhow Cruise'
              ]
            },
            {
              category: 'Sightseeing & Tours',
              items: ['Half-day Dubai City Tour (Old & New Dubai) on a sharing (SIC) basis']
            },
            {
              category: 'Experiences',
              items: [
                '4x4 Desert Safari with dune bashing, camel ride, sandboarding & camp activities',
                'Dhow Cruise Dinner on a sharing basis'
              ]
            },
            {
              category: 'Guide & Assistance',
              items: [
                'English-speaking guide during city tours',
                'Local assistance and coordination throughout the trip'
              ]
            },
            {
              category: 'Taxes',
              items: ['Government taxes and official service charges']
            }
          ],
          exclusions: [
            {
              category: 'International Airfare',
              items: ['Flights to and from Dubai (can be arranged upon request)']
            },
            {
              category: 'UAE Entry Visa',
              items: ['Dubai visa fees (assistance available if required)']
            },
            {
              category: 'Entry Tickets',
              items: ['Theme parks, attractions, and monument tickets (Arranged at actual cost based on traveler preference)']
            },
            {
              category: 'Personal Expenses',
              items: [
                'Lunches, beverages, shopping',
                'Tourism Dirham fees',
                'Laundry, phone calls, minibar usage'
              ]
            },
            {
              category: 'Insurance',
              items: ['Travel and medical insurance']
            },
            {
              category: 'Early Check-in / Late Check-out',
              items: ['Subject to hotel policy and availability']
            }
          ],
          transportation: [
            { type: 'Private Transfer', vehicle: 'Air-conditioned vehicle', description: 'Private airport transfers for arrival and departure' },
            { type: 'Shared Vehicle', vehicle: '4x4 / Coach', description: 'Shared transportation for city tours and desert safari' }
          ],
          accommodation: [
            { city: 'Dubai', hotel: 'Choice of 3-Star, 4-Star, or 5-Star', rooms: 'Twin sharing', roomType: 'Standard/Deluxe/Luxury', nights: '2 Nights' }
          ],
          reviews: [
            { name: "John Smith", rating: 5, comment: "Perfect for a quick stopover! The desert safari and marina cruise were amazing experiences.", date: "2024-01-25" },
            { name: "Maria Garcia", rating: 4, comment: "Great value for a short stay. Well-organized and efficient.", date: "2024-02-18" },
            { name: "David Lee", rating: 5, comment: "Ideal for business travelers with limited time. Covered all the essentials!", date: "2024-03-22" }
          ],
          packageCategory: 'regular',
          highlights: [
            'Designed for 2–3 day airline stopovers',
            'Balanced mix of sightseeing and leisure',
            'Marina Dhow Cruise & Desert Safari included',
            'Flexible departure day schedule',
            'Multiple hotel category options'
          ],
          bestTimeToVisit: {
            yearRound: 'Available year-round',
            summer: 'Summer months offer better pricing, with most activities scheduled indoors or in the evening'
          },
          whyChoosePremiumDubaiTours: [
            'Specialized stopover planning expertise',
            'Reliable timing coordination',
            'Transparent inclusions',
            'Comfortable vehicles & professional guides'
          ],
          optionalAddOns: [
            'Burj Khalifa tickets',
            'Abu Dhabi day tour extension',
            'Private sightseeing upgrade'
          ]
        } as any);
        setLoading(false);
        return; // Skip API fetch for demo package
      }
      // For other package IDs, the first useEffect will handle API fetching
  }, [params?.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isInternational = packageData && !packageData.location.toLowerCase().includes('nepal');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-900">Curating your experience...</h2>
        </div>
      </div>
    );
  }

  // Check if this is an attraction package
  const isAttractionPackage = packageData && (
    packageData._id?.includes('ticket') || 
    packageData._id?.includes('attraction') || 
    packageData._id === 'burj-khalifa-tickets' ||
    packageData.title?.toLowerCase().includes('ticket') ||
    packageData.packageCategory === 'Cultural'
  );

  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 shadow-xl">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
              <Globe className="h-10 w-10 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Package Not Found</h3>
            <p className="text-gray-600 mb-8">{error || 'The package you are looking for does not exist.'}</p>
            <Button onClick={() => router.back()} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isPremium = (packageData as any).packageCategory === 'premium';
  const pricingTiers = getPackagePricingTiers(packageData);

  const renderTierBookingForm = (tierName?: string) => (
    <div className="space-y-3 pt-1 border-t border-gray-100">
      <div className="space-y-1">
        <Label className="text-xs">Travel Date</Label>
        <div className="relative">
          <CalendarIcon className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
          <Input type="date" className="pl-8 h-9 text-sm" />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Guests</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Users className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
            <Input type="number" placeholder="Adults" min="1" className="pl-8 h-9 text-sm" />
          </div>
          <Input type="number" placeholder="Kids" min="0" className="h-9 text-sm" />
        </div>
      </div>

      <div className="space-y-2">
        <Button
          className="w-full text-sm h-9 shadow-md shadow-primary/20"
          onClick={() => {
            if (tierName) setExpandedPricingTier(tierName);
            setIsBookingModalOpen(true);
          }}
        >
          Request Booking
        </Button>
        <Button variant="outline" className="w-full h-9 text-sm border-primary text-primary hover:bg-primary/5">
          <Phone className="h-3.5 w-3.5 mr-1.5" />
          Talk to an Expert
        </Button>
      </div>

      <p className="text-[10px] text-center text-gray-500">
        Free cancellation up to 48 hours before tour
      </p>
    </div>
  );

  return (
    <div className={`min-h-screen ${playfair.variable} ${cormorant.variable} ${poppins.variable} ${isPremium ? 'bg-gradient-to-br from-amber-50/30 via-white to-amber-50/20' : 'bg-[#F8FAFC]'}`}>
      {/* Immersive Hero Section */}
      <div className={`relative h-[70vh] md:h-[80vh] w-full overflow-hidden ${isPremium ? 'shadow-2xl' : ''}`}>
        <div className="absolute inset-0">
          {Array.isArray(packageData.images) && packageData.images.length > 0 ? (
            <Image
              src={packageData.images[selectedImageIndex].url}
              alt={packageData.images[selectedImageIndex].alt || packageData.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <Globe className="h-24 w-24 text-amber-600" />
            </div>
          )}
          <div className={`absolute inset-0 ${isPremium ? 'bg-gradient-to-t from-black/95 via-black/50 to-black/20' : 'bg-gradient-to-t from-black/90 via-black/40 to-transparent'}`} />
          {isPremium && (
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent" />
          )}
        </div>

        {/* Navigation Bar Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 z-20">
          <div className="container mx-auto flex justify-between items-center">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-20 text-white">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  {isPremium ? (
                    <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-none px-4 py-1.5 text-sm font-semibold backdrop-blur-sm shadow-xl">
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      Premium Package
                    </Badge>
                  ) : (
                    <Badge className="bg-primary/90 hover:bg-primary text-white border-none px-3 py-1 text-sm font-medium backdrop-blur-sm shadow-lg">
                      {isInternational ? "International" : "Domestic"}
                    </Badge>
                  )}
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-sm font-medium text-yellow-400 shadow-xl">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold">{packageData.rating}</span>
                    <span className="text-white/70 ml-1">({packageData.reviews?.length || 0} reviews)</span>
                  </div>
                </div>

                <h1 className={`text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-shadow-lg leading-tight ${isPremium ? 'font-playfair' : ''}`}>
                  {packageData.title}
                </h1>
                {packageData.subtitle && (
                  <p className={`text-xl md:text-2xl text-white/90 mb-6 ${isPremium ? 'font-poppins font-light' : ''}`}>
                    {packageData.subtitle}
                  </p>
                )}

                <div className={`flex flex-wrap items-center gap-6 text-lg text-white/95 font-medium ${isPremium ? 'font-poppins' : ''}`}>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <MapPin className={`h-5 w-5 ${isPremium ? 'text-amber-400' : 'text-primary'}`} />
                    <span>{packageData.location}</span>
                  </div>
                  <div className="h-1.5 w-1.5 bg-white/50 rounded-full hidden md:block" />
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <Clock className={`h-5 w-5 ${isPremium ? 'text-amber-400' : 'text-primary'}`} />
                    <span>{packageData.duration}</span>
                  </div>
                  <div className="h-1.5 w-1.5 bg-white/50 rounded-full hidden md:block" />
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <Users className={`h-5 w-5 ${isPremium ? 'text-amber-400' : 'text-primary'}`} />
                    <span>{packageData.capacity}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery Preview (Desktop) */}
              <div className="hidden lg:flex gap-3">
                {Array.isArray(packageData.images) && packageData.images.slice(0, 3).map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all shadow-xl ${selectedImageIndex === index ? 'border-primary ring-2 ring-primary/30' : 'border-white/30 hover:border-white'
                      }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image src={image.url} alt={image.alt} fill className="object-cover" />
                  </div>
                ))}
                {packageData.images.length > 3 && (
                  <div className="w-24 h-16 rounded-lg bg-black/50 border-2 border-white/30 flex items-center justify-center text-white font-medium cursor-pointer hover:bg-black/70 backdrop-blur-sm">
                    +{packageData.images.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12 relative z-10 -mt-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Special View for Attraction Packages - Dynamic Data from Database */}
            {isAttractionPackage && (
              <div className="space-y-8">
                {/* Overview Section */}
                {packageData.about && (
                  <Card className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-2 border-purple-200 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                      <CardTitle className="text-2xl font-bold">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {packageData.about}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Abstract Section */}
                {packageData.abstract && (
                  <Card className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <CardTitle className="text-2xl font-bold">Abstract</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {packageData.abstract}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Key Highlights */}
                {packageData.keyHighlights && packageData.keyHighlights.length > 0 && (
                  <Card className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <CardTitle className="text-2xl font-bold flex items-center gap-3">
                        <Star className="h-6 w-6" />
                        Key Highlights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {packageData.keyHighlights.map((highlight: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Pricing Information */}
                <Card className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-2 border-purple-200 shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <CardTitle className="text-3xl font-bold flex items-center gap-3">
                      <Ticket className="h-8 w-8" />
                      {packageData.title} – Pricing Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {/* Pricing from hotelOptions or tourDetails */}
                    {packageData.hotelOptions && packageData.hotelOptions.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Pricing (Per Person)</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {packageData.hotelOptions.map((option: string, idx: number) => {
                            // Extract price from option string (e.g., "Adult (12 years & above): AED 659")
                            const priceMatch = option.match(/AED\s*(\d+)/i);
                            const price = priceMatch ? priceMatch[1] : null;
                            const isHighlighted = option.toLowerCase().includes('prime') || option.toLowerCase().includes('adult');
                            
                            return (
                              <div 
                                key={idx} 
                                className={`p-6 rounded-xl border-2 shadow-lg hover:shadow-xl transition-all ${
                                  isHighlighted 
                                    ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-400' 
                                    : 'bg-white border-purple-200'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`font-medium ${isHighlighted ? 'text-gray-800' : 'text-gray-600'}`}>
                                    {option.split(':')[0]}
                                  </span>
                                  {isHighlighted && option.toLowerCase().includes('prime') && (
                                    <Badge className="bg-indigo-600 text-white">Premium</Badge>
                                  )}
                                </div>
                                {price && (
                                  <>
                                    <div className={`text-3xl font-bold ${isHighlighted ? 'text-indigo-700' : 'text-purple-600'}`}>
                                      AED {price}
                                    </div>
                                    <p className={`text-sm mt-1 ${isHighlighted ? 'text-gray-600' : 'text-gray-500'}`}>
                                      {option.includes('Free') ? 'Free of charge' : 'per person'}
                                    </p>
                                  </>
                                )}
                                {!price && (
                                  <p className="text-gray-600 mt-2">{option.split(':')[1]?.trim() || option}</p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Inclusions */}
                    {packageData.inclusions && packageData.inclusions.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                          Inclusions
                        </h3>
                        <div className="space-y-4">
                          {packageData.inclusions.map((item: any, idx: number) => {
                            if (typeof item === 'object' && 'category' in item) {
                              return (
                                <div key={idx} className="bg-white p-5 rounded-lg border border-green-200">
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    {item.category}
                                  </h4>
                                  <ul className="space-y-2 ml-7">
                                    {item.items.map((subItem: string, subIdx: number) => (
                                      <li key={subIdx} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-green-600 font-bold mt-0.5">•</span>
                                        <span>{subItem}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Child Policy */}
                    {packageData.exclusions && packageData.exclusions.length > 0 && (
                      <div className="mb-8">
                        {packageData.exclusions.map((item: any, idx: number) => {
                          if (typeof item === 'object' && 'category' in item && item.category === 'Child Policy') {
                            return (
                              <div key={idx} className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Child Policy</h3>
                                <ul className="space-y-2">
                                  {item.items.map((policy: string, policyIdx: number) => (
                                    <li key={policyIdx} className="flex items-start gap-2 text-gray-700">
                                      <span className="text-blue-600 font-bold mt-0.5">•</span>
                                      <span>{policy}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}

                    {/* Terms & Conditions */}
                    {packageData.exclusions && packageData.exclusions.length > 0 && (
                      <div className="mb-8">
                        {packageData.exclusions.map((item: any, idx: number) => {
                          if (typeof item === 'object' && 'category' in item && item.category === 'Terms & Conditions') {
                            return (
                              <div key={idx} className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Info className="h-5 w-5 text-yellow-900" />
                                  </div>
                                  <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-3">Terms & Conditions</h4>
                                    <ul className="space-y-2 text-gray-700">
                                      {item.items.map((term: string, termIdx: number) => (
                                        <li key={termIdx} className="flex items-start gap-2">
                                          <span className="text-yellow-600 font-bold mt-0.5">•</span>
                                          <span>{term}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}

                    {/* Transfers Note */}
                    {packageData.exclusions && packageData.exclusions.length > 0 && (
                      <div className="mb-8">
                        {packageData.exclusions.map((item: any, idx: number) => {
                          if (typeof item === 'object' && 'category' in item && item.category === 'Transfers') {
                            return (
                              <div key={idx} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <p className="text-gray-700">
                                  <strong>Note:</strong> {item.items[0]}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}

                    {/* Contact Button */}
                    <div className="mt-8 text-center">
                      <Link href="/contact">
                        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all">
                          Book Your Tickets Now
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Regular Package View - Only show if NOT an attraction package */}
            {!isAttractionPackage && (
              <>
            {/* Navigation Tabs */}
            <div className={`rounded-2xl shadow-xl border p-2 sticky top-[80px] z-10 backdrop-blur-xl ${isPremium ? 'bg-gradient-to-r from-white to-amber-50/50 border-amber-200/50' : 'bg-white/90 border-gray-100'}`}>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                {[
                  { id: 'overview', label: 'Overview', icon: Info },
                  { id: 'itinerary', label: 'Itinerary', icon: Calendar },
                  { id: 'inclusions', label: 'Inclusions', icon: CheckCircle },
                  { id: 'reviews', label: 'Reviews', icon: Star },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      const el = document.getElementById(tab.id);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setActiveTab(tab.id as any);
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.id 
                        ? isPremium 
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg' 
                          : 'bg-primary text-white shadow-lg'
                        : isPremium
                          ? 'bg-transparent text-gray-700 hover:bg-amber-50/50'
                          : 'bg-transparent text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Section */}
            <section id="overview" className="space-y-6">
              <Card className={`border-none shadow-xl overflow-hidden animate-fade-in-up ${isPremium ? 'bg-gradient-to-br from-white to-amber-50/30 border-amber-200/50' : ''}`}>
                <CardHeader className={`${isPremium ? 'bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-b border-amber-200/50' : 'bg-gray-50/50 border-b border-gray-100'} pb-4`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${isPremium ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 'bg-primary/10'}`}>
                      <PlayCircle className={`h-6 w-6 ${isPremium ? 'text-white' : 'text-primary'}`} />
                    </div>
                    <CardTitle className={`text-2xl font-bold text-gray-900 ${isPremium ? 'font-playfair' : ''}`}>Experience Highlights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Package Title & Subtitle - Already shown in hero, but can add here if needed */}
                  
                  {/* Abstract */}
                  {packageData.abstract && (
                    <Card className="mb-6 bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-200/50 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-b border-blue-200/50">
                        <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Abstract</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                          {packageData.abstract}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Tour Overview */}
                  {packageData.tourOverview && (
                    <Card className="mb-6 bg-gradient-to-br from-purple-50/50 to-white border-2 border-purple-200/50 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-b border-purple-200/50">
                        <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Tour Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                          {packageData.tourOverview}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Key Highlights */}
                  {packageData.keyHighlights && packageData.keyHighlights.length > 0 && (
                    <Card className="mb-6 bg-gradient-to-br from-green-50/50 to-white border-2 border-green-200/50 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-b border-green-200/50">
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                          <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                            <Star className="h-5 w-5 text-white fill-white" />
                          </div>
                          Key Highlights
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ul className="space-y-3">
                          {packageData.keyHighlights.map((highlight: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 font-poppins font-light">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Hotel Options */}
                  {packageData.hotelOptions && packageData.hotelOptions.length > 0 && (
                    <Card className="mb-6 bg-gradient-to-br from-indigo-50/50 to-white border-2 border-indigo-200/50 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border-b border-indigo-200/50">
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                          <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                            <Hotel className="h-5 w-5 text-white" />
                          </div>
                          Hotel Options
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ul className="space-y-3">
                          {packageData.hotelOptions.map((option: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-3 text-indigo-600 font-bold">•</span>
                              <span className="text-gray-700 font-poppins font-light">{option}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Best Time to Visit */}
                  {packageData.bestTimeToVisit && (
                    <Card className="mb-6 bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-200/50 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-200/50">
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                          <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                            <Calendar className="h-5 w-5 text-white" />
                          </div>
                          Best Time to Visit Dubai
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        {packageData.bestTimeToVisit.yearRound && (
                          <p className="text-gray-700 leading-relaxed font-poppins font-light">
                            {packageData.bestTimeToVisit.yearRound}
                          </p>
                        )}
                        {(packageData.bestTimeToVisit.winter || packageData.bestTimeToVisit.summer) && (
                          <div className="grid md:grid-cols-2 gap-4">
                            {packageData.bestTimeToVisit.winter && (
                              <div className="bg-white/80 p-4 rounded-lg border border-orange-200/50">
                                <h4 className="font-semibold text-gray-900 mb-2 font-cormorant">Winter:</h4>
                                <p className="text-gray-700 text-sm font-poppins font-light">
                                  {packageData.bestTimeToVisit.winter}
                                </p>
                              </div>
                            )}
                            {packageData.bestTimeToVisit.summer && (
                              <div className="bg-white/80 p-4 rounded-lg border border-orange-200/50">
                                <h4 className="font-semibold text-gray-900 mb-2 font-cormorant">Summer:</h4>
                                <p className="text-gray-700 text-sm font-poppins font-light">
                                  {packageData.bestTimeToVisit.summer}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Why Choose This Trip? */}
                  {packageData.whyChooseThisTrip && packageData.whyChooseThisTrip.length > 0 && (
                    <Card className="mb-6 bg-gradient-to-br from-pink-50/50 to-white border-2 border-pink-200/50 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-pink-500/10 to-pink-600/10 border-b border-pink-200/50">
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                          <div className="p-2 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg">
                            <Heart className="h-5 w-5 text-white fill-white" />
                          </div>
                          Why Choose This Trip?
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ul className="space-y-3">
                          {packageData.whyChooseThisTrip.map((reason: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-3 text-pink-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 font-poppins font-light">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Why Premium Dubai Tours for This Journey? */}
                  {packageData.whyPremiumDubaiTours && packageData.whyPremiumDubaiTours.length > 0 && (
                    <Card className="mb-6 bg-gradient-to-br from-teal-50/50 to-white border-2 border-teal-200/50 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-teal-500/10 to-teal-600/10 border-b border-teal-200/50">
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                          <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg">
                            <ShieldCheck className="h-5 w-5 text-white" />
                          </div>
                          Why Premium Dubai Tours for This Journey?
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ul className="space-y-3">
                          {packageData.whyPremiumDubaiTours.map((reason: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-3 text-teal-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 font-poppins font-light">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* About Premium Dubai Tours */}
                  {packageData.about && (
                    <Card className="mb-6 bg-gradient-to-br from-amber-50/50 to-white border-2 border-amber-200/50 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-b border-amber-200/50">
                        <CardTitle className="text-xl font-bold text-gray-900 font-playfair">About Premium Dubai Tours</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className={`text-lg text-gray-700 leading-relaxed ${isPremium ? 'font-poppins font-light' : 'font-light'}`}>
                    {packageData.about}
                  </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Premium Package Specific Content - Dubai Private Classic Discovery */}
                  {(packageData as any).packageCategory === 'premium' && packageData._id === 'dubai-private-classic-discovery' && (
                    <div className="mb-8 space-y-6">
                      {/* Ideal For, Pricing Model, Hotel Options */}
                      <Card className="bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-200/50 shadow-lg">
                        <CardContent className="p-6 space-y-4">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 font-cormorant">Ideal For:</h4>
                              <p className="text-gray-700 font-poppins font-light">{(packageData as any).idealFor || 'Families, honeymooners, first-time Dubai visitors, luxury travelers'}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 font-cormorant">Pricing Model:</h4>
                              <p className="text-gray-700 font-poppins font-light">{(packageData as any).pricingModel || 'Per vehicle (up to 6 guests)'}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 font-cormorant">Hotel Options:</h4>
                              <ul className="space-y-1 text-gray-700 font-poppins font-light">
                                {((packageData as any).hotelOptions || [
                                  'Without hotel accommodation',
                                  '4-star premium hotels',
                                  '5-star luxury hotels'
                                ]).map((option: string, idx: number) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{option}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Abstract */}
                      <Card className="bg-gradient-to-br from-amber-50/50 to-white border-2 border-amber-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-b border-amber-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Abstract</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Tour Overview')[0]?.replace('Abstract\n', '') || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Tour Overview */}
                      <Card className="bg-gradient-to-br from-purple-50/50 to-white border-2 border-purple-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-b border-purple-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Tour Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Tour Overview')[1] || packageData.tourDetails}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Key Highlights */}
                      <Card className="bg-gradient-to-br from-green-50/50 to-white border-2 border-green-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-b border-green-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                              <Star className="h-5 w-5 text-white fill-white" />
                            </div>
                            Key Highlights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {((packageData as any).keyHighlights || packageData.services || []).map((highlight: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Pricing Options */}
                      <Card className="bg-gradient-to-br from-indigo-50/50 to-white border-2 border-indigo-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border-b border-indigo-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                              <Car className="h-5 w-5 text-white" />
                            </div>
                            Pricing Options (Per Vehicle – Up to 6 Guests)
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {(() => {
                              const raw = (packageData as any).pricingOptions;
                              const structured =
                                Array.isArray(raw) &&
                                raw.length > 0 &&
                                typeof raw[0] === 'object' &&
                                raw[0] !== null;

                              if (structured) {
                                return raw.map((tier: any, idx: number) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="mr-3 text-indigo-600 font-bold">•</span>
                                    <span className="text-gray-700 font-poppins font-light">
                                      <strong>{tier.name}</strong> - AED {tier.price}
                                      {tier.description ? ` (${tier.description})` : ''}
                                    </span>
                                  </li>
                                ));
                              }

                              // Backward compat with older string[] pricingOptions
                              const fallback = [
                                'Tour Only (No Hotel Accommodation)',
                                'Premium 4-Star Hotel Accommodation',
                                'Luxury 5-Star Hotel Accommodation',
                              ];

                              const list = Array.isArray(raw) && raw.length > 0 ? raw : fallback;

                              return list.map((option: any, idx: number) => (
                                <li key={idx} className="flex items-start">
                                  <span className="mr-3 text-indigo-600 font-bold">•</span>
                                  <span className="text-gray-700 font-poppins font-light">{option}</span>
                                </li>
                              ));
                            })()}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Best Time to Visit Dubai */}
                      <Card className="bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                              <Calendar className="h-5 w-5 text-white" />
                            </div>
                            Best Time to Visit Dubai
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                          <p className="text-gray-700 leading-relaxed font-poppins font-light">
                            This premium tour is available year-round.
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/80 p-4 rounded-lg border border-orange-200/50">
                              <h4 className="font-semibold text-gray-900 mb-2 font-cormorant">October to April:</h4>
                              <p className="text-gray-700 text-sm font-poppins font-light">
                                {((packageData as any).bestTimeToVisit?.octoberToApril) || 'Ideal weather for outdoor sightseeing'}
                              </p>
                            </div>
                            <div className="bg-white/80 p-4 rounded-lg border border-orange-200/50">
                              <h4 className="font-semibold text-gray-900 mb-2 font-cormorant">May to September:</h4>
                              <p className="text-gray-700 text-sm font-poppins font-light">
                                {((packageData as any).bestTimeToVisit?.mayToSeptember) || 'Lower costs; itineraries focus on indoor attractions and evening experiences'}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Why Choose This Trip */}
                      <Card className="bg-gradient-to-br from-pink-50/50 to-white border-2 border-pink-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-pink-500/10 to-pink-600/10 border-b border-pink-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg">
                              <Heart className="h-5 w-5 text-white fill-white" />
                            </div>
                            Why Choose This Trip?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {((packageData as any).whyChooseThisTrip || []).map((reason: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-pink-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Why Premium Dubai Tours for This Journey */}
                      <Card className="bg-gradient-to-br from-teal-50/50 to-white border-2 border-teal-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-teal-500/10 to-teal-600/10 border-b border-teal-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg">
                              <ShieldCheck className="h-5 w-5 text-white" />
                            </div>
                            Why Premium Dubai Tours for This Journey?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {((packageData as any).whyPremiumDubaiTours || (isAttractionPackage ? [] : [])).map((reason: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-teal-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* FAQs */}
                      <Card className="bg-gradient-to-br from-violet-50/50 to-white border-2 border-violet-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-violet-500/10 to-violet-600/10 border-b border-violet-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg">
                              <Info className="h-5 w-5 text-white" />
                            </div>
                            FAQs
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="space-y-6">
                            {((packageData as any).faqs || []).map((faq: { question: string; answer: string }, idx: number) => (
                              <div key={idx} className="border-b border-violet-200/50 pb-4 last:border-b-0 last:pb-0">
                                <h4 className="font-semibold text-gray-900 mb-2 font-cormorant">{faq.question}</h4>
                                <p className="text-gray-700 font-poppins font-light">{faq.answer}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Regular Package Specific Content - Dubai Grand Explorer */}
                  {(packageData as any).packageCategory === 'regular' && packageData._id === 'dubai-grand-explorer' && (
                    <div className="mb-8 space-y-6">
                      {/* Abstract */}
                      <Card className="bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-b border-blue-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Abstract</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Tour Overview')[0]?.replace('Abstract\n\n', '').trim() || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Tour Overview */}
                      <Card className="bg-gradient-to-br from-purple-50/50 to-white border-2 border-purple-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-b border-purple-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Tour Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Tour Overview')[1]?.split('Key Highlights')[0]?.trim() || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Key Highlights */}
                      <Card className="bg-gradient-to-br from-green-50/50 to-white border-2 border-green-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-b border-green-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                              <Star className="h-5 w-5 text-white fill-white" />
                            </div>
                            Key Highlights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {(packageData as any).highlights?.map((highlight: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Hotel Options */}
                      <Card className="bg-gradient-to-br from-indigo-50/50 to-white border-2 border-indigo-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border-b border-indigo-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                              <Hotel className="h-5 w-5 text-white" />
                            </div>
                            Hotel Options
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {(packageData as any).hotelOptions?.map((option: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-3 text-indigo-600 font-bold">•</span>
                                <span className="text-gray-700 font-poppins font-light">{option}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Best Time to Visit */}
                      <Card className="bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                              <Calendar className="h-5 w-5 text-white" />
                            </div>
                            Best Time to Visit
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed font-poppins font-light">
                              <p>{((packageData as any).bestTimeToVisit?.yearRound || 'Dubai can be visited throughout the year.')}</p>
                              {((packageData as any).bestTimeToVisit?.novemberToMarch && (
                                <p className="mt-3">
                                  <strong>• November to March:</strong> {((packageData as any).bestTimeToVisit?.novemberToMarch)}
                                </p>
                              ))}
                              {((packageData as any).bestTimeToVisit?.aprilToOctober && (
                                <p className="mt-3">
                                  <strong>• April to October:</strong> {((packageData as any).bestTimeToVisit?.aprilToOctober)}
                                </p>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Why Choose Premium Dubai Tours for This Trip */}
                      <Card className="bg-gradient-to-br from-teal-50/50 to-white border-2 border-teal-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-teal-500/10 to-teal-600/10 border-b border-teal-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg">
                              <ShieldCheck className="h-5 w-5 text-white" />
                            </div>
                            Why Choose Premium Dubai Tours for This Trip?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {((packageData as any).whyChoosePremiumDubaiTours || []).map((reason: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-teal-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Regular Package Specific Content - Dubai Transit Escape */}
                  {(packageData as any).packageCategory === 'regular' && packageData._id === 'dubai-transit-escape' && (
                    <div className="mb-8 space-y-6">
                      {/* Abstract */}
                      <Card className="bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-b border-blue-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Abstract</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Overview')[0]?.replace('Abstract\n\n', '').trim() || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Overview */}
                      <Card className="bg-gradient-to-br from-purple-50/50 to-white border-2 border-purple-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-b border-purple-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Overview')[1]?.split('Highlights')[0]?.trim() || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Highlights */}
                      <Card className="bg-gradient-to-br from-green-50/50 to-white border-2 border-green-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-b border-green-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                              <Star className="h-5 w-5 text-white fill-white" />
                            </div>
                            Highlights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {(packageData as any).highlights?.map((highlight: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Hotel Options */}
                      <Card className="bg-gradient-to-br from-indigo-50/50 to-white border-2 border-indigo-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border-b border-indigo-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                              <Hotel className="h-5 w-5 text-white" />
                            </div>
                            Hotel Options
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {(packageData as any).hotelOptions?.map((option: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-3 text-indigo-600 font-bold">•</span>
                                <span className="text-gray-700 font-poppins font-light">{option}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Best Time to Visit */}
                      <Card className="bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                              <Calendar className="h-5 w-5 text-white" />
                            </div>
                            Best Time to Visit
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed font-poppins font-light">
                              <p>{((packageData as any).bestTimeToVisit?.yearRound || 'This transit tour operates throughout the year.')}</p>
                              {((packageData as any).bestTimeToVisit?.octoberToApril && (
                                <p className="mt-3">
                                  <strong>• October to April:</strong> {((packageData as any).bestTimeToVisit?.octoberToApril)}
                                </p>
                              ))}
                              {((packageData as any).bestTimeToVisit?.mayToSeptember && (
                                <p className="mt-3">
                                  <strong>• May to September:</strong> {((packageData as any).bestTimeToVisit?.mayToSeptember)}
                                </p>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Why Premium Dubai Tours for This Transit Trip */}
                      <Card className="bg-gradient-to-br from-teal-50/50 to-white border-2 border-teal-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-teal-500/10 to-teal-600/10 border-b border-teal-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg">
                              <ShieldCheck className="h-5 w-5 text-white" />
                            </div>
                            Why Premium Dubai Tours for This Transit Trip?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {((packageData as any).whyChoosePremiumDubaiTours || []).map((reason: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-teal-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Optional Add-Ons */}
                      {(packageData as any).optionalAddOns && (packageData as any).optionalAddOns.length > 0 && (
                        <Card className="bg-gradient-to-br from-amber-50/50 to-white border-2 border-amber-200/50 shadow-lg">
                          <CardHeader className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-b border-amber-200/50">
                            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                              <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
                                <Sparkles className="h-5 w-5 text-white" />
                              </div>
                              Optional Add-Ons
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <ul className="space-y-3">
                              {((packageData as any).optionalAddOns || []).map((addOn: string, idx: number) => (
                                <li key={idx} className="flex items-start">
                                  <CheckCircle className="h-5 w-5 mr-3 text-amber-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 font-poppins font-light">{addOn}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}

                  {/* Regular Package Specific Content - Dubai Grand Experience */}
                  {(packageData as any).packageCategory === 'regular' && packageData._id === 'dubai-grand-experience' && (
                    <div className="mb-8 space-y-6">
                      {/* Abstract */}
                      <Card className="bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-b border-blue-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Abstract</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Tour Overview')[0]?.replace('Abstract\n', '') || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Tour Overview */}
                      <Card className="bg-gradient-to-br from-purple-50/50 to-white border-2 border-purple-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-b border-purple-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Tour Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Tour Overview')[1]?.split('Key Highlights')[0]?.trim() || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Key Highlights */}
                      <Card className="bg-gradient-to-br from-green-50/50 to-white border-2 border-green-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-b border-green-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                              <Star className="h-5 w-5 text-white fill-white" />
                            </div>
                            Key Highlights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {(packageData as any).highlights?.map((highlight: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Hotel Options */}
                      <Card className="bg-gradient-to-br from-indigo-50/50 to-white border-2 border-indigo-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border-b border-indigo-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                              <Hotel className="h-5 w-5 text-white" />
                            </div>
                            Hotel Options
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <span className="mr-3 text-indigo-600 font-bold">•</span>
                              <span className="text-gray-700 font-poppins font-light"><strong>Deluxe Package:</strong> 3★ hotels, twin sharing, breakfast included</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-3 text-indigo-600 font-bold">•</span>
                              <span className="text-gray-700 font-poppins font-light"><strong>Gold Package:</strong> 4★ hotels, twin sharing, breakfast included</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-3 text-indigo-600 font-bold">•</span>
                              <span className="text-gray-700 font-poppins font-light"><strong>Platinum Package:</strong> 5★ hotels, twin sharing, breakfast included</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Best Time to Visit */}
                      <Card className="bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                              <Calendar className="h-5 w-5 text-white" />
                            </div>
                            Best Time to Visit
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {((packageData as any).bestTimeToVisit?.yearRound || 'Dubai can be visited throughout the year.')}
                              {((packageData as any).bestTimeToVisit?.winter && (
                                <div className="mt-3">
                                  <strong>Winter:</strong> {((packageData as any).bestTimeToVisit?.winter)}
                                </div>
                              ))}
                              {((packageData as any).bestTimeToVisit?.summer && (
                                <div className="mt-3">
                                  <strong>Summer:</strong> {((packageData as any).bestTimeToVisit?.summer)}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Why Choose Premium Dubai Tours for This Trip */}
                      <Card className="bg-gradient-to-br from-teal-50/50 to-white border-2 border-teal-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-teal-500/10 to-teal-600/10 border-b border-teal-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg">
                              <ShieldCheck className="h-5 w-5 text-white" />
                            </div>
                            Why Choose Premium Dubai Tours for This Trip?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {((packageData as any).whyChoosePremiumDubaiTours || []).map((reason: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-teal-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Regular Package Specific Content - Dubai Essential Experience */}
                  {(packageData as any).packageCategory === 'regular' && packageData._id === 'dubai-essential-experience' && (
                    <div className="mb-8 space-y-6">
                      {/* Abstract */}
                      <Card className="bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-b border-blue-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Abstract</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Overview')[0]?.replace('Abstract\n', '') || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Overview */}
                      <Card className="bg-gradient-to-br from-purple-50/50 to-white border-2 border-purple-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-b border-purple-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Overview')[1]?.split('Highlights')[0]?.trim() || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Highlights */}
                      <Card className="bg-gradient-to-br from-green-50/50 to-white border-2 border-green-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-b border-green-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                              <Star className="h-5 w-5 text-white fill-white" />
                            </div>
                            Highlights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {(packageData as any).highlights?.map((highlight: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Best Time to Visit */}
                      <Card className="bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                              <Calendar className="h-5 w-5 text-white" />
                            </div>
                            Best Time to Visit
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {((packageData as any).bestTimeToVisit?.yearRound || 'Dubai can be visited throughout the year.')}
                              {((packageData as any).bestTimeToVisit?.summer && (
                                <div className="mt-3">
                                  <strong>Summer:</strong> {((packageData as any).bestTimeToVisit?.summer)}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Why Choose Premium Dubai Tours for This Trip */}
                      <Card className="bg-gradient-to-br from-teal-50/50 to-white border-2 border-teal-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-teal-500/10 to-teal-600/10 border-b border-teal-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg">
                              <ShieldCheck className="h-5 w-5 text-white" />
                            </div>
                            Why Choose Premium Dubai Tours for This Trip?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {((packageData as any).whyChoosePremiumDubaiTours || []).map((reason: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-teal-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Regular Package Specific Content - Dubai Signature Explorer */}
                  {(packageData as any).packageCategory === 'regular' && packageData._id === 'dubai-signature-explorer' && (
                    <div className="mb-8 space-y-6">
                      {/* Abstract */}
                      <Card className="bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-b border-blue-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Abstract</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Tour Overview')[0]?.replace('Abstract\n', '') || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Tour Overview */}
                      <Card className="bg-gradient-to-br from-purple-50/50 to-white border-2 border-purple-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-b border-purple-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Tour Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Tour Overview')[1]?.split('Key Highlights')[0]?.trim() || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Key Highlights */}
                      <Card className="bg-gradient-to-br from-green-50/50 to-white border-2 border-green-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-b border-green-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                              <Star className="h-5 w-5 text-white fill-white" />
                            </div>
                            Key Highlights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {(packageData as any).highlights?.map((highlight: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Hotel Options */}
                      <Card className="bg-gradient-to-br from-indigo-50/50 to-white border-2 border-indigo-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border-b border-indigo-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                              <Hotel className="h-5 w-5 text-white" />
                            </div>
                            Hotel Options
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <span className="mr-3 text-indigo-600 font-bold">•</span>
                              <span className="text-gray-700 font-poppins font-light"><strong>Deluxe Package:</strong> 3★ hotels, twin sharing, breakfast included</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-3 text-indigo-600 font-bold">•</span>
                              <span className="text-gray-700 font-poppins font-light"><strong>Gold Package:</strong> 4★ hotels, twin sharing, breakfast included</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-3 text-indigo-600 font-bold">•</span>
                              <span className="text-gray-700 font-poppins font-light"><strong>Platinum Package:</strong> 5★ hotels, twin sharing, breakfast included</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Best Time to Visit */}
                      <Card className="bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                              <Calendar className="h-5 w-5 text-white" />
                            </div>
                            Best Time to Visit
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {((packageData as any).bestTimeToVisit?.yearRound || 'Dubai is a year-round destination.')}
                              {((packageData as any).bestTimeToVisit?.winter && (
                                <div className="mt-3">
                                  <strong>Winter:</strong> {((packageData as any).bestTimeToVisit?.winter)}
                                </div>
                              ))}
                              {((packageData as any).bestTimeToVisit?.summer && (
                                <div className="mt-3">
                                  <strong>Summer:</strong> {((packageData as any).bestTimeToVisit?.summer)}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Why Choose Premium Dubai Tours for This Trip */}
                      <Card className="bg-gradient-to-br from-teal-50/50 to-white border-2 border-teal-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-teal-500/10 to-teal-600/10 border-b border-teal-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg">
                              <ShieldCheck className="h-5 w-5 text-white" />
                            </div>
                            Why Choose Premium Dubai Tours for This Trip?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {((packageData as any).whyChoosePremiumDubaiTours || []).map((reason: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-teal-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Regular Package Specific Content - Dubai Stopover Signature */}
                  {(packageData as any).packageCategory === 'regular' && packageData._id === 'dubai-stopover-signature' && (
                    <div className="mb-8 space-y-6">
                      {/* Abstract */}
                      <Card className="bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-b border-blue-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Abstract</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Overview')[0]?.replace('Abstract\n', '') || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Overview */}
                      <Card className="bg-gradient-to-br from-purple-50/50 to-white border-2 border-purple-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-b border-purple-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Overview')[1]?.split('Key Highlights')[0]?.trim() || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Key Highlights */}
                      <Card className="bg-gradient-to-br from-green-50/50 to-white border-2 border-green-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-b border-green-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                              <Star className="h-5 w-5 text-white fill-white" />
                            </div>
                            Key Highlights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {(packageData as any).highlights?.map((highlight: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Hotel Options */}
                      <Card className="bg-gradient-to-br from-indigo-50/50 to-white border-2 border-indigo-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border-b border-indigo-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                              <Hotel className="h-5 w-5 text-white" />
                            </div>
                            Hotel Options
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <span className="mr-3 text-indigo-600 font-bold">•</span>
                              <span className="text-gray-700 font-poppins font-light"><strong>Deluxe:</strong> 3★ Hotel</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-3 text-indigo-600 font-bold">•</span>
                              <span className="text-gray-700 font-poppins font-light"><strong>Gold:</strong> 4★ Hotel</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-3 text-indigo-600 font-bold">•</span>
                              <span className="text-gray-700 font-poppins font-light"><strong>Platinum:</strong> 5★ Hotel</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Best Time to Visit */}
                      <Card className="bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                              <Calendar className="h-5 w-5 text-white" />
                            </div>
                            Best Time to Visit
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {((packageData as any).bestTimeToVisit?.yearRound || 'Available year-round.')}
                              {((packageData as any).bestTimeToVisit?.summer && (
                                <div className="mt-3">
                                  <strong>Summer:</strong> {((packageData as any).bestTimeToVisit?.summer)}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Why Premium Dubai Tours for This Stopover */}
                      <Card className="bg-gradient-to-br from-teal-50/50 to-white border-2 border-teal-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-teal-500/10 to-teal-600/10 border-b border-teal-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg">
                              <ShieldCheck className="h-5 w-5 text-white" />
                            </div>
                            Why Premium Dubai Tours for This Stopover?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {((packageData as any).whyChoosePremiumDubaiTours || []).map((reason: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-teal-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Optional Add-Ons */}
                      {(packageData as any).optionalAddOns && (packageData as any).optionalAddOns.length > 0 && (
                        <Card className="bg-gradient-to-br from-amber-50/50 to-white border-2 border-amber-200/50 shadow-lg">
                          <CardHeader className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-b border-amber-200/50">
                            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                              <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
                                <Sparkles className="h-5 w-5 text-white" />
                              </div>
                              Optional Add-Ons
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <ul className="space-y-3">
                              {((packageData as any).optionalAddOns || []).map((addOn: string, idx: number) => (
                                <li key={idx} className="flex items-start">
                                  <CheckCircle className="h-5 w-5 mr-3 text-amber-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 font-poppins font-light">{addOn}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}

                  {/* Regular Package Specific Content - Classic Discovery of Dubai and Abu Dhabi */}
                  {(packageData as any).packageCategory === 'regular' && packageData._id === 'classic-discovery-dubai-abu-dhabi' && (
                    <div className="mb-8 space-y-6">
                      {/* Abstract */}
                      <Card className="bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-b border-blue-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Abstract</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Tour Overview')[0]?.replace('Abstract\n', '') || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Tour Overview */}
                      <Card className="bg-gradient-to-br from-purple-50/50 to-white border-2 border-purple-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-b border-purple-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 font-playfair">Tour Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line font-poppins font-light">
                              {packageData.tourDetails?.split('Tour Overview')[1]?.trim() || ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Highlights */}
                      <Card className="bg-gradient-to-br from-green-50/50 to-white border-2 border-green-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-b border-green-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                              <Star className="h-5 w-5 text-white fill-white" />
                            </div>
                            Highlights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {((packageData as any).highlights || packageData.services || []).map((highlight: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Best Time to Visit */}
                      <Card className="bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                              <Calendar className="h-5 w-5 text-white" />
                            </div>
                            Best Time to Visit
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                          <p className="text-gray-700 leading-relaxed font-poppins font-light">
                            Dubai can be visited throughout the year.
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/80 p-4 rounded-lg border border-orange-200/50">
                              <h4 className="font-semibold text-gray-900 mb-2 font-cormorant">Winter months:</h4>
                              <p className="text-gray-700 text-sm font-poppins font-light">
                                {((packageData as any).bestTimeToVisit?.winter) || 'Ideal for outdoor activities'}
                              </p>
                            </div>
                            <div className="bg-white/80 p-4 rounded-lg border border-orange-200/50">
                              <h4 className="font-semibold text-gray-900 mb-2 font-cormorant">Summer:</h4>
                              <p className="text-gray-700 text-sm font-poppins font-light">
                                {((packageData as any).bestTimeToVisit?.summer) || 'More economical pricing, with tours scheduled indoors or during evenings for comfort'}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Why Choose Premium Dubai Tours for This Trip */}
                      <Card className="bg-gradient-to-br from-teal-50/50 to-white border-2 border-teal-200/50 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-teal-500/10 to-teal-600/10 border-b border-teal-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg">
                              <ShieldCheck className="h-5 w-5 text-white" />
                            </div>
                            Why Choose Premium Dubai Tours for This Trip?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-3">
                            {((packageData as any).whyChoosePremiumDubaiTours || []).map((reason: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-teal-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 font-poppins font-light">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Generic Premium Package Content (for other premium packages) */}
                  {(packageData as any).packageCategory === 'premium' && packageData._id !== 'dubai-private-classic-discovery' && packageData.tourDetails && (
                    <div className="mb-8 space-y-6">
                      <div className="prose max-w-none">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line font-light">
                          {packageData.tourDetails}
                        </div>
                      </div>

                      {/* What Are Premium Packages */}
                      <Card className="bg-gradient-to-br from-amber-50/50 to-white border-2 border-amber-200/50 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-b border-amber-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
                              <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            What Are Premium Dubai Tour Packages?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-700 leading-relaxed font-poppins font-light">
                            Premium Dubai Tour Packages are private, vehicle-based travel experiences created for guests who value discretion, space, and personalized service. Unlike regular group tours, these packages are priced per vehicle (up to 6 guests), but still other vehicles are available for a few numbers in a group and include only private tours and transfers.
                          </p>
                          <p className="text-gray-700 leading-relaxed font-poppins font-light">
                            Each itinerary is designed with flexibility in mind. While we provide a professionally planned route covering Dubai's iconic landmarks, cultural attractions, and luxury experiences, every day can be customized to match your pace, interests, and priorities.
                          </p>
                          <div className="bg-white/80 rounded-xl p-5 border-2 border-amber-200/50 shadow-sm">
                            <h4 className="font-semibold text-gray-900 mb-4 font-cormorant text-lg">To offer maximum choice, our premium packages are available in three accommodation options:</h4>
                            <ul className="space-y-3 text-gray-700">
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className="font-poppins font-light"><strong className="font-semibold">Without hotel accommodation</strong> – ideal for residents or travelers with pre-booked hotels</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className="font-poppins font-light"><strong className="font-semibold">With 4-star hotel accommodation</strong> – comfort-focused, centrally located properties</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-3 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className="font-poppins font-light"><strong className="font-semibold">With 5-star hotel accommodation</strong> – refined luxury and premium hospitality</span>
                              </li>
                            </ul>
                            <p className="mt-4 text-gray-700 font-poppins font-light">
                              Attraction tickets are intentionally not bundled by default, allowing us to arrange them later at discounted rates based on the final number of travelers and preferences.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Who Should Choose */}
                      <Card className="bg-gradient-to-br from-blue-50/50 to-white border-2 border-blue-200/50 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-b border-blue-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                              <Users className="h-5 w-5 text-white" />
                            </div>
                            Who Should Choose Premium Packages?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            Our Premium Dubai Tour Packages are best suited for travelers who want a calm, controlled, and personalized travel experience.
                          </p>
                          <div className="bg-white/80 rounded-lg p-4 border border-blue-200/50">
                            <h4 className="font-semibold text-gray-900 mb-3">These tours are ideal for:</h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Families with children</strong>, seeking private vehicles and flexible schedules</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Honeymooners and couples</strong>, looking for privacy and special moments</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Small groups and friends</strong>, traveling together without mixing with strangers</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Business travelers</strong>, extending their stay with structured yet relaxed sightseeing</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Repeat visitors</strong>, wanting deeper exploration beyond standard tours</span>
                              </li>
                            </ul>
                            <p className="mt-4 text-gray-700 italic">
                              If you prefer traveling without rushing, standing in queues, or sharing space with large groups, the premium category is designed specifically for you.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Durations Available */}
                      <Card className="bg-gradient-to-br from-green-50/50 to-white border-2 border-green-200/50 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-b border-green-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                              <Calendar className="h-5 w-5 text-white" />
                            </div>
                            Premium Package Durations Available
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            Our Premium Dubai Tour Packages are available in the following carefully structured durations:
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            {[
                              { duration: '3 Nights / 4 Days', desc: 'A refined short escape covering Dubai\'s essentials with luxury experiences' },
                              { duration: '4 Nights / 5 Days', desc: 'A balanced itinerary with cultural, leisure, and iconic attractions' },
                              { duration: '5 Nights / 6 Days', desc: 'Dubai combined with Abu Dhabi and immersive experiences' },
                              { duration: '6 Nights / 7 Days', desc: 'A comprehensive UAE journey including Dubai, Abu Dhabi, and Sharjah' }
                            ].map((item, idx) => (
                              <div key={idx} className="bg-white/80 p-4 rounded-lg border border-green-200/50">
                                <h4 className="font-semibold text-gray-900 mb-2">{item.duration}</h4>
                                <p className="text-gray-700 text-sm">{item.desc}</p>
                              </div>
                            ))}
                          </div>
                          <p className="mt-4 text-gray-700">
                            Each duration is designed to offer enough time to enjoy without feeling rushed, with optional rest periods and free time built into the itinerary.
                          </p>
                        </CardContent>
                      </Card>

                      {/* Customization & Flexibility */}
                      <Card className="bg-gradient-to-br from-purple-50/50 to-white border-2 border-purple-200/50 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-b border-purple-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                              <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            Customization & Flexibility
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            One of the defining features of our Premium Dubai Tour Packages is complete flexibility.
                          </p>
                          <div className="bg-white/80 rounded-lg p-4 border border-purple-200/50">
                            <h4 className="font-semibold text-gray-900 mb-3">You can:</h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>Adjust daily start times</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>Replace attractions with alternatives</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>Add or remove experiences</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>Upgrade vehicles or hotel categories</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>Include special arrangements for celebrations or family needs</span>
                              </li>
                            </ul>
                            <p className="mt-4 text-gray-700">
                              Our team works closely with you before arrival to fine-tune every detail, ensuring your itinerary aligns with your expectations.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Best Time to Visit */}
                      <Card className="bg-gradient-to-br from-orange-50/50 to-white border-2 border-orange-200/50 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                              <Calendar className="h-5 w-5 text-white" />
                            </div>
                            Best Time to Visit Dubai for Premium Travel
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            Dubai is a year-round destination, and our premium tours operate throughout the year.
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white/80 p-4 rounded-lg border border-orange-200/50">
                              <h4 className="font-semibold text-gray-900 mb-2">October to April</h4>
                              <p className="text-gray-700 text-sm">Offers pleasant weather, ideal for outdoor sightseeing and evening activities.</p>
                            </div>
                            <div className="bg-white/80 p-4 rounded-lg border border-orange-200/50">
                              <h4 className="font-semibold text-gray-900 mb-2">May to September</h4>
                              <p className="text-gray-700 text-sm">Provides more competitive pricing, with tours designed around indoor attractions and evening experiences to avoid peak heat.</p>
                            </div>
                          </div>
                          <p className="text-gray-700">
                            Regardless of season, private vehicles and flexible schedules ensure comfort at all times.
                          </p>
                        </CardContent>
                      </Card>

                      {/* Why Choose Premium Dubai Tours */}
                      <Card className="bg-gradient-to-br from-amber-50/50 to-white border-2 border-amber-200/50 shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-b border-amber-200/50">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3 font-playfair">
                            <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
                              <ShieldCheck className="h-5 w-5 text-white" />
                            </div>
                            Why Choose Premium Dubai Tours for Premium Packages?
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-700 leading-relaxed">
                            We focus on service reliability rather than exaggerated promises.
                          </p>
                          <div className="bg-white/80 rounded-lg p-4 border border-amber-200/50">
                            <h4 className="font-semibold text-gray-900 mb-3">Here is what sets us apart:</h4>
                            <ul className="space-y-2 text-gray-700">
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span>Private-only experiences with no shared transport</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span>Per-vehicle pricing, offering better value for families and groups</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span>Local operational expertise with on-ground support</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span>Discounted attraction tickets, arranged after final confirmation</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span>Transparent inclusions and exclusions, with no hidden costs</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span>Professional field staff and licensed operations</span>
                              </li>
                            </ul>
                            <p className="mt-4 text-gray-700 italic">
                              Our approach is calm, clear, and service-oriented, designed for travelers who appreciate structure without pressure.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: CheckCircle, text: "Verified Experience", color: isPremium ? "text-green-600" : "text-green-500", bg: isPremium ? "bg-green-50" : "bg-gray-50" },
                      { icon: ShieldCheck, text: "Best Price Guarantee", color: isPremium ? "text-blue-600" : "text-blue-500", bg: isPremium ? "bg-blue-50" : "bg-gray-50" },
                      { icon: Users, text: "Expert Local Guides", color: isPremium ? "text-purple-600" : "text-purple-500", bg: isPremium ? "bg-purple-50" : "bg-gray-50" },
                      { icon: Heart, text: "Curated with Love", color: isPremium ? "text-red-600" : "text-red-500", bg: isPremium ? "bg-red-50" : "bg-gray-50" },
                    ].map((feature, idx) => (
                      <div key={idx} className={`flex items-center gap-3 p-5 rounded-xl ${feature.bg} border-2 border-transparent hover:border-${feature.color.split('-')[1]}-200 transition-all shadow-sm hover:shadow-md`}>
                        <div className={`p-2 rounded-lg ${isPremium ? 'bg-white' : ''}`}>
                          <feature.icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <span className={`font-semibold text-gray-800 ${isPremium ? 'font-poppins' : ''}`}>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Accomodation Cards (If any) */}
              {Array.isArray(packageData.accommodation) && packageData.accommodation.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {packageData.accommodation.map((hotel, idx) => (
                    <Card key={idx} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all group">
                      <div className="h-32 bg-gray-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <Building className="h-12 w-12 opacity-50" />
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                          {hotel.city}
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary transition-colors">{hotel.hotel}</h4>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Bed className="h-4 w-4 mr-1.5" />
                          {hotel.roomType} • {hotel.nights} Nights
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-2 rounded-lg w-fit">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Confirmed Stay
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* Itinerary Section */}
            <section id="itinerary">
              <div className="flex items-center justify-between mb-8">
                <h3 className={`text-3xl font-bold text-gray-900 ${isPremium ? 'font-playfair' : ''}`}>Daily Itinerary</h3>
                <Badge variant="outline" className={`${isPremium ? 'bg-gradient-to-r from-amber-500/10 to-amber-600/10 text-amber-700 border-amber-300/50' : 'text-primary border-primary/20 bg-primary/5'}`}>
                  {packageData.duration}
                </Badge>
              </div>

              <div className={`space-y-6 relative before:absolute before:left-[23px] before:top-6 before:bottom-6 before:w-[3px] ${isPremium ? 'before:bg-gradient-to-b before:from-amber-500/50 before:via-amber-300/30 before:to-amber-100/20' : 'before:bg-gradient-to-b before:from-primary/50 before:via-gray-200 before:to-gray-100'}`}>
                {Array.isArray(packageData.itinerary) && packageData.itinerary.map((day, index) => (
                  <div key={index} className="relative pl-16 group">
                    {/* Timeline Dot */}
                    <div className={`absolute left-0 top-0 w-12 h-12 rounded-full bg-white border-3 flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform ${isPremium ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-white' : 'border-primary'}`}>
                      <span className={`font-bold text-sm ${isPremium ? 'text-amber-600' : 'text-primary'}`}>{day.day}</span>
                    </div>

                    <Card className={`border-l-4 transition-all duration-300 shadow-md hover:shadow-xl ${isPremium ? 'border-l-amber-500/0 hover:border-l-amber-500 bg-gradient-to-br from-white to-amber-50/20' : 'border-l-primary/0 hover:border-l-primary'}`}>
                      <CardHeader className={`py-5 ${isPremium ? 'bg-gradient-to-r from-amber-500/5 to-transparent' : ''}`}>
                        <CardTitle className={`text-lg flex items-center gap-3 ${isPremium ? 'font-cormorant' : ''}`}>
                          <span className={`font-bold ${isPremium ? 'text-amber-600' : 'text-primary'}`}>Day {day.day}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${isPremium ? 'bg-amber-400' : 'bg-gray-300'}`}></span>
                          <span className={isPremium ? 'font-playfair' : ''}>{day.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-5 pt-0">
                        <div className={`text-gray-700 leading-relaxed pl-1 ${isPremium ? 'font-poppins font-light' : ''}`}>
                          {day.description.split('\n').map((line, i) => (
                            <p key={i} className="mb-2 last:mb-0">{line}</p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section id="inclusions" className="grid md:grid-cols-2 gap-6">
              <Card className={`${isPremium ? 'border-2 border-green-200/50 bg-gradient-to-br from-green-50/50 to-white shadow-lg' : 'border-green-100 bg-green-50/30'}`}>
                <CardHeader className={isPremium ? 'bg-gradient-to-r from-green-500/10 to-green-600/10 border-b border-green-200/50' : ''}>
                  <CardTitle className={`text-xl flex items-center text-green-700 ${isPremium ? 'font-playfair' : ''}`}>
                    <div className={`p-2 rounded-xl mr-3 ${isPremium ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-green-100'}`}>
                      <CheckCircle className={`h-5 w-5 ${isPremium ? 'text-white' : ''}`} />
                    </div>
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {packageData.inclusions?.map((item, idx) => {
                    // Check if item is structured (object with category and items) or simple string
                    if (typeof item === 'object' && 'category' in item) {
                      return (
                        <div key={idx} className={`mb-4 ${isPremium ? 'hover:bg-green-50/50 transition-colors p-3 rounded-lg' : 'p-2'}`}>
                          <div className="flex items-start gap-3 mb-2">
                            <CheckCircle className={`h-5 w-5 shrink-0 mt-0.5 ${isPremium ? 'text-green-600' : 'text-green-600'}`} />
                            <span className={`font-semibold text-gray-900 ${isPremium ? 'font-poppins' : ''}`}>{item.category}</span>
                          </div>
                          <ul className="ml-8 space-y-1.5">
                            {item.items.map((subItem, subIdx) => (
                              <li key={subIdx} className={`text-gray-700 ${isPremium ? 'font-poppins font-light' : ''} flex items-start`}>
                                <span className="mr-2 text-green-600">•</span>
                                <span>{subItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    } else {
                      return (
                    <div key={idx} className={`flex items-start gap-3 p-2 rounded-lg ${isPremium ? 'hover:bg-green-50/50 transition-colors' : ''}`}>
                      <CheckCircle className={`h-5 w-5 shrink-0 mt-0.5 ${isPremium ? 'text-green-600' : 'text-green-600'}`} />
                      <span className={`text-gray-700 ${isPremium ? 'font-poppins font-light' : ''}`}>{item}</span>
                    </div>
                      );
                    }
                  })}
                </CardContent>
              </Card>

              <Card className={`${isPremium ? 'border-2 border-red-200/50 bg-gradient-to-br from-red-50/50 to-white shadow-lg' : 'border-red-100 bg-red-50/30'}`}>
                <CardHeader className={isPremium ? 'bg-gradient-to-r from-red-500/10 to-red-600/10 border-b border-red-200/50' : ''}>
                  <CardTitle className={`text-xl flex items-center text-red-700 ${isPremium ? 'font-playfair' : ''}`}>
                    <div className={`p-2 rounded-xl mr-3 ${isPremium ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-red-100'}`}>
                      <X className={`h-5 w-5 ${isPremium ? 'text-white' : ''}`} />
                    </div>
                    What's Excluded
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {packageData.exclusions?.map((item, idx) => {
                    // Check if item is structured (object with category and items) or simple string
                    if (typeof item === 'object' && 'category' in item) {
                      return (
                        <div key={idx} className={`mb-4 ${isPremium ? 'hover:bg-red-50/50 transition-colors p-3 rounded-lg' : 'p-2'}`}>
                          <div className="flex items-start gap-3 mb-2">
                            <X className={`h-5 w-5 shrink-0 mt-0.5 ${isPremium ? 'text-red-600' : 'text-red-500'}`} />
                            <span className={`font-semibold text-gray-900 ${isPremium ? 'font-poppins' : ''}`}>{item.category}</span>
                          </div>
                          <ul className="ml-8 space-y-1.5">
                            {item.items.map((subItem, subIdx) => (
                              <li key={subIdx} className={`text-gray-700 ${isPremium ? 'font-poppins font-light' : ''} flex items-start`}>
                                <span className="mr-2 text-red-600">•</span>
                                <span>{subItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    } else {
                      return (
                    <div key={idx} className={`flex items-start gap-3 p-2 rounded-lg ${isPremium ? 'hover:bg-red-50/50 transition-colors' : ''}`}>
                      <X className={`h-5 w-5 shrink-0 mt-0.5 ${isPremium ? 'text-red-600' : 'text-red-500'}`} />
                      <span className={`text-gray-700 ${isPremium ? 'font-poppins font-light' : ''}`}>{item}</span>
                    </div>
                      );
                    }
                  })}
                </CardContent>
              </Card>
            </section>

            {/* Reviews Section */}
            <section id="reviews">
              <div className="flex items-center justify-between mb-8">
                <h3 className={`text-3xl font-bold text-gray-900 ${isPremium ? 'font-playfair' : ''}`}>Customer Reviews</h3>
                <Badge variant="outline" className={`${isPremium ? 'bg-gradient-to-r from-amber-500/10 to-amber-600/10 text-amber-700 border-amber-300/50' : 'text-primary border-primary/20 bg-primary/5'}`}>
                  {(packageData.reviews?.length || 0)} review{(packageData.reviews?.length || 0) !== 1 ? 's' : ''}
                </Badge>
              </div>

              {packageData.reviews && packageData.reviews.length > 0 ? (
                <div className="grid gap-4">
                  {packageData.reviews.map((review, idx) => (
                    <Card key={idx} className={`${isPremium ? 'border-2 border-amber-200/50 bg-gradient-to-br from-white to-amber-50/20' : 'border-gray-200'} shadow-md`}>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <p className={`font-semibold text-gray-900 ${isPremium ? 'font-cormorant text-lg' : ''}`}>{review.name}</p>
                            <p className="text-xs text-gray-500">
                              {review.date ? new Date(review.date).toLocaleDateString() : 'Recent review'}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className={`text-gray-700 leading-relaxed ${isPremium ? 'font-poppins font-light' : ''}`}>
                          {review.comment}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className={`${isPremium ? 'border-2 border-amber-200/50 bg-gradient-to-br from-white to-amber-50/20' : 'border-gray-200'} shadow-md`}>
                  <CardContent className="p-8 text-center">
                    <Star className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No customer reviews yet.</p>
                  </CardContent>
                </Card>
              )}
            </section>
              </>
            )}
          </div>

          {/* Sticky Sidebar */}
          {isAttractionPackage ? (
            <div className="lg:col-span-1">
              <div className="sticky top-[100px] space-y-6">
                {/* Simplified Booking Card for Attraction Packages */}
                <Card className="border-none shadow-2xl overflow-hidden ring-1 ring-black/5 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200">
                  <div className="p-6 text-white text-center bg-gradient-to-r from-purple-600 to-indigo-600">
                    <Ticket className="h-8 w-8 mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-2">Book Your Tickets</h3>
                    <p className="text-sm opacity-90">Starting from AED 200</p>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Select Ticket Type:</p>
                        <div className="space-y-2">
                          <div className="p-3 bg-white rounded-lg border border-purple-200">
                            <p className="font-semibold text-gray-900">At the Top</p>
                            <p className="text-sm text-gray-600">Levels 124 & 125</p>
                            <p className="text-lg font-bold text-purple-600 mt-1">From AED 200</p>
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-indigo-200">
                            <p className="font-semibold text-gray-900">At the Top SKY</p>
                            <p className="text-sm text-gray-600">Levels 124, 125 & 148</p>
                            <p className="text-lg font-bold text-indigo-600 mt-1">From AED 410</p>
                          </div>
                        </div>
                      </div>
                      <Link href="/contact" className="block">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                          Contact Us to Book
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
          <div className="lg:col-span-1">
            <div className="sticky top-[100px] space-y-4">

              {pricingTiers.length > 0 ? (
                pricingTiers.map((tier, idx) => {
                  const isExpanded = expandedPricingTier === tier.name;
                  return (
                    <Card
                      key={`${tier.name}-${idx}`}
                      className={cn(
                        'border-none shadow-xl overflow-hidden ring-1 ring-black/5 max-w-sm mx-auto lg:max-w-none transition-all',
                        isExpanded
                          ? isPremium
                            ? 'ring-amber-400/50 border-2 border-amber-200'
                            : 'ring-primary/30 border-2 border-primary/20'
                          : 'border border-gray-100'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedPricingTier(isExpanded ? '' : tier.name)}
                        className={cn(
                          'w-full p-4 text-left transition-colors',
                          isExpanded
                            ? isPremium
                              ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white'
                              : 'bg-primary text-white'
                            : 'bg-white hover:bg-gray-50 text-gray-900'
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-bold text-base">{tier.name} Package</p>
                            <p className={cn('text-xl font-bold mt-1', isExpanded ? 'text-white' : isPremium ? 'text-amber-600' : 'text-primary')}>
                              {formatPrice(tier.price)}
                              <span className={cn('text-xs font-normal ml-1', isExpanded ? 'text-white/80' : 'text-gray-500')}>
                                / person
                              </span>
                            </p>
                            {tier.description && (
                              <p className={cn('text-xs mt-2 leading-relaxed', isExpanded ? 'text-white/85' : 'text-gray-600')}>
                                {tier.description}
                              </p>
                            )}
                          </div>
                          <ChevronDown
                            className={cn(
                              'h-5 w-5 shrink-0 transition-transform duration-200',
                              isExpanded ? 'rotate-180 text-white' : 'text-gray-400'
                            )}
                          />
                        </div>
                      </button>

                      {isExpanded && (
                        <CardContent className="p-4 pt-3 bg-white">
                          {renderTierBookingForm(tier.name)}
                        </CardContent>
                      )}
                    </Card>
                  );
                })
              ) : (
                <Card className={`border-none shadow-xl overflow-hidden ring-1 ring-black/5 max-w-sm mx-auto lg:max-w-none ${isPremium ? 'bg-gradient-to-br from-white to-amber-50/30 border-2 border-amber-200/50' : 'bg-white'}`}>
                  <div className={`p-4 text-white text-center ${isPremium ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500' : 'bg-primary'}`}>
                    <p className="text-white/90 text-xs italic font-medium mb-1">Starting from</p>
                    <div className="flex items-baseline justify-center gap-1.5">
                      {isPremium && packageData.price === 0 ? (
                        <>
                          <h2 className={`text-2xl font-bold ${isPremium ? 'font-playfair' : ''}`}>Custom Pricing</h2>
                          <span className="text-sm opacity-90">/ vehicle</span>
                        </>
                      ) : (
                        <>
                          <h2 className={`text-2xl font-bold ${isPremium ? 'font-playfair' : ''}`}>{formatPrice(packageData.price)}</h2>
                          <span className="text-sm opacity-90">/ person</span>
                        </>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    {renderTierBookingForm()}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          )}

        </div>
      </div>

      {/* Booking Modal */}
      {packageData && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          initialSelectedTier={expandedPricingTier}
          packageData={{
            _id: packageData._id,
            title: packageData.title,
            price: packageData.price,
            pricingOptions: pricingTiers.length > 0 ? pricingTiers : (packageData as any).pricingOptions,
          }}
        />
      )}
    </div>
  );
};

export default PackageDetailPage;
