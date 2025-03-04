
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { UserManagement } from "@/components/admin/UserManagement";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function SuperAdmin() {
  const { user, isSuperAdmin, createSuperAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAccess, setLoadingAccess] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        setHasAccess(false);
        setLoadingAccess(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('department, is_super_admin')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        // Vérifier si l'utilisateur est un super admin ou un admin
        if (data && (data.is_super_admin || data.department === 'admin')) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification des droits d'accès:", error);
        setHasAccess(false);
      } finally {
        setLoadingAccess(false);
      }
    };

    checkAdminAccess();
  }, [user]);

  const handleCreateSuperAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !firstName || !lastName) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    try {
      await createSuperAdmin(email, password, firstName, lastName);
      
      // Réinitialiser le formulaire
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error("Erreur lors de la création du super admin:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingAccess) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Accès refusé</h1>
        <p className="text-center mb-4">
          Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
        </p>
        <Button onClick={() => window.history.back()}>Retour</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Administration Système</h1>

      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Gestion des utilisateurs</TabsTrigger>
          <TabsTrigger value="create-admin">Créer un administrateur</TabsTrigger>
          <TabsTrigger value="system">Paramètres système</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des utilisateurs</CardTitle>
              <CardDescription>
                Gérez tous les utilisateurs de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-admin">
          <Card>
            <CardHeader>
              <CardTitle>Créer un administrateur</CardTitle>
              <CardDescription>
                Créez un compte administrateur avec des droits étendus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateSuperAdmin}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-4" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    "Créer un administrateur"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres système</CardTitle>
              <CardDescription>
                Configurez les paramètres globaux de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Nom du site</Label>
                    <Input id="siteName" defaultValue="Orientation Professionnelle" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email de contact</Label>
                    <Input id="contactEmail" type="email" defaultValue="contact@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenance">Mode maintenance</Label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="maintenance" className="h-4 w-4" />
                    <Label htmlFor="maintenance">Activer le mode maintenance</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
