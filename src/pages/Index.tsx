
import React, { useState, useEffect } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import WebView from '@/components/WebView';
import NewsFeed from '@/components/NewsFeed';
import StudentAssistant from '@/components/StudentAssistant';
import Resources from '@/components/Resources';
import Community from '@/components/Community';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { toast } = useToast();

  useEffect(() => {
    // Welcome message on first load
    toast({
      title: "Welcome to HiBells! 🎓",
      description: "Your all-in-one Bells University companion app",
      duration: 3000,
    });
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="h-full">
            <div className="bg-blue-600 text-white p-4 mb-4">
              <h1 className="text-2xl font-bold mb-2">HiBells</h1>
              <p className="text-blue-100">Bells University Student Portal</p>
            </div>
            <NewsFeed />
          </div>
        );
      case 'portal':
        return (
          <WebView 
            url="https://www.bellsuniversity.edu.ng"
            className="h-full"
          />
        );
      case 'assistant':
        return <StudentAssistant />;
      case 'resources':
        return <Resources />;
      case 'community':
        return <Community />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Tab not found</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main content area */}
      <div className="flex-1 pb-16 overflow-hidden">
        {renderActiveTab()}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
};

export default Index;
