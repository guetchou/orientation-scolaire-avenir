
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Appointment } from "@/integrations/supabase/types/appointments";

interface AppointmentCalendarProps {
  onAppointmentCreate?: (appointment: Appointment) => void;
  onAppointmentUpdate?: (appointment: Appointment) => void;
}

export const AppointmentCalendar = ({
  onAppointmentCreate,
  onAppointmentUpdate,
}: AppointmentCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("appointments")
        .select(`
          *,
          profiles!appointments_student_id_fkey (email)
        `)
        .eq("conseiller_id", user.id);

      if (error) throw error;

      setAppointments(data.map(apt => ({
        ...apt,
        student_email: apt.profiles?.email
      })));
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error);
      toast.error("Erreur lors du chargement des rendez-vous");
    }
  };

  const createAppointment = async (formData: FormData) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non connecté");

      const appointment = {
        conseiller_id: user.id,
        student_id: formData.get("student_email") as string,
        date: format(selectedDate!, "yyyy-MM-dd"),
        time: formData.get("time") as string,
        notes: formData.get("notes") as string,
        status: "pending" as const,
      };

      const { data, error } = await supabase
        .from("appointments")
        .insert(appointment)
        .select()
        .single();

      if (error) throw error;

      toast.success("Rendez-vous créé avec succès");
      fetchAppointments();
      onAppointmentCreate?.(data);

      // Programmer les rappels automatiques
      await fetch("/api/schedule-reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: data.id }),
      });

    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous:", error);
      toast.error("Erreur lors de la création du rendez-vous");
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: string, status: Appointment["status"]) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      toast.success("Statut mis à jour avec succès");
      fetchAppointments();
      onAppointmentUpdate?.(data);

      // Envoyer une notification par email
      await fetch("/api/notify-appointment-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: id, status }),
      });

    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour du statut");
    } finally {
      setLoading(false);
    }
  };

  const getDayAppointments = (date: Date) => {
    return appointments.filter(apt => 
      apt.date === format(date, "yyyy-MM-dd")
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Calendrier des rendez-vous</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={fr}
              modifiers={{
                hasAppointments: (date) => getDayAppointments(date).length > 0
              }}
              modifiersStyles={{
                hasAppointments: { 
                  backgroundColor: "var(--primary-50)",
                  fontWeight: "bold"
                }
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rendez-vous du jour</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                {getDayAppointments(selectedDate).map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{apt.student_email}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {apt.time}
                      </div>
                      <Badge variant={
                        apt.status === "confirmed" ? "default" :
                        apt.status === "cancelled" ? "destructive" : 
                        "secondary"
                      }>
                        {apt.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {apt.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(apt.id, "confirmed")}
                            disabled={loading}
                          >
                            Confirmer
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => updateAppointmentStatus(apt.id, "cancelled")}
                            disabled={loading}
                          >
                            Annuler
                          </Button>
                        </>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Détails
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Détails du rendez-vous</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Étudiant</Label>
                              <p>{apt.student_email}</p>
                            </div>
                            <div>
                              <Label>Date et heure</Label>
                              <p>{format(new Date(apt.date), "d MMMM yyyy", { locale: fr })} à {apt.time}</p>
                            </div>
                            <div>
                              <Label>Notes</Label>
                              <p>{apt.notes || "Aucune note"}</p>
                            </div>
                            <div>
                              <Label>Statut</Label>
                              <Badge variant={
                                apt.status === "confirmed" ? "default" :
                                apt.status === "cancelled" ? "destructive" : 
                                "secondary"
                              }>
                                {apt.status}
                              </Badge>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Nouveau rendez-vous
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nouveau rendez-vous</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      createAppointment(formData);
                    }} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="student_email">Email de l'étudiant</Label>
                        <Input
                          id="student_email"
                          name="student_email"
                          type="email"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Heure</Label>
                        <Input
                          id="time"
                          name="time"
                          type="time"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          placeholder="Détails du rendez-vous..."
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        Créer le rendez-vous
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Sélectionnez une date pour voir les rendez-vous
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
