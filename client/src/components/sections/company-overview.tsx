import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Award, TrendingUp, Shield, Clock } from "lucide-react";

export function CompanyOverview() {
  const achievements = [
    { icon: Users, value: "500+", label: "Happy Clients", color: "bg-red-50 text-red-600" },
    { icon: Globe, value: "50+", label: "Countries Served", color: "bg-gray-50 text-gray-600" },
    { icon: Award, value: "10+", label: "Years Experience", color: "bg-red-50 text-red-600" },
    { icon: TrendingUp, value: "95%", label: "Success Rate", color: "bg-gray-50 text-gray-600" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Reliability",
      description: "Consistent delivery of high-quality staffing solutions with a proven track record.",
    },
    {
      icon: Clock,
      title: "Efficiency",
      description: "Quick turnaround times without compromising on candidate quality and fit.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access to talent pools across 50+ countries for diverse staffing needs.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Company Overview Header */}
        <div className="text-center mb-16">
          <Badge className="bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4">
            About Accord Manpower
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Your Trusted Partner in
            <span className="text-red-600"> Global Staffing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Accord Manpower, we specialize in providing comprehensive manpower outsourcing solutions 
            that help businesses scale efficiently while maintaining quality and reducing costs.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-full ${achievement.color} flex items-center justify-center mx-auto mb-4`}>
                  <achievement.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.value}</div>
                <div className="text-gray-600 font-medium">{achievement.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Values */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose Accord Manpower?
            </h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-600 to-black rounded-2xl p-8 text-white">
            <h4 className="text-2xl font-bold mb-4">Ready to Scale Your Team?</h4>
            <p className="text-gray-200 mb-6 leading-relaxed">
              Connect with our experts to discuss your staffing needs and discover how we can help 
              you build a world-class team that drives your business forward.
            </p>
            <div className="space-y-4">
              <Button className="w-full bg-white text-red-600 hover:bg-gray-100 font-semibold py-3">
                Schedule Consultation
              </Button>
              <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-red-600 font-semibold py-3">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}