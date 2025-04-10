
import { diseaseDatabase } from './medicalData';
import { symptomAliases } from './textAugmentation';
import { preprocessText, similarityRatio } from './nlp';

// Extract symptoms from user message with fuzzy matching
export const identifySymptoms = (message: string): { symptom: string, confidence: number }[] => {
  // Apply NLP preprocessing
  const preprocessedMessage = preprocessText(message).join(' ');
  
  const words = message.toLowerCase().split(/\W+/).filter(word => word.length > 2);
  const phrases = [];
  
  // Create phrases from the message (1-3 words)
  for (let i = 0; i < words.length; i++) {
    phrases.push(words[i]);
    if (i < words.length - 1) phrases.push(`${words[i]} ${words[i + 1]}`);
    if (i < words.length - 2) phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }
  
  const identifiedSymptoms: { symptom: string, confidence: number }[] = [];
  const allSymptoms = new Set<string>();
  
  // Collect all symptoms from the database
  diseaseDatabase.forEach(disease => {
    disease.symptoms.forEach(symptom => allSymptoms.add(symptom));
  });
  
  // Check for exact matches and aliases first
  for (const symptom of allSymptoms) {
    // Check for exact match
    if (message.toLowerCase().includes(symptom)) {
      identifiedSymptoms.push({ symptom, confidence: 1.0 });
      continue;
    }
    
    // Check for aliases
    const aliases = symptomAliases[symptom] || [];
    let aliasFound = false;
    
    for (const alias of aliases) {
      if (message.toLowerCase().includes(alias)) {
        identifiedSymptoms.push({ symptom, confidence: 0.95 });
        aliasFound = true;
        break;
      }
    }
    
    if (aliasFound) continue;
    
    // Use fuzzy matching for remaining symptoms
    for (const phrase of phrases) {
      const similarity = similarityRatio(phrase, symptom);
      if (similarity > 0.8) {
        identifiedSymptoms.push({ symptom, confidence: similarity });
        break;
      }
    }
  }
  
  // Sort by confidence and return unique symptoms
  return identifiedSymptoms
    .sort((a, b) => b.confidence - a.confidence)
    .filter((symptom, index, self) => 
      index === self.findIndex(s => s.symptom === symptom.symptom)
    );
};
