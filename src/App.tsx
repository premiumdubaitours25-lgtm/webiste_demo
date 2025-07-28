import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import PackagesPage from "./pages/PackagesPage";
import DomesticPackagesPage from "./pages/DomesticPackagesPage";
import InternationalPackagesPage from "./pages/InternationalPackagesPage";
import PackageDetailPage from "./pages/PackageDetailPage";
import DestinationsPage from "./pages/DestinationsPage";
import BlogsPage from "./pages/BlogsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isPackageDetailPage = location.pathname.startsWith('/package/');

  return (
    <div className="min-h-screen">
      {!isPackageDetailPage && <Header />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/domestic" element={<DomesticPackagesPage />} />
        <Route path="/packages/international" element={<InternationalPackagesPage />} />
        <Route path="/package/:id" element={<PackageDetailPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
