import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-white to-light-bg py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-poppins font-semibold text-4xl lg:text-5xl text-navy-deep leading-tight">
                Your Prescription.<br />
                Your Voice.<br />
                <span className="text-teal-primary">Your Care.</span>
              </h1>
              <p className="text-xl text-dark-gray font-inter">
                Get personalized Allopathic & Ayurvedic plans—instantly.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/chat">
                <Button 
                  size="lg"
                  className="bg-teal-primary text-white hover:bg-teal-secondary hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg font-poppins text-lg px-8 py-4"
                >
                  Get Started Now
                </Button>
              </Link>
              <Button 
                variant="outline"
                size="lg"
                className="text-teal-primary border-2 border-teal-primary hover:bg-teal-primary hover:text-white transition-all duration-300 font-poppins text-lg px-8 py-4"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                How It Works
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-dark-gray">
              <div className="flex items-center space-x-2">
                <Users className="text-teal-primary h-4 w-4" />
                <span>10,000+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserCheck className="text-teal-primary h-4 w-4" />
                <span>100+ Doctors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="text-teal-primary h-4 w-4" />
                <span>99% Satisfaction</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative animate-float">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern medical interface on tablet" 
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
