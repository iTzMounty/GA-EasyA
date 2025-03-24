import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Filter, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import EventList from '../components/events/EventList';
import Button from '../components/ui/Button';
import { events } from '../data/mockData';
import { currentUser } from '../data/mockData';

const EventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from events
  const allTags = Array.from(new Set(events.flatMap(event => event.tags)));

  const filteredEvents = events.filter(event => {
    // Filter by search term
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.hostName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    
    // Filter by tags
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.some(tag => event.tags.includes(tag));
    
    return matchesSearch && matchesStatus && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          
          {currentUser.role === 'host' && (
            <Link to="/create-event">
              <Button leftIcon={<PlusCircle size={16} />}>
                Create Event
              </Button>
            </Link>
          )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="live">Live</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <div className="relative inline-block text-left">
                <Button 
                  variant="outline" 
                  leftIcon={<Filter size={16} />}
                >
                  Filter Tags
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <EventList 
          events={filteredEvents} 
          emptyMessage="No events match your search criteria. Try adjusting your filters."
        />
      </div>
    </Layout>
  );
};

export default EventsPage;