import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from './../../components/layouts/Layout';
import { useSelector } from "react-redux";

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
  const adminToken = useSelector((state) => state.auth.jwtToken);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Create FormData to send the file
        const fileData = new FormData();
        fileData.append("file", file);

        // Get the admin token
        if (!adminToken) {
          toast.error("Admin token not found. Please log in.");
          return;
        }

        // Send file to the backend for upload
        const uploadResponse = await axios.post(
          "${import.meta.env.VITE_API_URL}/uploads/upload",
          {file},
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        // Get the file URL from the response
        const fileUrl =
          uploadResponse.data.webContentLink || uploadResponse.data.webViewLink;

        if (!fileUrl) {
          throw new Error("Failed to get file URL.");
        }

        // Update the formData with the file URL
        setFormData((prev) => ({
          ...prev,
          img: fileUrl, // Store the uploaded file URL
        }));

        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      toast.error("Admin token not found. Please log in.");
      return;
    }

    try {
      const payload = {
        ...formData,
      };

      // Send form data to create event
      await axios.post(`${import.meta.env.VITE_API_URL}/events/new`, payload, {
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

            {/* Event Name */}
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

            {/* Department */}
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

            {/* Image Upload */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-300">Upload Image</label>
              <input
                type="file"
                name="img"
                accept="image/*"
                className="border-2 p-2 rounded-lg outline-none bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-blue-500"
                onChange={handleFileChange} // Handle file selection
              />
            </div>

            {/* Event Description */}
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

            {/* Event Structure */}
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

            {/* Event Timeline */}
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

            {/* Team Size */}
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

            {/* Contact Info */}
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

            {/* Prize Money */}
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

            {/* Submit Button */}
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
