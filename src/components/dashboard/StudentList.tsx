
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Search, Calendar, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { StudentProgress } from "@/types/dashboard";

export const StudentList = () => {
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('student_progress')
        .select('*')
        .eq('conseiller_id', user.id);

      if (error) throw error;

      setStudents(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des étudiants:", error);
      toast.error("Erreur lors du chargement des étudiants");
    }
  };

  const filteredStudents = students.filter(student =>
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suivi des étudiants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un étudiant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="divide-y">
            {filteredStudents.map((student) => (
              <div key={student.id} className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{student.student_name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Dernier test: {format(new Date(student.last_test_date), 'dd/MM/yyyy')}</span>
                      <span>•</span>
                      <span>Tests complétés: {student.completed_tests}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Voir profil
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression globale</span>
                    <span>{student.progress_score}%</span>
                  </div>
                  <Progress value={student.progress_score} />
                </div>

                {student.next_appointment && (
                  <div className="mt-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Prochain RDV: {format(new Date(student.next_appointment), 'dd/MM/yyyy')}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
