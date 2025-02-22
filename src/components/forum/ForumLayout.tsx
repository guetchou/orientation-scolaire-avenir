import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Book, 
  Briefcase, 
  GraduationCap, 
  Search, 
  MessageSquare,
  PlusCircle,
} from "lucide-react";
import { useForumData } from "@/hooks/useForumData";
import { useQuery } from "@tanstack/react-query";
import { ForumPost as ForumPostType, CreateForumPost } from "@/types/forum";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ForumPost } from "./ForumPost";

export const ForumLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<'recent' | 'popular' | 'unanswered'>('recent');
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTags, setNewPostTags] = useState<string[]>([]);

  const { user } = useAuth();
  const { 
    domains, 
    isLoadingDomains,
    getPosts,
    createPostMutation
  } = useForumData();

  const { 
    data: posts, 
    isLoading: isLoadingPosts 
  } = useQuery({
    queryKey: ['forumPosts', selectedDomain, activeTab, searchQuery],
    queryFn: () => getPosts({
      domain: selectedDomain,
      sortBy: activeTab,
      search: searchQuery
    })
  });

  const handleCreatePost = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer une discussion");
      return;
    }

    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    try {
      const newPost: CreateForumPost = {
        title: newPostTitle,
        content: newPostContent,
        author_id: user.id,
        domain: selectedDomain === 'all' ? domains?.[0]?.id || '' : selectedDomain,
        tags: newPostTags
      };

      await createPostMutation.mutateAsync(newPost);

      setIsNewPostOpen(false);
      setNewPostTitle("");
      setNewPostContent("");
      setNewPostTags([]);
      
    } catch (error) {
      console.error("Erreur création post:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Forum d'Échanges</h1>
        <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Nouvelle Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle discussion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Titre de la discussion"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
              <Textarea
                placeholder="Contenu de votre message"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-[200px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleCreatePost}>
                  Publier
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsNewPostOpen(false)}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-6">
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
              {domains?.map((domain) => (
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

        <div className="flex-1">
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as typeof activeTab)}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="recent">Récents</TabsTrigger>
              <TabsTrigger value="popular">Populaires</TabsTrigger>
              <TabsTrigger value="unanswered">Sans réponse</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {isLoadingPosts ? (
                <div className="text-center py-8">
                  Chargement des discussions...
                </div>
              ) : posts?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Aucune discussion trouvée
                </div>
              ) : (
                posts?.map((post: ForumPostType) => (
                  <ForumPost key={post.id} post={post} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
