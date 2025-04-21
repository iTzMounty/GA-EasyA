import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DiscussionThread from '../components/discussions/DiscussionThread';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { discussions } from '../data/mockData';
import { currentUser } from '../data/mockData';
import { Discussion } from '../types';

const locations = ['EU', 'USA', 'SA', 'SEA', 'Virtual'];
const chains = ['Solana', 'Stacks', 'XRP Ledger', 'Polkadot', 'Stellar', 'Sui', 'Aptos', 'Scroll', 'ImmutableX', 'Tezos'];

const CommunityPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('EU');
  const [selectedChain, setSelectedChain] = useState<string>('Solana');
  const [allDiscussions, setAllDiscussions] = useState<Discussion[]>(discussions);
  const [newDiscussionContent, setNewDiscussionContent] = useState('');

  const handleNewDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDiscussionContent.trim()) {
      const newDiscussion: Discussion = {
        id: `discussion${allDiscussions.length + 1}`,
        eventId: `${selectedRegion}-${selectedChain}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        content: newDiscussionContent,
        createdAt: new Date().toISOString(),
        replies: []
      };
      
      setAllDiscussions(prev => [newDiscussion, ...prev]);
      setNewDiscussionContent('');
    }
  };

  const handleReply = (discussionId: string, content: string) => {
    setAllDiscussions(prev =>
      prev.map(discussion =>
        discussion.id === discussionId
          ? {
              ...discussion,
              replies: [
                ...(discussion.replies || []),
                {
                  id: `reply${discussion.replies?.length ?? 0 + 1}`,
                  eventId: discussion.eventId,
                  userId: currentUser.id,
                  userName: currentUser.name,
                  userAvatar: currentUser.avatar,
                  content,
                  createdAt: new Date().toISOString()
                }
              ]
            }
          : discussion
      )
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Community Discussions</h1>
          <Link to="/community" className="text-blue-600 hover:text-blue-800 flex items-center">
            Visit Community Page
          </Link>
        </div>
        
        <div className="flex space-x-4 border-b pb-2">
          {locations.map(location => (
            <button
              key={location}
              className={`px-4 py-2 text-sm font-medium ${selectedRegion === location ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setSelectedRegion(location)}
            >
              {location}
            </button>
          ))}
        </div>
        
        <div className="flex space-x-4 border-b pb-2 mt-2">
          {chains.map(chain => (
            <button
              key={chain}
              className={`px-4 py-2 text-sm font-medium ${selectedChain === chain ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
              onClick={() => setSelectedChain(chain)}
            >
              {chain}
            </button>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Start a discussion in {selectedRegion} - {selectedChain}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewDiscussion}>
              <div className="flex items-start space-x-3">
                <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
                <div className="flex-1">
                  <textarea
                    value={newDiscussionContent}
                    onChange={e => setNewDiscussionContent(e.target.value)}
                    placeholder={`Share something with ${selectedRegion} - ${selectedChain} community...`}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {allDiscussions.filter(disc => disc.eventId === `${selectedRegion}-${selectedChain}`).length === 0 ? (
            <div className="text-center py-10">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No discussions in {selectedRegion} - {selectedChain}</h3>
              <p className="mt-1 text-sm text-gray-500">Be the first to start a discussion in this region.</p>
            </div>
          ) : (
            allDiscussions.filter(disc => disc.eventId === `${selectedRegion}-${selectedChain}`).map(discussion => (
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

export default CommunityPage;
