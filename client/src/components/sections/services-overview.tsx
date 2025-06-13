import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Laptop, 
  Clock, 
  Handshake, 
  Check, 
  ArrowRight
} from "lucide-react";

export function ServicesOverview() {
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

  return (
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
  );
}
