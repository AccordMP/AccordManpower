import { Button } from "@/components/ui/button";
import { Calendar, Phone, Shield, Clock, Globe, Award } from "lucide-react";

export function CTASection() {
  return (
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
  );
}
