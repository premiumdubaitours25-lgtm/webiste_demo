import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Eye, Phone, Filter, Plane } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import packageVideo from "@/assets/Package.mp4";
import BestPlaceSection from "@/components/BestPlaceSection";

const PackagesPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'bhutan'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');

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
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage", "Guided Tours"],
      detailedInfo: {
        companyDescription: "JJ & TIA Tours and Travels. Your Path to Unforgettable Adventures. At JJ & TIA Tours and Travels (sister company of Travellers Paradise: Travellers Paradise Tours & Travels - Profile, Reviews & Ratings), we specialize in crafting unique and personalized travel experiences that take you beyond the ordinary. Founded on a passion for exploration and a deep love for cultures, our company has been helping travelers of all types—from solo explorers to family groups—discover the beauty of the world for over a decade.",
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
          website: "JJ & TIA Tours and Travels | Book Your Tour Package Now"
        }
      }
    },
    {
      id: 2,
      title: "Bhutan Tour for 4 Nights / 5 Days",
      description: "Experience the mystical kingdom of Bhutan with our comprehensive 4N/5D tour covering Phuentsholing, Thimphu & Paro. This extended package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
      duration: "4N/5D",
      destination: "Bhutan",
      price: "59,700.00",
      originalPrice: "75,000.00",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Phuentsholing", "Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage"],
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
        packageCost: "59,700/- Total Cost",
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
          "Children under 18 years can carry original birth Certificate along with school id/AadharCard.",
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
    },
    {
      id: 3,
      title: "Bhutan Tour for 4 Nights / 5 Days",
      description: "Experience the mystical kingdom of Bhutan with our comprehensive 4N/5D tour covering Phuentsholing, Thimphu & Paro. This package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
      duration: "4N/5D",
      destination: "Bhutan",
      price: "25,200.00",
      originalPrice: "30,000.00",
      discount: "16% OFF",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Phuentsholing", "Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage"],
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
              "Photo session stopover at Wankha Waterfall",
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
          "Children under 18 years can carry original birth Certificate along with school id/AadharCard.",
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
    },
    {
      id: 4,
      title: "Bhutan Tour for 4 Nights / 5 Days",
      description: "Experience the mystical kingdom of Bhutan with our comprehensive 4N/5D tour covering Phuentsholing, Thimphu & Paro. This package includes guided tours, local experiences, and cultural immersion in the Land of Happiness.",
      duration: "4N/5D",
      destination: "Bhutan",
      price: "25,200.00",
      originalPrice: "30,000.00",
      discount: "16% OFF",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      highlights: ["Phuentsholing", "Thimphu & Paro", "Tiger's Nest Trek", "Cultural Heritage"],
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
              "Photo session stopover at Wankha Waterfall",
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
    }
  ];

  const handleBookNow = () => {
    navigate('/contact');
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setPriceRange('');
    setDurationFilter('');
    setDestinationFilter('');
    setFilter('all');
  };

  // Filter logic
  const filteredPackages = packages.filter((pkg) => {
    // Basic filter for Bhutan
    if (filter === 'bhutan' && pkg.destination !== "Bhutan") {
      return false;
    }
    
    // Search term filter
    if (searchTerm && !pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Destination filter
    if (destinationFilter && pkg.destination !== destinationFilter) {
      return false;
    }
    
    // Duration filter
    if (durationFilter) {
      const pkgDuration = pkg.duration.toLowerCase();
      if (durationFilter === 'short' && !pkgDuration.includes('3n') && !pkgDuration.includes('4n')) {
        return false;
      }
      if (durationFilter === 'medium' && !pkgDuration.includes('5n') && !pkgDuration.includes('6n')) {
        return false;
      }
      if (durationFilter === 'long' && !pkgDuration.includes('7n') && !pkgDuration.includes('8n')) {
        return false;
      }
    }
    
    // Price range filter
    if (priceRange) {
      const price = parseFloat(pkg.price.replace(/,/g, ''));
      if (priceRange === 'under-20k' && price >= 20000) return false;
      if (priceRange === '20k-50k' && (price < 20000 || price >= 50000)) return false;
      if (priceRange === '50k-1l' && (price < 50000 || price >= 100000)) return false;
      if (priceRange === 'above-1l' && price < 100000) return false;
    }
    
    return true;
  });

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
               <span className="text-primary">Discover, Explore, Experience</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Carefully designed trips to match every mood, budget, and dream.
            </p>
            
            {/* Package Category Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link to="/packages/domestic">
                <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <MapPin className="mr-3 h-5 w-5" />
                  Domestic Packages
                </Button>
              </Link>
              
              <Link to="/packages/international">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <Plane className="mr-3 h-5 w-5" />
                  International Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/20">
            <h2 className="text-2xl font-bold text-secondary mb-6 text-center">Find Your Perfect Package</h2>
            
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search packages by title, description, or destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Filter Options */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {/* Destination Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <select
                  value={destinationFilter}
                  onChange={(e) => setDestinationFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">All Destinations</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Goa">Goa</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Bali">Bali</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">All Durations</option>
                  <option value="short">Short (3-4 Nights)</option>
                  <option value="medium">Medium (5-6 Nights)</option>
                  <option value="long">Long (7+ Nights)</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">All Prices</option>
                  <option value="under-20k">Under ₹20,000</option>
                  <option value="20k-50k">₹20,000 - ₹50,000</option>
                  <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                  <option value="above-1l">Above ₹1,00,000</option>
                </select>
              </div>

              {/* Quick Filter Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Filters</label>
                <div className="flex gap-2">
                  <Button
                    variant={filter === 'bhutan' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter('bhutan')}
                    className="text-xs"
                  >
                    Bhutan
                  </Button>
                  <Button
                    variant={filter === 'all' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter('all')}
                    className="text-xs"
                  >
                    All
                  </Button>
                </div>
              </div>
            </div>

            {/* Results and Clear Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-primary">{filteredPackages.length}</span> of <span className="font-semibold">{packages.length}</span> packages
              </div>
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="border-primary text-primary hover:bg-primary hover:text-white transition-all"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredPackages.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No packages found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search criteria or filters to find more packages.
                </p>
                <Button onClick={clearAllFilters} className="bg-primary hover:bg-primary/90">
                  Clear All Filters
                </Button>
              </div>
            </div>
          ) : (
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
          )}
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