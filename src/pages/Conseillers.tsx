
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Search, Filter, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

export const mockCounselors = [
  {
    id: "1",
    name: "Dr. Michel Patel",
    title: "Conseiller d'orientation senior",
    avatar: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 124,
    specialties: ["Orientation universitaire", "Psychologie", "Carrières médicales"],
    education: "Doctorat en Psychologie de l'Éducation",
    experience: "15 ans d'expérience",
    location: "Brazzaville",
    availability: "Lundi, Mardi, Vendredi",
    price: "20000 FCFA",
    bio: "Spécialiste en orientation académique et professionnelle, j'aide les étudiants à découvrir leur vocation et à construire un parcours en adéquation avec leurs aspirations."
  },
  {
    id: "2",
    name: "Sophie Claire",
    title: "Conseillère orientation professionnelle",
    avatar: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 97,
    specialties: ["Reconversion professionnelle", "Bilan de compétences", "Coaching"],
    education: "Master en Ressources Humaines",
    experience: "8 ans d'expérience",
    location: "Pointe-Noire",
    availability: "Mardi, Mercredi, Jeudi",
    price: "15000 FCFA",
    bio: "J'accompagne les professionnels en quête de sens dans leur carrière. Mon approche combine bilan de compétences et conseil stratégique pour des transitions réussies."
  },
  {
    id: "3",
    name: "Jean Martin",
    title: "Expert en orientation technologique",
    avatar: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 86,
    specialties: ["Filières technologiques", "Informatique", "Ingénierie"],
    education: "Ingénieur en informatique",
    experience: "12 ans d'expérience",
    location: "Brazzaville",
    availability: "Lundi, Mercredi, Vendredi",
    price: "18000 FCFA",
    bio: "Passionné par les nouvelles technologies, j'oriente les jeunes talents vers les métiers d'avenir. Je propose un accompagnement axé sur le développement des compétences techniques et l'innovation."
  },
  {
    id: "4",
    name: "Marie Ekembi",
    title: "Conseillère spécialisée études internationales",
    avatar: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 105,
    specialties: ["Études à l'étranger", "Bourses internationales", "Langues"],
    education: "Master en Relations Internationales",
    experience: "10 ans d'expérience",
    location: "Pointe-Noire",
    availability: "Mardi, Jeudi, Samedi",
    price: "22000 FCFA",
    bio: "Experte en mobilité académique internationale, j'accompagne les étudiants dans leurs démarches pour étudier à l'étranger, de la sélection des programmes à la préparation des dossiers de bourses."
  },
  {
    id: "5",
    name: "André Makosso",
    title: "Conseiller d'orientation scolaire",
    avatar: "/placeholder.svg",
    rating: 4.6,
    reviewCount: 78,
    specialties: ["Orientation lycée", "Choix de filière", "Accompagnement jeunes"],
    education: "Licence en Sciences de l'Éducation",
    experience: "7 ans d'expérience",
    location: "Brazzaville",
    availability: "Lundi, Mardi, Jeudi",
    price: "12000 FCFA",
    bio: "Spécialisé dans l'accompagnement des lycéens, je les aide à faire des choix éclairés pour leur orientation post-bac en tenant compte de leurs aptitudes et aspirations."
  },
  {
    id: "6",
    name: "Claudine Batchi",
    title: "Psychologue et conseillère d'orientation",
    avatar: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 91,
    specialties: ["Psychologie", "Tests d'aptitude", "Développement personnel"],
    education: "Master en Psychologie",
    experience: "9 ans d'expérience",
    location: "Dolisie",
    availability: "Mercredi, Jeudi, Vendredi",
    price: "16000 FCFA",
    bio: "J'utilise mon expertise en psychologie pour aider les personnes à mieux se connaître et à identifier les voies professionnelles les plus épanouissantes pour elles."
  }
];

