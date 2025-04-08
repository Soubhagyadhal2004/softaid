
import React from 'react';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import ChatContainer from '@/components/ChatContainer';
import InfoPanel from '@/components/InfoPanel';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-6">
        <section className="text-center mb-8">
          <h2 className="text-3xl font-bold text-health-dark mb-2">Your AI Health Assistant</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ask me about symptoms, get health information, and receive guidance on common medical concerns.
          </p>
        </section>
        
        <InfoPanel />
        
        <section className="mb-8">
          <ChatContainer />
        </section>
      </main>
      
      <AppFooter />
    </div>
  );
};

export default Index;
