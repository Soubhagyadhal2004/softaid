
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Activity, Settings, Bell } from 'lucide-react';

const AppHeader: React.FC = () => {
  const { toast } = useToast();

  const showComingSoon = () => {
    toast({
      title: "Coming Soon",
      description: "This feature is under development and will be available in a future update.",
      duration: 3000
    });
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-health-primary mr-2" />
          <h1 className="text-2xl font-bold text-health-dark">Health Savvy AI</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={showComingSoon}
            className="text-gray-600 hover:text-health-primary"
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={showComingSoon}
            className="text-gray-600 hover:text-health-primary"
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            onClick={showComingSoon}
            className="text-health-primary border-health-primary hover:bg-health-light"
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
