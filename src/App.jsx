import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './auth/Login';
import Details from './pages/home/Details';
import './App.css'
import Notifications from './pages/notifications/Notifications';
import CreateNotification from './pages/notifications/CreateNotification';
import Events from './pages/events/Events';



function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/details" element={<Details />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/notifications/create" element={<CreateNotification />} />
          <Route path="/events" element={<Events />} />

        </Routes>
    </Router>
  );
}

export default App;
