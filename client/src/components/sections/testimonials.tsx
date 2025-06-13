import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function TestimonialsSection() {
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

  return (
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
  );
}
