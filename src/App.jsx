import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './auth/Login';
import Details from './pages/home/Details';
import './App.css'
import Notifications from './pages/notifications/Notifications';
import CreateNotification from './pages/notifications/CreateNotification';
import Events from './pages/events/Events';
import Users from './pages/users/Users';
import CreateEvent from './pages/events/CreateEvent';
import CreateWorkshops from './pages/workshops/CreateWorkshops';
import Workshops from './pages/workshops/Workshops';
import Coordinators from './pages/coordinators/Coordinators';



function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/details" element={<Details />} />
          {/* notification */}
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/notifications/create" element={<CreateNotification />} />

          {/* events */}
          <Route path="/events" element={<Events />} />
          <Route path="/events/create" element={<CreateEvent />} />

          {/* workshops */}
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshops/create" element={<CreateWorkshops />} />

          {/* users */}
          <Route path="/users" element={<Users />} />

          

            {/*Co-ordinators*/}
            
  <Route path="/coordinators" element={<Coordinators />} />


          

        </Routes>
    </Router>
  );
}

export default App;
