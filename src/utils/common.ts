
// Common utility functions

// Generate unique IDs for messages
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Utility for calculating symptom similarity
export const calculateSymptomSimilarity = (userSymptoms: Set<string>, diseaseSymptoms: Set<string>): number => {
  const matchingSymptoms = new Set([...userSymptoms].filter(symptom => diseaseSymptoms.has(symptom)));
  const totalSymptoms = new Set([...userSymptoms, ...diseaseSymptoms]);
  
  // Convert matchingSymptoms to array before accessing length
  return Array.from(matchingSymptoms).length / Array.from(totalSymptoms).length;
};
