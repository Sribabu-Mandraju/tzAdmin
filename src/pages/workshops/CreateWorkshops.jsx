import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import { FiUpload } from "react-icons/fi";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateWorkshop = () => {
  const [workshopData, setWorkshopData] = useState({
    name: '',
    dep: '',
    about: '',
    workshopImg: null,
    structure: '',
    contact: '',
    entryFee: '',
    instructorName: '',
    instructorSpecifications: '',
    instructorImage: null,
  });

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
      await axios.post('https://tzbackenddevmode.onrender.com/workshops/create/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Workshop created successfully!');
      // Reset form fields
      setWorkshopData({
        name: '',
        dep: '',
        about: '',
        workshopImg: null,
        structure: '',
        contact: '',
        entryFee: '',
        instructorName: '',
        instructorSpecifications: '',
        instructorImage: null,
      });
    } catch (error) {
      toast.error('Failed to create workshop.');
    }
  };

  return (
    <Layout>
      <div className='flex justify-center items-center text-white'>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 p-2 gap-2 rounded-lg w-full shadow-lg md:p-[50px] p-[20px] border-[1px] gap-5">
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
            <input
              type="text"
              name="dep"
              value={workshopData.dep}
              onChange={handleChange}
              className="border-[1px] p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
              placeholder="Enter your department"
              required
            />
          </div>
          <div className="about-wrap flex flex-col gap-2">
            <div className="text-white font-semibold">About</div>
            <input
              type="text"
              name="about"
              value={workshopData.about}
              onChange={handleChange}
              className="p-[10px] border-[1px] rounded-lg outline-[#ccc] bg-transparent text-white"
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
              className="border-2 p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
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
              className="border-2 p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
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
              className="border-2 p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
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
              className="border-2 p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
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
              className="border-2 p-[10px] outline-[#ccc] rounded-lg bg-transparent text-white"
              placeholder="Instructor specifications"
              required
            />
          </div>
          <div className="workshopImg-wrap flex flex-col gap-2">
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="hidden"
              id="workshopImg"
              required
            />
            <label htmlFor="workshopImg" className="custom-upload-btn w-full flex justify-center items-center bg-[dodgerblue] text-white py-2 rounded-lg cursor-pointer">
              <span className='px-[10px]'>Workshop Image</span> <FiUpload/>
            </label>
          </div>
          <div className="Instructor-img-wrap flex flex-col gap-2">
            <input
              type="file"
              name="instructorImage"
              onChange={handleFileChange}
              className="hidden"
              id="instructorImage"
              required
            />
            <label htmlFor="instructorImage" className="custom-upload-btn w-full flex justify-center items-center bg-[dodgerblue] text-white py-2 rounded-lg cursor-pointer">
              <span className='px-[10px]'>Instructor Image</span> <FiUpload/>
            </label>
          </div>
          <button type="submit" className="bg-black text-white rounded-lg text-center h-[50px] lg:col-span-2">
            Submit
          </button>
        </form>    
      </div>
    </Layout>
  );
};

export default CreateWorkshop;
