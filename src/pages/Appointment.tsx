
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppointmentScheduler } from "@/components/appointments/AppointmentScheduler";
import { mockCounselors } from "./Conseillers";

export default function Appointment() {
  const { counselorId } = useParams();
  const counselor = mockCounselors.find(c => c.id === counselorId);

  if (!counselor) {
    return <div>Conseiller non trouvé</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Prendre rendez-vous
            </h1>
            <p className="text-lg text-gray-600">
              avec {counselor.name} - {counselor.title}
            </p>
          </div>

          <AppointmentScheduler 
            counselorId={counselor.id} 
            counselorName={counselor.name}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
