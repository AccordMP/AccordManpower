import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Laptop, Clock, Handshake, ChevronDown } from "lucide-react";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    {
      name: "Virtual Staffing Solutions",
      href: "/services#virtual-staffing",
      description: "Access global talent remotely with comprehensive virtual staffing services",
      icon: Laptop,
    },
    {
      name: "Temporary Staffing",
      href: "/services#temporary-staffing",
      description: "Flexible staffing solutions for seasonal demands and project-based work",
      icon: Clock,
    },
    {
      name: "Direct Hire Services",
      href: "/services#direct-hire",
      description: "Find top-tier professionals for permanent positions",
      icon: Handshake,
    },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/attached_assets/Accordmp logo1_1749835050687.png" 
              alt="Accord Manpower" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-bold text-red-600">Accord Manpower</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.href}>
                      <NavigationMenuLink
                        className={`text-gray-700 hover:text-primary transition-colors duration-300 px-3 py-2 rounded-md ${
                          location === item.href ? "text-primary font-medium" : ""
                        }`}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-primary transition-colors duration-300">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-96 p-4">
                      <div className="grid gap-3">
                        {services.map((service) => (
                          <Link key={service.name} href={service.href}>
                            <NavigationMenuLink className="block p-3 rounded-md hover:bg-gray-50 transition-colors">
                              <div className="flex items-start space-x-3">
                                <service.icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-gray-900 mb-1">
                                    {service.name}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {service.description}
                                  </div>
                                </div>
                              </div>
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button className="bg-red-600 text-white hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Quote
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                  
                  <div className="border-t pt-4">
                    <h3 className="font-medium text-gray-900 mb-3">Services</h3>
                    {services.map((service) => (
                      <Link key={service.name} href={service.href}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left mb-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <service.icon className="w-4 h-4 mr-2" />
                          {service.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
