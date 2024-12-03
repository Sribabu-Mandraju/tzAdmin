import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';


const Notifications = () => {

  const navigate = useNavigate()
  

  return (
    <Layout>
      <div className="w-full overflow-x-hidden  flex items-center justify-end ">
        <button className="bg-black text-white px-3 py-2 rounded-md font-semibold" onClick={() => navigate("/notifications/create")}>Add +</button>
      </div>
      <div className='w-full overflowx-scroll'>
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
          <tr>
            <td className="p-4">1  Sribabu Mandraju</td>
            <td className="p-4">Successful</td>
            <td className="p-4">web</td>
            <td className="p-4">sribabumandraju@gmail.com</td>
            <td className="p-4">just now</td>
            <td className="p-4">tz2k2501</td>
          </tr>
          <tr>
            <td className="p-4">2  Dharaneeswar Reddy Avula</td>
            <td className="p-4">Successful</td>
            <td className="p-4">web</td>
            <td className="p-4">dharaniswarreddyavula@gmail.com</td>
            <td className="p-4">2 days ago</td>
            <td className="p-4">tz2k2502</td>
          </tr>
          <tr>
            <td className="p-4">3 Rakesh T</td>
            <td className="p-4">Successful</td>
            <td className="p-4">ML</td>
            <td className="p-4">rakesh@gmail.com</td>
            <td className="p-4">1 days ago</td>
            <td className="p-4">tz2k2503</td>
          </tr>
        </tbody>


      </table>
      </div>
    </Layout>
  );
};

export default Notifications;
