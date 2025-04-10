
import { Intent } from '@/types/chat';
import { medicineIntents } from './medicalData';
import { preprocessText } from './nlp';
import { similarityRatio } from './nlp';
import { augmentText } from './textAugmentation';

// Enhance intent patterns with augmentations
export const enhanceIntentPatterns = () => {
  medicineIntents.intents.forEach(intent => {
    const originalPatterns = [...intent.patterns];
    originalPatterns.forEach(pattern => {
      // Generate 2 augmentations for each pattern
      const augmentedPatterns = augmentText(pattern, 2);
      // Add new patterns if they're not already in the list
      augmentedPatterns.forEach(newPattern => {
        if (!intent.patterns.includes(newPattern)) {
          intent.patterns.push(newPattern);
        }
      });
    });
  });
};

// Apply the augmentation to intent patterns
enhanceIntentPatterns();

// Function to find the most relevant intent based on the user's message
export const findIntent = (message: string): Intent | null => {
  let bestMatch: { intent: Intent, score: number } | null = null;
  const normalizedMessage = message.toLowerCase();
  
  // Preprocess the user message
  const preprocessedMessage = preprocessText(message).join(' ');

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
      
      // Also try matching with preprocessed text for better semantic matching
      const preprocessedPattern = preprocessText(pattern).join(' ');
      const preprocessedScore = similarityRatio(preprocessedMessage, preprocessedPattern);
      
      if (preprocessedScore > 0.8) {
        if (!bestMatch || preprocessedScore > bestMatch.score) {
          bestMatch = { intent, score: preprocessedScore };
        }
        
        if (preprocessedScore > 0.95) {
          return intent;
        }
      }
    }
  }

  // If we found a good match, return it
  return bestMatch ? bestMatch.intent : null;
};

// Get medicine recommendations based on intent
export const getMedicineRecommendation = (intent: Intent): string => {
  // Randomly select one of the responses for this intent
  const randomIndex = Math.floor(Math.random() * intent.responses.length);
  return intent.responses[randomIndex];
};
