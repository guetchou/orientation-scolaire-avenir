
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
    interests: "",
    experience: "",
    education: "",
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Utilisateur non connecté");
        navigate("/login");
        return;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          department: formData.role || 'etudiant',
          status: 'active',
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          bio: formData.bio,
          interests: formData.interests,
          experience: formData.experience,
          education: formData.education,
          updated_at: new Date().toISOString(),
          email: user.email,
        });

      if (updateError) {
        toast.error("Erreur lors de la mise à jour du profil");
        console.error(updateError);
        return;
      }

      toast.success("Profil complété avec succès !");
      
      switch (formData.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "conseiller":
          navigate("/conseiller/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Rôle",
      content: (
        <div className="space-y-4">
          <Label>Quel est votre rôle ?</Label>
          <Select value={formData.role} onValueChange={(value) => updateFormData("role", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="etudiant">Étudiant</SelectItem>
              <SelectItem value="conseiller">Conseiller d'orientation</SelectItem>
              <SelectItem value="admin">Administrateur</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    },
    {
      title: "Informations personnelles",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => updateFormData("firstName", e.target.value)}
              placeholder="Votre prénom"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => updateFormData("lastName", e.target.value)}
              placeholder="Votre nom"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              placeholder="Votre numéro de téléphone"
            />
          </div>
        </div>
      )
    },
    {
      title: "Profil détaillé",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Biographie</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => updateFormData("bio", e.target.value)}
              placeholder="Parlez-nous un peu de vous..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interests">Centres d'intérêt</Label>
            <Textarea
              id="interests"
              value={formData.interests}
              onChange={(e) => updateFormData("interests", e.target.value)}
              placeholder="Vos centres d'intérêt..."
            />
          </div>
        </div>
      )
    },
    {
      title: "Parcours",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="education">Formation</Label>
            <Textarea
              id="education"
              value={formData.education}
              onChange={(e) => updateFormData("education", e.target.value)}
              placeholder="Votre parcours de formation..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Expérience</Label>
            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => updateFormData("experience", e.target.value)}
              placeholder="Vos expériences professionnelles..."
            />
          </div>
        </div>
      )
    }
  ];

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!formData.role;
      case 2:
        return !!formData.firstName && !!formData.lastName;
      case 3:
        return !!formData.bio;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {steps[step - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {steps[step - 1].content}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(s => s - 1)}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Précédent
                </Button>
              )}
              <div className="flex-1" />
              {step < steps.length ? (
                <Button
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canProceed()}
                >
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !canProceed()}
                >
                  Terminer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Onboarding;
