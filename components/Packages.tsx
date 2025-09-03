import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users } from "lucide-react";

const Packages = () => {
  const packages = [
    {
      title: "4 NIGHTS 5 DAYS BHUTAN FAMILY TOUR PACKAGES",
      description: "The Bhutan Family Tour Packages offer a blend of cultural heritage, natural beauty, and adventure, perfect for families looking to explore this mystical kingdom. With stops in Paro, Thimphu, and…",
      duration: "5D/4N",
      destination: "Bhutan",
      price: "29,999.00",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "20% OFF- BUDGET FRIENDLY 3 NIGHTS / 4 DAYS MEGHALAYA TOUR PACKAGE",
      description: "Embark on a mesmerizing journey to Meghalaya, the \"Abode of Clouds,\" where pristine natural beauty, cascading waterfalls, and unique cultural experiences await. This 3-night, 4-day package offers a perfect mix…",
      duration: "4D/3N",
      destination: "Meghalaya",
      price: "16,500.00",
      originalPrice: "20,625.00",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "EXPLORE THE ENCHANTING KINGDOM OF BHUTAN – 5N/6D",
      description: "Discover Bhutan – The Land of Happiness! Embark on a magical journey to Bhutan, a land where stunning landscapes, ancient monasteries, and vibrant culture come together to create an unforgettable…",
      duration: "6D/5N",
      destination: "Bhutan",
      price: "31,900.00",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "ENCHANTING NORTH EAST: 7 NIGHTS/8 DAYS TOUR PACKAGE",
      description: "Immerse yourself in the natural beauty and cultural charm of North East India with this carefully crafted 7-night, 8-day tour. Covering the highlights of Assam and Meghalaya, this itinerary offers…",
      duration: "8D/7N",
      destination: "Meghalaya",
      price: "34,990.00",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "50% OFF BUDGET FRIENDLY BHUTAN TOUR: DISCOVER PARO, THIMPHU, & PUNAKHA 4N/5D MIN PAX:4",
      description: "Experience an all-inclusive 5-Day Bhutan Tour, covering Thimphu, Paro, and Punakha, with rich cultural insights and stunning natural beauty. Bhutan, the last Himalayan kingdom, veiled in mystery and magic, where…",
      duration: "5D/4N",
      destination: "Bhutan",
      price: "22,500.00",
      originalPrice: "45,000.00",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="packages" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Popular Packages</h2>
          <p className="text-xl text-muted-foreground">Checkout our packages</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {pkg.originalPrice && (
                  <Badge className="absolute top-4 left-4 bg-destructive">
                    {Math.round((1 - parseFloat(pkg.price) / parseFloat(pkg.originalPrice)) * 100)}% OFF
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <h3 className="font-semibold text-lg leading-tight line-clamp-2">{pkg.title}</h3>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm line-clamp-3">{pkg.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{pkg.destination}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      ₹ {pkg.price}/
                    </div>
                    <div className="text-sm text-muted-foreground">per person</div>
                    {pkg.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        ₹ {pkg.originalPrice}
                      </div>
                    )}
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    Book now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            VIEW ALL PACKAGES
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Packages;