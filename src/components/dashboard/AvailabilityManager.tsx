
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { AvailabilitySlot } from "@/types/dashboard";

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
];

export const AvailabilityManager = () => {
  const [availabilities, setAvailabilities] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('availabilities')
        .select('*')
        .eq('conseiller_id', user.id);

      if (error) throw error;

      setAvailabilities(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des disponibilités:", error);
      toast.error("Erreur lors du chargement des disponibilités");
    }
  };

  const toggleAvailability = async (dayIndex: number, timeSlot: string) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const existingSlot = availabilities.find(
        slot => slot.day_of_week === dayIndex && slot.start_time === timeSlot
      );

      if (existingSlot) {
        const { error } = await supabase
          .from('availabilities')
          .update({ is_available: !existingSlot.is_available })
          .eq('id', existingSlot.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('availabilities')
          .insert({
            conseiller_id: user.id,
            day_of_week: dayIndex,
            start_time: timeSlot,
            end_time: timeSlot.replace(/^\d+/, h => String(+h + 1).padStart(2, '0')),
            is_available: true
          });

        if (error) throw error;
      }

      await fetchAvailabilities();
      toast.success("Disponibilités mises à jour");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des disponibilités:", error);
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  const isSlotAvailable = (dayIndex: number, timeSlot: string) => {
    const slot = availabilities.find(
      slot => slot.day_of_week === dayIndex && slot.start_time === timeSlot
    );
    return slot?.is_available || false;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des disponibilités</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2"></th>
                {DAYS.map((day) => (
                  <th key={day} className="px-4 py-2 text-left">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map((timeSlot) => (
                <tr key={timeSlot}>
                  <td className="px-4 py-2 font-medium">{timeSlot}</td>
                  {DAYS.map((day, index) => (
                    <td key={`${day}-${timeSlot}`} className="px-4 py-2">
                      <Switch
                        checked={isSlotAvailable(index, timeSlot)}
                        onCheckedChange={() => toggleAvailability(index, timeSlot)}
                        disabled={loading}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
