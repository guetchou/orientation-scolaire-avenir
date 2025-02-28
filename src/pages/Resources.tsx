
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, BookOpen, Video, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Resources() {
  const categories = [
    { id: "guides", name: "Guides" },
    { id: "videos", name: "Vidéos" },
    { id: "articles", name: "Articles" },
    { id: "tests", name: "Tests" },
  ];

  const resources = {
    guides: [
      {
        title: "Guide des études supérieures au Congo",
        description: "Ce guide complet vous aide à naviguer dans le système éducatif supérieur congolais. Découvrez les différentes universités, instituts et écoles supérieures, leurs conditions d'admission, frais de scolarité et perspectives de carrière. Inclut également des conseils sur les bourses disponibles et les procédures d'inscription.",
        type: "PDF",
        url: "#",
        icon: <FileText className="h-10 w-10 text-primary" />,
      },
      {
        title: "Choisir son orientation professionnelle",
        description: "Un guide pratique pour définir votre projet professionnel en fonction de vos aptitudes, intérêts et du marché de l'emploi congolais. Apprenez à identifier vos forces, à explorer les différents secteurs professionnels et à élaborer un plan d'action pour atteindre vos objectifs de carrière.",
        type: "PDF",
        url: "#",
        icon: <FileText className="h-10 w-10 text-primary" />,
      },
      {
        title: "Les métiers d'avenir au Congo",
        description: "Analyse approfondie des secteurs porteurs et des compétences recherchées dans l'économie congolaise. Ce guide détaille les métiers en croissance dans les domaines du numérique, de l'énergie, de l'agriculture, du tourisme et des services, avec des témoignages de professionnels et des conseils pour se former.",
        type: "PDF",
        url: "#",
        icon: <FileText className="h-10 w-10 text-primary" />,
      },
    ],
    videos: [
      {
        title: "Témoignages d'étudiants",
        description: "Série de vidéos où des étudiants congolais de différentes filières partagent leur parcours académique, leurs difficultés, leurs réussites et leurs conseils pour les nouveaux étudiants. Une ressource précieuse pour comprendre la réalité des études supérieures.",
        type: "Vidéo",
        url: "#",
        icon: <Video className="h-10 w-10 text-primary" />,
      },
      {
        title: "Interview avec des professionnels",
        description: "Collection d'entretiens avec des professionnels congolais établis dans divers secteurs. Ils partagent leurs parcours, les défis de leurs métiers, et offrent des conseils précieux pour les jeunes qui souhaitent suivre leurs traces.",
        type: "Vidéo",
        url: "#",
        icon: <Video className="h-10 w-10 text-primary" />,
      },
      {
        title: "Comment réussir son orientation",
        description: "Webinaire animé par des experts en orientation professionnelle qui présentent les méthodologies et outils pour faire des choix éclairés. Apprenez à évaluer vos compétences, à rechercher efficacement des informations sur les métiers et à prendre des décisions alignées avec vos aspirations.",
        type: "Vidéo",
        url: "#",
        icon: <Video className="h-10 w-10 text-primary" />,
      },
    ],
    articles: [
      {
        title: "Les compétences du 21ème siècle",
        description: "Cet article analyse les compétences essentielles pour réussir dans l'économie mondiale et locale actuelle. Focus sur la pensée critique, la créativité, la communication, la collaboration, la littératie numérique et l'apprentissage continu, avec des conseils pratiques pour les développer.",
        type: "Article",
        url: "#",
        icon: <BookOpen className="h-10 w-10 text-primary" />,
      },
      {
        title: "L'entrepreneuriat au Congo",
        description: "Panorama des opportunités et défis pour les entrepreneurs au Congo. L'article couvre l'écosystème entrepreneurial local, les secteurs prometteurs, les sources de financement disponibles, les incubateurs et accélérateurs, ainsi que des témoignages de réussite d'entrepreneurs locaux.",
        type: "Article",
        url: "#",
        icon: <BookOpen className="h-10 w-10 text-primary" />,
      },
      {
        title: "Les bourses d'études disponibles",
        description: "Guide complet des bourses nationales et internationales accessibles aux étudiants congolais. L'article détaille les critères d'éligibilité, les processus de candidature, les montants, et propose des conseils pour maximiser vos chances d'obtention de financement pour vos études.",
        type: "Article",
        url: "#",
        icon: <BookOpen className="h-10 w-10 text-primary" />,
      },
    ],
    tests: [
      {
        title: "Test RIASEC complet",
        description: "Découvrez votre profil d'intérêts professionnels selon la méthode RIASEC (Réaliste, Investigateur, Artistique, Social, Entreprenant, Conventionnel). Ce test scientifiquement validé vous aide à identifier les domaines professionnels qui correspondent le mieux à votre personnalité.",
        type: "Test",
        url: "/test-riasec",
        icon: <FileText className="h-10 w-10 text-primary" />,
      },
      {
        title: "Test d'intelligence émotionnelle",
        description: "Évaluez vos compétences émotionnelles à travers cinq dimensions: conscience de soi, maîtrise de soi, motivation, empathie et aptitudes sociales. Découvrez vos forces et points d'amélioration pour développer votre intelligence émotionnelle, un facteur clé de réussite professionnelle.",
        type: "Test",
        url: "/test-emotional",
        icon: <FileText className="h-10 w-10 text-primary" />,
      },
      {
        title: "Test des intelligences multiples",
        description: "Basé sur la théorie d'Howard Gardner, ce test vous permet d'identifier vos types d'intelligence dominants parmi les huit intelligences: linguistique, logico-mathématique, spatiale, musicale, corporelle-kinesthésique, interpersonnelle, intrapersonnelle et naturaliste.",
        type: "Test",
        url: "/test-multiple",
        icon: <FileText className="h-10 w-10 text-primary" />,
      },
    ],
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="background-pattern"></div>
      <Navbar />
      
      <main className="pt-28 pb-16">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Ressources pour votre orientation
            </h1>
            <p className="text-lg text-gray-600">
              Découvrez notre collection de ressources gratuites pour vous aider dans votre parcours d'orientation et votre développement professionnel.
            </p>
          </motion.div>

          <Tabs defaultValue="guides" className="mb-16">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="px-6">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {Object.entries(resources).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full feature-card">
                        <CardHeader className="flex flex-row items-center gap-4">
                          {item.icon}
                          <div>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                            <CardDescription>{item.type}</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-6">{item.description}</p>
                          <Button 
                            asChild
                            className="w-full flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                          >
                            <a href={item.url}>
                              {item.type === "PDF" ? (
                                <><Download className="h-4 w-4" /> Télécharger</>
                              ) : (
                                <><ExternalLink className="h-4 w-4" /> Accéder</>
                              )}
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="max-w-4xl mx-auto p-8 rounded-xl bg-white shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Besoin d'autres ressources ?</h2>
            <p className="text-center text-gray-600 mb-6">
              Notre équipe met régulièrement à jour les ressources disponibles. Si vous cherchez une information spécifique, n'hésitez pas à nous contacter.
            </p>
            <div className="flex justify-center">
              <Button asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <a href="/contact">Contactez-nous</a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
