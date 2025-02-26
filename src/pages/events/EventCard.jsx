import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaCalendarAlt, FaTag, FaUserAlt, FaPhoneAlt, FaGift, FaTimes, FaEdit, FaTrash } from "react-icons/fa"
import { updateEvent, deleteEvent } from '../../store/slices/eventSlice'

const EventCard = ({ event }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { jwtToken } = useSelector((state) => state.auth)

  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editData, setEditData] = useState(event)

  const toggleViewModal = () => setIsViewModalOpen(!isViewModalOpen)
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(updateEvent({ id: event._id, eventData: editData })).unwrap()
      toast.success("Event updated successfully!")
      toggleEditModal()
    } catch (error) {
      toast.error(error.message || "Error updating event. Please try again.")
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await dispatch(deleteEvent(event._id)).unwrap()
        toast.success("Event deleted successfully!")
        toggleViewModal()
      } catch (error) {
        toast.error(error.message || "Failed to delete the event. Please try again.")
      }
    }
  }

  const navigateToEventDetails = () => {
    navigate(`/events/${event._id}`)
  }

  return (
    <div>
      {/* Card */}
      <div className="card w-[300px] flex flex-col items-center gap-4 py-6 rounded-lg px-6 bg-white bg-opacity-30 backdrop-blur-md shadow-[0px_4px_8px_0px_rgba(10,105,165,0.2)] hover:shadow-[0px_8px_16px_0px_rgba(10,105,165,0.4)] transition-shadow">
        {/* Event Image */}
        <div className="w-full h-[180px] overflow-hidden rounded-md">
          <img src={event.img || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
        </div>

        {/* Event Title */}
        <h3 className="font-bold text-lg text-center text-gray-100 mt-2 uppercase">{event.name}</h3>

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
                  <img src={event.img || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-2xl text-center text-black mb-4">{event.name}</h3>
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <FaTag className="text-blue-600" />
                    <p className="text-black text-sm">{event.dep}</p>
                  </div>
                  <div className="mb-4 text-black text-sm" dangerouslySetInnerHTML={{ __html: event.desc }}></div>
                  <div className="flex items-start gap-2 mb-4">
                    <FaCalendarAlt className="text-blue-600 mt-[2px]" />
                    <div className="text-black text-sm" dangerouslySetInnerHTML={{ __html: event.timeline }}></div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <FaUserAlt className="text-blue-600" />
                    <p className="text-black text-sm">Team Size: {event.teamSize}</p>
                  </div>
                  <div className="flex items-start gap-2 mb-4">
                    <FaPhoneAlt className="text-blue-600 mt-[2px]" />
                    <div className="text-black text-sm" dangerouslySetInnerHTML={{ __html: event.contact_info }}></div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <FaGift className="text-blue-600" />
                    <div className="text-black text-sm" dangerouslySetInnerHTML={{ __html: event.prizeMoney }}></div>
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
            className="relative w-full max-w-[600px] h-[90%] bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <form onSubmit={handleEditSubmit} className="p-6">
              {/* Close Icon */}
              <button
                onClick={toggleEditModal}
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
                  <option value="" disabled>
                    Select Department
                  </option>
                  {["PUC", "CSE", "ECE", "EEE", "MECH", "MME", "CHEM", "CIVIL"].map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
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
                  placeholder="Team Size"
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
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventCard

