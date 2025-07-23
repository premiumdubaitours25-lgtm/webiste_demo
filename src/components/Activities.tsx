import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Activities = () => {
  const activities = [
    {
      title: "Goa on a Shoe-string Budget? Check out These Chic Apartments for a Comfy Stay!",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop",
      category: "Budget Travel"
    },
    {
      title: "6 Red Sea Diving Experiences in Saudi to Add to Your Bucket List",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d0e9c3?w=400&h=300&fit=crop",
      category: "Adventure"
    },
    {
      title: "The Ultimate Guide to Hiking to the Tiger's Nest, Bhutan",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      category: "Hiking"
    },
    {
      title: "Chele La Pass Bhutan: The Hidden Paradise of Nature",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      category: "Nature"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Popular Activities</h2>
          <p className="text-xl text-muted-foreground">Our Activities</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {activity.category}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <h3 className="font-semibold text-lg leading-tight line-clamp-3">{activity.title}</h3>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="text-primary font-semibold hover:text-primary/80 transition-colors">
            More Activities →
          </a>
        </div>

        {/* Best Place Section */}
        <div className="mt-20 bg-gradient-to-r from-secondary to-primary rounded-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Best Place</h3>
          <p className="text-xl mb-8">Discover amazing places in Nepal</p>
          <Button size="lg" variant="secondary">
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Activities;