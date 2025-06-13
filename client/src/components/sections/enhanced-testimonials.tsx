import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  serviceType: string;
  location: string;
}

export function EnhancedTestimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Michael Chen",
      title: "CEO",
      company: "TechStart Inc.",
      content: "Accord Manpower transformed our remote operations. Their virtual assistants are professional, efficient, and perfectly aligned with our company culture. The quality of talent is exceptional.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      serviceType: "Virtual Staffing",
      location: "San Francisco, USA"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Operations Director",
      company: "RetailMax",
      content: "The temporary staffing solution saved our peak season. Quick deployment, skilled professionals, and seamless integration with our existing team. Highly recommended!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c8bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      serviceType: "Temporary Staffing",
      location: "London, UK"
    },
    {
      id: 3,
      name: "David Rodriguez",
      title: "Founder",
      company: "InnovateLab",
      content: "Their direct hire service found us the perfect CTO. The screening process was thorough, and the cultural fit was spot-on. Excellent service from start to finish.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      serviceType: "Direct Hire",
      location: "Toronto, Canada"
    },
    {
      id: 4,
      name: "Priya Sharma",
      title: "HR Manager",
      company: "Global Solutions",
      content: "Working with Accord Manpower has been a game-changer for our scaling needs. Their understanding of our requirements and quick turnaround is impressive.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      serviceType: "Virtual Staffing",
      location: "Mumbai, India"
    },
    {
      id: 5,
      name: "James Wilson",
      title: "COO",
      company: "Manufacturing Plus",
      content: "The temporary staffing during our expansion phase was crucial. They provided skilled workers who hit the ground running. Outstanding support throughout.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      serviceType: "Temporary Staffing",
      location: "Manchester, UK"
    },
    {
      id: 6,
      name: "Maria Garcia",
      title: "Startup Founder",
      company: "EcoTech Solutions",
      content: "From initial consultation to final placement, the experience was seamless. They found us a technical lead who's been instrumental in our product development.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      serviceType: "Direct Hire",
      location: "Barcelona, Spain"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4">
            Client Success Stories
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            What Our <span className="text-red-600">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from businesses that have transformed their operations with our comprehensive staffing solutions.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-red-600 opacity-20" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Service Type Badge */}
                <Badge className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full mb-4">
                  {testimonial.serviceType}
                </Badge>
                
                {/* Testimonial Content */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed font-medium">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Client Info */}
                <div className="flex items-center">
                  <Avatar className="w-14 h-14 mr-4">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-red-100 text-red-600 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.title}</div>
                    <div className="text-sm font-medium text-red-600">{testimonial.company}</div>
                    <div className="text-xs text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-600 to-black rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
            <p className="text-gray-200 mb-6 text-lg">
              Let us help you find the perfect talent for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300">
                Get Started Today
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-300">
                View More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}