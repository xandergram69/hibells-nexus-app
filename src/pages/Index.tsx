import React, { useState, useEffect } from 'react';
import BottomNavigation from '@/components/BottomNavigation';
import WebView from '@/components/WebView';
import NewsFeed from '@/components/NewsFeed';
import StudentAssistant from '@/components/StudentAssistant';
import Resources from '@/components/Resources';
import Community from '@/components/Community';
import OnboardingFlow from '@/components/OnboardingFlow';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    } else {
      // Welcome message for returning users
      toast({
        title: "Welcome back! 🎓",
        description: "Your HiBells is ready",
        duration: 2000,
      });
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
    toast({
      title: "Welcome to HiBells! 🎓",
      description: "Your all-in-one Bells University companion",
      duration: 3000,
    });
  };

  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
    }, 150);
  };

  const renderActiveTab = () => {
    const tabContent = (() => {
      switch (activeTab) {
        case 'home':
          return (
            <div className="h-full bg-gradient-to-b from-blue-50 to-white">
              {/* Header with Bells University branding */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-1 animate-fade-in">HiBells</h1>
                    <p className="text-blue-100 text-sm animate-fade-in [animation-delay:0.1s]">Bells University Student Portal</p>
                  </div>
                  {/* Bells University Logo */}
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <span className="text-blue-600 font-bold text-xs">BELLS</span>
                  </div>
                </div>
              </div>
              <NewsFeed />
            </div>
          );
        case 'portal':
          return (
            <WebView 
              url="https://www.bellsuniversity.edu.ng"
              className=""
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
            <div className="flex items-center justify-center h-full bg-gray-50">
              <p className="text-gray-500">Tab not found</p>
            </div>
          );
      }
    })();

    return (
      <div className={`h-full w-full transition-all duration-300 ${
        isTransitioning 
          ? 'opacity-0 transform scale-95' 
          : 'opacity-100 transform scale-100'
      } ${activeTab === 'portal' ? 'fixed inset-0 z-40 pb-16' : ''}`}>
        {tabContent}
      </div>
    );
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Main content area with proper mobile handling */}
      <div className="flex-1 overflow-hidden relative pb-16">
        <div className="h-full w-full">
          {renderActiveTab()}
        </div>
      </div>
      
      {/* Bottom Navigation - Always visible */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default Index;
