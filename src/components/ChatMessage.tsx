
import React from 'react';
import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: Message;
  onFeedback?: (messageId: string, isHelpful: boolean) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onFeedback }) => {
  const { id, sender, text, isLoading } = message;
  
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
          <p>{text}</p>
          
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
