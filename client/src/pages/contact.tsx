import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SEOHead } from "@/components/ui/seo-head";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Calendar,
  Globe,
  HeadphonesIcon
} from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: ["3355 153AVE NW", "EDMONTON, AB", "T5Y 4E1"],
      color: "text-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 780-231-9213", "+1 780-800-7771"],
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["accordmp01@gmail.com", "info@accordmp.com"],
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM EST", "Saturday: 10:00 AM - 4:00 PM EST", "24/7 Emergency Support"],
      color: "text-orange-600",
    },
  ];

  const globalOffices = [
    {
      city: "New York",
      address: "3355 153AVE NW, EDMONTON, AB T5Y 4E1",
      phone: "+1 780-231-9213",
      email: "info@accordmp.com",
    },
    {
      city: "London",
      address: "456 Corporate Plaza, London EC1A 1BB",
      phone: "+44 20 7123 4567",
      email: "london@accordmanpower.com",
    },
    {
      city: "Singapore",
      address: "789 Business Hub, Singapore 018956",
      phone: "+65 6123 4567",
      email: "singapore@accordmanpower.com",
    },
    {
      city: "Sydney",
      address: "321 Enterprise Tower, Sydney NSW 2000",
      phone: "+61 2 1234 5678",
      email: "sydney@accordmanpower.com",
    },
  ];

  const services = [
    {
      title: "Virtual Staffing Consultation",
      description: "Get expert advice on building remote teams and virtual workforce strategies.",
      icon: Globe,
    },
    {
      title: "Temporary Staffing Solutions",
      description: "Quick deployment of qualified professionals for short-term projects and seasonal needs.",
      icon: Clock,
    },
    {
      title: "Direct Hire Services",
      description: "Comprehensive recruitment services for permanent positions and executive search.",
      icon: HeadphonesIcon,
    },
  ];

  return (
    <>
      <SEOHead
        title="Contact Accord Manpower - Get in Touch for Staffing Solutions"
        description="Contact Accord Manpower for comprehensive staffing solutions. Get in touch with our global team for virtual staffing, temporary staffing, and direct hire services."
        canonicalUrl={`${window.location.origin}/contact`}
        keywords="contact accord manpower, staffing consultation, get quote, staffing services contact, global offices"
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Get in Touch
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                Ready to transform your workforce? Let's discuss how our staffing solutions 
                can help your business grow and succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6 gradient-text">Send Us a Message</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Fill out the form below and our team will get back to you within 24 hours. 
                  We're here to help you find the perfect staffing solution for your business needs.
                </p>
                <InquiryForm variant="contact" />
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6 gradient-text">Contact Information</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Choose the most convenient way to reach us. Our global team is ready to assist 
                  you with any questions or staffing requirements you may have.
                </p>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className="flex items-start space-x-4">
                          <info.icon className={`w-6 h-6 ${info.color} mt-1 flex-shrink-0`} />
                          <div>
                            <h3 className="font-semibold text-neutral-dark mb-2">{info.title}</h3>
                            <div className="space-y-1">
                              {info.details.map((detail, detailIndex) => (
                                <p key={detailIndex} className="text-gray-600 text-sm">
                                  {detail}
                                </p>
                              ))}
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
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-gradient-to-br from-neutral-light to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 gradient-text">How We Can Help</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive staffing solutions are designed to meet your unique business needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3 text-neutral-dark">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Global Offices */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 gradient-text">Our Global Presence</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                With offices around the world, we're always close to you and ready to provide 
                local support with global expertise.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {globalOffices.map((office, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold mb-3 text-neutral-dark">{office.city}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span>{office.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6 gradient-text">Frequently Asked Questions</h2>
                <p className="text-xl text-gray-600">
                  Quick answers to common questions about our staffing services.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-3 text-neutral-dark">How quickly can you provide staff?</h3>
                  <p className="text-gray-600 mb-6">
                    For virtual and temporary staffing, we can typically deploy qualified professionals 
                    within 24-48 hours. Direct hire placements usually take 2-4 weeks depending on requirements.
                  </p>
                  
                  <h3 className="text-lg font-bold mb-3 text-neutral-dark">What industries do you serve?</h3>
                  <p className="text-gray-600 mb-6">
                    We serve a wide range of industries including technology, healthcare, finance, 
                    manufacturing, retail, and professional services.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-3 text-neutral-dark">Do you provide international staffing?</h3>
                  <p className="text-gray-600 mb-6">
                    Yes, we have a global network spanning 50+ countries and can provide both 
                    local and international staffing solutions to meet your needs.
                  </p>
                  
                  <h3 className="text-lg font-bold mb-3 text-neutral-dark">What are your pricing models?</h3>
                  <p className="text-gray-600 mb-6">
                    Our pricing varies by service type and requirements. We offer competitive rates 
                    and flexible pricing models including hourly, project-based, and percentage-based fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Don't wait – your perfect staffing solution is just a conversation away. 
                Contact us today and let's discuss how we can help your business succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start a Conversation
                </Button>
                <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Meeting
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
