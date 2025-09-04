'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import CreatePackageModal from "../../components/CreatePackageModal";
import PackageDetailModal from "../../components/PackageDetailModal";
import EditPackageModal from "../../components/EditPackageModal";
import { 
  Package, 
  Star, 
  Eye,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  Download
} from "lucide-react";

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

export default function DashboardPage() {
  const [isCreatePackageModalOpen, setIsCreatePackageModalOpen] = useState(false);
  const [isViewPackageModalOpen, setIsViewPackageModalOpen] = useState(false);
  const [isEditPackageModalOpen, setIsEditPackageModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      const data = await response.json();
      if (data.success) {
        setPackages(data.data);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handlePackageCreated = async (packageData: any) => {
    try {
      console.log('Sending package data to API:', JSON.stringify(packageData, null, 2));
      
      const response = await fetch('/api/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packageData),
      });
      
      console.log('API response status:', response.status);
      const result = await response.json();
      console.log('API response data:', result);
      
      if (result.success) {
        setPackages(prev => [result.data, ...prev]);
        alert('Package created successfully!');
      } else {
        alert(`Error creating package: ${result.error}`);
      }
    } catch (error) {
      console.error('Error creating package:', error);
      alert('Error creating package. Please try again.');
    }
  };

  const openCreatePackageModal = () => {
    setIsCreatePackageModalOpen(true);
  };

  const handleViewPackage = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setIsViewPackageModalOpen(true);
  };

  const handleEditPackage = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setIsEditPackageModalOpen(true);
  };

  const handleDeletePackage = async (pkg: PackageData) => {
    if (window.confirm(`Are you sure you want to delete "${pkg.title}"? This action cannot be undone.`)) {
      try {
        const response = await fetch(`/api/packages/${pkg._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setPackages(prev => prev.filter(p => p._id !== pkg._id));
          alert('Package deleted successfully!');
        } else {
          let errorMessage = 'Failed to delete package';
          try {
            const errorResult = await response.json();
            errorMessage = errorResult.error || errorMessage;
          } catch (parseError) {
            // If response is not JSON, get the text content
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting package:', error);
        alert(`Error deleting package: ${error.message}`);
      }
    }
  };

  const handlePackageUpdated = (updatedPackage: PackageData) => {
    setPackages(prev => prev.map(p => p._id === updatedPackage._id ? updatedPackage : p));
    setSelectedPackage(null);
    setIsEditPackageModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your tour packages</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm" onClick={openCreatePackageModal}>
                <Plus className="h-4 w-4 mr-2" />
                New Package
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Packages Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Packages</CardTitle>
                <CardDescription>Manage and track all your tour packages</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Package Title</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Place</th>
                    <th className="text-left p-3">Duration</th>
                    <th className="text-left p-3">Location</th>
                    <th className="text-left p-3">Capacity</th>
                    <th className="text-left p-3">Price</th>
                    <th className="text-left p-3">Rating</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.length > 0 ? (
                    packages.map((pkg) => (
                      <tr key={pkg._id} className="border-b">
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            {pkg.images && pkg.images.length > 0 ? (
                              <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-200">
                                <img
                                  src={pkg.images[0].url}
                                  alt={pkg.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-lg border-2 border-gray-200 flex items-center justify-center bg-gray-100">
                                <Package className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                            <span className="font-medium">{pkg.title}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant={pkg.packageType === 'domestic' ? 'default' : 'secondary'}>
                            {pkg.packageType === 'domestic' ? 'Domestic' : 'International'}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">
                            {pkg.place === 'bhutan' ? 'Bhutan' : 'Nepal'}
                          </Badge>
                        </td>
                        <td className="p-3">{pkg.duration || "N/A"}</td>
                        <td className="p-3">{pkg.location || "N/A"}</td>
                        <td className="p-3">{pkg.capacity || "N/A"}</td>
                        <td className="p-3 font-medium">₹{pkg.price}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            {pkg.rating || 0}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewPackage(pkg)}
                              title="View Package"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditPackage(pkg)}
                              title="Edit Package"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeletePackage(pkg)}
                              title="Delete Package"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-500">
                        <div className="flex flex-col items-center space-y-2">
                          <Package className="h-12 w-12 text-gray-300" />
                          <p>No packages created yet</p>
                          <Button onClick={openCreatePackageModal} size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Your First Package
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Package Modal */}
      <CreatePackageModal
        isOpen={isCreatePackageModalOpen}
        onClose={() => setIsCreatePackageModalOpen(false)}
        onPackageCreated={handlePackageCreated}
      />

      {/* View Package Modal */}
      <PackageDetailModal
        isOpen={isViewPackageModalOpen}
        onClose={() => {
          setIsViewPackageModalOpen(false);
          setSelectedPackage(null);
        }}
        packageData={selectedPackage}
      />

      {/* Edit Package Modal */}
      <EditPackageModal
        isOpen={isEditPackageModalOpen}
        onClose={() => {
          setIsEditPackageModalOpen(false);
          setSelectedPackage(null);
        }}
        packageData={selectedPackage}
        onPackageUpdated={handlePackageUpdated}
      />
    </div>
  );
}
