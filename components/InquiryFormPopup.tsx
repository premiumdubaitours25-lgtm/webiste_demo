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
    
    try {
      // Create WhatsApp message with form data
      const whatsappMessage = `🏔️ *New Travel Inquiry - JJ & TIA Tours*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
✈️ *Destination:* ${formData.destination}
📅 *Travel Date:* ${formData.travelDate}
👥 *Number of Travelers:* ${formData.travelers}
💰 *Budget Range:* ${formData.budget}

📝 *Additional Requirements:*
${formData.message}

---
*This inquiry was submitted through the website contact form.*`;

      // WhatsApp number (with country code for India)
      const phoneNumber = "919970393335";
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // Show success message
      alert("Thank you for your inquiry! WhatsApp is opening with your message. Please send it to complete your inquiry.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        travelDate: "",
        travelers: "",
        budget: "",
        message: ""
      });
      
      onClose();
    } catch (error) {
      console.error("Error sending to WhatsApp:", error);
      alert("There was an error opening WhatsApp. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary to-primary text-white p-4 sm:p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-200 transition-colors p-1"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="text-center pr-8 sm:pr-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Plan Your Dream Trip</h2>
            <p className="text-sm sm:text-base md:text-lg opacity-90">Get personalized travel recommendations from our experts</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
            <div className="grid md:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full max-w-xs sm:max-w-none px-2 sm:px-4 py-1.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-xs sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full max-w-xs sm:max-w-none px-2 sm:px-4 py-1.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-xs sm:text-base"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full max-w-xs sm:max-w-none px-2 sm:px-4 py-1.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-xs sm:text-base"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Destination *
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                  className="w-full max-w-xs sm:max-w-none px-2 sm:px-4 py-1.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-xs sm:text-base"
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

            <div className="grid md:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Travel Date *
                </label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleInputChange}
                  required
                  className="w-full max-w-xs sm:max-w-none px-2 sm:px-4 py-1.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-xs sm:text-base"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Number of Travelers *
                </label>
                <select
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  required
                  className="w-full max-w-xs sm:max-w-none px-2 sm:px-4 py-1.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-xs sm:text-base"
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
                className="w-full max-w-xs sm:max-w-none px-2 sm:px-4 py-1.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-xs sm:text-base"
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
                rows={3}
                className="w-full max-w-xs sm:max-w-none px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-sm sm:text-base"
                placeholder="Tell us about your travel preferences, special requirements, or any questions you have..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-secondary hover:bg-secondary/90 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all disabled:opacity-50 text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Opening WhatsApp...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Plane className="mr-2 h-5 w-5" />
                    Send via WhatsApp
                  </div>
                )}
              </Button>
              
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all text-sm sm:text-base"
              >
                Cancel
              </Button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 text-center">Need immediate assistance?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
              <div className="flex flex-col items-center">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-secondary mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm text-gray-600">Call us</p>
                <p className="font-semibold text-secondary text-sm sm:text-base">+91 970393335</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-secondary mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm text-gray-600">Email us</p>
                <p className="font-semibold text-secondary text-sm sm:text-base">info@jjtia.com</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-secondary mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm text-gray-600">Visit us</p>
                <p className="font-semibold text-secondary text-xs sm:text-sm">Nyati Estate, Mohammadwadi,Pune - 411060</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryFormPopup;
