
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

export default function Index() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Arrière-plan flouté avec gradient et effet de flou */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-secondary/30 opacity-70"></div>
        <div className="absolute inset-0 backdrop-blur-[120px]"></div>
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
      </div>
      
      <Navbar />
      
      <main className="pt-20">
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
