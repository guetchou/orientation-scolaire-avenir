import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ClipboardCopy, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const TestResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPaid, setHasPaid] = useState(false);
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

    // Cleanup function (optional, but good practice)
    return () => {
      setTestResults(null);
      setLoading(false);
      setError(null);
    };
  }, [user, testId]);

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

  if (loading) {
    return <div className="text-center">Loading test results...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <AlertTriangle className="inline-block h-6 w-6 mr-2 mb-1" />
        {error}
      </div>
    );
  }

  if (!testResults) {
    return <div className="text-center">No test results found.</div>;
  }

  const results = testResults.results || {};

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Résultats du Test</CardTitle>
          <CardDescription>
            Voici vos résultats détaillés.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(results).map(([key, value]: [string, any]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold capitalize">{key.replace(/_/g, ' ')}</h3>
                <Badge className={getBadgeColor(value.score)} variant="outline" >
                  {value.score}%
                </Badge>
              </div>
              <Progress value={value.score} />
              <p className="text-sm text-gray-500">{value.description}</p>
              {value.details && (
                <div className="mt-2">
                  <Button variant="secondary" size="sm" onClick={() => copyToClipboard(value.details, "Détails copiés!")}>
                    <ClipboardCopy className="h-4 w-4 mr-2" />
                    Afficher les détails
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      {!hasPaid && (
        <div className="mt-4 text-center text-gray-500">
          <p>
            Pour accéder à l'intégralité de vos résultats et obtenir des conseils personnalisés, veuillez effectuer le paiement.
          </p>
          <Button onClick={() => navigate('/payment')}>Payer pour voir les résultats complets</Button>
        </div>
      )}
    </div>
  );
};

export default TestResults;
