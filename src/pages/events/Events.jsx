import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import EventCard from './EventCard.jsx';
import EventData from '../../../EventData';
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
      <div className="w-full flex items-center justify-end">
        <button className="bg-black text-white px-3 py-2 rounded-md font-semibold" onClick={() => navigate("/events/create")}>
          Add +
        </button>
      </div>
      <div className="flex flex-wrap gap-8 justify-center items-center py-[20px]">
        {eventCards}
      </div>
    </Layout>
  );
};

export default Events;
