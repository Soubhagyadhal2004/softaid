import { Message, SymptomEntity, TrainingData, Intent, DiseasePrediction } from '@/types/chat';

// Healthcare training dataset
const healthcareData: TrainingData = {
  intents: [
    {
      tag: "cold",
      patterns: ["I have a runny nose", "Sneezing a lot", "My nose is blocked"],
      responses: ["You might have a common cold. Stay hydrated, rest, and consider using a decongestant."]
    },
    {
      tag: "flu",
      patterns: ["High fever", "Body ache and chills", "Feeling very weak", "Cough and sore throat"],
      responses: ["Sounds like flu. Please rest, drink fluids, and consult a doctor if symptoms persist."]
    },
    {
      tag: "covid",
      patterns: ["Loss of taste", "Shortness of breath", "Dry cough", "Tested positive for COVID"],
      responses: ["These symptoms may indicate COVID-19. Isolate and consult a healthcare professional."]
    },
    {
      tag: "diabetes",
      patterns: ["Frequent urination", "Excessive thirst", "Sudden weight loss"],
      responses: ["You may be showing signs of diabetes. A blood sugar test is recommended."]
    },
    {
      tag: "hypertension",
      patterns: ["High blood pressure", "Headache", "Blurred vision", "Chest pain"],
      responses: ["These could be symptoms of hypertension. Please check your BP and consult a doctor."]
    },
    {
      tag: "malaria",
      patterns: ["Chills and shivering", "Sweating after fever", "Nausea and vomiting", "Muscle pain"],
      responses: ["Malaria is a possibility. A blood test will confirm. Please visit a hospital immediately."]
    },
    {
      tag: "typhoid",
      patterns: ["Persistent high fever", "Abdominal pain", "Fatigue", "Loss of appetite"],
      responses: ["These could be symptoms of typhoid. Please consult a doctor for further diagnosis."]
    },
    {
      tag: "migraine",
      patterns: ["Throbbing headache", "Nausea with headache", "Light sensitivity", "Severe one-sided headache"],
      responses: ["You might be experiencing a migraine. Rest in a quiet, dark room and take prescribed meds."]
    },
    {
      tag: "asthma",
      patterns: ["Breathlessness", "Chest tightness", "Wheezing sound while breathing"],
      responses: ["You may have asthma. Please avoid triggers and consider using an inhaler."]
    },
    {
      tag: "pneumonia",
      patterns: ["Chest pain when breathing", "Cough with phlegm", "Rapid breathing", "Fever and chills"],
      responses: ["Sounds like pneumonia. Seek medical help and get a chest X-ray if needed."]
    },
    {
      tag: "dengue",
      patterns: ["High fever with rash", "Pain behind the eyes", "Bleeding gums", "Low platelet count"],
      responses: ["Dengue could be the cause. Please get a blood test and avoid aspirin-based medicines."]
    },
    {
      tag: "depression",
      patterns: ["Feeling sad all the time", "Lack of interest in activities", "No energy", "Insomnia"],
      responses: ["These may be signs of depression. Talking to a therapist or counselor is strongly recommended."]
    },
    {
      tag: "allergy",
      patterns: ["Skin rashes", "Sneezing with itchy eyes", "Red spots on skin", "Reaction to food or pollen"],
      responses: ["You may have an allergy. Try to identify and avoid triggers and use antihistamines if needed."]
    },
    {
      tag: "acidity",
      patterns: ["Burning sensation in chest", "Acid reflux", "Stomach discomfort after eating"],
      responses: ["This sounds like acidity. Avoid spicy foods and try antacids."]
    },
    {
      tag: "ulcer",
      patterns: ["Burning stomach pain", "Pain improves when eating", "Frequent burping"],
      responses: ["Possibly a stomach ulcer. A doctor can confirm with an endoscopy."]
    },
    {
      tag: "healthy",
      patterns: ["I feel fine", "No symptoms", "I'm healthy"],
      responses: ["That's great to hear! Let me know if you have any health-related concerns in the future."]
    }
  ]
};

