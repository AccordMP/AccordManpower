import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SEOHead } from "@/components/ui/seo-head";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Award, 
  Globe,
  TrendingUp,
  Shield,
  Heart,
  Zap,
  CheckCircle,
  Calendar
} from "lucide-react";
import { Link } from "wouter";

export default function About() {
  const values = [
    {
      icon: Shield,
      title: "Reliability",
      description: "We deliver consistent, dependable service that our clients can count on, building long-term partnerships based on trust."
    },
    {
      icon: TrendingUp,
      title: "Excellence",
      description: "We strive for excellence in everything we do, continuously improving our processes and exceeding client expectations."
    },
    {
      icon: Heart,
      title: "Client-Centric",
      description: "Our clients' success is our success. We customize our solutions to meet unique business needs and challenges."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We embrace innovative technology and forward-thinking approaches to stay ahead in the evolving staffing industry."
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Clients", sublabel: "Across 50+ Countries" },
    { number: "10,000+", label: "Successful Placements", sublabel: "In the Last 5 Years" },
    { number: "98%", label: "Client Satisfaction", sublabel: "Based on Feedback" },
    { number: "15+", label: "Years of Experience", sublabel: "In Staffing Industry" }
  ];

  const milestones = [
    {
      year: "2009",
      title: "Company Founded",
      description: "Accord Manpower was established with a vision to revolutionize staffing solutions."
    },
    {
      year: "2012",
      title: "International Expansion",
      description: "Expanded operations to serve clients across multiple countries and time zones."
    },
    {
      year: "2016",
      title: "Virtual Staffing Pioneer",
      description: "Became early adopters of remote work, helping businesses transition to virtual teams."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Implemented advanced AI-driven matching and streamlined digital processes."
    },
    {
      year: "2024",
      title: "Market Leader",
      description: "Recognized as a leading provider of comprehensive staffing solutions globally."
    }
  ];

  return (
    <>
      <SEOHead
        title="About Accord Manpower - Leading Global Staffing Solutions Provider"
        description="Learn about Accord Manpower's mission to provide comprehensive staffing solutions. With 15+ years of experience, we've helped 500+ companies find the right talent globally."
        canonicalUrl={`${window.location.origin}/about`}
        keywords="about accord manpower, staffing company, global recruitment, workforce solutions, company history, staffing expertise"
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                About Accord Manpower
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                Your trusted partner for comprehensive manpower outsourcing solutions, 
                connecting businesses with the right talent worldwide since 2009.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 gradient-text">Our Story</h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    At Accord Manpower, we specialize in providing comprehensive manpower outsourcing solutions 
                    tailored to meet the dynamic needs of businesses across the globe. With a relentless focus on 
                    efficiency, reliability, and client satisfaction, we have emerged as a trusted partner for 
                    companies seeking to optimize their workforce management processes.
                  </p>
                  <p>
                    With years of experience in the industry, we understand the critical importance of talent in 
                    driving business success. Our team of experts is dedicated to delivering top-notch staffing 
                    solutions that seamlessly integrate with our clients' operations, enabling them to focus on 
                    their core business objectives while we take care of their manpower needs.
                  </p>
                  <p>
                    What sets us apart is our commitment to excellence and our ability to adapt to the ever-changing 
                    demands of the global marketplace. Through a combination of innovative technology, industry 
                    expertise, and personalized service, we ensure that our clients have access to the best talent 
                    when and where they need it most.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Accord Manpower team collaboration"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-sm text-gray-600">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gradient-to-br from-neutral-light to-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="p-8 h-full">
                <CardContent className="p-0">
                  <Target className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-neutral-dark">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To empower businesses worldwide by providing exceptional staffing solutions that drive growth, 
                    efficiency, and success. We are committed to connecting the right talent with the right 
                    opportunities, creating value for both our clients and candidates while fostering long-term 
                    partnerships built on trust and excellence.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="p-8 h-full">
                <CardContent className="p-0">
                  <Globe className="w-12 h-12 text-accent mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-neutral-dark">Our Vision</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To be the global leader in innovative staffing solutions, transforming how businesses access 
                    and manage talent. We envision a future where geographical boundaries don't limit access to 
                    exceptional talent, enabling organizations to build diverse, skilled teams that drive 
                    unprecedented growth and innovation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 gradient-text">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These fundamental principles guide everything we do and shape our relationships with clients, 
                candidates, and team members.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3 text-neutral-dark">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20 bg-gradient-to-r from-neutral-dark to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Impact in Numbers</h2>
              <p className="text-xl text-gray-300">
                These numbers represent the trust our clients place in us and the success we've achieved together.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="text-4xl lg:text-6xl font-bold mb-2 gradient-text">{stat.number}</div>
                  <div className="text-lg text-gray-300 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 gradient-text">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From a small startup to a global leader, here are the key milestones that have shaped our company.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent hidden lg:block"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                      <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-0">
                          <div className="flex items-center mb-3">
                            <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                              {milestone.year}
                            </div>
                            <CheckCircle className="w-5 h-5 text-accent" />
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-neutral-dark">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="hidden lg:flex w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
                    
                    <div className="lg:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 gradient-text">Why Partner with Accord Manpower?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We bring unique advantages that set us apart in the competitive staffing industry.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardContent className="p-0">
                  <Award className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-neutral-dark">Industry Expertise</h3>
                  <p className="text-gray-600 mb-4">
                    15+ years of experience across various industries, giving us deep insights into 
                    different business needs and challenges.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      Technology & IT
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      Healthcare & Medical
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      Finance & Banking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      Manufacturing & Logistics
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="p-0">
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-neutral-dark">Global Talent Network</h3>
                  <p className="text-gray-600 mb-4">
                    Access to a vast network of pre-screened professionals across 50+ countries, 
                    ready to contribute to your success.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      Rigorous screening process
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      Cultural compatibility assessment
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      Continuous skill development
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      24/7 global support
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="p-0">
                  <Zap className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-neutral-dark">Technology-Driven Solutions</h3>
                  <p className="text-gray-600 mb-4">
                    Cutting-edge technology platforms that streamline the hiring process and 
                    provide real-time insights and analytics.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      AI-powered candidate matching
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      Real-time project tracking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      Performance analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-accent mr-2" />
                      Automated reporting
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Ready to Experience the Accord Difference?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Join hundreds of companies that trust us with their most important asset – their people.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Start Your Journey
                  </Button>
                </Link>
                <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Call
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
