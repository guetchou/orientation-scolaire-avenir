
import { Book, FileText, Video, Newspaper, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const ResourcesSection = () => {
  const resources = [
    {
      title: "Guides d'orientation",
      icon: <Book className="w-6 h-6" />,
      description: "Découvrez nos guides pratiques pour choisir votre voie",
      items: [
        "Guide complet des filières universitaires",
        "Comment choisir son orientation ?",
        "Les métiers d'avenir au Congo",
        "Préparer son projet professionnel"
      ]
    },
    {
      title: "Fiches métiers",
      icon: <FileText className="w-6 h-6" />,
      description: "Explorez les différents métiers et leurs perspectives",
      items: [
        "200+ fiches métiers détaillées",
        "Salaires et perspectives",
        "Compétences requises",
        "Témoignages professionnels"
      ]
    },
    {
      title: "Vidéos témoignages",
      icon: <Video className="w-6 h-6" />,
      description: "Regardez les témoignages de professionnels",
      items: [
        "Interviews de professionnels",
        "Journées types par métier",
        "Conseils d'experts",
        "Parcours inspirants"
      ]
    },
    {
      title: "Actualités",
      icon: <Newspaper className="w-6 h-6" />,
      description: "Restez informé des dernières tendances",
      items: [
        "Nouvelles formations",
        "Événements à venir",
        "Tendances du marché",
        "Opportunités professionnelles"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ressources Pédagogiques
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Accédez à notre bibliothèque complète de ressources pour vous guider dans votre parcours d'orientation et votre développement professionnel.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource) => (
            <Card key={resource.title} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {resource.icon}
                </div>
                <CardTitle className="text-xl text-center mb-2">{resource.title}</CardTitle>
                <CardDescription className="text-center">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {resource.items.map((item, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Explorer
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
