export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'host' | 'attendee' | 'admin';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  hostId: string;
  hostName: string;
  capacity: number;
  attendees: string[];
  tags: string[];
  image?: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'slides' | 'hackathon' | 'other';
  url: string;
  tags: string[];
}

export interface Feedback {
  id: string;
  eventId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Discussion {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  replies?: Discussion[];
}