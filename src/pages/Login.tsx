import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { ArrowLeft, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRedirect = async (userId: string) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, onboarding_completed')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error("Erreur lors de la récupération du profil:", profileError);
        navigate("/dashboard");
        return;
      }

      if (!profile.onboarding_completed) {
        navigate("/onboarding");
        return;
      }

      switch (profile.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "conseiller":
          navigate("/conseiller/dashboard");
          break;
        case "etudiant":
          navigate("/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erreur lors de la redirection:", error);
      navigate("/dashboard");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!isSupabaseConfigured()) {
      toast.error("La connexion à Supabase n'est pas configurée");
      setLoading(false);
      return;
    }

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Veuillez entrer une adresse email valide");
      setLoading(false);
      return;
    }
    
    try {
      const { data: authData, error: signInError } = await supabase!.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("Erreur de connexion:", signInError);
        if (signInError.message === "Invalid login credentials") {
          setError("Email ou mot de passe incorrect");
        } else {
          setError(signInError.message);
        }
        return;
      }

      if (authData?.user) {
        toast.success("Connexion réussie !");
        await handleRedirect(authData.user.id);
      }
    } catch (error: any) {
      console.error("Erreur inattendue:", error);
      setError("Une erreur inattendue s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <Card className="p-8">
            <CardContent className="p-0 space-y-8">
              <div>
                <h2 className="text-center text-3xl font-heading font-bold text-gray-900">
                  Connexion
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Accédez à votre espace personnel d'orientation
                </p>
                {!isSupabaseConfigured() && (
                  <div className="mt-4 p-4 bg-red-50 rounded-md">
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      La connexion à Supabase n'est pas configurée. Veuillez configurer l'intégration Supabase.
                    </p>
                  </div>
                )}
              </div>

              <form className="space-y-6" onSubmit={handleLogin}>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-md bg-red-50 p-4"
                  >
                    <p className="text-sm text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </p>
                  </motion.div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vous@exemple.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Mot de passe
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-primary hover:text-primary/80"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Votre mot de passe"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full relative"
                    disabled={loading || !isSupabaseConfigured()}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Connexion en cours...
                      </>
                    ) : (
                      "Se connecter"
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Ou</span>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">
                      Pas encore de compte ?{" "}
                      <Link to="/register" className="font-medium text-primary hover:text-primary/80">
                        Inscrivez-vous gratuitement
                      </Link>
                    </p>
                    <p className="text-xs text-gray-500">
                      En vous connectant, vous acceptez nos{" "}
                      <a href="#" className="underline hover:text-gray-700">
                        conditions d'utilisation
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
