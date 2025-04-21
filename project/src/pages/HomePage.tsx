import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, BookOpen, ArrowRight, Trophy, Star, Award } from 'lucide-react';
import Layout from '../components/layout/Layout';
import EventList from '../components/events/EventList';
import ResourceList from '../components/resources/ResourceList';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { events, resources } from '../data/mockData';

const HomePage: React.FC = () => {
  const upcomingEvents = events.filter(event => event.status === 'upcoming').slice(0, 3);
  const featuredResources = resources.slice(0, 3);

  const stats = [
    { name: 'Top Hosts', value: '12', icon: Trophy, color: 'bg-purple-500' },
    { name: 'Community Reputation', value: '4.9/5', icon: Star, color: 'bg-yellow-500' },
    { name: 'Events Hosted', value: events.length, icon: Calendar, color: 'bg-blue-500' },
    { name: 'Recognition Awards', value: '24', icon: Award, color: 'bg-green-500' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Community Banner" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/70 to-blue-800/50 flex items-center">
              <div className="px-8 max-w-2xl">
                <h1 className="text-3xl font-bold text-white mb-2">Build Your Legacy in Web3</h1>
                <p className="text-white/90 mb-6">
                  Host events that matter. Earn recognition. Become a respected leader in the Web3 community.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/create-event">
                    <Button leftIcon={<Trophy size={16} />}>
                      Become a Host
                    </Button>
                  </Link>
                  <Link to="/events">
                    <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                      View Top Events
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Featured Hosts</h2>
            <Link to="/events" className="text-blue-600 hover:text-blue-800 flex items-center">
              View all recognized hosts
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <EventList events={upcomingEvents} title="" />
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-8 my-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Be Seen. Be Respected.</h2>
            <p className="text-lg text-gray-700 mb-6">
              Join the ranks of Web3's most influential community leaders. Every event you host builds your reputation.
            </p>
            <Link to="/create-event">
              <Button size="lg" leftIcon={<Trophy size={20} />}>
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Top-Rated Resources</h2>
            <Link to="/resources" className="text-blue-600 hover:text-blue-800 flex items-center">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ResourceList resources={featuredResources} title="" />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;