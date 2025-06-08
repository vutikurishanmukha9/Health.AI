import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Paperclip, Send, Bot, User, CheckCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import UploadModal from "./upload-modal";
import VoiceRecorder from "./voice-recorder";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'image' | 'voice';
}

interface ChatInterfaceProps {
  consultationId?: number;
  onNewConsultation?: (consultationId: number) => void;
}

export default function ChatInterface({ consultationId, onNewConsultation }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your Health.AI assistant. I can help you analyze your prescription and symptoms to provide personalized treatment recommendations. Let's start by uploading your prescription or describing your symptoms.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (content: string, sender: 'user' | 'ai', type: 'text' | 'image' | 'voice' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && !uploadedFile && !voiceTranscript) return;

    let messageContent = inputText.trim();
    if (voiceTranscript) {
      messageContent = voiceTranscript;
      setVoiceTranscript("");
    }

    addMessage(messageContent, 'user');
    setInputText("");
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      if (currentStep === 1) {
        addMessage("Thank you for sharing that information. I can see you've described your symptoms. Would you like to upload a prescription image as well, or shall we proceed with the analysis?", 'ai');
        setCurrentStep(2);
      } else if (currentStep === 2) {
        addMessage("Perfect! I'm now analyzing your information to generate personalized treatment plans. This may take a moment...", 'ai');
        
        // Simulate analysis completion
        setTimeout(() => {
          addMessage("Analysis complete! I've generated both Allopathic and Ayurvedic treatment plans based on your symptoms and prescription. You can view the detailed recommendations in the results section.", 'ai');
          setCurrentStep(3);
        }, 3000);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    addMessage(`Uploaded prescription: ${file.name}`, 'user', 'image');
    
    setIsLoading(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      addMessage("I've successfully processed your prescription image using OCR technology. I can see the medication details clearly. Now, please describe any symptoms you're experiencing so I can provide comprehensive treatment recommendations.", 'ai');
      setCurrentStep(2);
      setIsLoading(false);
    }, 2000);

    toast({
      title: "Prescription uploaded",
      description: "Your prescription has been processed successfully.",
    });
  };

  const handleVoiceTranscript = (transcript: string) => {
    setVoiceTranscript(transcript);
  };

  const getStepProgress = () => {
    const steps = [
      { number: 1, label: "Upload", completed: uploadedFile !== null || currentStep > 1 },
      { number: 2, label: "Describe", completed: currentStep > 2 },
      { number: 3, label: "Results", completed: currentStep > 3 }
    ];
    return steps;
  };

  return (
    <div className="grid lg:grid-cols-3 gap-0 h-full">
      {/* Chat Messages */}
      <div className="lg:col-span-2 bg-light-bg p-6 flex flex-col">
        {/* Progress Steps */}
        <div className="hidden lg:flex items-center justify-center space-x-4 mb-6 bg-white rounded-xl p-4">
          {getStepProgress().map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-teal-primary text-white' 
                    : currentStep === step.number
                    ? 'bg-teal-primary text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-bold">{step.number}</span>
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  step.completed || currentStep === step.number
                    ? 'text-teal-primary' 
                    : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < getStepProgress().length - 1 && (
                <div className={`w-8 h-0.5 mx-4 ${
                  step.completed ? 'bg-teal-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${
                message.sender === 'user'
                  ? 'bg-teal-primary text-white'
                  : 'bg-white text-navy-deep shadow-sm border border-gray-100'
              }`}>
                <div className="flex items-start space-x-2">
                  {message.sender === 'ai' && (
                    <Bot className="w-4 h-4 mt-0.5 text-teal-primary" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <span className={`text-xs mt-2 block ${
                      message.sender === 'user' ? 'text-teal-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 max-w-xs">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">AI is analyzing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Voice Recorder */}
        {voiceTranscript && (
          <div className="mb-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm text-blue-700">
                  <strong>Voice input:</strong> "{voiceTranscript}"
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsUploadModalOpen(true)}
              className="text-gray-500 hover:text-teal-primary transition-colors duration-200"
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            <div className="relative">
              <VoiceRecorder 
                onTranscript={handleVoiceTranscript}
                disabled={isLoading}
              />
            </div>

            <Input
              placeholder="Describe your symptoms..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-light-bg border-gray-300 rounded-full focus:border-teal-primary"
              disabled={isLoading}
            />

            <Button
              onClick={handleSendMessage}
              disabled={(!inputText.trim() && !voiceTranscript) || isLoading}
              className="bg-teal-primary text-white rounded-full hover:bg-teal-secondary transition-colors duration-200"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="bg-white p-6 border-l border-gray-100 hidden lg:block">
        <div className="space-y-6">
          <div>
            <h4 className="font-poppins font-medium text-navy-deep mb-3">Uploaded Prescription</h4>
            {uploadedFile ? (
              <div className="space-y-2">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Medical prescription document" 
                  className="w-full h-24 object-cover rounded-lg border border-gray-200" 
                />
                <p className="text-sm text-gray-500">{uploadedFile.name}</p>
              </div>
            ) : (
              <div className="text-sm text-gray-500 italic">
                No prescription uploaded yet
              </div>
            )}
          </div>

          <div>
            <h4 className="font-poppins font-medium text-navy-deep mb-3">Voice Transcript</h4>
            {voiceTranscript ? (
              <div className="bg-light-bg rounded-lg p-3">
                <p className="text-sm text-dark-gray">"{voiceTranscript}"</p>
              </div>
            ) : (
              <div className="text-sm text-gray-500 italic">
                No voice input recorded yet
              </div>
            )}
          </div>

          <div>
            <h4 className="font-poppins font-medium text-navy-deep mb-3">Next Steps</h4>
            <ul className="space-y-2 text-sm text-dark-gray">
              <li className="flex items-center space-x-2">
                {uploadedFile ? (
                  <CheckCircle className="text-teal-primary h-4 w-4" />
                ) : (
                  <Clock className="text-gray-400 h-4 w-4" />
                )}
                <span>Upload prescription</span>
              </li>
              <li className="flex items-center space-x-2">
                {currentStep >= 2 ? (
                  <CheckCircle className="text-teal-primary h-4 w-4" />
                ) : (
                  <Clock className="text-gray-400 h-4 w-4" />
                )}
                <span>Describe symptoms</span>
              </li>
              <li className="flex items-center space-x-2">
                {currentStep >= 3 ? (
                  <CheckCircle className="text-teal-primary h-4 w-4" />
                ) : (
                  <Clock className="text-gray-400 h-4 w-4" />
                )}
                <span>Review treatment plans</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleFileUpload}
      />
    </div>
  );
}
