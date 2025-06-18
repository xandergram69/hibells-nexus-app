
import React from 'react';
import { Home, User, Bot, BookOpen, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'portal', label: 'Portal', icon: User },
    { id: 'assistant', label: 'Assistant', icon: Bot },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="safe-area-pb">
        <div className="flex justify-around items-center px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 min-w-0 flex-1 max-w-[72px]",
                  isActive 
                    ? "text-blue-600 bg-blue-50 scale-105 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
              >
                <div className={cn(
                  "relative mb-1 transition-transform duration-200",
                  isActive && "scale-110"
                )}>
                  <Icon 
                    size={22} 
                    className={cn(
                      "transition-colors duration-200",
                      isActive ? "text-blue-600" : "text-gray-500"
                    )}
                  />
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <span className={cn(
                  "text-xs font-medium transition-colors duration-200 truncate",
                  isActive ? "text-blue-600" : "text-gray-500"
                )}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
