
import { Navbar } from "@/components/Navbar";
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
import { ChatSection } from "@/components/home/ChatSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ChatSection />
      <StepsSection />
      <TestsSection />
      <StatisticsSection />
      <TestimonialsSection />
      <ResourcesSection />
      <EventsSection />
      <PartnersSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
}
