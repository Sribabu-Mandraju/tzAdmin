import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import { FiUpload } from "react-icons/fi";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateUsers = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    college: '',
    amountPaid: '',
    phno: '',
    year: '',
    branch: '',
    collegeId: '',
    gender: '',
    state: '',
    district: '',
    city: '',
    mode: 'offline_mode',
    referredBy: '',
    img: null,
    idUpload: null,
    razorpay_order_id: '', // Needed if mode is not offline_mode
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mode !== "offline_mode" && !formData.razorpay_order_id) {
      toast.error("Payment Check Error: Razorpay Order ID is required for online mode.");
      return;
    }

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      // Retrieve adminToken from localStorage
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        toast.error("Authentication Error: Admin token is missing.");
        return;
      }
      console.log(formDataToSubmit);

      const response = await axios.post(
        'https://tzbackenddevmode.onrender.com/user/register',
        formDataToSubmit,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${adminToken}`, // Include adminToken in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        toast.success("User registered successfully!");
        navigate('/users'); // Redirect to the users page
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 p-2 gap-2 rounded-lg w-full shadow-lg md:p-[50px] p-[20px] border-[1px] gap-5"
        >
          {/* Email */}
          <div className="email-wrap flex flex-col gap-2">
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@example.com"
              className="border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Other Fields */}
          <div className="firstname-wrap flex flex-col gap-2">
            <label htmlFor="firstName" className="text-lg font-semibold">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              className="border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          {/* Image Upload */}
          <div className="uploadImg-wrapper flex gap-3 my-[30px] w-full">
            <input
              type="file"
              id="img"
              name="img"
              className="hidden"
              onChange={handleChange}
              accept="image/*"
            />
            <label
              htmlFor="img"
              className="custom-upload-btn w-full flex justify-center items-center bg-black text-white py-2 px-4 rounded cursor-pointer"
            >
              <span className="px-[10px]">Upload Image</span> <FiUpload />
            </label>
          </div>
          {/* ID Upload */}
          <div className="uploadId-wrapper flex gap-3 my-[30px]">
            <input
              type="file"
              id="idUpload"
              name="idUpload"
              className="hidden"
              onChange={handleChange}
              accept="image/*"
            />
            <label
              htmlFor="idUpload"
              className="custom-upload-btn w-full flex justify-center items-center bg-black text-white py-2 px-4 rounded cursor-pointer"
            >
              <span className="px-[10px]">Upload ID</span> <FiUpload />
            </label>
          </div>
          {/* Razorpay Order ID */}
          {formData.mode !== "offline_mode" && (
            <div className="razorpay-wrap flex flex-col gap-2">
              <label htmlFor="razorpay_order_id" className="text-lg font-semibold">
                Razorpay Order ID
              </label>
              <input
                type="text"
                name="razorpay_order_id"
                placeholder="Enter Razorpay Order ID"
                className="border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]"
                value={formData.razorpay_order_id}
                onChange={handleChange}
              />
            </div>
          )}
          <input
            type="submit"
            value="Submit Details"
            className="bg-black my-2 text-white h-[50px] rounded-lg mt-[20px] text-lg lg:col-span-2"
          />
        </form>
      </div>
    </Layout>
  );
};

export default CreateUsers;
