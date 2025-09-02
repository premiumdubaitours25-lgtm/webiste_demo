import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, 
  MapPin, 
  Users, 
  Phone, 
  Mail, 
  Calendar,
  Star,
  CheckCircle,
  ArrowLeft,
  Heart,
  Share2,
  Building,
  Car,
  Hotel,
  Utensils,
  Map,
  Info
} from "lucide-react";

const PackageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  // Comprehensive Bhutan package data for ID 1 (3N/4D)
  const bhutanPackage1 = {
    id: 1,
    title: "Bhutan Tour for 3 Nights / 4 Days",
    description: "Experience the mystical kingdom of Bhutan with our comprehensive 3N/4D tour covering Thimphu & Paro. This package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
    duration: "3N/4D",
    destination: "Bhutan",
    price: "18,500.00",
    originalPrice: "22,000.00",
    discount: "16% OFF",
    mainImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    highlights: ["Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage", "Guided Tours"],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Transfer to Thimphu",
        description: "Arrive at NJP Station/Airport and transfer to Thimphu via Phuentsholing with immigration formalities.",
        activities: ["Airport pickup", "Immigration process", "Thimphu transfer"]
      },
      {
        day: "Day 2",
        title: "Thimphu Local Sightseeing",
        description: "Explore Thimphu's key attractions including National Memorial Chorten and Buddha Dordenma statue.",
        activities: ["City tour", "Cultural sites", "Transfer to Paro"]
      },
      {
        day: "Day 3",
        title: "Paro Local Sightseeing",
        description: "Discover Paro's enchanting sights including Tiger's Nest Monastery and ancient dzongs.",
        activities: ["Monastery visits", "Tiger's Nest trek", "Cultural exploration"]
      },
      {
        day: "Day 4",
        title: "Departure",
        description: "Transfer back to NJP Station/Bagdogra with unforgettable memories of Bhutan.",
        activities: ["Hotel checkout", "Return transfer", "Departure"]
      }
    ],
    inclusions: [
      "Accommodation on twin Sharing Basis.",
      "Meals as per plan",
      "SDF Charges (1200/-per person per night) Mandatory",
      "Bhutanese guide Mandatory",
      "Mineral water bottle per day",
      "Exclusive vehicle for transfers & sightseeing",
      "All permit fees & hotel taxes (as per itinerary).",
      "Rates are valid for INDIAN NATIONALS only."
    ],
    exclusions: [
      "Air Fare / Train fare.",
      "Personal expenses such as laundry, telephone calls, tips & gratuity",
      "Entrance Fees, (Monument fee)",
      "Additional sightseeing or extra usage of vehicles",
      "Any increase in taxes or fuel price",
      "Anything which is not included in the inclusion."
    ],
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment: "Amazing experience with JJ&Tia Tours! The Bhutan trip was perfectly organized and exceeded all our expectations."
      },
      {
        name: "Raj Patel",
        rating: 5,
        comment: "Fantastic service and great value for money. Our Bhutan tour was unforgettable!"
      },
      {
        name: "Priya Sharma",
        rating: 5,
        comment: "Professional team with excellent attention to detail. Highly recommend for family trips!"
      }
    ],
    detailedInfo: {
      companyDescription: "JJ&Tia Tours and Travels. Your Path to Unforgettable Adventures. At JJ&Tia Tours and Travels (sister company of Travellers Paradise: Travellers Paradise Tours & Travels - Profile, Reviews & Ratings), we specialize in crafting unique and personalized travel experiences that take you beyond the ordinary. Founded on a passion for exploration and a deep love for cultures, our company has been helping travelers of all types—from solo explorers to family groups—discover the beauty of the world for over a decade.",
      services: [
        "Customized travel planning",
        "Guided tours & local experiences", 
        "Group & family vacations",
        "Luxury & adventure travel",
        "Honeymoons & romantic getaways",
        "Corporate & incentive travel"
      ],
      destinations: ["Thimphu", "Paro"],
      transportation: {
        inBhutan: "Ertiga",
        transfers: "Swift Desire transfers from Bagdogra Airport/NJP Station"
      },
      tourDetails: {
        duration: "3N/4D",
        travelers: "4 Adults", 
        hotelCategory: "3 Star",
        mealPlan: "Breakfast & Dinner",
        month: "Oct"
      },
      itinerary: [
        {
          day: "DAY 1",
          description: "Bhutan from NJP Station/ Airport – Phuentsholing To Thimphu."
        },
        {
          day: "DAY 2", 
          description: "Thimphu Local Sightseeing to Paro Transfer."
        },
        {
          day: "DAY 3",
          description: "Paro Local Sightseeing."
        },
        {
          day: "DAY 4",
          description: "Paro To Bagdogra/ NJP Station Transfer."
        }
      ],
      hotels: [
        {
          city: "Thimphu",
          hotel: "Hotel Park or Similar",
          rooms: "2 Rooms",
          roomType: "Double Sharing",
          nights: "01"
        },
        {
          city: "Paro",
          hotel: "Hotel Tashiling or Similar", 
          rooms: "2 Rooms",
          roomType: "Double Sharing",
          nights: "02"
        }
      ],
      packageCost: "18,500/- Per Person",
      inclusions: [
        "Accommodation on twin Sharing Basis.",
        "Meals as per plan",
        "SDF Charges (1200/-per person per night) Mandatory",
        "Bhutanese guide Mandatory",
        "Mineral water bottle per day",
        "Exclusive vehicle for transfers & sightseeing. Please brief to guest that vehicle will not be at disposal it will be available to guest as per itinerary only (point to point basis) (CAR TIMING 9 AM TO 7 PM DURING SIGHTSEEING)",
        "All permit fees & hotel taxes (as per itinerary).",
        "Rates are valid for INDIAN NATIONALS only."
      ],
      exclusions: [
        "Air Fare / Train fare.",
        "Personal expenses such as laundry, telephone calls, tips & gratuity, Extra mineral water, soft & hard drinks, rafting,",
        "Entrance Fees, (Monument fee)",
        "Additional sightseeing or extra usage of vehicles, other than mentioned in the itinerary. Any cost arising due to natural calamities like, landslides, road blockage, political disturbances (strikes), etc. (to be borne by the client, who is directly payable on the spot).",
        "Any increase in taxes or fuel price, leading to increase in cost on surface transportation & land arrangements, which may come into effect prior to departure.",
        "Anything which is not included in the inclusion."
      ],
      dayDetails: {
        day1: {
          title: "DAY 1: Arrival & Transfer to Thimphu",
          description: "Upon arrival, you will be greeted by our driver or tour representative at the Railway Station. On arrival in Phuentsholing, our tour representative will assist you with the Bhutan immigration process. Immigration formalities include submitting your travel permits and identification (passport or voter ID for Indian citizens). After which you will be transferred to Thimpu. The capital of Bhutan via Gedu, which is located about 9000 ft. above the sea and on the way you can enjoy the view of Chukha Dam. We will have a quick stopover for photo session at Wankha Waterfalls. The journey from Phuentsholing to Thimphu is a scenic drive, and there are several noteworthy stops en route where you can relax, enjoy the views, and experience Bhutan's natural beauty and culture. Below are the details of en-route stops. On arrival at Thimphu check in to the hotel and in the evening, visit the Tashichho Dzong (Fortress of the Glorious Religion). Overnight stay at Thimphu.",
          points: [
            "Arrival at Railway Station/Airport with driver or tour representative",
            "Bhutan immigration process assistance in Phuentsholing",
            "Submit travel permits and identification (passport or voter ID for Indian citizens)",
            "Transfer to Thimphu via Gedu (9000 ft. above sea level)",
            "Enjoy scenic views of Chukha Dam during the journey",
            "Photo session stopover at Wankha Waterfalls",
            "Scenic drive with multiple noteworthy stops en route",
            "Experience Bhutan's natural beauty and culture during the journey",
            "Hotel check-in upon arrival in Thimphu",
            "Evening visit to Tashichho Dzong (Fortress of the Glorious Religion)",
            "Overnight stay at Thimphu"
          ]
        },
        day2: {
          title: "DAY 2: Thimphu Local Sightseeing",
          description: "After Breakfast you can visit places like: The National Memorial Chorten: Built-in the memory of the third Druk Gyalpo (Head of Kingdom) of Bhutan, the National Memorial Chorten is devoted to World Peace. The Chorten popular amongst the localities for various major Buddhist religious festivals and it is one of the best places to see in Thimphu Bhutan. Buddha Dordenma Statue - Atop a hill in Thimphu, is a massive, golden Buddha sitting atop a gilded meditation hall. Hidden inside it has 125,000 smaller Buddha's. This means that in Thimphu, there are more Buddha statues than this city's population (100000), it is also known as Budda point. Changangkha Lhakhang – In Thimphu there are many monasteries and temple that you will get to see and among them. Changangkha Lhakhang is one of the most religious structures. It was built in the 12th century and its one of the oldest Lhakhang located in Thimphu .It's also known as the wish fulfilling temple, from here you can see the amazing view of Thimphu city The motitang Takin Preserve – For animal lovers, Motithang Takin Preserve is one of the best places to visit in Thimphu. This attractive preserved area was built as a small zoo but later it was converted into an animal preserve center. Takin -The national animal of Bhutan, lives in the Motithang Takin Preserve in Thimphu Tashi Chho Dzong (It is open @ 5pm for 1 Hrs only) - It is a monastery which is located next to bank of Wang Chhu River, It is also known as Thimphu Dzong. Annual 3 days Tsechu festival is also hosted every year at TashiChho Dzong. It was built in 1216 A.D. After visiting the places in Thimphu you will be transferred to Paro. Overnight stay in Paro.",
          points: [
            "Breakfast at hotel",
            "Visit National Memorial Chorten - Built in memory of the third Druk Gyalpo",
            "Explore Buddha Dordenma Statue - Massive golden Buddha with 125,000 smaller Buddhas inside",
            "Visit Changangkha Lhakhang - 12th century temple known as the wish fulfilling temple",
            "Explore Motithang Takin Preserve - Home to Bhutan's national animal, the Takin",
            "Visit Tashi Chho Dzong - Monastery located next to Wang Chhu River (Open @ 5pm for 1 hour only)",
            "Transfer to Paro in the evening",
            "Overnight stay in Paro"
          ]
        },
        day3: {
          title: "DAY 3: Paro Local Sightseeing",
          description: "Start your day with a delightful breakfast. Then set off to discover the enchanting sights of Paro, which includes places like: Simtokha Dzong : This Dzong, was built in the year 1629 also known as Sangak Zabdhon Phodrang by Zhabdrung Ngawang Namgyal, Simtokha Dzong was built in the 17th century and it is one of the oldest Dzong built .An very important and oldest structure.. National Museum of Bhutan: An ancient watchtower that now displays hundreds of ancient Bhutanese artifacts and artwork including traditional costumes, armor, weaponry, and handcrafted implements for daily life. The collections represent the rich cultural traditions of the country. Drukgyal Dzong: Drukgyal Dzong was a Buddhist Monastery. It is also translates as the 'Victorious Fortress'. This is the place where several victories over marauding Tibetan invaders. It is considered the most beautiful and famous archaeological site in Bhutan. Paro Airport View: This is one of the most stunning airports in the World and also the country's first and only international airport. With a breathtaking view, this airport became a must-visit place in Paro. Kyichu Lhakhang – It is also known as Kyerchu Buddhist Temple, Kyichu Lhakhang is a pilgrimage place as it is part of 108 temples which was built by the king ,it's very old and very beautiful and most visited OR Tiger's Nest Trek (Paro Taktsang): Tiger's Nest, or Paro Taktsang, is Bhutan's most iconic monastery, perched dramatically on a Cliffside 3,120 meters above sea level. It is a sacred pilgrimage site and one of the most photographed landmarks in Bhutan. Built in 1692, it is said to mark the meditation site of Guru Rinpoche (Padmasambhava), who arrived here on the back of a flying tigress in the 8th century. The monastery suffered a fire in 1998 and was carefully restored to its former glory. The trek is moderately challenging and takes you through pine forests, prayer flags, and scenic viewpoints. To reach their it will take around 5–7 hours (round trip), including time to explore the monastery. Overnight stay hotel in Paro.",
          points: [
            "Delightful breakfast at hotel",
            "Visit Simtokha Dzong - Built in 1629, one of the oldest Dzongs",
            "Explore National Museum of Bhutan - Ancient watchtower with Bhutanese artifacts",
            "Visit Drukgyal Dzong - 'Victorious Fortress', famous archaeological site",
            "Paro Airport View - One of the most stunning airports in the world",
            "Visit Kyichu Lhakhang - Part of 108 temples built by the king",
            "OR Tiger's Nest Trek (Paro Taktsang) - Iconic monastery at 3,120 meters",
            "Trek through pine forests, prayer flags, and scenic viewpoints",
            "5-7 hours round trip including monastery exploration",
            "Overnight stay in Paro"
          ]
        },
        day4: {
          title: "DAY 4: Departure",
          description: "After soaking in the beauty of Bhutan's sights, you will be greeted with a delightful breakfast. After which you'll be transferred to NJP (New Jalpaiguri Station) or Bagdogra in Siliguri, passing through the scenic Phuentsholing, as you embark on your journey back home, carrying unforgettable memories of your Bhutan adventure.",
          points: [
            "Delightful breakfast at hotel",
            "Transfer to NJP (New Jalpaiguri Station) or Bagdogra in Siliguri",
            "Scenic journey passing through Phuentsholing",
            "Departure with unforgettable memories of Bhutan adventure"
          ]
        }
      },
      importantNotes: [
        "Documents required for Bhutan Immigration is Voter id / Passport (Passport with 6 month and above validity).",
        "Children under 18 years can carry original birth Certificate along with school id/Aadhar Card.",
        "Hotels are very strict with the child policy. Please carry the age proof so that it can be produced if asked by the hotel.",
        "A valid photo ID proof for all guests staying at the hotel is mandatory.",
        "For Extra adult in the room, we will provide an extra bed (wherever possible), but most of the hotels only provide an extra mattress or roll out bed. Most of the hotels have no provision of an extra bed.",
        "The above-mentioned hotels will be confirmed as per the room availability. Otherwise, a similar category hotel will be provided. All the rooms are base category."
      ],
      contactInfo: {
        address: "Nyati Estate, Mohammadwadi, Pune, 411060",
        phone: "+91 9970393335",
        email: "shneiur.joseph@jjtia.com",
        website: "JJ & TIA Tours and Travels | Book Your Tour Package Now"
      }
    }
  };

  // Comprehensive Bhutan package data for ID 2 (4N/5D)
  const bhutanPackage2 = {
    id: 2,
    title: "Bhutan Tour for 4 Nights / 5 Days",
    description: "Experience the mystical kingdom of Bhutan with our comprehensive 4N/5D tour covering Phuentsholing, Thimphu & Paro. This extended package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
    duration: "4N/5D",
    destination: "Bhutan",
    price: "59,700.00",
    originalPrice: "75,000.00",
    discount: "20% OFF",
    mainImage: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    highlights: ["Phuentsholing", "Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage"],
    itinerary: [
      {
        day: "Day 1",
        title: "Alipurduar Station to Thimphu via Phuentsholing",
        description: "Arrive at Alipurduar Station and transfer to Thimphu via Phuentsholing with immigration formalities.",
        activities: ["Station pickup", "Immigration process", "Thimphu transfer"]
      },
      {
        day: "Day 2",
        title: "Thimphu Sightseeing to Paro",
        description: "Explore Thimphu's key attractions and transfer to Paro.",
        activities: ["City tour", "Cultural sites", "Transfer to Paro"]
      },
      {
        day: "Day 3",
        title: "Punakha Sightseeing",
        description: "Discover Punakha's beautiful dzongs and suspension bridge.",
        activities: ["Dochula Pass", "Punakha Dzong", "Suspension Bridge"]
      },
      {
        day: "Day 4",
        title: "Paro Sightseeing",
        description: "Explore Paro's enchanting sights including Tiger's Nest Monastery.",
        activities: ["Rinpung Dzong", "Tiger's Nest trek", "Cultural exploration"]
      },
      {
        day: "Day 5",
        title: "Departure",
        description: "Transfer back to Alipurduar Station with unforgettable memories of Bhutan.",
        activities: ["Hotel checkout", "Return transfer", "Departure"]
      }
    ],
    inclusions: [
      "Accommodation on twin Sharing Basis.",
      "Meals as per plan",
      "SDF Charges (1200/-per person per night) Mandatory",
      "Bhutanese guide Mandatory",
      "Mineral water bottle per day",
      "Exclusive Non a/c vehicle for transfers & sightseeing",
      "All permit fees & hotel taxes (as per itinerary).",
      "Rates are valid for INDIAN NATIONALS only."
    ],
    exclusions: [
      "Air Fare / Train fare.",
      "Personal expenses such as laundry, telephone calls, tips & gratuity, Extra mineral water, soft & hard drinks, rafting,",
      "Entrance Fees, (Monument fee)",
      "Additional sightseeing or extra usage of vehicles",
      "Any increase in taxes or fuel price",
      "Anything which is not included in the inclusion."
    ],
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment: "Amazing experience with JJ & TIA Tours! The Bhutan trip was perfectly organized and exceeded all our expectations."
      },
      {
        name: "Raj Patel",
        rating: 5,
        comment: "Fantastic service and great value for money. Our Bhutan tour was unforgettable!"
      },
      {
        name: "Priya Sharma",
        rating: 5,
        comment: "Professional team with excellent attention to detail. Highly recommend for family trips!"
      }
    ],
    detailedInfo: {
      companyDescription: "JJ & TIA Tours and Travels. Your Path to Unforgettable Adventures. At JJ&Tia Tours and Travels (sister company of Travellers Paradise: Travellers Paradise Tours & Travels - Profile, Reviews & Ratings), we specialize in crafting unique and personalized travel experiences that take you beyond the ordinary. Founded on a passion for exploration and a deep love for cultures, our company has been helping travelers of all types—from solo explorers to family groups—discover the beauty of the world for over a decade. Whether you're looking for a serene getaway in the mountains, an exciting cultural immersion in bustling cities, or a relaxing beach vacation, our team of experienced travel experts is dedicated to curating the perfect trip tailored to your interests and desires. We handle all the details—from flights and accommodations to excursions and local experiences—so you can focus on enjoying the journey. At JJ & TIA Tours and Travels, we believe that travel is about more than just sightseeing; it's about creating memories, fostering meaningful connections, and experiencing the world in a way that enriches your life. Let us take you on a journey you'll never forget. \"Discover more on our official website- just a click away!\" JJ&Tia Tours and Travels | Book Your Tour Package Now.",
      services: [
        "Customized travel planning",
        "Guided tours & local experiences", 
        "Group & family vacations",
        "Luxury & adventure travel",
        "Honeymoons & romantic getaways",
        "Corporate & incentive travel"
      ],
      destinations: ["Phuentsholing", "Thimphu", "Paro"],
      transportation: {
        inBhutan: "Hyundai Creta",
        transfers: "Swift Desire transfers from Alipurduar Station"
      },
      tourDetails: {
        duration: "4N/5D",
        travelers: "02 Adults + 1 Child (9 Yrs)", 
        hotelCategory: "3 Star",
        mealPlan: "Breakfast & Dinner",
        month: "May"
      },
      itinerary: [
        {
          day: "DAY 1",
          description: "Alipurduar Station to Thimphu via Phuentsholing."
        },
        {
          day: "DAY 2", 
          description: "Thimphu Sightseeing to Paro."
        },
        {
          day: "DAY 3",
          description: "Paro Sightseeing."
        },
        {
          day: "DAY 4",
          description: "Paro Local Sightseeing to Phuentsholing."
        },
        {
          day: "DAY 5",
          description: "Departure to Alipurduar Station."
        }
      ],
      hotels: [
        {
          city: "Thimphu",
          hotel: "Himalayan Star Lodge or Similar",
          rooms: "",
          roomType: "Double Sharing",
          nights: "01"
        },
        {
          city: "Punakha",
          hotel: "Stream Lodge or Similar", 
          rooms: "1 Rooms, 1 Extra Bed",
          roomType: "Double Sharing",
          nights: "02"
        },
        {
          city: "Paro",
          hotel: "Himalayan Star Resort or Similar", 
          rooms: "1 Rooms, 1 Extra Bed",
          roomType: "Double Sharing",
          nights: "02"
        }
      ],
      packageCost: "59,700/- Total Cost. [Includes cost for 2 Adults and 1 child of 9 Yrs]", // updated as per user request
      inclusions: [
        "Accommodation on twin Sharing Basis.",
        "Meals as per plan",
        "SDF Charges (1200/-per person per night) Mandatory",
        "Bhutanese guide Mandatory",
        "Mineral water bottle per day",
        "Exclusive Non a/c vehicle for transfers & sightseeing. Please brief to guest that vehicle will not be at disposal it will be available to guest as per itinerary only (point to point basis) (CAR TIMING 9 AM TO 7 PM DURING SIGHTSEEING)",
        "All permit fees & hotel taxes (as per itinerary).",
        "Rates are valid for INDIAN NATIONALS only."
      ],
      exclusions: [
        "Air Fare / Train fare.",
        "Personal expenses such as laundry, telephone calls, tips & gratuity, Extra mineral water, soft & hard drinks, rafting,",
        "Entrance Fees, (Monument fee)",
        "Additional sightseeing or extra usage of vehicles, other than mentioned in the itinerary. Any cost arising due to natural calamities like, landslides, road blockage, political disturbances (strikes), etc. (to be borne by the client, who is directly payable on the spot).",
        "Any increase in taxes or fuel price, leading to increase in cost on surface transportation & land arrangements, which may come into effect prior to departure.",
        "Anything which is not included in the inclusion."
      ],
      dayDetails: {
        day1: {
          title: "DAY 1: Alipurduar Station to Thimphu via Phuentsholing",
          description: "Upon arrival, you will be greeted by our driver or tour representative at the Railway Station. On arrival in Phuentsholing, our tour representative will assist you with the Bhutan immigration process. Immigration formalities include submitting your travel permits and identification (passport or voter ID for Indian citizens). After which you will be transferred to Thimpu. The capital of Bhutan via Gedu, which is located about 9000 ft. above the sea and on the way you can enjoy the view of Chukha Dam. We will have a quick stopover for photo session at Wankha Waterfalls. The journey from Phuentsholing to Thimphu is a scenic drive, and there are several noteworthy stops en route where you can relax, enjoy the views, and experience Bhutan's natural beauty and culture. Below are the details of en-route stops. On arrival at Thimphu check in to the hotel and in the evening, visit the Tashichho Dzong (Fortress of the Glorious Religion). Overnight stay at Thimphu.",
          points: [
            "Arrival at Alipurduar Station with driver or tour representative",
            "Bhutan immigration process assistance in Phuentsholing",
            "Submit travel permits and identification (passport or voter ID for Indian citizens)",
            "Transfer to Thimphu via Gedu (9000 ft. above sea level)",
            "Enjoy scenic views of Chukha Dam during the journey",
            "Photo session stopover at Wankha Waterfalls",
            "Scenic drive with multiple noteworthy stops en route",
            "Experience Bhutan's natural beauty and culture during the journey",
            "Hotel check-in upon arrival in Thimphu",
            "Evening visit to Tashichho Dzong (Fortress of the Glorious Religion)",
            "Overnight stay at Thimphu"
          ]
        },
        day2: {
          title: "DAY 2: Thimphu Sightseeing to Paro",
          description: "After breakfast you can visit the following places: The National Memorial Chorten: Built-in the memory of the third Druk Gyalpo (Head of Kingdom) of Bhutan, the National Memorial Chorten is devoted to World Peace. The Chorten popular amongst the localities for various major Buddhist religious festivals and it is one of the best places to see in Thimphu Bhutan. Buddha Dordenma Statue - Atop a hill in Thimphu, is a massive, golden Buddha sitting atop a gilded meditation hall. Hidden inside it has 125,000 smaller Buddha's. This means that in Thimphu, there are more Buddha statues than this city's population (100000), it is also known as Budda point. Changangkha Lhakhang – In Thimphu there are many monasteries and temple that you will get to see and among them. Changangkha Lhakhang is one of the most religious structures. It was built in the 12th century and its one of the oldest Lhakhang located in Thimphu .It's also known as the wish fulfilling temple, from here you can see the amazing view of Thimphu city The Motitang Takin Preserve – For animal lovers, Motithang Takin Preserve is one of the best places to visit in Thimphu. This attractive preserved area was built as a small zoo but later it was converted into an animal preserve center. Takin -The national animal of Bhutan lives in the Motithang Takin Preserve in Thimphu. The National Library It was established in the year 1967 and has famous collection of historic manuscripts, photos and books. Painting School – It is also known as Institute for Zorig Chusum here students are taught courses like traditional drawing, painting, carving and to develop skills in arts and crafts. Bhutan Textile Museum – Bhutan Textile Museum offers amazing display of Bhutanese dresses and textiles, it gives a clear picture of Bhutan history in terms of textile and traditional clothing. The Clock Tower - Clock Tower Square is an example of a great architectural marvel. It is a tower with four clock faces, which makes it different from any other building or structure in Bhutan. One of the most popular places among visitors, people usually visits here in the evening to enjoy the beautiful paintings and carvings. There are many restaurants and souvenir shops near this tower, making it one of the most visited sites in the town. Tashi Chho Dzong: It is a monastery which is located next to bank of Wang Chhu River, It is also known as Thimphu Dzong. Annual 3 days Tsechu festival is also hosted every year at TashiChho Dzong. It was built in 1216 A.D. Simtokha Dzong: This Dzong was built in the year 1629 also known as Sangak Zabdhon Phodrang by Zhabdrung Ngawang Namgyal, Simtokha Dzong was built in the 17th century and it is one of the oldest Dzong built .An very important and oldest structure. Simply Bhutan – Simply Bhutan is a living museum and photo studio that gives a good guided introduction to various aspects of Bhutanese traditional lives and the project is aimed at preservation and promotion of cultural. It was established in the year 2010. The objective is to raise fund to support Youth Development Fund in conducting various youth related programs, now and in future. Visitors are greeted with a shot of local array (rice spirit), before being guided through mocked-up village scenes. Along the way, you can dress up in traditional clothes, try out archery and hear songs sung by Bhutanese women as they build houses out of rammed earth. It's touristy, but a good family experience. There are also souvenir stalls, and a restaurant serving best Bhutanese set meals. Evening free for leisure. Overnight stay at Punakha.",
          points: [
            "Breakfast at hotel",
            "Visit National Memorial Chorten - Built in memory of the third Druk Gyalpo",
            "Explore Buddha Dordenma Statue - Massive golden Buddha with 125,000 smaller Buddhas inside",
            "Visit Changangkha Lhakhang - 12th century temple known as the wish fulfilling temple",
            "Explore Motithang Takin Preserve - Home to Bhutan's national animal, the Takin",
            "Visit National Library - Established in 1967 with historic manuscripts and books",
            "Visit Painting School (Institute for Zorig Chusum) - Traditional arts and crafts training",
            "Explore Bhutan Textile Museum - Display of Bhutanese dresses and textiles",
            "Visit Clock Tower Square - Architectural marvel with four clock faces",
            "Visit Tashi Chho Dzong - Monastery located next to Wang Chhu River",
            "Visit Simtokha Dzong - Built in 1629, one of the oldest Dzongs",
            "Visit Simply Bhutan - Living museum and photo studio with traditional experiences",
            "Transfer to Punakha in the evening",
            "Overnight stay at Punakha"
          ]
        },
        day3: {
          title: "DAY 3: Punakha Sightseeing",
          description: "After breakfast you can start your journey towards Punakha and explore the following places on the way: Dochula Pass: It is located between Thimphu and Punkaha which is around 3100 m high; here you can see scenic view of the Eastern Himalayan. In Dochula Pass 108 stupas are build and in winters it is fully covered with snow which makes it very beautiful place. Punakha Dzong: It is the most beautiful Dzong located at in two rivers named Pho Chu (male) and Mo Chu (female) in Punakha, Mo Chu is widely preferred for the first-timers, kids and elderly people. Upon visiting the Punakha Dzong, visitors will not only be mesmerized by the Bhutanese architectural marvel but will get an opportunity to explore the sacred history of this ancient place. Punakha Suspension Bridge - One of the oldest suspension bridges in the world, Punakha Suspension Bridge in Bhutan was believed to be built by the Buddhist Monk, Thangtong Gyalpo. This ancient hanging bridge is draped with prayer flags all along and provides a perfect spot for bird watching and nature photography. This historical bridge is worldwide known for its picturesque appearance. Your evening is open for urban exploration – wander through the city's vibrant malls, bustling markets, and hidden gems. Overnight hotel in Paro.",
          points: [
            "Breakfast at hotel",
            "Journey towards Punakha",
            "Visit Dochula Pass - 3100m high with 108 stupas and scenic Himalayan views",
            "Explore Punakha Dzong - Most beautiful Dzong located between Pho Chu and Mo Chu rivers",
            "Visit Punakha Suspension Bridge - One of the oldest suspension bridges in the world",
            "Evening free for urban exploration",
            "Transfer to Paro",
            "Overnight stay in Paro"
          ]
        },
        day4: {
          title: "DAY 4: Paro Sightseeing",
          description: "After Breakfast you will explore the following sites in Paro: Rinpung Dzong – Rinpung Dzong is also known as Paro Dzong and it was Built in 1644 by Zhabdrung Ngawang Namgyal, it is one of the best architecture. Rinpung Dzong has traditional Bhutanese architecture and it is the best tourist attraction point in Paro. Kyichu Lhakhang – It is also known as Kyerchu Buddhist Temple, Kyichu Lhakhang is a pilgrimage place as it is part of 108 temples which was built by the king ,it's very old and very beautiful and most visited monastery in Paro Tiger's Nest Trek (Paro Taktsang): Tiger's Nest, or Paro Taktsang, is Bhutan's most iconic monastery, perched dramatically on a Cliffside 3,120 meters above sea level. It is a sacred pilgrimage site and one of the most photographed landmarks in Bhutan. Built in 1692, it is said to mark the meditation site of Guru Rinpoche (Padmasambhava), who arrived here on the back of a flying tigress in the 8th century. The monastery suffered a fire in 1998 and was carefully restored to its former glory. The trek is moderately challenging and takes you through pine forests, prayer flags, and scenic viewpoints. To reach their it will take around 5–7 hours (round trip), including time to explore the monastery. OR Chele La Pass: It is, at an elevation of 13,088 feet, holds the title as the highest motorable road in Bhutan. This thrilling journey offers breathtaking views as you ascend through lush forests, pine trees, and colorful prayer flags fluttering against the sky. Once you arrive at Chele La Pass, take in the panoramic vistas of the Himalayan peaks, with a chance to see Mount Jomolhari on clear days. The pass is also known for its diverse flora and fauna, adding to the enchanting ambiance of this picturesque location. Overnight stay hotel in Paro.",
          points: [
            "Breakfast at hotel",
            "Visit Rinpung Dzong (Paro Dzong) - Built in 1644 with traditional Bhutanese architecture",
            "Visit Kyichu Lhakhang - Part of 108 temples built by the king",
            "OR Tiger's Nest Trek (Paro Taktsang) - Iconic monastery at 3,120 meters",
            "Trek through pine forests, prayer flags, and scenic viewpoints",
            "5-7 hours round trip including monastery exploration",
            "OR Chele La Pass - Highest motorable road in Bhutan at 13,088 feet",
            "Panoramic vistas of Himalayan peaks including Mount Jomolhari",
            "Overnight stay in Paro"
          ]
        },
        day5: {
          title: "DAY 5: Departure",
          description: "After soaking in the beauty of Bhutan's sights, you will be greeted with a delightful breakfast. After which you'll be transferred to NJP (New Jalpaiguri Station) or Bagdogra in Siliguri, passing through the scenic Phuentsholing, as you embark on your journey back home, carrying unforgettable memories of your Bhutan adventure.",
          points: [
            "Delightful breakfast at hotel",
            "Transfer to Alipurduar Station",
            "Scenic journey passing through Phuentsholing",
            "Departure with unforgettable memories of Bhutan adventure"
          ]
        }
      },
      importantNotes: [
        "Documents required for Bhutan Immigration is Voter id / Passport (Passport with 6 month and above validity).",
        "Children under 18 years can carry original birth Certificate along with school id/Aadhar Card.",
        "Hotels are very strict with the child policy. Please carry the age proof so that it can be produced if asked by the hotel.",
        "A valid photo ID proof for all guests staying at the hotel is mandatory.",
        "For Extra adult in the room, we will provide an extra bed (wherever possible), but most of the hotels only provide an extra mattress or roll out bed. Most of the hotels have no provision of an extra bed.",
        "The above-mentioned hotels will be confirmed as per the room availability. Otherwise, a similar category hotel will be provided. All the rooms are base category."
      ],
      contactInfo: {
        address: "Nyati Estate, Mohammadwadi, Pune, 411060",
        phone: "+91 9970393335",
        email: "shneiur.joseph@jjtia.com",
        website: "JJ & TIA Tours and Travels | Book Your Tour Package Now"
      }
    }
  };

  // Comprehensive Bhutan package data for ID 3 (4N/5D, same as package 2)
  const bhutanPackage3 = {
    id: 3,
    title: "Bhutan Tour for 4 Nights / 5 Days",
    description: "Experience the mystical kingdom of Bhutan with our comprehensive 4N/5D tour covering Phuentsholing, Thimphu & Paro. This package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
    duration: "4N/5D",
    destination: "Bhutan",
    price: "25,200.00",
    originalPrice: "30,000.00",
    discount: "16% OFF",
    mainImage: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    highlights: ["Phuentsholing", "Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage"],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in NJP Station/ Airport and Transfer To Phuentsholing",
        description: "Arrive at Bagdogra Airport and transfer to Phuentsholing with immigration formalities.",
        activities: ["Airport pickup", "Immigration process", "Phuentsholing transfer"]
      },
      {
        day: "Day 2",
        title: "Phuentsholing to Thimphu Transfer",
        description: "Transfer to Thimphu via Gedu with scenic views and cultural stops.",
        activities: ["Scenic drive", "Cultural stops", "Thimphu arrival"]
      },
      {
        day: "Day 3",
        title: "Thimphu Local Sightseeing & Transfer to Paro",
        description: "Explore Thimphu's key attractions and transfer to Paro.",
        activities: ["City tour", "Cultural sites", "Transfer to Paro"]
      },
      {
        day: "Day 4",
        title: "Paro Local Sightseeing",
        description: "Discover Paro's enchanting sights including Tiger's Nest Monastery.",
        activities: ["Monastery visits", "Tiger's Nest trek", "Cultural exploration"]
      },
      {
        day: "Day 5",
        title: "Departure from Paro to Bagdogra airport / NJP Station",
        description: "Transfer back to Bagdogra airport/NJP Station with unforgettable memories of Bhutan.",
        activities: ["Hotel checkout", "Return transfer", "Departure"]
      }
    ],
    inclusions: [
      "Accommodation on twin Sharing Basis.",
      "Meals as per plan (Breakfast & Dinner).",
      "SDF Charges (1200/-per person per night) Mandatory",
      "Bhutanese guide Mandatory",
      "Mineral water bottle per day",
      "Exclusive vehicle for transfers & sightseeing",
      "All permit fees & hotel taxes (as per itinerary).",
      "Rates are valid for INDIAN NATIONALS only."
    ],
    exclusions: [
      "Air Fare / Train fare.",
      "Personal expenses such as laundry, telephone calls, tips & gratuity, Extra mineral water, soft & hard drinks, rafting,",
      "Entrance Fees, (Monument fee)",
      "Additional sightseeing or extra usage of vehicles",
      "Any increase in taxes or fuel price",
      "Anything which is not included in the inclusion."
    ],
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment: "Amazing experience with JJ & TIA Tours! The Bhutan trip was perfectly organized and exceeded all our expectations."
      },
      {
        name: "Raj Patel",
        rating: 5,
        comment: "Fantastic service and great value for money. Our Bhutan tour was unforgettable!"
      },
      {
        name: "Priya Sharma",
        rating: 5,
        comment: "Professional team with excellent attention to detail. Highly recommend for family trips!"
      }
    ],
    detailedInfo: {
      companyDescription: "JJ & TIA Tours and Travels. Your Path to Unforgettable Adventures. At JJ & TIA Tours and Travels (sister company of Travellers Paradise: Travellers Paradise Tours & Travels - Profile, Reviews & Ratings), we specialize in crafting unique and personalized travel experiences that take you beyond the ordinary. Founded on a passion for exploration and a deep love for cultures, our company has been helping travelers of all types—from solo explorers to family groups—discover the beauty of the world for over a decade. Whether you're looking for a serene getaway in the mountains, an exciting cultural immersion in bustling cities, or a relaxing beach vacation, our team of experienced travel experts is dedicated to curating the perfect trip tailored to your interests and desires. We handle all the details—from flights and accommodations to excursions and local experiences—so you can focus on enjoying the journey. At JJ & TIA Tours and Travels, we believe that travel is about more than just sightseeing; it's about creating memories, fostering meaningful connections, and experiencing the world in a way that enriches your life. Let us take you on a journey you'll never forget.",
      services: [
        "Customized travel planning",
        "Guided tours & local experiences", 
        "Group & family vacations",
        "Luxury & adventure travel",
        "Honeymoons & romantic getaways",
        "Corporate & incentive travel"
      ],
      destinations: ["Phuentsholing", "Thimphu", "Paro"],
      transportation: {
        inBhutan: "Ertiga",
        transfers: "Using Swift Desire transfers from Bagdogra Airport/NJP Station"
      },
      tourDetails: {
        duration: "4N/5D",
        travelers: "03 Adults", 
        hotelCategory: "3 Star",
        mealPlan: "Breakfast & Dinner",
        month: "Aug"
      },
      itinerary: [
        {
          day: "DAY 1",
          description: "Arrival in NJP Station/ Airport and Transfer To Phuentsholing."
        },
        {
          day: "DAY 2", 
          description: "Phuentsholing to Thimphu Transfer."
        },
        {
          day: "DAY 3",
          description: "Thimphu Local Sightseeing & Transfer to Paro."
        },
        {
          day: "DAY 4",
          description: "Paro Local Sightseeing."
        },
        {
          day: "DAY 5",
          description: "Departure from Paro to Bagdogra airport / NJP Station."
        }
      ],
      hotels: [
        {
          city: "Thimphu",
          hotel: "Hotel Darlha or Similar",
          rooms: "1 Room, 1 Extra Mattress",
          roomType: "Double Sharing",
          nights: "01"
        },
        {
          city: "Paro",
          hotel: "Hotel Tashiling or Similar", 
          rooms: "1 Room, 1 Extra Mattress",
          roomType: "Double Sharing",
          nights: "02"
        },
        {
          city: "Phuentsholing",
          hotel: "Hotel Evergreen 9 or Similar", 
          rooms: "1 Room, 1 Extra Mattress",
          roomType: "Double Sharing",
          nights: "01"
        }
      ],
      packageCost: "25,200/- Per Person",
      inclusions: [
        "Accommodation on twin Sharing Basis.",
        "Meals as per plan (Breakfast & Dinner).",
        "SDF Charges (1200/-per person per night) Mandatory",
        "Bhutanese guide Mandatory",
        "Mineral water bottle per day",
        "Exclusive vehicle for transfers & sightseeing. Please brief to guest that vehicle will not be at disposal it will be available to guest as per itinerary only (point to point basis) (CAR TIMING 9 AM TO 7 PM DURING SIGHTSEEING)",
        "All permit fees & hotel taxes (as per itinerary).",
        "Rates are valid for INDIAN NATIONALS only."
      ],
      exclusions: [
        "Air Fare / Train fare.",
        "Personal expenses such as laundry, telephone calls, tips & gratuity, Extra mineral water, soft & hard drinks, rafting,",
        "Entrance Fees, (Monument fee)",
        "Additional sightseeing or extra usage of vehicles, other than mentioned in the itinerary. Any cost arising due to natural calamities like, landslides, road blockage, political disturbances (strikes), etc. (to be borne by the client, who is directly payable on the spot).",
        "Any increase in taxes or fuel price, leading to increase in cost on surface transportation & land arrangements, which may come into effect prior to departure.",
        "Anything which is not included in the inclusion."
      ],
      dayDetails: {
        day1: {
          title: "DAY 1: Arrival in NJP Station/ Airport and Transfer To Phuentsholing",
          description: "Arrival at Bagdogra Airport: Upon arrival, you will be greeted by our driver or tour representative at the airport. After a brief introduction, we will start your journey toward Phuentsholing, the border town of Bhutan (170 km, approx. 4-5 hours). The drive is scenic, passing through lush green landscapes, tea gardens, and small towns in North Bengal. Check-in at Phuentsholing: On arrival in Phuentsholing, our tour representative will assist you with the Bhutan immigration process. Immigration formalities include submitting your travel permits and identification (passport or voter ID for Indian citizens). Post formalities, check into your hotel in Phuentsholing. Overnight hotel in Phuentsholing.",
          points: [
            "Arrival at Bagdogra Airport with driver or tour representative",
            "Brief introduction and start journey toward Phuentsholing (170 km, 4-5 hours)",
            "Scenic drive through lush green landscapes, tea gardens, and small towns",
            "Bhutan immigration process assistance in Phuentsholing",
            "Submit travel permits and identification (passport or voter ID for Indian citizens)",
            "Check into hotel in Phuentsholing",
            "Overnight stay in Phuentsholing"
          ]
        },
        day2: {
          title: "DAY 2: Phuentsholing to Thimphu Transfer",
          description: "After breakfast you, will be transferred to Thimpu. The capital of Bhutan via Gedu, which is located about 9000 ft. above the sea and view of Chukha Dam. En route, take a small stopover at the Chuzom Bridge from where you will see a beautiful confluence of the Paro and Thimphu rivers, along with a beautiful portrait of the King and Queen as a welcoming sign to Bhutan. View of Chukha Dam and stop over at Wankha Waterfall for photo session. Reach Thimpu in the evening. On arrival check in at the hotel. In the evening, visit the Tashichho Dzong (Fortress of the Glorious Religion). Overnight stay at Thimphu.",
          points: [
            "Breakfast at hotel",
            "Transfer to Thimphu via Gedu (9000 ft. above sea level)",
            "View of Chukha Dam during the journey",
            "Stopover at Chuzom Bridge - beautiful confluence of Paro and Thimphu rivers",
            "View beautiful portrait of King and Queen as welcoming sign to Bhutan",
            "Photo session stopover at Wankha Waterfalls",
            "Arrival in Thimphu in the evening",
            "Hotel check-in upon arrival",
            "Evening visit to Tashichho Dzong (Fortress of the Glorious Religion)",
            "Overnight stay at Thimphu"
          ]
        },
        day3: {
          title: "DAY 3: Thimphu Local Sightseeing & Transfer to Paro",
          description: "After Breakfast you can visit places like: The National Memorial Chorten: Built-in the memory of the third Druk Gyalpo (Head of Kingdom) of Bhutan, the National Memorial Chorten is devoted to World Peace. The Chorten popular amongst the localities for various major Buddhist religious festivals and it is one of the best places to see in Thimphu Bhutan. Buddha Dordenma Statue - Atop a hill in Thimphu, is a massive, golden Buddha sitting atop a gilded meditation hall. Hidden inside it has 125,000 smaller Buddha's. This means that in Thimphu, there are more Buddha statues than this city's population (100000), it is also known as Budda point. Changangkha Lhakhang – In Thimphu there are many monasteries and temple that you will get to see and among them. Changangkha Lhakhang is one of the most religious structures. It was built in the 12th century and its one of the oldest Lhakhang located in Thimphu .It's also known as the wish fulfilling temple, from here you can see the amazing view of Thimphu city The motitang Takin Preserve – For animal lovers, Motithang Takin Preserve is one of the best places to visit in Thimphu. This attractive preserved area was built as a small zoo but later it was converted into an animal preserve center. Takin -The national animal of Bhutan, lives in the Motithang Takin Preserve in Thimphu Tashi Chho Dzong (It is open @ 5pm for 1 Hrs only) - It is a monastery which is located next to bank of Wang Chhu River, It is also known as Thimphu Dzong. Annual 3 days Tsechu festival is also hosted every year at TashiChho Dzong. It was built in 1216 A.D. After visiting the places in Thimphu you will be transferred to Paro. Overnight stay in Paro.",
          points: [
            "Breakfast at hotel",
            "Visit National Memorial Chorten - Built in memory of the third Druk Gyalpo",
            "Explore Buddha Dordenma Statue - Massive golden Buddha with 125,000 smaller Buddhas inside",
            "Visit Changangkha Lhakhang - 12th century temple known as the wish fulfilling temple",
            "Explore Motithang Takin Preserve - Home to Bhutan's national animal, the Takin",
            "Visit Tashi Chho Dzong - Monastery located next to Wang Chhu River (Open @ 5pm for 1 hour only)",
            "Transfer to Paro in the evening",
            "Overnight stay in Paro"
          ]
        },
        day4: {
          title: "DAY 4: Paro Local Sightseeing",
          description: "Start your day with a delightful breakfast. Then set off to discover the enchanting sights of Paro, which includes places like: Simtokha Dzong : This Dzong, was built in the year 1629 also known as Sangak Zabdhon Phodrang by Zhabdrung Ngawang Namgyal, Simtokha Dzong was built in the 17th century and it is one of the oldest Dzong built .An very important and oldest structure.. National Museum of Bhutan: An ancient watchtower that now displays hundreds of ancient Bhutanese artifacts and artwork including traditional costumes, armor, weaponry, and handcrafted implements for daily life. The collections represent the rich cultural traditions of the country. Drukgyal Dzong: Drukgyal Dzong was a Buddhist Monastery. It is also translates as the 'Victorious Fortress'. This is the place where several victories over marauding Tibetan invaders. It is considered the most beautiful and famous archaeological site in Bhutan. Paro Airport View: This is one of the most stunning airports in the World and also the country's first and only international airport. With a breathtaking view, this airport became a must-visit place in Paro. Kyichu Lhakhang – It is also known as Kyerchu Buddhist Temple, Kyichu Lhakhang is a pilgrimage place as it is part of 108 temples which was built by the king ,it's very old and very beautiful and most visited OR Tiger's Nest Trek (Paro Taktsang): Tiger's Nest, or Paro Taktsang, is Bhutan's most iconic monastery, perched dramatically on a Cliffside 3,120 meters above sea level. It is a sacred pilgrimage site and one of the most photographed landmarks in Bhutan. Built in 1692, it is said to mark the meditation site of Guru Rinpoche (Padmasambhava), who arrived here on the back of a flying tigress in the 8th century. The monastery suffered a fire in 1998 and was carefully restored to its former glory. The trek is moderately challenging and takes you through pine forests, prayer flags, and scenic viewpoints. To reach their it will take around 5–7 hours (round trip), including time to explore the monastery. Overnight stay hotel in Paro.",
          points: [
            "Delightful breakfast at hotel",
            "Visit Simtokha Dzong - Built in 1629, one of the oldest Dzongs",
            "Explore National Museum of Bhutan - Ancient watchtower with Bhutanese artifacts",
            "Visit Drukgyal Dzong - 'Victorious Fortress', famous archaeological site",
            "Paro Airport View - One of the most stunning airports in the world",
            "Visit Kyichu Lhakhang - Part of 108 temples built by the king",
            "OR Tiger's Nest Trek (Paro Taktsang) - Iconic monastery at 3,120 meters",
            "Trek through pine forests, prayer flags, and scenic viewpoints",
            "5-7 hours round trip including monastery exploration",
            "Overnight stay in Paro"
          ]
        },
        day5: {
          title: "DAY 5: Departure from Paro to Bagdogra airport / NJP Station",
          description: "After soaking in the beauty of Bhutan's sights, you will be greeted with a delightful breakfast. After which you'll be transferred to NJP (New Jalpaiguri Station) or Bagdogra in Siliguri, passing through the scenic Phuentsholing, as you embark on your journey back home, carrying unforgettable memories of your Bhutan adventure.",
          points: [
            "Delightful breakfast at hotel",
            "Transfer to Bagdogra airport / NJP Station",
            "Scenic journey passing through Phuentsholing",
            "Departure with unforgettable memories of Bhutan adventure"
          ]
        }
      },
      importantNotes: [
        "Documents required for Bhutan Immigration is Voter id / Passport (Passport with 6 month and above validity).",
        "Children under 18 years can carry original birth Certificate along with school id/Aadhar Card.",
        "Hotels are very strict with the child policy. Please carry the age proof so that it can be produced if asked by the hotel.",
        "A valid photo ID proof for all guests staying at the hotel is mandatory.",
        "For Extra adult in the room, we will provide an extra bed (wherever possible), but most of the hotels only provide an extra mattress or roll out bed. Most of the hotels have no provision of an extra bed.",
        "The above-mentioned hotels will be confirmed as per the room availability. Otherwise, a similar category hotel will be provided. All the rooms are base category."
      ],
      contactInfo: {
        address: "Nyati Estate, Mohammadwadi, Pune, 411060",
        phone: "+91 9970393335",
        email: "shneiur.joseph@jjtia.com",
        website: "JJ & TIA Tours and Travels | Book Your Tour Package Now"
      }
    }
  };

  // Comprehensive Bhutan package data for ID 4 (4N/5D, same as package 3)
  const bhutanPackage4 = {
    ...bhutanPackage3,
    id: 4,
    mainImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ]
  };

  // Nepal Package Data for ID 1 (3N/4D)
  const nepalPackage1 = {
    id: 1,
    title: "Nepal 3-Star Tour for 3 Nights / 4 Days",
    description: "Discover the enchanting beauty of Nepal with our comprehensive 3N/4D tour covering Chandargiri & Kathmandu. Experience the birthplace of Lord Buddha, stunning Himalayan views, and rich cultural heritage including Pashupatinath Temple, Boudhanath Stupa, and Swayambhunath Monkey Temple.",
    duration: "3N/4D",
    destination: "Nepal",
    price: "9,999.00",
    originalPrice: "12,000.00",
    discount: "17% OFF",
    mainImage: "https://res.cloudinary.com/duh46icya/image/upload/v1756805328/Swayambhunath_or_Monkey_Temple_Kathmandu_hlcvuw.jpg",
    gallery: [
      "https://res.cloudinary.com/duh46icya/image/upload/v1756805328/Swayambhunath_or_Monkey_Temple_Kathmandu_hlcvuw.jpg",
      "https://res.cloudinary.com/duh46icya/image/upload/v1756805327/Swayambhunath_or_Monkey_Temple_Kathmandu_2_wd4u0a.jpg",
      "https://res.cloudinary.com/duh46icya/image/upload/v1756805327/Pashupatinath_Temple_Kathmandu_2_ihsduk.jpg",
      "https://res.cloudinary.com/duh46icya/image/upload/v1756805324/Pashupatinath_Temple_Kathmandu_krzfnz.jpg",
      "https://res.cloudinary.com/duh46icya/image/upload/v1756805324/Palace_of_Fifty_Five_Windows_Kathmandu_j7mx4l.jpg",
      "https://res.cloudinary.com/duh46icya/image/upload/v1756805322/Palace_of_Fifty_Five_Windows_Kathmandu_2_y6i6bj.jpg",
      "https://res.cloudinary.com/duh46icya/image/upload/v1756805322/Nyatapola_Temple_Kathmandu_lk9icr.jpg",
      "https://res.cloudinary.com/duh46icya/image/upload/v1756805319/Nyatapola_Temple_Kathmandu_2_ktlwnt.jpg",
      "https://res.cloudinary.com/duh46icya/image/upload/v1756805317/Nagarkot_Kathmandu_3_hmqmrr.jpg",
      "https://res.cloudinary.com/duh46icya/image/upload/v1756805317/Nagarkot_Kathmandu_2_jp0fhe.jpg"
    ],
    highlights: ["Chandargiri & Kathmandu", "Pashupatinath Temple", "Boudhanath Stupa", "Swayambhunath Monkey Temple", "Kathmandu Durbar Square", "Cultural Heritage", "Bhaleshwor Mahadev Temple"],
    itinerary: [
      {
        day: "Day 1",
        title: "Welcome to Kathmandu - Gorakhpur to Kathmandu Transfer",
        description: "Start your day early and begin the scenic road trip towards the enchanting city of Kathmandu, the pulsating capital of Nepal. Upon arrival, a warm welcome awaits you as a representative greets you and escorts you to your chosen haven of rest.",
        activities: ["Airport pickup", "Transfer to Kathmandu", "Hotel check-in", "Free time for local exploration"]
      },
      {
        day: "Day 2",
        title: "Kathmandu Full Day Sightseeing",
        description: "Early morning breakfast - Guest start the sightseeing tour in few major places in Kathmandu including Pashupatinath Temple, Boudhanath Stupa, Swayambhunath Monkey Temple, and Kathmandu Durbar Square.",
        activities: ["Pashupatinath Temple", "Boudhanath Stupa", "Swayambhunath Monkey Temple", "Kathmandu Durbar Square", "Hanuman Dhoka Palace"]
      },
      {
        day: "Day 3",
        title: "Kathmandu to Chandargiri - Day Trip Excursion",
        description: "Early morning breakfast to proceed to Chandargiri 14km/35min. This is a truly amazing trip as you ride effortlessly to the top of Chandragiri Hill (Elev. 2520 m) by cable car.",
        activities: ["Chandargiri Hill", "Cable car ride", "Bhaleshwor Mahadev Temple", "Panoramic views", "Return to Kathmandu"]
      },
      {
        day: "Day 4",
        title: "Kathmandu to Gorakhpur - Transfer Enroute Sightseeing",
        description: "Early Morning Breakfast checks out in hotel. You Will Drive to Kathmandu to Gorakhpur on 365km/9-10hrs. On the way you have an Option of doing river rafting or visit the Manakamana Temple.",
        activities: ["Hotel checkout", "Optional river rafting", "Manakamana Temple", "Return transfer to Gorakhpur"]
      },
      {
        day: "Day 5",
        title: "Kathmandu to Gorakhpur - Transfer Enroute Sightseen",
        description: "Early Morning after breakfast check out of the hotel. You Will Drive to Kathmandu to Gorakhpur on 365km/9-10hrs.",
        activities: ["Hotel checkout", "River rafting option", "Manakamana Temple", "Return transfer"]
      }
    ],
    inclusions: [
      "Meal As Specified",
      "Transfer: Arrival / Departure and Day wise Sightseeing as Mentioned",
      "Cabs : Normal/AC",
      "All Parking, Toll and Driver Charges",
      "Permit Charges Nepal",
      "Accommodation on Twin/Triple Sharing Basis",
      "Assistance by Trip advisor during the Trip"
    ],
    exclusions: [
      "Insurance Fee",
      "Train fare/Air Fare",
      "Monuments entrance fees as applicable & payable fee on the spot",
      "Manakamana Cable car ticket",
      "Boat ride fee on Fewa Lake",
      "Personal expenses, tipping and any other services which are not mentioned in the above inclusion"
    ],
    reviews: [
      {
        name: "Anita Sharma",
        rating: 5,
        comment: "Incredible Nepal experience! The tour was perfectly organized with amazing sights from Lumbini to the Himalayas."
      },
      {
        name: "Rajesh Kumar",
        rating: 5,
        comment: "Fantastic service and great value for money. Our Nepal tour was unforgettable with JJ&Tia Tours!"
      },
      {
        name: "Priya Singh",
        rating: 5,
        comment: "Professional team with excellent attention to detail. Highly recommend for family trips to Nepal!"
      }
    ],
    detailedInfo: {
      companyDescription: "JJ&Tia Tours and Travels. Your Path to Unforgettable Adventures. At JJ&Tia Tours and Travels (sister company of Travellers Paradise: Travellers Paradise Tours & Travels - Profile, Reviews & Ratings), we specialize in crafting unique and personalized travel experiences that take you beyond the ordinary. Founded on a passion for exploration and a deep love for cultures, our company has been helping travelers of all types—from solo explorers to family groups—discover the beauty of the world for over a decade. Whether you're looking for a serene getaway in the mountains, an exciting cultural immersion in bustling cities, or a relaxing beach vacation, our team of experienced travel experts is dedicated to curating the perfect trip tailored to your interests and desires. We handle all the details—from flights and accommodations to excursions and local experiences—so you can focus on enjoying the journey. At JJ&Tia Tours and Travels, we believe that travel is about more than just sightseeing; it's about creating memories, fostering meaningful connections, and experiencing the world in a way that enriches your life. Let us take you on a journey you'll never forget. \"Discover more on our official website- just a click away!\" JJ&Tia Tours and Travels | Book Your Tour Package Now.",
      services: [
        "Customized travel planning",
        "Guided tours & local experiences",
        "Group & family vacations",
        "Luxury & adventure travel",
        "Honeymoons & romantic getaways",
        "Corporate & incentive travel"
      ],
      destinations: ["Pokhara", "Kathmandu", "Lumbini"],
      transportation: {
        inNepal: "Sedan (For Sightseeing)",
        transfers: "Using Sedan transfers from Gorakhpur"
      },
      tourDetails: {
        duration: "4N/5D",
        travelers: "02 Adults",
        hotelCategory: "3 Star",
        mealPlan: "Breakfast Only",
        month: "Aug-Dec"
      },
      hotels: [
        {
          city: "Pokhara",
          hotel: "Hotel Muktinath or Similar",
          rooms: "1 Room",
          roomType: "1 Deluxe Room NAC",
          nights: "02"
        },
        {
          city: "Kathmandu",
          hotel: "Kailash or Similar",
          rooms: "1 Room",
          roomType: "1 Deluxe Room NAC",
          nights: "02"
        }
      ],
      dayDetails: {
        day1: {
          title: "Gorakhpur to Pokhara - Transfer Enroute Sightseen Lumbini",
          points: [
            "Post Breakfast in the Morning, Leave By Road for Sunouli. It is An Important Border Crossing Between India and Nepal.",
            "Later, Enjoy Sightseeing At Sunouli. Later, Continue with Your Drive Towards Lumbini-the Birth Place of Lord Buddha.",
            "There are Several 'world Heritage Sites' Which Has Lots to Offer for Sightseeing Which Include Visiting Bodhi Tree & Pond, Ashoka Pillar, Pillar Edict for Ashoka, Eternal Peace Flame, Lumbini Garden, Burmese Lokamani Kala Pagoda and Chinese Maitreya Temple.",
            "Finally, Head Towards Pokhara. Stay Overnight At the Hotel in Pokhara.",
            "Approx. Distance: 350 km"
          ]
        },
        day2: {
          title: "Pokhara - Full Day Sightseeing",
          points: [
            "Start your day with an early breakfast at your hotel, preparing yourself for an exciting day ahead. After breakfast, get ready to explore the natural and cultural beauty of Pokhara.",
            "Bindebasini Temple: Located around 7 kilometers (approximately 20 minutes) from Lakeside, the Vindhyasini Temple is a peaceful site perched on a hill. The temple is dedicated to Goddess Vindhyavasini and offers a serene atmosphere, making it a peaceful start to the day.",
            "Mahendra Cave: It is just 3 km (around 10 minutes) from Vindhyasini Temple. This limestone cave is a marvel of nature. Inside, you will find fascinating stalactites and stalagmites.",
            "Gorakha Museum: About 15 minutes from Mahendra Cave, the Gorakha Museum is located near the old Bazaar. The museum showcases the rich cultural and historical heritage of the region.",
            "Gupteshwar Cave: A quick 10-minute drive (3 km) from the museum will bring you to Gupteshwar Cave. This cave, dedicated to Lord Shiva, is a revered site for pilgrims.",
            "David's Waterfall: A short 5-minute drive (2 km) from Gupteshwar Cave. David's Waterfall, also known as Devi's Fall, is one of Pokhara's most famous natural sites.",
            "Fewa Lake – Lakeside Area: Located just 5 minutes (1.5 km) from the waterfall, Fewa Lake is at the heart of Pokhara's tourist activity. Evening free to stroll around the area. Night stay at Pokhara. Approx. Distance: 40 km."
          ]
        },
        day3: {
          title: "Pokhara to Kathmandu - Transfer Enroute Sightseen",
          points: [
            "Early Morning breakfast check out hotel. You will drive to Kathmandu is 210 kms from Pokhara and is a 7 hours' drive approx.",
            "In good weather there are splendid views right from the hotel. On the way you have an option of doing river rafting or visit the Manakamana Temple \"Goddess of Fulfilling Wishes\" where you are taken by a cable ride (at extra cost) of 9 mins.",
            "Once you reach Kathmandu, check-in to your hotel and relax for some time. Overnight stay at Kathmandu.",
            "Approx. Distance: 250 km"
          ]
        },
        day4: {
          title: "Kathmandu - Full Day Sightseeing",
          points: [
            "Early morning breakfast - Guest start the sightseeing tour in few major places in Kathmandu like:",
            "Swayambhunath (Monkey Temple): One of the most iconic and ancient stupas in Kathmandu, also known as the Monkey Temple due to the large population of monkeys that roam the area. The stupa sits atop a hill, offering sweeping views of the Kathmandu Valley.",
            "Boudhanath Stupa: This massive, ancient stupa is one of the largest in Nepal and a UNESCO World Heritage Site. It stands as a central point of Tibetan Buddhism in Nepal.",
            "Pashupatinath Temple: One of the holiest Hindu temples in the world, this ancient temple complex is dedicated to Lord Shiva. Situated along the Bagmati River, it attracts thousands of pilgrims and tourists each year.",
            "Kathmandu Durbar Square: Begin your exploration at the Hanuman Dhoka Palace area, which served as the royal residence for the Malla Kings. This grand structure showcases stunning traditional Nepali architecture.",
            "As the evening light softens, take a leisurely walk around the bustling local bazaars that surround Kathmandu Durbar Square. Night stay at Kathmandu."
          ]
        },
        day5: {
          title: "Kathmandu to Gorakhpur - Transfer Enroute Sightseen",
          points: [
            "Early Morning after breakfast check out of the hotel. You Will Drive to Kathmandu to Gorakhpur on 365km/9-10hrs.",
            "On the way you have an Option of doing river rafting or visit the Manakamana Temple \"Goddess of Fulfilling Wishes\" where you are taken by a cable ride (at extra cost) of 9 mins.",
            "Once you reach Kathmandu, check-in to your hotel and relax for some time. On arrival you will be transferred to the airport/railway station to board the flight/Train back to home.",
            "Approx. Distance: 400 km"
          ]
        }
      },
      packageCost: "XXXX/- Per Person",
      contactInfo: {
        address: "Nyati Estate, Mohammadwadi, Pune, 411060",
        phone: "+91 9970393335",
        email: "shneiur.joseph@jjtia.com"
      },
      importantNotes: [
        "Standard check-in time at the hotel is normally 2:00 pm and check-out is 11:00 am. An early check-in or a late check-out is solely based on the discretion of the hotel.",
        "A maximum of 3 adults are allowed in one room. The third occupant shall be provided a mattress/rollaway bed with extra charges.",
        "The itinerary can be modified as per your requirement.",
        "Please note and be informed that there will be no refund of money after the packages commences and if one cannot complete activity or get sick enroute.",
        "The above-mentioned hotels will be confirmed as per the room availability. Otherwise, a similar category hotel will be provided. All the rooms are base category."
      ]
    }
  };

  // Use the appropriate package data based on ID, otherwise use mock data
  const packageData = id === "1" ? nepalPackage1 : id === "2" ? bhutanPackage1 : id === "3" ? bhutanPackage2 : id === "4" ? bhutanPackage3 : id === "5" ? bhutanPackage4 : {
    id: 2,
    title: "4 NIGHTS 5 DAYS BHUTAN FAMILY TOUR PACKAGES",
    description: "The Bhutan Family Tour Packages offer a blend of cultural heritage, natural beauty, and adventure, perfect for families looking to explore this mystical kingdom. With stops in Paro, Thimphu, and Punakha, this comprehensive tour provides an authentic experience of Bhutan's rich culture and stunning landscapes.",
    duration: "5D/4N",
    destination: "Bhutan",
    price: "29,999.00",
    originalPrice: "35,999.00",
    discount: "17% OFF",
    mainImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Visit the iconic Tiger's Nest Monastery",
      "Explore the capital city of Thimphu",
      "Experience traditional Bhutanese culture",
      "Enjoy stunning mountain views",
      "Sample authentic local cuisine",
      "Guided tours with expert local guides"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Paro",
        description: "Arrive at Paro International Airport. Transfer to hotel. Evening at leisure to explore Paro town.",
        activities: ["Airport pickup", "Hotel check-in", "Paro town exploration"]
      },
      {
        day: "Day 2",
        title: "Paro - Thimphu",
        description: "Drive to Thimphu, the capital city. Visit key attractions including the Buddha Dordenma statue.",
        activities: ["Thimphu city tour", "Buddha Dordenma", "Traditional market visit"]
      },
      {
        day: "Day 3",
        title: "Thimphu - Punakha",
        description: "Travel to Punakha valley. Visit the magnificent Punakha Dzong and explore the valley.",
        activities: ["Punakha Dzong", "Valley exploration", "Local village visit"]
      },
      {
        day: "Day 4",
        title: "Punakha - Paro",
        description: "Return to Paro. Visit the iconic Tiger's Nest Monastery with breathtaking views.",
        activities: ["Tiger's Nest hike", "Monastery visit", "Sunset photography"]
      },
      {
        day: "Day 5",
        title: "Departure",
        description: "Morning at leisure. Transfer to airport for departure with unforgettable memories.",
        activities: ["Hotel checkout", "Airport transfer", "Departure"]
      }
    ],
    inclusions: [
      "Accommodation in 3-star hotels",
      "All meals (breakfast, lunch, dinner)",
      "Transportation in comfortable vehicle",
      "English speaking guide",
      "All entrance fees",
      "Bhutan visa processing",
      "Travel insurance"
    ],
    exclusions: [
      "International airfare",
      "Personal expenses",
      "Tips and gratuities",
      "Alcoholic beverages",
      "Optional activities"
    ],
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment: "Amazing experience with JJ & TIA Tours! The Bhutan trip was perfectly organized and exceeded all our expectations."
      },
      {
        name: "Raj Patel",
        rating: 5,
        comment: "Fantastic service and great value for money. Our Bhutan tour was unforgettable!"
      },
      {
        name: "Priya Sharma",
        rating: 5,
        comment: "Professional team with excellent attention to detail. Highly recommend for family trips!"
      }
    ]
  };

  const handleBookNow = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Packages
            </button>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery Section - Only for Bhutan Package */}
        {(id === "1" || id === "2" || id === "3" || id === "4") && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Main Large Image */}
              <div className="relative h-[500px] overflow-hidden">
                  <img 
                    src={packageData.gallery[selectedImage]}
                    alt={packageData.title}
                  className="w-full h-full object-cover"
                  />
                <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h1 className="text-3xl font-bold mb-2">{packageData.title}</h1>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {packageData.destination}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {packageData.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {id === "1" ? "4 Adults" : "02 Adults + 1 Child (9 Yrs)"}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {packageData.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`overflow-hidden rounded-lg transition-all ${
                        selectedImage === index ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <img 
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 object-cover hover:scale-105 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Package Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{packageData.title}</h1>
                  <p className="text-gray-600 mb-4">{packageData.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {packageData.duration}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {packageData.destination}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      4 Adults
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary mb-1">₹{packageData.price}</div>
                  {packageData.originalPrice && (
                    <div className="text-gray-500 line-through">₹{packageData.originalPrice}</div>
                  )}
                  {packageData.discount && (
                    <Badge className="bg-green-100 text-green-800">{packageData.discount}</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Company Information - Only for Bhutan Package */}
            {(id === "1" || id === "2" || id === "3" || id === "4") && 'detailedInfo' in packageData && packageData.detailedInfo && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About JJ & TIA Tours and Travels</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{packageData.detailedInfo.companyDescription}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Services</h3>
                    <ul className="space-y-2">
                      {packageData.detailedInfo.services.map((service, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tour Details</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span><strong>Duration:</strong> {packageData.detailedInfo.tourDetails.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span><strong>Travelers:</strong> {packageData.detailedInfo.tourDetails.travelers}</span>
                      </div>
                      <div className="flex items-center">
                        <Hotel className="h-4 w-4 mr-2" />
                        <span><strong>Hotel Category:</strong> {packageData.detailedInfo.tourDetails.hotelCategory}</span>
                      </div>
                      <div className="flex items-center">
                        <Utensils className="h-4 w-4 mr-2" />
                        <span><strong>Meal Plan:</strong> {packageData.detailedInfo.tourDetails.mealPlan}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transportation Details - Only for Bhutan Package */}
            {(id === "2" || id === "3" || id === "4" || id === "5") && 'detailedInfo' in packageData && packageData.detailedInfo && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Transportation</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">In {packageData.destination}</h3>
                    <div className="flex items-center text-gray-600">
                      <Car className="h-4 w-4 mr-2" />
                      {'inBhutan' in packageData.detailedInfo.transportation 
                        ? packageData.detailedInfo.transportation.inBhutan 
                        : packageData.detailedInfo.transportation.inNepal}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Transfers</h3>
                    <div className="flex items-center text-gray-600">
                      <Car className="h-4 w-4 mr-2" />
                      {packageData.detailedInfo.transportation.transfers}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hotels Information - Only for Bhutan Package */}
            {(id === "2" || id === "3" || id === "4" || id === "5") && 'detailedInfo' in packageData && packageData.detailedInfo && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Accommodation</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-2 text-left">City</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Hotel/Resort</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Rooms</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Room Type</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Nights</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packageData.detailedInfo.hotels.map((hotel, index) => (
                        <tr key={index}>
                          <td className="border border-gray-200 px-4 py-2">{hotel.city}</td>
                          <td className="border border-gray-200 px-4 py-2">{hotel.hotel}</td>
                          <td className="border border-gray-200 px-4 py-2">{hotel.rooms}</td>
                          <td className="border border-gray-200 px-4 py-2">{hotel.roomType}</td>
                          <td className="border border-gray-200 px-4 py-2">{hotel.nights}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Detailed Itinerary - Only for Bhutan Package */}
            {(id === "2" || id === "3" || id === "4" || id === "5") && 'detailedInfo' in packageData && packageData.detailedInfo && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {Object.entries(packageData.detailedInfo.dayDetails).map(([dayKey, dayData]) => (
                    <div key={dayKey} className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{dayData.title}</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {dayData.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="text-sm leading-relaxed">{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Itinerary for other packages */}
            {id !== "2" && id !== "3" && id !== "4" && id !== "5" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Itinerary</h2>
                <div className="space-y-6">
                  {packageData.itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{day.day}: {day.title}</h3>
                      <p className="text-gray-600 mb-3">{day.description}</p>
                            <div className="flex flex-wrap gap-2">
                        {day.activities.map((activity, actIndex) => (
                          <Badge key={actIndex} variant="secondary">{activity}</Badge>
                              ))}
                            </div>
                          </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                <ul className="space-y-2">
                  {((id === "2" || id === "3" || id === "4" || id === "5") && 'detailedInfo' in packageData && packageData.detailedInfo ? packageData.detailedInfo.inclusions : ('inclusions' in packageData ? packageData.inclusions : []))?.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                            </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Not Included</h2>
                <ul className="space-y-2">
                  {((id === "2" || id === "3" || id === "4" || id === "5") && 'detailedInfo' in packageData && packageData.detailedInfo ? packageData.detailedInfo.exclusions : ('exclusions' in packageData ? packageData.exclusions : []))?.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <div className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0">×</div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Notes - Only for Bhutan Package */}
            {(id === "2" || id === "3" || id === "4" || id === "5") && 'detailedInfo' in packageData && packageData.detailedInfo && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notes</h2>
                <ul className="space-y-2">
                  {packageData.detailedInfo.importantNotes.map((note, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
                      </div>
            )}

            {/* Contact Information - Only for Bhutan Package */}
            {(id === "2" || id === "3" || id === "4" || id === "5") && 'detailedInfo' in packageData && packageData.detailedInfo && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">JJ & TIA Tours and Travels</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {packageData.detailedInfo.contactInfo.address}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {packageData.detailedInfo.contactInfo.phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {packageData.detailedInfo.contactInfo.email}
                      </div>
                    </div>
                    </div>
                      <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Package Cost</h3>
                    <div className="text-2xl font-bold text-primary">{packageData.detailedInfo.packageCost}</div>
                    <p className="text-sm text-gray-500 mt-1">Includes cost for {id === "2" ? "4 Adults" : "02 Adults + 1 Child (9 Yrs)"}</p>
                  </div>
                </div>
                            </div>
            )}

            {/* Reviews */}
            {packageData.reviews && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
                <div className="space-y-4">
                  {packageData.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        <div className="flex items-center">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book This Package</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price per person:</span>
                  <span className="text-2xl font-bold text-primary">₹{packageData.price}</span>
                </div>
                {packageData.originalPrice && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Original price:</span>
                    <span className="text-gray-500 line-through">₹{packageData.originalPrice}</span>
                  </div>
                )}
                {packageData.discount && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-green-600 font-semibold">{packageData.discount}</span>
                  </div>
                )}
                <Button onClick={handleBookNow} className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
                      </div>
                    </div>

            {/* Highlights */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
              <div className="space-y-2">
                {packageData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage; 