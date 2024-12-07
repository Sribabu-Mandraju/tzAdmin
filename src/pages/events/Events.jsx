import React from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import RCard from "../coordinators/card";
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
        <RCard image={fullstack} name="Sribabu Mandraju" profession="Fullstack Developer" />
        <RCard image={tailwind} name="DharaneeswarReddy" profession="Frontend Developer"/>
        <RCard image={reactImage} name="Sireesha Sibbala" profession="Frontend Developer"/>
        <RCard image={uiux} name="Nakshatra Yeluri" profession="UI/UX Designer"/>
        <RCard image={JS} name="Bindu sree" profession="Frontend Developer"/>
      </div>
    </Layout>
  )
}

export default Events
