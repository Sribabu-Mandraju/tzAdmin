import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import EventCard from './EventCard.jsx';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

const Events = () => {
  const eventsData = useSelector((state) => state.events.data);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch events on component mount
  
    const fetchEvents =  () => {
      
        

        
          setEvents(eventsData);
          setFilteredEvents(eventsData);
        
      
    };

    useEffect(() => {
      fetchEvents(); // Fetch events on component mount
    }, []);
  

  // Handle search and filter changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    applyFilters(e.target.value, selectedCategory);
  };

  const handleFilter = (e) => {
    setSelectedCategory(e.target.value);
    applyFilters(searchQuery, e.target.value);
  };
  
  const applyFilters = (search, category) => {
    let filtered = events;

    if (search) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((event) => event.dep.toLowerCase() === category.toLowerCase());
    }

    setFilteredEvents(filtered);
  };

  return (
    <Layout>
      <div className="w-full flex items-center justify-between flex-wrap gap-[10px]">
        <div className="filtering flex flex-wrap gap-[10px] items-center">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="border border-gray-500 w-[150px] placeholder-gray-500 py-2 px-2 pr-10 rounded-md outline-none"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>

          {/* Category Filter */}
          <select
            name="category"
            value={selectedCategory}
            onChange={handleFilter}
            className="border border-gray-500 w-[150px] text-gray-500 py-2 px-2 rounded-md outline-none"
          >
            <option value="">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="MECH">MECH</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Add Event Button */}
        <button
          className="bg-black text-white px-3 py-2 rounded-md font-semibold"
          onClick={() => navigate("/events/create")}
        >
          Add +
        </button>
      </div>

      {/* Event Cards */}
      <div className="flex flex-wrap gap-8 justify-center lg:justify-start items-center py-[20px]">
        {filteredEvents.map((event) => (
          <EventCard key={event._id} {...event} refreshEvents={fetchEvents}/>
        ))}
      </div>
    </Layout>
  );
};

export default Events;