// Symptom to disease mapping for our neural network simulation
const symptomDiseaseMapping: Record<string, string[]> = {
  "runny nose": ["cold", "allergy"],
  "sneezing": ["cold", "allergy"],
  "blocked nose": ["cold", "sinusitis"],
  "fever": ["flu", "covid", "malaria", "typhoid", "dengue", "pneumonia"],
  "high fever": ["flu", "typhoid", "dengue", "malaria"],
  "body ache": ["flu", "dengue", "malaria"],
  "chills": ["flu", "malaria", "pneumonia"],
  "weakness": ["flu", "typhoid", "malaria"],
  "cough": ["flu", "covid", "pneumonia", "asthma"],
  "sore throat": ["flu", "cold"],
  "dry cough": ["covid", "asthma"],
  "loss of taste": ["covid"],
  "shortness of breath": ["covid", "asthma", "pneumonia"],
  "frequent urination": ["diabetes"],
  "excessive thirst": ["diabetes"],
  "weight loss": ["diabetes", "typhoid"],
  "headache": ["hypertension", "migraine", "flu", "dengue"],
  "blurred vision": ["hypertension", "migraine"],
  "chest pain": ["hypertension", "pneumonia", "asthma"],
  "shivering": ["malaria"],
  "sweating": ["malaria", "flu"],
  "nausea": ["malaria", "migraine", "dengue", "typhoid"],
  "vomiting": ["malaria", "dengue", "typhoid"],
  "muscle pain": ["malaria", "flu", "dengue"],
  "abdominal pain": ["typhoid", "ulcer", "acidity"],
  "fatigue": ["typhoid", "flu", "depression", "diabetes"],
  "loss of appetite": ["typhoid", "depression"],
  "throbbing headache": ["migraine"],
  "light sensitivity": ["migraine"],
  "one-sided headache": ["migraine"],
  "breathlessness": ["asthma", "pneumonia"],
  "chest tightness": ["asthma", "pneumonia"],
  "wheezing": ["asthma"],
  "phlegm": ["pneumonia", "cold"],
  "rapid breathing": ["pneumonia", "asthma"],
  "rash": ["dengue", "allergy"],
  "pain behind eyes": ["dengue"],
  "bleeding gums": ["dengue"],
  "low platelet": ["dengue"],
  "sad": ["depression"],
  "lack of interest": ["depression"],
  "no energy": ["depression", "anemia"],
  "insomnia": ["depression", "anxiety"],
  "skin rashes": ["allergy"],
  "itchy eyes": ["allergy"],
  "red spots": ["allergy", "measles"],
  "burning sensation": ["acidity", "ulcer"],
  "acid reflux": ["acidity"],
  "stomach discomfort": ["acidity", "ulcer"],
  "burning pain": ["ulcer"],
  "burping": ["ulcer", "acidity"]
};

// Disease information for educational responses
const diseaseInfo: Record<string, string> = {
  "cold": "The common cold is a viral infection of your nose and throat. It's usually harmless, although it might not feel that way.",
  "flu": "Influenza is a viral infection that attacks your respiratory system. People at higher risk of developing complications include young children and older adults.",
  "covid": "COVID-19 is caused by the SARS-CoV-2 virus and can affect different people in different ways. Most infected people develop mild to moderate symptoms.",
  "diabetes": "Diabetes is a metabolic disease that causes high blood sugar. The hormone insulin moves sugar from the blood into your cells to be stored or used for energy.",
  "hypertension": "High blood pressure is a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems.",
  "malaria": "Malaria is a disease caused by parasites that enter your body through the bite of an infected mosquito. Symptoms usually appear within 10-15 days after the bite.",
  "typhoid": "Typhoid fever is caused by Salmonella typhi bacteria and is spread through contaminated food, water, or close contact with an infected person.",
  "migraine": "A migraine is a headache that can cause severe throbbing pain or a pulsing sensation, usually on one side of the head. It's often accompanied by nausea, vomiting, and sensitivity to light and sound.",
  "asthma": "Asthma is a condition in which your airways narrow and swell and may produce extra mucus, making breathing difficult and triggering coughing and wheezing.",
  "pneumonia": "Pneumonia is an infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus, causing cough, fever, chills, and difficulty breathing.",
  "dengue": "Dengue fever is a mosquito-borne tropical disease caused by the dengue virus. Symptoms typically begin 3-14 days after infection and may include high fever, headache, vomiting, muscle and joint pains, and a skin rash.",
  "depression": "Depression is a mental health disorder characterized by persistently depressed mood or loss of interest in activities, causing significant impairment in daily life.",
  "allergy": "An allergy is an immune system response to a foreign substance that's not typically harmful to your body. These substances are called allergens and can include certain foods, pollen, or pet dander.",
  "acidity": "Acidity occurs when there is excess secretion of acids in the gastric glands of the stomach, producing gas, bad breath, stomach ache and other symptoms.",
  "ulcer": "A peptic ulcer is an open sore on the inside lining of the stomach and the upper portion of the small intestine. The most common symptom is abdominal pain.",
  "sinusitis": "Sinusitis is an inflammation or swelling of the tissue lining the sinuses. Healthy sinuses are filled with air. But when they become blocked and filled with fluid, germs can grow and cause an infection."
};

