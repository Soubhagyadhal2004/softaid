
import { DiseasePrediction } from '@/types/chat';
import { diseaseDatabase } from './medicalData';
import { calculateSymptomSimilarity } from './common';

// Predict diseases based on symptoms
export const predictDisease = (symptoms: Set<string>): DiseasePrediction[] => {
  if (symptoms.size === 0) return [];
  
  const predictions = diseaseDatabase.map(disease => {
    const similarity = calculateSymptomSimilarity(symptoms, disease.symptoms);
    const matchingSymptoms = [...symptoms].filter(symptom => disease.symptoms.has(symptom));
    
    return {
      disease: disease.disease,
      probability: similarity,
      relatedSymptoms: matchingSymptoms
    };
  });
  
  // Return sorted predictions with probability > 0
  return predictions
    .filter(prediction => prediction.probability > 0)
    .sort((a, b) => b.probability - a.probability);
};
