
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Tests() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="pt-20 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Tests d'Orientation
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Découvrez nos tests d'orientation professionnelle conçus pour vous aider à identifier vos talents et choisir votre voie.
          </p>
          
          {/* Contenu à venir dans la prochaine étape */}
          <div className="p-8 text-center bg-white rounded-lg shadow">
            <p className="text-gray-600">
              Le contenu détaillé des tests sera implémenté dans la prochaine étape.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
