
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StepsSection } from "@/components/home/StepsSection";
import { TestsSection } from "@/components/home/TestsSection";
import { StatisticsSection } from "@/components/home/StatisticsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ResourcesSection } from "@/components/home/ResourcesSection";
import { EventsSection } from "@/components/home/EventsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactSection } from "@/components/home/ContactSection";
import { ChatBot } from "@/components/chat/ChatBot";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Users } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced background with multiple layers for depth */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 opacity-70"></div>
        <div className="absolute inset-0 backdrop-blur-[150px]"></div>
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-30"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px] opacity-50 animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-secondary/20 rounded-full filter blur-[100px] opacity-40 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-purple/20 rounded-full filter blur-[80px] opacity-30 animate-pulse-slow animation-delay-4000"></div>
      </div>
      
      <Navbar />
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20 relative z-10"
      >
        <HeroSection />
        <StepsSection />
        <TestsSection />

        {/* Nouvelle section CTA après les tests */}
        <section className="py-12 bg-primary/5 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 font-heading">Besoin d'accompagnement personnalisé ?</h2>
                <p className="text-gray-600 mb-4">Nos conseillers d'orientation sont disponibles pour vous guider à chaque étape de votre parcours.</p>
                <div className="flex flex-wrap gap-4">
                  <Button className="gap-2">
                    <Users size={18} />
                    Voir nos conseillers
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <BookOpen size={18} />
                    Ressources gratuites
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80" 
                    alt="Conseiller d'orientation" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <StatisticsSection />
        <TestimonialsSection />
        <ResourcesSection />
        <EventsSection />
        <PartnersSection />
        <FaqSection />
        <ContactSection />
        <ChatBot />
      </motion.main>

      <Footer />
    </div>
  );
}
