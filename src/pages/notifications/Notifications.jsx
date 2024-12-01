import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layouts/Layout'

const Notifications = () => {
    const navigate = useNavigate()
  return (
    <Layout>
      {/* <div className="text-center text-5xl">Notifications</div> */}
      <div className="w-full flex items-center justify-end">
      <button className="px-3 py-2 bg-black rounded-md text-white" onClick={() => navigate("/notifications/create")}>Create Notification</button>
      </div>
    </Layout>
  )
}



export default Notifications
