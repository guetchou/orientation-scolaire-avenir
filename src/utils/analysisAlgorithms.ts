import { supabase } from "@/integrations/supabase/client";
import { TestResult } from "@/types/supabase";
import { Profile } from "@/types/supabase";
import { LearningStyleResults, EmotionalTestResults } from "@/types/dashboard";

interface UserProfile extends Profile {
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
    const { data: testResults, error: testError } = await supabase
      .from('test_results')
      .select('*')
      .eq('user_id', userId);

    if (testError) throw testError;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;

    const strengths = analyzeStrengths(testResults as TestResult[], profile as UserProfile);
    const recommendations = await generateCareerRecommendations(testResults as TestResult[], profile as UserProfile);
    const suggestedTests = suggestNextTests(testResults as TestResult[]);

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

const analyzeStrengths = (testResults: TestResult[], profile: UserProfile): string[] => {
  const strengths: string[] = [];

  const riasecTest = testResults.find(test => test.test_type === "RIASEC");
  if (riasecTest && riasecTest.results) {
    const results = riasecTest.results as Record<string, number>;
    const topRiasecScores = Object.entries(results)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2);

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

  const learningTest = testResults.find(test => test.test_type === "learning_style");
  if (learningTest && learningTest.results) {
    const results = learningTest.results as LearningStyleResults;
    const topLearningStyle = Object.entries(results)
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

  const emotionalTest = testResults.find(test => test.test_type === "emotional");
  if (emotionalTest && emotionalTest.results) {
    const results = emotionalTest.results as EmotionalTestResults;
    if (results.selfAwareness > 7) strengths.push("Intelligence émotionnelle élevée");
    if (results.empathy > 7) strengths.push("Grande capacité d'empathie");
  }

  return Array.from(new Set(strengths));
};

const generateCareerRecommendations = async (
  testResults: TestResult[],
  profile: UserProfile
): Promise<CareerRecommendation[]> => {
  const recommendations: CareerRecommendation[] = [];

  const riasecTest = testResults.find(test => test.test_type === "RIASEC");
  if (riasecTest && riasecTest.results) {
    const topCodes = Object.entries(riasecTest.results)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([code]) => code);

    const careerFields: Record<string, string[]> = {
      "R": ["Ingénierie", "Technologies", "Construction"],
      "I": ["Recherche", "Sciences", "Médecine"],
      "A": ["Design", "Arts", "Communication"],
      "S": ["Éducation", "Santé", "Services sociaux"],
      "E": ["Management", "Vente", "Entrepreneuriat"],
      "C": ["Finance", "Administration", "Logistique"]
    };

    topCodes.forEach(code => {
      const fields = careerFields[code] || [];
      fields.forEach(field => {
        recommendations.push({
          field,
          score: riasecTest.results[code] / 10,
          reason: `Fort alignement avec votre profil ${code} (${careerFields[code]?.join(", ")})`,
          matchingProfiles: Math.floor(Math.random() * 50) + 50
        });
      });
    });
  }

  const learningTest = testResults.find(test => test.test_type === "learning_style");
  if (learningTest && learningTest.results) {
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

  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};

const suggestNextTests = (testResults: TestResult[]): string[] => {
  const allTests = ["RIASEC", "learning_style", "emotional", "personality"];
  const completedTests = new Set(testResults.map(test => test.test_type));
  
  const missingTests = allTests.filter(test => !completedTests.has(test));

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
