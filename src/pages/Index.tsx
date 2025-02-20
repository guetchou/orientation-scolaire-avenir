
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
import { ChatBot } from "@/components/chat/ChatBot";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold">Exemple d'Avatar</h2>
          <div className="flex gap-8">
            {/* Avatar avec animation et statut en ligne */}
            <div className="text-center">
              <Avatar showAnimation online showBorder>
                <AvatarImage src="/user-avatar.png" alt="Avatar animé" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-sm text-muted-foreground">Animé & En ligne</p>
            </div>

            {/* Avatar avec bordure */}
            <div className="text-center">
              <Avatar showBorder>
                <AvatarImage src="/ai-avatar.png" alt="Avatar avec bordure" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-sm text-muted-foreground">Avec bordure</p>
            </div>

            {/* Avatar simple */}
            <div className="text-center">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-sm text-muted-foreground">Simple</p>
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
    </div>
  );
}
