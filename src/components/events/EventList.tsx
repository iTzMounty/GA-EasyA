import React from 'react';
import EventCard from './EventCard';
import { Event } from '../../types';
import { currentUser } from '../../data/mockData';

interface EventListProps {
  events: Event[];
  title?: string;
  emptyMessage?: string;
}

const EventList: React.FC<EventListProps> = ({ 
  events, 
  title = "Events", 
  emptyMessage = "No events found" 
}) => {
  const handleRSVP = (eventId: string) => {
    console.log(`RSVP for event ${eventId}`);
    // In a real app, this would make an API call to register the user
  };

  const isAttending = (event: Event) => {
    return event.attendees.includes(currentUser.id);
  };

  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
      
      {events.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              isAttending={isAttending(event)}
              onRSVP={handleRSVP}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;