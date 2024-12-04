import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';


const Notifications = () => {
  const navigate = useNavigate();
  

  const data=[
    {id:1,name:"hi",status:"succesful",type:"assigned",email:"gmail.com",sign:"1 year ago",userId:"890"},
    {id:2,name:"hello",status:"succesful",type:"assigned",email:"gmail.com",sign:"1 year ago",userId:"89"},
    {id:3,name:"hey",status:"succesful",type:"assigned",email:"gmail.com",sign:"1 year ago",userId:"8"},
  ]


  return (
    <Layout>
      <div className="w-full  flex items-center justify-end">
        <button className="bg-black text-white px-3 py-2 rounded-md font-semibold" onClick={() => navigate("/notifications/create")}>Add +</button>
      </div>
      <div className='w-full overflow-x-scroll'>
      <table className="border w-full min-w-[1000px] mt-4  sm:w-full  text-left text-nowrap">
        <thead className="bg-gray-200">
            <th className="p-4 ">FULL NAME</th>
            <th className="p-4">STATUS</th>
            <th className="p-4">TYPE</th>
            <th className="p-4">EMAIL</th>
            <th className="p-4">SIGNED UP</th>
            <th className="p-4">USER ID</th>
        </thead>
        <tbody>
          {data.map((item,index)=>(
            <tr key={index}>
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.status}</td>
              <td className="p-4">{item.type}</td>
              
              <td className="p-4">{item.email}</td>
              <td className="p-4">{item.sign}</td>
              <td className="p-4">{item.userId}</td>
            </tr>
          ))}
        </tbody>


      </table>
      </div>
    </Layout>
  );
};

export default Notifications;
