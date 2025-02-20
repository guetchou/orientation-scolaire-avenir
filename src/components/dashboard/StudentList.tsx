
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudentProgress } from "@/types/dashboard";

export const StudentList = () => {
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simuler le chargement des données
    const mockData: StudentProgress[] = [
      {
        student_id: "1",
        student_name: "Alice Martin",
        completed_tests: 3,
        last_test_date: "2024-03-15",
        progress_score: 75,
        next_appointment: "2024-03-20"
      },
      {
        student_id: "2",
        student_name: "Thomas Dubois",
        completed_tests: 2,
        last_test_date: "2024-03-14",
        progress_score: 60,
        next_appointment: "2024-03-22"
      }
    ];

    setStudents(mockData);
  }, []);

  const filteredStudents = students.filter(student =>
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des Étudiants</CardTitle>
        <Input
          placeholder="Rechercher un étudiant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <Card key={student.student_id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{student.student_name}</h3>
                    <p className="text-sm text-gray-500">
                      Tests complétés : {student.completed_tests}
                    </p>
                    <p className="text-sm text-gray-500">
                      Dernier test : {new Date(student.last_test_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      Progression : {student.progress_score}%
                    </p>
                    {student.next_appointment && (
                      <p className="text-sm text-primary">
                        Prochain RDV : {new Date(student.next_appointment).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
