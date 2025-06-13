import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SEOHead } from "@/components/ui/seo-head";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Laptop, 
  Clock, 
  Handshake, 
  Check, 
  Star,
  Calendar,
  Phone,
  Shield,
  Globe,
  Award,
  ArrowRight,
  Play
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const services = [
    {
      icon: Laptop,
      title: "Virtual Staffing Solutions",
      description: "Access global talent remotely with our comprehensive virtual staffing services. From administrative support to technical assistance.",
      features: ["Administrative Support", "Creative Services", "Technical Assistance", "Project Management"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Clock,
      title: "Temporary Staffing",
      description: "Flexible staffing solutions for seasonal demands, project-based work, and unexpected workforce needs with qualified professionals.",
      features: ["Seasonal Coverage", "Project-Based Teams", "Quick Deployment", "Payroll Management"],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Handshake,
      title: "Direct Hire Services",
      description: "Find top-tier professionals for permanent positions with our comprehensive recruitment and screening process.",
      features: ["Executive Search", "Cultural Fit Assessment", "Background Verification", "Negotiation Support"],
      color: "from-green-500 to-green-600",
    },
  ];

  const testimonials = [
    {
      name: "Michael Chen",
      title: "CEO, TechStart Inc.",
      content: "Accord Manpower transformed our remote operations. Their virtual assistants are professional, efficient, and perfectly aligned with our company culture.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      name: "Sarah Johnson",
      title: "Operations Director, RetailMax",
      content: "The temporary staffing solution saved our peak season. Quick deployment, skilled professionals, and seamless integration with our existing team.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c8bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      name: "David Rodriguez",
      title: "Founder, InnovateLab",
      content: "Their direct hire service found us the perfect CTO. The screening process was thorough, and the cultural fit was spot-on. Excellent service!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
  ];

  const blogPosts = [
    {
      title: "The Future of Remote Work: Trends to Watch in 2025",
      excerpt: "Explore the latest remote work trends and how they're shaping the future of global employment...",
      author: "Emma Wilson",
      date: "December 15, 2024",
      category: "Staffing Trends",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      slug: "future-of-remote-work-2025",
    },
    {
      title: "5 Best Practices for Hiring Virtual Teams",
      excerpt: "Learn proven strategies for building effective virtual teams that drive business success...",
      author: "Alex Thompson",
      date: "December 12, 2024",
      category: "HR Management",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      slug: "hiring-virtual-teams-best-practices",
    },
    {
      title: "Global Workforce Management in 2025",
      excerpt: "Navigate the complexities of managing international teams with expert insights and strategies...",
      author: "Maria Garcia",
      date: "December 10, 2024",
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      slug: "global-workforce-management-2025",
    },
  ];

  return (
    <>
      <SEOHead
        title="Accord Manpower - Global Staffing Solutions | Virtual, Temporary & Direct Hire Services"
        description="Accord Manpower provides comprehensive staffing solutions including virtual staffing, temporary staffing, and direct hire services. Partner with us for reliable workforce management across the globe."
        canonicalUrl={`${window.location.origin}/`}
        keywords="staffing solutions, virtual staffing, temporary staffing, direct hire, manpower outsourcing, global talent, workforce management"
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-20 hero-gradient text-white overflow-hidden">
          <div className="container mx-auto px-4 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-left">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  Scale Your Business with
                  <span className="text-yellow-300"> Global Talent</span>
                </h1>
                <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                  Comprehensive manpower outsourcing solutions tailored for modern businesses. 
                  From virtual staffing to direct hire, we connect you with the right talent.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Button>
                  <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300">
                    Learn More
                  </Button>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex items-center space-x-8 text-blue-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-sm">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">10k+</div>
                    <div className="text-sm">Placements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-sm">Countries</div>
                  </div>
                </div>
              </div>
              
              {/* Inquiry Form */}
              <div className="animate-fade-in-right">
                <InquiryForm variant="hero" />
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-300/20 rounded-full animate-float" style={{animationDelay: '-2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-float" style={{animationDelay: '-4s'}}></div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">Our Staffing Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive manpower outsourcing solutions tailored to meet the dynamic needs of businesses across the globe.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="text-white text-2xl w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-neutral-dark">{service.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <Check className="text-accent mr-3 w-4 h-4" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 group-hover:shadow-lg">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-neutral-dark to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-in-up">
                <div className="text-4xl lg:text-6xl font-bold mb-2 gradient-text">500+</div>
                <div className="text-lg text-gray-300">Happy Clients</div>
                <div className="text-sm text-gray-400 mt-1">Across 50+ Countries</div>
              </div>
              <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="text-4xl lg:text-6xl font-bold mb-2 gradient-text">10,000+</div>
                <div className="text-lg text-gray-300">Successful Placements</div>
                <div className="text-sm text-gray-400 mt-1">In the Last 5 Years</div>
              </div>
              <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl lg:text-6xl font-bold mb-2 gradient-text">98%</div>
                <div className="text-lg text-gray-300">Client Satisfaction</div>
                <div className="text-sm text-gray-400 mt-1">Based on Feedback</div>
              </div>
              <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="text-4xl lg:text-6xl font-bold mb-2 gradient-text">24/7</div>
                <div className="text-lg text-gray-300">Support Available</div>
                <div className="text-sm text-gray-400 mt-1">Global Time Zones</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-br from-neutral-light to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">What Our Clients Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from businesses that have transformed their operations with our staffing solutions.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-6">
                      <div className="flex text-yellow-400 text-lg">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-gray-700 mb-6 leading-relaxed font-serif text-lg">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="font-semibold text-neutral-dark">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.title}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">Latest Insights</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay updated with the latest trends in staffing, remote work, and workforce management.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-dark group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.author}</span>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" className="text-primary hover:text-blue-700 font-medium text-sm p-0">
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/blog">
                <Button className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  View All Articles <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in-up">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">Ready to Scale Your Business?</h2>
              <p className="text-xl lg:text-2xl mb-12 text-blue-100 leading-relaxed">
                Join 500+ companies that trust Accord Manpower for their staffing needs. 
                Let's discuss how we can help you achieve your business goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
                <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +1-800-ACCORD
                </Button>
              </div>
              <div className="mt-12 flex justify-center items-center space-x-8 text-blue-200">
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm">Secure & Compliant</div>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm">24/7 Support</div>
                </div>
                <div className="text-center">
                  <Globe className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm">Global Reach</div>
                </div>
                <div className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm">Quality Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
