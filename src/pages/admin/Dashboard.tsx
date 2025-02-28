
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { UserManagement } from "@/components/admin/UserManagement";
import { Separator } from "@/components/ui/separator";
import { DashboardTabsStats, ConseillerStats } from "@/types/dashboard";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Données pour les statistiques
  const dashboardStats: ConseillerStats = {
    total_students: 1256,
    tests_completed: 3487,
    appointments_scheduled: 987,
    average_progress: 65
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tableau de bord administrateur</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardStats stats={dashboardStats} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>
                  Les dernières actions sur la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm text-gray-500">Il y a 2 heures</p>
                    <p>Nouvel utilisateur inscrit: Marie Doukaga</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm text-gray-500">Il y a 3 heures</p>
                    <p>Test RIASEC complété par Jean Batchi</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-sm text-gray-500">Il y a 5 heures</p>
                    <p>Rendez-vous confirmé avec Dr. Patel</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-sm text-gray-500">Il y a 8 heures</p>
                    <p>Nouvel article publié: "Choisir son orientation"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statistiques des tests</CardTitle>
                <CardDescription>
                  Répartition des tests par type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Test RIASEC</span>
                    <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <span>45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Intelligence émotionnelle</span>
                    <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "25%" }}></div>
                    </div>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Intelligences multiples</span>
                    <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "15%" }}></div>
                    </div>
                    <span>15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Styles d'apprentissage</span>
                    <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "15%" }}></div>
                    </div>
                    <span>15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Gestion du contenu</CardTitle>
              <CardDescription>
                Gérez les articles, ressources et événements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Fonctionnalité en cours de développement</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du système</CardTitle>
              <CardDescription>
                Configuration globale de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Fonctionnalité en cours de développement</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
