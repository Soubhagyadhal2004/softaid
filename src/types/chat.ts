
export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface Feedback {
  messageId: string;
  isHelpful: boolean;
}

export interface SymptomEntity {
  symptom: string;
  confidence: number;
}

export interface Intent {
  tag: string;
  patterns: string[];
  responses: string[];
}

export interface TrainingData {
  intents: Intent[];
}
