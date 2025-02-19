
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sophie Mbemba",
      role: "Étudiante en médecine",
      avatar: "/avatars/avatar-1.jpg",
      content: "Les tests d'orientation m'ont vraiment aidée à confirmer mon choix de carrière. Les résultats détaillés et les conseils personnalisés ont été déterminants dans ma décision de poursuivre des études de médecine.",
      university: "Université Marien Ngouabi",
      rating: 5
    },
    {
      id: 2,
      name: "Jean Makaya",
      role: "Ingénieur logiciel",
      avatar: "/avatars/avatar-2.jpg",
      content: "Grâce à Orientation Pro Congo, j'ai pu identifier mes points forts et mes domaines d'amélioration. Les ressources proposées m'ont permis de développer mes compétences et d'évoluer professionnellement.",
      company: "Tech Congo",
      rating: 5
    },
    {
      id: 3,
      name: "Marie Nguesso",
      role: "Lycéenne en Terminale",
      avatar: "/avatars/avatar-3.jpg",
      content: "J'étais complètement perdue concernant mon orientation. Les tests et l'accompagnement m'ont aidée à découvrir des filières qui correspondent à mes intérêts et à mes capacités.",
      school: "Lycée Savorgnan de Brazza",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array(rating)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Témoignages
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les expériences de nos utilisateurs et comment nous les avons aidés dans leur parcours
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gray-50 border-none">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <Quote className="w-12 h-12 text-primary/20 mb-6" />
                      <p className="text-lg text-gray-700 mb-6">
                        {testimonials[currentIndex].content}
                      </p>
                      <div className="flex justify-center mb-4">
                        {renderStars(testimonials[currentIndex].rating)}
                      </div>
                      <Avatar className="w-16 h-16 mb-4">
                        <AvatarImage src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} />
                        <AvatarFallback>{testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                        <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                        <p className="text-sm text-primary">
                          {testimonials[currentIndex].university || 
                           testimonials[currentIndex].company || 
                           testimonials[currentIndex].school}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
