
import { LearningStyleResults, EmotionalTestResults } from "@/types/dashboard";

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
