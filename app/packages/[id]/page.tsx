'use client'

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Users, Star, Calendar, Phone, Mail, ArrowLeft, CheckCircle, Plane, Camera, Globe, Heart, Share, Car, Hotel, Utensils, Info, X, Car as CarIcon, Building, Bed, Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Package {
  _id: string;
  title: string;
  subtitle: string;
  about: string;
  services: string[] | string;
  tourDetails: string;
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }> | [];
  transportation: Array<{
    type: string;
    vehicle: string;
    description: string;
  }> | [];
  accommodation: Array<{
    city: string;
    hotel: string;
    rooms: string;
    roomType: string;
    nights: string;
  }> | [];
  price: number;
  duration: string;
  location: string;
  capacity: string;
  images: Array<{
    url: string;
    alt: string;
  }>;
  bookings: number;
  rating: number;
}

const PackageDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (params?.id) {
      fetchPackageDetails(params.id as string);
    }
  }, [params?.id]);

  const fetchPackageDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/packages/${id}`);
      const result = await response.json();
      
      if (result.success) {
        setPackageData(result.data);
      } else {
        setError(result.message || 'Package not found');
      }
    } catch (error) {
      console.error('Error fetching package details:', error);
      setError('Failed to load package details');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isInternational = packageData && !packageData.location.toLowerCase().includes('nepal');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <Globe className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Package Not Found</h3>
          <p className="text-gray-600 mb-6">{error || 'The package you are looking for does not exist.'}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Link href="/packages">
              <Button variant="outline">View All Packages</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant={isInternational ? "default" : "secondary"}>
                {isInternational ? "International" : "Domestic"}
              </Badge>
              <Badge variant="outline">
                {packageData.rating}/5 ⭐
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="aspect-[16/9] relative bg-gray-800">
          {Array.isArray(packageData.images) && packageData.images.length > 0 ? (
            <Image
              src={packageData.images[selectedImageIndex].url}
              alt={packageData.images[selectedImageIndex].alt || packageData.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Globe className="h-24 w-24 text-gray-400" />
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-3">
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Package Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {packageData.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {packageData.location}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {packageData.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {packageData.capacity}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Thumbnails */}
      {Array.isArray(packageData.images) && packageData.images.length > 1 && (
        <div className="bg-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex gap-3 overflow-x-auto">
              {packageData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-16 rounded-lg border-2 overflow-hidden ${
                    index === selectedImageIndex 
                      ? 'border-primary' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `${packageData.title} ${index + 1}`}
                    width={96}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Package Overview */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {packageData.title}
                      </h2>
                      <div className="flex items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {packageData.duration}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {packageData.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {packageData.capacity}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {formatPrice(packageData.price)}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        {formatPrice(packageData.price * 1.2)}
                      </div>
                      <Badge className="bg-green-500 text-white mt-1">16% OFF</Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {packageData.about}
                  </p>
                </CardContent>
              </Card>

              {/* About JJ & TIA Tours and Travels */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">About JJ & TIA Tours and Travels</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Welcome to JJ & TIA Tours and Travels - Your Path to Unforgettable Adventures! 
                    We specialize in creating unique travel experiences that combine adventure, culture, and comfort. 
                    With over a decade of experience in the travel industry, we have been helping travelers 
                    discover the world's most beautiful destinations. As a sister company of Travellers Paradise, 
                    we bring you the best of both worlds - local expertise and global reach.
                  </p>
                </CardContent>
              </Card>

              {/* Our Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Our Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Customized travel planning",
                      "Guided tours & local experiences", 
                      "Group & family vacations",
                      "Luxury & adventure travel",
                      "Honeymoons & romantic getaways",
                      "Corporate & incentive travel"
                    ].map((service, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tour Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Tour Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-primary mr-3" />
                      <span className="text-gray-700">Duration: {packageData.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-3" />
                      <span className="text-gray-700">Travelers: {packageData.capacity}</span>
                    </div>
                    <div className="flex items-center">
                      <Hotel className="h-5 w-5 text-primary mr-3" />
                      <span className="text-gray-700">Hotel Category: 3 Star</span>
                    </div>
                    <div className="flex items-center">
                      <Utensils className="h-5 w-5 text-primary mr-3" />
                      <span className="text-gray-700">Meal Plan: Breakfast & Dinner</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transportation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Transportation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.isArray(packageData.transportation) && packageData.transportation.length > 0
                      ? packageData.transportation.map((transport, index) => (
                          <div key={index}>
                            <h4 className="font-semibold text-gray-900 mb-2">{transport.type}</h4>
                            <div className="flex items-center">
                              <CarIcon className="h-5 w-5 text-primary mr-3" />
                              <span className="text-gray-700">{transport.vehicle}</span>
                            </div>
                            {transport.description && (
                              <p className="text-gray-600 text-sm mt-1 ml-8">{transport.description}</p>
                            )}
                          </div>
                        ))
                      : (
                          <div className="text-center py-8 text-gray-500">
                            <CarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>No transportation details available for this package.</p>
                          </div>
                        )
                    }
                  </div>
                </CardContent>
              </Card>

              {/* Accommodation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Accommodation</CardTitle>
                </CardHeader>
                <CardContent>
                  {Array.isArray(packageData.accommodation) && packageData.accommodation.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2 font-semibold">City</th>
                            <th className="text-left py-3 px-2 font-semibold">Hotel/Resort</th>
                            <th className="text-left py-3 px-2 font-semibold">Rooms</th>
                            <th className="text-left py-3 px-2 font-semibold">Room Type</th>
                            <th className="text-left py-3 px-2 font-semibold">Nights</th>
                          </tr>
                        </thead>
                        <tbody>
                          {packageData.accommodation.map((accommodation, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-3 px-2">{accommodation.city}</td>
                              <td className="py-3 px-2">{accommodation.hotel}</td>
                              <td className="py-3 px-2">{accommodation.rooms}</td>
                              <td className="py-3 px-2">{accommodation.roomType}</td>
                              <td className="py-3 px-2">{accommodation.nights}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Hotel className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No accommodation details available for this package.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Detailed Itinerary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Detailed Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Array.isArray(packageData.itinerary) && packageData.itinerary.length > 0
                      ? packageData.itinerary.map((day, index) => (
                          <div key={index}>
                            <h4 className="font-semibold text-lg text-gray-900 mb-3">
                              DAY {day.day}: {day.title}
                            </h4>
                            <ul className="space-y-2 text-gray-700">
                              {day.description.split('.').filter(sentence => sentence.trim()).map((sentence, sentenceIndex) => (
                                <li key={sentenceIndex} className="flex items-start">
                                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span>{sentence.trim()}.</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      : (
                          <div className="text-center py-8 text-gray-500">
                            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>No detailed itinerary available for this package.</p>
                          </div>
                        )
                    }
                  </div>
                </CardContent>
              </Card>

              {/* What's Included & Not Included */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600">What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        "Accommodation on twin Sharing Basis",
                        "Meals as per plan",
                        "SDF Charges (1200/- per person per night) Mandatory",
                        "Bhutanese guide Mandatory",
                        "Mineral water bottle per day",
                        "Exclusive vehicle for transfers & sightseeing",
                        "All permit fees & hotel taxes",
                        "Rates are valid for INDIAN NATIONALS only"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-red-600">What's Not Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        "Air Fare / Train fare",
                        "Personal expenses such as laundry, telephone calls, tips & gratuity",
                        "Entrance Fees, (Monument fee)",
                        "Additional sightseeing or extra usage of vehicles",
                        "Any cost arising due to natural calamities",
                        "Any increase in taxes or fuel price",
                        "Anything which is not included in the inclusion"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Important Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Important Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Documents required for Immigration is Voter id / Passport (Passport with 6 month and above validity)",
                      "Children under 18 years can carry original birth Certificate along with school id/Aadhar Card",
                      "Hotels are very strict with the child policy. Please carry the age proof",
                      "Photo ID proof is mandatory for all guests",
                      "Extra Adult Bed: An extra bed (where possible) or mattress/roll-out bed will be provided",
                      "Hotel Confirmation: Hotels will be confirmed based on room availability"
                    ].map((note, index) => (
                      <div key={index} className="flex items-start">
                        <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{note}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">JJ & TIA Tours and Travels</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-primary mr-3" />
                        <span className="text-gray-700">Nyati Estate, Mohammadwadi, Pune, 411060</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-primary mr-3" />
                        <span className="text-gray-700">+91 9970393335</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-primary mr-3" />
                        <span className="text-gray-700">+91 9104862909</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-primary mr-3" />
                        <span className="text-gray-700">shneiur.joseph@jjtia.com</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold">Sarah Johnson</span>
                    </div>
                    <p className="text-gray-700">
                      "Amazing experience! The tour was well organized and our guide was fantastic. 
                      Highly recommend this package for anyone looking to explore Bhutan."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Book This Package */}
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Book This Package</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {formatPrice(packageData.price)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">per person</p>
                    <div className="text-sm text-gray-500 line-through mb-1">
                      {formatPrice(packageData.price * 1.2)}
                    </div>
                    <Badge className="bg-green-500 text-white">16% OFF</Badge>
                  </div>
                  
                  <Separator />
                  
                  <Link href="/contact">
                    <Button className="w-full" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle>Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      `${packageData.location} Sightseeing`,
                      "Cultural Heritage",
                      "Guided Tours",
                      "Local Experiences"
                    ].map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Package Cost */}
              <Card>
                <CardHeader>
                  <CardTitle>Package Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {formatPrice(packageData.price)} Per Person
                    </div>
                    <p className="text-sm text-gray-600">
                      Includes cost for {packageData.capacity}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;
