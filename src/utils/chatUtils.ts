
import { Message, SymptomEntity, TrainingData, Intent } from '@/types/chat';

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

// Identify possible symptoms in the text
export const identifySymptoms = (text: string): SymptomEntity[] => {
  const symptoms = ['headache', 'fever', 'cough', 'fatigue', 'sore throat'];
  const foundSymptoms: SymptomEntity[] = [];
  
  const lowerText = text.toLowerCase();
  
  symptoms.forEach(symptom => {
    if (lowerText.includes(symptom)) {
      // Simulate confidence levels
      foundSymptoms.push({
        symptom,
        confidence: Math.random() * 0.3 + 0.7 // Random confidence between.7 and 1.0
      });
    }
  });
  
  return foundSymptoms;
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

// Generate a response based on identified intent or general input
export const generateResponse = (userMessage: string): string => {
  // Greeting message response
  if (userMessage.toLowerCase().match(/^(hi|hello|hey|greetings)/)) {
    return getRandomResponse(medicalResponses.greeting);
  }
  
  // Try to find the best matching intent
  const bestIntent = findBestIntent(userMessage);
  
  if (bestIntent) {
    return getRandomResponse(bestIntent.responses);
  }
  
  // Fallback responses if no intent is matched
  if (userMessage.length < 10) {
    return getRandomResponse(medicalResponses.notUnderstood);
  }
  
  return getRandomResponse(medicalResponses.general);
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
