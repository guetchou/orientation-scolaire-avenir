
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { analyzeTestResults } from "@/utils/analysisAlgorithms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2, Brain, Trophy, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TestResults = () => {
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour voir vos résultats");
        navigate("/login");
        return;
      }

      // Récupérer les résultats des tests
      const { data: results, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTestResults(results || []);

      // Analyser les résultats
      const analysisResults = await analyzeTestResults(user.id);
      setAnalysis(analysisResults);

    } catch (error) {
      console.error('Erreur lors de la récupération des résultats:', error);
      toast.error("Erreur lors du chargement des résultats");
    } finally {
      setLoading(false);
    }
  };

  const formatRiasecData = (results: any) => {
    if (!results?.results) return [];
    return Object.entries(results.results).map(([name, value]) => ({
      name,
      value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const riasecResults = testResults.find(test => test.test_type === 'RIASEC');

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Résultats et Analyses</h1>

      {analysis && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Vos points forts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.strengths.map((strength: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-primary rounded-full" />
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Recommandations de carrière
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.recommendations.map((rec: any, index: number) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{rec.field}</span>
                      <span className="text-sm text-gray-500">
                        Score: {rec.score.toFixed(1)}/10
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{rec.reason}</p>
                    <p className="text-xs text-gray-500">
                      {rec.matchingProfiles} profils similaires
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {riasecResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Résultats RIASEC
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formatRiasecData(riasecResults)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {analysis?.suggestedTests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tests suggérés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.suggestedTests.map((test: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => navigate(`/${test.toLowerCase().split(' ')[0]}-test`)}
                >
                  Passer le test {test}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestResults;
