
import React, { useState } from 'react';
import { Book, Download, FileText, Video, ExternalLink, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  category: string;
  description: string;
  url: string;
  downloadable: boolean;
  size?: string;
}

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return FileText;
      case 'video':
        return Video;
      case 'link':
        return ExternalLink;
      default:
        return Book;
    }
  };

  const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];

  const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
    const Icon = getResourceIcon(resource.type);
    
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <Icon className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {resource.type.toUpperCase()}
            </span>
          </div>
          {resource.downloadable && (
            <button className="text-blue-600 hover:text-blue-800">
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {resource.category}
          </span>
          {resource.size && (
            <span className="text-xs text-gray-500">{resource.size}</span>
          )}
        </div>
        
        <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
          {resource.type === 'link' ? 'Open Link' : resource.downloadable ? 'Download' : 'View'}
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 bg-gray-50 min-h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Academic Resources</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="downloaded">Downloaded</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="downloaded" className="space-y-4">
          <div className="text-center py-8">
            <Download className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No downloaded resources yet</p>
            <p className="text-sm text-gray-400">Downloaded resources will appear here for offline access</p>
          </div>
        </TabsContent>
        
        <TabsContent value="favorites" className="space-y-4">
          <div className="text-center py-8">
            <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No favorite resources yet</p>
            <p className="text-sm text-gray-400">Tap the star icon on any resource to add it to favorites</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resources;
