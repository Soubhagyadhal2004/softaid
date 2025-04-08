
import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Message, Feedback } from '@/types/chat';
import { generateResponse, generateId } from '@/utils/chatUtils';
import { useToast } from '@/components/ui/use-toast';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      sender: 'bot',
      text: "Hello! I'm your Health Savvy AI assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (sender: 'user' | 'bot', text: string, isLoading = false) => {
    const newMessage: Message = {
      id: generateId(),
      sender,
      text,
      timestamp: new Date(),
      isLoading
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return newMessage.id;
  };

  const handleSendMessage = (text: string) => {
    // Add user message
    addMessage('user', text);
    
    // Process the message and generate a response
    setIsProcessing(true);
    
    // Add a loading message
    const loadingId = addMessage('bot', '', true);
    
    // Simulate processing time for NLP and ML
    setTimeout(() => {
      // Remove the loading message
      setMessages(prevMessages => 
        prevMessages.filter(msg => msg.id !== loadingId)
      );
      
      // Generate and add the bot response
      const response = generateResponse(text);
      addMessage('bot', response);
      
      setIsProcessing(false);
    }, 1500);
  };

  const handleFeedback = (messageId: string, isHelpful: boolean) => {
    // Store feedback
    setFeedbackData(prev => [...prev, { messageId, isHelpful }]);
    
    // Show toast notification
    toast({
      title: isHelpful ? "Thank you for your feedback!" : "We'll improve our responses",
      description: isHelpful 
        ? "This helps our AI learn and provide better answers."
        : "Your feedback helps us train the AI to be more accurate.",
      duration: 3000
    });
    
    // In a real app, this would send the feedback to the backend
    console.log("Feedback submitted:", { messageId, isHelpful });
  };

  return (
    <div className="chatbot-container h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
        {messages.map(message => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            onFeedback={handleFeedback}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isProcessing={isProcessing} />
    </div>
  );
};

export default ChatContainer;
