
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
