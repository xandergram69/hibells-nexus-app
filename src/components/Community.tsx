import React, { useState } from 'react';
import { MessageCircle, Users, Calendar, Trophy, Plus, Heart, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
}

const Community: React.FC = () => {
  const [posts] = useState<CommunityPost[]>([
    {
      id: '1',
      author: 'Adebayo Olumide',
      avatar: 'AO',
      content: 'Great lecture on AI algorithms today! Prof. Smith really knows how to explain complex concepts. Anyone else excited about the upcoming machine learning project?',
      timestamp: '2 hours ago',
      likes: 12,
      comments: 5,
      category: 'Academic'
    },
    {
      id: '2',
      author: 'Chioma Nwankwo',
      avatar: 'CN',
      content: "Looking for study partners for the upcoming calculus exam. Let's form a study group! Who's interested?",
      timestamp: '4 hours ago',
      likes: 8,
      comments: 3,
      category: 'Study Group'
    },
    {
      id: '3',
      author: 'Ibrahim Aliyu',
      avatar: 'IA',
      content: 'The new cafeteria menu is amazing! Finally some variety in our meal options. The grilled chicken is particularly good.',
      timestamp: '1 day ago',
      likes: 15,
      comments: 7,
      category: 'Campus Life'
    }
  ]);

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Computer Science Club Meeting',
      date: '2024-06-20',
      time: '3:00 PM',
      location: 'CS Building, Room 201',
      attendees: 25,
      category: 'Club'
    },
    {
      id: '2',
      title: 'Annual Science Fair',
      date: '2024-06-25',
      time: '10:00 AM',
      location: 'Main Auditorium',
      attendees: 150,
      category: 'Academic'
    },
    {
      id: '3',
      title: 'Basketball Tournament',
      date: '2024-06-30',
      time: '2:00 PM',
      location: 'Sports Complex',
      attendees: 80,
      category: 'Sports'
    }
  ]);

  const PostCard: React.FC<{ post: CommunityPost }> = ({ post }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {post.avatar}
        </div>
        <div className="ml-3 flex-1">
          <h4 className="font-semibold text-gray-800">{post.author}</h4>
          <p className="text-xs text-gray-500">{post.timestamp}</p>
        </div>
        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
          {post.category}
        </span>
      </div>
      
      <p className="text-gray-700 text-sm mb-3">{post.content}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
            <Heart className="h-4 w-4 mr-1" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-sm">{post.comments}</span>
          </button>
        </div>
      </div>
    </div>
  );

  const EventCard: React.FC<{ event: Event }> = ({ event }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-800">{event.title}</h4>
        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
          {event.category}
        </span>
      </div>
      
      <div className="space-y-1 mb-3">
        <p className="text-sm text-gray-600">📅 {event.date} at {event.time}</p>
        <p className="text-sm text-gray-600">📍 {event.location}</p>
        <p className="text-sm text-gray-600">👥 {event.attendees} attending</p>
      </div>
      
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
        Join Event
      </button>
    </div>
  );

  return (
    <div className="p-4 bg-gray-50 min-h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Student Community</h2>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed" className="space-y-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-sm transition-colors flex items-center justify-center">
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </button>
          
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg text-sm transition-colors flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2" />
            Create New Event
          </button>
          
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </TabsContent>
        
        <TabsContent value="groups" className="space-y-4">
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Join study groups and clubs</p>
            <p className="text-sm text-gray-400 mb-4">Connect with students who share your interests</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
              Browse Groups
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