export default function Conseillers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const specialtiesList = Array.from(new Set(mockCounselors.flatMap(c => c.specialties)));
  const locationsList = Array.from(new Set(mockCounselors.map(c => c.location)));

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty) 
        : [...prev, specialty]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location) 
        : [...prev, location]
    );
  };

  const filteredCounselors = mockCounselors.filter(counselor => {
    const matchesSearch = searchTerm === "" || 
      counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      counselor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialties = selectedSpecialties.length === 0 || 
      selectedSpecialties.some(s => counselor.specialties.includes(s));
    
    const matchesLocation = selectedLocations.length === 0 || 
      selectedLocations.includes(counselor.location);
    
    return matchesSearch && matchesSpecialties && matchesLocation;
  });

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
            className="max-w-3xl mx-auto text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Nos Conseillers d'Orientation
            </h1>
            <p className="text-lg text-gray-600">
              Découvrez notre équipe de professionnels qualifiés prêts à vous accompagner dans votre parcours d'orientation.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 mb-10">
            <div className="md:w-1/4">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filtres
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Recherche</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Nom ou spécialité..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Spécialités</h3>
                    <div className="space-y-2">
                      {specialtiesList.map((specialty) => (
                        <div key={specialty} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`specialty-${specialty}`}
                            checked={selectedSpecialties.includes(specialty)}
                            onChange={() => toggleSpecialty(specialty)}
                            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                          />
                          <label htmlFor={`specialty-${specialty}`} className="ml-2 text-sm text-gray-700">
                            {specialty}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Lieu</h3>
                    <div className="space-y-2">
                      {locationsList.map((location) => (
                        <div key={location} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`location-${location}`}
                            checked={selectedLocations.includes(location)}
                            onChange={() => toggleLocation(location)}
                            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                          />
                          <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-700">
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedSpecialties([]);
                      setSelectedLocations([]);
                    }}
                    className="w-full mt-2"
                  >
                    Réinitialiser les filtres
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-3/4">
              <Tabs defaultValue="grid" className="mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {filteredCounselors.length} conseiller{filteredCounselors.length > 1 ? 's' : ''} trouvé{filteredCounselors.length > 1 ? 's' : ''}
                  </p>
                  <TabsList>
                    <TabsTrigger value="grid">Grille</TabsTrigger>
                    <TabsTrigger value="list">Liste</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="grid" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCounselors.map((counselor, index) => (
                      <motion.div
                        key={counselor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow feature-card">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex gap-4">
                                <Avatar className="h-14 w-14">
                                  <AvatarImage src={counselor.avatar} alt={counselor.name} />
                                  <AvatarFallback>{counselor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle>{counselor.name}</CardTitle>
                                  <CardDescription>{counselor.title}</CardDescription>
                                  <div className="flex items-center mt-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span className="ml-1 text-sm font-medium">{counselor.rating}</span>
                                    <span className="ml-1 text-xs text-gray-500">({counselor.reviewCount} avis)</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="flex items-center text-sm text-gray-500 mb-3">
                              <MapPin className="h-4 w-4 mr-1" />
                              {counselor.location}
                            </div>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{counselor.bio}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {counselor.specialties.map((specialty) => (
                                <Badge key={specialty} variant="secondary" className="font-normal">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                            <div className="text-sm text-gray-600">
                              <div className="flex items-center mb-1">
                                <User className="h-4 w-4 mr-2" />
                                {counselor.experience}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {counselor.availability}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <div className="w-full flex justify-between items-center">
                              <span className="text-lg font-semibold text-primary">{counselor.price}</span>
                              <Button asChild>
                                <a href="/appointment">Prendre rendez-vous</a>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="list" className="mt-6">
                  <div className="space-y-4">
                    {filteredCounselors.map((counselor, index) => (
                      <motion.div
                        key={counselor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow feature-card">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                              <div className="flex-shrink-0">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={counselor.avatar} alt={counselor.name} />
                                  <AvatarFallback>{counselor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex-grow">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                  <div>
                                    <h3 className="text-xl font-bold">{counselor.name}</h3>
                                    <p className="text-gray-500">{counselor.title}</p>
                                  </div>
                                  <div className="flex items-center mt-2 md:mt-0">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span className="ml-1 text-sm font-medium">{counselor.rating}</span>
                                    <span className="ml-1 text-xs text-gray-500">({counselor.reviewCount} avis)</span>
                                  </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {counselor.location} • {counselor.experience} • Disponible: {counselor.availability}
                                </div>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{counselor.bio}</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {counselor.specialties.map((specialty) => (
                                    <Badge key={specialty} variant="secondary" className="font-normal">
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-lg font-semibold text-primary">{counselor.price}</span>
                                  <Button asChild>
                                    <a href="/appointment">Prendre rendez-vous</a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
