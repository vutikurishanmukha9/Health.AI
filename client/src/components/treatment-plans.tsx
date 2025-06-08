import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PillBottle, Leaf, CheckCircle, Clock } from "lucide-react";
import { TreatmentPlan } from "@shared/schema";

interface TreatmentPlansProps {
  allopathicPlan?: TreatmentPlan;
  ayurvedicPlan?: TreatmentPlan;
  onSelectPlan?: (planType: 'allopathic' | 'ayurvedic') => void;
}

export default function TreatmentPlans({ allopathicPlan, ayurvedicPlan, onSelectPlan }: TreatmentPlansProps) {
  const handleSelectPlan = (planType: 'allopathic' | 'ayurvedic') => {
    onSelectPlan?.(planType);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-semibold text-3xl lg:text-4xl text-navy-deep mb-4">
            Your Personalized Treatment Plans
          </h2>
          <p className="text-xl text-dark-gray font-inter">
            Choose the approach that resonates with you
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Allopathic Plan */}
          <Card className="border-2 border-teal-primary shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-primary rounded-full flex items-center justify-center">
                    <PillBottle className="text-white h-6 w-6" />
                  </div>
                  <CardTitle className="font-poppins font-semibold text-2xl text-navy-deep">
                    {allopathicPlan?.title || "Allopathic Plan"}
                  </CardTitle>
                </div>
                <Badge className="bg-teal-primary text-white">Recommended</Badge>
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300" 
                alt="Healthcare professional consulting with patient" 
                className="w-full h-48 object-cover rounded-xl" 
              />
            </CardHeader>
            
            <CardContent className="space-y-6">
              {allopathicPlan?.description && (
                <p className="text-dark-gray">{allopathicPlan.description}</p>
              )}
              
              <div>
                <h4 className="font-poppins font-medium text-lg text-navy-deep mb-3">Medication Schedule</h4>
                <div className="space-y-3">
                  {allopathicPlan?.medications?.map((medication, index) => (
                    <div key={index} className="flex items-center justify-between bg-light-bg rounded-lg p-3">
                      <div>
                        <p className="font-medium text-navy-deep">{medication.name}</p>
                        <p className="text-sm text-gray-600">{medication.purpose}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-teal-primary font-medium">{medication.frequency}</p>
                        <p className="text-xs text-gray-500">{medication.dosage}</p>
                      </div>
                    </div>
                  )) || (
                    // Default example medications
                    <>
                      <div className="flex items-center justify-between bg-light-bg rounded-lg p-3">
                        <div>
                          <p className="font-medium text-navy-deep">Ibuprofen 400mg</p>
                          <p className="text-sm text-gray-600">For headache relief</p>
                        </div>
                        <span className="text-sm text-teal-primary font-medium">2x daily</span>
                      </div>
                      <div className="flex items-center justify-between bg-light-bg rounded-lg p-3">
                        <div>
                          <p className="font-medium text-navy-deep">Multivitamin Complex</p>
                          <p className="text-sm text-gray-600">For energy support</p>
                        </div>
                        <span className="text-sm text-teal-primary font-medium">1x daily</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-poppins font-medium text-lg text-navy-deep mb-3">Lifestyle Recommendations</h4>
                <ul className="space-y-2">
                  {allopathicPlan?.lifestyle?.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="text-teal-primary h-4 w-4 mt-1 flex-shrink-0" />
                      <span className="text-dark-gray">{item}</span>
                    </li>
                  )) || (
                    // Default lifestyle recommendations
                    <>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="text-teal-primary h-4 w-4 mt-1" />
                        <span className="text-dark-gray">Ensure 7-8 hours of sleep daily</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="text-teal-primary h-4 w-4 mt-1" />
                        <span className="text-dark-gray">Stay hydrated (8-10 glasses water)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="text-teal-primary h-4 w-4 mt-1" />
                        <span className="text-dark-gray">Regular exercise (30 min daily)</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <Button 
                className="w-full bg-teal-primary text-white hover:bg-teal-secondary transition-colors duration-200"
                onClick={() => handleSelectPlan('allopathic')}
              >
                Choose This Plan
              </Button>
            </CardContent>
          </Card>
          
          {/* Ayurvedic Plan */}
          <Card className="bg-warm-sand border-2 border-sage-green shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-sage-green rounded-full flex items-center justify-center">
                    <Leaf className="text-white h-6 w-6" />
                  </div>
                  <CardTitle className="font-poppins font-semibold text-2xl text-navy-deep">
                    {ayurvedicPlan?.title || "Ayurvedic Plan"}
                  </CardTitle>
                </div>
                <Badge variant="secondary" className="bg-sage-green text-white">Natural</Badge>
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1502224562085-639556652f33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300" 
                alt="Ayurvedic herbs and traditional medicines arranged" 
                className="w-full h-48 object-cover rounded-xl" 
              />
            </CardHeader>
            
            <CardContent className="space-y-6">
              {ayurvedicPlan?.description && (
                <p className="text-dark-gray">{ayurvedicPlan.description}</p>
              )}
              
              <div>
                <h4 className="font-poppins font-medium text-lg text-navy-deep mb-3">Herbal Remedies</h4>
                <div className="space-y-3">
                  {ayurvedicPlan?.medications?.map((medication, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                      <div>
                        <p className="font-medium text-navy-deep">{medication.name}</p>
                        <p className="text-sm text-gray-600">{medication.purpose}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-sage-green font-medium">{medication.frequency}</p>
                        <p className="text-xs text-gray-500">{medication.dosage}</p>
                      </div>
                    </div>
                  )) || (
                    // Default example remedies
                    <>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div>
                          <p className="font-medium text-navy-deep">Brahmi (Bacopa Monnieri)</p>
                          <p className="text-sm text-gray-600">For mental clarity & stress</p>
                        </div>
                        <span className="text-sm text-sage-green font-medium">Morning</span>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div>
                          <p className="font-medium text-navy-deep">Ashwagandha</p>
                          <p className="text-sm text-gray-600">For energy & vitality</p>
                        </div>
                        <span className="text-sm text-sage-green font-medium">Evening</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-poppins font-medium text-lg text-navy-deep mb-3">Lifestyle Practices</h4>
                <ul className="space-y-2">
                  {ayurvedicPlan?.lifestyle?.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="text-sage-green h-4 w-4 mt-1 flex-shrink-0" />
                      <span className="text-dark-gray">{item}</span>
                    </li>
                  )) || (
                    // Default lifestyle practices
                    <>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="text-sage-green h-4 w-4 mt-1" />
                        <span className="text-dark-gray">Daily meditation (10-15 minutes)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="text-sage-green h-4 w-4 mt-1" />
                        <span className="text-dark-gray">Warm oil massage (Abhyanga)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="text-sage-green h-4 w-4 mt-1" />
                        <span className="text-dark-gray">Yoga & breathing exercises</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <Button 
                className="w-full bg-sage-green text-white hover:bg-sage-green/90 transition-colors duration-200"
                onClick={() => handleSelectPlan('ayurvedic')}
              >
                Choose This Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
