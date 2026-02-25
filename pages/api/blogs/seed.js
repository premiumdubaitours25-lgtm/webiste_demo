import connectDB from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

// Blog data from the blogs page
const getBlogs = () => [
  {
    title: "Dubai Stopover Tour – Make the Most of Your Layover in Dubai",
    excerpt: "Long international journeys often come with extended layovers, and for many travelers, those hours feel like lost time, spent waiting inside an airport lounge or watching the clock tick between flights. But if your journey routes through Dubai, a layover doesn't have to be a pause.",
    content: `Long international journeys often come with extended layovers, and for many travelers, those hours feel like lost time, spent waiting inside an airport lounge or watching the clock tick between flights. But if your journey routes through Dubai, a layover doesn't have to be a pause. With the right planning, it can become a highlight of your trip.

A Dubai stopover tour allows transit passengers to step beyond the airport and experience the city's iconic skyline, cultural heritage, and world-class attractions, even if they have only a few hours or a single night. Dubai is one of the very few global transit hubs where exploring the city during a layover is not only possible but genuinely rewarding.

Whether you are a business traveler with a tight connection, a leisure traveler on a long-haul flight, or a first-time visitor curious about the city, a well-organized Dubai transit tour can turn waiting time into a meaningful travel experience.`,
    author: "Premium Dubai Tours",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    publishDate: new Date("2024-02-20"),
    readTime: "15 min read",
    category: "Travel Guide",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    views: 3200,
    likes: 245,
    tags: ["Dubai", "Stopover", "Layover", "Transit", "Travel Guide"],
    isPublished: true,
  },
  {
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
    publishDate: new Date("2024-03-15"),
    readTime: "18 min read",
    category: "Travel Guide",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    views: 2800,
    likes: 198,
    tags: ["Dubai", "Tour Packages", "Budget Travel", "Holiday Packages", "Travel Guide"],
    isPublished: true,
  },
  {
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
    publishDate: new Date("2024-04-10"),
    readTime: "20 min read",
    category: "Travel Guide",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    views: 3500,
    likes: 312,
    tags: ["Dubai", "Premium Tours", "Luxury Travel", "Private Tours", "Travel Guide"],
    isPublished: true,
  },
];

export default async function handler(req, res) {
  // Ensure we always return JSON
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const db = await connectDB();
    
    if (!db) {
      return res.status(500).json({
        success: false,
        error: 'Database not connected. Please check your MongoDB connection.',
      });
    }

    const blogs = getBlogs();
    const insertedBlogs = [];

    for (const blogData of blogs) {
      try {
        // Check if blog already exists by title
        const existingBlog = await Blog.findOne({ title: blogData.title });
        
        if (!existingBlog) {
          const blog = await Blog.create(blogData);
          insertedBlogs.push(blog);
          console.log(`Created blog: ${blog.title}`);
        } else {
          // Update existing blog
          const updatedBlog = await Blog.findByIdAndUpdate(
            existingBlog._id,
            { ...blogData, updatedAt: Date.now() },
            { new: true, runValidators: true }
          );
          insertedBlogs.push(updatedBlog);
          console.log(`Updated blog: ${updatedBlog.title}`);
        }
      } catch (blogError) {
        console.error(`Error processing blog "${blogData.title}":`, blogError);
        // Continue with next blog instead of failing completely
      }
    }

    return res.status(200).json({
      success: true,
      message: `Successfully seeded ${insertedBlogs.length} blog(s)`,
      data: insertedBlogs,
    });
  } catch (error) {
    console.error('Error seeding blogs:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to seed blogs',
    });
  }
}
