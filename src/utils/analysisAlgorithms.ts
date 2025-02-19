import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface TestResult {
  id: string;
  user_id: string;
  test_type: string;
  results: Json;
  answers?: number[];
  created_at: string;
  updated_at: string;
}

interface UserProfile {
  id: string;
  department: string;
  interests?: string;
  education?: string;
  experience?: string;
  email?: string;
}

export interface CareerRecommendation {
  field: string;
  score: number;
  reason: string;
  matchingProfiles: number;
}

export const analyzeTestResults = async (userId: string): Promise<{
  strengths: string[];
  recommendations: CareerRecommendation[];
  suggestedTests: string[];
}> => {
  try {
    // Récupérer tous les résultats de tests de l'utilisateur
    const { data: testResults, error: testError } = await supabase
      .from("test_results")
      .select("*")
      .eq("user_id", userId);

    if (testError) throw testError;

    // Récupérer le profil de l'utilisateur
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) throw profileError;

    // Analyser les forces principales
    const strengths = analyzeStrengths(testResults, profile);

    // Générer des recommandations de carrière
    const recommendations = await generateCareerRecommendations(testResults, profile);

    // Identifier les tests manquants ou à refaire
    const suggestedTests = suggestNextTests(testResults);

    return {
      strengths,
      recommendations,
      suggestedTests,
    };
  } catch (error) {
    console.error("Erreur lors de l'analyse:", error);
    throw error;
  }
};

// Analyse des forces basée sur les résultats des tests
const analyzeStrengths = (testResults: TestResult[], profile: UserProfile): string[] => {
  const strengths: string[] = [];

  // Analyse des résultats RIASEC
  const riasecTest = testResults.find(test => test.test_type === "RIASEC");
  if (riasecTest && riasecTest.results) {
    const results = riasecTest.results as Record<string, number>;
    const topRiasecScores = Object.entries(results)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2);

    // Mapper les codes RIASEC avec des forces
    const riasecStrengths: Record<string, string> = {
      "R": "Capacités techniques et pratiques",
      "I": "Capacités analytiques et de recherche",
      "A": "Créativité et expression artistique",
      "S": "Compétences sociales et d'aide",
      "E": "Leadership et entrepreneuriat",
      "C": "Organisation et méthode"
    };

    topRiasecScores.forEach(([code]) => {
      if (riasecStrengths[code]) {
        strengths.push(riasecStrengths[code]);
      }
    });
  }

  // Analyse du style d'apprentissage
  const learningTest = testResults.find(test => test.test_type === "learning_style");
  if (learningTest && learningTest.results) {
    const topLearningStyle = Object.entries(learningTest.results)
      .sort(([, a], [, b]) => b - a)[0];

    const learningStrengths: Record<string, string> = {
      "visual": "Apprentissage visuel et spatial",
      "auditory": "Communication et écoute active",
      "reading": "Analyse et synthèse de l'information",
      "kinesthetic": "Apprentissage pratique et expérimental"
    };

    if (learningStrengths[topLearningStyle[0]]) {
      strengths.push(learningStrengths[topLearningStyle[0]]);
    }
  }

  // Analyse de l'intelligence émotionnelle
  const emotionalTest = testResults.find(test => test.test_type === "emotional");
  if (emotionalTest && emotionalTest.results) {
    const { selfAwareness, empathy } = emotionalTest.results;
    if (selfAwareness > 7) strengths.push("Intelligence émotionnelle élevée");
    if (empathy > 7) strengths.push("Grande capacité d'empathie");
  }

  return Array.from(new Set(strengths)); // Éliminer les doublons
};

// Génération de recommandations de carrière
const generateCareerRecommendations = async (
  testResults: TestResult[],
  profile: UserProfile
): Promise<CareerRecommendation[]> => {
  const recommendations: CareerRecommendation[] = [];

  // Trouver les domaines les plus pertinents basés sur les résultats RIASEC
  const riasecTest = testResults.find(test => test.test_type === "RIASEC");
  if (riasecTest && riasecTest.results) {
    const topCodes = Object.entries(riasecTest.results)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([code]) => code);

    // Matcher les codes RIASEC avec des domaines professionnels
    const careerFields: Record<string, string[]> = {
      "R": ["Ingénierie", "Technologies", "Construction"],
      "I": ["Recherche", "Sciences", "Médecine"],
      "A": ["Design", "Arts", "Communication"],
      "S": ["Éducation", "Santé", "Services sociaux"],
      "E": ["Management", "Vente", "Entrepreneuriat"],
      "C": ["Finance", "Administration", "Logistique"]
    };

    // Générer des recommandations basées sur les codes dominants
    topCodes.forEach(code => {
      const fields = careerFields[code] || [];
      fields.forEach(field => {
        recommendations.push({
          field,
          score: riasecTest.results[code] / 10, // Score sur 10
          reason: `Fort alignement avec votre profil ${code} (${careerFields[code]?.join(", ")})`,
          matchingProfiles: Math.floor(Math.random() * 50) + 50 // Simulation de données
        });
      });
    });
  }

  // Affiner les recommandations avec le style d'apprentissage
  const learningTest = testResults.find(test => test.test_type === "learning_style");
  if (learningTest && learningTest.results) {
    // Ajuster les scores en fonction du style d'apprentissage
    recommendations.forEach(rec => {
      if (learningTest.results.visual > 7 && 
          ["Design", "Arts", "Architecture"].includes(rec.field)) {
        rec.score += 1;
      }
      if (learningTest.results.kinesthetic > 7 && 
          ["Sports", "Médecine", "Construction"].includes(rec.field)) {
        rec.score += 1;
      }
    });
  }

  // Analyser l'intelligence émotionnelle pour les métiers relationnels
  const emotionalTest = testResults.find(test => test.test_type === "emotional");
  if (emotionalTest && emotionalTest.results) {
    const { empathy, selfAwareness } = emotionalTest.results;
    if (empathy > 7 && selfAwareness > 7) {
      recommendations.push({
        field: "Psychologie",
        score: 8.5,
        reason: "Excellentes compétences en intelligence émotionnelle",
        matchingProfiles: Math.floor(Math.random() * 30) + 20
      });
    }
  }

  // Trier et retourner les meilleures recommandations
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};

// Suggestion des prochains tests à passer
const suggestNextTests = (testResults: TestResult[]): string[] => {
  const allTests = ["RIASEC", "learning_style", "emotional", "personality"];
  const completedTests = new Set(testResults.map(test => test.test_type));
  
  // Tests manquants
  const missingTests = allTests.filter(test => !completedTests.has(test));

  // Tests à refaire (plus vieux que 6 mois)
  const testsToRetake = testResults
    .filter(test => {
      const testDate = new Date(test.created_at);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return testDate < sixMonthsAgo;
    })
    .map(test => `${test.test_type} (à refaire)`);

  return [...missingTests, ...testsToRetake];
};
