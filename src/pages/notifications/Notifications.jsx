import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';


const Notifications = () => {
  const navigate = useNavigate();
  

  const data=[
    {id:1,name:"hi",status:"succesful",type:"assigned",email:"abc@gmail.com",sign:"1 year ago",userId:"890"},
    {id:2,name:"hello",status:"succesful",type:"assigned",email:"abc@gmail.com",sign:"1 year ago",userId:"89"},
    {id:3,name:"hey",status:"succesful",type:"assigned",email:"abc@gmail.com",sign:"1 year ago",userId:"8"},
  ]


  return (
    <Layout>
      <div className="w-full  flex items-center justify-end">
        <button className="bg-black text-white px-3 py-2 rounded-md font-semibold" onClick={() => navigate("/notifications/create")}>Add +</button>
      </div>
      <div className='w-full overflow-x-scroll lg:overflow-x-hidden rounded-md'>
      <table className="border w-full mt-6  sm:w-full  text-left text-nowrap rounded-md">
        <thead className="bg-gray-200">
            <th className="p-3 ">FULL NAME</th>
            <th className="p-3">STATUS</th>
            <th className="p-3">TYPE</th>
            <th className="p-3">EMAIL</th>
            <th className="p-3">SIGNED UP</th>
            <th className="p-3">USER ID</th>
        </thead>
        <tbody>
          {data.map((item,index)=>(
            <tr key={index} className='even:bg-[aliceblue] odd:bg-[#ccc]'>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.status}</td>
              <td className="p-3">{item.type}</td>
              <td className="p-3">{item.email}</td>
              <td className="p-3">{item.sign}</td>
              <td className="p-3">{item.userId}</td>
            </tr>
          ))}
        </tbody>


      </table>
      </div>
    </Layout>
  );
};

export default Notifications;
