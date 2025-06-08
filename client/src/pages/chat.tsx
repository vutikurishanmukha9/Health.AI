import { useParams } from "wouter";
import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import ChatInterface from "@/components/chat-interface";
import TreatmentPlans from "@/components/treatment-plans";
import { useQuery } from "@tanstack/react-query";
import { Consultation, TreatmentPlan } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Chat() {
  const { id } = useParams();
  const consultationId = id ? parseInt(id) : undefined;
  const [showResults, setShowResults] = useState(false);
  
  const { data: consultation, isLoading } = useQuery({
    queryKey: ['/api/consultations', consultationId],
    enabled: !!consultationId,
  });

  useEffect(() => {
    if (consultation?.status === 'completed') {
      setShowResults(true);
    }
  }, [consultation]);

  if (isLoading && consultationId) {
    return (
      <div className="min-h-screen bg-light-bg">
        <Navigation />
        <div className="container mx-auto p-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg">
      <Navigation />
      
      <div className="h-[calc(100vh-4rem)]">
        {showResults && consultation?.allopathicPlan && consultation?.ayurvedicPlan ? (
          <div className="overflow-y-auto h-full">
            <TreatmentPlans
              allopathicPlan={consultation.allopathicPlan as TreatmentPlan}
              ayurvedicPlan={consultation.ayurvedicPlan as TreatmentPlan}
              onSelectPlan={(planType) => {
                console.log(`Selected ${planType} plan`);
                // Handle plan selection logic here
              }}
            />
          </div>
        ) : (
          <ChatInterface 
            consultationId={consultationId}
            onNewConsultation={(newId) => {
              // Handle navigation to new consultation
              window.history.pushState({}, '', `/chat/${newId}`);
            }}
          />
        )}
      </div>
    </div>
  );
}
