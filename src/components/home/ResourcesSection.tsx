
import { Book, FileText, Video, Newspaper, Download, ExternalLink, Search, Filter, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export const ResourcesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const resources = [
    {
      title: "Guides d'orientation",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Découvrez nos guides pratiques pour choisir votre voie",
      category: "guides",
      items: [
        {
          title: "Guide complet des filières universitaires",
          description: "Un aperçu détaillé de toutes les options d'études supérieures",
          downloadLink: "#",
          readMoreLink: "#"
        },
        {
          title: "Comment choisir son orientation ?",
          description: "Méthodologie et conseils pour faire le bon choix",
          downloadLink: "#",
          readMoreLink: "#"
        },
        {
          title: "Les métiers d'avenir au Congo",
          description: "Analyse des secteurs porteurs et opportunités",
          downloadLink: "#",
          readMoreLink: "#"
        },
        {
          title: "Préparer son projet professionnel",
          description: "Guide étape par étape pour construire son avenir",
          downloadLink: "#",
          readMoreLink: "#"
        }
      ]
    },
    {
      title: "Fiches métiers",
      icon: <FileText className="w-6 h-6" />,
      description: "Explorez les différents métiers et leurs perspectives",
      category: "metiers",
      items: [
        {
          title: "200+ fiches métiers détaillées",
          description: "Base de données complète des professions",
          downloadLink: "#",
          readMoreLink: "#"
        },
        {
          title: "Salaires et perspectives",
          description: "Informations sur les rémunérations et évolutions",
          downloadLink: "#",
          readMoreLink: "#"
        },
        {
          title: "Compétences requises",
          description: "Liste des compétences par secteur",
          downloadLink: "#",
          readMoreLink: "#"
        },
        {
          title: "Témoignages professionnels",
          description: "Retours d'expérience du terrain",
          downloadLink: "#",
          readMoreLink: "#"
        }
      ]
    },
    {
      title: "Vidéos témoignages",
      icon: <Video className="w-6 h-6" />,
      description: "Regardez les témoignages de professionnels",
      category: "videos",
      items: [
        {
          title: "Interviews de professionnels",
          description: "Échanges avec des experts de différents domaines",
          downloadLink: "#",
          readMoreLink: "#"
        },
        {
          title: "Journées types par métier",
          description: "Découvrez le quotidien des professionnels",
          downloadLink: "#",
          readMoreLink: "#"
        },
        {
          title: "Conseils d'experts",
          description: "Recommandations pour réussir",
          downloadLink: "#",
          readMoreLink: "#"
        },
        {
          title: "Parcours inspirants",
          description: "Success stories motivantes",
          downloadLink: "#",
          readMoreLink: "#"
        }
      ]
    },
    {
      title: "Actualités",
      icon: <Newspaper className="w-6 h-6" />,
      description: "Restez informé des dernières tendances",
      category: "actualites",
      items: [
        {
          title: "Nouvelles formations",
          description: "Les derniers programmes disponibles",
          downloadLink: "#",
          readMoreLink: "#"
        },
        {
          title: "Événements à venir",
          description: "Calendrier des événements orientation",
          downloadLink: "#",
          readMoreLink: "#"
        },
        {
          title: "Tendances du marché",
          description: "Analyse des évolutions professionnelles",
          downloadLink: "#",
          readMoreLink: "#"
        },
        {
          title: "Opportunités professionnelles",
          description: "Offres et perspectives d'emploi",
          downloadLink: "#",
          readMoreLink: "#"
        }
      ]
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.items.some(item => 
                           item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher une ressource..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="whitespace-nowrap"
            >
              Tout voir
            </Button>
            <Button
              variant={selectedCategory === "guides" ? "default" : "outline"}
              onClick={() => setSelectedCategory("guides")}
              className="whitespace-nowrap"
            >
              Guides
            </Button>
            <Button
              variant={selectedCategory === "metiers" ? "default" : "outline"}
              onClick={() => setSelectedCategory("metiers")}
              className="whitespace-nowrap"
            >
              Métiers
            </Button>
            <Button
              variant={selectedCategory === "videos" ? "default" : "outline"}
              onClick={() => setSelectedCategory("videos")}
              className="whitespace-nowrap"
            >
              Vidéos
            </Button>
            <Button
              variant={selectedCategory === "actualites" ? "default" : "outline"}
              onClick={() => setSelectedCategory("actualites")}
              className="whitespace-nowrap"
            >
              Actualités
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredResources.map((resource) => (
            <Card key={resource.title} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {resource.icon}
                </div>
                <CardTitle className="text-xl text-center mb-2">{resource.title}</CardTitle>
                <CardDescription className="text-center">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resource.items.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex justify-between">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={item.downloadLink} className="flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={item.readMoreLink} className="flex items-center">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Lire plus
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