// Neural network word embeddings simulation
// In a real implementation, this would use actual word embeddings from a model like Word2Vec or GloVe
const extractKeywords = (text: string): string[] => {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  
  // List of common stopwords to filter out
  const stopwords = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", 
    "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", 
    "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", 
    "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", 
    "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", 
    "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", 
    "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", 
    "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", 
    "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", 
    "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", 
    "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"];
  
  return words.filter(word => !stopwords.includes(word) && word.length > 2);
};

// Identify symptoms from text using keyword extraction and matching
export const identifySymptoms = (text: string): SymptomEntity[] => {
  const keywords = extractKeywords(text);
  const foundSymptoms: SymptomEntity[] = [];
  
  // Check for exact symptom matches
  const lowerText = text.toLowerCase();
  
  // First check for multi-word symptoms
  for (const symptom of Object.keys(symptomDiseaseMapping)) {
    if (symptom.includes(" ")) {
      if (lowerText.includes(symptom)) {
        foundSymptoms.push({
          symptom,
          confidence: 0.9 // High confidence for exact multi-word matches
        });
      }
    }
  }
  
  // Then check for single-word symptoms in our keywords
  for (const keyword of keywords) {
    for (const symptom of Object.keys(symptomDiseaseMapping)) {
      if (!symptom.includes(" ") && (symptom === keyword || symptom.includes(keyword) || keyword.includes(symptom))) {
        // Check if we already added this symptom (from multi-word check)
        if (!foundSymptoms.some(s => s.symptom === symptom)) {
          foundSymptoms.push({
            symptom,
            confidence: symptom === keyword ? 0.85 : 0.7 // Higher confidence for exact matches
          });
        }
      }
    }
  }
  
  // Check for approximate matches and symptoms that might be described differently
  const symptomContexts: Record<string, string[]> = {
    "headache": ["head hurts", "head pain", "head is pounding", "head is throbbing"],
    "fever": ["feeling hot", "temperature", "burning up", "hot"],
    "nausea": ["feeling sick", "want to throw up", "stomach turning"],
    "fatigue": ["tired", "exhausted", "no energy", "weak", "lethargic"],
    "cough": ["coughing", "throat irritation", "hacking"],
    "vomiting": ["throwing up", "puking", "bringing up food"]
  };
  
  for (const [symptom, contexts] of Object.entries(symptomContexts)) {
    for (const context of contexts) {
      if (lowerText.includes(context)) {
        // Check if we already added this symptom
        if (!foundSymptoms.some(s => s.symptom === symptom)) {
          foundSymptoms.push({
            symptom,
            confidence: 0.65 // Lower confidence for contextual matches
          });
        }
      }
    }
  }
  
  return foundSymptoms;
};

// Neural network simulation for disease prediction
export const predictDisease = (symptoms: SymptomEntity[]): DiseasePrediction[] => {
  // Skip prediction if no symptoms found
  if (symptoms.length === 0) {
    return [];
  }
  
  const diseaseScores: Record<string, { score: number, symptoms: Set<string> }> = {};
  
  // Calculate disease scores based on matched symptoms
  for (const { symptom, confidence } of symptoms) {
    const relatedDiseases = symptomDiseaseMapping[symptom] || [];
    
    for (const disease of relatedDiseases) {
      if (!diseaseScores[disease]) {
        diseaseScores[disease] = { score: 0, symptoms: new Set() };
      }
      // Weight the symptom by its confidence
      diseaseScores[disease].score += confidence;
      diseaseScores[disease].symptoms.add(symptom);
    }
  }
  
  // Normalize scores to get probabilities
  let totalScore = 0;
  const predictions: DiseasePrediction[] = [];
  
  for (const [disease, { score, symptoms }] of Object.entries(diseaseScores)) {
    // Only include diseases with at least 2 matching symptoms, unless there's only 1 symptom total
    if (symptoms.size >= 2 || (symptoms.size === 1 && symptoms.size === symptoms.length)) {
      totalScore += score;
      predictions.push({
        disease,
        probability: score,
        relatedSymptoms: Array.from(symptoms)
      });
    }
  }
  
  // Sort by probability (descending) and normalize
  return predictions
    .sort((a, b) => b.probability - a.probability)
    .map(prediction => ({
      ...prediction,
      probability: totalScore > 0 ? 
        parseFloat((prediction.probability / totalScore).toFixed(2)) : 0
    }))
    .slice(0, 3); // Return top 3 predictions
};

