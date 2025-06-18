
import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Bookmark, User, FileText, Clock, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  category: string;
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  action: () => void;
}

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
    loadSavedArticles();
  }, []);

  const quickActions: QuickAction[] = [
    {
      id: 'results',
      title: 'Check Results',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => {
        toast({ title: "Redirecting to Results", description: "Opening portal..." });
      }
    },
    {
      id: 'registration',
      title: 'Course Registration',
      icon: User,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => {
        toast({ title: "Course Registration", description: "Opening registration portal..." });
      }
    },
    {
      id: 'schedule',
      title: 'My Schedule',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: () => {
        toast({ title: "Academic Schedule", description: "Loading your timetable..." });
      }
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      action: () => {
        toast({ title: "Notifications", description: "No new notifications" });
      }
    }
  ];

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      // Enhanced mock news data
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'New Academic Calendar Released for 2024/2025 Session',
          excerpt: 'The university has announced the academic calendar for the upcoming session with key dates for registration, examinations, and semester breaks.',
          date: '2024-06-15',
          url: 'https://www.bellsuniversity.edu.ng/news/academic-calendar-2024',
          category: 'Academic'
        },
        {
          id: '2',
          title: 'Merit-Based Scholarships Now Available',
          excerpt: 'Applications are now open for undergraduate and postgraduate merit scholarships. Deadline: July 30th, 2024.',
          date: '2024-06-12',
          url: 'https://www.bellsuniversity.edu.ng/news/scholarships-2024',
          category: 'Financial Aid'
        },
        {
          id: '3',
          title: 'New Library Wing and Student Facilities Opening Soon',
          excerpt: 'Construction of the new digital library wing and modern student accommodation facilities nearing completion.',
          date: '2024-06-10',
          url: 'https://www.bellsuniversity.edu.ng/news/infrastructure-update',
          category: 'Campus News'
        },
        {
          id: '4',
          title: 'Graduate Job Fair 2024 Registration Open',
          excerpt: 'Annual job fair featuring top employers. Register early to secure your spot. Limited spaces available.',
          date: '2024-06-08',
          url: 'https://www.bellsuniversity.edu.ng/news/job-fair-2024',
          category: 'Career'
        }
      ];
      
      setNews(mockNews);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch latest news updates.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedArticles = () => {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  };

  const toggleSaveArticle = (articleId: string) => {
    const updated = savedArticles.includes(articleId)
      ? savedArticles.filter(id => id !== articleId)
      : [...savedArticles, articleId];
    
    setSavedArticles(updated);
    localStorage.setItem('savedArticles', JSON.stringify(updated));
    
    toast({
      title: savedArticles.includes(articleId) ? "Article Removed" : "Article Saved! 📱",
      description: savedArticles.includes(articleId) 
        ? "Removed from saved items" 
        : "Saved for offline reading"
    });
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {/* Quick Actions Skeleton */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
        
        {/* News Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-6">
      {/* Quick Actions */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  onClick={action.action}
                  variant="ghost"
                  className={`h-auto p-4 flex-col items-center space-y-2 ${action.bgColor} hover:scale-105 transition-all duration-200 rounded-xl border-0`}
                >
                  <Icon className={`h-6 w-6 ${action.color}`} />
                  <span className={`text-sm font-medium ${action.color}`}>
                    {action.title}
                  </span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-blue-600 mr-2" />
            <CardTitle className="text-lg font-semibold text-gray-800">Upcoming Events</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <div>
                <p className="font-medium text-sm text-gray-800">Course Registration Deadline</p>
                <p className="text-xs text-gray-500">July 30, 2024</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-orange-600">5 days left</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
              <div>
                <p className="font-medium text-sm text-gray-800">Semester Exams Begin</p>
                <p className="text-xs text-gray-500">August 15, 2024</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-blue-600">21 days left</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News & Updates */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800">Latest News & Updates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                  item.category === 'Academic' ? 'bg-blue-100 text-blue-700' :
                  item.category === 'Financial Aid' ? 'bg-green-100 text-green-700' :
                  item.category === 'Campus News' ? 'bg-purple-100 text-purple-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {item.category}
                </span>
                <button
                  onClick={() => toggleSaveArticle(item.id)}
                  className="p-1 hover:bg-white rounded-full transition-colors"
                >
                  <Bookmark 
                    className={`h-4 w-4 ${
                      savedArticles.includes(item.id) 
                        ? 'fill-blue-600 text-blue-600' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-2 leading-tight">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.excerpt}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(item.date).toLocaleDateString()}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 text-xs hover:text-blue-800 font-medium"
                >
                  Read more
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsFeed;
