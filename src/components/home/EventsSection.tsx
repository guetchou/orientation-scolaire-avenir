
import { Calendar, MapPin, Clock, ArrowRight, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const EventsSection = () => {
  const events = [
    {
      title: "Salon de l'Orientation",
      date: "15 Mai 2024",
      location: "Université Marien Ngouabi, Brazzaville",
      time: "9h - 17h",
      type: "Salon",
      attendees: 500,
      description: "Rencontrez les établissements d'enseignement supérieur et découvrez leurs formations. Plus de 50 exposants présents."
    },
    {
      title: "Forum des Métiers",
      date: "20 Mai 2024",
      location: "Centre des Congrès, Pointe-Noire",
      time: "10h - 18h",
      type: "Forum",
      attendees: 300,
      description: "Échangez avec des professionnels de différents secteurs et découvrez les opportunités de carrière."
    },
    {
      title: "Conférence Carrières",
      date: "25 Mai 2024",
      location: "Chambre de Commerce, Brazzaville",
      time: "14h - 17h",
      type: "Conférence",
      attendees: 200,
      description: "Une série de conférences sur les métiers d'avenir et les compétences recherchées par les entreprises."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Événements à venir
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Participez à nos événements pour rencontrer des professionnels, découvrir des opportunités et construire votre réseau.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.title} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {event.type}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{event.attendees}+ participants</span>
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{event.time}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full group-hover:translate-x-1 transition-transform">
                  S'inscrire
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            Voir tous les événements
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
