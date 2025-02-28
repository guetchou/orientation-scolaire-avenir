
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
      <div className="background-gradient"></div>
      <div className="background-pattern"></div>
      
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
