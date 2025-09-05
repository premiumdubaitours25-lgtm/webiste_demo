'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import CreatePackageModal from "../../components/CreatePackageModal";
import PackageDetailModal from "../../components/PackageDetailModal";
import EditPackageModal from "../../components/EditPackageModal";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  Package, 
  Star, 
  Eye,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  Download,
  Copy
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

  const handleDuplicatePackage = async (pkg: PackageData) => {
    try {
      // Create a duplicate package with modified title and remove _id
      const duplicatePackage = {
        ...pkg,
        title: `${pkg.title} (Copy)`,
        subtitle: `${pkg.subtitle} (Copy)`,
        bookings: 0,
        rating: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Remove the _id so it creates a new package
      delete (duplicatePackage as any)._id;

      const response = await fetch('/api/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(duplicatePackage),
      });

      if (response.ok) {
        const result = await response.json();
        setPackages(prev => [result.data, ...prev]);
        alert('Package duplicated successfully!');
      } else {
        const errorResult = await response.json();
        throw new Error(errorResult.error || 'Failed to duplicate package');
      }
    } catch (error) {
      console.error('Error duplicating package:', error);
      alert(`Error duplicating package: ${error.message}`);
    }
  };

  const handleExportToPDF = () => {
    try {
      // Create new PDF document
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('TIA Tours - Package Report', 20, 20);
      
      // Add date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
      
      // Prepare table data
      const tableData = packages.map((pkg, index) => [
        index + 1,
        pkg.title,
        pkg.packageType === 'domestic' ? 'Domestic' : 'International',
        pkg.place === 'bhutan' ? 'Bhutan' : 'Nepal',
        pkg.duration || 'N/A',
        pkg.location || 'N/A',
        pkg.capacity || 'N/A',
        `₹${pkg.price}`,
        pkg.rating || 0,
        pkg.bookings || 0,
        new Date(pkg.createdAt).toLocaleDateString()
      ]);

      // Add table using the imported autoTable function
      autoTable(doc, {
        head: [['#', 'Title', 'Type', 'Place', 'Duration', 'Location', 'Capacity', 'Price', 'Rating', 'Bookings', 'Created']],
        body: tableData,
        startY: 40,
        styles: {
          fontSize: 8,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 40 },
          2: { cellWidth: 20 },
          3: { cellWidth: 15 },
          4: { cellWidth: 20 },
          5: { cellWidth: 20 },
          6: { cellWidth: 20 },
          7: { cellWidth: 20 },
          8: { cellWidth: 15 },
          9: { cellWidth: 20 },
          10: { cellWidth: 25 },
        },
      });

      // Add summary
      const finalY = (doc as any).lastAutoTable.finalY + 20;
      doc.setFontSize(12);
      doc.text('Summary:', 20, finalY);
      
      doc.setFontSize(10);
      doc.text(`Total Packages: ${packages.length}`, 20, finalY + 10);
      doc.text(`Domestic Packages: ${packages.filter(p => p.packageType === 'domestic').length}`, 20, finalY + 20);
      doc.text(`International Packages: ${packages.filter(p => p.packageType === 'international').length}`, 20, finalY + 30);
      doc.text(`Total Bookings: ${packages.reduce((sum, p) => sum + (p.bookings || 0), 0)}`, 20, finalY + 40);
      doc.text(`Average Rating: ${(packages.reduce((sum, p) => sum + (p.rating || 0), 0) / packages.length).toFixed(1)}`, 20, finalY + 50);

      // Save the PDF
      doc.save(`tia-tours-packages-${new Date().toISOString().split('T')[0]}.pdf`);
      
      alert('Package data exported to PDF successfully!');
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Error exporting to PDF. Please try again.');
    }
  };

  const handleExportSinglePackageToPDF = async (pkg: PackageData) => {
    try {
      // Create new PDF document
      const doc = new jsPDF();
      
      // Add header with logo/title
      doc.setFillColor(41, 128, 185);
      doc.rect(0, 0, 210, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text('TIA Tours & Travels', 20, 20);
      
      // Reset text color
      doc.setTextColor(0, 0, 0);
      
      // Add package title
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.text(pkg.title, 20, 45);
      
      // Add subtitle
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text(pkg.subtitle || '', 20, 55);
      
      // Add package images section
      let yPosition = 70;
      if (pkg.images && pkg.images.length > 0) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Package Images', 20, yPosition);
        yPosition += 10;
        
        // Add image count
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`${pkg.images.length} Images`, 20, yPosition);
        yPosition += 15;
        
        // Add images in a grid layout
        const imagesPerRow = 2;
        const imageWidth = 80;
        const imageHeight = 60;
        const spacing = 10;
        
        pkg.images.forEach((image, index) => {
          const row = Math.floor(index / imagesPerRow);
          const col = index % imagesPerRow;
          
          if (yPosition + (row * (imageHeight + 30)) > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          const x = 20 + (col * (imageWidth + spacing));
          const currentY = yPosition + (row * (imageHeight + 30));
          
          try {
            // Try to add the actual image
            doc.addImage(image.url, 'JPEG', x, currentY, imageWidth, imageHeight);
          } catch (error) {
            // If image fails to load, draw a placeholder
            doc.setDrawColor(200, 200, 200);
            doc.rect(x, currentY, imageWidth, imageHeight);
            doc.setFontSize(8);
            doc.text(`Image ${index + 1}`, x + 5, currentY + 30);
            doc.text(image.alt || 'Package Image', x + 5, currentY + 40);
          }
          
          // Add image filename below
          doc.setFontSize(8);
          const filename = image.url.split('/').pop() || `image_${index + 1}.jpg`;
          doc.text(filename, x, currentY + imageHeight + 5);
        });
        
        yPosition += Math.ceil(pkg.images.length / imagesPerRow) * (imageHeight + 30) + 10;
      }
      
      // Add package details in table format
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Package Details', 20, yPosition);
      yPosition += 15;
      
      // Create table data for package details
      const tableData = [
        ['Duration', pkg.duration || 'N/A'],
        ['Location', pkg.location || 'N/A'],
        ['Capacity', pkg.capacity || 'N/A'],
        ['Price', `₹${pkg.price}`],
        ['Type', pkg.packageType === 'domestic' ? 'Domestic' : 'International'],
        ['Place', pkg.place === 'bhutan' ? 'Bhutan' : 'Nepal']
      ];
      
      // Add table using autoTable
      autoTable(doc, {
        head: [['Detail', 'Value']],
        body: tableData,
        startY: yPosition,
        styles: {
          fontSize: 10,
          cellPadding: 5,
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { cellWidth: 50, fontStyle: 'bold' },
          1: { cellWidth: 120 },
        },
      });
      
      yPosition = (doc as any).lastAutoTable.finalY + 20;
      
      // Add About section
      if (pkg.about) {
        if (yPosition > 200) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('About', 20, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        const aboutLines = doc.splitTextToSize(pkg.about, 170);
        doc.text(aboutLines, 20, yPosition);
        yPosition += aboutLines.length * 5 + 15;
      }
      
      // Skip Our Services section as requested
      
      // Add Tour Details section in table format for Bhutan packages
      if (pkg.tourDetails && pkg.place === 'bhutan') {
        if (yPosition > 200) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Tour Details', 20, yPosition);
        yPosition += 15;
        
        // Split tour details by lines and create table data
        const tourDetailsLines = pkg.tourDetails.split('\n').filter(line => line.trim() !== '');
        const tableData = tourDetailsLines.map(line => [line.trim()]);
        
        // Add tour details table
        autoTable(doc, {
          head: [['Details']],
          body: tableData,
          startY: yPosition,
          styles: {
            fontSize: 10,
            cellPadding: 5,
          },
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: 'bold',
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245],
          },
          columnStyles: {
            0: { cellWidth: 170 },
          },
        });
        
        yPosition = (doc as any).lastAutoTable.finalY + 20;
      }
      
      // Add Itinerary section with blue background title
      if (pkg.itinerary && pkg.itinerary.length > 0) {
        if (yPosition > 150) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Add blue background for Itinerary title
        doc.setFillColor(41, 128, 185);
        doc.rect(20, yPosition - 5, 170, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Itinerary', 25, yPosition + 5);
        
        // Reset text color
        doc.setTextColor(0, 0, 0);
        yPosition += 20;
        
        pkg.itinerary.forEach((day, index) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.setFontSize(12);
          doc.setFont(undefined, 'bold');
          doc.text(`Day ${day.day}`, 20, yPosition);
          yPosition += 8;
          
          doc.setFontSize(10);
          doc.setFont(undefined, 'bold');
          // Remove any star emojis and show clean bold text
          const cleanTitle = day.title.replace(/[⭐*]/g, '').trim();
          doc.text(cleanTitle, 20, yPosition);
          yPosition += 8;
          
          doc.setFont(undefined, 'normal');
          const descLines = doc.splitTextToSize(day.description, 170);
          doc.text(descLines, 20, yPosition);
          yPosition += descLines.length * 5 + 10;
        });
      }
      
      // Add Transportation section in table format
      if (pkg.transportation && pkg.transportation.length > 0) {
        if (yPosition > 200) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Transportation', 20, yPosition);
        yPosition += 15;
        
        // Create table data for transportation
        const transportationTableData = pkg.transportation.map(transport => [
          transport.type,
          transport.vehicle,
          transport.description || 'N/A'
        ]);
        
        // Add transportation table
        autoTable(doc, {
          head: [['Type', 'Vehicle', 'Description']],
          body: transportationTableData,
          startY: yPosition,
          styles: {
            fontSize: 9,
            cellPadding: 4,
          },
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: 'bold',
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245],
          },
          columnStyles: {
            0: { cellWidth: 40 },
            1: { cellWidth: 50 },
            2: { cellWidth: 80 },
          },
        });
        
        yPosition = (doc as any).lastAutoTable.finalY + 20;
      }
      
      // Add Accommodation section in table format
      if (pkg.accommodation && pkg.accommodation.length > 0) {
        if (yPosition > 200) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Accommodation', 20, yPosition);
        yPosition += 15;
        
        // Create table data for accommodation
        const accommodationTableData = pkg.accommodation.map(accommodation => [
          accommodation.city,
          accommodation.hotel,
          accommodation.rooms,
          accommodation.roomType,
          accommodation.nights
        ]);
        
        // Add accommodation table
        autoTable(doc, {
          head: [['City', 'Hotel/Resort', 'Rooms', 'Room Type', 'Nights']],
          body: accommodationTableData,
          startY: yPosition,
          styles: {
            fontSize: 9,
            cellPadding: 4,
          },
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: 'bold',
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245],
          },
          columnStyles: {
            0: { cellWidth: 30 },
            1: { cellWidth: 60 },
            2: { cellWidth: 20 },
            3: { cellWidth: 30 },
            4: { cellWidth: 20 },
          },
        });
        
        yPosition = (doc as any).lastAutoTable.finalY + 20;
      }
      
      // Package Statistics section removed as requested

      // Save the PDF
      const fileName = `${pkg.title.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
      alert('Package exported to PDF successfully!');
    } catch (error) {
      console.error('Error exporting package to PDF:', error);
      alert('Error exporting package to PDF. Please try again.');
    }
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
                <Button variant="outline" size="sm" onClick={handleExportToPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
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
                              onClick={() => handleDuplicatePackage(pkg)}
                              title="Duplicate Package"
                              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleExportSinglePackageToPDF(pkg)}
                              title="Export Package to PDF"
                              className="text-green-500 hover:text-green-700 hover:bg-green-50"
                            >
                              <Download className="h-4 w-4" />
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
