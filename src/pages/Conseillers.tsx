
import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CounselorCard, Counselor } from "@/components/counselors/CounselorCard";
import { CounselorFilter } from "@/components/counselors/CounselorFilter";

const mockCounselors: Counselor[] = [
  {
    id: "1",
    name: "Dr. Marie Dubois",
    title: "Psychologue de l'Orientation",
    specialties: ["Orientation scolaire", "Psychologie", "Bilan de compétences"],
    avatar: "/avatars/counselor1.jpg",
    experience: "12 ans",
    rating: 4.8,
    availableSlots: 5,
    description: "Spécialisée dans l'accompagnement des jeunes en réorientation et la définition de projet professionnel."
  },
  {
    id: "2",
    name: "Jean Martin",
    title: "Conseiller en Insertion Professionnelle",
    specialties: ["Insertion professionnelle", "Recherche d'emploi", "Formation continue"],
    avatar: "/avatars/counselor2.jpg",
    experience: "8 ans",
    rating: 4.6,
    availableSlots: 3,
    description: "Expert en insertion professionnelle et accompagnement vers l'emploi. Spécialiste du marché du travail congolais."
  },
  {
    id: "3",
    name: "Sophie Morel",
    title: "Coach Carrière",
    specialties: ["Coaching", "Développement personnel", "Transition professionnelle"],
    avatar: "/avatars/counselor3.jpg",
    experience: "15 ans",
    rating: 4.9,
    availableSlots: 2,
    description: "Coach certifiée spécialisée dans l'accompagnement des transitions professionnelles et le développement du potentiel."
  },
  {
    id: "4",
    name: "Dr. Thomas Laurent",
    title: "Conseiller d'Orientation Senior",
    specialties: ["Orientation universitaire", "Tests psychométriques", "Accompagnement parental"],
    avatar: "/avatars/counselor4.jpg",
    experience: "20 ans",
    rating: 4.7,
    availableSlots: 4,
    description: "Docteur en psychologie spécialisé dans l'orientation des lycéens et étudiants. Expert en tests psychométriques."
  }
];

const allSpecialties = Array.from(
  new Set(mockCounselors.flatMap(c => c.specialties))
).sort();

export default function Conseillers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const handleSpecialtyToggle = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const filteredCounselors = useMemo(() => {
    return mockCounselors.filter(counselor => {
      const matchesSearch = searchTerm === "" || 
        counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        counselor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        counselor.specialties.some(s => 
          s.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesSpecialties = selectedSpecialties.length === 0 ||
        selectedSpecialties.every(s => counselor.specialties.includes(s));

      return matchesSearch && matchesSpecialties;
    });
  }, [searchTerm, selectedSpecialties]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="pt-20 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Nos Conseillers
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une équipe de professionnels qualifiés est à votre disposition pour vous accompagner dans votre orientation et votre développement professionnel.
            </p>
          </div>

          <div className="grid lg:grid-cols-[300px,1fr] gap-8">
            <aside>
              <div className="sticky top-24">
                <CounselorFilter
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedSpecialties={selectedSpecialties}
                  onSpecialtyToggle={handleSpecialtyToggle}
                  availableSpecialties={allSpecialties}
                />
              </div>
            </aside>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredCounselors.map(counselor => (
                <CounselorCard key={counselor.id} counselor={counselor} />
              ))}

              {filteredCounselors.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-500">
                    Aucun conseiller ne correspond à vos critères de recherche.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
