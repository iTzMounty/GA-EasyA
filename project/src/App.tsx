import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import MyEvents from './pages/MyEvents';
import CreateEvent from "./pages/CreateEvent";
import EventCreated from "./pages/EventCreated";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event-created" element={<EventCreated />} />
      </Routes>
    </Router>
  );
}

export default App;