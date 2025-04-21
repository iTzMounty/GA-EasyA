import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Star, Award } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
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
    
    const newEvent = {
      ...eventDetails,
      id: `event${Date.now()}`,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    };
    
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    localStorage.setItem('events', JSON.stringify([...storedEvents, newEvent]));
    
    navigate('/event-created', { state: { event: newEvent } });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Establish Your Influence</h1>
          <p className="text-lg text-gray-600">Create an event that showcases your expertise and builds your reputation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Gain Recognition</h3>
              <p className="text-sm text-gray-600 mt-2">Stand out as a thought leader in the Web3 space</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Build Authority</h3>
              <p className="text-sm text-gray-600 mt-2">Establish yourself as a trusted community leader</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Earn Status</h3>
              <p className="text-sm text-gray-600 mt-2">Unlock exclusive benefits and opportunities</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Create Your Signature Event</CardTitle>
            <CardDescription>Make your mark on the community with a memorable event</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input 
                  name="title" 
                  value={eventDetails.title} 
                  onChange={handleChange} 
                  placeholder="Give your event an impactful title" 
                  required 
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Description</label>
                <Textarea 
                  name="description" 
                  value={eventDetails.description} 
                  onChange={handleChange} 
                  placeholder="Describe how your event will benefit the community" 
                  required 
                  className="focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    name="date" 
                    type="date" 
                    value={eventDetails.date} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input 
                    name="time" 
                    type="time" 
                    value={eventDetails.time} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  name="location" 
                  value={eventDetails.location} 
                  onChange={handleChange} 
                  placeholder="Virtual or Physical Location" 
                  required 
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={eventDetails.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
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
                    className="mt-2 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
                  />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isVerified"
                    checked={eventDetails.isVerified}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label className="text-sm text-gray-700">Verified Event (Boosts your credibility)</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="hasCashPrize"
                    checked={eventDetails.hasCashPrize}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label className="text-sm text-gray-700">Featured Event (Increased visibility)</label>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  type="submit"
                  leftIcon={<Trophy size={16} />}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Launch Your Event
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateEvent;