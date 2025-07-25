import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Eye, Phone, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import packageVideo from "@/assets/Package.mp4";
import BestPlaceSection from "@/components/BestPlaceSection";

const PackagesPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'bhutan'>('all');

  const packages = [
    {
      id: 1,
      title: "Bhutan Tour for 3 Nights / 4 Days",
      description: "Experience the mystical kingdom of Bhutan with our comprehensive 3N/4D tour covering Thimphu & Paro. This package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
      duration: "3N/4D",
      destination: "Bhutan",
      price: "18,500.00",
      originalPrice: "22,000.00",
      discount: "16% OFF",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage", "Guided Tours"],
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
            description: "Upon arrival, you will be greeted by our driver or tour representative at the Railway Station. On arrival in Phuentsholing, our tour representative will assist you with the Bhutan immigration process. Immigration formalities include submitting your travel permits and identification (passport or voter ID for Indian citizens). After which you will be transferred to Thimpu. The capital of Bhutan via Gedu, which is located about 9000 ft. above the sea and on the way you can enjoy the view of Chukha Dam. We will have a quick stopover for photo session at Wankha Waterfalls. The journey from Phuentsholing to Thimphu is a scenic drive, and there are several noteworthy stops en route where you can relax, enjoy the views, and experience Bhutan's natural beauty and culture. Below are the details of en-route stops. On arrival at Thimphu check in to the hotel and in the evening, visit the Tashichho Dzong (Fortress of the Glorious Religion). Overnight stay at Thimphu."
          },
          day2: {
            title: "DAY 2: Thimphu Local Sightseeing",
            description: "After Breakfast you can visit places like: The National Memorial Chorten: Built-in the memory of the third Druk Gyalpo (Head of Kingdom) of Bhutan, the National Memorial Chorten is devoted to World Peace. The Chorten popular amongst the localities for various major Buddhist religious festivals and it is one of the best places to see in Thimphu Bhutan. Buddha Dordenma Statue - Atop a hill in Thimphu, is a massive, golden Buddha sitting atop a gilded meditation hall. Hidden inside it has 125,000 smaller Buddha's. This means that in Thimphu, there are more Buddha statues than this city's population (100000), it is also known as Budda point. Changangkha Lhakhang – In Thimphu there are many monasteries and temple that you will get to see and among them. Changangkha Lhakhang is one of the most religious structures. It was built in the 12th century and its one of the oldest Lhakhang located in Thimphu .It's also known as the wish fulfilling temple, from here you can see the amazing view of Thimphu city The motitang Takin Preserve – For animal lovers, Motithang Takin Preserve is one of the best places to visit in Thimphu. This attractive preserved area was built as a small zoo but later it was converted into an animal preserve center. Takin -The national animal of Bhutan, lives in the Motithang Takin Preserve in Thimphu Tashi Chho Dzong (It is open @ 5pm for 1 Hrs only) - It is a monastery which is located next to bank of Wang Chhu River, It is also known as Thimphu Dzong. Annual 3 days Tsechu festival is also hosted every year at TashiChho Dzong. It was built in 1216 A.D. After visiting the places in Thimphu you will be transferred to Paro. Overnight stay in Paro."
          },
          day3: {
            title: "DAY 3: Paro Local Sightseeing",
            description: "Start your day with a delightful breakfast. Then set off to discover the enchanting sights of Paro, which includes places like: Simtokha Dzong : This Dzong, was built in the year 1629 also known as Sangak Zabdhon Phodrang by Zhabdrung Ngawang Namgyal, Simtokha Dzong was built in the 17th century and it is one of the oldest Dzong built .An very important and oldest structure.. National Museum of Bhutan: An ancient watchtower that now displays hundreds of ancient Bhutanese artifacts and artwork including traditional costumes, armor, weaponry, and handcrafted implements for daily life. The collections represent the rich cultural traditions of the country. Drukgyal Dzong: Drukgyal Dzong was a Buddhist Monastery. It is also translates as the 'Victorious Fortress'. This is the place where several victories over marauding Tibetan invaders. It is considered the most beautiful and famous archaeological site in Bhutan. Paro Airport View: This is one of the most stunning airports in the World and also the country's first and only international airport. With a breathtaking view, this airport became a must-visit place in Paro. Kyichu Lhakhang – It is also known as Kyerchu Buddhist Temple, Kyichu Lhakhang is a pilgrimage place as it is part of 108 temples which was built by the king ,it's very old and very beautiful and most visited OR Tiger's Nest Trek (Paro Taktsang): Tiger's Nest, or Paro Taktsang, is Bhutan's most iconic monastery, perched dramatically on a Cliffside 3,120 meters above sea level. It is a sacred pilgrimage site and one of the most photographed landmarks in Bhutan. Built in 1692, it is said to mark the meditation site of Guru Rinpoche (Padmasambhava), who arrived here on the back of a flying tigress in the 8th century. The monastery suffered a fire in 1998 and was carefully restored to its former glory. The trek is moderately challenging and takes you through pine forests, prayer flags, and scenic viewpoints. To reach their it will take around 5–7 hours (round trip), including time to explore the monastery. Overnight stay hotel in Paro."
          },
          day4: {
            title: "DAY 4: Departure",
            description: "After soaking in the beauty of Bhutan's sights, you will be greeted with a delightful breakfast. After which you'll be transferred to NJP (New Jalpaiguri Station) or Bagdogra in Siliguri, passing through the scenic Phuentsholing, as you embark on your journey back home, carrying unforgettable memories of your Bhutan adventure."
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
          website: "JJ&Tia Tours and Travels | Book Your Tour Package Now"
        }
      }
    },
    {
      id: 2,
      title: "20% OFF- BUDGET FRIENDLY 3 NIGHTS / 4 DAYS MEGHALAYA TOUR PACKAGE",
      description: "Embark on a mesmerizing journey to Meghalaya, the \"Abode of Clouds,\" where pristine natural beauty, cascading waterfalls, and unique cultural experiences await. This 3-night, 4-day package offers a perfect mix…",
      duration: "4D/3N",
      destination: "Meghalaya",
      price: "16,500.00",
      originalPrice: "20,625.00",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Living Root Bridges", "Waterfalls", "Cave Exploration", "Local Villages"]
    },
    {
      id: 3,
      title: "EXPLORE THE ENCHANTING KINGDOM OF BHUTAN – 5N/6D",
      description: "Discover Bhutan – The Land of Happiness! Embark on a magical journey to Bhutan, a land where stunning landscapes, ancient monasteries, and vibrant culture come together to create an unforgettable…",
      duration: "6D/5N",
      destination: "Bhutan",
      price: "31,900.00",
      originalPrice: "37,900.00",
      discount: "16% OFF",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Tiger's Nest Monastery", "Thimphu Exploration", "Cultural Immersion", "Mountain Trekking"]
    },
    {
      id: 4,
      title: "ENCHANTING NORTH EAST: 7 NIGHTS/8 DAYS TOUR PACKAGE",
      description: "Immerse yourself in the natural beauty and cultural charm of North East India with this carefully crafted 7-night, 8-day tour. Covering the highlights of Assam and Meghalaya, this itinerary offers…",
      duration: "8D/7N",
      destination: "Meghalaya",
      price: "34,990.00",
      originalPrice: "42,990.00",
      discount: "19% OFF",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Kaziranga National Park", "Shillong Hills", "Tea Gardens", "River Cruises"]
    },
    {
      id: 5,
      title: "50% OFF BUDGET FRIENDLY BHUTAN TOUR: DISCOVER PARO, THIMPHU, & PUNAKHA 4N/5D",
      description: "Experience an all-inclusive 5-Day Bhutan Tour, covering Thimphu, Paro, and Punakha, with rich cultural insights and stunning natural beauty. Bhutan, the last Himalayan kingdom, veiled in mystery and magic…",
      duration: "5D/4N",
      destination: "Bhutan",
      price: "22,500.00",
      originalPrice: "45,000.00",
      discount: "50% OFF",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Punakha Dzong", "Buddha Dordenma", "Weekend Markets", "Fortress Visits"]
    },
    {
      id: 6,
      title: "GOA BEACH PARADISE - 4 NIGHTS 5 DAYS",
      description: "Relax and unwind in the tropical paradise of Goa with its pristine beaches, vibrant nightlife, and rich Portuguese heritage. Perfect for couples and families seeking a beach getaway.",
      duration: "5D/4N",
      destination: "Goa",
      price: "18,999.00",
      originalPrice: "24,999.00",
      discount: "24% OFF",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Beach Activities", "Water Sports", "Heritage Tours", "Sunset Cruises"]
    }
  ];

  const handleBookNow = () => {
    navigate('/contact');
  };

  // Filter logic
  const filteredPackages =
    filter === 'bhutan'
      ? packages.filter((pkg) => pkg.destination === "Bhutan")
      : packages;

  return (
    <div className="min-h-screen bg-travel-light-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={packageVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Removed overlay */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center space-y-6 fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              Our <span className="text-primary">Packages</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Discover amazing travel packages designed to create unforgettable memories
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons - Left aligned */}
      <div className="container mx-auto px-4 mt-10 flex justify-start gap-3">
        <Button
          variant={filter === 'bhutan' ? "default" : "outline"}
          className={`flex items-center gap-2 rounded-full px-6 py-2 text-base font-semibold shadow-md ${filter === 'bhutan' ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
          onClick={() => setFilter('bhutan')}
        >
          Bhutan
        </Button>
        <Button
          variant={filter === 'all' ? "default" : "outline"}
          className={`flex items-center gap-2 rounded-full px-6 py-2 text-base font-semibold shadow-md ${filter === 'all' ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
          onClick={() => setFilter('all')}
        >
          Show All
        </Button>
      </div>

      {/* Packages Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <Card key={pkg.id} className={`overflow-hidden hover-lift bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${index % 2 === 0 ? 'slide-up' : 'scale-in'}`}>
                <div className="relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                    {pkg.discount}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-foreground line-clamp-2">
                    {pkg.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{pkg.destination}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {pkg.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-foreground">Package Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.highlights.slice(0, 2).map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {pkg.highlights.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{pkg.highlights.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">₹ {pkg.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₹ {pkg.originalPrice}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <Link to={`/package/${pkg.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 hover-lift"
                    onClick={handleBookNow}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Best Place Section */}
      <BestPlaceSection 
        subtitle="Exclusive Deals"
        title="Unlock amazing packages in"
        destination="Bhutan & Beyond"
        buttonText="VIEW PACKAGES"
        buttonLink="/packages"
      />
    </div>
  );
};

export default PackagesPage;