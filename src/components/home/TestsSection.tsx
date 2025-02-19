
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, Lightbulb, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const TestsSection = () => {
  const tests = [
    {
      title: "Test RIASEC",
      description: "Découvrez vos intérêts professionnels et les métiers qui vous correspondent",
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      link: "/test-riasec",
      color: "from-blue-50 to-blue-100/50",
      duration: "20-25 min",
      questions: 42,
      features: [
        "Analyse détaillée de votre profil",
        "Suggestions de métiers adaptés",
        "Rapport PDF personnalisé",
        "Conseils d'orientation"
      ],
      status: "popular"
    },
    {
      title: "Intelligence Émotionnelle",
      description: "Évaluez votre capacité à comprendre et gérer les émotions",
      icon: <Brain className="w-6 h-6 text-secondary" />,
      link: "/test-emotional",
      color: "from-orange-50 to-orange-100/50",
      duration: "15-20 min",
      questions: 30,
      features: [
        "Évaluation des 5 composantes",
        "Conseils de développement",
        "Exercices pratiques",
        "Suivi des progrès"
      ],
      status: "new"
    },
    {
      title: "Intelligences Multiples",
      description: "Identifiez vos différents types d'intelligence selon la théorie de Gardner",
      icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
      link: "/test-multiple",
      color: "from-yellow-50 to-yellow-100/50",
      duration: "25-30 min",
      questions: 56,
      features: [
        "8 types d'intelligence analysés",
        "Graphique de résultats",
        "Recommandations personnalisées",
        "Activités de développement"
      ]
    },
    {
      title: "Style d'Apprentissage",
      description: "Découvrez votre façon préférée d'apprendre et de traiter l'information",
      icon: <BookOpen className="w-6 h-6 text-green-500" />,
      link: "/test-learning",
      color: "from-green-50 to-green-100/50",
      duration: "15-20 min",
      questions: 24,
      features: [
        "Identification du style dominant",
        "Stratégies d'apprentissage",
        "Outils et méthodes adaptés",
        "Plan d'action personnalisé"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Nos Tests d'Orientation
          </h2>
          <p className="text-gray-600 mb-8">
            Des tests scientifiquement validés pour vous aider à mieux vous connaître et à faire les bons choix professionnels
          </p>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Résultats instantanés</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>100% gratuit</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Confidentiel</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tests.map((test) => (
            <Link to={test.link} key={test.title} className="group">
              <Card className={`h-full hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${test.color} border-none relative overflow-hidden`}>
                {test.status && (
                  <Badge 
                    className={`absolute top-4 right-4 ${
                      test.status === 'popular' 
                        ? 'bg-primary text-white hover:bg-primary/90' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {test.status === 'popular' ? 'Populaire' : 'Nouveau'}
                  </Badge>
                )}
                
                <CardHeader>
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    {test.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {test.title}
                  </CardTitle>
                  <CardDescription className="min-h-[60px]">{test.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Durée</span>
                    <span className="font-medium">{test.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Questions</span>
                    <span className="font-medium">{test.questions}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium mb-2">Caractéristiques :</p>
                    <ul className="space-y-2">
                      {test.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full group-hover:translate-x-1 transition-transform mt-4">
                    Commencer le test
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Déjà plus de 5000 étudiants et professionnels ont trouvé leur voie grâce à nos tests
          </p>
          <Button variant="outline" size="lg" className="group">
            En savoir plus sur notre méthodologie
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
