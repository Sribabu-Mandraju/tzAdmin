import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './auth/Login';
import Details from './pages/home/Details';
import './App.css'



function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/details" element={<Details />} />
        </Routes>
    </Router>
  );
}

export default App;
