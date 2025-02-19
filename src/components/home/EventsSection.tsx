
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Users, ArrowRight, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export const EventsSection = () => {
  const events = [
    {
      title: "Forum des Métiers 2024",
      description: "Rencontrez des professionnels et découvrez différents secteurs d'activité",
      date: "15 Mai 2024",
      time: "9h00 - 17h00",
      location: "Palais des Congrès, Brazzaville",
      type: "Forum",
      places: 500,
      remainingPlaces: 123,
      isHighlighted: true
    },
    {
      title: "Atelier CV et Lettre de Motivation",
      description: "Apprenez à mettre en valeur votre profil et à rédiger des candidatures percutantes",
      date: "22 Mai 2024",
      time: "14h00 - 16h30",
      location: "Centre culturel, Pointe-Noire",
      type: "Atelier",
      places: 30,
      remainingPlaces: 8,
      isUrgent: true
    },
    {
      title: "Conférence : L'Intelligence Artificielle",
      description: "Les opportunités de carrière dans le domaine de l'IA au Congo",
      date: "1 Juin 2024",
      time: "15h00 - 17h00",
      location: "Université Marien Ngouabi",
      type: "Conférence",
      places: 200,
      remainingPlaces: 45
    },
    {
      title: "Session d'orientation collective",
      description: "Séance de coaching pour définir votre projet professionnel",
      date: "8 Juin 2024",
      time: "10h00 - 12h00",
      location: "En ligne",
      type: "Coaching",
      places: 20,
      remainingPlaces: 15
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Événements à Venir
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Participez à nos événements pour enrichir votre parcours et rencontrer des professionnels
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`group hover:shadow-lg transition-all duration-300 ${
                event.isHighlighted ? 'border-primary/50 bg-primary/5' : ''
              }`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge className={
                      event.type === 'Forum' ? 'bg-blue-500' :
                      event.type === 'Atelier' ? 'bg-green-500' :
                      event.type === 'Conférence' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }>
                      {event.type}
                    </Badge>
                    {event.isUrgent && (
                      <Badge variant="destructive" className="animate-pulse">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Places limitées
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      {event.remainingPlaces} places restantes
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-gray-500">
                      {Math.round((event.remainingPlaces / event.places) * 100)}% des places disponibles
                    </div>
                    <Button className="group-hover:translate-x-1 transition-transform">
                      S'inscrire
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.remainingPlaces / event.places) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            Voir tous les événements
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
