
import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  category: string;
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

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      // Simulated news data - in a real app, this would scrape the university website
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'New Academic Calendar Released for 2024/2025 Session',
          excerpt: 'The university has announced the academic calendar for the upcoming session with key dates for registration and examinations.',
          date: '2024-06-15',
          url: 'https://www.bellsuniversity.edu.ng/news/academic-calendar-2024',
          category: 'Academic'
        },
        {
          id: '2',
          title: 'Scholarship Opportunities Available for Outstanding Students',
          excerpt: 'Applications are now open for merit-based scholarships for undergraduate and postgraduate programs.',
          date: '2024-06-12',
          url: 'https://www.bellsuniversity.edu.ng/news/scholarships-2024',
          category: 'Financial Aid'
        },
        {
          id: '3',
          title: 'Campus Infrastructure Development Update',
          excerpt: 'Construction of new library wing and student accommodation facilities progressing on schedule.',
          date: '2024-06-10',
          url: 'https://www.bellsuniversity.edu.ng/news/infrastructure-update',
          category: 'Campus News'
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
      title: savedArticles.includes(articleId) ? "Article Removed" : "Article Saved",
      description: savedArticles.includes(articleId) 
        ? "Article removed from saved items" 
        : "Article saved for offline reading"
    });
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm border animate-pulse">
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
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Latest News & Updates</h2>
      
      {news.map((item) => (
        <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {item.category}
            </span>
            <button
              onClick={() => toggleSaveArticle(item.id)}
              className="p-1 hover:bg-gray-100 rounded"
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
          
          <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{item.excerpt}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(item.date).toLocaleDateString()}
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 text-xs hover:text-blue-800"
            >
              Read more
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
