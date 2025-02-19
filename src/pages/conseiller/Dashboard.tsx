
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ConseillerDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Conseiller</h1>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mes Étudiants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Liste des étudiants suivis à venir...
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Rendez-vous</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Calendrier des rendez-vous à venir...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConseillerDashboard;
