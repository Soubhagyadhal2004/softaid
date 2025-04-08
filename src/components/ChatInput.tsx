
import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isProcessing }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isProcessing) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Type your health question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pr-10 bg-white border-health-primary focus-visible:ring-health-primary"
          disabled={isProcessing}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-health-primary hover:text-health-primary hover:bg-health-light"
          disabled={isProcessing}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
      </div>
      <Button 
        type="submit" 
        disabled={!inputValue.trim() || isProcessing}
        className="bg-health-primary hover:bg-health-dark text-white"
      >
        <Send className="h-4 w-4 mr-2" />
        Send
      </Button>
    </form>
  );
};

export default ChatInput;
