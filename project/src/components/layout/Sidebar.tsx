import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, BookOpen, LayoutDashboard, Settings, PlusCircle } from 'lucide-react';
import { currentUser } from '../../data/mockData';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const hostNavigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'My Events', href: '/my-events', icon: Calendar },
    { name: 'Create Event', href: '/create-event', icon: PlusCircle },
    { name: 'Resources', href: '/resources', icon: BookOpen },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const attendeeNavigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Discover Events', href: '/events', icon: Calendar },
    { name: 'My RSVPs', href: '/my-rsvps', icon: Calendar },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const navigation = currentUser.role === 'host' ? hostNavigation : attendeeNavigation;

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link to="/" className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EasyA</span>
            </Link>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src={currentUser.avatar}
                alt={currentUser.name}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {currentUser.name}
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;