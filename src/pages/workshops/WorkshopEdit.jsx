import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkshopEdit = ({ workshop, onClose, onUpdate }) => {
  const [workshopData, setWorkshopData] = useState(workshop);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkshopData({ ...workshopData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setWorkshopData({ ...workshopData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(workshopData).forEach(key => {
      formData.append(key, workshopData[key]);
    });

    try {
      await axios.put(`https://tzbackenddevmode.onrender.com/workshops/edit-workshop/${workshopData._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Workshop updated successfully!');
      onUpdate();
    } catch (error) {
      console.error('Error updating workshop:', error);
      toast.error('Failed to update workshop.');
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
            <input
              type="text"
              name="dep"
              value={workshopData.dep}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full bg-white bg-opacity-30"
            />
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
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkshopEdit;
