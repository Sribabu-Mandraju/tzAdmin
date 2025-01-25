import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkshopEdit = ({ workshop, onClose, onUpdate }) => {
  const [workshopData, setWorkshopData] = useState(workshop);
  const [isUpdating, setIsUpdating] = useState(false); // State to manage button disabling
  const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjc5NGE2YzlkYzU1YWY2OGYzZjQ5MGRhIiwiaWF0IjoxNzM3Nzk1MzA0LCJleHAiOjE3Mzc4Mzg1MDR9.26JvLwUdN-_Uc6TsNPqZ8c0gZJmpqH5t2Zhv6zNzAzs";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkshopData({ ...workshopData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file && file.size > 50000) { // Check if file size exceeds 50KB
          toast.error('Image size should be less than or equal to 50KB.');
            setWorkshopData({
              ...workshopData,
              [name]: null,
              [`${name}Name`]: '',
            });
            e.target.value = ''; 
    } else {
      setWorkshopData({ ...workshopData, [name]: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true); // Disable the update button

    const payload = { ...workshopData };

    try {
      await axios.put(`https://tzbackenddevmode.onrender.com/workshops/edit-workshop/${workshopData._id}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`,
        },
      });
      toast.success('Workshop updated successfully!');
      onUpdate();
    } catch (error) {
      console.error('Error updating workshop:', error);
      toast.error('Failed to update workshop.');
    } finally {
      setIsUpdating(false); // Enable the update button after the notification
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
      <div className="modal bg-white mt-10 bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg relative w-full max-w-lg h-4/5 overflow-y-auto">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200">Name</label>
            <input
              type="text"
              name="name"
              value={workshopData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full bg-white bg-opacity-30"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200">Department</label>
            <select
              name="dep"
              value={workshopData.dep}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full bg-gray-400 bg-opacity-30"
            >
              <option value="">Select Department</option>
              <option value="ALL">ALL</option>
              <option value="PUC">PUC</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="CIVIL">CIVIL</option>
              <option value="MECH">MECH</option>
              <option value="MME">MME</option>
              <option value="CHEM">CHEM</option>
            </select>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200">About</label>
            <input
              type="text"
              name="about"
              value={workshopData.about}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full bg-white bg-opacity-30"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200">Structure</label>
            <input
              type="text"
              name="structure"
              value={workshopData.structure}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full bg-white bg-opacity-30"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200">Entry Fee</label>
            <input
              type="text"
              name="entryFee"
              value={workshopData.entryFee}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full bg-white bg-opacity-30"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200">Contact</label>
            <input
              type="text"
              name="contact"
              value={workshopData.contact}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full bg-white bg-opacity-30"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200">Instructor Name</label>
            <input
              type="text"
              name="instructorName"
              value={workshopData.instructorName}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full bg-white bg-opacity-30"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200">Instructor Specifications</label>
            <input
              type="text"
              name="instructorSpecifications"
              value={workshopData.instructorSpecifications}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full bg-white bg-opacity-30"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200">Workshop Image</label>
            <input
              type="file"
              name="workshopImg"
              onChange={handleFileChange}
              className="mt-1"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200">Instructor Image</label>
            <input
              type="file"
              name="instructorImage"
              onChange={handleFileChange}
              className="mt-1"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkshopEdit;
