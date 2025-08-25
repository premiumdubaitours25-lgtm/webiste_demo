import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Phone, Mail, MapPin, Calendar, Users, Plane } from "lucide-react";

interface InquiryFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const InquiryFormPopup = ({ isOpen, onClose }: InquiryFormPopupProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
    travelers: "",
    budget: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    
    setIsSubmitting(false);
    alert("Thank you for your inquiry! We'll get back to you soon.");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary to-primary text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Plan Your Dream Trip</h2>
            <p className="text-lg opacity-90">Get personalized travel recommendations from our experts</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination *
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                >
                  <option value="">Select destination</option>
                  <option value="bhutan">Bhutan</option>
                  <option value="nepal">Nepal</option>
                  <option value="bali">Bali</option>
                  <option value="goa">Goa</option>
                  <option value="sikkim">Sikkim</option>
                  <option value="meghalaya">Meghalaya</option>
                  <option value="darjeeling">Darjeeling</option>
                  <option value="andaman">Andaman</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Date *
                </label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Travelers *
                </label>
                <select
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                >
                  <option value="">Select travelers</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5+">5+ People</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              >
                <option value="">Select budget range</option>
                <option value="under-20k">Under ₹20,000</option>
                <option value="20k-50k">₹20,000 - ₹50,000</option>
                <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                <option value="above-1l">Above ₹1,00,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Requirements
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                placeholder="Tell us about your travel preferences, special requirements, or any questions you have..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-secondary hover:bg-secondary/90 text-white py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Plane className="mr-2 h-5 w-5" />
                    Send Inquiry
                  </div>
                )}
              </Button>
              
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-white py-3 px-6 rounded-lg font-semibold transition-all"
              >
                Cancel
              </Button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Need immediate assistance?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Phone className="w-6 h-6 text-secondary mb-2" />
                <p className="text-sm text-gray-600">Call us</p>
                <p className="font-semibold text-secondary">+91 970393335</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-6 h-6 text-secondary mb-2" />
                <p className="text-sm text-gray-600">Email us</p>
                <p className="font-semibold text-secondary">info@jjtia.com</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-6 h-6 text-secondary mb-2" />
                <p className="text-sm text-gray-600">Visit us</p>
                <p className="font-semibold text-secondary">Guwahati, Assam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryFormPopup;
