import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Event } from '../../types';
import { formatDate, formatTime } from '../../lib/utils';

interface EventCardProps {
  event: Event;
  isAttending?: boolean;
  onRSVP?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, isAttending = false, onRSVP }) => {
  const statusColors = {
    upcoming: 'success',
    live: 'warning',
    completed: 'secondary',
    cancelled: 'danger'
  } as const;

  const handleRSVP = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRSVP) {
      onRSVP(event.id);
    }
  };

  // Ensure tags is always an array
  const tags = event.tags || [];
  // Ensure attendees is always an array
  const attendees = event.attendees || [];

  return (
    <Link to={`/events/${event.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <img
            src={event.image || 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge 
              variant={statusColors[event.status as keyof typeof statusColors] as any || 'secondary'} 
              className="capitalize"
            >
              {event.status || 'upcoming'}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{event.title}</CardTitle>
          </div>
          <CardDescription className="text-sm text-gray-500">
            Hosted by {event.hostName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>{formatDate(event.date)} {event.time && `at ${formatTime(`${event.date}T${event.time}`)}`}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span>{attendees.length} / {event.capacity || 50} attendees</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" size="sm" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          {(event.status === 'upcoming' || !event.status) && !isAttending && (
            <Button 
              onClick={handleRSVP} 
              className="w-full"
              leftIcon={<Users size={16} />}
            >
              RSVP
            </Button>
          )}
          {(event.status === 'upcoming' || !event.status) && isAttending && (
            <Button 
              variant="outline" 
              className="w-full"
              leftIcon={<Calendar size={16} />}
            >
              Attending
            </Button>
          )}
          {event.status === 'live' && (
            <Button 
              variant="primary" 
              className="w-full"
            >
              Join Now
            </Button>
          )}
          {event.status === 'completed' && (
            <Button 
              variant="secondary" 
              className="w-full"
            >
              View Details
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;