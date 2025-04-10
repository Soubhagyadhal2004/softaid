
import { ConversationType } from '@/types/chat';

// Conversation patterns to identify different types of user input
export const conversationPatterns = {
  greeting: [
    'hi', 'hello', 'hey', 'hi there', 'hello there', 'greetings', 'good morning', 
    'good afternoon', 'good evening', 'howdy', 'sup', 'what\'s up'
  ],
  smallTalk: [
    'how are you', 'how\'s it going', 'what\'s up', 'how are you doing', 
    'how do you feel', 'how is your day', 'how\'s your day'
  ],
  aboutBot: [
    'who are you', 'what are you', 'are you a doctor', 'are you an ai', 
    'what can you do', 'tell me about yourself', 'your name', 'what\'s your name',
    'what are you capable of', 'what should I call you'
  ],
  howItWorks: [
    'how do you work', 'how accurate are you', 'how do you know', 
    'how do you predict', 'how do you identify', 'how reliable are you'
  ],
  help: [
    'help', 'i need help', 'can you help me', 'assist me', 'i need assistance',
    'i feel sick', 'i don\'t feel well', 'feeling sick', 'need doctor',
    'medical help', 'medical advice', 'health concern'
  ],
  thankYou: [
    'thanks', 'thank you', 'appreciate it', 'thank', 'thanks a lot', 
    'thank you very much', 'grateful', 'you\'re helpful'
  ],
  exit: [
    'bye', 'goodbye', 'see you', 'talk later', 'exit', 'quit', 'leave',
    'end', 'finish', 'stop', 'that\'s all'
  ]
};

// Response templates for different conversation types
export const conversationResponses = {
  greeting: [
    "Hello! How are you feeling today?",
    "Hi there! How can I help with your health concerns today?",
    "Hey! I'm here to help with any health questions. How are you?"
  ],
  smallTalk: [
    "I'm doing great, thanks for asking! 😊 How are you feeling today?",
    "I'm well, thanks! More importantly, how are you doing?",
    "All good on my end! I'm here and ready to help with any health concerns."
  ],
  aboutBot: [
    "I'm your friendly health assistant powered by AI. I help people understand symptoms and guide them toward possible conditions. How can I help you today?",
    "I'm an AI health assistant designed to help with symptom analysis and provide general health information. I'm not a doctor, but I can give you helpful insights about your health concerns."
  ],
  howItWorks: [
    "I analyze the symptoms you describe and compare them to a database of conditions. My neural network helps me predict possible matches, but remember I'm not a substitute for professional medical advice.",
    "I use natural language processing to identify symptoms in what you tell me, then match those to known conditions. My predictions are just to help guide you - always consult a healthcare provider for proper diagnosis."
  ],
  help: [
    "I'm here to help! Could you describe what you're experiencing? Even small details about your symptoms can be useful.",
    "I'd be happy to assist you. What symptoms are you experiencing? The more details you can share, the better I can help."
  ],
  thankYou: [
    "You're welcome! I'm always here if you need help with health questions.",
    "Happy to help! Is there anything else you'd like to know?",
    "Anytime! Your health matters, and I'm here whenever you need assistance."
  ],
  exit: [
    "Take care! Feel free to come back if you have any health questions.",
    "Goodbye! Wishing you the best of health. I'm here whenever you need assistance.",
    "See you later! Remember, I'm always here if you need health guidance."
  ]
};

// Identify conversation type based on user message
export const identifyConversationType = (message: string): ConversationType => {
  const lowerMessage = message.toLowerCase();
  
  // Check each conversation pattern category
  for (const [type, patterns] of Object.entries(conversationPatterns)) {
    for (const pattern of patterns) {
      if (lowerMessage.includes(pattern)) {
        return type as ConversationType;
      }
    }
  }
  
  // Default to symptom if no other pattern matches
  return ConversationType.Symptom;
};

// Get appropriate response for conversation type
export const getConversationResponse = (type: ConversationType): string => {
  if (type === ConversationType.Symptom) {
    return "I couldn't identify any specific symptoms. Could you tell me more about how you're feeling?";
  }
  
  const responses = conversationResponses[type] || [];
  if (responses.length === 0) {
    return "I'm here to help with your health questions. Is there something specific you'd like to know?";
  }
  
  // Return a random response from the appropriate category
  return responses[Math.floor(Math.random() * responses.length)];
};
