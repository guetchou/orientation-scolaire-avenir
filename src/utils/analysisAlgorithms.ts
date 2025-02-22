
import { LearningStyleResults, EmotionalTestResults } from "@/types/dashboard";

export const analyzeLearningStyle = (answers: number[]): LearningStyleResults => {
  const categories = {
    visual: [0, 4, 8, 12],
    auditory: [1, 5, 9, 13],
    kinesthetic: [2, 6, 10, 14],
    reading: [3, 7, 11, 15]
  };

  const results: LearningStyleResults = {
    visual: 0,
    auditory: 0,
    kinesthetic: 0,
    reading: 0
  };

  Object.entries(categories).forEach(([category, indices]) => {
    const sum = indices.reduce((acc, index) => acc + (answers[index] || 0), 0);
    results[category as keyof LearningStyleResults] = Math.round((sum / (indices.length * 5)) * 100);
  });

  return results;
};

export const analyzeEmotionalIntelligence = (answers: number[]): EmotionalTestResults => {
  const categories = {
    selfAwareness: [0, 5, 10, 15, 20],
    selfRegulation: [1, 6, 11, 16, 21],
    motivation: [2, 7, 12, 17, 22],
    empathy: [3, 8, 13, 18, 23],
    socialSkills: [4, 9, 14, 19, 24]
  };

  const results: EmotionalTestResults = {
    selfAwareness: 0,
    selfRegulation: 0,
    motivation: 0,
    empathy: 0,
    socialSkills: 0
  };

  Object.entries(categories).forEach(([category, indices]) => {
    const sum = indices.reduce((acc, index) => acc + (answers[index] || 0), 0);
    results[category as keyof EmotionalTestResults] = Math.round((sum / (indices.length * 5)) * 100);
  });

  return results;
};

export const analyzeTestResults = async (userId: string) => {
  // Fonction d'analyse globale des résultats
  try {
    // Simuler quelques résultats d'analyse
    return {
      strengths: [
        "Forte capacité d'analyse",
        "Bon sens de l'organisation",
        "Communication efficace",
        "Adaptabilité"
      ],
      recommendations: [
        {
          field: "Sciences de l'ingénieur",
          score: 8.5,
          reason: "Vos compétences analytiques et votre capacité de résolution de problèmes correspondent bien à ce domaine.",
          matchingProfiles: 150
        },
        {
          field: "Gestion de projet",
          score: 7.8,
          reason: "Votre sens de l'organisation et vos compétences en communication sont des atouts majeurs.",
          matchingProfiles: 120
        },
        {
          field: "Communication",
          score: 7.2,
          reason: "Vos compétences interpersonnelles et votre adaptabilité sont très valorisées dans ce domaine.",
          matchingProfiles: 90
        }
      ]
    };
  } catch (error) {
    console.error("Erreur lors de l'analyse des résultats:", error);
    throw error;
  }
};
