
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { AppointmentManagement } from "@/components/conseiller/AppointmentManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ConseillerDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Conseiller</h1>
      </div>

      <DashboardStats />

      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          <TabsTrigger value="students">Mes Étudiants</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default ConseillerDashboard;
