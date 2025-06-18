
import React, { useState } from 'react';
import { Send, Bot, User, Calendar, Book, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const StudentAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m your HiBells Assistant. I can help you with course information, campus navigation, academic schedules, and more. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { icon: Calendar, text: 'My Schedule', action: 'schedule' },
    { icon: Book, text: 'Course Info', action: 'courses' },
    { icon: MapPin, text: 'Campus Map', action: 'map' },
    { icon: User, text: 'Academic Records', action: 'records' },
  ];

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    
    if (text.includes('schedule') || text.includes('timetable')) {
      return 'I can help you with your academic schedule! Your next class is Computer Science 301 at 10:00 AM in Room LT-5. Would you like me to show you your full weekly schedule?';
    }
    
    if (text.includes('course') || text.includes('subject')) {
      return 'Here are your current courses: Computer Science 301, Mathematics 205, Physics 203, and English 101. Which course would you like more information about?';
    }
    
    if (text.includes('map') || text.includes('location') || text.includes('building')) {
      return 'I can help you navigate the campus! Which building or facility are you looking for? Popular locations include the Library, Student Center, Cafeteria, and various department buildings.';
    }
    
    if (text.includes('exam') || text.includes('test')) {
      return 'Your upcoming exams: Computer Science 301 (June 25th), Mathematics 205 (June 27th). I can send you reminder notifications if you\'d like!';
    }
    
    return 'I understand you need help with that. Let me connect you to the appropriate department or provide more specific information. Could you please clarify what exactly you\'re looking for?';
  };

  const handleQuickAction = (action: string) => {
    let actionText = '';
    switch (action) {
      case 'schedule':
        actionText = 'Show me my schedule';
        break;
      case 'courses':
        actionText = 'Tell me about my courses';
        break;
      case 'map':
        actionText = 'Help me find a location on campus';
        break;
      case 'records':
        actionText = 'Show my academic records';
        break;
    }
    sendMessage(actionText);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center">
        <Bot className="h-8 w-8 text-blue-600 mr-3" />
        <div>
          <h2 className="font-semibold text-gray-800">HiBells Assistant</h2>
          <p className="text-xs text-gray-500">Always here to help</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-b p-4">
        <p className="text-sm text-gray-600 mb-3">Quick Actions:</p>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.action}
                onClick={() => handleQuickAction(action.action)}
                className="flex items-center p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Icon className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm text-blue-700">{action.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 border'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything about campus life..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
            className="flex-1"
          />
          <Button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentAssistant;
