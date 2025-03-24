import { Event, Resource, User, Feedback, Discussion } from '../types';

export const currentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'host'
};

export const users: User[] = [
  currentUser,
  {
    id: 'user2',
    name: 'Sam Wilson',
    email: 'sam@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'attendee'
  },
  {
    id: 'user3',
    name: 'Taylor Kim',
    email: 'taylor@example.com',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'host'
  },
  {
    id: 'user4',
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'attendee'
  }
];

export const events: Event[] = [
  {
    id: 'event1',
    title: 'Web3 Developer Workshop',
    description: 'Learn the fundamentals of Web3 development with hands-on exercises and expert guidance.',
    date: '2025-06-15',
    time: '14:00',
    location: 'Virtual',
    hostId: 'user1',
    hostName: 'Alex Johnson',
    capacity: 50,
    attendees: ['user2', 'user4'],
    tags: ['web3', 'development', 'workshop'],
    image: 'https://images.unsplash.com/photo-1591522811280-a8759970b03f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    status: 'upcoming'
  },
  {
    id: 'event2',
    title: 'Blockchain Hackathon',
    description: 'A 48-hour hackathon focused on building innovative blockchain solutions.',
    date: '2025-07-20',
    time: '09:00',
    location: 'Tech Hub, New York',
    hostId: 'user3',
    hostName: 'Taylor Kim',
    capacity: 100,
    attendees: ['user2', 'user4', 'user1'],
    tags: ['blockchain', 'hackathon', 'innovation'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    status: 'upcoming'
  },
  {
    id: 'event3',
    title: 'DeFi Fundamentals',
    description: 'Understanding the core concepts of Decentralized Finance and its applications.',
    date: '2025-05-10',
    time: '15:30',
    location: 'Virtual',
    hostId: 'user1',
    hostName: 'Alex Johnson',
    capacity: 75,
    attendees: ['user2'],
    tags: ['defi', 'finance', 'blockchain'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    status: 'upcoming'
  },
  {
    id: 'event4',
    title: 'NFT Art Exhibition',
    description: 'Showcase of digital art NFTs with artist talks and networking.',
    date: '2025-04-05',
    time: '18:00',
    location: 'Digital Gallery, San Francisco',
    hostId: 'user3',
    hostName: 'Taylor Kim',
    capacity: 120,
    attendees: ['user1', 'user2', 'user4'],
    tags: ['nft', 'art', 'exhibition'],
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1709&q=80',
    status: 'completed'
  }
];

export const resources: Resource[] = [
  {
    id: 'resource1',
    title: 'Web3 Development Starter Kit',
    description: 'A comprehensive guide to getting started with Web3 development.',
    type: 'lesson',
    url: '/resources/web3-starter-kit',
    tags: ['web3', 'development', 'beginner']
  },
  {
    id: 'resource2',
    title: 'Blockchain Fundamentals Slides',
    description: 'Presentation slides covering the basics of blockchain technology.',
    type: 'slides',
    url: '/resources/blockchain-slides',
    tags: ['blockchain', 'education', 'slides']
  },
  {
    id: 'resource3',
    title: 'Hackathon Project Ideas',
    description: 'A collection of project ideas for Web3 hackathons.',
    type: 'hackathon',
    url: '/resources/hackathon-ideas',
    tags: ['hackathon', 'projects', 'ideas']
  },
  {
    id: 'resource4',
    title: 'Smart Contract Security Checklist',
    description: 'Essential security considerations for smart contract development.',
    type: 'other',
    url: '/resources/security-checklist',
    tags: ['security', 'smart-contracts', 'development']
  }
];

export const feedback: Feedback[] = [
  {
    id: 'feedback1',
    eventId: 'event4',
    userId: 'user2',
    rating: 4,
    comment: 'Great exhibition! Loved the variety of digital art on display.',
    createdAt: '2025-04-06T10:30:00Z'
  },
  {
    id: 'feedback2',
    eventId: 'event4',
    userId: 'user4',
    rating: 5,
    comment: 'The artist talks were incredibly insightful. Would attend again!',
    createdAt: '2025-04-06T14:15:00Z'
  }
];

export const discussions: Discussion[] = [
  {
    id: 'discussion1',
    eventId: 'event1',
    userId: 'user2',
    userName: 'Sam Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'Looking forward to this workshop! Will we need to prepare anything in advance?',
    createdAt: '2025-06-10T09:45:00Z',
    replies: [
      {
        id: 'reply1',
        eventId: 'event1',
        userId: 'user1',
        userName: 'Alex Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content: 'Just bring your laptop with Node.js installed. We\'ll provide all other resources!',
        createdAt: '2025-06-10T10:15:00Z'
      }
    ]
  },
  {
    id: 'discussion2',
    eventId: 'event2',
    userId: 'user4',
    userName: 'Jordan Lee',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'Is this hackathon suitable for beginners or more geared toward experienced developers?',
    createdAt: '2025-07-15T16:30:00Z',
    replies: [
      {
        id: 'reply2',
        eventId: 'event2',
        userId: 'user3',
        userName: 'Taylor Kim',
        userAvatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        content: 'We welcome all skill levels! We\'ll have mentors available to help beginners get started.',
        createdAt: '2025-07-15T17:05:00Z'
      }
    ]
  }
];