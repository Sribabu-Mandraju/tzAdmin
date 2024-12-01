import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layouts/Layout'

const Notifications = () => {
    const navigate = useNavigate()
  return (
    <Layout>
      {/* <div className="text-center text-5xl">Notifications</div> */}
      <button className="px-3 py-2 bg-black rounded-md text-white" onClick={() => navigate("/notifications/create")}>Create Notification</button>
    </Layout>
  )
}



export default Notifications
