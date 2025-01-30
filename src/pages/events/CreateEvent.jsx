import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from './../../components/layouts/Layout'
const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    dep: "",
    img: "",
    desc: "",
    structure: "",
    timeline: "",
    teamSize: 1,
    contact_info: "",
    prizeMoney: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      toast.error("Admin token not found. Please log in.");
      return;
    }

    try {
      await axios.post("https://tzbackendnewversion.onrender.com/events/new", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });
      toast.success("Event created successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    }
  };

  return (
    <Layout>
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="h-auto mt-4 sm:w-[500px] shadow-lg w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg">
        <form
          className="flex flex-col p-5 gap-4 rounded-lg text-gray-100"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center text-gray-200">
            Create Event
          </h2>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              className="border-2 p-2 rounded-lg outline-none bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-blue-500"
              placeholder="Event name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-300">Department</label>
            <select
              name="dep"
              className="border-2 p-2 rounded-lg outline-none bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-blue-500"
              value={formData.dep}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="PUC">PUC</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="MME">MME</option>
              <option value="CHEM">CHEM</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>


          <div className="flex flex-col">
            <label className="font-semibold text-gray-300">Image URL</label>
            <input
              type="text"
              name="img"
              className="border-2 p-2 rounded-lg outline-none bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-blue-500"
              placeholder="Image URL"
              value={formData.img}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-300">Description</label>
            <textarea
              name="desc"
              className="border-2 p-2 rounded-lg outline-none bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-blue-500"
              placeholder="Event description"
              value={formData.desc}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-300">Structure</label>
            <textarea
              name="structure"
              className="border-2 p-2 rounded-lg outline-none bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-blue-500"
              placeholder="Event structure"
              value={formData.structure}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-300">Timeline</label>
            <input
              type="text"
              name="timeline"
              className="border-2 p-2 rounded-lg outline-none bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-blue-500"
              placeholder="Event timeline"
              value={formData.timeline}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-300">Team Size</label>
            <input
              type="number"
              name="teamSize"
              className="border-2 p-2 rounded-lg outline-none bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-blue-500"
              placeholder="Team size"
              value={formData.teamSize}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-300">Contact Info</label>
            <input
              type="text"
              name="contact_info"
              className="border-2 p-2 rounded-lg outline-none bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-blue-500"
              placeholder="Contact email or phone"
              value={formData.contact_info}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-300">Prize Money</label>
            <input
              type="text"
              name="prizeMoney"
              className="border-2 p-2 rounded-lg outline-none bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-blue-500"
              placeholder="Prize money"
              value={formData.prizeMoney}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 rounded-lg font-semibold hover:opacity-90"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default CreateEvent;
