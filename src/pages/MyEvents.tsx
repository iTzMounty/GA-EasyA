import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import EventList from '../components/events/EventList';
import Button from '../components/ui/Button';
import { events as mockEvents } from '../data/mockData';
import { currentUser } from '../data/mockData';
import { Event } from '../types';

const MyEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  useEffect(() => {
    const fetchEvents = () => {
      try {
        const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
        // Combine mock events with stored events
        const combinedEvents = [...mockEvents, ...storedEvents];
        // Remove duplicates by id
        const uniqueEvents = Array.from(
          new Map(combinedEvents.map(event => [event.id, event])).values()
        );
        setEvents(uniqueEvents);
      } catch (error) {
        console.error("Error loading events:", error);
        setEvents(mockEvents);
      }
    };
    
    fetchEvents();
    
    // Listen for storage events to update the UI when events are added
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'events') {
        fetchEvents();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filtering events based on user involvement
  const hostedEvents = events.filter(event => event.hostId === currentUser.id);
  const attendingEvents = events.filter(event => 
    event.attendees && event.attendees.includes(currentUser.id) && event.hostId !== currentUser.id
  );
  const pastEvents = events.filter(event => 
    event.status === 'completed' && 
    (event.hostId === currentUser.id || (event.attendees && event.attendees.includes(currentUser.id)))
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Events</h1>
          {currentUser.role === 'host' && (
            <Link to="/create-event">
              <Button leftIcon={<PlusCircle size={16} />}>
                Create Event
              </Button>
            </Link>
          )}
        </div>

        {/* Hosted Events Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Events I'm Hosting</h2>
          {hostedEvents.length > 0 ? (
            <EventList events={hostedEvents} title="" />
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">You haven't created any events yet.</p>
              {currentUser.role === 'host' && (
                <Link to="/create-event" className="mt-4 inline-block">
                  <Button leftIcon={<PlusCircle size={16} />}>
                    Create Your First Event
                  </Button>
                </Link>
              )}
            </div>
          )}
        </section>

        {/* Attending Events Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Events I'm Attending</h2>
          {attendingEvents.length > 0 ? (
            <EventList events={attendingEvents} title="" />
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">You haven't RSVP'd to any events yet.</p>
              <Link to="/events" className="mt-4 inline-block">
                <Button>
                  Browse Events
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Past Events</h2>
            <EventList events={pastEvents} title="" />
          </section>
        )}
      </div>
    </Layout>
  );
};

export default MyEvents;