// Calculate similarity score between two strings
const calculateSimilarity = (str1: string, str2: string): number => {
  const lowerStr1 = str1.toLowerCase();
  const lowerStr2 = str2.toLowerCase();
  
  // Simple word match scoring
  const words1 = lowerStr1.split(/\s+/);
  const words2 = lowerStr2.split(/\s+/);
  
  let matchCount = 0;
  words1.forEach(word => {
    if (words2.includes(word) && word.length > 2) {
      matchCount++;
    }
  });
  
  // Calculate similarity percentage
  return matchCount / Math.max(words1.length, words2.length);
};

// Find the best matching intent for a given user message
const findBestIntent = (userMessage: string): Intent | null => {
  const lowerUserMessage = userMessage.toLowerCase();
  let bestMatch: { intent: Intent, score: number } | null = null;
  
  healthcareData.intents.forEach(intent => {
    intent.patterns.forEach(pattern => {
      const similarity = calculateSimilarity(pattern, lowerUserMessage);
      
      // Check if this is a better match than what we've found so far
      if (similarity > 0.3 && (!bestMatch || similarity > bestMatch.score)) {
        bestMatch = { intent, score: similarity };
      }
    });
  });
  
  return bestMatch ? bestMatch.intent : null;
};

// Generate a detailed response based on disease predictions
const generateDiseaseResponse = (predictions: DiseasePrediction[]): string => {
  if (predictions.length === 0) {
    return "I couldn't identify any specific condition based on the information provided. Could you share more details about your symptoms?";
  }
  
  const topPrediction = predictions[0];
  const diseaseInfo = getDiseaseInfo(topPrediction.disease);
  
  let response = `Based on your description, you may be experiencing **${formatDiseaseName(topPrediction.disease)}** (${(topPrediction.probability * 100).toFixed(0)}% probability).\n\n`;
  
  response += `${diseaseInfo}\n\n`;
  
  if (predictions.length > 1) {
    response += "Other possibilities include:\n";
    for (let i = 1; i < predictions.length; i++) {
      response += `- **${formatDiseaseName(predictions[i].disease)}** (${(predictions[i].probability * 100).toFixed(0)}% probability)\n`;
    }
    response += "\n";
  }
  
  response += "**Important**: This is not a medical diagnosis. Please consult a healthcare professional for proper evaluation and treatment.";
  
  return response;
};

// Format disease name to be more readable
const formatDiseaseName = (disease: string): string => {
  return disease.charAt(0).toUpperCase() + disease.slice(1);
};

// Get educational information about a disease
const getDiseaseInfo = (disease: string): string => {
  return diseaseInfo[disease] || "No detailed information available for this condition.";
};

// Generate a response based on identified intent or disease predictions
export const generateResponse = (userMessage: string): { text: string, predictions: DiseasePrediction[] } => {
  // Greeting message response
  if (userMessage.toLowerCase().match(/^(hi|hello|hey|greetings)/)) {
    return { 
      text: getRandomResponse(medicalResponses.greeting),
      predictions: []
    };
  }
  
  // Extract symptoms from user message
  const symptoms = identifySymptoms(userMessage);
  
  // Predict diseases based on symptoms
  const predictions = predictDisease(symptoms);
  
  // Generate response based on predictions
  if (predictions.length > 0) {
    return {
      text: generateDiseaseResponse(predictions),
      predictions
    };
  }
  
  // If no disease predictions, fall back to intent matching
  const bestIntent = findBestIntent(userMessage);
  
  if (bestIntent) {
    return {
      text: getRandomResponse(bestIntent.responses),
      predictions: []
    };
  }
  
  // Fallback responses if no intent is matched
  if (userMessage.length < 10) {
    return {
      text: getRandomResponse(medicalResponses.notUnderstood),
      predictions: []
    };
  }
  
  return {
    text: getRandomResponse(medicalResponses.general),
    predictions: []
  };
};

// Simulated medical knowledge base for fallback responses
const medicalResponses = {
  greeting: [
    "Hello! I'm your Health Savvy AI. How can I assist you today?",
    "Welcome to Health Savvy. How are you feeling today?",
    "Hi there! I'm here to help with your health questions. What's on your mind?"
  ],
  
  notUnderstood: [
    "I'm not sure I understand your health concern. Could you provide more details?",
    "I'm still learning about that. Could you describe your symptoms more specifically?",
    "I don't have enough information about that yet. Can you tell me more about what you're experiencing?"
  ],
  
  general: [
    "I recommend consulting with a healthcare professional for personalized advice on your condition.",
    "While I can provide information, it's important to see a doctor for proper diagnosis and treatment.",
    "Based on what you've shared, it might be helpful to track your symptoms and discuss them with your physician."
  ]
};

// Helper function to get a random response from an array
const getRandomResponse = (responses: string[]): string => {
  return responses[Math.floor(Math.random() * responses.length)];
};

// Generate a unique ID for messages
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
