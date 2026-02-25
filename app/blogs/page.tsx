'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, User, Eye, Heart, Share2, ArrowRight, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage?: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  views: number;
  likes: number;
  tags: string[];
}

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setBlogs(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Hardcoded blogs fallback (will be removed after seeding)
  const hardcodedBlogs = [
    {
      id: 'dubai-stopover-tour',
      title: "Dubai Stopover Tour – Make the Most of Your Layover in Dubai",
      excerpt: "Long international journeys often come with extended layovers, and for many travelers, those hours feel like lost time, spent waiting inside an airport lounge or watching the clock tick between flights. But if your journey routes through Dubai, a layover doesn't have to be a pause.",
      content: `Long international journeys often come with extended layovers, and for many travelers, those hours feel like lost time, spent waiting inside an airport lounge or watching the clock tick between flights. But if your journey routes through Dubai, a layover doesn't have to be a pause. With the right planning, it can become a highlight of your trip.

A Dubai stopover tour allows transit passengers to step beyond the airport and experience the city's iconic skyline, cultural heritage, and world-class attractions, even if they have only a few hours or a single night. Dubai is one of the very few global transit hubs where exploring the city during a layover is not only possible but genuinely rewarding.

Whether you are a business traveler with a tight connection, a leisure traveler on a long-haul flight, or a first-time visitor curious about the city, a well-organized Dubai transit tour can turn waiting time into a meaningful travel experience.`,
      author: "Premium Dubai Tours",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      publishDate: "2024-02-20",
      readTime: "15 min read",
      category: "Travel Guide",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      views: 3200,
      likes: 245,
      tags: ["Dubai", "Stopover", "Layover", "Transit", "Travel Guide"]
    },
    {
      id: 'dubai-tour-packages-budget-friendly',
      title: "Dubai Tour Packages - Budget Friendly Holidays from 1 Night to 7 Nights",
      excerpt: "Dubai is one of the few destinations in the world that successfully balances modern luxury with cultural heritage, family-friendly attractions with romantic experiences, and short stopovers with extended holidays.",
      content: `Dubai Tour Packages - Budget Friendly Holidays from 1 Night to 7 Nights

Dubai is one of the few destinations in the world that successfully balances modern luxury with cultural heritage, family-friendly attractions with romantic experiences, and short stopovers with extended holidays. From iconic skyscrapers and desert landscapes to traditional markets and waterfront promenades, the city offers a complete travel experience within a compact and well-connected geography.

For travelers planning their first visit, choosing the right Dubai tour packages can make a significant difference. Well-structured itineraries help visitors explore the city comfortably, avoid unnecessary expenses, and experience Dubai's highlights without confusion or time pressure. This is where Dubai regular tour packages become especially valuable.

Designed to be practical, budget-friendly, and experience-focused, regular tour packages cover everything from short 1-night stopovers to immersive 7-night holidays. They combine essential sightseeing, guided tours, shared experiences, and comfortable accommodations—making them ideal for families, couples, and international visitors who want clarity and value.

Why Choosing the Right Dubai Tour Package Matters

Dubai is not a destination where "seeing everything in one day" is realistic. Attractions are diverse, and experiences vary widely, from desert safaris and cultural districts to theme parks and luxury malls.

A well-designed Dubai tour package helps travelers:
• Optimize sightseeing time
• Avoid overpaying for individual services
• Travel comfortably between attractions
• Experience both modern and traditional Dubai
• Maintain a relaxed pace without rushing

For first-time visitors especially, structured itineraries remove uncertainty and ensure that no major highlights are missed.

What Are Dubai Regular Tour Packages?

Dubai regular tour packages are pre-planned holiday itineraries that combine essential travel components into one seamless plan. These typically include accommodation, airport transfers, guided sightseeing tours, and Dubai's most popular experiences.

Unlike luxury-only or highly customized private tours, budget-friendly Dubai holiday packages are designed to provide maximum value while maintaining comfort and quality.

Key Features of Regular Dubai Tour Packages:
• Comfortable hotels at competitive prices
• Shared sightseeing tours (Seat-in-Coach basis)
• Professional, English-speaking guides
• Well-balanced itineraries with proper pacing
• Transparent inclusions and exclusions

These packages are especially suitable for first-time visitors who want to see Dubai's highlights in a structured and cost-effective way.

Who Should Choose These Dubai Tour Packages?

Dubai regular tour packages are suitable for a wide range of travelers, including:
• First-time visitors who want clarity and structure
• Families seeking safe, guided, and child-friendly experiences
• Couples and honeymooners looking for balanced sightseeing and leisure
• Budget-conscious travelers who still want quality experiences
• International tourists unfamiliar with local transport and logistics

Because airport transfers, city tours, and major attractions are pre-arranged, travelers can focus on enjoying Dubai rather than coordinating daily plans.

Dubai Regular Tour Package Options by Duration

One of the biggest advantages of Dubai travel packages is flexibility. Travelers can choose itineraries based on available time, travel style, and budget.

Below is a clear breakdown of Dubai itinerary packages from 1 Night / 2 Days to 7 Nights / 8 Days.

1 Night / 2 Days Dubai Tour Package
(Ideal for Stopovers & Short Visits)

This short itinerary is perfect for travelers transiting through Dubai or visiting the city for business. Despite limited time, it offers a meaningful introduction to Dubai.

What to Expect:
• Airport pickup and hotel transfer
• Evening experience such as a desert safari with BBQ dinner or Dubai Marina cruise
• Half-day Dubai city tour covering major landmarks
• Airport drop-off

This package typically includes a guided Dubai city tour, covering both Old and New Dubai, making it a smart choice for travelers with limited time.

Best for: Transit passengers, business travelers, short stays

2 Nights / 3 Days Dubai Tour Package
(Compact Yet Complete Experience)

A 2-night Dubai itinerary allows for a more relaxed pace while still covering the city's highlights.

Key Experiences:
• Arrival and Marina dhow cruise dinner
• Half-day Dubai sightseeing tour
• Desert safari with dune bashing and cultural entertainment
• Shopping time before departure

This is one of the most popular Dubai 2 days itinerary options for first-time visitors.

Best for: Couples, weekend travelers, short family trips

3 Nights / 4 Days Dubai Tour Package
(Balanced Sightseeing & Leisure)

A 3-night package offers a well-rounded Dubai experience, blending culture, adventure, and modern attractions.

Highlights Include:
• Guided Dubai city tour
• Desert safari with BBQ dinner
• Burj Khalifa visit and Dubai Mall exploration
• Evening Marina dhow cruise

This itinerary works well for travelers who want to experience both iconic attractions and local culture.

Best for: First-time visitors, small families, couples

4 Nights / 5 Days Dubai Tour Package
(Comprehensive City & Abu Dhabi Experience)

With five days in Dubai, travelers can explore beyond the city and experience the UAE's capital.

Key Inclusions:
• Dubai city tour and desert safari
• Marina cruise dinner
• Abu Dhabi city tour with one major attraction or theme park
• Free day for shopping and leisure

This package introduces variety while keeping travel distances manageable.

Best for: Families, cultural travelers, relaxed holidays

5 Nights / 6 Days Dubai Tour Package
(Extended Exploration with Iconic Attractions)

This itinerary allows travelers to explore Dubai in depth without feeling rushed.

Typical Experiences:
• Dubai city tour with Burj Khalifa and Dubai Mall
• Abu Dhabi city tour
• Dubai Frame, Miracle Garden, Museum of the Future
• Marina cruise and Global Village visit

This Dubai 5 days itinerary is ideal for travelers who want to experience both modern landmarks and family-friendly attractions.

Best for: Families, international tourists, long-haul visitors

6 Nights / 7 Days Dubai Tour Package
(Comfortable Pace with Free Time)

With seven days, travelers enjoy a relaxed itinerary that includes sightseeing, entertainment, and rest.

Highlights:
• Dubai and Abu Dhabi city tours
• Desert safari experience
• Dolphin show and Global Village
• Free shopping and leisure day

This itinerary is especially suitable for families traveling with children or seniors.

Best for: Families, multi-generational travelers

7 Nights / 8 Days Dubai Tour Package
(Complete Dubai Holiday Experience)

This is the most comprehensive Dubai vacation package, designed for travelers who want a full experience.

What It Covers:
• Major Dubai landmarks and experiences
• Abu Dhabi excursion
• Cultural attractions and entertainment shows
• Dedicated free day for shopping or relaxation

This itinerary allows flexibility while still providing structure.

Best for: Long holidays, honeymooners, repeat visitors

What's Included in Most Dubai Regular Tour Packages?

While inclusions may vary slightly, most Dubai regular tour packages include:
• Airport pickup and drop-off in private vehicles
• Hotel accommodation (3-star, 4-star, or 5-star options)
• Daily breakfast at the hotel
• Guided Dubai city tour
• Desert safari with BBQ dinner
• Marina dhow cruise with dinner
• English-speaking tour guide
• Government taxes and service charges

Optional Experiences and Upgrades

Travelers can enhance their Dubai travel packages with optional add-ons such as:
• Burj Khalifa "At the Top" tickets
• Theme parks (Ferrari World, Yas Waterworld, Aquaventure)
• Private city tours
• Luxury yacht cruises
• Hot air balloon desert experiences

These upgrades allow travelers to customize their holiday based on interests and budget.

Best Time to Visit Dubai

Dubai is a year-round destination.
• October to April: Pleasant weather, ideal for outdoor sightseeing
• May to September: Hotter months, but lower prices and indoor-focused tours

During summer, many activities are scheduled in the evening, and attractions remain fully operational. This makes Dubai budget friendly holiday packages especially attractive during off-peak months.

Why Book with Premium Dubai Tours?

Choosing the right tour operator is just as important as choosing the right itinerary.

Premium Dubai Tours focuses on:
• Clear itineraries with no confusion
• Transparent inclusions and exclusions
• Professional coordination and local expertise
• Reliable airport transfers and guided tours

The approach is simple: well-organized travel, honest communication, and consistent service quality.

Frequently Asked Questions (FAQs)

Are Dubai regular tour packages suitable for first-time visitors?
Yes. These packages are specifically designed to cover major attractions in a structured way.

Can families with children choose these packages?
Absolutely. Many itineraries include family-friendly experiences.

Are these Dubai tour packages customizable?
Yes. Optional activities and hotel upgrades can be added.

Is Dubai expensive for budget travelers?
With proper planning, Dubai can be very affordable—especially with regular tour packages.

Do these packages include visas and flights?
Visas and flights are usually excluded but can be arranged separately.

Conclusion: Choosing the Right Dubai Tour Package

Dubai offers something for every traveler, whether it's a short city break or a full holiday experience. With structured itineraries, comfortable accommodations, and guided sightseeing, Dubai regular tour packages make exploring the city simple and stress-free.

From 1-night stopovers to 7-night holidays, these packages allow travelers to experience Dubai's highlights at their own pace, with clarity, comfort, and value.`,
      author: "Premium Dubai Tours",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      publishDate: "2024-03-15",
      readTime: "18 min read",
      category: "Travel Guide",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      views: 2800,
      likes: 198,
      tags: ["Dubai", "Tour Packages", "Budget Travel", "Holiday Packages", "Travel Guide"]
    },
    {
      id: 'premium-dubai-tour-packages-luxury',
      title: "Customized Luxury: The Ultimate Guide to Premium Private Travel in Dubai",
      excerpt: "Dubai is a city that rewards thoughtful travel. Beyond the iconic skyline and record-breaking attractions lies a destination best experienced with time, comfort, and careful planning.",
      content: `Customized Luxury: The Ultimate Guide to Premium Private Travel in Dubai

Dubai is a city that rewards thoughtful travel. Beyond the iconic skyline and record-breaking attractions lies a destination best experienced with time, comfort, and careful planning. While many visitors rely on fixed group tours, discerning travelers increasingly prefer journeys that offer privacy, flexibility, and control.

This is where Premium Dubai Tour Packages come into focus.

At Premium Dubai Tours, our premium category is designed for travelers who want Dubai on their own terms. These packages are private, customizable, and priced per vehicle rather than per person. Whether you are traveling with family, celebrating a honeymoon, or simply prefer quiet, well-organized experiences, premium packages allow you to explore Dubai and the UAE with confidence and ease.

This guide explains what premium Dubai tour packages include, who they are ideal for, how they differ from regular tours, and how each duration, from 3 Nights to 6 Nights, is structured to deliver a refined travel experience.

What Are Premium Dubai Tour Packages?

Premium Dubai Tour Packages are private travel itineraries designed for guests who value exclusivity, comfort, and personalization. Unlike standard or regular packages, these tours do not involve shared vehicles, fixed group schedules, or rushed sightseeing.

Every premium package is:
• Private (vehicle, tours, and experiences)
• Customizable (timing, attractions, and pace)
• Priced per vehicle (up to 6 guests)
• Flexible with accommodation options

To accommodate different travel styles, Premium Dubai Tours offers three pricing formats for each premium itinerary:
• Without hotel accommodation – ideal for residents or guests with pre-booked stays
• With 4-star hotel accommodation – balanced comfort and value
• With 5-star hotel accommodation – refined luxury and premium hospitality

Attraction tickets are not bundled upfront. This is intentional. Since premium tours vary by group size and preference, all experience tickets are arranged later at discounted rates, ensuring transparency and flexibility.

Why Choose a Premium Tour Instead of a Regular Package?

Dubai offers countless attractions, but navigating them efficiently requires experience. Premium packages are designed for travelers who prefer quality over quantity and value their time.

Key differences include:
• No shared transport or waiting for other guests
• Flexible daily schedules
• Private desert safari and yacht experiences
• Personalized city tours
• Dedicated support before and during the trip

Premium tours are not about adding more activities; they are about making each experience smoother, calmer, and more enjoyable.

Who Are Premium Dubai Tour Packages Ideal For?

Premium packages are particularly suitable for:

Families with Children
Private vehicles make traveling easier, safer, and more comfortable for families. Schedules can be adjusted for rest breaks, meals, or early evenings.

Honeymooners and Couples
Privacy matters. From yacht dinners to desert experiences, premium packages allow couples to enjoy Dubai without distractions.

Small Groups and Friends
Pricing per vehicle makes premium tours cost-effective for groups of four to six travelers who want to stay together.

Business Travelers
Premium itineraries work well for guests extending business trips or hosting visiting colleagues.

Repeat Visitors
For travelers who have already seen Dubai's highlights, premium tours allow deeper exploration at a relaxed pace.

Overview of Premium Dubai Tour Package Durations

Premium Dubai Tours currently offers the following premium itinerary durations:
• 3 Nights / 4 Days – Dubai Signature Escape
• 4 Nights / 5 Days – Dubai Signature Experience
• 5 Nights / 6 Days – Dubai & Abu Dhabi Signature Journey
• 6 Nights / 7 Days – Complete UAE Premium Experience

Each itinerary builds naturally on the previous one, adding destinations and experiences without overcrowding the schedule.

3 Nights / 4 Days – Dubai Signature Escape

This short yet refined itinerary is ideal for travelers who want to experience Dubai's highlights with premium comfort.

Experience Overview
This package focuses on iconic Dubai moments, city landmarks, private desert adventure, and a yacht dinner, delivered in a relaxed format.

Key Experiences
• Private airport transfers
• Private yacht dinner cruise at Dubai Marina
• Private Dubai city tour covering modern and heritage landmarks
• Burj Khalifa, Dubai Mall, and Aquarium visit (tickets optional)
• Morning private desert safari with premium camp
• One-hour private limousine experience
• Ain Dubai or leisure evening experience

Why This Package Works
The 3-night premium escape avoids rushed sightseeing. Activities are well spaced, and evenings are dedicated to calm, memorable experiences rather than long transfers.

4 Nights / 5 Days – Dubai Signature Experience

This itinerary is designed for travelers who want more balance between sightseeing, leisure, and entertainment.

Experience Overview
The extra night allows for creative attractions, gardens, and evening entertainment without compromising comfort.

Key Experiences
• Private yacht dinner at Marina
• Dubai private city tour with Burj Khalifa and Dubai Mall
• Dubai Frame, Miracle Garden, and Butterfly Garden
• Evening experience at Global Village or Ain Dubai
• Dolphin show experience
• Private desert safari with BBQ dinner
• One-hour limousine ride

Why This Package Works
This is a popular choice for families and couples who want variety without exhaustion. Days are full but not rushed, with private transfers ensuring smooth transitions.

5 Nights / 6 Days – Dubai & Abu Dhabi Signature Journey

This itinerary expands beyond Dubai to include the UAE's capital, offering cultural depth and architectural contrast.

Experience Overview
Dubai's modern attractions are balanced with Abu Dhabi's grand landmarks and theme parks.

Key Experiences
• All Dubai premium experiences from the 4-night package
• Private Abu Dhabi city tour
• One theme park visit (Ferrari World, Warner Bros, or SeaWorld – optional tickets)
• Extended leisure time for shopping and dining

Why This Package Works
Travelers gain a broader understanding of the UAE while maintaining private, comfortable travel throughout.

6 Nights / 7 Days – Complete UAE Premium Experience

This is the most comprehensive premium itinerary, ideal for travelers who want to explore Dubai, Abu Dhabi, and Sharjah without rushing.

Experience Overview
This package combines modern Dubai, cultural Sharjah, and grand Abu Dhabi into one seamless journey.

Key Experiences
• Private Dubai city tour
• Dubai Frame, Miracle Garden, and cultural attractions
• Private Abu Dhabi city tour with one park
• Private Sharjah city tour highlighting heritage and museums
• Yacht dinner cruise
• Dolphin show
• Private desert safari with premium camp
• Limousine experience

Why This Package Works
The longer duration allows rest days and flexibility, making it ideal for families and long-haul travelers.

Customization: Your Journey, Your Way

All premium packages are fully customizable.

You may:
• Change daily sequences
• Replace attractions
• Add rest days
• Upgrade experiences
• Adjust timings
• Choose hotel categories

Customization is handled before arrival, ensuring clarity and smooth execution.

Accommodation Options Explained

Premium Dubai Tours offers flexibility in accommodation selection:
• Without Hotel – Best for residents, frequent travelers, or guests staying with family.
• 4-Star Hotels – Comfortable, well-located hotels offering excellent value and convenience.
• 5-Star Hotels – Luxury properties with refined service, premium dining, and central locations.

Hotels are selected based on location, service quality, and guest convenience.

Best Time to Visit Dubai for Premium Tours

Dubai is a year-round destination.
• October to April offers ideal outdoor weather.
• May to September provides better pricing, with tours designed around indoor attractions and evening experiences.

Premium tours remain comfortable year-round due to private vehicles and flexible scheduling.

Why Book with Premium Dubai Tours?

Premium Dubai Tours operates with a service-first philosophy.

Our advantages include:
• Private-only premium operations
• Transparent pricing
• Local on-ground expertise
• Custom itinerary planning
• Discounted attraction tickets
• Professional, licensed operations

We focus on delivery, not exaggeration.

Frequently Asked Questions (FAQs)

Is pricing per person?
No. Premium packages are priced per vehicle for up to six guests, but small vehicle options for a few people are also available.

Can attractions be added later?
Yes. Tickets are arranged after confirming group size.

Are premium tours suitable for children?
Yes. Private vehicles and flexible schedules make them ideal for families.

Can I change the itinerary?
Absolutely. All premium packages are customizable.

Final Thoughts: Travel Dubai Without Compromise

Dubai offers endless possibilities, but how you experience them matters. Premium Dubai Tour Packages are designed for travelers who want calm planning, private experiences, and thoughtful itineraries.

Whether you choose a short escape or a complete UAE journey, Premium Dubai Tours ensures your trip is comfortable, organized, and personal, from arrival to departure.

Explore Dubai with clarity, privacy, and confidence.`,
      author: "Premium Dubai Tours",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      publishDate: "2024-04-10",
      readTime: "20 min read",
      category: "Travel Guide",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      views: 3500,
      likes: 312,
      tags: ["Dubai", "Premium Tours", "Luxury Travel", "Private Tours", "Travel Guide"]
    }
  ];

  // Use blogs from database, fallback to hardcoded if empty
  const displayBlogs = blogs.length > 0 ? blogs : hardcodedBlogs;

  const categories = [
    { name: "All", value: "all", count: displayBlogs.length },
    { name: "Travel Guide", value: "Travel Guide", count: displayBlogs.filter(b => b.category === "Travel Guide").length }
  ];

  const filteredBlogs = displayBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = categoryFilter === "all" || blog.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      case "popular":
        return (b.views || 0) - (a.views || 0);
      case "trending":
        return (b.likes || 0) - (a.likes || 0);
      default:
        return 0;
    }
  });

  const featuredBlog = displayBlogs[0];

  return (
    <div className="min-h-screen bg-white font-merriweather">
      {/* Hero Section */}
      <section className="relative text-white py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('/theme-img-1951.webp')`
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-10 font-montserrat">
              Travel Blog
            </h1>
            <p className="text-3xl md:text-4xl lg:text-5xl mb-12 opacity-90 font-merriweather">
              Discover travel tips, destination guides, and inspiring stories from around the world
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Calendar className="h-4 w-4 mr-2" />
                {displayBlogs.length} Articles
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Eye className="h-4 w-4 mr-2" />
                Travel Insights
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      {featuredBlog && (
        <section className="py-12 bg-white font-merriweather">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 font-montserrat">
                Featured Article
              </h2>
              <Link href={`/blogs/${featuredBlog._id || featuredBlog.id || 'dubai-stopover-tour'}`} className="block">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-primary/30">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="aspect-video md:aspect-square relative">
                      <Image
                        src={featuredBlog.image}
                        alt={featuredBlog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8 pb-8 flex flex-col">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge className="bg-primary text-white">{featuredBlog.category}</Badge>
                      <span className="text-sm text-gray-600">{featuredBlog.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-montserrat">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 font-merriweather leading-relaxed">
                      {featuredBlog.excerpt}
                    </p>
                    <p className="text-gray-600 mb-4 font-merriweather leading-relaxed text-sm">
                      A Dubai stopover tour allows transit passengers to step beyond the airport and experience the city's iconic skyline, cultural heritage, and world-class attractions, even if they have only a few hours or a single night.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredBlog.tags && featuredBlog.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs font-merriweather">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={featuredBlog.authorImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"}
                              alt={featuredBlog.author}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 font-montserrat">{featuredBlog.author}</p>
                            <p className="text-xs text-gray-600 font-merriweather">
                              {featuredBlog.publishDate ? (typeof featuredBlog.publishDate === 'string' ? featuredBlog.publishDate : new Date(featuredBlog.publishDate).toLocaleDateString()) : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 font-merriweather">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {featuredBlog.views || 0}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {featuredBlog.likes || 0}
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        Read Full Article
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Second Blog Card */}
      {displayBlogs.length > 1 && (
        <section className="py-12 bg-white font-merriweather">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Link href={`/blogs/${displayBlogs[1]?._id || displayBlogs[1]?.id || 'dubai-tour-packages-budget-friendly'}`} className="block">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-primary/30">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <div className="aspect-video md:aspect-square relative">
                        <Image
                          src={displayBlogs[1].image}
                          alt={displayBlogs[1].title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8 pb-8 flex flex-col">
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge className="bg-primary text-white">{displayBlogs[1].category}</Badge>
                        <span className="text-sm text-gray-600">{displayBlogs[1].readTime}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 font-montserrat">
                        {displayBlogs[1].title}
                      </h3>
                      <p className="text-gray-600 mb-4 font-merriweather leading-relaxed">
                        {displayBlogs[1].excerpt}
                      </p>
                      <p className="text-gray-600 mb-4 font-merriweather leading-relaxed text-sm">
                        For travelers planning their first visit, choosing the right Dubai tour packages can make a significant difference. Well-structured itineraries help visitors explore the city comfortably, avoid unnecessary expenses, and experience Dubai's highlights without confusion.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {displayBlogs[1].tags && displayBlogs[1].tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs font-merriweather">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <Image
                                src={displayBlogs[1].authorImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"}
                                alt={displayBlogs[1].author}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 font-montserrat">{displayBlogs[1].author}</p>
                              <p className="text-xs text-gray-600 font-merriweather">
                                {displayBlogs[1].publishDate ? new Date(displayBlogs[1].publishDate).toLocaleDateString() : 'N/A'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 font-merriweather">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {displayBlogs[1].views || 0}
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {displayBlogs[1].likes || 0}
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                          Read Full Article
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Third Blog Card */}
      {displayBlogs.length > 2 && (
        <section className="py-12 bg-white font-merriweather">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Link href={`/blogs/${displayBlogs[2]?._id || displayBlogs[2]?.id || 'premium-dubai-tour-packages-luxury'}`} className="block">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-primary/30">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <div className="aspect-video md:aspect-square relative">
                        <Image
                          src={displayBlogs[2].image}
                          alt={displayBlogs[2].title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8 pb-8 flex flex-col">
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge className="bg-primary text-white">{displayBlogs[2].category}</Badge>
                        <span className="text-sm text-gray-600">{displayBlogs[2].readTime}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 font-montserrat">
                        {displayBlogs[2].title}
                      </h3>
                      <p className="text-gray-600 mb-4 font-merriweather leading-relaxed">
                        {displayBlogs[2].excerpt}
                      </p>
                      <p className="text-gray-600 mb-4 font-merriweather leading-relaxed text-sm">
                        At Premium Dubai Tours, our premium category is designed for travelers who want Dubai on their own terms. These packages are private, customizable, and priced per vehicle rather than per person, offering exclusivity, comfort, and personalization.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {displayBlogs[2].tags && displayBlogs[2].tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs font-merriweather">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <Image
                                src={displayBlogs[2].authorImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"}
                                alt={displayBlogs[2].author}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 font-montserrat">{displayBlogs[2].author}</p>
                              <p className="text-xs text-gray-600 font-merriweather">
                                {displayBlogs[2].publishDate ? new Date(displayBlogs[2].publishDate).toLocaleDateString() : 'N/A'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 font-merriweather">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {displayBlogs[2].views || 0}
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {displayBlogs[2].likes || 0}
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                          Read Full Article
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Filters Section */}
      <section className="py-8 bg-gray-100 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="trending">Most Liked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white font-merriweather">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
              Stay Updated with Travel Tips
            </h2>
            <p className="text-xl mb-8 opacity-90 font-merriweather">
              Subscribe to our newsletter for the latest travel guides, tips, and destination insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-white text-gray-900 placeholder-gray-500"
              />
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
