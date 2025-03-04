
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
