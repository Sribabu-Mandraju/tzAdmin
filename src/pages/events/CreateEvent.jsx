import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/layouts/Layout";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    dep: "",
    img: null,
    desc: "",
    structure: "",
    timeline: "",
    prizeMoney: "",
    teamSize: "",
    contact_info: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get admin token from local storage
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      alert("Admin token not found. Please log in.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.post("http://localhost:4002/events/new", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken}`,
        },
      });
      alert("Event created successfully!");
      navigate("/events"); // Redirect to events page
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full">
        <div className="h-auto sm:w-[500px] shadow-lg w-full">
          <form
            className="flex flex-col p-3 gap-2 rounded-lg w-full sm:w-[500px] shadow-lg md:p-[50px] border-[1px]"
            onSubmit={handleSubmit}
          >
            <div className="text-black font-bold">Name</div>
            <input
              type="text"
              name="name"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <div className="text-black font-bold">Dep</div>
            <input
              type="text"
              name="dep"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your dept"
              value={formData.dep}
              onChange={handleChange}
              required
            />
            <div className="text-black font-bold">Image</div>
            <input
              type="file"
              name="img"
              className="p-[10px] outline-[#ccc] rounded-lg"
              onChange={handleChange}
              required
            />
            <div className="text-black font-bold">Description</div>
            <input
              type="text"
              name="desc"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your description"
              value={formData.desc}
              onChange={handleChange}
              required
            />
            <div className="text-black font-bold">Structure</div>
            <input
              type="text"
              name="structure"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter the structure"
              value={formData.structure}
              onChange={handleChange}
              required
            />
            <div className="text-black font-bold">Timeline</div>
            <input
              type="text"
              name="timeline"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="1hr"
              value={formData.timeline}
              onChange={handleChange}
              required
            />
            <div className="text-black font-bold">Prize Money</div>
            <input
              type="text"
              name="prizeMoney"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="50000"
              value={formData.prizeMoney}
              onChange={handleChange}
              required
            />
            <div className="text-black font-bold">Team Size</div>
            <input
              type="text"
              name="teamSize"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="4"
              value={formData.teamSize}
              onChange={handleChange}
              required
            />
            <div className="text-black font-bold">Contact Info</div>
            <input
              type="text"
              name="contact_info"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your email"
              value={formData.contact_info}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-black text-white rounded-lg text-center border-2 h-[50px]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEvent;
