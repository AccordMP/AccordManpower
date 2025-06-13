import { InquiryForm } from "@/components/forms/inquiry-form";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export function HeroSection() {
  return (
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
  );
}
