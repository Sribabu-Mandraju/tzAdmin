import React from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import JS from "../../assets/js.png";
import reactImage from "../../assets/react.png"
import uiux from "../../assets/ui-ux.png";
import tailwind from "../../assets/tailwind.png";
import fullstack from "../../assets/fullstack.png";

const Events = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="w-full flex items-center justify-end">
        <button className="bg-black text-white px-3 py-2 rounded-md font-semibold" onClick={() => navigate("/events/create")}>Add +</button>
      </div>
      <div className="flex flex-wrap gap-8 justify-center items-center py-[20px]">
      
      </div>
    </Layout>
  )
}

export default Events
