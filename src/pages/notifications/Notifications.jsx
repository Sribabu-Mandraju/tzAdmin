import React from 'react';
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
      <div className="w-full flex items-center justify-end mb-4">
        <button
          className="bg-black text-white px-3 py-2 rounded-md font-semibold"
          onClick={() => navigate("/notifications/create")}
        >
          Add +
        </button>
      </div>

      <div>
        <table className="w-full table-auto  border-spacing-4">
          <thead className="text-gray-600">
            <tr className="bg-gray-200 bg-opacity-60 h-[40px]">
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Signed Up</th>
              <th className="px-4 py-2 text-left">User ID</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
          {data.map((item,index)=>(
            <tr key={index}>
             
              <td className="px-4 py-2">item.name</td>
              <td className="px-4 py-2">item.status</td>
              <td className="px-4 py-2">item.type</td>
              <td className="px-4 py-2">item.email</td>
              <td className="px-4 py-2">item.sign</td>
              <td className="px-4 py-2">item.userId</td>

            </tr>
            ))}
            {/* Add more rows here as needed */}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Notifications;
