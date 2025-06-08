import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Plus, FileText, Clock, CheckCircle, PillBottle, Leaf } from "lucide-react";
import { Consultation } from "@shared/schema";

export default function Dashboard() {
  const userId = 1; // For demo purposes
  
  const { data: consultations = [], isLoading } = useQuery({
    queryKey: ['/api/users', userId, 'consultations'],
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'analyzing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'analyzing':
        return <Badge className="bg-yellow-100 text-yellow-800">Analyzing</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-poppins font-semibold text-3xl text-navy-deep">Dashboard</h1>
            <p className="text-dark-gray mt-2">Track your health consultations and treatment plans</p>
          </div>
          
          <Link href="/chat">
            <Button className="bg-teal-primary text-white hover:bg-teal-secondary">
              <Plus className="mr-2 h-4 w-4" />
              New Consultation
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="consultations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="consultations">My Consultations</TabsTrigger>
            <TabsTrigger value="treatment-plans">Treatment Plans</TabsTrigger>
            <TabsTrigger value="statistics">Health Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="consultations" className="space-y-6">
            <div className="grid gap-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : consultations.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-navy-deep mb-2">No consultations yet</h3>
                    <p className="text-dark-gray mb-6">Start your first consultation to get personalized treatment recommendations.</p>
                    <Link href="/chat">
                      <Button className="bg-teal-primary text-white hover:bg-teal-secondary">
                        Start First Consultation
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                consultations.map((consultation: Consultation) => (
                  <Card key={consultation.id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(consultation.status)}
                          <div>
                            <CardTitle className="text-lg font-poppins">
                              Consultation #{consultation.id}
                            </CardTitle>
                            <p className="text-sm text-dark-gray">
                              {new Date(consultation.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(consultation.status)}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {consultation.symptoms && (
                        <div>
                          <h4 className="font-medium text-navy-deep mb-1">Symptoms</h4>
                          <p className="text-sm text-dark-gray">{consultation.symptoms}</p>
                        </div>
                      )}
                      
                      {consultation.prescriptionUrl && (
                        <div>
                          <h4 className="font-medium text-navy-deep mb-1">Prescription</h4>
                          <p className="text-sm text-teal-primary">Prescription uploaded</p>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="flex space-x-4 text-sm text-dark-gray">
                          {consultation.status === 'completed' && (
                            <>
                              <span className="flex items-center space-x-1">
                                <PillBottle className="h-3 w-3" />
                                <span>Allopathic Plan</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Leaf className="h-3 w-3" />
                                <span>Ayurvedic Plan</span>
                              </span>
                            </>
                          )}
                        </div>
                        
                        <Link href={`/chat/${consultation.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="treatment-plans" className="space-y-6">
            <Card>
              <CardContent className="p-12 text-center">
                <PillBottle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-navy-deep mb-2">Treatment Plans</h3>
                <p className="text-dark-gray">Your active and completed treatment plans will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="statistics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-dark-gray">Total Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-navy-deep">{consultations.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-dark-gray">Completed Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-navy-deep">
                    {consultations.filter((c: Consultation) => c.status === 'completed').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-dark-gray">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-navy-deep">98%</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
