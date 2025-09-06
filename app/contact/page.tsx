'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, Globe } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    packageType: "",
    packageName: "",
    packageDuration: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      packageType: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create WhatsApp message with form data
    const whatsappMessage = `Hello! I'm interested in booking a trip with JJ & TIA Tours.

*Contact Information:*
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone || 'Not provided'}

*Package Details:*
• Package Type: ${formData.packageType || 'Not specified'}
• Package Name: ${formData.packageName || 'Not specified'}
• Package Duration: ${formData.packageDuration || 'Not specified'}
• Subject: ${formData.subject}

*Message:*
${formData.message}

Please get back to me with more information about available packages and pricing. Thank you!`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/919970393335?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      packageType: "",
      packageName: "",
      packageDuration: ""
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address Location",
      details: ["Nyati Estate, Mohammadwadi", "Pune - 411060"],
      description: "Located in the heart of Pune"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+91 9970393335", "+91 9104862909"],
      description: "Available 24/7 for emergency support"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["shneiur.joseph@jjtia.com"],
      description: "We respond within 24 hours"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM"],
      description: "Sunday: Closed"
    }
  ];

  const teamMembers = [
    {
      name: "Shneiur Joseph",
      role: "General Manager",
      email: "shneiur.joseph@jjtia.com",
      phone: "+91 9970393335"
    },
    {
      name: "Customer Support",
      role: "Tour Operations",
      email: "shneiur.joseph@jjtia.com",
      phone: "+91 9104862909"
    },
    {
      name: "JJ & TIA Tours",
      role: "Customer Relations",
      email: "shneiur.joseph@jjtia.com",
      phone: "+91 9970393335"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-32 md:py-40 lg:py-48 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('/360_F_573305992_F4MJgvIVzPZbMywNb3zcBNTw8jkjNbKo.webp')`
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-10">
              Contact Us
            </h1>
            <p className="text-3xl md:text-4xl lg:text-5xl mb-12 opacity-90">
              Get in touch with us for any questions, custom packages, or travel assistance
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-6 w-6" />
                <span className="text-lg">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6" />
                <span className="text-lg">Expert Team</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-6 w-6" />
                <span className="text-lg">Global Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send us a Message via WhatsApp
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91-XXXXXXXXXX"
                          />
                        </div>
                        <div>
                          <label htmlFor="packageType" className="block text-sm font-medium text-gray-700 mb-2">
                            Package Type
                          </label>
                          <Select value={formData.packageType} onValueChange={handleSelectChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select package type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="domestic">Domestic Packages</SelectItem>
                              <SelectItem value="international">International Packages</SelectItem>
                              <SelectItem value="custom">Custom Package</SelectItem>
                              <SelectItem value="general">General Inquiry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="packageName" className="block text-sm font-medium text-gray-700 mb-2">
                            Package Name
                          </label>
                          <Input
                            id="packageName"
                            name="packageName"
                            type="text"
                            value={formData.packageName}
                            onChange={handleInputChange}
                            placeholder="e.g., Nepal Adventure Tour"
                          />
                        </div>
                        <div>
                          <label htmlFor="packageDuration" className="block text-sm font-medium text-gray-700 mb-2">
                            Package Duration
                          </label>
                          <Input
                            id="packageDuration"
                            name="packageDuration"
                            type="text"
                            value={formData.packageDuration}
                            onChange={handleInputChange}
                            placeholder="e.g., 5 Days / 4 Nights"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What's this about?"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your travel plans, questions, or any specific requirements..."
                          rows={4}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Opening WhatsApp...
                          </>
                        ) : (
                          <>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Send via WhatsApp
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Map and Team Info */}
              <div className="space-y-8">
                {/* Google Maps */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Find Us
                  </h2>
                  <Card>
                    <CardContent className="p-0">
                      <div className="aspect-video">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.123456789!2d73.9214695!3d18.4654402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ea3d136a1fbf%3A0x62d0ef2a991eb2de!2sNYATI%20ESTATE%2C%20Mohammed%20Wadi%2C%20Pune%2C%20Autadwadi%20Handewadi%2C%20Maharashtra%20411060!5e0!3m2!1sen!2sin!4v1699123456789!5m2!1sen!2sin"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="JJ & TIA Tours Location - Nyati Estate, Mohammadwadi, Pune"
                        ></iframe>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Nyati Estate, Mohammadwadi, Pune - 411060
                    </p>
                    <a 
                      href="https://www.google.com/maps/place/NYATI+ESTATE,+Mohammed+Wadi,+Pune,+Autadwadi+Handewadi,+Maharashtra+411060/@18.4652485,73.9216976,18z/data=!3m1!4b1!4m6!3m5!1s0x3bc2ea3d136a1fbf:0x62d0ef2a991eb2de!8m2!3d18.4654402!4d73.9214695!16s%2Fg%2F11bw3x9vj6?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm font-medium mt-2 inline-block"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Our Team
                  </h2>
                  <div className="space-y-4">
                    {teamMembers.map((member, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <Users className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{member.name}</h3>
                              <p className="text-sm text-gray-600">{member.role}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <a href={`mailto:${member.email}`} className="text-xs text-primary hover:underline">
                                  {member.email}
                                </a>
                                <a href={`tel:${member.phone}`} className="text-xs text-primary hover:underline">
                                  {member.phone}
                                </a>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're here to help you plan your perfect trip. Reach out to us through any of these channels.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <info.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1 mb-3">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 font-medium">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      {info.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Quick answers to common questions about our services
              </p>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How far in advance should I book my trip?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We recommend booking at least 2-3 months in advance for domestic packages and 3-6 months for international trips to ensure availability and better prices.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you provide visa assistance?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, we provide complete visa assistance for all our international packages. Our team will guide you through the entire process and help with documentation.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is your cancellation policy?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our cancellation policy varies by package type. Generally, cancellations made 30+ days in advance receive a full refund, while closer cancellations may have partial refunds.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer custom packages?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Absolutely! We specialize in creating custom packages tailored to your specific needs, interests, and budget. Contact us to discuss your requirements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Planning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create the perfect travel experience for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919970393335">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Us Now
                </Button>
              </a>
              <a href="mailto:shneiur.joseph@jjtia.com">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send Email
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
