import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, ImageIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export default function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    onUpload(file);
    onClose();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-poppins font-semibold text-xl text-navy-deep">
            Upload Your Prescription
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-medium-gray">
            Snap a clear photo of your prescription for accurate analysis.
          </p>
          
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${
              isDragging 
                ? 'border-teal-primary bg-teal-primary/5' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop your prescription here
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or choose from the options below
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              className="bg-teal-primary text-white hover:bg-teal-secondary transition-colors duration-200"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.capture = 'environment';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) handleFileSelect(file);
                };
                input.click();
              }}
            >
              <Camera className="mr-2 h-4 w-4" />
              Take Photo
            </Button>
            
            <Button 
              variant="outline"
              className="border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-white transition-colors duration-200"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) handleFileSelect(file);
                };
                input.click();
              }}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Gallery
            </Button>
          </div>
          
          <div className="bg-light-bg rounded-xl p-4">
            <h4 className="font-medium text-navy-deep mb-2">Tips for clear images:</h4>
            <ul className="text-sm text-dark-gray space-y-1">
              <li>• Ensure good lighting—no shadows on paper</li>
              <li>• Hold camera steady and focus on text</li>
              <li>• Avoid glare or reflections</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
