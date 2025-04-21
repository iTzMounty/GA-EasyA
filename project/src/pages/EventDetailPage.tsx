import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, MessageSquare, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import DiscussionThread from '../components/discussions/DiscussionThread';
import { events, discussions, currentUser } from '../data/mockData';
import { formatDate, formatTime } from '../lib/utils';
import { Discussion } from '../types';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = events.find(e => e.id === id);
  const eventDiscussions = discussions.filter(d => d.eventId === id);
  
  const [allDiscussions, setAllDiscussions] = useState<Discussion[]>(eventDiscussions);
  const [newDiscussionContent, setNewDiscussionContent] = useState('');
  const [isAttending, setIsAttending] = useState(event?.attendees.includes(currentUser.id));

  if (!event) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
          <p className="mt-2 text-gray-600">The event you're looking for doesn't exist or has been removed.</p>
          <Link to="/events" className="mt-4 inline-block">
            <Button leftIcon={<ArrowLeft size={16} />}>
              Back to Events
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleRSVP = () => {
    setIsAttending(!isAttending);
    // In a real app, this would make an API call to register/unregister the user
  };

  const handleNewDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDiscussionContent.trim()) {
      const newDiscussion: Discussion = {
        id: `discussion${allDiscussions.length + 1}`,
        eventId: event.id,
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        content: newDiscussionContent,
        createdAt: new Date().toISOString(),
        replies: []
      };
      
      setAllDiscussions([newDiscussion, ...allDiscussions]);
      setNewDiscussionContent('');
    }
  };

  const handleReply = (discussionId: string, content: string) => {
    const updatedDiscussions = allDiscussions.map(discussion => {
      if (discussion.id === discussionId) {
        const newReply: Discussion = {
          id: `reply${discussion.replies?.length ?? 0 + 1}`,
          eventId: discussion.eventId,
          userId: currentUser.id,
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
          content: content,
          createdAt: new Date().toISOString()
        };
        
        return {
          ...discussion,
          replies: [...(discussion.replies || []), newReply]
        };
      }
      return discussion;
    });
    
    setAllDiscussions(updatedDiscussions);
  };

  const statusColors = {
    upcoming: 'success',
    live: 'warning',
    completed: 'secondary',
    cancelled: 'danger'
  } as const;

  return (
    <Layout>
      <div className="mb-6">
        <Link to="/events" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Events
        </Link>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="relative h-64 w-full">
          <img
            src={event.image || 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge 
              variant={statusColors[event.status] as any} 
              size="md"
              className="capitalize"
            >
              {event.status}
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
              <p className="text-sm text-gray-600 mt-1">Hosted by {event.hostName}</p>
            </div>
            
            <div>
              {event.status === 'upcoming' && !isAttending && (
                <Button 
                  onClick={handleRSVP} 
                  leftIcon={<Users size={16} />}
                >
                  RSVP to Event
                </Button>
              )}
              {event.status === 'upcoming' && isAttending && (
                <Button 
                  variant="outline" 
                  onClick={handleRSVP}
                  leftIcon={<Calendar size={16} />}
                >
                  Cancel RSVP
                </Button>
              )}
              {event.status === 'live' && (
                <Button 
                  variant="primary" 
                >
                  Join Now
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-2">About this event</h2>
                <p className="text-gray-700">{event.description}</p>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Discussion</h2>
                
                <form onSubmit={handleNewDiscussion} className="mb-6">
                  <div className="flex items-start space-x-3">
                    <Avatar 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      size="md" 
                    />
                    <div className="flex-1">
                      <textarea
                        value={newDiscussionContent}
                        onChange={(e) => setNewDiscussionContent(e.target.value)}
                        placeholder="Ask a question or share your thoughts..."
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                      />
                      <div className="mt-2 flex justify-end">
                        <Button 
                          type="submit" 
                          leftIcon={<MessageSquare size={16} />}
                          disabled={!newDiscussionContent.trim()}
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
                
                {allDiscussions.length === 0 ? (
                  <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <MessageSquare className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">No discussions yet. Start the conversation!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allDiscussions.map(discussion => (
                      <DiscussionThread 
                        key={discussion.id} 
                        discussion={discussion} 
                        onReply={handleReply}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Event Details</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Clock className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{formatTime(`${event.date}T${event.time}`)}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Users className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{event.attendees.length} / {event.capacity} attendees</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" size="sm" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetailPage;