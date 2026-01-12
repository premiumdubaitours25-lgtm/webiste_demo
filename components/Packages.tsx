import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users } from "lucide-react";

const Packages = () => {
  const packages = [
    {
      title: "4 NIGHTS 5 DAYS DUBAI LUXURY TOUR PACKAGE",
      description: "Experience the best of Dubai with our luxury tour package. Explore iconic landmarks including Burj Khalifa, Dubai Mall, Palm Jumeirah, and enjoy a desert safari adventure with traditional entertainment.",
      duration: "5D/4N",
      destination: "Dubai",
      price: "45,000.00",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "DUBAI CITY TOUR - BURJ KHALIFA & DUBAI MALL",
      description: "Discover Dubai's iconic landmarks in one day. Visit the world's tallest building Burj Khalifa, explore Dubai Mall, witness the Dubai Fountain show, and enjoy the stunning Palm Jumeirah.",
      duration: "1 Day",
      destination: "Dubai",
      price: "5,500.00",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "DUBAI DESERT SAFARI WITH BBQ DINNER",
      description: "Embark on an unforgettable desert adventure with dune bashing, camel riding, traditional belly dance performances, and a delicious BBQ dinner under the stars.",
      duration: "Half Day",
      destination: "Dubai",
      price: "2,500.00",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "DUBAI & ABU DHABI PREMIUM TOUR - 5N/6D",
      description: "Explore both Dubai and Abu Dhabi in this comprehensive tour. Visit Sheikh Zayed Mosque, Louvre Abu Dhabi, Burj Khalifa, Palm Jumeirah, and enjoy luxury experiences throughout.",
      duration: "6D/5N",
      destination: "Dubai",
      price: "65,000.00",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "DUBAI ULTIMATE LUXURY PACKAGE - 7N/8D",
      description: "The ultimate Dubai experience featuring 7-star luxury at Burj Al Arab, exclusive access to theme parks, premium shopping, fine dining, and all major attractions in Dubai.",
      duration: "8D/7N",
      destination: "Dubai",
      price: "85,000.00",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
                      AED {pkg.price}/
                    </div>
                    <div className="text-sm text-muted-foreground">per person</div>
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