import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, Package, X, Car, Hotel } from "lucide-react";

// Utility function to render text with bold formatting
const renderBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index} className="font-bold">{boldText}</strong>;
    }
    return part;
  });
};

interface PackageData {
  _id: string;
  title: string;
  subtitle: string;
  about: string;
  services: string;
  tourDetails: string;
  price: number;
  duration: string;
  location: string;
  capacity: string;
  packageType: 'domestic' | 'international';
  place: 'bhutan' | 'nepal';
  images: Array<{
    public_id: string;
    url: string;
    alt: string;
  }>;
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  transportation: Array<{
    type: string;
    vehicle: string;
    description: string;
  }>;
  accommodation: Array<{
    city: string;
    hotel: string;
    rooms: string;
    roomType: string;
    nights: string;
  }>;
  bookings: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

interface PackageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: PackageData | null;
}

const PackageDetailModal = ({ isOpen, onClose, packageData }: PackageDetailModalProps) => {
  if (!packageData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{packageData.title}</DialogTitle>
          <DialogDescription>
            {packageData.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Featured Image */}
          {packageData.images && packageData.images.length > 0 && (
            <div className="space-y-4">
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">
                  <img
                    src={packageData.images[0].url}
                    alt={packageData.images[0].alt || packageData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {packageData.images.length} {packageData.images.length === 1 ? 'Image' : 'Images'}
                </div>
              </div>
            </div>
          )}

          {/* Package Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-lg font-bold">{packageData.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-lg font-bold">{packageData.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Capacity</p>
                    <p className="text-lg font-bold">{packageData.capacity}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-lg font-bold">₹{packageData.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Images */}
          {packageData.images && packageData.images.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Package Images ({packageData.images.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packageData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                      <img
                        src={image.url}
                        alt={image.alt || `Package image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 truncate">
                        {image.alt || `Image ${index + 1}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Images Message */}
          {(!packageData.images || packageData.images.length === 0) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Package Images</h3>
              <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No images available for this package</p>
                </div>
              </div>
            </div>
          )}

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{packageData.about}</p>
              </CardContent>
            </Card>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{packageData.services}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tour Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tour Details</h3>
            <Card>
              <CardContent className="p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{packageData.tourDetails}</p>
              </CardContent>
            </Card>
          </div>

          {/* Itinerary Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Itinerary</h3>
            <div className="space-y-4">
              {packageData.itinerary.map((day, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Badge variant="secondary">Day {day.day}</Badge>
                      {day.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      {day.description.split('\n• ').filter(point => point.trim()).map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>{renderBoldText(point.trim())}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Transportation Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Transportation</h3>
            <div className="space-y-4">
              {packageData.transportation && packageData.transportation.length > 0 ? (
                packageData.transportation.map((transport, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Car className="h-5 w-5 text-blue-500" />
                        {transport.type}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700">Vehicle:</span>
                        <span className="ml-2 text-gray-600">{transport.vehicle}</span>
                      </div>
                      {transport.description && (
                        <div className="flex items-start">
                          <span className="font-medium text-gray-700">Description:</span>
                          <span className="ml-2 text-gray-600">{transport.description}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Car className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No transportation details available</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Accommodation Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Accommodation</h3>
            <div className="space-y-4">
              {packageData.accommodation && packageData.accommodation.length > 0 ? (
                packageData.accommodation.map((accommodation, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Hotel className="h-5 w-5 text-green-500" />
                        {accommodation.city}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-700">Hotel/Resort:</span>
                          <span className="ml-2 text-gray-600">{accommodation.hotel}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-700">Rooms:</span>
                          <span className="ml-2 text-gray-600">{accommodation.rooms}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-700">Room Type:</span>
                          <span className="ml-2 text-gray-600">{accommodation.roomType}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-700">Nights:</span>
                          <span className="ml-2 text-gray-600">{accommodation.nights}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Hotel className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No accommodation details available</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Package Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Package className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Bookings</p>
                    <p className="text-2xl font-bold">{packageData.bookings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Rating</p>
                    <p className="text-2xl font-bold">{packageData.rating || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm font-bold">
                      {new Date(packageData.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDetailModal;
