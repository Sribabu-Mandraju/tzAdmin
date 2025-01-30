import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };


  return (
    <>
    <Router>

        <Routes>

        <Route path="/login" element={<Login/>} />

        <Route path="/" element={<ProtectedRoute element={<Home />} />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/dashboard/details" element={<ProtectedRoute element={<Details />} />} />
        <Route path="/dashboard/usersdata" element={<ProtectedRoute element={<UserTable />} />} />

        {/* Notifications */}
        <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} />} />
        <Route path="/notifications/create" element={<ProtectedRoute element={<CreateNotification />} />} />

        {/* Events */}
        <Route path="/events" element={<ProtectedRoute element={<Events />} />} />
        <Route path="/events/create" element={<ProtectedRoute element={<CreateEvent />} />} />
        <Route path="/events/:id" element={<ProtectedRoute element={<EventUsers />} />} />
        <Route path="/events-dashboard" element={<ProtectedRoute element={<EventDashboard />} />} />

        {/* Workshops */}
        <Route path="/workshops" element={<ProtectedRoute element={<Workshops />} />} />
        <Route path="/workshops/create" element={<ProtectedRoute element={<CreateWorkshops />} />} />
        <Route path="/workshops/:id" element={<ProtectedRoute element={<WorkshopDetails />} />} />

        {/* Users */}
        <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
        <Route path="/users/create" element={<ProtectedRoute element={<CreateUser />} />} />

        {/* Mega Project Expo */}
        <Route path="/mega-project-expo" element={<ProtectedRoute element={<MegaProjectExpo />} />} />

        {/* Coordinators */}
        <Route path="/coordinators" element={<ProtectedRoute element={<Coordinators />} />} />

        {/* Hospitality */}
        <Route path="/Hospitality" element={<ProtectedRoute element={<Hospitality />} />} />
      </Routes>
    </Router>
    <ToastContainer /></>
  );
}

export default App;
