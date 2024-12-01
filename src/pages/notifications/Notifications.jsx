import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';


const Notifications = () => {

  const navigate = useNavigate()
  

  return (
    <Layout>
      <div className="w-full flex items-center justify-end">
        <button className="bg-black text-white px-3 py-2 rounded-md font-semibold" onClick={() => navigate("/notifications/create")}>Add +</button>
      </div>
    </Layout>
  );
};

export default Notifications;
