
// Utility for calculating symptom similarity
const calculateSymptomSimilarity = (userSymptoms: Set<string>, diseaseSymptoms: Set<string>): number => {
  const matchingSymptoms = new Set([...userSymptoms].filter(symptom => diseaseSymptoms.has(symptom)));
  const totalSymptoms = new Set([...userSymptoms, ...diseaseSymptoms]);
  
  // Fix: Convert matchingSymptoms to array before accessing length
  return Array.from(matchingSymptoms).length / Array.from(totalSymptoms).length;
};

// Generate unique IDs for messages
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Sample database of diseases and their symptoms
const diseaseDatabase = [
  {
    disease: "Common Cold",
    symptoms: new Set(["runny nose", "sneezing", "cough", "sore throat", "headache", "mild fever"])
  },
  {
    disease: "Influenza (Flu)",
    symptoms: new Set(["high fever", "body aches", "fatigue", "headache", "cough", "sore throat"])
  },
  {
    disease: "COVID-19",
    symptoms: new Set(["fever", "dry cough", "fatigue", "loss of taste", "loss of smell", "shortness of breath"])
  },
  {
    disease: "Migraine",
    symptoms: new Set(["severe headache", "sensitivity to light", "nausea", "vomiting"])
  },
  {
    disease: "Allergic Rhinitis",
    symptoms: new Set(["sneezing", "runny nose", "itchy eyes", "congestion"])
  }
];

// Common symptom misspellings and aliases
const symptomAliases: Record<string, string[]> = {
  "headache": ["head ache", "headach", "head pain", "migrane", "migranes"],
  "fever": ["high temperature", "febril", "feaver", "hot"],
  "cough": ["coughing", "caugh", "coff"],
  "fatigue": ["tired", "tiredness", "exhaustion", "no energy"],
  "sore throat": ["throat pain", "painful throat", "throat hurts"],
  "runny nose": ["runny noze", "nose running", "drippy nose"],
  "shortness of breath": ["can't breathe", "difficulty breathing", "hard to breathe"],
  "nausea": ["feel sick", "want to vomit", "queasy", "nauseated"],
  "vomiting": ["throwing up", "puking", "vomit"],
  "diarrhea": ["diarrhoea", "loose stool", "watery stool"],
};

// Calculate Levenshtein distance for fuzzy matching
const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
};

// Calculate similarity ratio for two strings
const similarityRatio = (a: string, b: string): number => {
  const distance = levenshteinDistance(a, b);
  const maxLength = Math.max(a.length, b.length);
  return maxLength === 0 ? 1 : 1 - distance / maxLength;
};

// Extract symptoms from user message with fuzzy matching
export const identifySymptoms = (message: string): { symptom: string, confidence: number }[] => {
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

// Predict diseases based on symptoms
export const predictDisease = (symptoms: Set<string>): { disease: string, probability: number, relatedSymptoms: string[] }[] => {
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

// Generate response based on user message
export const generateResponse = (message: string): { text: string, predictions: { disease: string, probability: number, relatedSymptoms: string[] }[] } => {
  // Extract symptoms from the message
  const identifiedSymptomEntities = identifySymptoms(message);
  const identifiedSymptoms = new Set(identifiedSymptomEntities.map(entity => entity.symptom));
  
  // No symptoms identified
  if (identifiedSymptoms.size === 0) {
    return {
      text: "I couldn't identify any specific symptoms in your message. Could you please provide more details about how you're feeling?",
      predictions: []
    };
  }
  
  // Predict diseases based on identified symptoms
  const predictions = predictDisease(identifiedSymptoms);
  
  // Generate response text
  let responseText = `I've identified the following symptoms: ${[...identifiedSymptoms].join(', ')}. `;
  
  if (predictions.length > 0) {
    responseText += `Based on these symptoms, you might be experiencing: `;
    
    // Add top 3 predictions to the response
    const topPredictions = predictions.slice(0, 3);
    topPredictions.forEach((prediction, index) => {
      const probability = Math.round(prediction.probability * 100);
      responseText += `${prediction.disease} (${probability}% match)`;
      
      if (index < topPredictions.length - 1) {
        responseText += ", ";
      }
    });
    
    responseText += `. `;
    
    // Add disclaimer
    responseText += `Please note that this is not a medical diagnosis. If you're concerned about your symptoms, please consult with a healthcare provider.`;
  } else {
    responseText += `I couldn't find any specific conditions matching these symptoms in my database. If you're concerned, please consult with a healthcare provider.`;
  }
  
  return {
    text: responseText,
    predictions
  };
};

export { calculateSymptomSimilarity };
