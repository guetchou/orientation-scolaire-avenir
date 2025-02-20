
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Vérifier l'état de l'authentification actuelle
    const checkAuth = async () => {
      try {
        const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          throw authError;
        }

        setUser(currentUser);
      } catch (err) {
        console.error('Erreur de vérification auth:', err);
        setError(err as Error);
        toast.error("Erreur lors de la vérification de l'authentification");
      } finally {
        setLoading(false);
      }
    };

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    checkAuth();

    // Nettoyer la souscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        toast.success('Connexion réussie !');
      }
      
      return data;
    } catch (err) {
      console.error('Erreur de connexion:', err);
      toast.error("Erreur lors de la connexion");
      throw err;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      
      if (data.user) {
        toast.success('Inscription réussie ! Veuillez vérifier votre email.');
      }
      
      return data;
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      toast.error("Erreur lors de l'inscription");
      throw err;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Déconnexion réussie');
    } catch (err) {
      console.error('Erreur de déconnexion:', err);
      toast.error('Erreur lors de la déconnexion');
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      toast.success('Email de réinitialisation envoyé !');
    } catch (err) {
      console.error('Erreur de réinitialisation du mot de passe:', err);
      toast.error('Erreur lors de la réinitialisation du mot de passe');
      throw err;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      toast.success('Mot de passe mis à jour avec succès');
    } catch (err) {
      console.error('Erreur de mise à jour du mot de passe:', err);
      toast.error('Erreur lors de la mise à jour du mot de passe');
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };
}
