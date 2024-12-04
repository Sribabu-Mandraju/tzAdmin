import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import { FiClock } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";

const Notifications = () => {

  const navigate = useNavigate()
  

  return (
    <Layout>
      <div className="w-full flex items-center justify-end">
        <button className="bg-black text-white px-3 py-2 rounded-md font-semibold" onClick={() => navigate("/notifications/create")}>Add +</button>
      </div>
      <div className="details-table w-full p-[10px] overflow-x-auto ">
  <table className="border-collapse w-full table-auto  whitespace-nowrap shadow-lg even:bg-[aliceblue] rounded-lg">
    <thead className='bg-[aliceblue]'>
      <tr className=" text-left">
        <th className=" p-[10px]" scope="col">Name</th>
        <th className=" p-[10px]" scope="col">Admin</th>
        <th className=" p-[10px]" scope="col">Members</th>
        <th className=" p-[10px]" scope="col">Status</th>
        <th className=" p-[10px]" scope="col">Runtime</th>
        <th className=" p-[10px]" scope="col">Finished Date</th>
      </tr>
    </thead>
    <tbody>
      <tr className='even:bg-[aliceblue] odd:bg-[#ccc]'>
        <td className=" p-[10px]">Client Onboarding-Circle</td>
        <td className=" p-[10px]">Samantha J</td>
        <td className=" p-[10px]">3</td>
        <td className=" p-[10px] flex justify-start items-center gap-[5px]"><FiClock/>In Progress</td>
        <td className=" p-[10px]">6 hours</td>
        <td className=" p-[10px]">6 mon</td>
      </tr>
      <tr className='even:bg-[aliceblue] odd:bg-[#ccc]'>
        <td className=" p-[10px]">Meeting with Webflow & Notion</td>
        <td className=" p-[10px]">Bob P</td>
        <td className=" p-[10px]">4</td>
        <td className=" p-[10px] flex justify-start items-center gap-[5px]"><FaRegCheckCircle />Done</td>
        <td className=" p-[10px]">2 hours</td>
        <td className=" p-[10px]">7 mon</td>
      </tr>
      <tr className='even:bg-[aliceblue] odd:bg-[#ccc]'>
        <td className="p-[10px]">First Handoff with Engineers</td>
        <td className="p-[10px]">Kate O</td>
        <td className="p-[10px]">10</td>
        <td className="p-[10px] flex justify-start items-center gap-[5px]"><FiClock/> In Progress</td>
        <td className="p-[10px]">3 days</td>
        <td className="p-[10px]">10 Fri</td>
      </tr>
      <tr className='even:bg-[aliceblue] odd:bg-[#ccc]'>
        <td className=" p-[10px]">Client Drafting (2) with Engineers</td>
        <td className=" p-[10px]">Jack F</td>
        <td className=" p-[10px]">7</td>
        <td className=" p-[10px] flex justify-start items-center gap-[5px]"><FiClock/> In Progress</td>
        <td className=" p-[10px]">1 Week</td>
        <td className=" p-[10px]">19 Sun</td>
      </tr>
    </tbody>
  </table>
</div>

    </Layout>
  );
};

export default Notifications;
