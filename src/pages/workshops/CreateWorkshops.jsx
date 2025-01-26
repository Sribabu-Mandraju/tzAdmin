import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateWorkshop = () => {
  const [workshopData, setWorkshopData] = useState({
    name: '',
    dep: '',
    about: '',
    workshopImg: null,
    workshopImgName: '',
    structure: '',
    contact: '',
    entryFee: '',
    instructorName: '',
    instructorSpecifications: '',
    instructorImage: null,
    instructorImageName: '',
  });

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
      e.target.value = ''; // Reset the file input field
    } else {
      setWorkshopData({
        ...workshopData,
        [name]: file,
        [`${name}Name`]: file ? file.name : 'No file chosen',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...workshopData,
      workshopImg: workshopData.workshopImg ? URL.createObjectURL(workshopData.workshopImg) : null,
      instructorImage: workshopData.instructorImage ? URL.createObjectURL(workshopData.instructorImage) : null,
    };

    console.log('Payload:', payload);  // Log the payload to debug

    try {
      await axios.post('https://tzbackenddevmode.onrender.com/workshops/create/new', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`,
        },
      });
      toast.success('Workshop created successfully!');
      // Reset form fields
      setWorkshopData({
        name: '',
        dep: '',
        about: '',
        workshopImg: null,
        workshopImgName: '',
        structure: '',
        contact: '',
        entryFee: '',
        instructorName: '',
        instructorSpecifications: '',
        instructorImage: null,
        instructorImageName: '',
      });
      window.scrollTo(0, 0); // Scroll to top of the page after successful submission
    } catch (error) {
      console.error('Error creating workshop:', error);
      toast.error('Failed to create workshop.');
      window.scrollTo(0, 0); // Scroll to top of the page on error
    }
  };

  return (
    <Layout>
      <div className='flex justify-center items-center text-white'>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 p-2 gap-2 rounded-lg w-full shadow-lg md:p-[50px] p-[20px] border-[1px]">
          <div className="name-wrap flex flex-col gap-2">
            <div className="text-white font-semibold">Name</div>
            <input
              type="text"
              name="name"
              value={workshopData.name}
              onChange={handleChange}
              className="border-[1px] p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
              placeholder="Enter your workshop name"
              required
            />
          </div>
          <div className="dep-wrap flex flex-col gap-2">
            <div className="text-white font-semibold">Department</div>
            <select
              name="dep"
              value={workshopData.dep}
              onChange={handleChange}
              className="border-[1px] p-[10px] outline-[#ccc] rounded-lg bg-transparent text-gray-400"
              required
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
          <div className="about-wrap flex flex-col gap-2">
            <div className="text-white font-semibold">About</div>
            <input
              type="text"
              name="about"
              value={workshopData.about}
              onChange={handleChange}
              className="border-[1px] p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
              placeholder="Enter about"
              required
            />
          </div>
          <div className="structure-wrap flex flex-col gap-2">
            <div className="text-white font-semibold">Structure</div>
            <input
              type="text"
              name="structure"
              value={workshopData.structure}
              onChange={handleChange}
              className="border-[1px] p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
              placeholder="Enter structure"
              required
            />
          </div>
          <div className="entryfee-wrap flex flex-col gap-2">
            <div className="text-white font-semibold">Entry Fee</div>
            <input
              type="text"
              name="entryFee"
              value={workshopData.entryFee}
              onChange={handleChange}
              className="border-[1px] p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
              placeholder="500"
              required
            />
          </div>
          <div className="contact-wrap flex flex-col gap-2">
            <div className="text-white font-semibold">Contact</div>
            <input
              type="text"
              name="contact"
              value={workshopData.contact}
              onChange={handleChange}
              className="border-[1px] p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
              placeholder="coordinator"
              required
            />
          </div>
          <div className="instructor-wrap flex flex-col gap-2">
            <div className="text-white font-semibold">Instructor Name</div>
            <input
              type="text"
              name="instructorName"
              value={workshopData.instructorName}
              onChange={handleChange}
              className="border-[1px] p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
              placeholder="Instructor name"
              required
            />
          </div>
          <div className="specifications-wrap flex flex-col gap-2">
            <div className="text-white font-semibold">Instructor Specifications</div>
            <input
              type="text"
              name="instructorSpecifications"
              value={workshopData.instructorSpecifications}
              onChange={handleChange}
              className="border-[1px] p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
              placeholder="Instructor specifications"
              required
            />
          </div>
          <div className="workshopImg-wrap flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-200">Workshop Image</label>
            <input
              type="file"
              name="workshopImg"
              onChange={handleFileChange}
              className="mt-1"
              required
            />
            {workshopData.workshopImgName && <div className="text-white mt-1">{workshopData.workshopImgName}</div>}
          </div>
          <div className="instructorImg-wrap flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-200">Instructor Image</label>
            <input
              type="file"
              name="instructorImage"
              onChange={handleFileChange}
              className="mt-1"
              required
            />
            {workshopData.instructorImageName && <div className="text-white mt-1">{workshopData.instructorImageName}</div>}
          </div>
          <button type="submit" className="bg-[#0a6aa5e7] mt-4 text-white rounded-lg text-center h-[50px] lg:col-span-2">
            Submit
          </button>
          </form>    
      </div>
    </Layout>
  );
};

export default CreateWorkshop;