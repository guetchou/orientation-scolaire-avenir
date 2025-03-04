
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, PlayCircle } from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Gradient orbs in background */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-[100px] opacity-70 animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full filter blur-[100px] opacity-70 animate-pulse-slow animation-delay-2000" />
      
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm text-primary font-medium px-4 py-2 rounded-full">
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm font-medium">Plateforme d'orientation professionnelle</span>
            </motion.div>
            
            <motion.h1 variants={item} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent drop-shadow-sm">
                Construisez votre avenir professionnel
              </span>
            </motion.h1>
            
            <motion.p variants={item} className="text-xl text-gray-700 leading-relaxed max-w-xl">
              Découvrez votre voie grâce à nos tests d'orientation et conseils personnalisés. 
              Prenez les bonnes décisions pour votre carrière.
            </motion.p>
            
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 gap-2 shadow-lg shadow-primary/20 transition-all duration-300 hover:translate-y-[-2px]">
                  Commencer gratuitement
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2 border-primary/20 backdrop-blur-sm hover:bg-primary/10 transition-all duration-300">
                <PlayCircle className="w-5 h-5" />
                Voir la démo
              </Button>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-8 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Plus de 5000 utilisateurs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>95% de satisfaction</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:block relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-2xl transform rotate-6 scale-95 blur-xl opacity-30 animate-pulse-slow" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 backdrop-blur-sm z-10"></div>
              <ImageCarousel />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-secondary/30 rounded-full blur-xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
