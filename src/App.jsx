<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
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
import CreateProject from './pages/MegaProjectExpo/CreateProject';

import { useDispatch } from 'react-redux';
=======
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
import Login from "./auth/Login";
import Details from "./pages/home/Details";
import "./App.css";
import Notifications from "./pages/notifications/Notifications";
import CreateNotification from "./pages/notifications/CreateNotification";
import Events from "./pages/events/Events";
import Users from "./pages/users/Users";
import CreateEvent from "./pages/events/CreateEvent";
import EventUsers from "./pages/events/EventUsers";
import CreateWorkshops from "./pages/workshops/CreateWorkshops";
import Workshops from "./pages/workshops/Workshops";
import WorkshopDetails from "./pages/workshops/WorkshopDetails";
import Coordinators from "./pages/coordinators/Coordinators";
import CreateUser from "./pages/users/CreateUser";
import Hospitality from "./pages/Hospitality/Hospitality";
import EventDashboard from "./pages/EventDashboard";
import UserTable from "./components/filters/userTable";
import MegaProjectExpo from "./pages/MegaProjectExpo/MegaProjectExpo";
import { useDispatch } from "react-redux";
>>>>>>> e1ecbe988c6877fef506766ae963c4000d7eb8f6

import { fetchEvents } from "./store/slices/eventSlice";
import { fetchHackathon } from "./store/slices/hackathonSlice";
import { fetchWorkshops } from "./store/slices/workshopSlice";
import { fetchMegaExpo } from "./store/slices/megaExpoSlice";
import { fetchNotifications } from "./store/slices/notificationSlice";
import { fetchUsers } from "./store/slices/userSlice";
function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  // const { data, status, error } = useSelector((state) => state.events);

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  useEffect(() => {
    dispatch(fetchUsers());
    if (role === "Core team" || role === "Web team") {
      dispatch(fetchEvents());
      dispatch(fetchHackathon());
      dispatch(fetchWorkshops());
      dispatch(fetchMegaExpo());
      dispatch(fetchNotifications());
    }
    else if (role === "EventCoordinator"){
      dispatch(fetchEvents());
    }
  
    else if (role === "WorkshopCoordinator"){
      dispatch(fetchWorkshops());
    }
    else if (role === "NotificationManager"){
      dispatch(fetchNotifications());
    }
    else if (role === "RegistrationManager"){
      dispatch(fetchMegaExpo());
      dispatch(fetchHackathon());
    }
  }, [dispatch,isAuthenticated])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<ProtectedRoute element={<Home />} />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route
            path="/dashboard/details"
            element={<ProtectedRoute element={<Details />} />}
          />
          <Route
            path="/dashboard/usersdata"
            element={<ProtectedRoute element={<UserTable />} />}
          />

          {/* Notifications */}
          <Route
            path="/notifications"
            element={<ProtectedRoute element={<Notifications />} />}
          />
          <Route
            path="/notifications/create"
            element={<ProtectedRoute element={<CreateNotification />} />}
          />

          {/* Events */}
          <Route
            path="/events"
            element={<ProtectedRoute element={<Events />} />}
          />
          <Route
            path="/events/create"
            element={<ProtectedRoute element={<CreateEvent />} />}
          />
          <Route
            path="/events/:id"
            element={<ProtectedRoute element={<EventUsers />} />}
          />
          <Route
            path="/events-dashboard"
            element={<ProtectedRoute element={<EventDashboard />} />}
          />

          {/* Workshops */}
          <Route
            path="/workshops"
            element={<ProtectedRoute element={<Workshops />} />}
          />
          <Route
            path="/workshops/create"
            element={<ProtectedRoute element={<CreateWorkshops />} />}
          />
          <Route
            path="/workshops/:id"
            element={<ProtectedRoute element={<WorkshopDetails />} />}
          />

          {/* Users */}
          <Route
            path="/users"
            element={<ProtectedRoute element={<Users />} />}
          />
          <Route
            path="/users/create"
            element={<ProtectedRoute element={<CreateUser />} />}
          />

          {/* Mega Project Expo */}
          <Route
            path="/mega-project-expo"
            element={<ProtectedRoute element={<MegaProjectExpo />} />}
          />

<<<<<<< HEAD
        {/* Mega Project Expo */}
        <Route path="/mega-project-expo" element={<ProtectedRoute element={<MegaProjectExpo />} />} />
        <Route path="/mega-project-expo/create" element={<ProtectedRoute element={<CreateProject />} />} />
        {/* Coordinators */}
        <Route path="/coordinators" element={<ProtectedRoute element={<Coordinators />} />} />

        {/* Hospitality */}
        <Route path="/Hospitality" element={<ProtectedRoute element={<Hospitality />} />} />
      </Routes>
    </Router>
    <ToastContainer /></>
=======
          {/* Coordinators */}
          <Route
            path="/coordinators"
            element={<ProtectedRoute element={<Coordinators />} />}
          />

          {/* Hospitality */}
          <Route
            path="/Hospitality"
            element={<ProtectedRoute element={<Hospitality />} />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
>>>>>>> e1ecbe988c6877fef506766ae963c4000d7eb8f6
  );
}

export default App;
