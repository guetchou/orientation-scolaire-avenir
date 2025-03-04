
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, Clock, Search, Tag, User } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { ChatBot } from "@/components/chat/ChatBot";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  created_at: string;
  type: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      setDisplayedPosts(
        posts.filter(post => 
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, posts]);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_contents')
        .select('*')
        .eq('type', 'articles')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setPosts(data as BlogPost[] || []);
      setDisplayedPosts(data as BlogPost[] || []);
    } catch (error) {
      console.error("Erreur lors du chargement des articles:", error);
    } finally {
      setLoading(false);
    }
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy", { locale: fr });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="absolute inset-0 -z-10 backdrop-blur-[80px]"></div>
      <div className="absolute inset-0 -z-10 bg-grid-white/10 bg-[size:20px_20px]"></div>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Notre Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos derniers articles, conseils et actualités sur l'orientation et le développement professionnel
          </p>
          
          <div className="relative max-w-md mx-auto mt-8">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="border-0 shadow-md">
                <CardHeader className="pb-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-36 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : displayedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map((post) => (
              <Card key={post.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="prose line-clamp-3" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + '...' }} />
                  
                  <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{formatDate(post.created_at)}</span>
                    
                    <div className="ml-auto flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span>Éducation</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full">Lire l'article</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-white/90 backdrop-blur rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Aucun article trouvé</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? `Aucun résultat pour "${searchTerm}"`
                : "Il n'y a pas encore d'articles publiés"}
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Réinitialiser la recherche
              </Button>
            )}
          </div>
        )}
      </main>

      <ChatBot />
      <Footer />
    </div>
  );
}
