import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import EventCard from './EventCard.jsx';
import EventData from '../../../EventData';
import {
  FaSearch,
} from "react-icons/fa";
const Events = () => {
  const navigate = useNavigate();

  const eventCards = EventData.map((item, index) => {
    return (
      <EventCard key={index} image={item.image} title={item.title} Description={item.Description} />
    );
  });
  console.log(EventData);

  return (
    <Layout>
      <div className="w-full flex items-center justify-between">
        <div className="filtering flex gap-[10px]">
        <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              id="search"
              className=" border border-gray-500 w-[150px] placeholder-gray-500 py-2 px-2 pr-10 rounded-md outline-none"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>

        <select name="category" id="category" placeholder="Select By category" className="border border-gray-500 w-[150px] text-gray-500 py-2 px-2 rounded-md   outline-none p-[8px] ">
        <option value="" disabled>
              Select by Category
            </option>
            <option value="id">Id</option>
            <option value="name">Full Name</option>
            <option value="status">Status</option>
            <option value="type">Type</option>
            <option value="email">Email</option>
            <option value="sign">Signed up</option>
            <option value="userId">User Id</option>
        </select>
        </div>
        <button className="bg-black text-white px-3 py-2 rounded-md font-semibold" onClick={() => navigate("/events/create")}>
          Add +
        </button>
      </div>
      <div className="flex flex-wrap gap-8 justify-start items-center py-[20px]">
        {eventCards}
      </div>
    </Layout>
  );
};

export default Events;
