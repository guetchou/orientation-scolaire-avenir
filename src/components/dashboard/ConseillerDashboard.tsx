
import { useState, useCallback, Suspense } from "react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { AppointmentManagement } from "@/components/conseiller/AppointmentManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConseillerStats } from "@/hooks/useConseillerStats";
import { handleError } from "@/utils/errorHandler";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUser } from "@supabase/auth-helpers-react";
import { StatisticsReport } from "./StatisticsReport";
import { AvailabilityManager } from "./AvailabilityManager";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 1,
      suspense: true,
    },
  },
});

export const ConseillerDashboard = () => {
  const { user } = useUser();
  const { data: stats, isLoading, error } = useConseillerStats(user?.id);
  
  const handleErrors = useCallback((error: unknown) => {
    handleError(error);
  }, []);

  if (error) {
    return <div>Erreur de chargement du dashboard</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Chargement...</div>}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Dashboard Conseiller</h1>
          </div>

          <DashboardStats />

          <Tabs defaultValue="appointments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
              <TabsTrigger value="students">Mes Étudiants</TabsTrigger>
              <TabsTrigger value="reports">Rapports</TabsTrigger>
              <TabsTrigger value="availability">Disponibilité</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments">
              <AppointmentManagement />
            </TabsContent>

            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Étudiants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Liste des étudiants à venir...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <StatisticsReport />
            </TabsContent>

            <TabsContent value="availability">
              <AvailabilityManager />
            </TabsContent>
          </Tabs>
        </div>
      </Suspense>
    </QueryClientProvider>
  );
};
