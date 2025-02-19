
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentList } from "./StudentList";
import { AvailabilityManager } from "./AvailabilityManager";
import { DashboardStats } from "./DashboardStats";
import { StatisticsReport } from "./StatisticsReport";
import { 
  Users, 
  Calendar, 
  BarChart, 
  ClipboardList 
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { DashboardStats as DashboardStatsType } from "@/types/dashboard";

export const ConseillerDashboard = () => {
  const [stats, setStats] = useState<DashboardStatsType>({
    total_students: 0,
    tests_completed: 0,
    appointments_scheduled: 0,
    average_progress: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Récupérer les statistiques globales
      const { data, error } = await supabase
        .from('dashboard_stats')
        .select('*')
        .eq('conseiller_id', user.id)
        .single();

      if (error) throw error;

      setStats(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
      toast.error("Erreur lors du chargement des statistiques");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord conseiller</h1>

      <DashboardStats stats={stats} />

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">
            <Users className="w-4 h-4 mr-2" />
            Étudiants
          </TabsTrigger>
          <TabsTrigger value="availability">
            <Calendar className="w-4 h-4 mr-2" />
            Disponibilités
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart className="w-4 h-4 mr-2" />
            Rapports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <StudentList />
        </TabsContent>

        <TabsContent value="availability">
          <AvailabilityManager />
        </TabsContent>

        <TabsContent value="reports">
          <StatisticsReport />
        </TabsContent>
      </Tabs>
    </div>
  );
};
