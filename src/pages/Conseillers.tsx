
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Conseillers() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="pt-20 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Nos Conseillers
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Une équipe de professionnels qualifiés pour vous accompagner dans votre orientation.
          </p>
          
          {/* Contenu à venir dans la prochaine étape */}
          <div className="p-8 text-center bg-white rounded-lg shadow">
            <p className="text-gray-600">
              La présentation détaillée des conseillers sera implémentée dans la prochaine étape.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
