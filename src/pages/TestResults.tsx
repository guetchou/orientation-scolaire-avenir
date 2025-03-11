
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ClipboardCopy, AlertTriangle, Lock, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const TestResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const testId = new URLSearchParams(location.search).get('testId');

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user) {
          navigate('/login');
          return;
        }

        // Check if the user has paid for this test result
        if (testId) {
          const { data: paymentData, error: paymentError } = await supabase
            .from('payments')
            .select('*')
            .eq('user_id', user?.id)
            .eq('item_id', testId)
            .eq('status', 'COMPLETED')
            .single();

          if (paymentError && paymentError.code !== 'PGRST116') {
            console.error('Error checking payment status:', paymentError);
          }

          // If payment exists and is completed, show full results
          if (paymentData) {
            setHasPaid(true);
          }
        }

        const { data, error } = await supabase
          .from('test_results')
          .select('*')
          .eq('user_id', user.id)
          .eq('id', testId)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setTestResults(data);
      } catch (error: any) {
        console.error("Error fetching test results:", error);
        setError(error.message || "Failed to load test results.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults();

    // Cleanup function
    return () => {
      setTestResults(null);
      setLoading(false);
      setError(null);
    };
  }, [user, testId, navigate]);

  const getBadgeColor = (score: number): string => {
    if (score >= 80) return "text-green-700 bg-green-100 border-green-300";
    if (score >= 60) return "text-blue-700 bg-blue-100 border-blue-300";
    if (score >= 40) return "text-yellow-700 bg-yellow-100 border-yellow-300";
    return "text-red-700 bg-red-100 border-red-300";
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const handlePayment = async () => {
    try {
      setIsProcessingPayment(true);
      
      if (!user || !testId) {
        toast.error("Informations utilisateur ou test manquantes");
        return;
      }

      // Create a payment request
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          plan_id: 'premium_report',
          test_id: testId,
          test_type: testResults?.test_type || 'orientation',
          user_id: user.id
        }
      });

      if (error) {
        throw new Error(error.message || "Échec de la création du paiement");
      }

      if (data?.payment_url) {
        // Redirect to payment page
        navigate(`/payment?transaction_id=${data.transaction_id}&amount=${3500}`);
      } else {
        throw new Error("Aucune URL de paiement reçue");
      }
    } catch (error: any) {
      console.error("Error processing payment:", error);
      toast.error(error.message || "Échec du traitement du paiement");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-4 w-2/4 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-6">
            {Array.from({length: 4}).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-1/4" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="shadow-lg border-0 border-red-200">
          <CardContent className="text-center p-8">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-red-700 mb-2">Erreur de chargement</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => navigate('/dashboard')} variant="outline">
              Retour au tableau de bord
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!testResults) {
    return (
      <div className="container mx-auto p-4">
        <Card className="shadow-lg border-0">
          <CardContent className="text-center p-8">
            <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-600 mb-4">Nous n'avons pas pu trouver les résultats du test demandé.</p>
            <Button onClick={() => navigate('/tests')} variant="outline">
              Voir tous les tests
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const results = testResults.results || {};

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Résultats du Test</CardTitle>
          <CardDescription>
            {hasPaid 
              ? "Voici vos résultats détaillés complets." 
              : "Voici un aperçu de vos résultats. Obtenez l'analyse complète en débloquant le rapport."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(results).map(([key, value]: [string, any], index) => (
            <div key={key} className={`space-y-2 ${!hasPaid && index > 1 ? 'opacity-50' : ''}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold capitalize">{key.replace(/_/g, ' ')}</h3>
                <Badge className={getBadgeColor(value.score)} variant="outline">
                  {value.score}%
                </Badge>
              </div>
              <Progress value={value.score} />
              <p className="text-sm text-gray-500">
                {hasPaid || index <= 1 
                  ? value.description 
                  : index === 2 
                    ? value.description.substring(0, 100) + '...' 
                    : '••••••••••••••••••••••••••••••••••'}
              </p>
              {value.details && hasPaid && (
                <div className="mt-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => copyToClipboard(value.details, "Détails copiés!")}
                  >
                    <ClipboardCopy className="h-4 w-4 mr-2" />
                    Afficher les détails
                  </Button>
                </div>
              )}
              {!hasPaid && index > 1 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}

          {!hasPaid && (
            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="text-lg font-semibold mb-2 text-center">Débloquer le rapport complet</h3>
              <p className="text-sm text-gray-600 mb-4 text-center">
                Accédez à l'analyse détaillée de vos résultats et obtenez des recommandations personnalisées pour votre orientation.
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={handlePayment} 
                  disabled={isProcessingPayment}
                  className="px-6"
                >
                  {isProcessingPayment ? "Traitement en cours..." : "Payer 3500 FC pour le rapport complet"}
                </Button>
              </div>
              <p className="text-xs text-center mt-4 text-gray-500">
                Paiement sécurisé par Airtel Money, MTN Mobile Money ou carte bancaire
              </p>
            </div>
          )}

          {hasPaid && (
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Retour au tableau de bord
              </Button>
              <Button onClick={() => window.print()}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Exporter en PDF
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResults;
