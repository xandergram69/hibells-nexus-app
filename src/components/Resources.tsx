
import React, { useState, useEffect } from 'react';
import { Book, Download, FileText, Video, ExternalLink, Search, Trash2, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document' | 'portal';
  category: string;
  description: string;
  url: string;
  downloadable: boolean;
  size?: string;
  savedAt?: string;
}

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedPages, setSavedPages] = useState<Resource[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  const [resources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Computer Science Study Guide 2024',
      type: 'pdf',
      category: 'Computer Science',
      description: 'Comprehensive study guide covering algorithms, data structures, and programming fundamentals.',
      url: '/resources/cs-study-guide.pdf',
      downloadable: true,
      size: '2.5 MB'
    },
    {
      id: '2',
      title: 'Mathematics Lecture Series',
      type: 'video',
      category: 'Mathematics',
      description: 'Video lectures on calculus, linear algebra, and discrete mathematics.',
      url: '/resources/math-lectures',
      downloadable: false
    },
    {
      id: '3',
      title: 'Student Handbook 2024',
      type: 'document',
      category: 'General',
      description: 'Official student handbook with policies, procedures, and campus information.',
      url: '/resources/student-handbook.pdf',
      downloadable: true,
      size: '1.8 MB'
    },
    {
      id: '4',
      title: 'Library Online Resources',
      type: 'link',
      category: 'Library',
      description: 'Access to digital library, research databases, and online journals.',
      url: 'https://library.bellsuniversity.edu.ng',
      downloadable: false
    },
    {
      id: '5',
      title: 'Physics Lab Manual',
      type: 'pdf',
      category: 'Physics',
      description: 'Laboratory procedures and experiments for physics courses.',
      url: '/resources/physics-lab-manual.pdf',
      downloadable: true,
      size: '3.2 MB'
    }
  ]);

  useEffect(() => {
    loadSavedContent();
    loadFavorites();
  }, []);

  const loadSavedContent = () => {
    const saved = localStorage.getItem('savedPages');
    if (saved) {
      const pages = JSON.parse(saved);
      setSavedPages(pages.map((page: any) => ({
        ...page,
        type: 'portal' as const,
        category: 'Saved from Portal',
        description: `Saved on ${new Date(page.savedAt).toLocaleDateString()}`,
        downloadable: false
      })));
    }
  };

  const loadFavorites = () => {
    const favs = localStorage.getItem('favoriteResources');
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  };

  const toggleFavorite = (resourceId: string) => {
    const updated = favorites.includes(resourceId)
      ? favorites.filter(id => id !== resourceId)
      : [...favorites, resourceId];
    
    setFavorites(updated);
    localStorage.setItem('favoriteResources', JSON.stringify(updated));
    
    toast({
      title: favorites.includes(resourceId) ? "Removed from Favorites" : "Added to Favorites ⭐",
      description: favorites.includes(resourceId) ? "Resource removed" : "Resource favorited"
    });
  };

  const deleteSavedPage = (pageId: string) => {
    const updated = savedPages.filter(page => page.id !== pageId);
    setSavedPages(updated);
    localStorage.setItem('savedPages', JSON.stringify(updated));
    
    toast({
      title: "Page Deleted 🗑️",
      description: "Saved page removed from offline storage"
    });
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSavedPages = savedPages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favoriteResources = resources.filter(resource => favorites.includes(resource.id));

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return FileText;
      case 'video':
        return Video;
      case 'link':
        return ExternalLink;
      case 'portal':
        return Eye;
      default:
        return Book;
    }
  };

  const ResourceCard: React.FC<{ resource: Resource; showDelete?: boolean }> = ({ resource, showDelete = false }) => {
    const Icon = getResourceIcon(resource.type);
    
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg mr-3 ${
              resource.type === 'pdf' || resource.type === 'document' ? 'bg-red-50' :
              resource.type === 'video' ? 'bg-purple-50' :
              resource.type === 'link' ? 'bg-blue-50' :
              'bg-gray-50'
            }`}>
              <Icon className={`h-5 w-5 ${
                resource.type === 'pdf' || resource.type === 'document' ? 'text-red-600' :
                resource.type === 'video' ? 'text-purple-600' :
                resource.type === 'link' ? 'text-blue-600' :
                'text-gray-600'
              }`} />
            </div>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
              {resource.type.toUpperCase()}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {resource.downloadable && (
              <button className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
                <Download className="h-4 w-4" />
              </button>
            )}
            
            {!showDelete && (
              <button 
                onClick={() => toggleFavorite(resource.id)}
                className="p-1 rounded-full hover:bg-yellow-50"
              >
                <span className={`text-sm ${favorites.includes(resource.id) ? 'text-yellow-500' : 'text-gray-400'}`}>
                  ⭐
                </span>
              </button>
            )}
            
            {showDelete && (
              <button 
                onClick={() => deleteSavedPage(resource.id)}
                className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 leading-tight">{resource.title}</h3>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{resource.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">
            {resource.category}
          </span>
          {resource.size && (
            <span className="text-xs text-gray-500 font-medium">{resource.size}</span>
          )}
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-lg text-sm font-medium transition-all duration-200"
        >
          {resource.type === 'link' ? 'Open Link' : 
           resource.type === 'portal' ? 'View Saved Page' :
           resource.downloadable ? 'Download' : 'View'}
        </Button>
      </div>
    );
  };

  return (
    <div className="p-4 bg-gray-50 min-h-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Academic Resources</h2>
        
        {/* Enhanced Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search resources and saved content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-gray-200 rounded-xl"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-white rounded-xl shadow-sm">
          <TabsTrigger value="all" className="rounded-lg">All Resources</TabsTrigger>
          <TabsTrigger value="saved" className="rounded-lg">Saved Pages</TabsTrigger>
          <TabsTrigger value="favorites" className="rounded-lg">Favorites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4">
          {filteredSavedPages.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredSavedPages.map((page) => (
                <ResourceCard key={page.id} resource={page} showDelete={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <Download className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium mb-2">No saved pages yet</p>
              <p className="text-sm text-gray-400">Save pages from the Portal tab for offline access</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="space-y-4">
          {favoriteResources.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {favoriteResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <span className="text-6xl mb-4 block">⭐</span>
              <p className="text-gray-500 font-medium mb-2">No favorite resources yet</p>
              <p className="text-sm text-gray-400">Tap the star icon on any resource to add it to favorites</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resources;
