import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Destinations = () => {
  const destinations = [
    { 
      name: "Nepal", 
      type: "International", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Bali", 
      type: "International", 
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Vietnam", 
      type: "International", 
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d0e9c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Andaman", 
      type: "Domestic", 
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Bhutan", 
      type: "International", 
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Sikkim", 
      type: "Domestic", 
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Goa", 
      type: "Domestic", 
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Darjeeling", 
      type: "Domestic", 
      image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Meghalaya", 
      type: "Domestic", 
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
    },
  ];

  return (
    <section id="destinations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-xl text-muted-foreground">Discover amazing places around the world</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge 
                  className={`absolute top-4 left-4 ${
                    destination.type === 'International' 
                      ? 'bg-secondary hover:bg-secondary/90' 
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  {destination.type}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-center">{destination.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="text-primary font-semibold hover:text-primary/80 transition-colors">
            More Destinations →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Destinations;