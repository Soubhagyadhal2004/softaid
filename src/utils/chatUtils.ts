
import { ConversationType, DiseasePrediction } from '@/types/chat';
import { generateId } from './common';
import { identifyConversationType, getConversationResponse } from './conversation';
import { identifySymptoms } from './symptomMatcher';
import { predictDisease } from './diseasePrediction';
import { findIntent, getMedicineRecommendation } from './intentMatcher';

// Generate response based on user message
export const generateResponse = (message: string): { text: string, predictions: DiseasePrediction[] } => {
  // First, identify what type of conversation this is
  const conversationType = identifyConversationType(message);
  
  // Handle non-symptom conversations
  if (conversationType !== ConversationType.Symptom) {
    return {
      text: getConversationResponse(conversationType),
      predictions: []
    };
  }
  
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

export { generateId, identifySymptoms, predictDisease, calculateSymptomSimilarity } from './common';
