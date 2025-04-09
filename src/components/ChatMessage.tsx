
import React from 'react';
import { Message, DiseasePrediction } from '@/types/chat';
import { cn } from '@/lib/utils';
import { ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ChatMessageProps {
  message: Message;
  onFeedback?: (messageId: string, isHelpful: boolean) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onFeedback }) => {
  const { id, sender, text, isLoading, predictions } = message;
  
  const renderMarkdown = (text: string) => {
    // Simple markdown rendering for bold text
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };
  
  return (
    <div 
      className={cn(
        'message-container animate-fade-in', 
        sender === 'user' ? 'user-message' : 'bot-message'
      )}
    >
      {isLoading ? (
        <div className="typing-indicator">
          <span></span>
          <span style={{ animationDelay: '0.2s' }}></span>
          <span style={{ animationDelay: '0.4s' }}></span>
        </div>
      ) : (
        <>
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }} />
          
          {/* Display disease predictions if available */}
          {sender === 'bot' && predictions && predictions.length > 0 && (
            <div className="disease-predictions mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <AlertCircle className="h-4 w-4" />
                <span>AI Disease Analysis:</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {predictions.map((prediction, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger asChild>
                      <div 
                        className={cn(
                          "disease-prediction p-2 rounded-md text-sm cursor-help",
                          index === 0 ? "bg-amber-100 border border-amber-300" : "bg-gray-100 border border-gray-200"
                        )}
                      >
                        <div className="font-medium">{prediction.disease.charAt(0).toUpperCase() + prediction.disease.slice(1)}</div>
                        <div className="text-xs mt-1 flex justify-between">
                          <span>Probability:</span>
                          <span className="font-medium">{(prediction.probability * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div>
                        <h4 className="font-medium mb-2">{prediction.disease.charAt(0).toUpperCase() + prediction.disease.slice(1)}</h4>
                        <div className="mb-2">
                          <span className="text-sm text-gray-500">Detected symptoms:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {prediction.relatedSymptoms.map((symptom, i) => (
                              <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          This is a simulated AI prediction and should not be considered medical advice.
                          Always consult with a healthcare professional.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
          )}
          
          {/* Only show feedback options for bot messages */}
          {sender === 'bot' && onFeedback && (
            <div className="flex justify-end mt-2 space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:text-white hover:bg-green-400"
                onClick={() => onFeedback(id, true)}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:text-white hover:bg-red-400"
                onClick={() => onFeedback(id, false)}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatMessage;
