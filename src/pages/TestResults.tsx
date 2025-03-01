
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { analyzeTestResults } from "@/utils/analysisAlgorithms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  FileText, 
  History, 
  Trophy, 
  Download,
  Brain,
  User,
  ChartBar,
  Printer 
} from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface TestResult {
  id: string;
  test_type: string;
  results: Record<string, number>;
  created_at: string;
}

const TestResults = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non connecté");

      const { data: results, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTestResults(results as TestResult[]);

      const analysisResults = await analyzeTestResults(user.id);
      setAnalysis(analysisResults);
    } catch (error) {
      console.error("Erreur lors de la récupération des résultats:", error);
      toast.error("Erreur lors du chargement des résultats");
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = async () => {
    try {
      const element = document.getElementById("results-container");
      if (!element) return;

      toast.info("Génération du PDF en cours...");

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resultats-tests-orientation.pdf");

      toast.success("PDF exporté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'export PDF:", error);
      toast.error("Erreur lors de la génération du PDF");
    }
  };

  const printResults = () => {
    try {
      toast.info("Préparation de l'impression...");
      window.print();
      toast.success("Impression lancée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'impression:", error);
      toast.error("Erreur lors de l'impression");
    }
  };

  const renderRiasecResults = (results: Record<string, number>) => {
    const data = Object.entries(results).map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
    }));

    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Résultats des Tests</h1>
        <div className="flex gap-2">
          <Button onClick={printResults}>
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </Button>
          <Button onClick={exportToPDF}>
            <Download className="w-4 h-4 mr-2" />
            Exporter en PDF
          </Button>
        </div>
      </div>

      <div id="results-container" className="space-y-6">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">
              <ChartBar className="w-4 h-4 mr-2" />
              Résumé
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="w-4 h-4 mr-2" />
              Historique
            </TabsTrigger>
            <TabsTrigger value="details">
              <FileText className="w-4 h-4 mr-2" />
              Détails
            </TabsTrigger>
            <TabsTrigger value="recommendations">
              <Trophy className="w-4 h-4 mr-2" />
              Recommandations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Vos points forts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysis?.strengths && (
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-primary rounded-full" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Dernier test RIASEC
                </CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.find(test => test.test_type === "RIASEC" || test.test_type === "riasec")?.results && 
                  renderRiasecResults(testResults.find(test => test.test_type === "RIASEC" || test.test_type === "riasec")!.results)
                }
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique des tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testResults.length > 0 ? (
                    testResults.map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{test.test_type}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(test.created_at).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Voir les détails
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">Aucun test complété pour le moment.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {testResults.length > 0 ? (
              testResults.map((test) => (
                <Card key={test.id}>
                  <CardHeader>
                    <CardTitle>{test.test_type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(test.test_type === "RIASEC" || test.test_type === "riasec") && renderRiasecResults(test.results)}
                    {test.test_type === "learning_style" && (
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(test.results).map(([style, score]) => (
                          <div key={style} className="p-4 border rounded-lg">
                            <p className="font-medium capitalize">{style}</p>
                            <p className="text-2xl font-bold">{Math.round(score as number * 100)}%</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {test.test_type === "emotional" && (
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(test.results).map(([skill, score]) => (
                          <div key={skill} className="p-4 border rounded-lg">
                            <p className="font-medium capitalize">{skill}</p>
                            <p className="text-2xl font-bold">{Math.round(score as number * 100)}%</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500">Aucun test complété pour le moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            {analysis?.recommendations && analysis.recommendations.length > 0 ? (
              analysis.recommendations.map((rec: any) => (
                <Card key={rec.field}>
                  <CardHeader>
                    <CardTitle>{rec.field}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Score de compatibilité</p>
                        <p className="text-2xl font-bold">{Math.round(rec.score * 100)}%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Pourquoi ce domaine ?</p>
                        <p className="text-gray-700">{rec.reason}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Profils similaires</p>
                        <p className="text-gray-700">{rec.matchingProfiles} personnes ont un profil similaire</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500">Complétez au moins un test pour recevoir des recommandations personnalisées.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <style jsx global>{`
        @media print {
          nav, footer, button, .hidden-print {
            display: none !important;
          }
          
          body * {
            visibility: hidden;
          }
          
          #results-container, #results-container * {
            visibility: visible;
          }
          
          #results-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default TestResults;
