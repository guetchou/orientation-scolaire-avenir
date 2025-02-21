
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { useEffect, useState } from "react";
import { ConseillerStats } from "@/types/dashboard";

export default function Dashboard() {
  const [stats, setStats] = useState<ConseillerStats>({
    total_students: 0,
    tests_completed: 0,
    appointments_scheduled: 0,
    average_progress: 0
  });

  useEffect(() => {
    // Fetch stats here when needed
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
        <DashboardStats stats={stats} />
      </main>
      <Footer />
    </div>
  );
}
