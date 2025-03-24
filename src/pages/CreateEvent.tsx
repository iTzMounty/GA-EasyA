import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import { currentUser } from '../data/mockData';

const categories = ['Blockchain-Specific', 'Web3 Meetup', 'Hackathons', 'Other'];

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    date: '',
    time: '12:00',
    location: '',
    category: 'Blockchain-Specific',
    isVerified: false,
    hasCashPrize: false,
    customCategory: '',
    hostId: currentUser.id,
    hostName: currentUser.name,
    capacity: 50,
    attendees: [],
    tags: ['web3'],
    status: 'upcoming'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setEventDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new event with all required fields
    const newEvent = {
      ...eventDetails,
      id: `event${Date.now()}`,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    };
    
    // Get existing events from localStorage or initialize empty array
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    
    // Save event to localStorage
    localStorage.setItem('events', JSON.stringify([...storedEvents, newEvent]));
    
    console.log('Event Created:', newEvent);
    
    // Redirect to the new Event Created page, passing the event data
    navigate('/event-created', { state: { event: newEvent } });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create a New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="title" value={eventDetails.title} onChange={handleChange} placeholder="Event Title" required className="w-full px-3 py-2 border rounded-md" />
              <Textarea name="description" value={eventDetails.description} onChange={handleChange} placeholder="Event Description" required />
              <input name="date" type="date" value={eventDetails.date} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
              <input name="time" type="time" value={eventDetails.time} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
              <input name="location" value={eventDetails.location} onChange={handleChange} placeholder="Location (or Virtual)" required className="w-full px-3 py-2 border rounded-md" />
              
              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={eventDetails.category}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {eventDetails.category === 'Other' && (
                  <input
                    name="customCategory"
                    value={eventDetails.customCategory}
                    onChange={handleChange}
                    placeholder="Specify category"
                    className="mt-2 w-full px-3 py-2 border rounded-md"
                  />
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isVerified"
                  checked={eventDetails.isVerified}
                  onChange={handleChange}
                />
                <label>Verified Event (Indicates credibility)</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="hasCashPrize"
                  checked={eventDetails.hasCashPrize}
                  onChange={handleChange}
                />
                <label>Has Cash Prize (Highlight this event)</label>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">Create Event</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateEvent;