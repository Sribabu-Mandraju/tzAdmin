import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/home/Home';
import Login from './auth/Login';
import Details from './pages/home/Details';
import './App.css'
import Notifications from './pages/notifications/Notifications';
import CreateNotification from './pages/notifications/CreateNotification';
import Events from './pages/events/Events';
import Users from './pages/users/Users';
import CreateEvent from './pages/events/CreateEvent';
import EventUsers from './pages/events/EventUsers'
import CreateWorkshops from './pages/workshops/CreateWorkshops';
import Workshops from './pages/workshops/Workshops';
import WorkshopDetails from './pages/workshops/WorkshopDetails';
import Coordinators from './pages/coordinators/Coordinators';
import CreateUser from './pages/users/CreateUser';
import Hospitality from './pages/Hospitality/Hospitality';
import EventDashboard from './pages/EventDashboard';
import UserTable from './components/filters/userTable';
import MegaProjectExpo from './pages/MegaProjectExpo/MegaProjectExpo';
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/details" element={<Details />} />
          <Route path="/dashboard/usersdata" element={<UserTable />}/>
          {/* notification */}
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/notifications/create" element={<CreateNotification />} />

          {/* events */}
          <Route path="/events" element={<Events />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventUsers/>} />
          <Route path="/events-dashboard" element={<EventDashboard></EventDashboard>} />

          {/* workshops */}
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshops/create" element={<CreateWorkshops />} />
          <Route path="/workshops/:id" element={<WorkshopDetails/>}/>

          {/* users */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<CreateUser/>} />
          {/*Mega project expo */}
          <Route path="/mega-project-expo" element={<MegaProjectExpo />} />
          {/*Co-ordinators*/}   
          <Route path="/coordinators" element={<Coordinators />} />
          <Route path="/Hospitality" element={<Hospitality />} />
        </Routes>
    </Router>
    <ToastContainer /></>
  );
}

export default App;
  //  ..