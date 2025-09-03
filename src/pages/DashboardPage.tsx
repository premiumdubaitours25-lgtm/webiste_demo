import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreatePackageModal from "@/components/CreatePackageModal";
import { 
  Package, 
  Star, 
  Eye,
  Plus,
  Edit,
  Filter,
  Search,
  Download
} from "lucide-react";

const DashboardPage = () => {
  const [isCreatePackageModalOpen, setIsCreatePackageModalOpen] = useState(false);
  const [createdPackages, setCreatedPackages] = useState<any[]>([]);

  const handlePackageCreated = (packageData: any) => {
    setCreatedPackages(prev => [packageData, ...prev]);
  };

  const openCreatePackageModal = () => {
    setIsCreatePackageModalOpen(true);
  };

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
                    <th className="text-left p-3">Duration</th>
                    <th className="text-left p-3">Location</th>
                    <th className="text-left p-3">Capacity</th>
                    <th className="text-left p-3">Price</th>
                    <th className="text-left p-3">Bookings</th>
                    <th className="text-left p-3">Rating</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {createdPackages.length > 0 ? (
                    createdPackages.map((pkg) => (
                      <tr key={pkg.id} className="border-b">
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
                        <td className="p-3">{pkg.duration || "N/A"}</td>
                        <td className="p-3">{pkg.location || "N/A"}</td>
                        <td className="p-3">{pkg.capacity || "N/A"}</td>
                        <td className="p-3 font-medium">₹{pkg.price}</td>
                        <td className="p-3">{pkg.bookings}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            {pkg.rating || 0}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
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
    </div>
  );
};

export default DashboardPage;
