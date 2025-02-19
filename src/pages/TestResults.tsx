
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Share2, Printer, Book, BookOpen, Brain, GraduationCap } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface TestResults {
  [key: string]: number;
}

interface LocationState {
  results: TestResults;
  testType: string;
}

export default function TestResults() {
  const location = useLocation();
  const { results, testType } = (location.state as LocationState) || { results: {}, testType: '' };

  const getTestIcon = () => {
    switch (testType) {
      case 'riasec':
        return <GraduationCap className="w-8 h-8 text-primary" />;
      case 'emotional':
        return <Brain className="w-8 h-8 text-primary" />;
      case 'multiple_intelligence':
        return <Book className="w-8 h-8 text-primary" />;
      case 'learning_style':
        return <BookOpen className="w-8 h-8 text-primary" />;
      default:
        return <GraduationCap className="w-8 h-8 text-primary" />;
    }
  };

  const getTestTitle = () => {
    switch (testType) {
      case 'riasec':
        return "Résultats du Test RIASEC";
      case 'emotional':
        return "Résultats du Test d'Intelligence Émotionnelle";
      case 'multiple_intelligence':
        return "Résultats du Test des Intelligences Multiples";
      case 'learning_style':
        return "Résultats du Test de Style d'Apprentissage";
      default:
        return "Résultats du Test";
    }
  };

  const getTestDescription = () => {
    switch (testType) {
      case 'riasec':
        return "Votre profil professionnel selon la théorie de Holland (RIASEC)";
      case 'emotional':
        return "Analyse de vos compétences émotionnelles";
      case 'multiple_intelligence':
        return "Vos types d'intelligence dominants selon la théorie de Gardner";
      case 'learning_style':
        return "Votre style d'apprentissage préférentiel";
      default:
        return "Analyse détaillée de vos résultats";
    }
  };

  const formatResultsForChart = () => {
    return Object.entries(results).map(([key, value]) => ({
      name: key.toUpperCase(),
      value: value,
      fullMark: 3,
    }));
  };

  const handleDownload = () => {
    const resultsText = Object.entries(results)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${testType}_results.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: getTestTitle(),
          text: "Découvrez mes résultats du test d'orientation !",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Erreur lors du partage:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </Link>

        <Card className="mb-8">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-4">
              {getTestIcon()}
              <div>
                <CardTitle className="text-2xl">{getTestTitle()}</CardTitle>
                <p className="text-gray-600">{getTestDescription()}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleDownload} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Télécharger PDF
              </Button>
              <Button onClick={handlePrint} variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
              <Button onClick={handleShare} variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-[300px]">
                <p className="text-lg font-semibold mb-4">Graphique en barres</p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={formatResultsForChart()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="h-[300px]">
                <p className="text-lg font-semibold mb-4">Graphique radar</p>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={formatResultsForChart()}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Résultats"
                      dataKey="value"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <h3 className="text-xl font-semibold">Résultats détaillés</h3>
              {Object.entries(results).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="text-primary font-semibold">{value}/3</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${(value / 3) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    {getResultDescription(key, value)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommandations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {getRecommendations(results, testType).map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prochaines étapes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {getNextSteps(testType).map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const getResultDescription = (key: string, value: number): string => {
  if (value >= 2.5) return "Très développé - C'est l'un de vos points forts.";
  if (value >= 2) return "Bien développé - Vous avez de bonnes capacités dans ce domaine.";
  if (value >= 1.5) return "Moyennement développé - Il y a un potentiel d'amélioration.";
  return "Peu développé - Ce domaine mérite une attention particulière.";
};

const getRecommendations = (results: TestResults, testType: string): string[] => {
  switch (testType) {
    case 'riasec':
      return [
        "Explorez les métiers correspondant à vos scores les plus élevés",
        "Rencontrez des professionnels dans ces domaines",
        "Recherchez des formations adaptées à votre profil",
        "Développez vos compétences dans ces domaines"
      ];
    case 'emotional':
      return [
        "Pratiquez la reconnaissance des émotions",
        "Développez votre empathie au quotidien",
        "Apprenez à gérer le stress",
        "Améliorez votre communication interpersonnelle"
      ];
    default:
      return [
        "Identifiez vos points forts",
        "Travaillez sur vos points d'amélioration",
        "Définissez des objectifs de développement",
        "Suivez régulièrement vos progrès"
      ];
  }
};

const getNextSteps = (testType: string): string[] => {
  switch (testType) {
    case 'riasec':
      return [
        "Prendre rendez-vous avec un conseiller d'orientation",
        "Explorer les formations recommandées",
        "Participer à des journées portes ouvertes",
        "Effectuer des stages de découverte"
      ];
    case 'emotional':
      return [
        "Suivre des ateliers de développement personnel",
        "Pratiquer la méditation et la pleine conscience",
        "Tenir un journal émotionnel",
        "Participer à des groupes de discussion"
      ];
    default:
      return [
        "Analyser vos résultats en détail",
        "Établir un plan d'action personnel",
        "Fixer des objectifs SMART",
        "Programmer un suivi régulier"
      ];
  }
};
