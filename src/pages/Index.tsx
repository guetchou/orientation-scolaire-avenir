
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
          <h2 className="text-2xl font-bold">Nos Conseillers Professionnels</h2>
          <div className="flex gap-8">
            {/* Avatar homme professionnel */}
            <div className="text-center">
              <Avatar showAnimation online showBorder>
                <AvatarImage 
                  src="photo-1581092795360-fd1ca04f0952" 
                  alt="Conseiller professionnel" 
                />
                <AvatarFallback>MP</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-sm font-medium">Michel Patel</p>
              <p className="text-sm text-muted-foreground">Conseiller Senior</p>
            </div>

            {/* Avatar femme professionnelle */}
            <div className="text-center">
              <Avatar showBorder showAnimation>
                <AvatarImage 
                  src="photo-1581091226825-a6a2a5aee158" 
                  alt="Conseillère professionnelle" 
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-sm font-medium">Sophie Claire</p>
              <p className="text-sm text-muted-foreground">Conseillère Orientation</p>
            </div>

            {/* Avatar professionnel supplémentaire */}
            <div className="text-center">
              <Avatar showBorder>
                <AvatarImage 
                  src="photo-1486312338219-ce68d2c6f44d" 
                  alt="Conseiller expert" 
                />
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
    </div>
  );
}
