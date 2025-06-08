import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-primary rounded-lg flex items-center justify-center">
              <Heart className="text-white h-5 w-5" />
            </div>
            <span className="font-poppins font-semibold text-xl text-navy-deep">Health.AI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-dark-gray hover:text-teal-primary transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-dark-gray hover:text-teal-primary transition-colors duration-200"
            >
              How It Works
            </a>
            <Link 
              href="/dashboard"
              className={`transition-colors duration-200 ${
                isActive('/dashboard') ? 'text-teal-primary' : 'text-dark-gray hover:text-teal-primary'
              }`}
            >
              Dashboard
            </Link>
            <Link href="/chat">
              <Button className="bg-teal-primary text-white hover:bg-teal-secondary hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Get Started
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-dark-gray hover:text-teal-primary"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-dark-gray hover:text-teal-primary transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="text-dark-gray hover:text-teal-primary transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <Link 
                href="/dashboard"
                className="text-dark-gray hover:text-teal-primary transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link href="/chat" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-teal-primary text-white hover:bg-teal-secondary w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
