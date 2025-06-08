import { Upload, Mic, PillBottle } from "lucide-react";

export default function BenefitsSection() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-semibold text-3xl lg:text-4xl text-navy-deep mb-4">
            Why Choose Health.AI?
          </h2>
          <p className="text-xl text-dark-gray font-inter max-w-3xl mx-auto">
            Experience the future of healthcare with our intelligent platform that combines modern medicine with traditional Ayurvedic wisdom.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl hover:bg-light-bg transition-colors duration-300">
            <div className="w-16 h-16 bg-teal-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="text-teal-primary h-8 w-8" />
            </div>
            <h3 className="font-poppins font-semibold text-xl text-navy-deep mb-4">Upload in Seconds</h3>
            <p className="text-dark-gray font-inter">OCR reads your doctor's handwriting for you with 99% accuracy.</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl hover:bg-light-bg transition-colors duration-300">
            <div className="w-16 h-16 bg-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mic className="text-sage-green h-8 w-8" />
            </div>
            <h3 className="font-poppins font-semibold text-xl text-navy-deep mb-4">Speak, Don't Type</h3>
            <p className="text-dark-gray font-inter">Voice-to-text ensures you're heard accurately every time.</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl hover:bg-light-bg transition-colors duration-300">
            <div className="w-16 h-16 bg-sunray-yellow/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <PillBottle className="text-yellow-500 h-8 w-8" />
            </div>
            <h3 className="font-poppins font-semibold text-xl text-navy-deep mb-4">Dual Medicine Plans</h3>
            <p className="text-dark-gray font-inter">Choose Allopathic or Ayurvedic recommendations tailored to you.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
