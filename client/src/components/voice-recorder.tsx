import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2 } from "lucide-react";
import { SpeechRecorder, SpeechToText } from "@/lib/speech";
import { useToast } from "@/hooks/use-toast";

interface VoiceRecorderProps {
  onTranscript: (transcript: string) => void;
  disabled?: boolean;
}

export default function VoiceRecorder({ onTranscript, disabled = false }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recorderRef = useRef<SpeechRecorder | null>(null);
  const speechToTextRef = useRef<SpeechToText | null>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      // Initialize speech-to-text if supported
      if (!speechToTextRef.current) {
        speechToTextRef.current = new SpeechToText();
      }

      if (speechToTextRef.current.isSupported()) {
        // Use Web Speech API for real-time transcription
        setIsRecording(true);
        setTranscript("");
        
        speechToTextRef.current.startListening(
          (newTranscript, isFinal) => {
            setTranscript(newTranscript);
            if (isFinal) {
              onTranscript(newTranscript);
              setIsRecording(false);
            }
          },
          (error) => {
            console.error("Speech recognition error:", error);
            toast({
              title: "Recording Error",
              description: error,
              variant: "destructive"
            });
            setIsRecording(false);
          }
        );
      } else {
        // Fallback to manual recording
        recorderRef.current = new SpeechRecorder();
        await recorderRef.current.startRecording();
        setIsRecording(true);
      }
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Recording Failed",
        description: "Unable to start recording. Please check microphone permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = async () => {
    try {
      if (speechToTextRef.current && speechToTextRef.current.getIsListening()) {
        speechToTextRef.current.stopListening();
        setIsRecording(false);
        return;
      }

      if (recorderRef.current && recorderRef.current.isRecording()) {
        setIsProcessing(true);
        const audioBlob = await recorderRef.current.stopRecording();
        
        // Here you would typically send the audio to a transcription service
        // For now, we'll simulate transcription
        setTimeout(() => {
          const simulatedTranscript = "I've been experiencing headaches and fatigue for the past week.";
          setTranscript(simulatedTranscript);
          onTranscript(simulatedTranscript);
          setIsProcessing(false);
        }, 2000);
      }
      
      setIsRecording(false);
    } catch (error) {
      console.error("Error stopping recording:", error);
      toast({
        title: "Recording Error",
        description: "Failed to process recording",
        variant: "destructive"
      });
      setIsRecording(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        size="lg"
        variant={isRecording ? "destructive" : "default"}
        className={`rounded-full w-16 h-16 ${
          isRecording 
            ? "bg-red-500 hover:bg-red-600 animate-pulse-teal" 
            : "bg-teal-primary hover:bg-teal-secondary"
        }`}
        onClick={isRecording ? stopRecording : startRecording}
        disabled={disabled || isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : isRecording ? (
          <Square className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
      
      <div className="text-center">
        {isRecording && (
          <p className="text-sm text-teal-primary animate-pulse">
            Listening... Tap to stop
          </p>
        )}
        {isProcessing && (
          <p className="text-sm text-medium-gray">
            Processing audio...
          </p>
        )}
        {!isRecording && !isProcessing && (
          <p className="text-sm text-medium-gray">
            Hold to record your symptoms
          </p>
        )}
      </div>
      
      {transcript && (
        <div className="bg-light-bg rounded-lg p-3 max-w-md">
          <p className="text-sm text-dark-gray">
            "{transcript}"
          </p>
        </div>
      )}
    </div>
  );
}
