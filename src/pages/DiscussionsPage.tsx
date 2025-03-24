import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import Layout from '../components/layout/Layout';
import DiscussionThread from '../components/discussions/DiscussionThread';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { discussions } from '../data/mockData';
import { currentUser } from '../data/mockData';
import { Discussion } from '../types';

const DiscussionsPage: React.FC = () => {
  const [allDiscussions, setAllDiscussions] = useState<Discussion[]>(discussions);
  const [newDiscussionContent, setNewDiscussionContent] = useState('');

  const handleNewDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDiscussionContent.trim()) {
      const newDiscussion: Discussion = {
        id: `discussion${allDiscussions.length + 1}`,
        eventId: 'general', // For general discussions
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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Community Discussions</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Start a new discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewDiscussion}>
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
                    placeholder="What's on your mind?"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button 
                      type="submit" 
                      leftIcon={<Send size={16} />}
                      disabled={!newDiscussionContent.trim()}
                    >
                      Post Discussion
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          {allDiscussions.length === 0 ? (
            <div className="text-center py-10">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No discussions</h3>
              <p className="mt-1 text-sm text-gray-500">Get the conversation started by creating the first discussion.</p>
            </div>
          ) : (
            allDiscussions.map(discussion => (
              <DiscussionThread 
                key={discussion.id} 
                discussion={discussion} 
                onReply={handleReply}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DiscussionsPage;