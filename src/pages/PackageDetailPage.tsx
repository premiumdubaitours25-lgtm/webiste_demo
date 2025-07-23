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
  Share2
} from "lucide-react";

const PackageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - in a real app, this would come from an API
  const packageData = {
    id: 1,
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
        comment: "Amazing experience! The Tiger's Nest hike was challenging but absolutely worth it. Our guide was knowledgeable and friendly."
      },
      {
        name: "Raj Patel",
        rating: 5,
        comment: "Perfect family vacation. The kids loved the cultural experiences and the mountain views were breathtaking."
      },
      {
        name: "Priya Sharma",
        rating: 4,
        comment: "Great value for money. The accommodations were comfortable and the food was delicious. Highly recommend!"
      }
    ]
  };

  const handleBookNow = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-travel-light-bg">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={packageData.mainImage}
            alt={packageData.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/packages">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Packages
              </Button>
            </Link>
          </div>
          <div className="text-center space-y-6 fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              {packageData.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{packageData.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{packageData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>4.8/5 (24 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={packageData.gallery[selectedImage]}
                    alt={packageData.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
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
                        className="w-full h-20 object-cover hover:scale-105 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">About This Tour</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {packageData.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {packageData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {packageData.itinerary.map((day, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary text-white p-3 rounded-full min-w-[60px] text-center">
                            <span className="text-sm font-bold">{day.day}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-foreground mb-2">{day.title}</h3>
                            <p className="text-muted-foreground mb-3">{day.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {day.activities.map((activity, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {activity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Customer Reviews</h2>
                <div className="space-y-4">
                  {packageData.reviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-semibold">{review.name[0]}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{review.name}</h4>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="space-y-6">
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Price */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-3xl font-bold text-primary">₹ {packageData.price}</span>
                        <span className="text-lg text-muted-foreground line-through">₹ {packageData.originalPrice}</span>
                      </div>
                      <Badge className="bg-destructive text-destructive-foreground">
                        {packageData.discount}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2">per person</p>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">{packageData.duration}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">{packageData.destination}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Max 12 people</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={handleBookNow}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Book Now
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="mr-2 h-4 w-4" />
                        Enquire Now
                      </Button>
                    </div>

                    {/* Inclusions & Exclusions */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">What's Included</h4>
                        <div className="space-y-1">
                          {packageData.inclusions.slice(0, 4).map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">What's Not Included</h4>
                        <div className="space-y-1">
                          {packageData.exclusions.slice(0, 3).map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="w-3 h-3 rounded-full border border-red-500"></span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageDetailPage; 