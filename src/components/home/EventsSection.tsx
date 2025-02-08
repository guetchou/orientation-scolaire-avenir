
import { Calendar, MapPin, Clock, ArrowRight, Users, Tag, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const EventsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const events = [
    {
      title: "Salon de l'Orientation Pro Congo 2024",
      date: "15-16 Mai 2024",
      location: "Université Marien Ngouabi, Brazzaville",
      time: "9h - 17h",
      type: "Salon",
      attendees: 500,
      description: "Le plus grand salon de l'orientation au Congo. Rencontrez plus de 50 établissements d'enseignement supérieur, participez à des conférences thématiques et découvrez votre future voie.",
      highlights: [
        "50+ exposants",
        "Conférences thématiques",
        "Ateliers d'orientation",
        "Tests d'orientation gratuits"
      ]
    },
    {
      title: "Forum des Métiers du Numérique",
      date: "20-21 Mai 2024",
      location: "Centre des Congrès, Pointe-Noire",
      time: "10h - 18h",
      type: "Forum",
      attendees: 300,
      description: "Découvrez les opportunités dans le secteur numérique en pleine expansion au Congo. Échangez avec des professionnels et explorez les formations disponibles.",
      highlights: [
        "Démonstrations techniques",
        "Témoignages de professionnels",
        "Sessions de networking",
        "Offres de stages"
      ]
    },
    {
      title: "Conférence: Les Métiers d'Avenir",
      date: "25 Mai 2024",
      location: "Chambre de Commerce, Brazzaville",
      time: "14h - 17h",
      type: "Conférence",
      attendees: 200,
      description: "Une série de conférences sur les métiers d'avenir et les compétences recherchées par les entreprises. Animée par des experts du marché du travail.",
      highlights: [
        "Analyse du marché",
        "Tendances d'emploi",
        "Conseils pratiques",
        "Q&A avec experts"
      ]
    },
    {
      title: "Journée Portes Ouvertes - Universités",
      date: "30 Mai 2024",
      location: "Multiple sites, Brazzaville",
      time: "8h - 16h",
      type: "Portes Ouvertes",
      attendees: 1000,
      description: "Visitez les principales universités de Brazzaville. Rencontrez les enseignants, découvrez les installations et les programmes d'études.",
      highlights: [
        "Visites guidées",
        "Présentation des filières",
        "Rencontres avec étudiants",
        "Inscriptions sur place"
      ]
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || event.type === selectedType;
    return matchesSearch && matchesType;
  });

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

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              onClick={() => setSelectedType("all")}
            >
              Tous
            </Button>
            <Button
              variant={selectedType === "Salon" ? "default" : "outline"}
              onClick={() => setSelectedType("Salon")}
            >
              Salons
            </Button>
            <Button
              variant={selectedType === "Forum" ? "default" : "outline"}
              onClick={() => setSelectedType("Forum")}
            >
              Forums
            </Button>
            <Button
              variant={selectedType === "Conférence" ? "default" : "outline"}
              onClick={() => setSelectedType("Conférence")}
            >
              Conférences
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
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
                <CardDescription className="text-base">{event.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 col-span-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Points clés :</h4>
                  <ul className="space-y-2">
                    {event.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between pt-4">
                <Button variant="outline" className="group-hover:translate-x-1 transition-transform">
                  Plus d'informations
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button className="group-hover:translate-x-1 transition-transform">
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
