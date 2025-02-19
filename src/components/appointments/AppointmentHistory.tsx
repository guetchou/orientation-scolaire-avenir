
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Search, Calendar } from "lucide-react";
import type { Appointment } from "@/integrations/supabase/types/appointments";

interface FilterOptions {
  status: string;
  startDate: string;
  endDate: string;
  searchTerm: string;
}

export const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    status: "all",
    startDate: "",
    endDate: "",
    searchTerm: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("appointments")
        .select(`
          *,
          profiles!appointments_student_id_fkey (email)
        `)
        .eq("conseiller_id", user.id)
        .order("date", { ascending: false });

      if (error) throw error;

      setAppointments(data.map(apt => ({
        ...apt,
        student_email: apt.profiles?.email
      })));
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique:", error);
      toast.error("Erreur lors du chargement de l'historique");
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filters.status !== "all" && apt.status !== filters.status) return false;
    
    if (filters.startDate && apt.date < filters.startDate) return false;
    if (filters.endDate && apt.date > filters.endDate) return false;
    
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return (
        apt.student_email?.toLowerCase().includes(searchLower) ||
        apt.notes?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des rendez-vous</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Statut</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="confirmed">Confirmé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Date début</Label>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            
            <div>
              <Label>Date fin</Label>
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
            
            <div>
              <Label>Recherche</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  value={filters.searchTerm}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="divide-y">
            {filteredAppointments.map((apt) => (
              <div key={apt.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{apt.student_email}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(new Date(apt.date), "d MMMM yyyy", { locale: fr })} à {apt.time}
                    </div>
                    <Badge variant={
                      apt.status === "confirmed" ? "default" :
                      apt.status === "cancelled" ? "destructive" : 
                      "secondary"
                    }>
                      {apt.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                </div>
                {apt.notes && (
                  <p className="mt-2 text-sm text-gray-600">
                    {apt.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
