
import { ArrowRight, Calendar, Clock, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const BlogSection = () => {
  const articles = [
    {
      title: "Guide complet : Comment choisir sa filière universitaire en 2024",
      excerpt: "Découvrez notre méthodologie en 5 étapes pour faire le meilleur choix d'orientation possible. Conseils d'experts et témoignages d'étudiants.",
      date: "10 Avril 2024",
      readTime: "8 min",
      category: "Orientation",
      author: "Dr. Marie Mokoko",
      image: "/placeholder.svg",
      tags: ["Université", "Orientation", "Conseils"]
    },
    {
      title: "Les métiers d'avenir au Congo : Perspectives 2024-2030",
      excerpt: "Analyse détaillée des secteurs en croissance et des compétences recherchées par les entreprises congolaises dans les années à venir.",
      date: "8 Avril 2024",
      readTime: "12 min",
      category: "Carrière",
      author: "Prof. Jean Malonga",
      image: "/placeholder.svg",
      tags: ["Emploi", "Tendances", "Analyse"]
    },
    {
      title: "10 conseils pour réussir son entretien d'embauche",
      excerpt: "Guide pratique pour se démarquer lors d'un entretien d'embauche. Préparez-vous efficacement avec nos conseils d'experts RH.",
      date: "5 Avril 2024",
      readTime: "6 min",
      category: "Conseils",
      author: "Claire Matsanga",
      image: "/placeholder.svg",
      tags: ["Entretien", "Emploi", "Conseils"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="font-heading text-3xl font-bold mb-4">
              Articles Récents
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Découvrez nos derniers articles sur l'orientation, la carrière et le développement professionnel.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            Tous les articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.title} className="group hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-white/90 text-primary hover:bg-white">
                  {article.category}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription>{article.excerpt}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 mr-2" />
                  Par {article.author}
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full group-hover:translate-x-1 transition-transform">
                  Lire l'article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" size="lg">
            Tous les articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
