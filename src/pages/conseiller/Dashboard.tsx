
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConseillerDashboard } from "@/components/dashboard/ConseillerDashboard";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { AppointmentManagement } from "@/components/conseiller/AppointmentManagement";
import { AvailabilityManager } from "@/components/dashboard/AvailabilityManager";
import { StudentList } from "@/components/dashboard/StudentList";
import { Separator } from "@/components/ui/separator";
import { DashboardTabsStats } from "@/types/dashboard";

export default function ConseillierDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Données pour les statistiques
  const dashboardStats: DashboardTabsStats = {
    appointments: {
      total: 148,
      completed: 132,
      upcoming: 16,
      growth: 12,
    },
    students: {
      total: 86,
      active: 75,
      new: 8,
      growth: 10,
    },
    revenue: {
      total: 1250000,
      thisMonth: 280000,
      lastMonth: 240000,
      growth: 16.7,
    },
    hours: {
      total: 264,
      thisMonth: 48,
      lastMonth: 42,
      growth: 14.3,
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tableau de bord conseiller</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          <TabsTrigger value="students">Étudiants</TabsTrigger>
          <TabsTrigger value="availability">Disponibilités</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardStats stats={dashboardStats} />
          <ConseillerDashboard />
        </TabsContent>

        <TabsContent value="appointments">
          <AppointmentManagement />
        </TabsContent>

        <TabsContent value="students">
          <StudentList />
        </TabsContent>

        <TabsContent value="availability">
          <AvailabilityManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
