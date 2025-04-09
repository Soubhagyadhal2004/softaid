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

// Training data for medicine recommendations
const medicineIntents: TrainingData = {
  intents: [
    {
      tag: "cold",
      patterns: ["I have a runny nose", "Sneezing a lot", "My nose is blocked"],
      responses: [
        "You may have a common cold. Try steam inhalation and stay warm.",
        "Over-the-counter meds like Cetirizine or Paracetamol may help.",
        "Do you also have a fever or sore throat?"
      ]
    },
    {
      tag: "flu",
      patterns: ["High fever", "Body ache and chills", "Cough and sore throat"],
      responses: [
        "Sounds like flu. Rest well, drink warm fluids, and take paracetamol.",
        "If symptoms worsen, antiviral drugs like Oseltamivir may be prescribed.",
        "Are you experiencing breathlessness or chest pain as well?"
      ]
    },
    {
      tag: "covid",
      patterns: ["Loss of taste", "Shortness of breath", "Dry cough", "COVID symptoms"],
      responses: [
        "These could be COVID-19 symptoms. Please isolate and get tested.",
        "Take antipyretics, stay hydrated, and monitor oxygen levels.",
        "Have you been vaccinated or tested recently?"
      ]
    },
    {
      tag: "malaria",
      patterns: ["Chills and shivering", "Fever that comes and goes", "Muscle pain", "Sweating"],
      responses: [
        "You may have malaria. A blood test will confirm the diagnosis.",
        "Start taking prescribed anti-malarials like Artemisinin combination therapy (ACT).",
        "Are you experiencing nausea or vomiting as well?"
      ]
    },
    {
      tag: "typhoid",
      patterns: ["High fever for days", "Abdominal pain", "Feeling very weak", "Constipation or diarrhea"],
      responses: [
        "You could have typhoid. A Widal test is suggested.",
        "Ciprofloxacin or Cefixime may be prescribed based on severity.",
        "Is the fever persistent or fluctuating?"
      ]
    },
    {
      tag: "migraine",
      patterns: ["Throbbing headache", "Pain on one side", "Light sensitivity", "Aura before headache"],
      responses: [
        "Sounds like a migraine. Rest in a quiet dark room and avoid screen time.",
        "You can try medications like Sumatriptan or Naproxen.",
        "Do you also experience nausea or blurred vision?"
      ]
    },
    {
      tag: "asthma",
      patterns: ["Wheezing", "Chest tightness", "Shortness of breath", "Difficulty in breathing"],
      responses: [
        "This may be asthma. Avoid dusty environments and known allergens.",
        "Use prescribed inhalers like Salbutamol during attacks.",
        "Do you have a history of asthma or allergies?"
      ]
    },
    {
      tag: "dengue",
      patterns: ["Severe body pain", "High fever", "Rashes", "Bleeding gums", "Low platelet count"],
      responses: [
        "Dengue might be the issue. Avoid aspirin and get platelet count checked regularly.",
        "Use paracetamol for fever, rest well, and stay hydrated with ORS.",
        "Have you noticed any bleeding or bruising?"
      ]
    },
    {
      tag: "depression",
      patterns: ["Feeling low", "No energy", "Hopelessness", "I can't sleep", "Loss of interest"],
      responses: [
        "You might be experiencing depression. Talk to a mental health professional.",
        "SSRIs like Sertraline or CBT therapy might help. Avoid self-diagnosing.",
        "Have these feelings been constant for more than 2 weeks?"
      ]
    },
    {
      tag: "acidity",
      patterns: ["Heartburn", "Acid reflux", "Burning in chest after food"],
      responses: [
        "This could be acidity. Avoid spicy foods and eat smaller meals.",
        "Antacids like Pantoprazole or Ranitidine may help.",
        "Do you also experience bloating or burping?"
      ]
    },
    {
      tag: "ulcer",
      patterns: ["Stomach pain", "Pain after eating", "Nausea", "Frequent burping"],
      responses: [
        "Possible peptic ulcer. A gastroscopy can confirm it.",
        "Take antacids or PPIs like Omeprazole after doctor's advice.",
        "Are you taking any painkillers frequently?"
      ]
    },
    {
      tag: "healthy",
      patterns: ["I'm fine", "I feel good", "No health issues"],
      responses: [
        "That's great! Stay hydrated, eat well, and do regular checkups.",
        "Happy to hear you're feeling well! Would you like health tips?"
      ]
    }
  ]
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

// Function to find the most relevant intent based on the user's message
const findIntent = (message: string): Intent | null => {
  let bestMatch: { intent: Intent, score: number } | null = null;
  const normalizedMessage = message.toLowerCase();

  for (const intent of medicineIntents.intents) {
    // Check each pattern in the intent
    for (const pattern of intent.patterns) {
      // Calculate similarity between message and pattern
      const score = similarityRatio(normalizedMessage, pattern.toLowerCase());
      
      // If exact match or very high confidence (over 0.8)
      if (score > 0.8) {
        // If this is the best match so far, update bestMatch
        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { intent, score };
        }
        
        // If it's an exact match, return immediately
        if (score > 0.95) {
          return intent;
        }
      }
    }
  }

  // If we found a good match, return it
  return bestMatch ? bestMatch.intent : null;
}

// Get medicine recommendations based on intent
const getMedicineRecommendation = (intent: Intent): string => {
  // Randomly select one of the responses for this intent
  const randomIndex = Math.floor(Math.random() * intent.responses.length);
  return intent.responses[randomIndex];
}

// Generate response based on user message
export const generateResponse = (message: string): { text: string, predictions: { disease: string, probability: number, relatedSymptoms: string[] }[] } => {
  // Extract symptoms from the message
  const identifiedSymptomEntities = identifySymptoms(message);
  const identifiedSymptoms = new Set(identifiedSymptomEntities.map(entity => entity.symptom));
  
  // Look for intent match for medicine recommendations
  const matchedIntent = findIntent(message);
  
  // No symptoms identified
  if (identifiedSymptoms.size === 0 && !matchedIntent) {
    return {
      text: "I couldn't identify any specific symptoms in your message. Could you please provide more details about how you're feeling?",
      predictions: []
    };
  }
  
  let responseText = "";
  const predictions = predictDisease(identifiedSymptoms);

  // If we found a matching intent, use that for a personalized response with medicine recommendations
  if (matchedIntent) {
    responseText = getMedicineRecommendation(matchedIntent);
    
    // If we also identified symptoms, add that information
    if (identifiedSymptoms.size > 0) {
      responseText += `\n\nI've also identified these symptoms: ${[...identifiedSymptoms].join(', ')}. `;
      
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
      }
    }
  } else {
    // Fall back to the original symptom-based response
    responseText = `I've identified the following symptoms: ${[...identifiedSymptoms].join(', ')}. `;
    
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
    } else {
      responseText += `I couldn't find any specific conditions matching these symptoms in my database.`;
    }
  }
  
  // Add disclaimer
  responseText += ` Please note that this is not a medical diagnosis. If you're concerned about your symptoms, please consult with a healthcare provider.`;
  
  return {
    text: responseText,
    predictions
  };
};

export { calculateSymptomSimilarity };
