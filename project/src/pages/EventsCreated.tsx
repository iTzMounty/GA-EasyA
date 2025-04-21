import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const EventCreated: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  if (!event) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center p-6">
          <h1 className="text-2xl font-bold">No Event Found</h1>
          <p className="text-gray-500">It looks like no event data was passed.</p>
          <Button onClick={() => navigate('/create-event')} className="mt-4">
            Create a New Event
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center p-6">
        <h1 className="text-2xl font-bold text-green-600">Event Created Successfully!</h1>
        <div className="bg-white shadow rounded-lg p-6 mt-4 text-left">
          <h2 className="text-xl font-semibold">{event.title}</h2>
          <p className="text-gray-700">{event.description}</p>
          <p className="text-gray-500 mt-2"><strong>Date:</strong> {event.date}</p>
          <p className="text-gray-500"><strong>Location:</strong> {event.location}</p>
          <p className="text-gray-500"><strong>Category:</strong> {event.category}</p>
        </div>
        <Button onClick={() => navigate('/my-events')} className="mt-6">
          Go to My Events
        </Button>
      </div>
    </Layout>
  );
};

export default EventCreated;
