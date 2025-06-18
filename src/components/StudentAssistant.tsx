
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Calendar, Book, MapPin, Clock, MessageCircle } from 'lucide-react';
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
      text: 'Hello! I\'m your HiBells AI Assistant 🤖\n\nI can help you with:\n• Course schedules and timetables\n• Campus navigation and locations\n• Academic records and results\n• Assignment deadlines\n• University policies\n\nHow can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    { icon: Calendar, text: 'When is my next exam?', category: 'Schedule' },
    { icon: Book, text: 'Show my course registration', category: 'Academics' },
    { icon: MapPin, text: 'Where is the library?', category: 'Navigation' },
    { icon: Clock, text: 'What are my class times today?', category: 'Schedule' },
    { icon: User, text: 'Check my academic records', category: 'Records' },
    { icon: MessageCircle, text: 'How do I contact my lecturer?', category: 'Support' },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

    // Simulate bot response with realistic delay
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
    
    if (text.includes('schedule') || text.includes('timetable') || text.includes('class')) {
      return '📅 **Your Class Schedule:**\n\n• **Today (Monday):**\n  - Computer Science 301 (10:00 AM - 12:00 PM) - Room LT-5\n  - Mathematics 205 (2:00 PM - 4:00 PM) - Room B-102\n\n• **Tomorrow (Tuesday):**\n  - Physics 203 (9:00 AM - 11:00 AM) - Lab C-201\n  - English 101 (1:00 PM - 3:00 PM) - Room A-305\n\nWould you like me to show your full weekly schedule or set up exam reminders?';
    }
    
    if (text.includes('exam') || text.includes('test')) {
      return '📝 **Upcoming Exams:**\n\n• **Computer Science 301**\n  Date: June 25th, 2024\n  Time: 9:00 AM\n  Venue: Main Hall\n\n• **Mathematics 205**\n  Date: June 27th, 2024\n  Time: 2:00 PM\n  Venue: Exam Hall B\n\n🔔 Would you like me to set up notification reminders for these exams?';
    }
    
    if (text.includes('course') || text.includes('registration') || text.includes('subject')) {
      return '📚 **Your Current Courses:**\n\n✅ **Registered Courses:**\n• Computer Science 301 - Data Structures (3 units)\n• Mathematics 205 - Calculus II (3 units)\n• Physics 203 - Mechanics (3 units)\n• English 101 - Technical Writing (2 units)\n\n📊 **Total Units:** 11/15\n\n💡 You can still register for 4 more units before the deadline (July 30th). Would you like to see available electives?';
    }
    
    if (text.includes('map') || text.includes('location') || text.includes('building') || text.includes('library') || text.includes('where')) {
      return '🗺️ **Campus Navigation:**\n\n📍 **Popular Locations:**\n• **Library** - Central Campus (Ground Floor)\n• **Computer Lab** - Block C, 2nd Floor\n• **Cafeteria** - Student Center\n• **Admin Block** - Main Entrance\n• **Lecture Halls** - Block A & B\n\n🚶‍♂️ Which specific location are you looking for? I can provide detailed directions and estimated walking time!';
    }

    if (text.includes('result') || text.includes('grade') || text.includes('gpa')) {
      return '📊 **Academic Records:**\n\n🎓 **Current Semester:**\n• CGPA: 3.45/4.0\n• Total Units: 45\n• Academic Standing: Good\n\n📈 **Recent Results:**\n• Computer Science 201: A (4.0)\n• Mathematics 204: B+ (3.5)\n• Physics 202: B (3.0)\n\n📋 For detailed transcripts, visit the Academic Office or check the Portal tab. Need help with anything specific?';
    }

    if (text.includes('contact') || text.includes('lecturer') || text.includes('professor')) {
      return '👨‍🏫 **Lecturer Contact Information:**\n\n📧 **How to Contact Lecturers:**\n• Check course outline for office hours\n• Send emails through official university portal\n• Visit department offices during business hours\n\n🏢 **Department Offices:**\n• Computer Science: Block C, Room 301\n• Mathematics: Block B, Room 205\n• Physics: Block D, Room 102\n\nWhich specific lecturer would you like to contact?';
    }
    
    return '🤖 I understand you need help with that! Here are some things I can assist you with:\n\n• 📅 Class schedules and exam dates\n• 📚 Course information and registration\n• 🗺️ Campus navigation and room locations\n• 📊 Academic records and results\n• 📞 Contact information for staff\n• 🔔 Setting up reminders and notifications\n\nCould you please be more specific about what you\'re looking for? You can also try one of the suggested prompts below!';
  };

  const handleSuggestedPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">HiBells AI Assistant</h2>
            <p className="text-xs text-blue-100">Always here to help • Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              
              {/* Message Bubble */}
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-md'
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
              <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <div className="px-4 py-2 bg-white border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3 font-medium">💡 Try asking:</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedPrompts.slice(0, 4).map((prompt, index) => {
              const Icon = prompt.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSuggestedPrompt(prompt.text)}
                  className="flex items-center p-2 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors text-left"
                >
                  <Icon className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                  <span className="text-xs text-gray-700 truncate">{prompt.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 p-4">
        <div className="flex space-x-3">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything about campus life..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
            className="flex-1 rounded-xl border-gray-200 focus:border-blue-500"
            disabled={isTyping}
          />
          <Button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 rounded-xl px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentAssistant;
