
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Fond décoratif */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5" />
      </div>

      <Navbar />
      
      {/* Ajout d'un padding-top pour compenser la navbar fixe */}
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900">
              Nos Conseillers Professionnels
            </h2>
            <div className="flex gap-8">
              <div className="text-center group">
                <Avatar className="w-20 h-20 ring-2 ring-primary/20 group-hover:ring-primary transition-all duration-300">
                  <AvatarImage src="/placeholder.svg" alt="Michel Patel" />
                  <AvatarFallback>MP</AvatarFallback>
                </Avatar>
                <p className="mt-2 text-sm font-medium">Michel Patel</p>
                <p className="text-sm text-muted-foreground">Conseiller Senior</p>
              </div>

              <div className="text-center group">
                <Avatar className="w-20 h-20 ring-2 ring-primary/20 group-hover:ring-primary transition-all duration-300">
                  <AvatarImage src="/placeholder.svg" alt="Sophie Claire" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <p className="mt-2 text-sm font-medium">Sophie Claire</p>
                <p className="text-sm text-muted-foreground">Conseillère Orientation</p>
              </div>

              <div className="text-center group">
                <Avatar className="w-20 h-20 ring-2 ring-primary/20 group-hover:ring-primary transition-all duration-300">
                  <AvatarImage src="/placeholder.svg" alt="Jean Martin" />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <p className="mt-2 text-sm font-medium">Jean Martin</p>
                <p className="text-sm text-muted-foreground">Expert Carrière</p>
              </div>
            </div>
          </div>
        </div>

        <HeroSection />
        <StepsSection />
        <TestsSection />
        <StatisticsSection />
        <TestimonialsSection />
        <ResourcesSection />
        <EventsSection />
        <PartnersSection />
        <FaqSection />
        <ContactSection />
        <ChatBot />
      </main>

      <Footer />
    </div>
  );
}
