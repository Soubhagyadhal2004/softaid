
import React from 'react';
import { Heart, GitHub } from 'lucide-react';

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t py-4 mt-auto">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>
            <span className="font-medium">Health Savvy AI</span> - For demonstration purposes only. Not for medical use.
          </p>
          
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <p className="flex items-center">
              <Heart className="h-4 w-4 text-red-500 mr-1" />
              <span>Made with care</span>
            </p>
            
            <a 
              href="#" 
              className="flex items-center hover:text-health-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub className="h-4 w-4 mr-1" />
              <span>Source Code</span>
            </a>
          </div>
        </div>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          Disclaimer: This is a prototype application. It is not a substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
