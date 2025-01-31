import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCogs, FaBroadcastTower, FaWrench, FaBuilding, FaFlask, FaBolt, FaCube, FaBook } from "react-icons/fa";
import Layout from "../components/layouts/Layout";
import { useSelector } from "react-redux";

const tabs = [
  { label: "CSE", icon: FaCogs },
  { label: "ECE", icon: FaBroadcastTower },
  { label: "MECH", icon: FaWrench },
  { label: "CIVIL", icon: FaBuilding },
  { label: "CHEM", icon: FaFlask },
  { label: "EEE", icon: FaBolt },
  { label: "MME", icon: FaCube },
  { label: "PUC", icon: FaBook },
];

const EventDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("CSE");
  const [events, setEvents] = useState([]);
  const eventsDataList = useSelector((state) => state.events.data);
  console.log(eventsDataList)
  const [modalData, setModalData] = useState(null);
  const [modalUsers, setModalUsers] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, [selectedTab]);

  const fetchEvents = async () => {
    try {
      // const adminToken = localStorage.getItem("adminToken");
      // const response = await axios.get(`https://tzbackendnewversion.onrender.com/events/all-events`,
      //   {
      //     headers: { Authorization: `Bearer ${adminToken}` },
      //   }
      // );
      // console.log(response.data);
      const filteredEvents = eventsDataList.filter(event => event.dep === selectedTab);
      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchUsers = async (userIds) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const userDetails = await Promise.all(
        userIds.map(id =>
          axios.get(`https://tzbackenddevmode.onrender.com/user/${id}`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          })
        )
      );
      console.log(userDetails);
      setModalUsers(userDetails.map(res => res.data.user));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleViewUsers = (event) => {
    setModalData(event);
    fetchUsers(event.registerdStudents.flat());
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Event Dashboard</h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setSelectedTab(tab.label)}
              className={`flex items-center px-8 py-4 border rounded-lg text-lg font-medium transition duration-200 ${
                selectedTab === tab.label
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <tab.icon className="mr-2 text-2xl" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Events Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-950 text-center">
                <th className="border border-gray-300 px-6 py-3 ">Event Name</th>
                <th className="border border-gray-300 px-6 py-3 ">Department</th>
                <th className="border border-gray-300 px-6 py-3 ">Registered Students</th>
                {/**<th className="border border-gray-300 px-6 py-3 text-left">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="text-left hover:bg-[#0A69A5]">
                  <td className="border border-gray-300 px-6 py-3">{event.name}</td>
                  <td className="border border-gray-300 px-6 py-3">{event.dep}</td>
                  <td className="border border-gray-300 px-6 py-3">{event.registerdStudents.flat().length}</td>
                 {/**  <td className="border border-gray-300 px-6 py-3">
                    <button
                      onClick={() => handleViewUsers(event)}
                      className="text-blue-600 hover:underline hover:text-gray-100"
                    >
                      View
                    </button>
                  </td>
                  */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black p-6 rounded-md shadow-lg w-1/2">
              <h2 className="text-2xl font-bold mb-4">Registered Students</h2>
              <ul className="space-y-3">
                {modalUsers.map((user, index) => (
                  <li
                    key={index}
                    className="p-3 border rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => alert(`Name: ${user.firstName} \nCollege: ${user.college} \nBranch: ${user.branch}`)}
                  >
                    {user.firstName} {user.lastName}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setModalData(null)}
                className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EventDashboard;
