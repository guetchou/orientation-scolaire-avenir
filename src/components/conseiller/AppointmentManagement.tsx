
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarPlus, Clock } from "lucide-react";

interface Appointment {
  id: string;
  conseiller_id: string;
  student_id: string;
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  student_email?: string;
  profiles?: {
    email: string;
  };
}

interface NewAppointment {
  studentEmail: string;
  time: string;
  notes: string;
}

export const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    studentEmail: "",
    time: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          profiles!appointments_student_id_fkey(email)
        `)
        .eq('conseiller_id', user.id);

      if (error) throw error;

      setAppointments(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
      toast.error("Erreur lors du chargement des rendez-vous");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const createAppointment = async () => {
    if (!selectedDate || !newAppointment.studentEmail || !newAppointment.time) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non connecté");

      // Trouver l'ID de l'étudiant à partir de son email
      const { data: studentData, error: studentError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', newAppointment.studentEmail)
        .single();

      if (studentError || !studentData) {
        toast.error("Étudiant non trouvé");
        return;
      }

      const { error } = await supabase
        .from('appointments')
        .insert({
          conseiller_id: user.id,
          student_id: studentData.id,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: newAppointment.time,
          notes: newAppointment.notes,
          status: 'pending'
        });

      if (error) throw error;

      toast.success("Rendez-vous créé avec succès");
      fetchAppointments();
      setNewAppointment({ studentEmail: "", time: "", notes: "" });
    } catch (error) {
      console.error('Erreur lors de la création du rendez-vous:', error);
      toast.error("Erreur lors de la création du rendez-vous");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Calendrier</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              locale={fr}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nouveau Rendez-vous</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentEmail">Email de l'étudiant</Label>
                <Input
                  id="studentEmail"
                  value={newAppointment.studentEmail}
                  onChange={(e) => setNewAppointment(prev => ({
                    ...prev,
                    studentEmail: e.target.value
                  }))}
                  placeholder="email@exemple.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Heure</Label>
                <Input
                  id="time"
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment(prev => ({
                    ...prev,
                    time: e.target.value
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment(prev => ({
                    ...prev,
                    notes: e.target.value
                  }))}
                  placeholder="Détails du rendez-vous..."
                />
              </div>

              <Button 
                onClick={createAppointment}
                disabled={loading || !selectedDate || !newAppointment.studentEmail || !newAppointment.time}
                className="w-full"
              >
                <CalendarPlus className="w-4 h-4 mr-2" />
                Créer le rendez-vous
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rendez-vous prévus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{apt.student_email}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {format(new Date(apt.date), 'dd MMMM yyyy', { locale: fr })} à {apt.time}
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Détails du rendez-vous</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Étudiant</Label>
                        <p className="mt-1">{apt.student_email}</p>
                      </div>
                      <div>
                        <Label>Date et heure</Label>
                        <p className="mt-1">
                          {format(new Date(apt.date), 'dd MMMM yyyy', { locale: fr })} à {apt.time}
                        </p>
                      </div>
                      <div>
                        <Label>Notes</Label>
                        <p className="mt-1">{apt.notes || "Aucune note"}</p>
                      </div>
                      <div>
                        <Label>Statut</Label>
                        <p className="mt-1 capitalize">{apt.status}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
