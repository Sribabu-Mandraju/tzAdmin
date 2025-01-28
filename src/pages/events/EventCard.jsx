import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  FaCalendarAlt,
  FaTag,
  FaUserAlt,
  FaPhoneAlt,
  FaGift,
  FaTimes,
  FaEdit,
  FaTrash 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import axios from "axios";

const EventCard = ({ _id, img, name, desc, dep, timeline, teamSize, contact_info, prizeMoney,refreshEvents }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    _id,
    name,
    img,
    desc,
    dep,
    timeline,
    teamSize,
    contact_info,
    prizeMoney,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  // Modal toggle handlers
  const toggleViewModal = () => setIsViewModalOpen(!isViewModalOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  // Handle input changes in the edit modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const adminToken = localStorage.getItem('adminToken');
    console.log(adminToken);
    try {
      const response = await axios.put(
        `http://localhost:4002/events/edit/${_id}`,
        editData, // Send editData as payload
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json', // Specify content type
          },
        }
      );

      toast.success("Event updated successfully!");
      toggleEditModal();
      refreshEvents();
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Error updating event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to event details page
  const navigateToEventDetails = () => {
    console.log("Event ID: ", _id); 
    navigate(`/events/${_id}`);
  };

  const handleDelete = async () => {
    const adminToken = localStorage.getItem("adminToken");
  
    if (!adminToken) {
      toast.error("Authorization token is missing. Please log in again.");
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:4002/events/delete-event/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      toast.success("Event deleted successfully!");
      toggleViewModal(); // Close modal after deleting
      refreshEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete the event. Please try again.");
    }
  };
  

  return (
    <div>
      {/* Card */}
      <div className="card w-[300px] flex flex-col items-center gap-4 py-6 rounded-lg px-6 bg-white bg-opacity-30 backdrop-blur-md shadow-[0px_4px_8px_0px_rgba(10,105,165,0.2)] hover:shadow-[0px_8px_16px_0px_rgba(10,105,165,0.4)] transition-shadow">
        {/* Event Image */}
        <div className="w-full h-[180px] overflow-hidden rounded-md">
          <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Event Title */}
        <h3 className="font-bold text-lg text-center text-gray-100 mt-2 uppercase">{name}</h3>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={toggleViewModal}
            className="bg-[#4dc14dcd] text-white px-4 py-1 rounded-md font-medium hover:bg-green-700 transition"
          >
            View
          </button>
          <button
            onClick={toggleEditModal}
            className="bg-[#4242e6c7] text-white px-4 py-1 rounded-md font-medium hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FaEdit />
            Edit
          </button>
          {/* New Button for navigating to event details */}
          <button
            onClick={navigateToEventDetails}
            className="bg-[#aa33aed2] text-white px-4 py-1 rounded-md font-medium hover:bg-purple-700 transition"
          >
            Users
          </button>
        </div>
      </div>

      {/* View Modal */}
    {isViewModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="relative w-full max-w-[600px] h-[90vh] bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
          {/* Modal Content */}
          <div className="overflow-y-auto h-full p-6">
            {/* Close Button */}
            <button
              onClick={toggleViewModal}
              className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 transition"
            >
              <FaTimes size={20} />
            </button>

            {/* Modal Details */}
            <div className="flex flex-col items-center">
              <div className="w-full h-[200px] overflow-hidden rounded-md mb-4">
                <img src={img} alt={name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-2xl text-center text-black mb-4">{name}</h3>
              <div className="w-full">
                <div className="flex items-center gap-2 mb-4">
                  <FaTag className="text-blue-600" />
                  <p className="text-black text-sm">{dep}</p>
                </div>
                <div className="mb-4 text-black text-sm" dangerouslySetInnerHTML={{ __html: desc }}></div>
                <div className="flex items-start gap-2 mb-4">
                  <FaCalendarAlt className="text-blue-600 mt-[2px]" />
                  <div className="text-black text-sm" dangerouslySetInnerHTML={{ __html: timeline }}></div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <FaUserAlt className="text-blue-600" />
                  <p className="text-black text-sm">Team Size: {teamSize}</p>
                </div>
                <div className="flex items-start gap-2 mb-4">
                  <FaPhoneAlt className="text-blue-600 mt-[2px]" />
                  <div className="text-black text-sm" dangerouslySetInnerHTML={{ __html: contact_info }}></div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <FaGift className="text-blue-600" />
                  <div className="text-black text-sm" dangerouslySetInnerHTML={{ __html: prizeMoney }}></div>
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <div className="mt-4 flex justify-center">
            <button
              onClick={handleDelete}
              className="bg-[#d82a2acf] text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-600 transition flex items-center gap-2"
            >
              <FaTrash size={14} />
              <span>Delete Event</span>
            </button>
            </div>
          </div>
        </div>
      </div>
    )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="relative w-full max-w-[600px] h-[90%] bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl"
            style={{
              overflowY: "scroll",
              scrollbarWidth: "none", // For Firefox
            }}
          >
            <style>
              {`
              /* For Webkit-based browsers (Chrome, Safari) */
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              `}
            </style>
            <form onSubmit={handleEditSubmit} className="p-6 hide-scrollbar">
              {/* Close Icon */}
              <button
                onClick={toggleEditModal} // Close modal on click
                className="absolute top-4 right-4 text-gray-100 hover:text-gray-800 transition"
                aria-label="Close Modal"
              >
                <FaTimes size={20} />
              </button>
              
              <h3 className="font-bold text-2xl text-white mb-4 text-center">Edit Event</h3>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-70 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Event Name"
                />
                <select
                  name="dep"
                  value={editData.dep}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-70 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select Department</option>
                  <option value="PUC">PUC</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="MME">MME</option>
                  <option value="CHEM">CHEM</option>
                  <option value="CIVIL">CIVIL</option>
                </select>
                <input
                  type="text"
                  name="img"
                  value={editData.img}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-70 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Image URL"
                />
                <textarea
                  name="desc"
                  value={editData.desc}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-70 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description"
                  rows="4"
                ></textarea>
                <textarea
                  name="structure"
                  value={editData.structure}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-70 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Event Structure"
                  rows="4"
                ></textarea>
                <input
                  type="text"
                  name="timeline"
                  value={editData.timeline}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-70 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Timeline"
                />
                <input
                  type="number"
                  name="teamSize"
                  value={editData.teamSize}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-70 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2" 
                  placeholder="TeamSize"
                />
                  <input
                  type="text"
                  name="contact_info"
                  value={editData.contact_info}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-70 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contact Info"
                />
                <input
                  type="text"
                  name="prizeMoney"
                  value={editData.prizeMoney}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-70 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Prize Money"
                />
                <button
                  type="submit"
                  className="bg-blue-600 bg-opacity-80 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default EventCard;
