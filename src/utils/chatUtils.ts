
import { Message, SymptomEntity } from '@/types/chat';

// Simulated medical knowledge base
const medicalResponses = {
  greeting: [
    "Hello! I'm your Health Savvy AI. How can I assist you today?",
    "Welcome to Health Savvy. How are you feeling today?",
    "Hi there! I'm here to help with your health questions. What's on your mind?"
  ],
  
  symptoms: {
    headache: [
      "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or more serious conditions. How long have you been experiencing this?",
      "I understand you're having a headache. Is it concentrated in a specific area? Is it throbbing, sharp, or dull?"
    ],
    fever: [
      "Fever is often a sign that your body is fighting an infection. What's your temperature, and do you have any other symptoms?",
      "Fever can be a response to infection or inflammation. Are you experiencing chills, sweating, or weakness as well?"
    ],
    cough: [
      "A cough could be due to various causes like a cold, allergies, or respiratory conditions. Is it dry or productive with mucus?",
      "How long have you been coughing? Is it worse at certain times of the day or when you do certain activities?"
    ],
    fatigue: [
      "Fatigue can stem from many causes including lack of sleep, stress, anemia, or underlying health conditions. How long have you been feeling tired?",
      "Persistent fatigue might need medical attention. Have you noticed any other changes in your health or daily energy levels?"
    ],
    "sore throat": [
      "Sore throats are commonly caused by viral infections, but can also be due to bacterial infections or allergies. Do you have any other cold-like symptoms?",
      "Is your sore throat accompanied by difficulty swallowing, fever, or swollen glands in your neck?"
    ]
  },
  
  general: [
    "I recommend consulting with a healthcare professional for personalized advice on your condition.",
    "While I can provide information, it's important to see a doctor for proper diagnosis and treatment.",
    "Based on what you've shared, it might be helpful to track your symptoms and discuss them with your physician."
  ],
  
  notUnderstood: [
    "I'm not sure I understand your health concern. Could you provide more details?",
    "I'm still learning about that. Could you describe your symptoms more specifically?",
    "I don't have enough information about that yet. Can you tell me more about what you're experiencing?"
  ]
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
        confidence: Math.random() * 0.3 + 0.7 // Random confidence between 0.7 and 1.0
      });
    }
  });
  
  return foundSymptoms;
};

// Generate a response based on identified symptoms or general input
export const generateResponse = (userMessage: string): string => {
  const symptoms = identifySymptoms(userMessage);
  
  // Greeting message response
  if (userMessage.toLowerCase().match(/^(hi|hello|hey|greetings)/)) {
    return getRandomResponse(medicalResponses.greeting);
  }
  
  // If symptoms are identified
  if (symptoms.length > 0) {
    // Sort by confidence and take the highest one
    const topSymptom = symptoms.sort((a, b) => b.confidence - a.confidence)[0];
    
    // Get responses for the identified symptom
    const symptomResponses = medicalResponses.symptoms[topSymptom.symptom as keyof typeof medicalResponses.symptoms];
    if (symptomResponses) {
      return getRandomResponse(symptomResponses);
    }
  }
  
  // If no clear symptoms or no specific response available
  if (userMessage.length < 10) {
    return getRandomResponse(medicalResponses.notUnderstood);
  }
  
  return getRandomResponse(medicalResponses.general);
};

// Helper function to get a random response from an array
const getRandomResponse = (responses: string[]): string => {
  return responses[Math.floor(Math.random() * responses.length)];
};

// Generate a unique ID for messages
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
