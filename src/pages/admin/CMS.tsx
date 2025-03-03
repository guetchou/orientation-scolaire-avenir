
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PlusCircle, Edit, Trash2, Search } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  content: string;
  type: string;
  created_at: string;
  updated_at: string;
}

const CMS = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("articles");
  
  // Formulaire d'édition
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    type: "article"
  });

  useEffect(() => {
    fetchContents();
  }, [currentTab]);

  const fetchContents = async () => {
    setLoading(true);
    try {
      // Note: Cette table n'existe pas encore, elle devra être créée dans Supabase
      const { data, error } = await supabase
        .from('cms_contents')
        .select('*')
        .eq('type', currentTab)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setContents(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des contenus:", error);
      toast.error("Erreur lors du chargement des contenus");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredContents = contents.filter(
    item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: ContentItem) => {
    setCurrentItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      content: item.content,
      type: item.type
    });
    setEditMode(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce contenu ?")) {
      try {
        const { error } = await supabase
          .from('cms_contents')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        setContents(contents.filter(item => item.id !== id));
        toast.success("Contenu supprimé avec succès");
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        toast.error("Erreur lors de la suppression du contenu");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editMode && currentItem) {
        // Mode édition
        const { error } = await supabase
          .from('cms_contents')
          .update({
            title: formData.title,
            description: formData.description,
            content: formData.content,
            updated_at: new Date()
          })
          .eq('id', currentItem.id);

        if (error) throw error;
        toast.success("Contenu mis à jour avec succès");
      } else {
        // Nouveau contenu
        const { error } = await supabase
          .from('cms_contents')
          .insert({
            title: formData.title,
            description: formData.description,
            content: formData.content,
            type: currentTab
          });

        if (error) throw error;
        toast.success("Contenu créé avec succès");
      }

      // Réinitialiser le formulaire et rafraîchir la liste
      resetForm();
      fetchContents();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      toast.error("Erreur lors de l'enregistrement du contenu");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      type: currentTab
    });
    setEditMode(false);
    setCurrentItem(null);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Gestion de Contenu</h1>
      
      <Tabs defaultValue="articles" value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="resources">Ressources</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
        </TabsList>

        <div className="flex justify-between items-center my-6">
          <div className="relative w-1/3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Button onClick={() => setEditMode(false)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nouveau
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Liste des contenus</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-center py-4">Chargement...</p>
                ) : filteredContents.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date de création</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContents.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>{item.description.substring(0, 50)}...</TableCell>
                          <TableCell>{new Date(item.created_at).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4">Aucun contenu trouvé</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{editMode ? "Modifier le contenu" : "Ajouter un contenu"}</CardTitle>
                <CardDescription>
                  {editMode 
                    ? "Modifiez les détails du contenu sélectionné" 
                    : "Remplissez les informations pour créer un nouveau contenu"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Contenu</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={10}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editMode ? "Mettre à jour" : "Créer"}
                    </Button>
                    {editMode && (
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Annuler
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default CMS;
