import { LearningStyleResults, EmotionalTestResults, TestResult } from "@/types/dashboard";

export function analyzeLearningStyle(answers: Record<string, number>): LearningStyleResults {
  // Calculer les scores pour chaque style d'apprentissage
  let visual = 0;
  let auditory = 0;
  let kinesthetic = 0;

  // Supposons que les questions sont réparties par style
  Object.entries(answers).forEach(([questionId, value]) => {
    if (questionId.startsWith('v')) visual += value;
    else if (questionId.startsWith('a')) auditory += value;
    else if (questionId.startsWith('k')) kinesthetic += value;
  });

  // Déterminer les styles primaire et secondaire
  const styles = [
    { type: 'visual', score: visual },
    { type: 'auditory', score: auditory },
    { type: 'kinesthetic', score: kinesthetic }
  ].sort((a, b) => b.score - a.score);

  return {
    visual,
    auditory,
    kinesthetic,
    primary: styles[0].type,
    secondary: styles[1].type
  };
}

export function analyzeEmotionalIntelligence(answers: Record<string, number>): EmotionalTestResults {
  // Calculer les scores pour chaque compétence émotionnelle
  let selfAwareness = 0;
  let selfRegulation = 0;
  let motivation = 0;
  let empathy = 0;
  let socialSkills = 0;

  // Supposons que les questions sont catégorisées par compétence
  Object.entries(answers).forEach(([questionId, value]) => {
    if (questionId.startsWith('sa')) selfAwareness += value;
    else if (questionId.startsWith('sr')) selfRegulation += value;
    else if (questionId.startsWith('mo')) motivation += value;
    else if (questionId.startsWith('em')) empathy += value;
    else if (questionId.startsWith('ss')) socialSkills += value;
  });

  // Calculer le score global
  const overallScore = (selfAwareness + selfRegulation + motivation + empathy + socialSkills) / 5;

  return {
    selfAwareness,
    selfRegulation,
    motivation,
    empathy,
    socialSkills,
    overallScore
  };
}

export function analyzeTestResults(testType: string, answers: Record<string, number>): TestResult {
  switch(testType) {
    case 'learning-style':
      return {
        type: 'learning-style',
        data: analyzeLearningStyle(answers)
      };
    case 'emotional':
      return {
        type: 'emotional',
        data: analyzeEmotionalIntelligence(answers)
      };
    case 'riasec':
      // We'll return a placeholder for RIASEC tests
      return {
        type: 'riasec',
        data: {
          realistic: calculateCategoryScore(answers, 'r'),
          investigative: calculateCategoryScore(answers, 'i'),
          artistic: calculateCategoryScore(answers, 'a'),
          social: calculateCategoryScore(answers, 's'),
          enterprising: calculateCategoryScore(answers, 'e'),
          conventional: calculateCategoryScore(answers, 'c')
        }
      };
    case 'multiple-intelligence':
      // Placeholder for multiple intelligence
      return {
        type: 'multiple-intelligence',
        data: {
          linguistic: calculateCategoryScore(answers, 'ling'),
          logical: calculateCategoryScore(answers, 'log'),
          spatial: calculateCategoryScore(answers, 'spat'),
          musical: calculateCategoryScore(answers, 'mus'),
          bodily: calculateCategoryScore(answers, 'bod'),
          interpersonal: calculateCategoryScore(answers, 'inter'),
          intrapersonal: calculateCategoryScore(answers, 'intra'),
          naturalist: calculateCategoryScore(answers, 'nat')
        }
      };
    default:
      throw new Error(`Unknown test type: ${testType}`);
  }
}

function calculateCategoryScore(answers: Record<string, number>, prefix: string): number {
  let score = 0;
  let count = 0;
  
  Object.entries(answers).forEach(([questionId, value]) => {
    if (questionId.startsWith(prefix)) {
      score += value;
      count++;
    }
  });
  
  return count > 0 ? score / count : 0;
}
