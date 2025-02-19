
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Book, 
  Briefcase, 
  GraduationCap, 
  Search, 
  MessageSquare,
  PlusCircle
} from "lucide-react";
import { ForumDomain, ForumPost } from "@/types/forum";

const domains: ForumDomain[] = [
  {
    id: "1",
    name: "Sciences et Technologies",
    description: "Discussions sur les filières scientifiques et technologiques",
    icon: "GraduationCap",
    post_count: 156
  },
  {
    id: "2",
    name: "Lettres et Sciences Humaines",
    description: "Échanges sur les cursus littéraires et sciences humaines",
    icon: "Book",
    post_count: 89
  },
  {
    id: "3",
    name: "Expériences Professionnelles",
    description: "Partage d'expériences et de stages",
    icon: "Briefcase",
    post_count: 234
  }
];

export const ForumLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Forum d'Échanges</h1>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Nouvelle Discussion
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar avec les domaines */}
        <div className="w-64 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Domaines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedDomain === "all" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedDomain("all")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Tous les sujets
              </Button>
              {domains.map((domain) => (
                <Button
                  key={domain.id}
                  variant={selectedDomain === domain.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedDomain(domain.id)}
                >
                  {domain.icon === "GraduationCap" && <GraduationCap className="w-4 h-4 mr-2" />}
                  {domain.icon === "Book" && <Book className="w-4 h-4 mr-2" />}
                  {domain.icon === "Briefcase" && <Briefcase className="w-4 h-4 mr-2" />}
                  {domain.name}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <div className="flex-1">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="recent">Récents</TabsTrigger>
              <TabsTrigger value="popular">Populaires</TabsTrigger>
              <TabsTrigger value="unanswered">Sans réponse</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4">
              {domains.map((domain) => (
                <Card key={domain.id} className="cursor-pointer hover:bg-gray-50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{domain.name}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          {domain.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{domain.post_count}</p>
                        <p className="text-sm text-gray-500">discussions</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="popular">
              <p className="text-gray-500 text-center py-8">
                Les discussions populaires seront affichées ici
              </p>
            </TabsContent>

            <TabsContent value="unanswered">
              <p className="text-gray-500 text-center py-8">
                Les discussions sans réponse seront affichées ici
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
