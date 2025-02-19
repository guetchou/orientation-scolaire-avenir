
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, PlayCircle } from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full animate-fade-in">
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm font-medium">Plateforme d'orientation professionnelle</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight animate-fade-in [--animate-delay:200ms]">
              Construisez votre avenir professionnel
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed animate-fade-in [--animate-delay:400ms]">
              Découvrez votre voie grâce à nos tests d'orientation et conseils personnalisés. 
              Prenez les bonnes décisions pour votre carrière.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in [--animate-delay:600ms]">
              <Link to="/register">
                <Button size="lg" className="gap-2">
                  Commencer gratuitement
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2">
                <PlayCircle className="w-5 h-5" />
                Voir la démo
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-gray-600 animate-fade-in [--animate-delay:800ms]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Plus de 5000 utilisateurs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span>95% de satisfaction</span>
              </div>
            </div>
          </div>

          <div className="lg:block animate-fade-in [--animate-delay:1000ms]">
            <ImageCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};
