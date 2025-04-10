
export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isLoading?: boolean;
  predictions?: DiseasePrediction[];
}

export interface Feedback {
  messageId: string;
  isHelpful: boolean;
}

export interface SymptomEntity {
  symptom: string;
  confidence: number;
}

export interface DiseasePrediction {
  disease: string;
  probability: number;
  relatedSymptoms: string[];
}

export interface Intent {
  tag: string;
  patterns: string[];
  responses: string[];
}

export interface TrainingData {
  intents: Intent[];
}

export enum ConversationType {
  Greeting = 'greeting',
  SmallTalk = 'smalltalk',
  AboutBot = 'aboutbot',
  HowItWorks = 'howitworks',
  Help = 'help',
  ThankYou = 'thankyou',
  Exit = 'exit',
  Symptom = 'symptom'
}
