'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import CreatePackageModal from "../../components/CreatePackageModal";
import PackageDetailModal from "../../components/PackageDetailModal";
import EditPackageModal from "../../components/EditPackageModal";
import CreateTestimonialModal from "../../components/CreateTestimonialModal";
import CreateBlogModal from "../../components/CreateBlogModal";
import EditBlogModal from "../../components/EditBlogModal";
import ViewBookingModal from "../../components/ViewBookingModal";
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
  Copy,
  MessageSquare,
  FileText,
  Menu,
  X,
  LayoutDashboard,
  Pencil,
  Calendar,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { cn } from "../../lib/utils";

interface PackageData {
  _id: string;
  title: string;
  subtitle: string;
  ideaFor?: string;
  about: string;
  services: string;
  tourDetails: string;
  abstract?: string;
  tourOverview?: string;
  keyHighlights?: string[];
  hotelOptions?: string[];
  bestTimeToVisit?: {
    yearRound?: string;
    winter?: string;
    summer?: string;
  };
  whyChooseThisTrip?: string[];
  whyPremiumDubaiTours?: string[];
  price: number;
  duration: string;
  location: string;
  capacity: string;
  packageType: 'domestic' | 'international';
  place: string;
  packageCategory: string;
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
  inclusions?: string[] | Array<{
    category: string;
    items: string[];
  }>;
  exclusions?: string[] | Array<{
    category: string;
    items: string[];
  }>;
  bookings: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

type DashboardView = 'packages' | 'testimonials' | 'blogs' | 'bookings';

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<DashboardView>('packages');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCreatePackageModalOpen, setIsCreatePackageModalOpen] = useState(false);
  const [isViewPackageModalOpen, setIsViewPackageModalOpen] = useState(false);
  const [isEditPackageModalOpen, setIsEditPackageModalOpen] = useState(false);
  const [isCreateTestimonialModalOpen, setIsCreateTestimonialModalOpen] = useState(false);
  const [isCreateBlogModalOpen, setIsCreateBlogModalOpen] = useState(false);
  const [isEditBlogModalOpen, setIsEditBlogModalOpen] = useState(false);
  const [isViewBookingModalOpen, setIsViewBookingModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<PackageData[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [packageTypeFilter, setPackageTypeFilter] = useState("all");
  const [placeFilter, setPlaceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchPackages = async () => {
    try {
      setLoading(true);
      
      // First, try to seed packages if database is empty
      try {
        const seedResponse = await fetch('/api/packages/seed', { method: 'POST' });
        const seedData = await seedResponse.json();
        console.log('Seed response:', seedData);
      } catch (seedError) {
        console.log('Seed attempt completed or failed:', seedError);
      }

      // Wait a bit for database to update
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = await fetch('/api/packages');
      const data = await response.json();
      console.log('Fetched packages:', data);
      if (data.success && data.data) {
        setPackages(data.data);
        console.log(`Loaded ${data.data.length} packages`);
      } else {
        console.warn('No packages data in response:', data);
        setPackages([]);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    try {
      setLoadingTestimonials(true);
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      if (data.success && data.data) {
        setTestimonials(data.data);
      } else {
        setTestimonials([]);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials([]);
    } finally {
      setLoadingTestimonials(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        const response = await fetch('/api/blogs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          // If response is not ok, try to get error message
          let errorMessage = `Failed to fetch blogs (Status: ${response.status})`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch (parseError) {
            // If can't parse as JSON, read as text
            try {
              const errorText = await response.text();
              errorMessage = errorText || errorMessage;
            } catch (textError) {
              errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            }
          }
          console.error('Error fetching blogs:', errorMessage);
          setBlogs([]);
          return;
        }

        const data = await response.json();
        
        if (data.success) {
          // Handle both data.data and direct data array
          const blogsArray = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
          setBlogs(blogsArray);
        } else {
          console.warn('Blogs API returned unsuccessful response:', data);
          setBlogs([]);
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        const error = fetchError as Error;
        if (error.name === 'AbortError') {
          console.error('Request timeout: The server took too long to respond');
          setBlogs([]);
        } else if (error.message === 'Failed to fetch' || error.message.includes('NetworkError') || error.message.includes('ERR_INTERNET_DISCONNECTED')) {
          console.error('Network error: Unable to reach the server. Please check if the server is running.');
          setBlogs([]);
        } else {
          throw fetchError; // Re-throw to be caught by outer catch
        }
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error details:', errorMessage);
      setBlogs([]);
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    if (activeView === 'testimonials') {
      fetchTestimonials();
    }
    if (activeView === 'blogs') {
      // Add a small delay to ensure the component is fully mounted
      const timer = setTimeout(() => {
        fetchBlogs();
      }, 100);
      return () => clearTimeout(timer);
    }
    if (activeView === 'bookings') {
      fetchBookings();
    }
  }, [activeView]);

  useEffect(() => {
    filterPackages();
  }, [packages, searchTerm, packageTypeFilter, placeFilter, categoryFilter]);

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

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(pkg => pkg.packageCategory === categoryFilter);
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
        const errorMessage = error instanceof Error ? error.message : error?.toString() || 'Unknown error occurred';
        alert(`Error deleting package: ${errorMessage}`);
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
      const errorMessage = error instanceof Error ? error.message : error?.toString() || 'Unknown error occurred';
      alert(`Error duplicating package: ${errorMessage}`);
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
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `AED ${pkg.price?.toLocaleString() || '0'}` })] })] }),
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
              children: [new TextRun({ text: "Premium Dubai Tours - Package Report", bold: true, size: 32 })],
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

  // Helper function to get formatted place name
  const getFormattedPlace = (place: string) => {
    const placeMap: { [key: string]: string } = {
      'bhutan': 'Bhutan',
      'nepal': 'Nepal',
      'vietnam': 'Vietnam',
      'sri-lanka': 'Sri Lanka',
      'bali': 'Bali',
      'malaysia': 'Malaysia',
      'singapore': 'Singapore',
      'dubai': 'Dubai',
      'thailand': 'Thailand',
      'indonesia': 'Indonesia',
      'philippines': 'Philippines',
      'japan': 'Japan',
      'china': 'China',
      'south-korea': 'South Korea',
      'taiwan': 'Taiwan',
      'hong-kong': 'Hong Kong',
      'macau': 'Macau',
      'myanmar': 'Myanmar',
      'cambodia': 'Cambodia',
      'laos': 'Laos',
      'bangladesh': 'Bangladesh',
      'pakistan': 'Pakistan',
      'afghanistan': 'Afghanistan',
      'iran': 'Iran',
      'turkey': 'Turkey',
      'egypt': 'Egypt',
      'morocco': 'Morocco',
      'south-africa': 'South Africa',
      'kenya': 'Kenya',
      'tanzania': 'Tanzania',
      'mauritius': 'Mauritius',
      'seychelles': 'Seychelles',
      'maldives': 'Maldives',
      'fiji': 'Fiji',
      'australia': 'Australia',
      'new-zealand': 'New Zealand',
      'europe': 'Europe',
      'france': 'France',
      'italy': 'Italy',
      'spain': 'Spain',
      'germany': 'Germany',
      'switzerland': 'Switzerland',
      'austria': 'Austria',
      'netherlands': 'Netherlands',
      'belgium': 'Belgium',
      'greece': 'Greece',
      'portugal': 'Portugal',
      'norway': 'Norway',
      'sweden': 'Sweden',
      'denmark': 'Denmark',
      'finland': 'Finland',
      'iceland': 'Iceland',
      'ireland': 'Ireland',
      'uk': 'United Kingdom',
      'england': 'England',
      'scotland': 'Scotland',
      'wales': 'Wales',
      'canada': 'Canada',
      'usa': 'United States',
      'america': 'America',
      'brazil': 'Brazil',
      'argentina': 'Argentina',
      'chile': 'Chile',
      'peru': 'Peru',
      'colombia': 'Colombia',
      'mexico': 'Mexico',
      'cuba': 'Cuba',
      'jamaica': 'Jamaica',
      'costa-rica': 'Costa Rica',
      'india': 'India',
      'kashmir': 'Kashmir',
      'leh': 'Leh',
      'ladakh': 'Ladakh',
      'himachal': 'Himachal Pradesh',
      'manali': 'Manali',
      'shimla': 'Shimla',
      'dharamshala': 'Dharamshala',
      'mcleodganj': 'McLeodganj',
      'uttarakhand': 'Uttarakhand',
      'rishikesh': 'Rishikesh',
      'haridwar': 'Haridwar',
      'dehradun': 'Dehradun',
      'mussoorie': 'Mussoorie',
      'nainital': 'Nainital',
      'rajasthan': 'Rajasthan',
      'jaipur': 'Jaipur',
      'udaipur': 'Udaipur',
      'jodhpur': 'Jodhpur',
      'jaisalmer': 'Jaisalmer',
      'bikaner': 'Bikaner',
      'mount-abu': 'Mount Abu',
      'goa': 'Goa',
      'kerala': 'Kerala',
      'munnar': 'Munnar',
      'alleppey': 'Alleppey',
      'kochi': 'Kochi',
      'trivandrum': 'Trivandrum',
      'karnataka': 'Karnataka',
      'bangalore': 'Bangalore',
      'mysore': 'Mysore',
      'coorg': 'Coorg',
      'ooty': 'Ooty',
      'tamil-nadu': 'Tamil Nadu',
      'chennai': 'Chennai',
      'madurai': 'Madurai',
      'pondicherry': 'Pondicherry',
      'mahabalipuram': 'Mahabalipuram',
      'andhra-pradesh': 'Andhra Pradesh',
      'hyderabad': 'Hyderabad',
      'visakhapatnam': 'Visakhapatnam',
      'telangana': 'Telangana',
      'maharashtra': 'Maharashtra',
      'mumbai': 'Mumbai',
      'pune': 'Pune',
      'nashik': 'Nashik',
      'aurangabad': 'Aurangabad',
      'gujarat': 'Gujarat',
      'ahmedabad': 'Ahmedabad',
      'surat': 'Surat',
      'vadodara': 'Vadodara',
      'rajkot': 'Rajkot',
      'bhavnagar': 'Bhavnagar',
      'madhya-pradesh': 'Madhya Pradesh',
      'bhopal': 'Bhopal',
      'indore': 'Indore',
      'gwalior': 'Gwalior',
      'ujjain': 'Ujjain',
      'khajuraho': 'Khajuraho',
      'west-bengal': 'West Bengal',
      'kolkata': 'Kolkata',
      'darjeeling': 'Darjeeling',
      'kalimpong': 'Kalimpong',
      'gangtok': 'Gangtok',
      'sikkim': 'Sikkim',
      'assam': 'Assam',
      'guwahati': 'Guwahati',
      'kaziranga': 'Kaziranga',
      'manipur': 'Manipur',
      'imphal': 'Imphal',
      'meghalaya': 'Meghalaya',
      'shillong': 'Shillong',
      'cherrapunji': 'Cherrapunji',
      'mizoram': 'Mizoram',
      'aizawl': 'Aizawl',
      'nagaland': 'Nagaland',
      'kohima': 'Kohima',
      'tripura': 'Tripura',
      'agartala': 'Agartala',
      'arunachal-pradesh': 'Arunachal Pradesh',
      'itanagar': 'Itanagar',
      'tawang': 'Tawang',
      'odisha': 'Odisha',
      'bhubaneswar': 'Bhubaneswar',
      'puri': 'Puri',
      'konark': 'Konark',
      'jharkhand': 'Jharkhand',
      'ranchi': 'Ranchi',
      'bihar': 'Bihar',
      'patna': 'Patna',
      'bodh-gaya': 'Bodh Gaya',
      'nalanda': 'Nalanda',
      'chhattisgarh': 'Chhattisgarh',
      'raipur': 'Raipur',
      'jagdalpur': 'Jagdalpur',
      'punjab': 'Punjab',
      'chandigarh': 'Chandigarh',
      'amritsar': 'Amritsar',
      'haryana': 'Haryana',
      'gurgaon': 'Gurgaon',
      'faridabad': 'Faridabad',
      'himachal-pradesh': 'Himachal Pradesh',
      'uttar-pradesh': 'Uttar Pradesh',
      'lucknow': 'Lucknow',
      'agra': 'Agra',
      'varanasi': 'Varanasi',
      'allahabad': 'Allahabad',
      'kanpur': 'Kanpur',
      'jhansi': 'Jhansi',
      'mathura': 'Mathura',
      'vrindavan': 'Vrindavan'
    };

    return placeMap[place] || place || 'N/A';
  };

  const handleExportSinglePackageToWord = async (pkg: PackageData) => {
    try {
      // Create document children array
      const children = [
        new Paragraph({
          children: [new TextRun({ text: "Premium Dubai Tours", bold: true, size: 32 })],
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
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Price" })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `AED ${pkg.price?.toLocaleString() || '0'}` })] })] }),
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
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: getFormattedPlace(pkg.place) })] })] }),
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
            // Add Inclusions section
            ...(pkg.inclusions && pkg.inclusions.length > 0 ? [
              new Paragraph({
                children: [new TextRun({ text: "What's Included", bold: true, size: 24 })],
                heading: HeadingLevel.HEADING_2,
              }),
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Inclusions", bold: true })] })] }),
                    ],
                  }),
                  ...pkg.inclusions.map(inclusion =>
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `• ${inclusion}` })] })] }),
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
            // Add Exclusions section
            ...(pkg.exclusions && pkg.exclusions.length > 0 ? [
              new Paragraph({
                children: [new TextRun({ text: "What's Not Included", bold: true, size: 24 })],
                heading: HeadingLevel.HEADING_2,
              }),
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Exclusions", bold: true })] })] }),
                    ],
                  }),
                  ...pkg.exclusions.map(exclusion =>
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `• ${exclusion}` })] })] }),
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

  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);
      const response = await fetch('/api/bookings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setBookings(Array.isArray(data.data) ? data.data : []);
        } else {
          setBookings([]);
        }
      } else {
        console.error('Failed to fetch bookings:', response.status, response.statusText);
        setBookings([]);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  };

  const sidebarItems = [
    {
      id: 'packages' as DashboardView,
      label: 'Packages',
      icon: Package,
      description: 'Manage tour packages'
    },
    {
      id: 'testimonials' as DashboardView,
      label: 'Testimonials',
      icon: MessageSquare,
      description: 'Manage customer reviews'
    },
    {
      id: 'blogs' as DashboardView,
      label: 'Blogs',
      icon: FileText,
      description: 'Manage blog posts'
    },
    {
      id: 'bookings' as DashboardView,
      label: 'Bookings',
      icon: Calendar,
      description: 'Manage customer bookings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r transition-all duration-300 ease-in-out fixed lg:static inset-y-0 left-0 z-50",
        sidebarOpen ? "w-64" : "w-0 lg:w-0",
        "overflow-hidden lg:overflow-visible"
      )}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left",
                    activeView === item.id
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className={cn(
                      "text-xs",
                      activeView === item.id ? "text-white/80" : "text-gray-500"
                    )}>
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
      {/* Header */}
      <div className="bg-white border-b">
          <div className="px-6 py-4">
          <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {!sidebarOpen && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                )}
            <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {activeView === 'packages' && 'Packages'}
                    {activeView === 'testimonials' && 'Testimonials'}
                    {activeView === 'blogs' && 'Blogs'}
                    {activeView === 'bookings' && 'Bookings'}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {activeView === 'packages' && 'Manage your tour packages'}
                    {activeView === 'testimonials' && 'Manage customer testimonials and reviews'}
                    {activeView === 'blogs' && 'Manage blog posts and articles'}
                    {activeView === 'bookings' && 'Manage customer bookings and reservations'}
                  </p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {activeView === 'packages' && (
              <Button size="sm" onClick={openCreatePackageModal}>
                <Plus className="h-4 w-4 mr-2" />
                New Package
              </Button>
                )}
                {activeView === 'testimonials' && (
                  <Button size="sm" onClick={() => setIsCreateTestimonialModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                )}
                {activeView === 'blogs' && (
                  <Button size="sm" onClick={() => setIsCreateBlogModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Blog Post
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {activeView === 'packages' && (
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Wildlife">Wildlife</SelectItem>
                    <SelectItem value="Trekking">Trekking</SelectItem>
                    <SelectItem value="Spiritual">Spiritual</SelectItem>
                    <SelectItem value="Beach">Beach</SelectItem>
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
              {(searchTerm || packageTypeFilter !== "all" || placeFilter !== "all" || categoryFilter !== "all") && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setPackageTypeFilter("all");
                      setPlaceFilter("all");
                      setCategoryFilter("all");
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
                    <th className="text-left p-3">Category</th>
                    <th className="text-left p-3">Place</th>
                    <th className="text-left p-3">Duration</th>
                    <th className="text-left p-3">Location</th>
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
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {pkg.packageCategory || 'Cultural'}
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
                        <td className="p-3 font-medium">AED {pkg.price?.toLocaleString() || "0"}</td>
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
                                  setCategoryFilter("all");
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
          )}

          {activeView === 'testimonials' && (
            <div className="container mx-auto px-6 py-8">
              <Card>
                <CardHeader>
                  <CardTitle>Testimonials</CardTitle>
                  <CardDescription>Manage customer testimonials and reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingTestimonials ? (
                    <div className="text-center py-12">
                      <p className="text-gray-600">Loading testimonials...</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3">Name</th>
                            <th className="text-left p-3">Role</th>
                            <th className="text-left p-3">Quote</th>
                            <th className="text-left p-3">Rating</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-left p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {testimonials.length > 0 ? (
                            testimonials.map((testimonial) => (
                              <tr key={testimonial._id} className="border-b">
                                <td className="p-3 font-medium">{testimonial.name}</td>
                                <td className="p-3 text-gray-600">{testimonial.role}</td>
                                <td className="p-3">
                                  <p className="text-sm text-gray-700 line-clamp-2 max-w-md">
                                    {testimonial.quote}
                                  </p>
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                                    {testimonial.rating || 5}
                                  </div>
                                </td>
                                <td className="p-3">
                                  <Badge variant={testimonial.isActive ? 'default' : 'secondary'}>
                                    {testimonial.isActive ? 'Active' : 'Inactive'}
                                  </Badge>
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={async () => {
                                        if (window.confirm(`Are you sure you want to delete "${testimonial.name}"?`)) {
                                          try {
                                            const response = await fetch(`/api/testimonials/${testimonial._id}`, {
                                              method: 'DELETE',
                                            });
                                            if (response.ok) {
                                              setTestimonials(prev => prev.filter(t => t._id !== testimonial._id));
                                              alert('Testimonial deleted successfully!');
                                            } else {
                                              alert('Failed to delete testimonial');
                                            }
                                          } catch (error) {
                                            console.error('Error deleting testimonial:', error);
                                            alert('Error deleting testimonial');
                                          }
                                        }
                                      }}
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
                              <td colSpan={6} className="p-8 text-center text-gray-500">
                                <div className="flex flex-col items-center space-y-2">
                                  <MessageSquare className="h-12 w-12 text-gray-300" />
                                  <p>No testimonials yet</p>
                                  <Button onClick={() => setIsCreateTestimonialModalOpen(true)} size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Your First Testimonial
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'bookings' && (
            <div className="container mx-auto px-6 py-8">
              <Card>
                <CardHeader>
                  <CardTitle>Bookings</CardTitle>
                  <CardDescription>Manage customer bookings and reservations</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingBookings ? (
                    <div className="text-center py-12">
                      <p className="text-gray-600">Loading bookings...</p>
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="flex flex-col items-center space-y-4">
                        <Calendar className="h-16 w-16 text-gray-300" />
                        <div>
                          <p className="text-gray-600 mb-2">No bookings found</p>
                          <p className="text-sm text-gray-500 mb-4">
                            Bookings will appear here once customers make reservations.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3">Booking ID</th>
                            <th className="text-left p-3">Package</th>
                            <th className="text-left p-3">Customer</th>
                            <th className="text-left p-3">Date</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-left p-3">Amount</th>
                            <th className="text-left p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr key={booking._id} className="border-b">
                              <td className="p-3">
                                <div className="font-mono text-sm">{booking._id?.slice(-8) || 'N/A'}</div>
                              </td>
                              <td className="p-3">
                                <div className="font-medium">{booking.packageName || booking.packageId || 'N/A'}</div>
                              </td>
                              <td className="p-3">
                                <div>
                                  <div className="font-medium">{booking.customerName || 'N/A'}</div>
                                  <div className="text-sm text-gray-500">{booking.customerEmail || ''}</div>
                                </div>
                              </td>
                              <td className="p-3 text-gray-600">
                                {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'N/A'}
                              </td>
                              <td className="p-3">
                                <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'pending' ? 'secondary' : 'outline'}>
                                  {booking.status || 'Pending'}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <div className="font-medium">AED {booking.amount || booking.totalPrice || '0'}</div>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedBooking(booking);
                                      setIsViewBookingModalOpen(true);
                                    }}
                                    className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'blogs' && (
            <div className="container mx-auto px-6 py-8">
              <Card>
                <CardHeader>
                  <CardTitle>Blogs</CardTitle>
                  <CardDescription>Manage blog posts and articles</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingBlogs ? (
                    <div className="text-center py-12">
                      <p className="text-gray-600">Loading blogs...</p>
                    </div>
                  ) : blogs.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="flex flex-col items-center space-y-4">
                        <FileText className="h-16 w-16 text-gray-300" />
                        <div>
                          <p className="text-gray-600 mb-2">No blogs found</p>
                          <p className="text-sm text-gray-500 mb-4">
                            Blogs will appear here once they are added to the database.
                          </p>
                          <div className="flex flex-col items-center space-y-2">
                            <Button onClick={() => setIsCreateBlogModalOpen(true)} size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Your First Blog Post
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={async () => {
                                // Try to seed blogs
                                try {
                                  const response = await fetch('/api/blogs/seed', { method: 'POST' });
                                  if (response.ok) {
                                    const data = await response.json();
                                    alert(data.message || 'Blogs seeded successfully!');
                                    fetchBlogs();
                                  } else {
                                    alert('Failed to seed blogs');
                                  }
                                } catch (error) {
                                  console.error('Error seeding blogs:', error);
                                  alert('Error seeding blogs. Please check the console.');
                                }
                              }}
                            >
                              Seed Sample Blogs
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3">Title</th>
                            <th className="text-left p-3">Category</th>
                            <th className="text-left p-3">Author</th>
                            <th className="text-left p-3">Publish Date</th>
                            <th className="text-left p-3">Views</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-left p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogs.map((blog) => (
                            <tr key={blog._id} className="border-b">
                                <td className="p-3">
                                  <div className="flex items-center space-x-3">
                                    {blog.image && (
                                      <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200">
                                        <img
                                          src={blog.image}
                                          alt={blog.title}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    )}
                                    <div>
                                      <div className="font-medium line-clamp-1 max-w-md">{blog.title}</div>
                                      <div className="text-sm text-gray-500 line-clamp-1 max-w-md">{blog.excerpt}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <Badge variant="outline">{blog.category}</Badge>
                                </td>
                                <td className="p-3 text-gray-600">{blog.author || 'Premium Dubai Tours'}</td>
                                <td className="p-3 text-gray-600">
                                  {blog.publishDate ? new Date(blog.publishDate).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center">
                                    <Eye className="h-4 w-4 text-gray-400 mr-1" />
                                    {blog.views || 0}
                                  </div>
                                </td>
                                <td className="p-3">
                                  <Badge variant={blog.isPublished ? 'default' : 'secondary'}>
                                    {blog.isPublished ? 'Published' : 'Draft'}
                                  </Badge>
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedBlog(blog);
                                        setIsEditBlogModalOpen(true);
                                      }}
                                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={async () => {
                                        if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
                                          try {
                                            const response = await fetch(`/api/blogs/${blog._id}`, {
                                              method: 'DELETE',
                                            });
                                            if (response.ok) {
                                              setBlogs(prev => prev.filter(b => b._id !== blog._id));
                                              alert('Blog deleted successfully!');
                                            } else {
                                              alert('Failed to delete blog');
                                            }
                                          } catch (error) {
                                            console.error('Error deleting blog:', error);
                                            alert('Error deleting blog');
                                          }
                                        }
                                      }}
                                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Create Package Modal */}
      <CreatePackageModal
        isOpen={isCreatePackageModalOpen}
        onClose={() => setIsCreatePackageModalOpen(false)}
        onPackageCreated={handlePackageCreated}
      />

      {/* Create Testimonial Modal */}
      <CreateTestimonialModal
        isOpen={isCreateTestimonialModalOpen}
        onClose={() => setIsCreateTestimonialModalOpen(false)}
        onSuccess={() => {
          fetchTestimonials();
        }}
      />

      {/* Create Blog Modal */}
      <CreateBlogModal
        isOpen={isCreateBlogModalOpen}
        onClose={() => setIsCreateBlogModalOpen(false)}
        onSuccess={() => {
          fetchBlogs();
        }}
      />

      {/* Edit Blog Modal */}
      <EditBlogModal
        isOpen={isEditBlogModalOpen}
        onClose={() => {
          setIsEditBlogModalOpen(false);
          setSelectedBlog(null);
        }}
        onSuccess={() => {
          fetchBlogs();
        }}
        blog={selectedBlog}
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

      {/* View Booking Modal */}
      <ViewBookingModal
        isOpen={isViewBookingModalOpen}
        onClose={() => {
          setIsViewBookingModalOpen(false);
          setSelectedBooking(null);
        }}
        booking={selectedBooking}
      />
    </div>
  );
}
