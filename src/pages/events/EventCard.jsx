import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaTag,
  FaUserAlt,
  FaPhoneAlt,
  FaGift,
  FaTimes,
  FaEdit,
} from "react-icons/fa";
import axios from "axios";

const EventCard = ({ id, img, name, desc, dep, timeline, teamSize, contact_info, prizeMoney }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
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
    try {
      const response = await axios.put(`https://tzbackenddevmode.onrender.com/events/edit/${id}`, editData);
      setSuccessMessage("Event updated successfully!");
      toggleEditModal();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Card */}
      <div className="card w-[300px] flex flex-col items-center gap-4 shadow-lg border border-gray-200 py-6 rounded-lg px-6 bg-white hover:shadow-2xl transition-shadow">
        {/* Event Image */}
        <div className="w-full h-[180px] overflow-hidden rounded-md">
          <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Event Title */}
        <h3 className="font-bold text-lg text-center text-gray-800 mt-2">{name}</h3>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={toggleViewModal}
            className="bg-green-600 text-white px-4 py-1 rounded-md font-medium hover:bg-green-700 transition"
          >
            View
          </button>
          <button
            onClick={toggleEditModal}
            className="bg-blue-600 text-white px-4 py-1 rounded-md font-medium hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FaEdit />
            Edit
          </button>
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-[600px] h-[90vh] bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Modal Content */}
            <div className="overflow-y-auto h-full p-6">
              {/* Close Button */}
              <button
                onClick={toggleViewModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
              >
                <FaTimes size={20} />
              </button>

              {/* Modal Details */}
              <div className="flex flex-col items-center">
                <div className="w-full h-[200px] overflow-hidden rounded-md mb-4">
                  <img src={img} alt={name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-2xl text-center text-gray-800 mb-4">{name}</h3>
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <FaTag className="text-blue-600" />
                    <p className="text-gray-600 text-sm">{dep}</p>
                  </div>
                  <div className="mb-4 text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: desc }}></div>
                  <div className="flex items-start gap-2 mb-4">
                    <FaCalendarAlt className="text-blue-600 mt-[2px]" />
                    <div className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: timeline }}></div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <FaUserAlt className="text-blue-600" />
                    <p className="text-gray-600 text-sm">Team Size: {teamSize}</p>
                  </div>
                  <div className="flex items-start gap-2 mb-4">
                    <FaPhoneAlt className="text-blue-600 mt-[2px]" />
                    <div className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: contact_info }}></div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <FaGift className="text-blue-600" />
                    <div className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: prizeMoney }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
            <form onSubmit={handleEditSubmit} className="p-6">
              <button
                onClick={toggleEditModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
              >
                <FaTimes size={20} />
              </button>
              <h3 className="font-bold text-xl text-gray-800 mb-4">Edit Event</h3>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="Event Name"
                />
                <input
                  type="text"
                  name="dep"
                  value={editData.dep}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="Department"
                />
                <textarea
                  name="desc"
                  value={editData.desc}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="Description"
                  rows="4"
                ></textarea>
                <input
                  type="text"
                  name="timeline"
                  value={editData.timeline}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="Timeline"
                />
                <input
                  type="text"
                  name="teamSize"
                  value={editData.teamSize}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="Team Size"
                />
                <input
                  type="text"
                  name="contact_info"
                  value={editData.contact_info}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="Contact Info"
                />
                <input
                  type="text"
                  name="prizeMoney"
                  value={editData.prizeMoney}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="Prize Money"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default EventCard;
