import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SEOHead } from "@/components/ui/seo-head";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Laptop, 
  Clock, 
  Handshake, 
  Check, 
  Users,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  ArrowRight
} from "lucide-react";

export default function Services() {
  const virtualStaffingServices = [
    {
      title: "Virtual Administrative Support",
      description: "Professional virtual assistants to handle email management, calendar scheduling, data entry, document preparation, and customer service.",
      features: ["Email Management", "Calendar Scheduling", "Data Entry", "Document Preparation", "Customer Service"]
    },
    {
      title: "Virtual Creative Services",
      description: "Creative professionals for graphic design, content creation, social media management, and marketing materials.",
      features: ["Graphic Design", "Content Creation", "Social Media Management", "Marketing Materials", "Brand Development"]
    },
    {
      title: "Virtual Technical Assistance",
      description: "Skilled technical professionals for website maintenance, IT support, software development, and digital infrastructure management.",
      features: ["Website Maintenance", "IT Support", "Software Development", "Technical Troubleshooting", "Infrastructure Management"]
    },
    {
      title: "Virtual Personal Assistance",
      description: "Personal assistants to manage personal calendars, coordinate meetings, handle correspondence, and arrange travel.",
      features: ["Personal Calendar Management", "Meeting Coordination", "Correspondence Handling", "Travel Arrangements", "Personal Task Management"]
    },
    {
      title: "Virtual Sales & Marketing Support",
      description: "Dedicated professionals for lead generation, customer outreach, social media marketing, and campaign management.",
      features: ["Lead Generation", "Customer Outreach", "Social Media Marketing", "Campaign Management", "CRM Management"]
    },
    {
      title: "Virtual Project Management",
      description: "Experienced project managers to oversee project planning, coordination, execution, and ensure deadlines are met.",
      features: ["Project Planning", "Team Coordination", "Deadline Management", "Progress Tracking", "Risk Assessment"]
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Global Talent Access",
      description: "Access skilled professionals from around the world without geographical constraints."
    },
    {
      icon: TrendingUp,
      title: "Cost Efficiency",
      description: "Reduce operational costs by up to 60% compared to traditional in-house hiring."
    },
    {
      icon: Zap,
      title: "Quick Deployment",
      description: "Get your team up and running within 48-72 hours of confirmation."
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Comprehensive screening and compliance management for all placements."
    }
  ];

  return (
    <>
      <SEOHead
        title="Staffing Solutions - Virtual, Temporary & Direct Hire Services | Accord Manpower"
        description="Comprehensive staffing solutions including virtual staffing, temporary staffing, and direct hire services. Professional workforce management tailored to your business needs."
        canonicalUrl={`${window.location.origin}/services`}
        keywords="virtual staffing, temporary staffing, direct hire, remote work, workforce management, staffing agency, global talent"
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Comprehensive Staffing Solutions
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                From virtual assistants to permanent hires, we provide the talent you need to grow your business.
              </p>
            </div>
          </div>
        </section>

        {/* Services Tabs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="virtual" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12">
                <TabsTrigger value="virtual" className="flex items-center space-x-2">
                  <Laptop className="w-4 h-4" />
                  <span>Virtual Staffing</span>
                </TabsTrigger>
                <TabsTrigger value="temporary" className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Temporary Staffing</span>
                </TabsTrigger>
                <TabsTrigger value="direct" className="flex items-center space-x-2">
                  <Handshake className="w-4 h-4" />
                  <span>Direct Hire</span>
                </TabsTrigger>
              </TabsList>

              {/* Virtual Staffing */}
              <TabsContent value="virtual" className="space-y-12">
                <div id="virtual-staffing" className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-6 gradient-text">Virtual Staffing Solutions</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Unlock the power of remote talent with our comprehensive virtual staffing services. 
                    Access top professionals worldwide without the constraints of traditional office-based hiring.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {virtualStaffingServices.map((service, index) => (
                    <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4 text-neutral-dark">{service.title}</h3>
                        <p className="text-gray-600 mb-6">{service.description}</p>
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                              <Check className="text-accent mr-2 w-4 h-4 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-neutral-dark">Why Choose Virtual Staffing?</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <benefit.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold mb-1">{benefit.title}</h4>
                              <p className="text-sm text-gray-600">{benefit.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <InquiryForm className="max-w-md" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Temporary Staffing */}
              <TabsContent value="temporary" className="space-y-12">
                <div id="temporary-staffing" className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-6 gradient-text">Temporary Staffing Solutions</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Flexible staffing solutions for seasonal demands, unexpected absences, or specific project requirements. 
                    Get qualified professionals when you need them most.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-neutral-dark">Our Temporary Staffing Process</h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                          <h4 className="font-semibold mb-2">Requirements Analysis</h4>
                          <p className="text-gray-600">We analyze your specific needs, timeline, and skill requirements.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                          <h4 className="font-semibold mb-2">Candidate Sourcing</h4>
                          <p className="text-gray-600">Access our vast network of pre-screened professionals.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                          <h4 className="font-semibold mb-2">Quick Deployment</h4>
                          <p className="text-gray-600">Deploy qualified candidates within 24-48 hours.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                        <div>
                          <h4 className="font-semibold mb-2">Ongoing Support</h4>
                          <p className="text-gray-600">Continuous support and performance monitoring throughout the assignment.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Card className="p-8">
                      <h3 className="text-xl font-bold mb-6 text-center">Key Benefits</h3>
                      <ul className="space-y-4">
                        <li className="flex items-center">
                          <Check className="text-accent mr-3 w-5 h-5" />
                          <span>Cost-effective solution for short-term needs</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="text-accent mr-3 w-5 h-5" />
                          <span>Reduced administrative burden</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="text-accent mr-3 w-5 h-5" />
                          <span>Flexible engagement models</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="text-accent mr-3 w-5 h-5" />
                          <span>Payroll and benefits management included</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="text-accent mr-3 w-5 h-5" />
                          <span>Try-before-hire options available</span>
                        </li>
                      </ul>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Direct Hire */}
              <TabsContent value="direct" className="space-y-12">
                <div id="direct-hire" className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-6 gradient-text">Direct Hire Services</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Find top-tier professionals for permanent positions with our comprehensive recruitment and screening process. 
                    Build your dream team with candidates who fit your culture and drive results.
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <Card className="p-6 text-center">
                    <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">Executive Search</h3>
                    <p className="text-gray-600">
                      Find C-level executives and senior management professionals who can lead your organization to success.
                    </p>
                  </Card>
                  <Card className="p-6 text-center">
                    <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">Thorough Screening</h3>
                    <p className="text-gray-600">
                      Comprehensive background checks, skill assessments, and cultural fit evaluations for every candidate.
                    </p>
                  </Card>
                  <Card className="p-6 text-center">
                    <Handshake className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">Negotiation Support</h3>
                    <p className="text-gray-600">
                      Expert assistance with salary negotiations, benefits packages, and contract terms.
                    </p>
                  </Card>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-neutral-dark">Our Recruitment Process</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      We follow a rigorous process to ensure you get the best candidates who not only meet your technical requirements 
                      but also align with your company culture and values.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                      <h4 className="font-semibold mb-2">Discovery</h4>
                      <p className="text-sm text-gray-600">Understanding your needs and company culture</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                      <h4 className="font-semibold mb-2">Sourcing</h4>
                      <p className="text-sm text-gray-600">Finding qualified candidates through our network</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                      <h4 className="font-semibold mb-2">Screening</h4>
                      <p className="text-sm text-gray-600">Comprehensive evaluation and background checks</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                      <h4 className="font-semibold mb-2">Placement</h4>
                      <p className="text-sm text-gray-600">Successful integration and ongoing support</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Match?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Let's discuss your staffing needs and create a customized solution that fits your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Get Started Today
                </Button>
                <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300">
                  Schedule Consultation
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
