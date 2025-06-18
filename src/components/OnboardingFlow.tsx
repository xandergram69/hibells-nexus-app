
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Wifi, Download, Bot, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Wifi,
      title: "Persistent Portal Access",
      description: "Access the Bells University portal seamlessly with automatic login sessions that persist across app launches.",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Download,
      title: "Offline Saving",
      description: "Save important pages, documents, and resources from the portal for offline access anytime, anywhere.",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Bot,
      title: "AI Assistant",
      description: "Get instant help with course information, schedules, and campus navigation through our intelligent assistant.",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Never miss important deadlines, exam dates, or academic announcements with personalized notifications.",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`p-2 rounded-full ${currentStep === 0 ? 'opacity-30' : 'hover:bg-white/10'}`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => onComplete()}
          className="text-white/70 hover:text-white text-sm"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className={`w-24 h-24 ${currentStepData.bgColor} rounded-full flex items-center justify-center mb-8`}>
          <Icon className={`h-12 w-12 ${currentStepData.color}`} />
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          {currentStepData.title}
        </h2>

        <p className="text-blue-100 text-lg leading-relaxed mb-12 max-w-sm">
          {currentStepData.description}
        </p>
      </div>

      {/* Footer */}
      <div className="p-6">
        <Button
          onClick={nextStep}
          className="w-full bg-white text-blue-600 hover:bg-blue-50 py-3 text-lg font-semibold"
        >
          {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingFlow;
