import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import BenefitsSection from "@/components/benefits-section";
import TreatmentPlans from "@/components/treatment-plans";
import Footer from "@/components/footer";
import ChatInterface from "@/components/chat-interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, CheckCircle, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <BenefitsSection />
      
      {/* Demo Interface Section */}
      <section className="py-16 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-semibold text-3xl lg:text-4xl text-navy-deep mb-4">
              See Health.AI in Action
            </h2>
            <p className="text-xl text-dark-gray font-inter">
              Experience our intelligent consultation process
            </p>
          </div>
          
          {/* Chat Interface Demo */}
          <Card className="bg-white shadow-xl overflow-hidden max-w-5xl mx-auto">
            {/* Chat Header */}
            <CardHeader className="bg-white border-b border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-primary rounded-lg flex items-center justify-center">
                    <Bot className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="font-poppins font-medium text-navy-deep">Health.AI Assistant</CardTitle>
                    <p className="text-sm text-medium-gray">Online now</p>
                  </div>
                </div>
                
                {/* Progress breadcrumbs */}
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-teal-primary rounded-full flex items-center justify-center">
                      <CheckCircle className="text-white h-3 w-3" />
                    </div>
                    <span className="text-sm font-medium text-teal-primary">Upload</span>
                  </div>
                  <div className="w-8 h-0.5 bg-teal-primary"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-teal-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <span className="text-sm font-medium text-teal-primary">Describe</span>
                  </div>
                  <div className="w-8 h-0.5 bg-medium-gray"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-medium-gray rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <span className="text-sm font-medium text-medium-gray">Results</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            {/* Demo Chat Messages */}
            <CardContent className="grid lg:grid-cols-3 gap-0 p-0">
              {/* Chat History */}
              <div className="lg:col-span-2 bg-light-bg p-6 min-h-96">
                <div className="space-y-4 mb-6">
                  {/* AI Message */}
                  <div className="flex justify-start">
                    <div className="bg-white rounded-xl p-4 max-w-xs shadow-sm border border-gray-100">
                      <p className="text-navy-deep font-inter">Hi! I've successfully processed your prescription. Can you describe any symptoms you're experiencing?</p>
                      <span className="text-xs text-medium-gray mt-2 block">Just now</span>
                    </div>
                  </div>
                  
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-teal-primary rounded-xl p-4 max-w-xs">
                      <p className="text-white font-inter">I've been experiencing headaches and fatigue for the past week.</p>
                      <span className="text-xs text-teal-100 mt-2 block">Just now</span>
                    </div>
                  </div>
                  
                  {/* AI Typing Indicator */}
                  <div className="flex justify-start">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-medium-gray rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-medium-gray rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-medium-gray rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-medium-gray">AI is analyzing...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="bg-white p-6 border-l border-gray-100">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-poppins font-medium text-navy-deep mb-3">Uploaded Prescription</h4>
                    <img 
                      src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                      alt="Medical prescription document" 
                      className="w-full h-24 object-cover rounded-lg border border-gray-200" 
                    />
                    <p className="text-sm text-medium-gray mt-2">Prescription_001.jpg</p>
                  </div>
                  
                  <div>
                    <h4 className="font-poppins font-medium text-navy-deep mb-3">Voice Transcript</h4>
                    <div className="bg-light-bg rounded-lg p-3">
                      <p className="text-sm text-dark-gray">"I've been experiencing headaches and fatigue for the past week."</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-poppins font-medium text-navy-deep mb-3">Next Steps</h4>
                    <ul className="space-y-2 text-sm text-dark-gray">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="text-teal-primary h-4 w-4" />
                        <span>Prescription uploaded</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="text-teal-primary h-4 w-4" />
                        <span>Symptoms described</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Clock className="text-medium-gray h-4 w-4" />
                        <span>Generating plans...</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <TreatmentPlans />
      <Footer />
    </div>
  );
}
