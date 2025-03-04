
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { UserManagement } from "@/components/admin/UserManagement";
import { Loader2, UserPlus, UserCog, Settings, Database, Key } from "lucide-react";

interface SuperAdminFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const SuperAdmin = () => {
  const [loading, setLoading] = useState(false);
  const { user, isSuperAdmin, createSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SuperAdminFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    // Rediriger si l'utilisateur n'est pas un super admin
    const checkAccess = async () => {
      setLoading(true);
      try {
        if (!user) {
          toast.error("Vous devez être connecté pour accéder à cette page");
          navigate("/login");
          return;
        }

        // Vérifier si l'utilisateur est un super admin
        const { data, error } = await supabase
          .from('profiles')
          .select('is_super_admin')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        if (!data?.is_super_admin) {
          toast.error("Accès non autorisé");
          navigate("/dashboard");
          return;
        }
      } catch (error) {
        console.error("Erreur lors de la vérification des droits d'accès:", error);
        toast.error("Erreur lors de la vérification des droits d'accès");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSuperAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      toast.error("Tous les champs sont obligatoires");
      return;
    }
    
    try {
      setLoading(true);
      await createSuperAdmin(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );
      
      // Réinitialiser le formulaire
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });
      
      toast.success("Super administrateur créé avec succès");
    } catch (error) {
      console.error("Erreur lors de la création du super admin:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Console Super Admin
        </span>
      </h1>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            Gestion des utilisateurs
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Créer un Super Admin
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Base de données
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Paramètres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des utilisateurs</CardTitle>
              <CardDescription>
                Gérez tous les utilisateurs, leurs rôles et leurs accès
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Créer un Super Administrateur</CardTitle>
              <CardDescription>
                Créez un nouvel utilisateur avec les droits de super administrateur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateSuperAdmin} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Prénom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Nom"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@exemple.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Mot de passe sécurisé"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <Key className="mr-2 h-4 w-4" />
                      Créer un Super Admin
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Gestion de la base de données</CardTitle>
              <CardDescription>
                Accédez aux tables et gérez la structure de la base de données
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <Database className="h-16 w-16 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Accès à la base de données</h3>
                <p className="text-muted-foreground mb-4">
                  Gérez directement les tables, les vues et les fonctions de la base de données.
                </p>
                <Button variant="outline" className="mr-2">
                  Explorer les tables
                </Button>
                <Button>
                  Console SQL
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres système</CardTitle>
              <CardDescription>
                Configurez les paramètres globaux du système
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <Settings className="h-16 w-16 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Paramètres avancés</h3>
                <p className="text-muted-foreground mb-4">
                  Cette section est en cours de développement.
                </p>
                <Button disabled>
                  Accéder aux paramètres
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdmin;
