import connectDB from '../../../lib/mongodb';
import Package from '../../../models/Package';
import { isConnected } from '../../../lib/mongodb';

// Regular packages data
const getRegularPackages = () => [
  {
    _id: 'dubai-grand-explorer',
    title: 'Dubai Grand Explorer',
    subtitle: '7 Nights / 8 Days Dubai Tour Package',
    about: 'The Dubai Grand Explorer – 7 Nights / 8 Days tour is designed for travelers who want to experience Dubai at an unhurried pace while covering the city\'s most iconic attractions along with regional highlights. This itinerary balances guided sightseeing with free time, allowing you to explore Dubai comfortably without feeling rushed.',
    services: '7 nights hotel accommodation with daily breakfast, Half-day Dubai city tour (Old & New Dubai), Desert safari with BBQ dinner and camp activities, Dhow cruise dinner at Dubai Marina, Burj Khalifa & Dubai Mall visit, Abu Dhabi city tour with one theme park option, Dubai Frame, Miracle Garden & Museum of the Future, Global Village evening tour, Shopping and leisure day, Private airport transfers',
    tourDetails: 'Abstract\n\nThe Dubai Grand Explorer – 7 Nights / 8 Days tour is designed for travelers who want to experience Dubai at an unhurried pace while covering the city\'s most iconic attractions along with regional highlights. This itinerary balances guided sightseeing with free time, allowing you to explore Dubai comfortably without feeling rushed.\n\nFrom modern landmarks and cultural districts to desert landscapes, waterfront dining, and leisure days, this tour delivers a complete Dubai experience. It is ideal for families, senior travelers, and long-stay guests who value organization, comfort, and clear planning.\n\nWith carefully scheduled activities, shared city tours, private airport transfers, and multiple accommodation options, this Regular Dubai Tour Package offers excellent value while maintaining service reliability and professional coordination throughout your stay.',
    abstract: 'The Dubai Grand Explorer – 7 Nights / 8 Days tour is designed for travelers who want to experience Dubai at an unhurried pace while covering the city\'s most iconic attractions along with regional highlights. This itinerary balances guided sightseeing with free time, allowing you to explore Dubai comfortably without feeling rushed.',
    tourOverview: 'Dubai is a city best enjoyed with time, time to explore, time to relax, and time to absorb the contrast between tradition and modern ambition. The Dubai Grand Explorer package gives you exactly that.\n\nOver eight days, you will explore Dubai\'s historical neighborhoods, iconic skyscrapers, shopping districts, and entertainment zones, while also venturing beyond the city with a guided Abu Dhabi tour. The itinerary includes Dubai\'s essential experiences, such as a desert safari with BBQ dinner, a dhow cruise dinner at Dubai Marina, Burj Khalifa visit, Miracle Garden, Dubai Frame, Museum of the Future, Global Village, and cultural sightseeing.',
    keyHighlights: [
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
      winter: 'November to March: Pleasant weather, peak season',
      summer: 'April to October: Hotter months, but tours are mostly indoor or evening-based and offered at more economical prices'
    },
    whyChooseThisTrip: [
      'Clear itineraries with no rushed schedules',
      'Professional coordination and transparent inclusions',
      'Comfortable vehicles and experienced guides',
      'Multiple hotel category options under one package',
      'Suitable for families, seniors, and long-stay travelers',
      'Reliable support before and during the tour'
    ],
    whyPremiumDubaiTours: [
      'Clear itineraries with no rushed schedules',
      'Professional coordination and transparent inclusions',
      'Comfortable vehicles and experienced guides',
      'Multiple hotel category options under one package',
      'Suitable for families, seniors, and long-stay travelers',
      'Reliable support before and during the tour'
    ],
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
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'regular',
    images: [
      { public_id: 'dubai-grand-explorer-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'dubai-grand-explorer-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'dubai-grand-explorer-3', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Abu Dhabi' },
      { public_id: 'dubai-grand-explorer-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
      { public_id: 'dubai-grand-explorer-5', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
    ],
    inclusions: [
      { category: 'Airport Transfers', items: ['Private airport arrival & departure transfers'] },
      { category: 'Hotel Accommodation', items: ['7 nights hotel accommodation (twin sharing)'] },
      { category: 'Meals', items: ['Daily breakfast at hotel', 'Dinners during desert safari and dhow cruise'] },
      { category: 'Sightseeing & Tours', items: ['Half-day Dubai city tour (SIC basis)', 'Abu Dhabi city tour (SIC basis)'] },
      { category: 'Experiences', items: ['Desert safari in 4x4 vehicle with BBQ dinner (sharing)', 'Dhow cruise dinner at Marina (sharing)'] },
      { category: 'Guide & Assistance', items: ['English-speaking guide during tours'] },
      { category: 'Taxes', items: ['All government taxes and service charges'] }
    ],
    exclusions: [
      { category: 'International Airfare', items: ['International airfare'] },
      { category: 'UAE Entry Visa', items: ['UAE entry visa (arranged on request)'] },
      { category: 'Personal Expenses', items: ['Personal expenses (shopping, drinks, laundry, insurance, tourism dirhams)'] },
      { category: 'Entry Tickets', items: ['Entry tickets to parks and attractions (arranged at actual cost)'] },
      { category: 'Tips', items: ['Tips and gratuities'] }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.8
  },
  {
    _id: 'dubai-transit-escape',
    title: 'Dubai Transit Escape',
    subtitle: '1 Night / 2 Days Stopover Tour',
    ideaFor: 'Airline stopovers, overnight transit stays, short business visits',
    about: 'The Dubai Transit Escape – 1 Night 2 Days is a thoughtfully curated stopover tour designed for travelers passing through Dubai with limited time. Whether you are on an overnight airline layover or a short business visit, this package allows you to experience the essence of Dubai without rushed schedules or complex planning.',
    services: 'Ideal for airline stopovers and overnight transit stays, Private airport transfers for stress-free arrival and departure, Choice of Desert Safari or Marina Dhow Cruise, Guided Dubai city sightseeing tour, Flexible scheduling aligned with flight timings',
    tourDetails: 'Abstract\n\nThe Dubai Transit Escape – 1 Night 2 Days is a thoughtfully curated stopover tour designed for travelers passing through Dubai with limited time. Whether you are on an overnight airline layover or a short business visit, this package allows you to experience the essence of Dubai without rushed schedules or complex planning.\n\nThis transit-focused itinerary prioritizes timing efficiency, comfort, and seamless coordination, ensuring you enjoy Dubai\'s iconic experiences while maintaining flexibility around flight schedules. With private airport transfers, comfortable hotel accommodation, and a choice of evening experiences, even a short stay becomes a meaningful travel experience.',
    abstract: 'The Dubai Transit Escape – 1 Night 2 Days is a thoughtfully curated stopover tour designed for travelers passing through Dubai with limited time. Whether you are on an overnight airline layover or a short business visit, this package allows you to experience the essence of Dubai without rushed schedules or complex planning.',
    tourOverview: 'Dubai is one of the world\'s most important aviation hubs, welcoming millions of transit passengers each year. Many travelers pass through the city without realizing that even a single night is enough to experience its contrast, modern skylines, cultural heritage, and desert landscapes. The Dubai Transit Escape is designed precisely for this purpose.',
    keyHighlights: [
      'Ideal for airline stopovers and overnight transit stays',
      'Private airport transfers for stress-free arrival and departure',
      'Choice of Desert Safari or Marina Dhow Cruise',
      'Guided Dubai city sightseeing tour',
      'Flexible scheduling aligned with flight timings'
    ],
    hotelOptions: [
      'Deluxe Package (3★ Hotels)',
      'Gold Package (4★ Hotels)',
      'Platinum Package (5★ Hotels)'
    ],
    bestTimeToVisit: {
      yearRound: 'This transit tour operates throughout the year.',
      winter: 'October to April: Pleasant weather, higher demand',
      summer: 'May to September: Lower prices, indoor and evening-focused experiences. Dubai\'s infrastructure ensures comfort even during warmer months.'
    },
    whyChooseThisTrip: [
      'Expertise in short-stay and stopover logistics',
      'Flight-time-sensitive planning',
      'Clear inclusions with no hidden surprises',
      'Professional coordination from airport to departure'
    ],
    whyPremiumDubaiTours: [
      'Expertise in short-stay and stopover logistics',
      'Flight-time-sensitive planning',
      'Clear inclusions with no hidden surprises',
      'Professional coordination from airport to departure'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai & Evening Experience',
        description: 'Arrival at Dubai International Airport followed by meet & greet and private hotel transfer. Check-in at selected hotel. Evening activity - choose one: Desert Safari with BBQ Dinner OR Dhow Cruise Dinner at Dubai Marina. Overnight stay in Dubai.'
      },
      {
        day: 2,
        title: 'Dubai City Tour & Departure',
        description: 'Breakfast at the hotel. Half-day guided Dubai city tour (sharing basis) covering Old and New Dubai. Return to hotel or airport transfer. Departure as per flight schedule.'
      }
    ],
    price: 0,
    duration: '1 Night / 2 Days',
    location: 'Dubai, UAE',
    capacity: '2-6 Guests',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'regular',
    images: [
      { public_id: 'dubai-transit-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'dubai-transit-2', url: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Airport' },
      { public_id: 'dubai-transit-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
      { public_id: 'dubai-transit-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
    ],
    inclusions: [
      { category: 'Airport Transfers', items: ['Arrival and departure airport transfers in a private, air-conditioned vehicle'] },
      { category: 'Hotel Accommodation', items: ['Twin-sharing accommodation based on selected category (Deluxe 3★, Gold 4★, Platinum 5★)'] },
      { category: 'Meals', items: ['Daily breakfast at hotel', 'BBQ Dinner during Desert Safari OR Dinner during Dhow Cruise'] },
      { category: 'Sightseeing & Tours', items: ['Half-day Dubai City Tour (Old & New Dubai) on a sharing (SIC) basis'] },
      { category: 'Experiences', items: ['4x4 Desert Safari with dune bashing, camel ride, sandboarding & camp activities OR Dhow Cruise Dinner on a sharing basis'] },
      { category: 'Guide & Assistance', items: ['English-speaking guide during city tours', 'Local assistance and coordination throughout the trip'] },
      { category: 'Taxes', items: ['Government taxes and official service charges'] }
    ],
    exclusions: [
      { category: 'International Airfare', items: ['Flights to and from Dubai (can be arranged upon request)'] },
      { category: 'UAE Entry Visa', items: ['Dubai visa fees (assistance available if required)'] },
      { category: 'Entry Tickets', items: ['Theme parks, attractions, and monument tickets (Arranged at actual cost based on traveler preference)'] },
      { category: 'Personal Expenses', items: ['Lunches, beverages, shopping', 'Tourism Dirham fees', 'Laundry, phone calls, minibar usage'] },
      { category: 'Insurance', items: ['Travel and medical insurance'] },
      { category: 'Early Check-in / Late Check-out', items: ['Subject to hotel policy and availability'] }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.5
  },
  {
    _id: 'dubai-stopover-signature',
    title: 'Dubai Stopover Signature',
    subtitle: '2 Nights / 3 Days Stopover Tour',
    ideaFor: 'Airline stopovers, short holidays, business travelers',
    about: 'The Dubai Stopover Signature – 2 Nights 3 Days is designed for travelers who want to experience Dubai beyond a single night, without committing to a long holiday. Perfect for airline stopovers and short leisure breaks, this itinerary balances guided sightseeing with signature experiences such as desert safaris and marina cruises.',
    services: 'Designed for 2–3 day airline stopovers, Balanced mix of sightseeing and leisure, Marina Dhow Cruise & Desert Safari included, Flexible departure day schedule, Multiple hotel category options',
    tourDetails: 'Abstract\nThe Dubai Stopover Signature – 2 Nights 3 Days is designed for travelers who want to experience Dubai beyond a single night, without committing to a long holiday. Perfect for airline stopovers and short leisure breaks, this itinerary balances guided sightseeing with signature experiences such as desert safaris and marina cruises.\nWith structured planning, flexible pacing, and professional coordination, this stopover package allows you to enjoy Dubai\'s highlights while maintaining comfort and clarity throughout your stay.',
    abstract: 'The Dubai Stopover Signature – 2 Nights 3 Days is designed for travelers who want to experience Dubai beyond a single night, without committing to a long holiday. Perfect for airline stopovers and short leisure breaks, this itinerary balances guided sightseeing with signature experiences such as desert safaris and marina cruises.',
    tourOverview: 'Dubai rewards travelers who take even a little extra time to explore. With two nights at your disposal, the city unfolds at a more relaxed pace, allowing you to experience both its cultural depth and modern appeal. The Dubai Stopover Signature is crafted for travelers who want a complete experience within a short timeframe.',
    keyHighlights: [
      'Designed for 2–3 day airline stopovers',
      'Balanced mix of sightseeing and leisure',
      'Marina Dhow Cruise & Desert Safari included',
      'Flexible departure day schedule',
      'Multiple hotel category options'
    ],
    hotelOptions: [
      'Deluxe: 3★ Hotel',
      'Gold: 4★ Hotel',
      'Platinum: 5★ Hotel'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round.',
      summer: 'Summer months offer better pricing, with most activities scheduled indoors or in the evening.'
    },
    whyChooseThisTrip: [
      'Specialized stopover planning expertise',
      'Reliable timing coordination',
      'Transparent inclusions',
      'Comfortable vehicles & professional guides'
    ],
    whyPremiumDubaiTours: [
      'Specialized stopover planning expertise',
      'Reliable timing coordination',
      'Transparent inclusions',
      'Comfortable vehicles & professional guides'
    ],
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
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'regular',
    images: [
      { public_id: 'dubai-stopover-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'dubai-stopover-2', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
      { public_id: 'dubai-stopover-3', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' },
      { public_id: 'dubai-stopover-4', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' }
    ],
    inclusions: [
      { category: 'Airport Transfers', items: ['Arrival and departure airport transfers in a private, air-conditioned vehicle'] },
      { category: 'Hotel Accommodation', items: ['Twin-sharing accommodation based on selected category:', 'Deluxe Package: 3-star hotel', 'Gold Package: 4-star hotel', 'Platinum Package: 5-star hotel'] },
      { category: 'Meals', items: ['Daily breakfast at the hotel', 'BBQ Dinner during Desert Safari', 'Buffet Dinner during Dhow Cruise'] },
      { category: 'Sightseeing & Tours', items: ['Half-day Dubai City Tour (Old & New Dubai) on a sharing (SIC) basis'] },
      { category: 'Experiences', items: ['4x4 Desert Safari with dune bashing, camel ride, sandboarding & camp activities', 'Dhow Cruise Dinner on a sharing basis'] },
      { category: 'Guide & Assistance', items: ['English-speaking guide during city tours', 'Local assistance and coordination throughout the trip'] },
      { category: 'Taxes', items: ['Government taxes and official service charges'] }
    ],
    exclusions: [
      { category: 'International Airfare', items: ['Flights to and from Dubai (can be arranged upon request)'] },
      { category: 'UAE Entry Visa', items: ['Dubai visa fees (assistance available if required)'] },
      { category: 'Entry Tickets', items: ['Theme parks, attractions, and monument tickets (Arranged at actual cost based on traveler preference)'] },
      { category: 'Personal Expenses', items: ['Lunches, beverages, shopping', 'Tourism Dirham fees', 'Laundry, phone calls, minibar usage'] },
      { category: 'Insurance', items: ['Travel and medical insurance'] },
      { category: 'Early Check-in / Late Check-out', items: ['Subject to hotel policy and availability'] }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.6
  },
  {
    _id: 'dubai-essential-experience',
    title: 'Dubai Essential Experience',
    subtitle: '3 Nights / 4 Days Dubai Tour',
    about: 'The Dubai Essential Experience – 3 Nights 4 Days is a thoughtfully designed short holiday that introduces travelers to Dubai\'s iconic landmarks, cultural contrasts, and leisure lifestyle. This package balances guided sightseeing with relaxed pacing, making it ideal for travelers who want a meaningful Dubai experience within a limited timeframe.',
    services: 'Half-day guided Dubai city tour, Desert Safari with BBQ dinner and cultural activities, Burj Khalifa and Dubai Mall visit, Dubai Marina Dhow Cruise Dinner, Flexible hotel options (3★, 4★, 5★)',
    tourDetails: 'Dubai is a destination that rewards thoughtful planning. In just a few days, visitors can witness historic neighborhoods, futuristic skylines, golden deserts, and vibrant waterfronts. The Dubai Essential Experience is curated for travelers who want to see the highlights without feeling rushed or overwhelmed.',
    abstract: 'The Dubai Essential Experience – 3 Nights 4 Days is a thoughtfully designed short holiday that introduces travelers to Dubai\'s iconic landmarks, cultural contrasts, and leisure lifestyle. This package balances guided sightseeing with relaxed pacing, making it ideal for travelers who want a meaningful Dubai experience within a limited timeframe.',
    tourOverview: 'Dubai is a destination that rewards thoughtful planning. In just a few days, visitors can witness historic neighborhoods, futuristic skylines, golden deserts, and vibrant waterfronts. The Dubai Essential Experience is curated for travelers who want to see the highlights without feeling rushed or overwhelmed.',
    keyHighlights: [
      'Half-day guided Dubai city tour',
      'Desert Safari with BBQ dinner and cultural activities',
      'Burj Khalifa and Dubai Mall visit',
      'Dubai Marina Dhow Cruise Dinner',
      'Flexible hotel options (3★, 4★, 5★)'
    ],
    hotelOptions: [
      'Deluxe Package: 3-star hotel',
      'Gold Package: 4-star hotel',
      'Platinum Package: 5-star hotel'
    ],
    bestTimeToVisit: {
      yearRound: 'Dubai can be visited throughout the year.',
      summer: 'Summer months offer lower package costs, with activities planned indoors or during evenings.'
    },
    whyChooseThisTrip: [
      'Clear itineraries with realistic pacing',
      'Transparent inclusions and exclusions',
      'Reliable ground handling and local expertise',
      'Flexible hotel category options'
    ],
    whyPremiumDubaiTours: [
      'Clear itineraries with realistic pacing',
      'Transparent inclusions and exclusions',
      'Reliable ground handling and local expertise',
      'Flexible hotel category options'
    ],
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
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'regular',
    images: [
      { public_id: 'dubai-essential-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'dubai-essential-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'dubai-essential-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
      { public_id: 'dubai-essential-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
    ],
    inclusions: [
      { category: 'Airport Transfers', items: ['Arrival and departure airport transfers in a private, air-conditioned vehicle'] },
      { category: 'Hotel Accommodation', items: ['Twin-sharing accommodation based on selected category:', 'Deluxe Package: 3-star hotel', 'Gold Package: 4-star hotel', 'Platinum Package: 5-star hotel'] },
      { category: 'Meals', items: ['Daily breakfast at the hotel', 'BBQ Dinner during Desert Safari', 'Buffet Dinner during Dhow Cruise'] },
      { category: 'Sightseeing & Tours', items: ['Half-day Dubai City Tour (Old & New Dubai) on a sharing (SIC) basis'] },
      { category: 'Experiences', items: ['4x4 Desert Safari with dune bashing, camel ride, sandboarding & camp activities', 'Dhow Cruise Dinner on a sharing basis'] },
      { category: 'Guide & Assistance', items: ['English-speaking guide during city tours', 'Local assistance and coordination throughout the trip'] },
      { category: 'Taxes', items: ['Government taxes and official service charges'] }
    ],
    exclusions: [
      { category: 'International Airfare', items: ['Flights to and from Dubai (can be arranged upon request)'] },
      { category: 'UAE Entry Visa', items: ['Dubai visa fees (assistance available if required)'] },
      { category: 'Entry Tickets', items: ['Theme parks, attractions, and monument tickets (Arranged at actual cost based on traveler preference)'] },
      { category: 'Personal Expenses', items: ['Lunches, beverages, shopping', 'Tourism Dirham fees', 'Laundry, phone calls, minibar usage'] },
      { category: 'Insurance', items: ['Travel and medical insurance'] },
      { category: 'Early Check-in / Late Check-out', items: ['Subject to hotel policy and availability'] }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.7
  },
  {
    _id: 'dubai-grand-experience',
    title: 'Dubai Grand Experience',
    subtitle: '6 Nights / 7 Days Dubai Tour',
    about: 'The Dubai Grand Experience – 6 Nights / 7 Days tour is thoughtfully curated for travelers who want to explore Dubai in depth while maintaining a relaxed and enjoyable pace. This itinerary allows guests to experience the city\'s iconic landmarks, cultural heritage, leisure attractions, and neighboring Abu Dhabi without feeling rushed.',
    services: 'Private airport transfers on arrival and departure, Half-day Dubai city tour covering old and new Dubai, Burj Khalifa and Dubai Mall visit, Desert safari with BBQ dinner and cultural activities, Full-day Abu Dhabi city tour with one optional park, Dubai Frame, Miracle Garden, and Museum of the Future, Dolphin show and Global Village evening visit, Free day for shopping or optional activities, Choice of 3★, 4★, or 5★ hotel accommodations',
    tourDetails: 'Abstract\nThe Dubai Grand Experience – 6 Nights / 7 Days tour is thoughtfully curated for travelers who want to explore Dubai in depth while maintaining a relaxed and enjoyable pace. This itinerary allows guests to experience the city\'s iconic landmarks, cultural heritage, leisure attractions, and neighboring Abu Dhabi without feeling rushed.\nBy combining guided sightseeing with free leisure time, this package offers flexibility while ensuring that all major highlights are covered. It is especially suitable for families and travelers who value comfort, structured planning, and dependable local support throughout their journey.',
    abstract: 'The Dubai Grand Experience – 6 Nights / 7 Days tour is thoughtfully curated for travelers who want to explore Dubai in depth while maintaining a relaxed and enjoyable pace. This itinerary allows guests to experience the city\'s iconic landmarks, cultural heritage, leisure attractions, and neighboring Abu Dhabi without feeling rushed.',
    tourOverview: 'Dubai is not a city to be rushed. Its diversity, from ancient trading routes to ultra-modern architecture, requires time to fully appreciate. The Dubai Grand Experience is designed for travelers who want a more comprehensive understanding of the city and its surroundings.',
    keyHighlights: [
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
    hotelOptions: [
      'Deluxe Package: 3★ hotels, twin sharing, breakfast included',
      'Gold Package: 4★ hotels, twin sharing, breakfast included',
      'Platinum Package: 5★ hotels, twin sharing, breakfast included'
    ],
    bestTimeToVisit: {
      yearRound: 'Dubai can be visited throughout the year.',
      winter: 'While winter offers pleasant outdoor conditions',
      summer: 'Summer months provide better value with lower accommodation costs. Most sightseeing during summer is scheduled indoors or in the evening for comfort.'
    },
    whyChooseThisTrip: [
      'Well-balanced itinerary without rushed sightseeing',
      'Clear inclusions and transparent pricing',
      'Licensed local operators and experienced guides',
      'Flexible hotel options to suit different budgets',
      'Dedicated customer support before and during travel'
    ],
    whyPremiumDubaiTours: [
      'Well-balanced itinerary without rushed sightseeing',
      'Clear inclusions and transparent pricing',
      'Licensed local operators and experienced guides',
      'Flexible hotel options to suit different budgets',
      'Dedicated customer support before and during travel'
    ],
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
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'regular',
    images: [
      { public_id: 'dubai-grand-exp-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'dubai-grand-exp-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'dubai-grand-exp-3', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Abu Dhabi' },
      { public_id: 'dubai-grand-exp-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
      { public_id: 'dubai-grand-exp-5', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
    ],
    inclusions: [
      { category: 'Airport Transfers', items: ['Private airport and hotel transfers'] },
      { category: 'Hotel Accommodation', items: ['Hotel accommodation on twin sharing basis'] },
      { category: 'Meals', items: ['Daily breakfast', 'Dinners during desert safari and dhow cruise'] },
      { category: 'Sightseeing & Tours', items: ['Dubai and Abu Dhabi city tours on SIC basis'] },
      { category: 'Experiences', items: ['Desert safari in shared 4x4 vehicle with camp activities', 'Marina dhow cruise on sharing basis'] },
      { category: 'Guide & Assistance', items: ['All the tours as per the itinerary', 'English-speaking guide during tours'] },
      { category: 'Taxes', items: ['Government taxes and office expenses'] }
    ],
    exclusions: [
      { category: 'International Airfare', items: ['International airfare'] },
      { category: 'UAE Entry Visa', items: ['UAE entry visa (available on request)'] },
      { category: 'Personal Expenses', items: ['Personal expenses (shopping, drinks, laundry, tourism dirhams, insurance)'] },
      { category: 'Entry Tickets', items: ['Entry tickets to parks and attractions (arranged at actual cost)'] }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.8
  },
  {
    _id: 'dubai-signature-explorer',
    title: 'Dubai Signature Explorer',
    subtitle: '5 Nights / 6 Days Dubai Tour',
    about: 'The Dubai Signature Explorer – 5 Nights / 6 Days tour is designed for travelers who wish to experience Dubai in a more immersive and relaxed way, without rushing through major attractions. This itinerary carefully balances guided sightseeing, iconic landmarks, cultural experiences, and personal free time, allowing guests to absorb the city at a comfortable pace.',
    services: 'Private airport transfers for arrival and departure, Half-day Dubai city tour covering old and new districts, Burj Khalifa and Dubai Mall visit, Desert safari with BBQ dinner and cultural activities, Full-day Abu Dhabi city tour with one optional theme park, Free day for shopping and independent exploration, Choice of Deluxe, Gold, or Platinum hotel categories',
    tourDetails: 'Abstract\nThe Dubai Signature Explorer – 5 Nights / 6 Days tour is designed for travelers who wish to experience Dubai in a more immersive and relaxed way, without rushing through major attractions. This itinerary carefully balances guided sightseeing, iconic landmarks, cultural experiences, and personal free time, allowing guests to absorb the city at a comfortable pace.',
    abstract: 'The Dubai Signature Explorer – 5 Nights / 6 Days tour is designed for travelers who wish to experience Dubai in a more immersive and relaxed way, without rushing through major attractions. This itinerary carefully balances guided sightseeing, iconic landmarks, cultural experiences, and personal free time, allowing guests to absorb the city at a comfortable pace.',
    tourOverview: 'Dubai is a city that rewards time. While shorter trips offer glimpses of its skyline, a 5-night stay allows travelers to truly settle in, explore beyond surface-level attractions, and enjoy the rhythm of the city.',
    keyHighlights: [
      'Private airport transfers for arrival and departure',
      'Half-day Dubai city tour covering old and new districts',
      'Burj Khalifa and Dubai Mall visit',
      'Desert safari with BBQ dinner and cultural activities',
      'Full-day Abu Dhabi city tour with one optional theme park',
      'Free day for shopping and independent exploration',
      'Choice of Deluxe, Gold, or Platinum hotel categories'
    ],
    hotelOptions: [
      'Deluxe Package: 3★ hotels, twin sharing, breakfast included',
      'Gold Package: 4★ hotels, twin sharing, breakfast included',
      'Platinum Package: 5★ hotels, twin sharing, breakfast included'
    ],
    bestTimeToVisit: {
      yearRound: 'Dubai is a year-round destination.',
      winter: 'While winter months offer pleasant outdoor weather',
      summer: 'Summer months provide more economical pricing, with sightseeing planned indoors or during evening hours for comfort.'
    },
    whyChooseThisTrip: [
      'Balanced itinerary with adequate rest and flexibility',
      'Transparent pricing with clearly listed inclusions',
      'Trusted local operators and licensed guides',
      'Multiple hotel categories without compromising service quality',
      'Dedicated assistance before and during travel'
    ],
    whyPremiumDubaiTours: [
      'Balanced itinerary with adequate rest and flexibility',
      'Transparent pricing with clearly listed inclusions',
      'Trusted local operators and licensed guides',
      'Multiple hotel categories without compromising service quality',
      'Dedicated assistance before and during travel'
    ],
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
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'regular',
    images: [
      { public_id: 'dubai-signature-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'dubai-signature-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'dubai-signature-3', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Abu Dhabi' },
      { public_id: 'dubai-signature-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
      { public_id: 'dubai-signature-5', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
    ],
    inclusions: [
      { category: 'Airport Transfers', items: ['Private airport and hotel transfers'] },
      { category: 'Hotel Accommodation', items: ['Hotel accommodation on twin sharing basis'] },
      { category: 'Meals', items: ['Daily breakfast', 'Dinners during desert safari and dhow cruise'] },
      { category: 'Sightseeing & Tours', items: ['Dubai and Abu Dhabi city tours on SIC basis'] },
      { category: 'Experiences', items: ['Desert safari in shared 4x4 vehicle with camp activities', 'Marina dhow cruise on sharing basis'] },
      { category: 'Guide & Assistance', items: ['English-speaking guide during tours'] },
      { category: 'Taxes', items: ['Government taxes and office expenses'] }
    ],
    exclusions: [
      { category: 'International Airfare', items: ['International airfare'] },
      { category: 'UAE Entry Visa', items: ['UAE entry visa (can be arranged on request)'] },
      { category: 'Personal Expenses', items: ['Personal expenses (shopping, drinks, laundry, tourism dirhams, insurance)'] },
      { category: 'Entry Tickets', items: ['Entry tickets to parks and attractions (arranged at actual cost)'] }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.8
  },
  {
    _id: 'classic-discovery-dubai-abu-dhabi',
    title: 'Classic Discovery of Dubai and Abu Dhabi',
    subtitle: '4 Nights / 5 Days Dubai Tour',
    about: 'The Dubai Classic Discovery – 4 Nights / 5 Days tour is thoughtfully designed for travelers who want to experience Dubai in a balanced and unhurried way. This itinerary combines the city\'s iconic attractions, cultural experiences, and modern leisure with the added depth of an Abu Dhabi visit.',
    services: 'Private airport transfers for arrival and departure, Half-day guided Dubai city tour covering old and new districts, Desert Safari with BBQ dinner and cultural activities, Evening Marina Dhow Cruise Dinner, Abu Dhabi city tour with one optional theme park, Free day for shopping and personal exploration, Choice of 3-Star, 4-Star, or 5-Star hotels',
    tourDetails: 'Classic Discovery of Dubai and Abu Dhabi - A comprehensive tour package covering the major attractions of both Dubai and Abu Dhabi.',
    abstract: '',
    tourOverview: '',
    keyHighlights: [],
    hotelOptions: [],
    bestTimeToVisit: {
      yearRound: '',
      winter: '',
      summer: ''
    },
    whyChooseThisTrip: [],
    whyPremiumDubaiTours: [],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai & Marina Dhow Cruise Dinner',
        description: 'Upon arrival at Dubai International Airport, you will be greeted by our representative and transferred to your hotel in a private, air-conditioned vehicle. After check-in, the afternoon is kept free to allow you to rest or settle in. In the evening, you will proceed for a Marina Dhow Cruise Dinner on a sharing basis. Enjoy a relaxed cruise through Dubai Marina, surrounded by illuminated skyscrapers, while savoring an international buffet dinner. After the cruise, return to your hotel for an overnight stay.'
      },
      {
        day: 2,
        title: 'Dubai City Tour & Desert Safari with BBQ Dinner',
        description: 'After breakfast, depart for a half-day guided Dubai city tour on a shared basis. This tour introduces you to both historic and modern sides of Dubai, including traditional neighborhoods, cultural landmarks, and modern districts. Following the city tour, return to the hotel for rest. In the afternoon, you will be picked up for a desert safari experience in a shared 4x4 vehicle. Activities include dune bashing, sandboarding, and cultural performances at the desert camp. The evening concludes with a BBQ dinner before returning to the hotel.'
      },
      {
        day: 3,
        title: 'Abu Dhabi City Tour',
        description: 'After breakfast, proceed for a full-day Abu Dhabi city tour on a shared basis. This tour provides insight into the capital city of the UAE, known for its wide boulevards, cultural institutions, and modern landmarks. The itinerary includes major highlights and one optional theme park (entry tickets arranged separately). After completing the tour, return to Dubai in the evening for overnight stay.'
      },
      {
        day: 4,
        title: 'Free Day for Shopping & Leisure',
        description: 'This day is kept completely free for personal activities. Guests may explore Dubai Mall, visit Burj Khalifa (tickets can be arranged separately), shop at local markets, or simply relax at the hotel. This flexibility allows travelers to customize their experience based on interests and energy levels.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'After breakfast and hotel check-out, you will be transferred privately to Dubai International Airport for your onward journey.'
      }
    ],
    price: 0,
    duration: '4 Nights / 5 Days',
    location: 'Dubai, UAE',
    capacity: '2-6 Guests',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'regular',
    images: [
      { public_id: 'classic-discovery-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'classic-discovery-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'classic-discovery-3', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Abu Dhabi' },
      { public_id: 'classic-discovery-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' }
    ],
    inclusions: [],
    exclusions: [],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 4.8
  }
];

// Luxury packages data
const getLuxuryPackages = () => [
  {
    _id: 'luxury-dubai-indulgence-tour',
    title: 'Luxury Dubai Indulgence Tour',
    subtitle: '3 Nights / 4 Days Ultra-Luxury Private Experience',
    ideaFor: 'Honeymooners, luxury-loving families, elite travelers seeking refined experiences',
    about: 'The Luxury Dubai Indulgence Tour – 3 Nights / 4 Days is a carefully curated short-stay luxury journey designed for travelers who want to experience Dubai\'s most iconic highlights in absolute privacy, comfort, and exclusivity. This package combines private yacht dining, limousine experiences, Burj Khalifa prime-time access, Burj Al Arab indulgence, and an authentic conservation desert safari, making it ideal for honeymooners, luxury-loving families, and elite travelers seeking refined experiences in a limited timeframe.',
    services: 'Private luxury airport and hotel transfers, Exclusive private yacht dinner cruise, Burj Khalifa prime-time observation deck with fountain dinner, Chauffeur-driven limousine experience, Burj Al Arab entry with iconic golden coffee, Fully private Dubai city tour, Authentic desert safari at Dubai Desert Conservation Reserve',
    tourDetails: 'Abstract\n\nThe Luxury Dubai Indulgence Tour – 3 Nights / 4 Days is a carefully curated short-stay luxury journey designed for travelers who want to experience Dubai\'s most iconic highlights in absolute privacy, comfort, and exclusivity. This package combines private yacht dining, limousine experiences, Burj Khalifa prime-time access, Burj Al Arab indulgence, and an authentic conservation desert safari, making it ideal for honeymooners, luxury-loving families, and elite travelers seeking refined experiences in a limited timeframe.\n\nEvery element of this tour is executed privately, from airport transfers to sightseeing, ensuring a seamless, stress-free, and truly premium Dubai holiday.\n\nTour Overview\n\nDubai is a city where luxury is not an option; it is a standard. This 3-night luxury itinerary offers a balanced blend of modern architectural marvels, royal hospitality, cultural elegance, and natural desert beauty.\n\nFrom cruising the Dubai Marina aboard a private yacht to sipping golden coffee inside the world-famous Burj Al Arab, and from witnessing the Dubai Fountain from the Burj Khalifa observation deck to exploring the untouched dunes of the Dubai Desert Conservation Reserve, this tour delivers a high-impact luxury experience without rushing the journey.\n\nThis package is available with three flexible pricing options, allowing guests to personalize their stay according to their accommodation preferences.',
    abstract: 'The Luxury Dubai Indulgence Tour – 3 Nights / 4 Days is a carefully curated short-stay luxury journey designed for travelers who want to experience Dubai\'s most iconic highlights in absolute privacy, comfort, and exclusivity. This package combines private yacht dining, limousine experiences, Burj Khalifa prime-time access, Burj Al Arab indulgence, and an authentic conservation desert safari, making it ideal for honeymooners, luxury-loving families, and elite travelers seeking refined experiences in a limited timeframe.',
    tourOverview: 'Dubai is a city where luxury is not an option; it is a standard. This 3-night luxury itinerary offers a balanced blend of modern architectural marvels, royal hospitality, cultural elegance, and natural desert beauty.\n\nFrom cruising the Dubai Marina aboard a private yacht to sipping golden coffee inside the world-famous Burj Al Arab, and from witnessing the Dubai Fountain from the Burj Khalifa observation deck to exploring the untouched dunes of the Dubai Desert Conservation Reserve, this tour delivers a high-impact luxury experience without rushing the journey.\n\nThis package is available with three flexible pricing options, allowing guests to personalize their stay according to their accommodation preferences.',
    keyHighlights: [
      'Private luxury airport and hotel transfers',
      'Exclusive private yacht dinner cruise',
      'Burj Khalifa prime-time observation deck with fountain dinner',
      'Chauffeur-driven limousine experience',
      'Burj Al Arab entry with iconic golden coffee',
      'Fully private Dubai city tour',
      'Authentic desert safari at Dubai Desert Conservation Reserve',
      'Ideal short luxury getaway for premium travelers'
    ],
    hotelOptions: [
      'Luxury Tour Without Hotel Accommodation',
      'Luxury Tour with 4-Star Luxury Hotel',
      'Luxury Tour with 5-Star Luxury Hotel'
    ],
    bestTimeToVisit: {
      yearRound: 'The ideal time to enjoy this luxury package is from October to April, when the weather is pleasant for outdoor sightseeing, yacht cruises, and desert experiences.',
      winter: 'Peak Luxury Season: November to March',
      summer: 'May - September: Lower costs; itineraries focus on indoor attractions and evening experiences'
    },
    whyChooseThisTrip: [
      'Have limited time but high expectations',
      'Prefer private, non-shared experiences',
      'Seek iconic Dubai attractions with added exclusivity',
      'Want comfort, elegance, and seamless execution',
      'Maximum luxury impact within a short duration',
      'Ideal for honeymooners, VIP travelers, families with children, and first-time luxury visitors to Dubai'
    ],
    whyPremiumDubaiTours: [
      'Carefully curated luxury experiences, not mass tourism',
      'Flexible customization based on guest preferences',
      'Trusted partnerships for premium services at competitive rates',
      'Experienced on-ground team for seamless coordination',
      'Transparent inclusions with no hidden surprises',
      'Focus on creating memorable luxury moments, not just sightseeing'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai & Private Yacht Dinner Experience',
        description: 'Upon arrival at Dubai International Airport, you will be warmly received by our professional representative and escorted to your hotel in a private luxury vehicle. The transfer itself sets the tone for your journey: smooth, discreet, and elegant.\n\nAfter hotel check-in and time to relax, the evening unfolds with one of Dubai\'s most exclusive experiences: a Private Yacht Dinner Cruise at Dubai Marina. Step aboard your private yacht and sail through the illuminated skyline of Marina, JBR, and Bluewaters Island. Enjoy a freshly prepared dinner onboard while taking in panoramic views of Dubai\'s glamorous waterfront.\n\nThis refined yacht experience is perfect for couples, families, or small private groups seeking privacy and sophistication.'
      },
      {
        day: 2,
        title: 'Limousine Ride, Burj Al Arab Experience, Explore Burj Khalifa, Dubai Mall, Fountain show with dinner',
        description: 'After breakfast, proceed for a signature Dubai experience:\n\nExperience Dubai\'s elite lifestyle with a chauffeur-driven limousine ride. The journey takes you to the legendary Burj Al Arab, where you enjoy exclusive entry and indulge in the world-renowned golden coffee, a symbol of Dubai\'s luxury heritage.\n\nFollowing this, explore Dubai Mall, the world\'s largest shopping and entertainment destination.\n\nThen, proceed to visit the Burj Khalifa Observation Deck at prime time. Ascend the world\'s tallest building and enjoy breathtaking views of Dubai\'s skyline, desert, and coastline.\n\nIn the evening, enjoy a dinner from one of the best restaurants during the iconic Dubai Fountain Show, offering unmatched views of dancing fountains set against the Burj Khalifa backdrop.\n\nReturn to your hotel in style, ending a truly glamorous day.'
      },
      {
        day: 3,
        title: 'Private Dubai City Tour & Authentic Desert Safari',
        description: 'Begin your day with a Private Dubai City Tour, tailored to your interests. Highlights include:\n• Jumeirah Mosque (photo stop)\n• Palm Jumeirah & Atlantis (photo stop)\n• Burj Al Arab (external views)\n• Dubai Creek and heritage districts\n• Modern landmarks showcasing Dubai\'s transformation\n\nIn the afternoon, depart for an Authentic Dubai Desert Safari at the Dubai Desert Conservation Reserve, a protected area offering a far more refined and sustainable experience than standard desert safaris.\n\nThis luxury desert journey includes:\n• Premium 4x4 private vehicle\n• Wildlife spotting and scenic desert trails\n• Sunset photography in untouched dunes\n• Exclusive desert camp experience\n• Four-course traditional dinner served in an elegant setting\n\nThis is a tranquil, immersive desert experience that emphasizes authenticity, privacy, and comfort.'
      },
      {
        day: 4,
        title: 'Departure from Dubai',
        description: 'After breakfast, check out from your hotel and enjoy a private luxury transfer to Dubai International Airport for your onward journey, carrying unforgettable memories of Dubai\'s finest experiences.'
      }
    ],
    price: 0,
    duration: '3 Nights / 4 Days',
    location: 'Dubai, UAE',
    capacity: 'Up to 6 guests per vehicle',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Luxury',
    images: [
      { public_id: 'luxury-dubai-indulgence-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'luxury-dubai-indulgence-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'luxury-dubai-indulgence-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
      { public_id: 'luxury-dubai-indulgence-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
    ],
    inclusions: [
      {
        category: 'Private Transfers',
        items: [
          'Private airport & hotel transfers in luxury vehicle'
        ]
      },
      {
        category: 'Attractions & Experiences',
        items: [
          'Burj Khalifa prime-time observation deck ticket with dinner',
          'Private yacht cruise with dinner',
          'Chauffeur-driven limousine ride',
          'Burj Al Arab entry with golden coffee',
          'Private Dubai city tour',
          'Dubai Desert Conservation Reserve safari with 4-course dinner'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Hotel or resort accommodation with breakfast & Tourism Dirhams (if selected)'
        ]
      },
      {
        category: 'Taxes & Services',
        items: [
          'Government taxes and operational expenses'
        ]
      }
    ],
    exclusions: [
      {
        category: 'International Airfare',
        items: ['International airfare']
      },
      {
        category: 'UAE Entry Visa',
        items: ['UAE entry visa']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses (insurance, shopping, tips, extra meals)']
      }
    ],
    transportation: [
      { type: 'Private Luxury Vehicle', vehicle: 'Luxury Sedan/SUV/Limousine', description: 'Private luxury vehicle-based transfers and tours (up to 6 guests per vehicle)' }
    ],
    accommodation: [
      { city: 'Dubai', hotel: 'Choice of No Hotel / 4-Star Luxury / 5-Star Luxury', rooms: 'As per requirement', roomType: 'No Hotel / 4-Star / 5-Star Luxury', nights: '3 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'grand-luxury-dubai-signature-experience',
    title: 'Grand Luxury Dubai Signature Experience',
    subtitle: '4 Nights / 5 Days Ultra-Luxury Private Tour',
    ideaFor: 'Honeymooners, families seeking exclusivity, and discerning travelers who appreciate elegance without compromise',
    about: 'The Grand Luxury Dubai Signature Experience – 4 Nights / 5 Days is a refined, experience-rich journey crafted for travelers who wish to explore Dubai beyond the essentials, at a relaxed pace, in complete privacy, and with the city\'s most iconic luxury moments carefully woven into each day. This tour blends royal hospitality, modern architectural wonders, elite dining, private transportation, desert conservation experiences, and Abu Dhabi\'s cultural grandeur.',
    services: 'Private luxury airport and hotel transfers, Chauffeur-driven limousine experience, Burj Al Arab entry with iconic golden coffee, Burj Khalifa prime-time observation deck with fountain dinner, Fully private Dubai city tour, Private yacht dinner cruise at Dubai Marina, Authentic desert safari at Dubai Desert Conservation Reserve, Flexible accommodation options (No Hotel / 4★ / 5★ Luxury)',
    tourDetails: 'Abstract\n\nThe Grand Luxury Dubai Signature Experience – 4 Nights / 5 Days is a refined, experience-rich journey crafted for travelers who wish to explore Dubai beyond the essentials, at a relaxed pace, in complete privacy, and with the city\'s most iconic luxury moments carefully woven into each day.\n\nThis tour blends royal hospitality, modern architectural wonders, elite dining, private transportation, desert conservation experiences, and Abu Dhabi\'s cultural grandeur, making it ideal for honeymooners, families seeking exclusivity, and discerning travelers who appreciate elegance without compromise.\n\nTour Overview\n\nDubai is a destination where luxury is expressed not only through landmarks, but through how experiences are delivered. This 4-night luxury itinerary is designed to provide depth rather than rush, allowing guests to enjoy each experience with time, comfort, and personalization.\n\nFrom limousine rides and private yacht dining to Burj Khalifa\'s prime-time views and a conservation desert safari, the journey unfolds with seamless transitions and thoughtful pacing. The addition of a private Abu Dhabi city tour with a world-class theme park elevates the experience beyond Dubai, offering a comprehensive luxury perspective of the UAE.\n\nGuests can select from three pricing options, making the tour flexible while maintaining its premium character.',
    abstract: 'The Grand Luxury Dubai Signature Experience – 4 Nights / 5 Days is a refined, experience-rich journey crafted for travelers who wish to explore Dubai beyond the essentials, at a relaxed pace, in complete privacy, and with the city\'s most iconic luxury moments carefully woven into each day. This tour blends royal hospitality, modern architectural wonders, elite dining, private transportation, desert conservation experiences, and Abu Dhabi\'s cultural grandeur, making it ideal for honeymooners, families seeking exclusivity, and discerning travelers who appreciate elegance without compromise.',
    tourOverview: 'Dubai is a destination where luxury is expressed not only through landmarks, but through how experiences are delivered. This 4-night luxury itinerary is designed to provide depth rather than rush, allowing guests to enjoy each experience with time, comfort, and personalization.\n\nFrom limousine rides and private yacht dining to Burj Khalifa\'s prime-time views and a conservation desert safari, the journey unfolds with seamless transitions and thoughtful pacing. The addition of a private Abu Dhabi city tour with a world-class theme park elevates the experience beyond Dubai, offering a comprehensive luxury perspective of the UAE.\n\nGuests can select from three pricing options, making the tour flexible while maintaining its premium character.',
    keyHighlights: [
      'Private luxury airport and hotel transfers',
      'Chauffeur-driven limousine experience',
      'Burj Al Arab entry with iconic golden coffee',
      'Burj Khalifa prime-time observation deck with fountain dinner',
      'Fully private Dubai city tour',
      'Private yacht dinner cruise at Dubai Marina',
      'Authentic desert safari at Dubai Desert Conservation Reserve',
      'Flexible accommodation options (No Hotel / 4★ / 5★ Luxury)'
    ],
    hotelOptions: [
      'Luxury Tour Without Hotel Accommodation',
      'Luxury Tour with 4-Star Luxury Hotel',
      'Luxury Tour with 5-Star Luxury Hotel'
    ],
    bestTimeToVisit: {
      yearRound: 'Dubai can be visited year-round, but the most pleasant season for this luxury itinerary is October to April, when outdoor experiences and sightseeing are most comfortable.',
      winter: 'Peak Season: November–March',
      summer: 'Summer: Indoor-focused luxury experiences available at attractive rates'
    },
    whyChooseThisTrip: [
      'A slower, more immersive luxury experience',
      'Fully private services with personalized pacing',
      'Iconic Dubai attractions in one journey',
      'Premium experiences without crowded group tours',
      'Especially suited for honeymooners, families with children, couples, and VIP travelers who value comfort, privacy, and thoughtful planning'
    ],
    whyPremiumDubaiTours: [
      'Carefully vetted luxury experiences',
      'Flexible customization for each guest',
      'Trusted partners for exclusive access and preferred rates',
      'Transparent pricing per vehicle (up to 6 guests)',
      'Dedicated on-ground coordination throughout the trip',
      'Our role is not just to arrange tours, but to deliver effortless luxury travel'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai & Private Luxury Transfer',
        description: 'Upon arrival at Dubai International Airport, you will be greeted by our professional luxury travel representative and escorted to your hotel or resort in a private luxury vehicle. The transfer ensures discretion, comfort, and a smooth start to your journey.\n\nAfter check-in, the remainder of the day is kept relaxed, allowing you to recover from travel, explore nearby surroundings, or simply enjoy the amenities of your selected hotel or resort.'
      },
      {
        day: 2,
        title: 'Limousine Ride, Burj Al Arab, Burj Khalifa & Fountain Dinner',
        description: 'After breakfast, the day begins with a chauffeur-driven limousine experience, offering a stylish way to explore Dubai\'s elite landmarks.\n\nYour first highlight is the iconic Burj Al Arab, where you enjoy exclusive entry and experience the world-famous golden coffee, a symbol of Dubai\'s extravagant hospitality.\n\nLater, proceed to Burj Khalifa, where you access the Observation Deck at prime time, offering spectacular panoramic views. The experience concludes with a dinner during the Dubai Fountain Show, providing a magical atmosphere as water, light, and music perform beneath the world\'s tallest tower.\n\nReturn to your hotel in comfort, marking a day of true signature luxury.'
      },
      {
        day: 3,
        title: 'Private Dubai City Tour & Private Yacht Dinner Cruise',
        description: 'Begin the day with a Private Dubai City Tour, customized to your interests and pace. Highlights typically include both Old Dubai and New Dubai!\n\nThis private tour allows flexibility for photo stops, breaks, and optional café visits.\n\nIn the evening, enjoy a Private Yacht Dinner Cruise at Dubai Marina. Sail past the illuminated skyline of Marina, Bluewaters Island, and JBR while enjoying a freshly prepared dinner onboard your private yacht—an experience that perfectly captures Dubai\'s glamorous lifestyle.'
      },
      {
        day: 4,
        title: 'Authentic Desert Safari & Abu Dhabi Luxury Excursion',
        description: 'After breakfast, depart for an Authentic Dubai Desert Safari at the Dubai Desert Conservation Reserve. This premium desert experience focuses on sustainability, wildlife, and cultural authenticity rather than commercial entertainment.\n\nThe experience includes:\n• Private 4x4 desert vehicle\n• Scenic desert drives and wildlife observation\n• Sunset photography\n• Exclusive desert camp\n• Four-course traditional dinner in a refined desert setting\n\nReturn to the hotel in comfort after a fulfilling day.'
      },
      {
        day: 5,
        title: 'Departure from Dubai',
        description: 'After breakfast, check out from your hotel and enjoy a private luxury transfer to the airport for your onward journey, concluding a carefully curated luxury escape.'
      }
    ],
    price: 0,
    duration: '4 Nights / 5 Days',
    location: 'Dubai, UAE',
    capacity: 'Up to 6 guests per vehicle',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Luxury',
    images: [
      { public_id: 'grand-luxury-dubai-signature-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'grand-luxury-dubai-signature-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'grand-luxury-dubai-signature-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
      { public_id: 'grand-luxury-dubai-signature-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
    ],
    inclusions: [
      {
        category: 'Private Transfers',
        items: [
          'Private airport & hotel transfers in luxury vehicle'
        ]
      },
      {
        category: 'Attractions & Experiences',
        items: [
          'Chauffeur-driven limousine ride',
          'Burj Khalifa prime-time observation deck with fountain dinner',
          'Private yacht cruise with dinner',
          'Burj Al Arab entry with golden coffee',
          'Private Dubai city tour',
          'Authentic desert safari with four-course dinner'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Hotel/resort accommodation with breakfast & Tourism Dirhams (if selected)'
        ]
      },
      {
        category: 'Taxes & Services',
        items: [
          'Government taxes and operational expenses'
        ]
      }
    ],
    exclusions: [
      {
        category: 'International Airfare',
        items: ['International airfare']
      },
      {
        category: 'UAE Entry Visa',
        items: ['UAE entry visa']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses (insurance, shopping, tips, additional meals)']
      }
    ],
    transportation: [
      { type: 'Private Luxury Vehicle', vehicle: 'Luxury Sedan/SUV/Limousine', description: 'Private luxury vehicle-based transfers and tours (up to 6 guests per vehicle)' }
    ],
    accommodation: [
      { city: 'Dubai', hotel: 'Choice of No Hotel / 4-Star Luxury / 5-Star Luxury', rooms: 'As per requirement', roomType: 'No Hotel / 4-Star / 5-Star Luxury', nights: '4 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  }
];

// Adventure packages data
const getAdventurePackages = () => [
  {
    _id: 'dubai-grand-adventure-expedition',
    title: 'Dubai Grand Adventure Expedition',
    subtitle: '7 Nights / 8 Days From Desert Skies to City Lights, The Most Complete Dubai Adventure Holiday',
    ideaFor: 'Families, couples, and adventure enthusiasts looking for a comprehensive Dubai holiday',
    about: 'This 7 Nights / 8 Days journey is designed for travelers who want to experience Dubai beyond the surface. It combines aerial desert adventures, immersive city exploration, world-class attractions, and unforgettable marine and desert activities into one seamless itinerary. From sunrise hot air ballooning over golden dunes to cruising Dubai\'s skyline by yacht, this program delivers a rich, multi-dimensional UAE experience.',
    services: 'Sunrise hot air balloon ride, Guided Dubai city tour, Full-day access to Aquaventure Waterpark, Abu Dhabi excursion with theme parks, Deep-sea fishing and urban zipline, Desert safari with dune bashing, Burj Khalifa observation deck, Evening luxury yacht cruise',
    tourDetails: 'Abstract\n\nThis 7 Nights / 8 Days journey is designed for travelers who want to experience Dubai beyond the surface. It combines aerial desert adventures, immersive city exploration, world-class attractions, and unforgettable marine and desert activities into one seamless itinerary.\n\nFrom sunrise hot air ballooning over golden dunes to cruising Dubai\'s skyline by yacht, this program delivers a rich, multi-dimensional UAE experience.\n\nOverview\n\nDubai is one of the few destinations in the world where futuristic architecture, deep-rooted culture, and natural desert landscapes coexist within minutes of each other. This extended adventure package allows you to experience each side of the emirate without rushing.\n\nThe itinerary blends:\n• Iconic sightseeing\n• Desert exploration\n• Theme park excitement\n• Marine adventures\n• Adrenaline-based activities\n• Relaxed luxury moments\n\nThis program is ideal for families, couples, and adventure enthusiasts looking for a comprehensive Dubai holiday.',
    abstract: 'This 7 Nights / 8 Days journey is designed for travelers who want to experience Dubai beyond the surface. It combines aerial desert adventures, immersive city exploration, world-class attractions, and unforgettable marine and desert activities into one seamless itinerary. From sunrise hot air ballooning over golden dunes to cruising Dubai\'s skyline by yacht, this program delivers a rich, multi-dimensional UAE experience.',
    tourOverview: 'Dubai is one of the few destinations in the world where futuristic architecture, deep-rooted culture, and natural desert landscapes coexist within minutes of each other. This extended adventure package allows you to experience each side of the emirate without rushing.\n\nThe itinerary blends:\n• Iconic sightseeing\n• Desert exploration\n• Theme park excitement\n• Marine adventures\n• Adrenaline-based activities\n• Relaxed luxury moments\n\nThis program is ideal for families, couples, and adventure enthusiasts looking for a comprehensive Dubai holiday.',
    keyHighlights: [
      'Sunrise hot air balloon ride over Dubai\'s desert landscape',
      'Guided Dubai city tour covering heritage and modern icons',
      'Full-day access to Aquaventure Waterpark',
      'Abu Dhabi excursion with entry to world-renowned theme parks',
      'Deep-sea fishing and urban zipline experience',
      'Desert safari with dune bashing, cultural shows, and BBQ dinner',
      'Visit to Burj Khalifa observation deck',
      'Evening luxury yacht cruise along Palm Jumeirah'
    ],
    hotelOptions: [
      'Gold Package - Without Hotel (AED 5,499)',
      'Diamond Package - With 4★ Hotel (AED 7,999)',
      'Platinum Package - With 5★ Hotel (AED 8,599)'
    ],
    bestTimeToVisit: {
      yearRound: 'Dubai operates year-round with world-class climate-controlled facilities.',
      winter: 'November – April: Perfect weather for outdoor exploration and adventure activities.',
      summer: 'May – October: Ideal for value travelers; indoor attractions remain fully accessible.'
    },
    whyChooseThisTrip: [
      'Comprehensive 8-day adventure covering all major Dubai experiences',
      'Perfect blend of adrenaline activities and cultural exploration',
      'Ideal for families, couples, and adventure enthusiasts',
      'Flexible pricing options to suit different budgets',
      'Structured yet customizable program',
      'Access to world-class theme parks and attractions'
    ],
    whyPremiumDubaiTours: [
      'Carefully designed activity flow to balance adventure and relaxation',
      'Private logistics ensuring comfort and flexibility',
      'Experienced destination planners based in Dubai',
      'Transparent pricing with curated high-quality partners',
      'Ideal for travelers seeking structured yet customizable programs',
      'We focus on delivering meaningful experiences, not just sightseeing'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai',
        description: 'Arrive at Dubai International Airport and meet our representative.\n\nPrivate transfer to your hotel for check-in.\n\nSpend the evening relaxing or exploring nearby dining areas, Dubai is one of the world\'s most diverse culinary hubs.'
      },
      {
        day: 2,
        title: 'Sky Views Adventure & Dubai City Tour',
        description: 'Begin the day with a visit to Sky Views Observatory.\n\nExperience:\n• Glass walkway suspended high above Downtown\n• Thrilling Sky Slide\n• Panoramic skyline views\n\nContinue with a guided city tour covering:\n• Jumeirah Mosque\n• Marina skyline and coastal districts\n• Cultural and architectural highlights of old and new Dubai'
      },
      {
        day: 3,
        title: 'Hot Air Balloon & Evening Desert Safari',
        description: 'Start early with a breathtaking hot air balloon ride across Dubai\'s desert.\n\nWitness:\n• Sunrise over golden dunes\n• Native wildlife sightings\n• Aerial desert landscapes rarely seen by visitors\n\nAfternoon at leisure before heading to an evening desert safari featuring:\n• Dune bashing\n• Camel rides\n• Sandboarding\n• Traditional performances and BBQ dinner'
      },
      {
        day: 4,
        title: 'Abu Dhabi Two-Park Experience',
        description: 'Travel to Abu Dhabi for a full-day adventure at Yas Island.\n\nChoose two parks such as:\n• Ferrari World Abu Dhabi\n• Warner Bros. World Abu Dhabi\n• Yas Waterworld\n\nReturn to Dubai in the evening.'
      },
      {
        day: 5,
        title: 'Atlantis Aquaventure Waterpark',
        description: 'Enjoy a full day at Aquaventure Waterpark.\n\nHighlights include:\n• Record-breaking water slides\n• Lazy River and wave pools\n• Private beach access\n• Marine exhibits at Lost Chambers Aquarium\n\nA perfect mix of excitement and relaxation.'
      },
      {
        day: 6,
        title: 'Fishing, Zipline & Marina Adventures',
        description: 'Morning deep-sea fishing excursion in the Arabian Gulf.\n\nLater experience the thrilling XLine zipline across Dubai Marina, followed by optional water sports such as:\n• Jet Ski\n• Paddleboarding\n• Scenic speedboat rides'
      },
      {
        day: 7,
        title: 'Burj Khalifa & Luxury Yacht Dinner',
        description: 'Visit Burj Khalifa for unmatched panoramic views from the observation deck.\n\nSpend time exploring Dubai Mall before boarding an evening yacht cruise featuring:\n• Buffet dinner\n• Sunset skyline views\n• Sailing past Bluewaters and Palm coastline'
      },
      {
        day: 8,
        title: 'Departure',
        description: 'Breakfast at hotel followed by private transfer to the airport.\n\nYour Grand Dubai Adventure concludes with unforgettable memories.'
      }
    ],
    price: 5499,
    duration: '7 Nights / 8 Days',
    location: 'Dubai, UAE',
    capacity: 'Minimum 2 persons',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Adventure',
    images: [
      { public_id: 'dubai-adventure-1', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Adventure' },
      { public_id: 'dubai-adventure-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'dubai-adventure-3', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' },
      { public_id: 'dubai-adventure-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' }
    ],
    inclusions: [
      {
        category: 'Transfers',
        items: [
          'Airport pick-up and drop-off (private transfers)'
        ]
      },
      {
        category: 'Tours & Activities',
        items: [
          'All tours and excursions mentioned in the itinerary',
          'Entrance tickets and activity fees',
          'Licensed guides and professional coordination'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Hotel accommodation (if Diamond or Platinum selected)',
          'Daily breakfast (if hotel selected)'
        ]
      }
    ],
    exclusions: [
      {
        category: 'UAE Entry Visa',
        items: ['UAE Entry Visa (Assistance provided if required)']
      },
      {
        category: 'International Airfare',
        items: ['International Airfare (We help arrange tickets)']
      },
      {
        category: 'Travel Insurance',
        items: ['Travel Insurance (Available upon request)']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses (meals, shopping, beverages, etc.)']
      }
    ],
    transportation: [
      { type: 'Private Vehicle', vehicle: 'Sedan/SUV', description: 'Private transfers and tours throughout the program' }
    ],
    accommodation: [
      { city: 'Dubai', hotel: 'Choice of No Hotel / 4-Star / 5-Star Hotel', rooms: 'As per requirement', roomType: 'Twin/Double', nights: '7 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'dubai-thrill-explorer',
    title: 'Dubai Thrill Explorer',
    subtitle: '5 Nights / 6 Days An Extended Adventure Holiday with Water Sports, Skyline Experiences & Iconic Dubai Moments',
    ideaFor: 'Couples, families, and small groups seeking an immersive Dubai adventure experience',
    about: 'Take your Dubai adventure one step further with this immersive 5 Nights / 6 Days itinerary designed for travelers who want more time to explore, experience, and enjoy. This package blends high-energy water sports, futuristic skyline attractions, world-class leisure experiences, and unforgettable moments at the city\'s most iconic landmarks, all delivered with seamless planning and premium service. Perfect for couples, families, and small groups, this journey lets you experience Dubai not just as a destination, but as a playground of innovation, adventure, and luxury.',
    services: 'Ultimate water sports adventure, Edge Walk and Glass Slide at Sky Views, Full-day at Atlantis Aquaventure Waterpark, Deep-sea fishing experience, Burj Khalifa observation deck visit, Scenic marine experiences around Dubai Marina',
    tourDetails: 'Abstract\n\nTake your Dubai adventure one step further with this immersive 5 Nights / 6 Days itinerary designed for travelers who want more time to explore, experience, and enjoy. This package blends high-energy water sports, futuristic skyline attractions, world-class leisure experiences, and unforgettable moments at the city\'s most iconic landmarks, all delivered with seamless planning and premium service.\n\nPerfect for couples, families, and small groups, this journey lets you experience Dubai not just as a destination, but as a playground of innovation, adventure, and luxury.\n\nOverview\n\nDubai is a city built for extraordinary experiences. Whether you\'re gliding across turquoise waters, walking above glass-floored observatories, or enjoying panoramic city views from the tallest tower on Earth, every day here is designed to inspire awe.\n\nThis 6-day adventure gives you more flexibility and deeper exploration compared to shorter stays; combining thrill-based activities with relaxed sightseeing and leisure time.',
    abstract: 'Take your Dubai adventure one step further with this immersive 5 Nights / 6 Days itinerary designed for travelers who want more time to explore, experience, and enjoy. This package blends high-energy water sports, futuristic skyline attractions, world-class leisure experiences, and unforgettable moments at the city\'s most iconic landmarks, all delivered with seamless planning and premium service. Perfect for couples, families, and small groups, this journey lets you experience Dubai not just as a destination, but as a playground of innovation, adventure, and luxury.',
    tourOverview: 'Dubai is a city built for extraordinary experiences. Whether you\'re gliding across turquoise waters, walking above glass-floored observatories, or enjoying panoramic city views from the tallest tower on Earth, every day here is designed to inspire awe.\n\nThis 6-day adventure gives you more flexibility and deeper exploration compared to shorter stays; combining thrill-based activities with relaxed sightseeing and leisure time.',
    keyHighlights: [
      'Ultimate water sports adventure along Dubai\'s coastline',
      'Edge Walk and Glass Slide experience at Sky Views',
      'Full-day excitement at Atlantis Aquaventure Waterpark',
      'Deep-sea fishing experience in the Arabian Gulf',
      'Visit to the world\'s tallest building, Burj Khalifa',
      'Scenic marine experiences around Dubai Marina',
      'Flexible leisure time for shopping and self-exploration'
    ],
    hotelOptions: [
      'Gold Package - Without Hotel (AED 4,399)',
      'Diamond Package - With 4★ Hotel (AED 6,499)',
      'Platinum Package - With 5★ Hotel (AED 7,699)'
    ],
    bestTimeToVisit: {
      yearRound: 'Dubai is a year-round destination thanks to its world-class infrastructure and climate-controlled attractions.',
      winter: 'October to April: Ideal weather for outdoor adventures and sightseeing',
      summer: 'May to September: Great travel deals and indoor attractions remain fully operational'
    },
    whyChooseThisTrip: [
      'Extended 6-day adventure with more time to explore',
      'Perfect blend of high-energy activities and relaxed sightseeing',
      'Ideal for couples, families, and small groups',
      'Flexible pricing options to suit different budgets',
      'Access to world-class water sports and skyline attractions',
      'Fully customizable experience to match your interests'
    ],
    whyPremiumDubaiTours: [
      'Locally experienced team based in Dubai',
      'Carefully timed itineraries to avoid crowds and maximize enjoyment',
      'Trusted network of licensed activity providers',
      'Flexible customization before and during travel',
      'Transparent pricing with no hidden costs',
      'Ideal for Middle East residents and international travelers alike',
      'We don\'t sell packages! We design experiences!!'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Leisure Welcome',
        description: 'Arrive in Dubai and transfer to your hotel.\n\nRelax after your journey or explore nearby areas, cafés, and shopping avenues at your own pace.\n\nOvernight stay in Dubai.'
      },
      {
        day: 2,
        title: 'Ultimate Water Sports Adventure',
        description: 'After breakfast, begin your adrenaline-filled introduction to Dubai\'s coastal lifestyle.\n\nActivities include:\n• Jet Ski ride along the iconic shoreline\n• Parasailing with stunning aerial views\n• Scenic speedboat experience\n• Choice between Jet Pack ride or guided scuba diving\n\nA thrilling day designed to showcase Dubai\'s adventurous side.'
      },
      {
        day: 3,
        title: 'Sky Views Observatory & Edge Walk',
        description: 'Today you\'ll experience Dubai from breathtaking heights.\n\nEnjoy:\n• Walk across the glass Sky Views bridge\n• Experience the exhilarating Edge Walk\n• Capture incredible Downtown skyline photos\n\nThe afternoon is free for shopping or relaxation.'
      },
      {
        day: 4,
        title: 'Atlantis Aquaventure Waterpark Experience',
        description: 'Spend the day at Aquaventure Waterpark, one of the largest waterparks in the world.\n\nEnjoy:\n• Record-breaking slides and rides\n• Lazy rivers and wave pools\n• Private beach access\n• Entry to Lost Chambers Aquarium\n\nA perfect mix of thrill and leisure.'
      },
      {
        day: 5,
        title: 'Deep Sea Fishing & Burj Khalifa Visit',
        description: 'Start your morning with a deep-sea fishing excursion in the Arabian Gulf, a unique and relaxing experience with professional crew support.\n\nLater, visit Burj Khalifa\'s observation deck to witness Dubai\'s futuristic skyline from above, a must-do highlight of any Dubai journey.\n\nOptional: Enjoy dinner or fountain views at Dubai Mall in the evening.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'After breakfast, check out and transfer to the airport for departure, concluding your unforgettable Dubai adventure.'
      }
    ],
    price: 4399,
    duration: '5 Nights / 6 Days',
    location: 'Dubai, UAE',
    capacity: 'Minimum 2 persons',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Adventure',
    images: [
      { public_id: 'dubai-thrill-1', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Water Sports Adventure' },
      { public_id: 'dubai-thrill-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'dubai-thrill-3', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'dubai-thrill-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' }
    ],
    inclusions: [
      {
        category: 'Transfers',
        items: [
          'Airport pick-up and drop-off transfers'
        ]
      },
      {
        category: 'Tours & Activities',
        items: [
          'All tours and activities mentioned in the itinerary',
          'All entrance tickets and adventure activity fees',
          'Professional tour coordination and on-ground support'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Hotel accommodation (if Diamond or Platinum selected)',
          'Daily breakfast (if hotel option selected)'
        ]
      }
    ],
    exclusions: [
      {
        category: 'UAE Entry Visa',
        items: ['UAE Entry Visa (We assist if required)']
      },
      {
        category: 'International Airfare',
        items: ['International Airfare (Ticketing support available)']
      },
      {
        category: 'Travel Insurance',
        items: ['Travel Insurance (Can be arranged upon request)']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses such as meals, shopping, and beverages']
      }
    ],
    transportation: [
      { type: 'Private Vehicle', vehicle: 'Sedan/SUV', description: 'Private transfers and tours throughout the program' }
    ],
    accommodation: [
      { city: 'Dubai', hotel: 'Choice of No Hotel / 4-Star / 5-Star Hotel', rooms: 'As per requirement', roomType: 'Twin/Double', nights: '5 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'dubai-ultimate-adventure-escape',
    title: 'Dubai Ultimate Adventure Escape',
    subtitle: '6 Nights / 7 Days Theme Parks, Sky-High Thrills & Iconic UAE Experiences in One Power-Packed Holiday',
    ideaFor: 'Families, couples, and adventure lovers seeking a well-rounded UAE journey',
    about: 'Designed for travelers who want to go beyond the ordinary, this 6 Nights / 7 Days adventure brings together Dubai\'s most thrilling attractions, world-famous landmarks, and a full-day experience in Abu Dhabi. From gravity-defying sky walks to record-breaking theme parks and unforgettable marine adventures, this journey delivers a complete UAE adventure holiday. This extended stay allows you to explore deeper, experience more activities at a relaxed pace, and balance excitement with leisure.',
    services: 'Full-day multi-park adventure in Abu Dhabi\'s Yas Island, Glass Slide and Edge Walk at Sky Views Observatory, Guided Dubai city tour, Full-day access to Aquaventure Waterpark, Deep-sea fishing experience, XLine experience at Dubai Marina, Burj Khalifa visit, Luxury yacht cruise with dinner',
    tourDetails: 'Abstract\n\nDesigned for travelers who want to go beyond the ordinary, this 6 Nights / 7 Days adventure brings together Dubai\'s most thrilling attractions, world-famous landmarks, and a full-day experience in Abu Dhabi. From gravity-defying sky walks to record-breaking theme parks and unforgettable marine adventures, this journey delivers a complete UAE adventure holiday.\n\nThis extended stay allows you to explore deeper, experience more activities at a relaxed pace, and balance excitement with leisure.\n\nOverview\n\nDubai is not just a city, it is a destination engineered for experiences. With cutting-edge architecture, desert adventures, and world-class entertainment, every day offers something new.\n\nThis 7-day itinerary blends:\n• Urban adventures\n• Water-based thrills\n• Theme park excitement\n• Cultural sightseeing\n• Iconic skyline experiences\n\nIt\'s ideal for families, couples, and adventure lovers seeking a well-rounded UAE journey.',
    abstract: 'Designed for travelers who want to go beyond the ordinary, this 6 Nights / 7 Days adventure brings together Dubai\'s most thrilling attractions, world-famous landmarks, and a full-day experience in Abu Dhabi. From gravity-defying sky walks to record-breaking theme parks and unforgettable marine adventures, this journey delivers a complete UAE adventure holiday. This extended stay allows you to explore deeper, experience more activities at a relaxed pace, and balance excitement with leisure.',
    tourOverview: 'Dubai is not just a city, it is a destination engineered for experiences. With cutting-edge architecture, desert adventures, and world-class entertainment, every day offers something new.\n\nThis 7-day itinerary blends:\n• Urban adventures\n• Water-based thrills\n• Theme park excitement\n• Cultural sightseeing\n• Iconic skyline experiences\n\nIt\'s ideal for families, couples, and adventure lovers seeking a well-rounded UAE journey.',
    keyHighlights: [
      'Full-day multi-park adventure in Abu Dhabi\'s Yas Island',
      'Glass Slide and Edge Walk at Sky Views Observatory',
      'Guided Dubai city tour covering modern and heritage landmarks',
      'Full-day access to Aquaventure Waterpark',
      'Deep-sea fishing experience in the Arabian Gulf',
      'XLine experience at Dubai Marina',
      'Visit to the world\'s tallest tower, Burj Khalifa',
      'Relaxing luxury yacht cruise with dinner'
    ],
    hotelOptions: [
      'Gold Package - Without Hotel (AED 4,799)',
      'Diamond Package - With 4★ Hotel (AED 6,999)',
      'Platinum Package - With 5★ Hotel (AED 7,699)'
    ],
    bestTimeToVisit: {
      yearRound: 'Dubai operates year-round with world-class climate-controlled facilities.',
      winter: 'November – April: Perfect weather for outdoor exploration and adventure activities.',
      summer: 'May – October: Ideal for value travelers; indoor attractions remain fully accessible.'
    },
    whyChooseThisTrip: [
      'Comprehensive 7-day adventure covering Dubai and Abu Dhabi',
      'Perfect blend of theme parks, skyline experiences, and water activities',
      'Ideal for families, couples, and adventure lovers',
      'Extended stay allows deeper exploration at a relaxed pace',
      'Flexible pricing options to suit different budgets',
      'Well-rounded UAE journey with balanced excitement and leisure'
    ],
    whyPremiumDubaiTours: [
      'Carefully curated activity sequencing to avoid fatigue',
      'Trusted licensed adventure operators for safety and quality',
      'Private transfers ensuring comfort and flexibility',
      'Transparent package pricing with no hidden add-ons',
      'Ideal for residents of the Middle East and international travelers',
      'Dedicated support team based in Dubai',
      'We ensure your adventure is exciting, but also smooth and stress-free'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai',
        description: 'Arrive at Dubai International Airport and transfer to your hotel.\n\nEnjoy free time to relax or explore nearby cafés, shopping streets, or waterfront areas.\n\nOvernight in Dubai.'
      },
      {
        day: 2,
        title: 'Abu Dhabi Two-Park Adventure',
        description: 'After breakfast, travel to Abu Dhabi for a thrilling day at Yas Island.\n\nChoose experiences across two major parks such as:\n• Ferrari World Abu Dhabi for high-speed roller coasters\n• Warner Bros. World Abu Dhabi for immersive entertainment\n• Yas Waterworld for aquatic fun\n\nReturn to Dubai in the evening.'
      },
      {
        day: 3,
        title: 'Sky Views & Dubai City Tour',
        description: 'Visit Sky Views Observatory and enjoy:\n• Glass walkway experience\n• Sky Slide\n• Edge Walk adventure overlooking Downtown Dubai\n\nContinue with a guided city tour covering Palm Jumeirah, Jumeirah Mosque, and Dubai\'s architectural icons.'
      },
      {
        day: 4,
        title: 'Atlantis Aquaventure Waterpark',
        description: 'Spend a full day enjoying one of the world\'s largest waterparks.\n\nExperience:\n• Thrilling slides and rides\n• Private beach relaxation\n• Lazy River and wave pools\n• Lost Chambers Aquarium exploration\n\nA perfect balance of excitement and leisure.'
      },
      {
        day: 5,
        title: 'Fishing, Zipline & Water Activities',
        description: 'Start the morning with a deep-sea fishing excursion, a unique Arabian Gulf experience.\n\nLater, enjoy the XLine zipline across Dubai Marina, followed by optional water sports like:\n• Jet Ski\n• Paddleboarding\n• Scenic boat rides'
      },
      {
        day: 6,
        title: 'Burj Khalifa & Evening Yacht Experience',
        description: 'Visit Burj Khalifa and ascend to the observation deck for breathtaking skyline views.\n\nSpend time at Dubai Mall before heading to an evening luxury yacht cruise featuring:\n• International buffet dinner\n• Sunset and skyline views\n• Relaxing sail through Marina and Bluewaters'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'Breakfast at the hotel followed by transfer to the airport for your onward journey.\n\nYour Dubai Ultimate Adventure Escape concludes with unforgettable memories.'
      }
    ],
    price: 4799,
    duration: '6 Nights / 7 Days',
    location: 'Dubai, UAE',
    capacity: 'Minimum 2 persons',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Adventure',
    images: [
      { public_id: 'dubai-ultimate-1', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Theme Park Adventure' },
      { public_id: 'dubai-ultimate-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'dubai-ultimate-3', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'dubai-ultimate-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' }
    ],
    inclusions: [
      {
        category: 'Transfers',
        items: [
          'Airport pick-up and drop-off transfers'
        ]
      },
      {
        category: 'Tours & Activities',
        items: [
          'All tours and activities mentioned in the itinerary',
          'All entrance tickets and activity fees',
          'Professional coordination and guided experiences'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Hotel accommodation (if Diamond or Platinum selected)',
          'Daily breakfast (if hotel option selected)'
        ]
      }
    ],
    exclusions: [
      {
        category: 'UAE Entry Visa',
        items: ['UAE Entry Visa (Assistance provided if required)']
      },
      {
        category: 'International Airfare',
        items: ['International Airfare (We help arrange tickets)']
      },
      {
        category: 'Travel Insurance',
        items: ['Travel Insurance (Available upon request)']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses (meals, shopping, beverages, etc.)']
      }
    ],
    transportation: [
      { type: 'Private Vehicle', vehicle: 'Sedan/SUV', description: 'Private transfers and tours throughout the program' }
    ],
    accommodation: [
      { city: 'Dubai', hotel: 'Choice of No Hotel / 4-Star / 5-Star Hotel', rooms: 'As per requirement', roomType: 'Twin/Double', nights: '6 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'dubai-adventure-escape',
    title: 'Dubai Adventure Escape',
    subtitle: '4 Nights / 5 Days',
    ideaFor: 'Couples, friends, and families seeking a premium short getaway with adventure and luxury',
    about: 'Looking for a short yet action-packed Dubai holiday that blends adrenaline, luxury, and unforgettable sightseeing? This 4 Nights / 5 Days Dubai Adventure Escape is crafted for modern travelers who want to experience the city beyond traditional tours. From high-energy water sports along the Arabian Gulf to breathtaking skyline experiences and a full day at one of the world\'s largest waterparks, this journey delivers the perfect balance of excitement and comfort in a compact timeframe.',
    services: 'Jet Ski ride with views of Burj Al Arab, Parasailing above Dubai\'s coastline, Glass-floor walk and Sky Slide at Sky Views Observatory, Guided scuba diving session, Full-day access to Aquaventure Waterpark, Visit to The Lost Chambers Aquarium, Private transfers and professionally arranged activities',
    tourDetails: 'Abstract\n\nLooking for a short yet action-packed Dubai holiday that blends adrenaline, luxury, and unforgettable sightseeing? This 4 Nights / 5 Days Dubai Adventure Escape is crafted for modern travelers who want to experience the city beyond traditional tours. From high-energy water sports along the Arabian Gulf to breathtaking skyline experiences and a full day at one of the world\'s largest waterparks, this journey delivers the perfect balance of excitement and comfort in a compact timeframe.\n\nOverview\n\nDubai is globally known for transforming imagination into reality, where futuristic architecture meets pristine coastline and luxury lifestyle meets adventure tourism. This specially curated program allows you to experience Dubai\'s most exciting attractions without rushing, making it ideal for couples, friends, and families seeking a premium short getaway.\n\nYou\'ll witness Dubai from the sea, from the sky, and from beneath the water, a true 360-degree experience of the city\'s adventurous spirit.\n\nYour journey begins with a seamless arrival at Dubai International Airport, followed by four unforgettable days filled with water adventures, panoramic observatories, and leisure experiences on the iconic Palm Jumeirah.',
    abstract: 'Looking for a short yet action-packed Dubai holiday that blends adrenaline, luxury, and unforgettable sightseeing? This 4 Nights / 5 Days Dubai Adventure Escape is crafted for modern travelers who want to experience the city beyond traditional tours. From high-energy water sports along the Arabian Gulf to breathtaking skyline experiences and a full day at one of the world\'s largest waterparks, this journey delivers the perfect balance of excitement and comfort in a compact timeframe.',
    tourOverview: 'Dubai is globally known for transforming imagination into reality, where futuristic architecture meets pristine coastline and luxury lifestyle meets adventure tourism. This specially curated program allows you to experience Dubai\'s most exciting attractions without rushing, making it ideal for couples, friends, and families seeking a premium short getaway.\n\nYou\'ll witness Dubai from the sea, from the sky, and from beneath the water, a true 360-degree experience of the city\'s adventurous spirit.\n\nYour journey begins with a seamless arrival at Dubai International Airport, followed by four unforgettable days filled with water adventures, panoramic observatories, and leisure experiences on the iconic Palm Jumeirah.',
    keyHighlights: [
      'Jet Ski ride with views of the world-famous Burj Al Arab',
      'Parasailing above Dubai\'s spectacular coastline',
      'Glass-floor walk and Sky Slide at Sky Views Observatory',
      'Guided scuba diving session exploring marine life',
      'Full-day access to Aquaventure Waterpark',
      'Visit to The Lost Chambers Aquarium',
      'Private transfers and professionally arranged activities',
      'Flexible itinerary with customization options'
    ],
    hotelOptions: [
      'Gold Package - Without Hotel (AED 3,999)',
      'Diamond Package - With 4★ Hotel (AED 5,999)',
      'Platinum Package - With 5★ Hotel (AED 6,999)'
    ],
    bestTimeToVisit: {
      yearRound: 'Dubai welcomes visitors all year, but the most comfortable months for outdoor and adventure activities are:',
      winter: 'October to April: Pleasant weather, ideal for water sports and sightseeing',
      summer: 'May to September: Great for travelers seeking fewer crowds and attractive hotel offers (all activities remain operational)'
    },
    whyChooseThisTrip: [
      'Ideal for travelers with limited time but big expectations',
      'Combines Dubai\'s top adventure activities in one itinerary',
      'No unnecessary travel time, all experiences are well-paced',
      'Designed for both first-time visitors and repeat travelers',
      'Balanced mix of thrill, relaxation, and iconic sightseeing'
    ],
    whyPremiumDubaiTours: [
      'Fully customizable experience tailored to your interests',
      'Professional coordination and on-ground assistance',
      'Trusted network of licensed adventure operators',
      'Transparent pricing with no hidden costs',
      'Complete travel assistance including visa and flights if required',
      'Activities suitable for beginners with expert supervision',
      'We design the journey around your interests'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Welcome to Dubai',
        description: 'Arrive in Dubai and meet our representative for a smooth transfer to your hotel.\n\nAfter check-in, enjoy leisure time to relax or explore nearby attractions. Dubai\'s multicultural dining scene offers cuisines from around the world, perfect for an easy first evening.\n\nOvernight stay in Dubai.'
      },
      {
        day: 2,
        title: 'Water Sports Adventure Along Dubai Coast',
        description: 'After breakfast, prepare for an exhilarating day at the Arabian Gulf.\n\nYour adventure includes:\n• Jet Ski ride along Dubai\'s iconic shoreline\n• Parasailing with breathtaking aerial views\n• Scenic speed boat experience\n• Choice between Jet Pack experience or guided scuba diving\n\nThis day introduces Dubai as one of the Middle East\'s leading adventure tourism hubs.\n\nReturn to hotel for overnight stay.'
      },
      {
        day: 3,
        title: 'Sky Views Experience & Underwater Discovery',
        description: 'Today combines architectural innovation with marine exploration.\n\nVisit Sky Views Observatory for:\n• Walking across a stunning glass bridge\n• Experiencing the thrilling Sky Slide\n• Enjoying panoramic Downtown skyline views\n\nLater, continue to a professionally guided scuba diving session; safe, beginner-friendly, and unforgettable.\n\nOvernight stay in Dubai.'
      },
      {
        day: 4,
        title: 'Atlantis Aquaventure & Leisure Day',
        description: 'Spend the day enjoying one of the largest and most exciting waterparks in the world.\n\nActivities include:\n• Record-breaking water slides\n• Wave pools and private beach access\n• Relaxing lazy river rides\n• Exploration of Lost Chambers Aquarium\'s fascinating marine world\n\nA perfect combination of excitement and relaxation.\n\nOvernight stay in Dubai.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'After breakfast, check out from your hotel.\n\nTransfer to the airport for your onward journey, taking with you unforgettable memories of Dubai\'s adventure side.'
      }
    ],
    price: 3999,
    duration: '4 Nights / 5 Days',
    location: 'Dubai, UAE',
    capacity: 'Minimum 2 persons',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Adventure',
    images: [
      { public_id: 'dubai-escape-1', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Water Sports Adventure' },
      { public_id: 'dubai-escape-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'dubai-escape-3', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Sky Views' },
      { public_id: 'dubai-escape-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Aquaventure Waterpark' }
    ],
    inclusions: [
      {
        category: 'Transfers',
        items: [
          'Airport pick-up and drop-off transfers'
        ]
      },
      {
        category: 'Tours & Activities',
        items: [
          'All tours and activities mentioned in the itinerary',
          'All entrance tickets and activity fees',
          'Professional coordination and on-ground assistance'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Hotel accommodation (if Diamond or Platinum selected)',
          'Daily breakfast (if hotel option selected)'
        ]
      }
    ],
    exclusions: [
      {
        category: 'UAE Entry Visa',
        items: ['UAE Entry Visa (We assist in obtaining it if required)']
      },
      {
        category: 'International Airfare',
        items: ['International Airfare (We assist with flight booking)']
      },
      {
        category: 'Travel Insurance',
        items: ['Travel Insurance (Can be arranged upon request)']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses (meals, shopping, beverages, etc.)']
      }
    ],
    transportation: [
      { type: 'Private Vehicle', vehicle: 'Sedan/SUV', description: 'Private transfers and tours throughout the program' }
    ],
    accommodation: [
      { city: 'Dubai', hotel: 'Choice of No Hotel / 4-Star / 5-Star Hotel', rooms: 'As per requirement', roomType: 'Twin/Double', nights: '4 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  }
];

// Premium packages data
const getPremiumPackages = () => [
  {
    _id: 'premium-dubai-tours-default',
    title: 'Dubai Signature Private Escape',
    subtitle: '3 Nights / 4 Days Premium Private Tour Package',
    about: 'The Dubai Signature Private Escape is a carefully crafted premium short-stay itinerary designed for travelers who want to experience Dubai in comfort, privacy, and style.',
    services: '',
    tourDetails: 'The Dubai Signature Private Escape is a carefully crafted premium short-stay itinerary designed for travelers who want to experience Dubai in comfort, privacy, and style. This 3 Nights / 4 Days Premium Private Tour Package offers a perfect blend of iconic landmarks, exclusive experiences, and personalized service.',
    abstract: 'The Dubai Signature Private Escape is a carefully crafted premium short-stay itinerary designed for travelers who want to experience Dubai in comfort, privacy, and style.',
    tourOverview: '',
    keyHighlights: [],
    hotelOptions: [],
    bestTimeToVisit: {
      yearRound: '',
      winter: '',
      summer: ''
    },
    whyChooseThisTrip: [],
    whyPremiumDubaiTours: [],
    itinerary: [],
    price: 0,
    duration: '3 Nights / 4 Days',
    location: 'Dubai, UAE',
    capacity: 'Up to 6 guests per vehicle',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Premium',
    images: [
      { public_id: 'premium-escape-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'premium-escape-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'premium-escape-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
      { public_id: 'premium-escape-4', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
    ],
    inclusions: [],
    exclusions: [],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5
  },
  {
    _id: 'dubai-private-classic-discovery',
    title: 'Dubai Private Classic Discovery',
    subtitle: '4 Nights / 5 Days Premium Private Tour Package',
    about: 'The Dubai Signature Escape – 4 Nights / 5 Days is a carefully curated premium Dubai tour designed for travelers who value privacy, comfort, flexibility, and refined experiences. This journey blends Dubai\'s iconic landmarks with exclusive private services, allowing guests to experience the city at a relaxed, unhurried pace.',
    services: '',
    tourDetails: 'This 4 Nights / 5 Days Premium Dubai Tour is designed as a complete introduction to Dubai, combining modern landmarks, cultural attractions, leisure experiences, and signature luxury elements. The itinerary follows a logical flow, avoiding rushed days and overcrowded schedules.',
    abstract: 'The Dubai Signature Escape – 4 Nights / 5 Days is a carefully curated premium Dubai tour designed for travelers who value privacy, comfort, flexibility, and refined experiences.',
    tourOverview: 'This 4 Nights / 5 Days Premium Dubai Tour is designed as a complete introduction to Dubai, combining modern landmarks, cultural attractions, leisure experiences, and signature luxury elements.',
    keyHighlights: [],
    hotelOptions: [],
    bestTimeToVisit: {
      yearRound: '',
      winter: '',
      summer: ''
    },
    whyChooseThisTrip: [],
    whyPremiumDubaiTours: [],
    itinerary: [
      { day: 1, title: 'Arrival in Dubai & Private Yacht Dinner Cruise', description: 'Upon arrival at Dubai International Airport, guests are warmly received by our professional representative and escorted to a private vehicle for a smooth transfer to the hotel. In the evening, enjoy a private yacht dinner cruise at Dubai Marina, offering a relaxed introduction to the city\'s skyline.' },
      { day: 2, title: 'Private Dubai City Tour & Iconic Landmarks', description: 'After breakfast, embark on a private Dubai city tour, covering both Old and New Dubai. Highlights include drive through Sheikh Zayed Road, photo stops at Burj Al Arab and Jumeirah landmarks, visit to Burj Khalifa (optional ticket), leisure time at Dubai Mall, and visit to Dubai Aquarium & Underwater Zoo (optional ticket).' },
      { day: 3, title: 'Dubai Frame, Miracle Garden & Evening Entertainment', description: 'Today focuses on Dubai\'s creative and cultural attractions. Morning visits include Dubai Frame, Miracle Garden, and Butterfly Garden. In the evening, choose between Global Village or Ain Dubai Ferris Wheel experience for city views.' },
      { day: 4, title: 'Dolphin Show, Limousine Ride & Private Desert Safari', description: 'Begin the day with a visit to a dolphin show at Dubai Creek. Later, enjoy a one-hour private limousine ride. In the afternoon, proceed for a private desert safari in a 4x4 vehicle with dune bashing, sandboarding, camel rides, and a premium desert camp experience with BBQ dinner and live entertainment.' },
      { day: 5, title: 'Departure', description: 'After breakfast, enjoy a relaxed morning before your private transfer to the airport for departure, concluding a thoughtfully planned premium Dubai journey.' }
    ],
    price: 0,
    duration: '4 Nights / 5 Days',
    location: 'Dubai, UAE',
    capacity: 'Up to 6 guests per vehicle',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Premium',
    images: [
      { public_id: 'premium-classic-1', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
      { public_id: 'premium-classic-2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'premium-classic-3', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'premium-classic-4', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Desert Safari' }
    ],
    inclusions: [],
    exclusions: [],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5
  },
  {
    _id: 'dubai-elite-grand-explorer',
    title: 'Dubai Elite Grand Explorer',
    subtitle: '6 Nights / 7 Days Premium Private Dubai & UAE Tour',
    about: 'The Dubai Elite Grand Explorer – 6 Nights / 7 Days Premium Tour is a comprehensive private travel experience designed for travelers who want to explore Dubai beyond the basics while also discovering neighboring Emirates in comfort and privacy.',
    services: '',
    tourDetails: 'The Dubai Elite Grand Explorer – 6 Nights / 7 Days Premium Tour is a comprehensive private travel experience designed for travelers who want to explore Dubai beyond the basics while also discovering neighboring Emirates in comfort and privacy. This premium package includes private tours, luxury accommodations, and exclusive experiences across Dubai and the UAE.',
    abstract: 'The Dubai Elite Grand Explorer – 6 Nights / 7 Days Premium Tour is a comprehensive private travel experience designed for travelers who want to explore Dubai beyond the basics while also discovering neighboring Emirates in comfort and privacy.',
    tourOverview: '',
    keyHighlights: [],
    hotelOptions: [],
    bestTimeToVisit: {
      yearRound: '',
      winter: '',
      summer: ''
    },
    whyChooseThisTrip: [],
    whyPremiumDubaiTours: [],
    itinerary: [],
    price: 0,
    duration: '6 Nights / 7 Days',
    location: 'Dubai, UAE',
    capacity: 'Up to 6 guests per vehicle',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Premium',
    images: [
      { public_id: 'premium-elite-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'premium-elite-2', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Abu Dhabi' },
      { public_id: 'premium-elite-3', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'premium-elite-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' }
    ],
    inclusions: [],
    exclusions: [],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5
  },
  {
    _id: 'dubai-grand-signature-journey',
    title: 'Dubai Grand Signature Journey',
    subtitle: '5 Nights / 6 Days Premium Private Dubai Tour',
    about: 'The Dubai Grand Signature Journey – 5 Nights / 6 Days is a refined private Dubai travel experience designed for travelers who want more time, more depth, and more flexibility while exploring the UAE.',
    services: '',
    tourDetails: 'The Dubai Grand Signature Journey – 5 Nights / 6 Days is a refined private Dubai travel experience designed for travelers who want more time, more depth, and more flexibility while exploring the UAE. This premium package combines luxury accommodations, private guided tours, and exclusive access to Dubai\'s most iconic attractions.',
    abstract: 'The Dubai Grand Signature Journey – 5 Nights / 6 Days is a refined private Dubai travel experience designed for travelers who want more time, more depth, and more flexibility while exploring the UAE.',
    tourOverview: '',
    keyHighlights: [],
    hotelOptions: [],
    bestTimeToVisit: {
      yearRound: '',
      winter: '',
      summer: ''
    },
    whyChooseThisTrip: [],
    whyPremiumDubaiTours: [],
    itinerary: [],
    price: 0,
    duration: '5 Nights / 6 Days',
    location: 'Dubai, UAE',
    capacity: 'Up to 6 guests per vehicle',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Premium',
    images: [
      { public_id: 'premium-signature-1', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline' },
      { public_id: 'premium-signature-2', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Marina' },
      { public_id: 'premium-signature-3', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'premium-signature-4', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Abu Dhabi' }
    ],
    inclusions: [],
    exclusions: [],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5
  }
];

// Oman packages data
const getOmanPackages = () => [
  {
    _id: 'oman-tour-packages-dubai-abu-dhabi',
    title: 'Oman Tour Packages from Dubai & Abu Dhabi',
    subtitle: 'Premium Road Trips, Nature Escapes & Cultural Journeys',
    ideaFor: 'Families, couples, corporate groups, and adventure seekers looking for meaningful experiences beyond city life',
    about: 'Oman tour packages from Dubai offer a rare opportunity to experience breathtaking natural beauty, authentic Arabian culture, and scenic road journeys just a few hours away from the UAE. From the dramatic fjords of Musandam to the lush landscapes of Salalah and the historic cities of northern Oman, these tours are designed for travelers who seek meaningful experiences beyond city life. With Premium Dubai Tours, our Oman holidays are carefully curated to deliver comfort, safety, and authenticity, whether you choose a short weekend escape or a multi-day private road trip from Dubai or Abu Dhabi.',
    services: 'Dibba Musandam Dhow Cruise Tours, Musandam Fjord & Sea Adventure Tours, Salalah Nature & Khareef Season Tours, Oman Beach & Coastal Getaways, Mountain & Wadi Exploration Tours, Cultural & Heritage Tours, Private & Custom Oman Road Trips',
    tourDetails: 'Abstract\n\nOman tour packages from Dubai offer a rare opportunity to experience breathtaking natural beauty, authentic Arabian culture, and scenic road journeys just a few hours away from the UAE. From the dramatic fjords of Musandam to the lush landscapes of Salalah and the historic cities of northern Oman, these tours are designed for travelers who seek meaningful experiences beyond city life.\n\nWith Premium Dubai Tours, our Oman holidays are carefully curated to deliver comfort, safety, and authenticity, whether you choose a short weekend escape or a multi-day private road trip from Dubai or Abu Dhabi.\n\nOverview\n\nOman is one of the most diverse and visually stunning destinations in the Middle East. Known for its mountains, deserts, turquoise coastlines, wadis, waterfalls, and preserved traditions, Oman offers a refreshing contrast to the modern skylines of the UAE.\n\nOur Oman Tour Packages from Dubai and Abu Dhabi are ideal for travelers looking for a smooth cross-border journey with well-planned itineraries, premium vehicles, experienced guides, and handpicked accommodations. These tours are suitable for families, couples, corporate groups, and adventure seekers, offering both relaxation and exploration.\n\nFrom Dibba Musandam dhow cruises to Salalah nature escapes, desert adventures, and cultural city tours, our Oman packages can be customized to match your travel style, budget, and schedule.',
    abstract: 'Oman tour packages from Dubai offer a rare opportunity to experience breathtaking natural beauty, authentic Arabian culture, and scenic road journeys just a few hours away from the UAE. From the dramatic fjords of Musandam to the lush landscapes of Salalah and the historic cities of northern Oman, these tours are designed for travelers who seek meaningful experiences beyond city life. With Premium Dubai Tours, our Oman holidays are carefully curated to deliver comfort, safety, and authenticity, whether you choose a short weekend escape or a multi-day private road trip from Dubai or Abu Dhabi.',
    tourOverview: 'Oman is one of the most diverse and visually stunning destinations in the Middle East. Known for its mountains, deserts, turquoise coastlines, wadis, waterfalls, and preserved traditions, Oman offers a refreshing contrast to the modern skylines of the UAE.\n\nOur Oman Tour Packages from Dubai and Abu Dhabi are ideal for travelers looking for a smooth cross-border journey with well-planned itineraries, premium vehicles, experienced guides, and handpicked accommodations. These tours are suitable for families, couples, corporate groups, and adventure seekers, offering both relaxation and exploration.\n\nFrom Dibba Musandam dhow cruises to Salalah nature escapes, desert adventures, and cultural city tours, our Oman packages can be customized to match your travel style, budget, and schedule.',
    keyHighlights: [
      'Easy accessibility by road from Dubai and Abu Dhabi',
      'Scenic road journeys featuring coastal highways and mountain passes',
      'Rich culture & heritage with historic forts and traditional souqs',
      'Natural diversity: wadis, beaches, caves, fjords, waterfalls, deserts',
      'Peaceful & less crowded atmosphere',
      'Dibba Musandam Dhow Cruise Tours',
      'Musandam Fjord & Sea Adventure Tours',
      'Salalah Nature & Khareef Season Tours',
      'Oman Beach & Coastal Getaways',
      'Mountain & Wadi Exploration Tours',
      'Cultural & Heritage Tours',
      'Private & Custom Oman Road Trips'
    ],
    hotelOptions: [
      'Day Trip to Musandam',
      '2-3 Day Musandam Tours',
      '4-5 Day Salalah Tours',
      'Custom Multi-Day Oman Road Trips'
    ],
    bestTimeToVisit: {
      yearRound: 'Cultural tours, coastal drives, and city sightseeing available year-round',
      winter: 'October to April: Best for Musandam, northern Oman, and road trips',
      summer: 'June to September: Ideal for Salalah during the Khareef (monsoon) season'
    },
    whyChooseThisTrip: [
      'Easy accessibility - just a few hours from Dubai and Abu Dhabi',
      'Scenic road journeys that are part of the experience',
      'Rich culture & heritage beautifully preserved',
      'Natural diversity with wadis, beaches, caves, fjords, and mountains',
      'Peaceful & less crowded atmosphere',
      'Perfect for short holidays, weekend breaks, and extended road trips'
    ],
    whyPremiumDubaiTours: [
      'Regional expertise in cross-border tours from the UAE',
      'Premium planning & execution with attention to comfort and timing',
      'Personalized itineraries customized to your interests',
      'End-to-end support from inquiry to return',
      'Transparent pricing with clear inclusions and no hidden charges',
      'Smooth planning, legal compliance, and hassle-free travel',
      'Dedicated customer support, border assistance, and real-time coordination'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Departure from Dubai/Abu Dhabi & Arrival in Oman',
        description: 'Begin your journey with a comfortable road trip from Dubai or Abu Dhabi to Oman.\n\nOur experienced driver-guide will assist with border crossing and documentation.\n\nArrive at your destination and check into your accommodation.\n\nEvening at leisure to relax and prepare for your Oman adventure.'
      },
      {
        day: 2,
        title: 'Oman Exploration Day',
        description: 'Depending on your chosen package:\n\n• Musandam: Enjoy a dhow cruise through dramatic fjords, snorkeling, and coastal exploration\n• Salalah: Discover lush landscapes, waterfalls, and the unique Khareef season (June-September)\n• Northern Oman: Explore historic forts, traditional souqs, and mountain villages\n• Wadi & Desert: Experience natural pools, desert adventures, and scenic landscapes\n\nAll tours include professional guides and comfortable transportation.'
      },
      {
        day: 3,
        title: 'Cultural & Natural Highlights',
        description: 'Continue exploring Oman\'s diverse attractions:\n\n• Visit historic forts and traditional markets\n• Experience authentic Omani culture and hospitality\n• Discover natural wonders: wadis, beaches, caves, or waterfalls\n• Enjoy local cuisine and traditional experiences\n\nFlexible itinerary based on your interests and chosen package.'
      },
      {
        day: 4,
        title: 'Return Journey or Extended Exploration',
        description: 'For multi-day tours: Continue your exploration or begin your return journey to Dubai/Abu Dhabi.\n\nFor day trips: Enjoy your final activities before returning to the UAE.\n\nAll packages include comfortable return transportation with border assistance.'
      }
    ],
    price: 0,
    duration: 'Customizable (Day trips to multi-day tours)',
    location: 'Oman (from Dubai & Abu Dhabi)',
    capacity: 'Flexible (Private tours available)',
    packageType: 'international',
    place: 'dubai', // Using 'dubai' temporarily - will still show on OMAN page due to location/title filtering
    packageCategory: 'Cultural',
    images: [
      { public_id: 'oman-tour-1', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Oman Landscape' },
      { public_id: 'oman-tour-2', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Oman Mountains' },
      { public_id: 'oman-tour-3', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Oman Coastline' },
      { public_id: 'oman-tour-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Oman Culture' }
    ],
    inclusions: [
      {
        category: 'Transportation',
        items: [
          'Private and well-maintained vehicles (SUVs, vans, or coaches)',
          'Experienced driver-guides familiar with cross-border routes',
          'Road trip from Dubai/Abu Dhabi to Oman and return'
        ]
      },
      {
        category: 'Border Assistance',
        items: [
          'Assistance with border permits and documentation',
          'Support during border crossing procedures'
        ]
      },
      {
        category: 'Tours & Activities',
        items: [
          'Guided tours based on chosen package',
          'Entrance fees to attractions',
          'Professional local guides'
        ]
      },
      {
        category: 'Accommodation',
        items: [
          'Handpicked accommodations (for multi-day tours)',
          'Options for various budget levels'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Visa & Documentation',
        items: ['Oman entry visa (assistance provided)']
      },
      {
        category: 'Meals',
        items: ['Meals (can be arranged upon request)']
      },
      {
        category: 'Personal Expenses',
        items: ['Personal expenses, shopping, and optional activities']
      },
      {
        category: 'Travel Insurance',
        items: ['Travel insurance (available upon request)']
      }
    ],
    transportation: [
      { type: 'Private Vehicle', vehicle: 'SUV/Van/Coach', description: 'Premium vehicles for comfortable cross-border road trips' }
    ],
    accommodation: [
      { city: 'Oman', hotel: 'Various options based on package', rooms: 'As per requirement', roomType: 'Standard/Luxury', nights: 'Customizable' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'musandam-dibba-tour-dubai-abu-dhabi',
    title: 'Musandam Dibba Tour from Dubai & Abu Dhabi',
    subtitle: 'Full-Day Dhow Cruise Experience | Sea, Mountains & Adventure',
    ideaFor: 'Families, couples, corporate groups, and leisure travelers looking for a peaceful yet exciting getaway from the city',
    about: 'The Dibba Musandam Tour is one of the most refreshing and scenic escapes from the UAE, offering a perfect blend of crystal-clear waters, dramatic fjord-like mountains, beach leisure, and soft adventure. Often referred to as the "Norway of Arabia," Musandam is a must-do experience for travelers seeking nature, relaxation, and unforgettable sea adventures: all in a single day. With Premium Dubai Tours, this full-day dhow cruise is thoughtfully curated to deliver comfort, seamless border assistance, exciting water activities, and warm Arabian hospitality.',
    services: 'Full-day dhow cruise, Swimming & snorkeling, Banana boat ride, Speed boat ride, Kayaking, Fishing, Beach leisure, Buffet lunch onboard, Border assistance, Professional crew',
    tourDetails: 'Overview\n\nThe Dibba Musandam Tour is one of the most refreshing and scenic escapes from the UAE, offering a perfect blend of crystal-clear waters, dramatic fjord-like mountains, beach leisure, and soft adventure. Often referred to as the "Norway of Arabia," Musandam is a must-do experience for travelers seeking nature, relaxation, and unforgettable sea adventures: all in a single day.\n\nWith Premium Dubai Tours, this full-day dhow cruise is thoughtfully curated to deliver comfort, seamless border assistance, exciting water activities, and warm Arabian hospitality. From swimming and snorkeling to banana boat rides and cave exploration, every moment is designed to create lifelong memories.\n\nThis tour is ideal for families, couples, corporate groups, and leisure travelers looking for a peaceful yet exciting getaway from the city.\n\nAbstract\n\nEscape the city and sail into a world of turquoise waters and rugged mountains on our Dibba Musandam Dhow Cruise Tour. Enjoy a scenic cruise, water sports, beach fun, buffet lunch onboard, and professional assistance from pickup to drop-off, making it one of the most popular one-day international excursions from Dubai and Abu Dhabi.',
    abstract: 'Escape the city and sail into a world of turquoise waters and rugged mountains on our Dibba Musandam Dhow Cruise Tour. Enjoy a scenic cruise, water sports, beach fun, buffet lunch onboard, and professional assistance from pickup to drop-off, making it one of the most popular one-day international excursions from Dubai and Abu Dhabi.',
    tourOverview: 'The Dibba Musandam Tour is one of the most refreshing and scenic escapes from the UAE, offering a perfect blend of crystal-clear waters, dramatic fjord-like mountains, beach leisure, and soft adventure. Often referred to as the "Norway of Arabia," Musandam is a must-do experience for travelers seeking nature, relaxation, and unforgettable sea adventures: all in a single day.\n\nWith Premium Dubai Tours, this full-day dhow cruise is thoughtfully curated to deliver comfort, seamless border assistance, exciting water activities, and warm Arabian hospitality. From swimming and snorkeling to banana boat rides and cave exploration, every moment is designed to create lifelong memories.',
    keyHighlights: [
      'Full-day dhow cruise through dramatic fjord-like mountains',
      'Crystal-clear turquoise waters perfect for swimming and snorkeling',
      'Water activities: banana boat, speed boat, kayaking, and fishing',
      'Beach leisure and relaxation time',
      'Buffet lunch served onboard',
      'Seamless border assistance and professional crew',
      'Scenic coastal cruising with cave visits',
      'Often referred to as the "Norway of Arabia"'
    ],
    hotelOptions: [
      'Full-Day Tour (No accommodation)',
      'Can be combined with overnight stays in Musandam'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round, subject to weather conditions',
      winter: 'October to April: Ideal weather for water activities and cruising',
      summer: 'May to September: Still enjoyable, with warm waters perfect for swimming'
    },
    whyChooseThisTrip: [
      'Perfect one-day escape from Dubai and Abu Dhabi',
      'Unique fjord-like mountain scenery',
      'Multiple water activities included',
      'Professional border assistance included',
      'Ideal for families, couples, and groups',
      'No need for overnight accommodation - perfect day trip'
    ],
    whyPremiumDubaiTours: [
      'Trusted premium tour operator',
      'Seamless border permit assistance',
      'Carefully selected dhow & crew',
      'High safety standards & quality service',
      'Transparent pricing with no hidden costs',
      'Personalized support from booking to return'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Full-Day Musandam Dibba Dhow Cruise',
        description: '07:00 AM – Pickup from your location in Dubai or Abu Dhabi\n(Exact pickup time will be confirmed one day prior to the tour)\n\n09:30 AM – Arrival at Dibba border & entry assistance by our team\n\n10:00 AM – Dhow reporting\n• Welcome drink\n• Program briefing\n\n10:30 AM – Dhow cruise begins\n• Scenic coastal cruising\n• After approx. 1 hour, dhow anchors for activities\n\nWater Activities & Beach Fun:\n• Swimming & snorkeling\n• Banana boat ride\n• Speed boat ride\n• Kayaking\n• Fishing\n• Relaxing beach time\n\n01:00 PM – Buffet lunch served onboard\n\n02:00 PM – Leisure cruising (1 hour)\n\n03:00 PM – Cave visit or fishing\n(Subject to sea conditions)\n\n03:30 PM – Evening tea & light snacks\n\n04:00 PM – Return to harbor & departure transfer'
      }
    ],
    price: 0,
    duration: 'Full Day (Approx. 9-10 hours)',
    location: 'Musandam, Oman (from Dubai & Abu Dhabi)',
    capacity: 'Flexible group sizes',
    packageType: 'international',
    place: 'dubai', // Using 'dubai' temporarily - will still show on OMAN page due to location/title filtering
    packageCategory: 'Cultural',
    images: [
      { public_id: 'musandam-dibba-1', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Musandam Fjords' },
      { public_id: 'musandam-dibba-2', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dhow Cruise' },
      { public_id: 'musandam-dibba-3', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Water Activities' },
      { public_id: 'musandam-dibba-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Musandam Scenery' }
    ],
    inclusions: [
      {
        category: 'Transportation',
        items: [
          'Pickup & drop-off from Dubai or Abu Dhabi',
          'Comfortable sharing vehicle with English-speaking driver-guide'
        ]
      },
      {
        category: 'Dhow Cruise',
        items: [
          '5–6 hours traditional dhow cruise',
          'Dedicated guest relation crew (English-speaking guide)',
          'Recorded instrumental music onboard'
        ]
      },
      {
        category: 'Meals & Beverages',
        items: [
          'Buffet lunch onboard',
          'Unlimited soft drinks & mineral water',
          'Fresh fruits & assorted packed snacks',
          'Evening tea & light snacks'
        ]
      },
      {
        category: 'Water Activities',
        items: [
          'Life jackets & snorkeling kits',
          'Banana boat ride',
          'Speed boat ride',
          'Kayaking',
          'Fishing',
          'Swimming & snorkeling'
        ]
      },
      {
        category: 'Border Assistance',
        items: [
          'Border entry assistance by our team',
          'Support with border permits and documentation'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Border Requirements',
        items: [
          'Border permission (mandatory for both resident and tourist visa holders)',
          'Passport & visa copy (must be submitted minimum 3 working days prior)',
          'Original passport (mandatory on the day of travel)'
        ]
      },
      {
        category: 'Personal Items',
        items: [
          'Swimwear and personal fishing equipment (recommended)',
          'Personal expenses'
        ]
      },
      {
        category: 'Insurance',
        items: [
          'Self-drive vehicles must be Oman insured'
        ]
      }
    ],
    transportation: [
      { type: 'Shared Vehicle', vehicle: 'Comfortable sharing vehicle', description: 'Pickup and drop-off from Dubai or Abu Dhabi with English-speaking driver-guide' },
      { type: 'Traditional Dhow', vehicle: 'Traditional dhow boat', description: '5-6 hours dhow cruise with professional crew' }
    ],
    accommodation: [
      { city: 'Musandam, Oman', hotel: 'Day trip (No accommodation)', rooms: 'N/A', roomType: 'N/A', nights: '0 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'salalah-tour-dubai-abu-dhabi',
    title: 'Salalah Tour from Dubai & Abu Dhabi',
    subtitle: '4 Days / 3 Nights | Nature, Culture & Coastal Escape',
    ideaFor: 'Travelers seeking a relaxed yet immersive experience with lush landscapes, pristine beaches, and rich Omani culture',
    about: 'Our Salalah Tour from Dubai and Abu Dhabi is a beautifully crafted getaway that showcases the lush landscapes, pristine beaches, dramatic mountains, and rich Omani culture of southern Oman. Known for its greenery, waterfalls, and monsoon charm, Salalah offers a refreshing contrast to desert landscapes. This 3 nights / 4 days private/sharing tour is ideal for travelers seeking a relaxed yet immersive experience. With premium accommodation, private transportation, and a dedicated driver-guide, this package delivers comfort, flexibility, and authenticity.',
    services: 'Private Toyota Prado with professional driver-guide, 2-bedroom villa accommodation, Daily breakfast, Sightseeing tours, Cultural market visits, Nature and adventure experiences',
    tourDetails: 'Overview\n\nOur Salalah Tour from Dubai and Abu Dhabi is a beautifully crafted getaway that showcases the lush landscapes, pristine beaches, dramatic mountains, and rich Omani culture of southern Oman. Known for its greenery, waterfalls, and monsoon charm, Salalah offers a refreshing contrast to desert landscapes.\n\nThis 3 nights / 4 days private/sharing tour is ideal for travelers seeking a relaxed yet immersive experience. With premium accommodation, private transportation, and a dedicated driver-guide, this package delivers comfort, flexibility, and authenticity.\n\nAbstract\n\nExperience Oman\'s hidden gem with our Salalah tour package featuring scenic beaches, wadis, mountains, cultural markets, and premium accommodation. Designed for small private groups, this tour blends nature, adventure, and heritage into a seamless travel experience.',
    abstract: 'Experience Oman\'s hidden gem with our Salalah tour package featuring scenic beaches, wadis, mountains, cultural markets, and premium accommodation. Designed for small private groups, this tour blends nature, adventure, and heritage into a seamless travel experience.',
    tourOverview: 'Our Salalah Tour from Dubai and Abu Dhabi is a beautifully crafted getaway that showcases the lush landscapes, pristine beaches, dramatic mountains, and rich Omani culture of southern Oman. Known for its greenery, waterfalls, and monsoon charm, Salalah offers a refreshing contrast to desert landscapes.\n\nThis 3 nights / 4 days private/sharing tour is ideal for travelers seeking a relaxed yet immersive experience. With premium accommodation, private transportation, and a dedicated driver-guide, this package delivers comfort, flexibility, and authenticity.',
    keyHighlights: [
      'Stay in a 2-bedroom villa at the resort',
      'Visit Mughsail Beach, Wadi Darbat & Jebel Samhan',
      'Witness Marneef Cave & natural water springs',
      'Experience the Anti-Gravity Point & Sinkhole',
      'Explore Haffa Souq & traditional Omani markets',
      'Private Toyota Prado with professional driver-guide',
      'Ideal mix of nature, adventure & culture',
      'Lush landscapes and monsoon charm (June-September)'
    ],
    hotelOptions: [
      'Gold Price - AED 1,500 per person',
      'Platinum Price - AED 2,350 per person',
      'Diamond Price - AED 3,350 per person'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round with different seasonal experiences',
      winter: 'June to September (Khareef season): Lush greenery, waterfalls, and misty weather',
      summer: 'October to March: Ideal for sightseeing and coastal exploration'
    },
    whyChooseThisTrip: [
      'Beautifully crafted getaway showcasing lush landscapes and pristine beaches',
      'Refreshing contrast to desert landscapes',
      'Ideal for travelers seeking relaxed yet immersive experience',
      'Premium accommodation in 2-bedroom villa',
      'Private transportation with dedicated driver-guide',
      'Perfect blend of nature, adventure, and culture'
    ],
    whyPremiumDubaiTours: [
      'Expert planning & private tours',
      'Premium accommodation options',
      'Experienced driver-guides',
      'Flexible itineraries',
      'Transparent pricing',
      'Dedicated customer support'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Departure from UAE',
        description: 'Evening pickup from Dubai or Abu Dhabi\n\nOvernight road journey to Salalah\n\nComfortable transportation with professional driver-guide for the scenic journey to southern Oman.'
      },
      {
        day: 2,
        title: 'Arrival & Coastal Wonders',
        description: 'Arrival in Salalah\n\nHotel check-in & refresh\n\nVisit Mughsail Beach - one of Salalah\'s most beautiful beaches with pristine white sand and turquoise waters\n\nExplore Marneef Cave & blowholes - natural rock formations with spectacular coastal views\n\nEvening at leisure to relax and enjoy the resort amenities'
      },
      {
        day: 3,
        title: 'Nature & Adventure',
        description: 'Visit Wadi Darbat waterfalls - stunning waterfalls surrounded by lush greenery, especially spectacular during Khareef season\n\nDrive to Jebel Samhan viewpoint - breathtaking mountain views overlooking the coastline\n\nExperience Anti-Gravity Point - a unique natural phenomenon where vehicles appear to roll uphill\n\nVisit Sinkhole - a natural wonder and geological marvel\n\nScenic drives through lush landscapes showcasing Salalah\'s natural beauty'
      },
      {
        day: 4,
        title: 'Culture & Shopping',
        description: 'Visit Haffa Souq - traditional Omani market offering local handicrafts, frankincense, and souvenirs\n\nExplore local Omani markets - experience authentic Omani culture and shop for traditional items\n\nReturn journey to UAE\n\nComfortable transfer back to Dubai or Abu Dhabi with memories of Salalah\'s natural beauty and cultural richness'
      }
    ],
    price: 1500,
    duration: '3 Nights / 4 Days',
    location: 'Salalah, Oman (from Dubai & Abu Dhabi)',
    capacity: 'Minimum 5 Adults',
    packageType: 'international',
    place: 'dubai', // Using 'dubai' temporarily - will still show on OMAN page due to location/title filtering
    packageCategory: 'Cultural',
    images: [
      { public_id: 'salalah-tour-1', url: 'https://images.unsplash.com/photo-1506905925346-21bda2d32bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Salalah Landscape' },
      { public_id: 'salalah-tour-2', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Salalah Beach' },
      { public_id: 'salalah-tour-3', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Wadi Darbat' },
      { public_id: 'salalah-tour-4', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Salalah Culture' }
    ],
    inclusions: [
      {
        category: 'Accommodation',
        items: [
          '2-night stay in a 2-bedroom villa at the resort',
          'Daily breakfast'
        ]
      },
      {
        category: 'Transportation',
        items: [
          'Private Toyota Prado for transfers',
          'Dedicated driver-guide',
          'Road journey from Dubai/Abu Dhabi to Salalah and return'
        ]
      },
      {
        category: 'Tours & Activities',
        items: [
          'All sightseeing as per itinerary',
          'Visit to Mughsail Beach',
          'Marneef Cave & blowholes exploration',
          'Wadi Darbat waterfalls visit',
          'Jebel Samhan viewpoint',
          'Anti-Gravity Point experience',
          'Sinkhole visit',
          'Haffa Souq and local market visits',
          'All tours are private unless mentioned'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Visa & Documentation',
        items: ['Visa (if applicable)']
      },
      {
        category: 'Meals',
        items: ['Meals not mentioned (only breakfast included)']
      },
      {
        category: 'Additional Services',
        items: [
          'Extra local transfers in the UAE (Subject to getting approval)',
          'Personal expenses',
          'Optional activities not mentioned'
        ]
      }
    ],
    transportation: [
      { type: 'Private Vehicle', vehicle: 'Toyota Prado', description: 'Private Toyota Prado with professional driver-guide for the entire journey' }
    ],
    accommodation: [
      { city: 'Salalah, Oman', hotel: 'Resort (2-Bedroom Villa)', rooms: '2-Bedroom Villa', roomType: 'Villa', nights: '3 Nights' }
    ],
    reviews: [],
    bookings: 0,
    rating: 5.0
  }
];

// Attraction packages data
const getAttractionPackages = () => [
  {
    _id: 'burj-khalifa-tickets',
    title: 'Burj Khalifa Tickets',
    subtitle: 'At the Top & At the Top SKY Experience',
    ideaFor: 'First-time visitors, photographers, and travelers seeking panoramic views of Dubai',
    about: 'Experience breathtaking views from the world\'s tallest building with our Burj Khalifa "At the Top" and "At the Top SKY" tickets. Choose between Levels 124 & 125 or upgrade to include Level 148 for the ultimate sky-high experience.',
    services: 'Burj Khalifa At the Top tickets (Levels 124 & 125), Burj Khalifa At the Top SKY tickets (Levels 124, 125 & 148), Prime and non-prime hour options, Flexible booking options',
    tourDetails: 'Experience breathtaking views from the world\'s tallest building with our Burj Khalifa "At the Top" and "At the Top SKY" tickets. Below are the standard ticket prices, valid for ticket-only bookings.\n\nBurj Khalifa – At the Top (Levels 124 & 125)\nNon-Prime Hours: AED 200 per person\nPrime Hours: AED 250 per person\n\nBurj Khalifa – At the Top SKY (Levels 124, 125 & 148)\nNon-Prime Hours: AED 410 per person\nPrime Hours: AED 510 per person\n\nImportant Notes:\n• Prices mentioned are for tickets only\n• Transfers are not included — private or sharing transfers can be arranged on request\n• Ticket prices may increase during peak seasons, New Year, public holidays, special events, and exhibitions\n• Prime and non-prime hour timings are defined by Burj Khalifa management\n• Tickets are subject to availability at the time of booking',
    abstract: 'Experience breathtaking views from the world\'s tallest building with our Burj Khalifa "At the Top" and "At the Top SKY" tickets. Choose between Levels 124 & 125 or upgrade to include Level 148 for the ultimate sky-high experience.',
    tourOverview: 'Burj Khalifa stands as an architectural marvel and the world\'s tallest building. Our tickets provide access to the observation decks offering panoramic views of Dubai\'s skyline, desert, and coastline. Choose from standard "At the Top" access to Levels 124 & 125, or upgrade to "At the Top SKY" which includes exclusive access to Level 148, the highest observation deck.',
    keyHighlights: [
      'Access to world\'s tallest building',
      'Panoramic views of Dubai skyline',
      'At the Top (Levels 124 & 125)',
      'At the Top SKY (Levels 124, 125 & 148)',
      'Prime and non-prime hour options',
      'Flexible booking available'
    ],
    hotelOptions: [
      'At the Top - Non-Prime Hours (AED 200)',
      'At the Top - Prime Hours (AED 250)',
      'At the Top SKY - Non-Prime Hours (AED 410)',
      'At the Top SKY - Prime Hours (AED 510)'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round. Prime hours offer sunset and evening views.',
      winter: 'Prime hours: Best for sunset and evening views (subject to availability)',
      summer: 'Non-prime hours: Great value during daytime visits'
    },
    whyChooseThisTrip: [
      'Iconic Dubai landmark experience',
      'Breathtaking panoramic views',
      'Multiple ticket options to suit your budget',
      'Flexible prime and non-prime hour choices',
      'Perfect for first-time visitors',
      'Ideal for photography enthusiasts'
    ],
    whyPremiumDubaiTours: [
      'Authorized ticket supplier',
      'Clear pricing with no hidden fees',
      'Expert guidance on best visiting times',
      'Optional transfer arrangements available',
      'Transparent booking process',
      'Reliable ticket confirmation'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Burj Khalifa Visit',
        description: 'Visit the world\'s tallest building and experience:\n\n• At the Top (Levels 124 & 125): Access to two observation decks with stunning 360-degree views\n• At the Top SKY (Levels 124, 125 & 148): Includes exclusive access to Level 148, the highest observation deck\n• Interactive exhibits and multimedia presentations\n• Panoramic views of Dubai\'s skyline, desert, and coastline\n• Prime hours: Sunset and evening views (subject to availability)\n• Non-prime hours: Daytime visits with great value pricing'
      }
    ],
    price: 200,
    duration: '1-2 Hours',
    location: 'Dubai, UAE',
    capacity: 'Flexible',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Cultural',
    images: [
      { public_id: 'burj-khalifa-1', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'burj-khalifa-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline from Burj Khalifa' },
      { public_id: 'burj-khalifa-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa Observation Deck' },
      { public_id: 'burj-khalifa-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Views' }
    ],
    inclusions: [
      {
        category: 'Ticket Options',
        items: [
          'Burj Khalifa At the Top ticket (Levels 124 & 125)',
          'Burj Khalifa At the Top SKY ticket (Levels 124, 125 & 148)',
          'Access to observation decks',
          'Interactive exhibits and multimedia presentations'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Transfers',
        items: ['Transfers are not included (can be arranged on request)']
      },
      {
        category: 'Additional Services',
        items: [
          'Meals and beverages',
          'Personal expenses',
          'Optional add-ons'
        ]
      },
      {
        category: 'Important Notes',
        items: [
          'Prices are for tickets only',
          'Ticket prices may increase during peak seasons, New Year, public holidays, special events',
          'Prime and non-prime hour timings are defined by Burj Khalifa management',
          'Tickets are subject to availability at the time of booking'
        ]
      }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'burj-khalifa-at-the-top-non-prime',
    title: 'Burj Khalifa – At the Top: Non-Prime Hours',
    subtitle: 'Burj Khalifa – At The Top (Levels 124 & 125) | Non-Prime Hours',
    ideaFor: 'Travelers who prefer a relaxed visit during quieter hours while still enjoying the full observation deck experience',
    about: 'Visit the iconic Burj Khalifa, the tallest building in the world, and experience Dubai from an extraordinary height. The At The Top (Levels 124 & 125) non-prime hour ticket is the most popular and value-for-money way to enjoy breathtaking panoramic views of Dubai\'s skyline, desert, and coastline.',
    services: 'Burj Khalifa At The Top tickets (Levels 124 & 125), Non-Prime Hours access, High-speed elevator ride, Interactive displays and telescopes, Indoor and outdoor observation decks',
    tourDetails: 'Visit the iconic Burj Khalifa, the tallest building in the world, and experience Dubai from an extraordinary height. The At The Top (Levels 124 & 125) non-prime hour ticket is the most popular and value-for-money way to enjoy breathtaking panoramic views of Dubai\'s skyline, desert, and coastline.\n\nThis ticket is ideal for travelers who prefer a relaxed visit during quieter hours while still enjoying the full observation deck experience.\n\nTickets can be purchased online through our website, email, or WhatsApp. Guests who wish to include private transfers or a guided experience are encouraged to contact us for customized arrangements.',
    abstract: 'The Burj Khalifa – At The Top (Levels 124 & 125) Non-Prime Hours ticket allows visitors to access the main observation decks via high-speed elevators, offering uninterrupted views from indoor and outdoor platforms. With interactive displays and telescopes, this experience is suitable for families, couples, and first-time visitors to Dubai.',
    tourOverview: 'The Burj Khalifa – At The Top (Levels 124 & 125) Non-Prime Hours ticket allows visitors to access the main observation decks via high-speed elevators, offering uninterrupted views from indoor and outdoor platforms. With interactive displays and telescopes, this experience is suitable for families, couples, and first-time visitors to Dubai.',
    keyHighlights: [
      'Access to Levels 124 & 125 of Burj Khalifa',
      'Ride the world\'s fastest high-speed elevator',
      'Enjoy 360-degree views of Dubai city',
      'Indoor and outdoor observation decks',
      'Interactive screens and digital telescopes',
      'Best option for budget-friendly sightseeing',
      'Located in Downtown Dubai, next to Dubai Mall'
    ],
    hotelOptions: [
      'Adult: AED 200',
      'Child (3–8 years): AED 150',
      'Children below 3 years: Free of charge'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round. Non-Prime Hours: 07:00 AM – 11:30 AM, 08:30 PM – 11:00 PM',
      winter: 'Non-Prime Hours: 07:00 AM – 11:30 AM, 08:30 PM – 11:00 PM (Exact entry time depends on availability at the time of booking)',
      summer: 'Non-Prime Hours: 07:00 AM – 11:30 AM, 08:30 PM – 11:00 PM (Exact entry time depends on availability at the time of booking)'
    },
    whyChooseThisTrip: [
      'Most popular and value-for-money option',
      'Relaxed visit during quieter hours',
      'Full observation deck experience',
      'Budget-friendly sightseeing',
      'Perfect for families and first-time visitors',
      'Convenient location in Downtown Dubai'
    ],
    whyPremiumDubaiTours: [
      'Authorized ticket supplier',
      'Clear pricing with no hidden fees',
      'Expert guidance on best visiting times',
      'Optional transfer arrangements available',
      'Transparent booking process',
      'Reliable ticket confirmation'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Burj Khalifa At The Top Visit - Non-Prime Hours',
        description: 'Visit the iconic Burj Khalifa, the tallest building in the world, and experience Dubai from an extraordinary height.\n\n• Access to Levels 124 & 125 of Burj Khalifa\n• Ride the world\'s fastest high-speed elevator\n• Enjoy 360-degree views of Dubai city\n• Indoor and outdoor observation decks\n• Interactive screens and digital telescopes\n• Non-Prime Hours: 07:00 AM – 11:30 AM, 08:30 PM – 11:00 PM\n\n(Exact entry time depends on availability at the time of booking)'
      }
    ],
    price: 200,
    duration: '1-2 Hours',
    location: 'Downtown Dubai, next to Dubai Mall',
    capacity: 'Flexible',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Cultural',
    images: [
      { public_id: 'burj-khalifa-non-prime-1', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa' },
      { public_id: 'burj-khalifa-non-prime-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline from Burj Khalifa' },
      { public_id: 'burj-khalifa-non-prime-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa Observation Deck' },
      { public_id: 'burj-khalifa-non-prime-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Views' }
    ],
    inclusions: [
      {
        category: 'Ticket Inclusions',
        items: [
          'Entry ticket to Burj Khalifa – At The Top (Levels 124 & 125)',
          'Access during Non-Prime Hours',
          'Use of observation decks and viewing telescopes'
        ]
      },
      {
        category: 'Timings (Non-Prime Hours)',
        items: [
          '07:00 AM – 11:30 AM',
          '08:30 PM – 11:00 PM',
          '(Exact entry time depends on availability at the time of booking)'
        ]
      },
      {
        category: 'Pricing (Per Person)',
        items: [
          'Adult: AED 200',
          'Child (3–8 years): AED 150',
          'Children below 3 years: Free of charge'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Transfers',
        items: ['This ticket is sold without transfers by default (private transfer options available on request)']
      },
      {
        category: 'Terms & Conditions',
        items: [
          'Tickets are subject to availability',
          'Entry is valid only for the selected date and time slot',
          'Tickets are non-transferable and non-refundable',
          'Guests must arrive at least 15 minutes before the scheduled time',
          'Large bags, food, and drinks are not permitted inside',
          'Prime and non-prime hour definitions are set by Burj Khalifa management',
          'Management reserves the right to modify timings or access levels'
        ]
      },
      {
        category: 'Child Policy',
        items: [
          'Children below 3 years: Free of charge',
          'Children from 3 to 8 years: Child ticket applies',
          'Children above 8 years: Adult ticket applies',
          'Children under 16 years must be accompanied by an adult'
        ]
      }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'burj-khalifa-at-the-top-sky-non-prime',
    title: 'At The Top SKY (Levels 124, 125 & 148) – Non-Prime Hours',
    subtitle: 'Exclusive SKY Level 148 Experience | Non-Prime Hours',
    ideaFor: 'Travelers seeking a refined experience, combining luxury, comfort, and uninterrupted panoramic views of Dubai\'s skyline',
    about: 'Experience Dubai from extraordinary heights with At The Top SKY, the most exclusive observation deck experience at Burj Khalifa. This non-prime hour ticket offers access to Levels 124, 125, and the premium SKY Level 148, allowing you to enjoy breathtaking views with fewer crowds and a more relaxed atmosphere.',
    services: 'At The Top SKY tickets (Levels 124, 125 & 148), Non-Prime Hours access, Priority elevator access, Dedicated SKY lounge experience, Complimentary refreshments, Personalized guest hosting',
    tourDetails: 'Experience Dubai from extraordinary heights with At The Top SKY, the most exclusive observation deck experience at Burj Khalifa. This non-prime hour ticket offers access to Levels 124, 125, and the premium SKY Level 148, allowing you to enjoy breathtaking views with fewer crowds and a more relaxed atmosphere.\n\nIdeal for travelers seeking a refined experience, this package combines luxury, comfort, and uninterrupted panoramic views of Dubai\'s skyline.\n\nNote: Transfers are not included. Guests may contact Premium Dubai Tours to arrange transportation if required.',
    abstract: 'Access Burj Khalifa Levels 124, 125, and the exclusive SKY Level 148 during non-prime hours for a quieter, premium viewing experience above the clouds.',
    tourOverview: 'Access Burj Khalifa Levels 124, 125, and the exclusive SKY Level 148 during non-prime hours for a quieter, premium viewing experience above the clouds. This premium experience includes dedicated SKY lounge access, priority elevator service, and complimentary refreshments at Level 148.',
    keyHighlights: [
      'Access to Burj Khalifa Levels 124, 125 & SKY Level 148',
      'Non-prime hours for a calm and less crowded visit',
      'Dedicated SKY lounge experience',
      'Priority elevator access',
      'Indoor and outdoor observation decks',
      'Complimentary refreshments at Level 148',
      'Personalized guest hosting on SKY Level'
    ],
    hotelOptions: [
      'Adult (12 years & above): AED 399',
      'Child (4–11 years): AED 399',
      'Infant (Below 4 years): Free of charge'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round. Non-Prime Hours offer a quieter, premium viewing experience with fewer crowds.',
      winter: 'Non-Prime Hours: Best for a calm and less crowded visit (subject to availability)',
      summer: 'Non-Prime Hours: Great value during quieter periods'
    },
    whyChooseThisTrip: [
      'Most exclusive observation deck experience',
      'Access to premium SKY Level 148',
      'Quieter, less crowded visit during non-prime hours',
      'Dedicated SKY lounge with complimentary refreshments',
      'Priority elevator access',
      'Personalized guest hosting',
      'Refined luxury experience'
    ],
    whyPremiumDubaiTours: [
      'Authorized ticket supplier',
      'Clear pricing with no hidden fees',
      'Expert guidance on best visiting times',
      'Optional transfer arrangements available',
      'Transparent booking process',
      'Reliable ticket confirmation'
    ],
    itinerary: [
      {
        day: 1,
        title: 'At The Top SKY Visit - Non-Prime Hours',
        description: 'Experience Dubai from extraordinary heights with At The Top SKY, the most exclusive observation deck experience at Burj Khalifa.\n\n• Access to Burj Khalifa Levels 124, 125 & SKY Level 148\n• Priority elevator access\n• Dedicated SKY lounge experience\n• Complimentary refreshments at Level 148\n• Indoor and outdoor observation decks\n• Personalized guest hosting on SKY Level\n• Non-prime hours for a calm and less crowded visit'
      }
    ],
    price: 399,
    duration: '1-2 Hours',
    location: 'Downtown Dubai, next to Dubai Mall',
    capacity: 'Flexible',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Cultural',
    images: [
      { public_id: 'burj-khalifa-sky-1', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa SKY Level' },
      { public_id: 'burj-khalifa-sky-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline from SKY Level 148' },
      { public_id: 'burj-khalifa-sky-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'SKY Lounge Experience' },
      { public_id: 'burj-khalifa-sky-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Premium Observation Deck' }
    ],
    inclusions: [
      {
        category: 'Ticket Inclusions',
        items: [
          'Entry to At The Top (Levels 124 & 125)',
          'Exclusive access to At The Top SKY (Level 148)',
          'Priority access and hosted experience',
          'Complimentary refreshments at SKY Lounge',
          'Access to indoor and outdoor viewing decks'
        ]
      },
      {
        category: 'Note',
        items: [
          'Transfers are not included. Guests may contact Premium Dubai Tours to arrange transportation if required.'
        ]
      },
      {
        category: 'Pricing (Per Person)',
        items: [
          'Adult (12 years & above): AED 399',
          'Child (4–11 years): AED 399',
          'Infant (Below 4 years): Free of charge'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Transfers',
        items: ['Transfers are not included (can be arranged on request)']
      },
      {
        category: 'Terms & Conditions',
        items: [
          'Subject to availability at the time of booking',
          'Tickets are valid only for the selected date and time slot',
          'Non-refundable and non-transferable once confirmed',
          'Late arrival may result in denied entry without refund',
          'Management reserves the right to adjust timings for operational reasons'
        ]
      },
      {
        category: 'Child Policy',
        items: [
          'Children below 4 years enter free of charge',
          'Children aged 4–11 years are charged adult rates',
          'Children under 15 years must be accompanied by an adult'
        ]
      }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'burj-khalifa-at-the-top-sky-prime',
    title: 'At The Top SKY (Levels 124, 125 & 148) – Prime Hours',
    subtitle: 'Exclusive SKY Level 148 Experience | Prime Hours (Sunset & Evening)',
    ideaFor: 'Travelers who want to enjoy iconic skyline views, golden-hour photography, and world-class hospitality at the highest public observation deck of Burj Khalifa',
    about: 'Witness Dubai at its most spectacular with At The Top SKY – Prime Hours, offering access to Levels 124, 125, and the exclusive SKY Level 148 during the most sought-after viewing times, including sunset and early evening.',
    services: 'At The Top SKY tickets (Levels 124, 125 & 148), Prime Hours access (sunset & evening slots), Priority fast-track elevator access, Exclusive SKY Lounge hospitality, Complimentary refreshments, Perfect for sunset and night photography',
    tourDetails: 'Witness Dubai at its most spectacular with At The Top SKY – Prime Hours, offering access to Levels 124, 125, and the exclusive SKY Level 148 during the most sought-after viewing times, including sunset and early evening.\n\nThis premium experience is perfect for travelers who want to enjoy iconic skyline views, golden-hour photography, and world-class hospitality at the highest public observation deck of Burj Khalifa.\n\nNote: Transfers are not included. Transportation can be arranged upon request through Premium Dubai Tours.',
    abstract: 'Visit Burj Khalifa Levels 124, 125, and SKY Level 148 during prime hours for unforgettable sunset and evening views of Dubai.',
    tourOverview: 'Visit Burj Khalifa Levels 124, 125, and SKY Level 148 during prime hours for unforgettable sunset and evening views of Dubai. This premium experience includes priority fast-track elevator access, exclusive SKY Lounge hospitality, and complimentary refreshments at Level 148.',
    keyHighlights: [
      'Entry to Levels 124, 125 & SKY Level 148',
      'Prime-hour access (sunset & evening slots)',
      'Priority fast-track elevator access',
      'Exclusive SKY Lounge hospitality',
      'Complimentary refreshments at Level 148',
      'Indoor and outdoor panoramic viewing areas',
      'Perfect for sunset and night photography'
    ],
    hotelOptions: [
      'Adult (12 years & above): AED 659',
      'Child (4–11 years): AED 659',
      'Infant (Below 4 years): Free of charge'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round. Prime Hours offer the most spectacular sunset and evening views of Dubai.',
      winter: 'Prime Hours: Best for sunset and evening views, golden-hour photography (subject to availability)',
      summer: 'Prime Hours: Spectacular sunset and evening views (advance booking recommended)'
    },
    whyChooseThisTrip: [
      'Most spectacular viewing times (sunset & evening)',
      'Access to premium SKY Level 148',
      'Perfect for golden-hour photography',
      'Exclusive SKY Lounge hospitality',
      'Priority fast-track elevator access',
      'Complimentary refreshments',
      'World-class hospitality experience'
    ],
    whyPremiumDubaiTours: [
      'Authorized ticket supplier',
      'Clear pricing with no hidden fees',
      'Expert guidance on best visiting times',
      'Optional transfer arrangements available',
      'Transparent booking process',
      'Reliable ticket confirmation',
      'Advance booking assistance for prime slots'
    ],
    itinerary: [
      {
        day: 1,
        title: 'At The Top SKY Visit - Prime Hours',
        description: 'Witness Dubai at its most spectacular with At The Top SKY – Prime Hours.\n\n• Entry to Levels 124, 125 & SKY Level 148\n• Prime-hour access (sunset & evening slots)\n• Priority fast-track elevator access\n• Exclusive SKY Lounge hospitality\n• Complimentary refreshments at Level 148\n• Indoor and outdoor panoramic viewing areas\n• Perfect for sunset and night photography\n\nNote: Prime hour slots sell out quickly; advance booking recommended.'
      }
    ],
    price: 659,
    duration: '1-2 Hours',
    location: 'Downtown Dubai, next to Dubai Mall',
    capacity: 'Flexible',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Cultural',
    images: [
      { public_id: 'burj-khalifa-sky-prime-1', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa SKY Level Prime Hours' },
      { public_id: 'burj-khalifa-sky-prime-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Sunset Views from SKY Level 148' },
      { public_id: 'burj-khalifa-sky-prime-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'SKY Lounge Prime Hours' },
      { public_id: 'burj-khalifa-sky-prime-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Evening Views from Burj Khalifa' }
    ],
    inclusions: [
      {
        category: 'Ticket Inclusions',
        items: [
          'Admission to At The Top (Levels 124 & 125)',
          'Premium access to At The Top SKY (Level 148)',
          'Priority access and hosted SKY experience',
          'Complimentary refreshments',
          'Access to observation decks'
        ]
      },
      {
        category: 'Note',
        items: [
          'Transfers are not included. Transportation can be arranged upon request through Premium Dubai Tours.'
        ]
      },
      {
        category: 'Pricing (Per Person)',
        items: [
          'Adult (12 years & above): AED 659',
          'Child (4–11 years): AED 659',
          'Infant (Below 4 years): Free of charge'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Transfers',
        items: ['Transfers are not included (can be arranged on request)']
      },
      {
        category: 'Terms & Conditions',
        items: [
          'Subject to availability at the time of booking',
          'Prime hour slots sell out quickly; advance booking recommended',
          'Tickets are non-refundable and non-transferable',
          'Late arrivals may not be accommodated',
          'Timings may change due to operational or safety reasons'
        ]
      },
      {
        category: 'Child Policy',
        items: [
          'Children below 4 years enter free of charge',
          'Children aged 4–11 years are charged adult rates',
          'Children under 15 years must be accompanied by an adult'
        ]
      }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5.0
  },
  {
    _id: 'burj-khalifa-at-the-top-prime',
    title: 'Burj Khalifa – At The Top (Levels 124 & 125) | Prime Hours',
    subtitle: 'Prime Hours Experience | Sunset & Evening Views',
    ideaFor: 'Travelers looking for the best photo opportunities and a vibrant atmosphere at the world\'s tallest building',
    about: 'Experience Dubai\'s most iconic landmark during the most sought-after visiting times with the Burj Khalifa – At The Top (Levels 124 & 125) Prime Hours ticket. This option allows you to witness Dubai at its most magical moments: sunset, golden hour, and early evening, when the city lights begin to sparkle.\n\nPrime hour tickets are perfect for travelers looking for the best photo opportunities and a vibrant atmosphere at the world\'s tallest building.\n\nTickets can be purchased through our website, email, or WhatsApp. Guests who wish to include private transfers or a fully assisted visit are encouraged to contact us for customized arrangements.',
    services: 'Burj Khalifa At The Top tickets (Levels 124 & 125), Prime Hours access (sunset & evening), High-speed elevator ride, Indoor and outdoor observation decks, Interactive displays and telescopes, Perfect for sunset and night photography',
    tourDetails: 'Experience Dubai\'s most iconic landmark during the most sought-after visiting times with the Burj Khalifa – At The Top (Levels 124 & 125) Prime Hours ticket. This option allows you to witness Dubai at its most magical moments: sunset, golden hour, and early evening, when the city lights begin to sparkle.\n\nPrime hour tickets are perfect for travelers looking for the best photo opportunities and a vibrant atmosphere at the world\'s tallest building.\n\nTickets can be purchased through our website, email, or WhatsApp. Guests who wish to include private transfers or a fully assisted visit are encouraged to contact us for customized arrangements.',
    abstract: 'The Prime Hours ticket for Burj Khalifa – At The Top (Levels 124 & 125) grants access to the main observation decks during peak viewing times. Ride the high-speed elevator and step onto indoor and outdoor viewing platforms to enjoy uninterrupted panoramic views of Dubai\'s skyline, desert, and Arabian Gulf at its most stunning hours.',
    tourOverview: 'The Prime Hours ticket for Burj Khalifa – At The Top (Levels 124 & 125) grants access to the main observation decks during peak viewing times. Ride the high-speed elevator and step onto indoor and outdoor viewing platforms to enjoy uninterrupted panoramic views of Dubai\'s skyline, desert, and Arabian Gulf at its most stunning hours.',
    keyHighlights: [
      'Access to Levels 124 & 125 of Burj Khalifa',
      'Entry during Prime Viewing Hours (sunset & evening)',
      'Ride the world\'s fastest high-speed elevator',
      'Indoor and outdoor observation decks',
      'Unmatched sunset and night city views',
      'Interactive displays and viewing telescopes',
      'Located in Downtown Dubai, next to Dubai Mall'
    ],
    hotelOptions: [
      'Adult: AED 260',
      'Child (3–8 years): AED 210',
      'Children below 3 years: Free of charge'
    ],
    bestTimeToVisit: {
      yearRound: 'Available year-round. Prime Hours: 12:00 PM – 08:00 PM (Sunset hours are the most popular and fill quickly)',
      winter: 'Prime Hours: 12:00 PM – 08:00 PM. Sunset hours are the most popular and fill quickly. Exact entry time is subject to availability at the time of booking.',
      summer: 'Prime Hours: 12:00 PM – 08:00 PM. Sunset hours are the most popular and fill quickly. Exact entry time is subject to availability at the time of booking.'
    },
    whyChooseThisTrip: [
      'Most sought-after visiting times (sunset & evening)',
      'Best photo opportunities during golden hour',
      'Vibrant atmosphere at the world\'s tallest building',
      'Unmatched sunset and night city views',
      'Perfect for photography enthusiasts',
      'Magical moments when city lights sparkle',
      'Prime viewing experience'
    ],
    whyPremiumDubaiTours: [
      'Authorized ticket supplier',
      'Clear pricing with no hidden fees',
      'Expert guidance on best visiting times',
      'Optional transfer arrangements available',
      'Transparent booking process',
      'Reliable ticket confirmation',
      'Advance booking assistance for prime slots'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Burj Khalifa At The Top Visit - Prime Hours',
        description: 'Experience Dubai\'s most iconic landmark during the most sought-after visiting times.\n\n• Access to Levels 124 & 125 of Burj Khalifa\n• Entry during Prime Viewing Hours (sunset & evening)\n• Ride the world\'s fastest high-speed elevator\n• Indoor and outdoor observation decks\n• Unmatched sunset and night city views\n• Interactive displays and viewing telescopes\n• Prime Hours: 12:00 PM – 08:00 PM\n\n(Sunset hours are the most popular and fill quickly. Exact entry time is subject to availability at the time of booking.)'
      }
    ],
    price: 260,
    duration: '1-2 Hours',
    location: 'Downtown Dubai, next to Dubai Mall',
    capacity: 'Flexible',
    packageType: 'international',
    place: 'dubai',
    packageCategory: 'Cultural',
    images: [
      { public_id: 'burj-khalifa-prime-1', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Burj Khalifa Prime Hours' },
      { public_id: 'burj-khalifa-prime-2', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Sunset Views from Burj Khalifa' },
      { public_id: 'burj-khalifa-prime-3', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Evening Views from Burj Khalifa' },
      { public_id: 'burj-khalifa-prime-4', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', alt: 'Dubai Skyline at Night' }
    ],
    inclusions: [
      {
        category: 'Ticket Inclusions',
        items: [
          'Entry ticket to Burj Khalifa – At The Top (Levels 124 & 125)',
          'Access during Prime Hours',
          'Use of observation decks and digital telescopes'
        ]
      },
      {
        category: 'Timings (Prime Hours)',
        items: [
          '12:00 PM – 08:00 PM',
          '(Sunset hours are the most popular and fill quickly)',
          'Exact entry time is subject to availability at the time of booking.'
        ]
      },
      {
        category: 'Pricing (Per Person)',
        items: [
          'Adult: AED 260',
          'Child (3–8 years): AED 210',
          'Children below 3 years: Free of charge'
        ]
      }
    ],
    exclusions: [
      {
        category: 'Transfers',
        items: ['Tickets are sold without transfers by default (Private pickup and drop-off can be arranged on request)']
      },
      {
        category: 'Terms & Conditions',
        items: [
          'Tickets are subject to availability, especially during sunset hours',
          'Entry is valid only for the selected date and time slot',
          'Tickets are non-refundable and non-transferable',
          'Guests must arrive at least 15 minutes before the scheduled time',
          'Large bags, outside food, and drinks are not permitted',
          'Prime hour definition is determined by Burj Khalifa management',
          'Management reserves the right to adjust timings or access levels'
        ]
      },
      {
        category: 'Child Policy',
        items: [
          'Children below 3 years: Free of charge',
          'Children from 3 to 8 years: Child ticket applies',
          'Children above 8 years: Adult ticket applies',
          'Children under 16 years must be accompanied by an adult'
        ]
      },
      {
        category: 'Add On',
        items: [
          'Highly recommended to combine with Dubai Mall, Fountain Show, or Downtown dining'
        ]
      }
    ],
    transportation: [],
    accommodation: [],
    reviews: [],
    bookings: 0,
    rating: 5.0
  }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    if (!isConnected()) {
      return res.status(503).json({
        success: false,
        error: 'Database not available'
      });
    }

    const regularPackages = getRegularPackages();
    const premiumPackages = getPremiumPackages();
    const luxuryPackages = getLuxuryPackages();
    const adventurePackages = getAdventurePackages();
    const omanPackages = getOmanPackages();
    const attractionPackages = getAttractionPackages();
    const allPackages = [...regularPackages, ...premiumPackages, ...luxuryPackages, ...adventurePackages, ...omanPackages, ...attractionPackages];

    const results = {
      created: [],
      skipped: [],
      errors: []
    };

    for (const pkg of allPackages) {
      try {
        // Check if package already exists by title (more reliable than _id)
        const existing = await Package.findOne({ title: pkg.title });
        
        if (existing) {
          results.skipped.push(pkg.title || pkg._id);
          continue;
        }

        // Remove _id from package data to let MongoDB generate proper ObjectId
        const { _id, ...packageData } = pkg;

        // Create new package
        const newPackage = new Package(packageData);
        await newPackage.save();
        results.created.push(pkg.title || pkg._id);
      } catch (error) {
        console.error(`Error seeding package ${pkg.title || pkg._id}:`, error);
        results.errors.push({ title: pkg.title || pkg._id, error: error.message });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Packages seeded successfully',
      results: {
        total: allPackages.length,
        created: results.created.length,
        skipped: results.skipped.length,
        errors: results.errors.length
      },
      details: results
    });
  } catch (error) {
    console.error('Error seeding packages:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
