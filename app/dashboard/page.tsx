'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import CreatePackageModal from "../../components/CreatePackageModal";
import PackageDetailModal from "../../components/PackageDetailModal";
import EditPackageModal from "../../components/EditPackageModal";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel, ImageRun } from 'docx';
import { saveAs } from 'file-saver';
import axios from 'axios';
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
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

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
  place: string;
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
  const [filteredPackages, setFilteredPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [packageTypeFilter, setPackageTypeFilter] = useState("all");
  const [placeFilter, setPlaceFilter] = useState("all");

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

  useEffect(() => {
    filterPackages();
  }, [packages, searchTerm, packageTypeFilter, placeFilter]);

  // Reset place filter when package type changes
  useEffect(() => {
    if (packageTypeFilter !== "all" && placeFilter !== "all") {
      // Check if current place filter is valid for the selected package type
      const domesticPlaces = ['darjeeling', 'sikkim', 'meghalaya', 'arunachal', 'himachal-pradesh', 'kashmir', 'leh-ladakh'];
      const internationalPlaces = ['vietnam', 'sri-lanka', 'bali', 'malaysia', 'singapore'];
      
      if (packageTypeFilter === 'domestic' && !domesticPlaces.includes(placeFilter)) {
        setPlaceFilter("all");
      } else if (packageTypeFilter === 'international' && !internationalPlaces.includes(placeFilter)) {
        setPlaceFilter("all");
      }
    }
  }, [packageTypeFilter, placeFilter]);

  const filterPackages = () => {
    let filtered = packages;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(pkg =>
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Package type filter
    if (packageTypeFilter !== "all") {
      filtered = filtered.filter(pkg => pkg.packageType === packageTypeFilter);
    }

    // Place filter
    if (placeFilter !== "all") {
      filtered = filtered.filter(pkg => pkg.place === placeFilter);
    }

    setFilteredPackages(filtered);
  };

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

  const handleExportToWord = async () => {
    try {
      // Create table rows for packages
      const tableRows = [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "#", bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Title", bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Type", bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Place", bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Duration", bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Location", bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Capacity", bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Price", bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Rating", bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Bookings", bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Created", bold: true })] })] }),
          ],
        }),
        ...filteredPackages.map((pkg, index) => 
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: (index + 1).toString() })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: pkg.title })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: pkg.packageType === 'domestic' ? 'Domestic' : 'International' })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: pkg.place === 'bhutan' ? 'Bhutan' : 'Nepal' })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: pkg.duration || 'N/A' })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: pkg.location || 'N/A' })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: pkg.capacity || 'N/A' })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `₹${pkg.price}` })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: (pkg.rating || 0).toString() })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: (pkg.bookings || 0).toString() })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: new Date(pkg.createdAt).toLocaleDateString() })] })] }),
            ],
          })
        ),
      ];

      // Create Word document
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: "TIA Tours - Package Report", bold: true, size: 32 })],
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [new TextRun({ text: `Generated on: ${new Date().toLocaleDateString()}`, size: 20 })],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ children: [new TextRun({ text: "" })] }), // Empty line
            new Table({
              rows: tableRows,
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
            }),
            new Paragraph({ children: [new TextRun({ text: "" })] }), // Empty line
            new Paragraph({
              children: [new TextRun({ text: "Summary:", bold: true, size: 24 })],
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              children: [new TextRun({ text: `Total Packages: ${filteredPackages.length}`, size: 20 })],
            }),
            new Paragraph({
              children: [new TextRun({ text: `Domestic Packages: ${filteredPackages.filter(p => p.packageType === 'domestic').length}`, size: 20 })],
            }),
            new Paragraph({
              children: [new TextRun({ text: `International Packages: ${filteredPackages.filter(p => p.packageType === 'international').length}`, size: 20 })],
            }),
            new Paragraph({
              children: [new TextRun({ text: `Total Bookings: ${filteredPackages.reduce((sum, p) => sum + (p.bookings || 0), 0)}`, size: 20 })],
            }),
            new Paragraph({
              children: [new TextRun({ text: `Average Rating: ${filteredPackages.length > 0 ? (filteredPackages.reduce((sum, p) => sum + (p.rating || 0), 0) / filteredPackages.length).toFixed(1) : '0.0'}`, size: 20 })],
            }),
          ],
        }],
      });

      // Generate and save the Word document
      const buffer = await Packer.toBuffer(doc);
      const arrayBuffer = new ArrayBuffer(buffer.byteLength);
      const view = new Uint8Array(arrayBuffer);
      view.set(new Uint8Array(buffer));
      const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, `tia-tours-packages-${new Date().toISOString().split('T')[0]}.docx`);
      
      alert('Package data exported to Word document successfully!');
    } catch (error) {
      console.error('Error exporting to Word:', error);
      alert('Error exporting to Word document. Please try again.');
    }
  };

  // Helper function to download image as base64
  const downloadImageAsBase64 = async (url: string): Promise<string | null> => {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 10000, // 10 second timeout
      });
      const base64 = Buffer.from(response.data, 'binary').toString('base64');
      return `data:${response.headers['content-type'] || 'image/jpeg'};base64,${base64}`;
    } catch (error) {
      console.error('Error downloading image:', error);
      return null;
    }
  };

  const handleExportSinglePackageToWord = async (pkg: PackageData) => {
    try {
      // Create document children array
      const children = [
        new Paragraph({
          children: [new TextRun({ text: "TIA Tours & Travels", bold: true, size: 32 })],
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          children: [new TextRun({ text: pkg.title, bold: true, size: 28 })],
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          children: [new TextRun({ text: pkg.subtitle || '', size: 20 })],
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({ children: [new TextRun({ text: "" })] }), // Empty line
      ];

      // Add package images section with actual images
      if (pkg.images && pkg.images.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: "Package Images", bold: true, size: 24 })],
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [new TextRun({ text: `${pkg.images.length} Images`, size: 20 })],
          }),
          new Paragraph({ children: [new TextRun({ text: "" })] }), // Empty line
        );

        // Download and add images
        for (let i = 0; i < pkg.images.length; i++) {
          const image = pkg.images[i];
          const filename = image.url.split('/').pop() || `image_${i + 1}.jpg`;
          
          children.push(
            new Paragraph({
              children: [new TextRun({ text: `Image ${i + 1}: ${filename}`, bold: true, size: 18 })],
            }),
            new Paragraph({
              children: [new TextRun({ text: `Alt: ${image.alt || 'Package Image'}`, size: 16 })],
            }),
          );

          // Try to download and embed the image
          const imageBase64 = await downloadImageAsBase64(image.url);
          if (imageBase64) {
            try {
              // Convert base64 to buffer for docx
              const base64Data = imageBase64.split(',')[1];
              const imageBuffer = Buffer.from(base64Data, 'base64');
              
              children.push(
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: imageBuffer,
                      transformation: {
                        width: 300,
                        height: 200,
                      },
                      type: 'png',
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              );
            } catch (imageError) {
              console.error('Error embedding image:', imageError);
              children.push(
                new Paragraph({
                  children: [new TextRun({ text: "[Image could not be loaded]", size: 14, italics: true })],
                  alignment: AlignmentType.CENTER,
                }),
              );
            }
          } else {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: "[Image could not be downloaded]", size: 14, italics: true })],
                alignment: AlignmentType.CENTER,
              }),
            );
          }
          
          children.push(new Paragraph({ children: [new TextRun({ text: "" })] })); // Empty line
        }
      }

      // Add package details table
      const packageDetailsTable = new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Detail", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Value", bold: true })] })] }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Duration" })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: pkg.duration || 'N/A' })] })] }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Location" })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: pkg.location || 'N/A' })] })] }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Capacity" })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: pkg.capacity || 'N/A' })] })] }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Price" })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `₹${pkg.price}` })] })] }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Type" })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: pkg.packageType === 'domestic' ? 'Domestic' : 'International' })] })] }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Place" })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: pkg.place === 'bhutan' ? 'Bhutan' : 'Nepal' })] })] }),
            ],
          }),
        ],
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
      });

      children.push(
        new Paragraph({
          children: [new TextRun({ text: "Package Details", bold: true, size: 24 })],
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({ children: [new TextRun({ text: "" })] }), // Empty line
      );

      // Add About section
      if (pkg.about) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: "About", bold: true, size: 24 })],
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [new TextRun({ text: pkg.about, size: 20 })],
          }),
          new Paragraph({ children: [new TextRun({ text: "" })] }), // Empty line
        );
      }

      // Add Itinerary section
      if (pkg.itinerary && pkg.itinerary.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: "Itinerary", bold: true, size: 24 })],
            heading: HeadingLevel.HEADING_2,
          }),
        );

        pkg.itinerary.forEach((day, index) => {
          const cleanTitle = day.title.replace(/[⭐*]/g, '').trim();
          children.push(
            new Paragraph({
              children: [new TextRun({ text: `Day ${day.day}`, bold: true, size: 20 })],
            }),
            new Paragraph({
              children: [new TextRun({ text: cleanTitle, bold: true, size: 18 })],
            }),
            new Paragraph({
              children: [new TextRun({ text: day.description, size: 16 })],
            }),
            new Paragraph({ children: [new TextRun({ text: "" })] }), // Empty line
          );
        });
      }

      // Create Word document with all content including tables
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            ...children,
            packageDetailsTable,
            new Paragraph({ children: [new TextRun({ text: "" })] }), // Empty line
            ...(pkg.tourDetails && pkg.place === 'bhutan' ? [
              new Paragraph({
                children: [new TextRun({ text: "Tour Details", bold: true, size: 24 })],
                heading: HeadingLevel.HEADING_2,
              }),
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Details", bold: true })] })] }),
                    ],
                  }),
                  ...pkg.tourDetails.split('\n').filter(line => line.trim() !== '').map(line => 
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: line.trim() })] })] }),
                      ],
                    })
                  ),
                ],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
              }),
              new Paragraph({ children: [new TextRun({ text: "" })] }), // Empty line
            ] : []),
            ...(pkg.transportation && pkg.transportation.length > 0 ? [
              new Paragraph({
                children: [new TextRun({ text: "Transportation", bold: true, size: 24 })],
                heading: HeadingLevel.HEADING_2,
              }),
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Type", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Vehicle", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Description", bold: true })] })] }),
                    ],
                  }),
                  ...pkg.transportation.map(transport => 
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: transport.type })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: transport.vehicle })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: transport.description || 'N/A' })] })] }),
                      ],
                    })
                  ),
                ],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
              }),
              new Paragraph({ children: [new TextRun({ text: "" })] }), // Empty line
            ] : []),
            ...(pkg.accommodation && pkg.accommodation.length > 0 ? [
              new Paragraph({
                children: [new TextRun({ text: "Accommodation", bold: true, size: 24 })],
                heading: HeadingLevel.HEADING_2,
              }),
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "City", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Hotel/Resort", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Rooms", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Room Type", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Nights", bold: true })] })] }),
                    ],
                  }),
                  ...pkg.accommodation.map(accommodation => 
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: accommodation.city })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: accommodation.hotel })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: accommodation.rooms })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: accommodation.roomType })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: accommodation.nights })] })] }),
                      ],
                    })
                  ),
                ],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
              }),
            ] : []),
          ],
        }],
      });

      // Generate and save the Word document
      const buffer = await Packer.toBuffer(doc);
      const arrayBuffer = new ArrayBuffer(buffer.byteLength);
      const view = new Uint8Array(arrayBuffer);
      view.set(new Uint8Array(buffer));
      const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const fileName = `${pkg.title.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.docx`;
      saveAs(blob, fileName);
      
      alert('Package exported to Word document successfully!');
    } catch (error) {
      console.error('Error exporting package to Word:', error);
      alert('Error exporting package to Word document. Please try again.');
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
                <Button variant="outline" size="sm" onClick={handleExportToWord}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Word
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search packages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Package Type Filter */}
                <Select value={packageTypeFilter} onValueChange={setPackageTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Package Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="domestic">Domestic</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>

                {/* Place Filter */}
                <Select value={placeFilter} onValueChange={setPlaceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Place" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Places</SelectItem>
                    {packageTypeFilter === 'domestic' ? (
                      <>
                        {/* Domestic Places */}
                        <SelectItem value="darjeeling">Darjeeling</SelectItem>
                        <SelectItem value="sikkim">Sikkim</SelectItem>
                        <SelectItem value="meghalaya">Meghalaya</SelectItem>
                        <SelectItem value="arunachal">Arunachal</SelectItem>
                        <SelectItem value="himachal-pradesh">Himachal Pradesh</SelectItem>
                        <SelectItem value="kashmir">Kashmir</SelectItem>
                        <SelectItem value="leh-ladakh">Leh Ladakh</SelectItem>
                      </>
                    ) : packageTypeFilter === 'international' ? (
                      <>
                        {/* International Places */}
                        <SelectItem value="vietnam">Vietnam</SelectItem>
                        <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                        <SelectItem value="bali">Bali</SelectItem>
                        <SelectItem value="malaysia">Malaysia</SelectItem>
                        <SelectItem value="singapore">Singapore</SelectItem>
                      </>
                    ) : (
                      <>
                        {/* All Places when no type filter is selected */}
                        {/* Domestic Places */}
                        <SelectItem value="darjeeling">Darjeeling</SelectItem>
                        <SelectItem value="sikkim">Sikkim</SelectItem>
                        <SelectItem value="meghalaya">Meghalaya</SelectItem>
                        <SelectItem value="arunachal">Arunachal</SelectItem>
                        <SelectItem value="himachal-pradesh">Himachal Pradesh</SelectItem>
                        <SelectItem value="kashmir">Kashmir</SelectItem>
                        <SelectItem value="leh-ladakh">Leh Ladakh</SelectItem>
                        {/* International Places */}
                        <SelectItem value="vietnam">Vietnam</SelectItem>
                        <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                        <SelectItem value="bali">Bali</SelectItem>
                        <SelectItem value="malaysia">Malaysia</SelectItem>
                        <SelectItem value="singapore">Singapore</SelectItem>
                        {/* Legacy Places */}
                        <SelectItem value="bhutan">Bhutan</SelectItem>
                        <SelectItem value="nepal">Nepal</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Clear Filters Button */}
              {(searchTerm || packageTypeFilter !== "all" || placeFilter !== "all") && (
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setSearchTerm("");
                      setPackageTypeFilter("all");
                      setPlaceFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

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
                  {filteredPackages.length > 0 ? (
                    filteredPackages.map((pkg) => (
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
                            {pkg.place === 'darjeeling' ? 'Darjeeling' : 
                             pkg.place === 'sikkim' ? 'Sikkim' :
                             pkg.place === 'meghalaya' ? 'Meghalaya' :
                             pkg.place === 'arunachal' ? 'Arunachal' :
                             pkg.place === 'himachal-pradesh' ? 'Himachal Pradesh' :
                             pkg.place === 'kashmir' ? 'Kashmir' :
                             pkg.place === 'leh-ladakh' ? 'Leh Ladakh' :
                             pkg.place === 'vietnam' ? 'Vietnam' :
                             pkg.place === 'sri-lanka' ? 'Sri Lanka' :
                             pkg.place === 'bali' ? 'Bali' :
                             pkg.place === 'malaysia' ? 'Malaysia' :
                             pkg.place === 'singapore' ? 'Singapore' :
                             pkg.place === 'bhutan' ? 'Bhutan' :
                             pkg.place === 'nepal' ? 'Nepal' : pkg.place}
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
                              onClick={() => handleExportSinglePackageToWord(pkg)}
                              title="Export Package to Word"
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
                      <td colSpan={9} className="p-8 text-center text-gray-500">
                        <div className="flex flex-col items-center space-y-2">
                          <Package className="h-12 w-12 text-gray-300" />
                          {packages.length === 0 ? (
                            <>
                              <p>No packages created yet</p>
                              <Button onClick={openCreatePackageModal} size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Your First Package
                              </Button>
                            </>
                          ) : (
                            <>
                              <p>No packages found matching your filters</p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  setSearchTerm("");
                                  setPackageTypeFilter("all");
                                  setPlaceFilter("all");
                                }}
                              >
                                Clear Filters
                              </Button>
                            </>
                          )}
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
