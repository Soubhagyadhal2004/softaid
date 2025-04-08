
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Database, Bot, RefreshCw } from 'lucide-react';

const InfoPanel: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-health-dark">
            <Brain className="h-5 w-5 mr-2 text-health-primary" />
            NLP Processing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Using advanced Natural Language Processing to understand symptoms and health concerns through text analysis and entity recognition.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-health-dark">
            <Database className="h-5 w-5 mr-2 text-health-primary" />
            Medical Knowledge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Trained on comprehensive medical datasets to provide accurate information on symptoms, conditions, and general health guidance.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-health-dark">
            <Bot className="h-5 w-5 mr-2 text-health-primary" />
            AI Assistance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Get immediate responses to health questions with personalized insights based on your specific concerns and symptoms.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-health-dark">
            <RefreshCw className="h-5 w-5 mr-2 text-health-primary" />
            Adaptive Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Our system continuously improves through your feedback, enhancing response accuracy and relevance over time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoPanel;
