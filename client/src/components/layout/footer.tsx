import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock
} from "lucide-react";

export function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription");
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/attached_assets/Accordmp logo1_1749835050687.png" 
                alt="Accord Manpower" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold text-red-600">Accord Manpower</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for comprehensive manpower outsourcing solutions. 
              We connect businesses with the right talent worldwide.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-primary">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-primary">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-primary">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-primary">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services#virtual-staffing">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                    Virtual Staffing Solutions
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services#temporary-staffing">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                    Temporary Staffing
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services#direct-hire">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                    Direct Hire Services
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                    Project Management
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                    HR Consulting
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                    Blog & Insights
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/resources/case-studies">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                    Case Studies
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/resources/whitepapers">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                    Whitepapers
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/resources/reports">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                    Industry Reports
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                    FAQ
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Business Center</p>
                  <p className="text-gray-300">New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-gray-300">+1-800-ACCORD</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-gray-300">info@accordmanpower.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-gray-300">24/7 Support Available</p>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h4 className="font-medium mb-3">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button type="submit" className="w-full bg-primary hover:bg-blue-700">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              © 2024 Accord Manpower. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy">
                <span className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                  Terms of Service
                </span>
              </Link>
              <Link href="/cookies">
                <span className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                  Cookie Policy
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
