import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Discussion } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { formatDate } from '../../lib/utils';
import { currentUser } from '../../data/mockData';

interface DiscussionThreadProps {
  discussion: Discussion;
  onReply?: (discussionId: string, content: string) => void;
}

const DiscussionThread: React.FC<DiscussionThreadProps> = ({ discussion, onReply }) => {
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim() && onReply) {
      onReply(discussion.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex space-x-3">
        <Avatar 
          src={discussion.userAvatar} 
          alt={discussion.userName} 
          size="md" 
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-gray-900">{discussion.userName}</h3>
            <span className="text-xs text-gray-500">{formatDate(discussion.createdAt)}</span>
          </div>
          <p className="mt-1 text-sm text-gray-700">{discussion.content}</p>
          
          <div className="mt-2 flex items-center space-x-4">
            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center text-xs text-gray-500 hover:text-gray-700"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Reply
            </button>
          </div>
          
          {isReplying && (
            <form onSubmit={handleReplySubmit} className="mt-3">
              <div className="flex items-start space-x-3">
                <Avatar 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  size="sm" 
                />
                <div className="flex-1">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      className="mr-2"
                      onClick={() => setIsReplying(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      size="sm"
                      leftIcon={<Send size={14} />}
                      disabled={!replyContent.trim()}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
          
          {discussion.replies && discussion.replies.length > 0 && (
            <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-100">
              {discussion.replies.map((reply) => (
                <div key={reply.id} className="flex space-x-3">
                  <Avatar 
                    src={reply.userAvatar} 
                    alt={reply.userName} 
                    size="sm" 
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900">{reply.userName}</h3>
                      <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionThread;