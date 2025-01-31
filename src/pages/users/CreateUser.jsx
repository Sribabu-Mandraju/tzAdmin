import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import { FiUpload } from "react-icons/fi";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { fetchUsers } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';

const CreateUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminToken = useSelector((state) => state.auth.jwtToken)
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

  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    if (formData.mode !== "offline_mode" && !formData.razorpay_order_id) {
      toast.error("Payment Check Error: Razorpay Order ID is required for online mode.");
      return;
    }

    // Direct payload submission (no FormData)
    const payload = {
      ...formData,
      img: formData.img ? formData.img.name : null,
      idUpload: formData.idUpload ? formData.idUpload.name : null,
    };
    
    try {
      // Retrieve adminToken from localStorage
      if (!adminToken) {
        toast.error("Authentication Error: Admin token is missing.");
        return;
      }

      console.log(payload);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`, // Include adminToken in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        toast.success("User registered successfully!");
        dispatch(fetchUsers())
        navigate('/users'); // Redirect to the users page
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
    finally {
      setIsSubmitting(false); // Reset to false after submission
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center bg-[rgba(255,255,255,0.1)] backdrop-blur-lg p-5 rounded-lg w-full max-w-5xl overflow-auto">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 p-2 gap-2 rounded-lg w-full shadow-lg md:p-[50px] py-[40px] px-[20px] border-[1px] gap-5"
        >
          {/* Email */}
          <div className="email-wrap flex flex-col gap-2">
            <label htmlFor="email" className="text-lg font-semibold">Email</label>
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
          {/* First Name */}
          <div className="firstname-wrap flex flex-col gap-2">
            <label htmlFor="firstName" className="text-lg font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              className="border-[1px] text-gray-600 border-zinc-400 p-[10px] rounded-lg outline-[#ccc]"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          {/* Last Name */}
          <div className="lastname-wrap flex flex-col gap-2">
            <label htmlFor="lastName" className="text-lg font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              className="border-[1px] text-gray-600 border-zinc-400 p-[10px] rounded-lg outline-[#ccc]"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          {/* College */}
          <div className="college-wrap flex flex-col gap-2">
            <label htmlFor="college" className="text-lg font-semibold">College</label>
            <input
              type="text"
              name="college"
              placeholder="XYZ University"
              className="border-[1px] text-gray-600 border-zinc-400 p-[10px] rounded-lg outline-[#ccc]"
              value={formData.college}
              onChange={handleChange}
            />
          </div>
           {/* Add College ID */}
          <div className="collegeId-wrap flex flex-col gap-2">
            <label htmlFor="collegeId" className="text-lg font-semibold">College ID</label>
            <input
              type="text"
              name="collegeId"
              placeholder="Enter your College ID"
              className="border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc] text-gray-600 font-medium"
              value={formData.collegeId}
              onChange={handleChange}
            />
          </div>

          {/* Phone Number */}
          <div className="phno-wrap flex flex-col gap-2">
            <label htmlFor="phno" className="text-lg font-semibold">Phone Number</label>
            <input
              type="text"
              name="phno"
              placeholder="+91 1234567890"
              className="border-[1px] text-gray-600 border-zinc-400 p-[10px] rounded-lg outline-[#ccc]"
              value={formData.phno}
              onChange={handleChange}
            />
          </div>
          {/* Amount Paid */}
          <div className="amountPaid-wrap flex flex-col gap-2">
            <label htmlFor="amountPaid" className="text-lg font-semibold">Amount Paid</label>
            <input
              type="text"
              name="amountPaid"
              placeholder="5000"
              className="border-[1px] text-gray-600 border-zinc-400 p-[10px] rounded-lg outline-[#ccc]"
              value={formData.amountPaid}
              onChange={handleChange}
            />
          </div>
          {/* Branch */}
          <div className="branch-wrap flex flex-col gap-2">
            <label htmlFor="branch" className="text-lg font-semibold">Branch</label>
            <select
              name="branch"
              className="border-[1px] border-zinc-400 p-[10px] rounded-lg outline-none bg-white text-gray-600 font-medium hover:cursor-pointer"
              value={formData.branch}
              onChange={handleChange}
            >
              <option value="" disabled>Select a branch</option>
              <option value="PUC">PUC|Intermediate</option>
              <option value="MECH">MECHANICAL</option>
              <option value="CSE">COMPUTER SCIENCE</option>
              <option value="EEE">ELECTRICAL & ELECTRONICS</option>
              <option value="MME">METALLURGICAL</option>
              <option value="CHEM">CHEMICAL</option>
              <option value="CIVIL">CIVIL</option>
              <option value="ECE">ELECTRONICS & COMMUNICATION</option>
              <option value="Others">OTHERS</option>
            </select>
          </div>

          {/* Year */}
          <div className="year-wrap flex flex-col gap-2">
            <label htmlFor="year" className="text-lg font-semibold">Year</label>
            <select
              name="year"
              className="border-[1px] border-zinc-400 p-[10px] rounded-lg outline-none bg-white text-gray-600 font-medium hover:cursor-pointer"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="" disabled>Select a year</option>
              <option value="e1">B-Tech 1st Year</option>
              <option value="e2">B-Tech 2nd Year</option>
              <option value="e3">B-Tech 3rd Year</option>
              <option value="e4">B-Tech 4th Year</option>
              <option value="PUC-1">Intermediate-1</option>
              <option value="PUC-2">Intermediate-2</option>
              <option value="PUC-1">PUC-1</option>
              <option value="PUC-2">PUC-2</option>
            </select>
          </div>

          {/* Gender */}
          <div className="gender-wrap flex flex-col gap-2">
            <label htmlFor="gender" className="text-lg font-semibold">Gender</label>
            <select
              name="gender"
              className="border-[1px] border-zinc-400 p-[10px]  text-gray-600 rounded-lg outline-[#ccc]"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* State */}
          <div className="state-wrap flex flex-col gap-2">
            <label htmlFor="state" className="text-lg font-semibold">State</label>
            <input
              type="text"
              name="state"
              placeholder="Andhra Pradesh"
              className="border-[1px] border-zinc-400 text-gray-600 p-[10px] rounded-lg outline-[#ccc]"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          {/* Add District */}
          <div className="district-wrap flex flex-col gap-2">
            <label htmlFor="district" className="text-lg font-semibold">District</label>
            <input
              type="text"
              name="district"
              placeholder="Enter your District"
              className="border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc] text-gray-600 font-medium"
              value={formData.district}
              onChange={handleChange}
            />
          </div>
          {/* City */}
          <div className="city-wrap flex flex-col gap-2">
            <label htmlFor="city" className="text-lg font-semibold">City</label>
            <input
              type="text"
              name="city"
              placeholder="Hyderabad"
              className="border-[1px] text-gray-600 border-zinc-400 p-[10px] rounded-lg outline-[#ccc]"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          {/* Referred By */}
          <div className="referredBy-wrap flex flex-col gap-2">
            <label htmlFor="referredBy" className="text-lg font-semibold">Referred By</label>
            <input
              type="text"
              name="referredBy"
              placeholder="Referral name"
              className="border-[1px]  text-gray-600 border-zinc-400 p-[10px] rounded-lg outline-[#ccc]"
              value={formData.referredBy}
              onChange={handleChange}
            />
          </div>

          {/* Mode */}
          <div className="mode-wrap flex flex-col gap-2">
              <label htmlFor="mode" className="text-lg font-semibold">Mode</label>
              <select
                name="mode"
                className="border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc] text-gray-700 font-medium"
                value={formData.mode}
                onChange={handleChange}
              >
                <option value="" disabled>Select Mode</option>
                <option value="online_mode">Online Mode</option>
                <option value="offline_mode">Offline Mode</option>
              </select>
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

{/* Transaction Image Upload */}
<div className="transactionImgUrl-wrap flex flex-col gap-2">
<label htmlFor="transactionImgUrl" className="text-lg font-semibold">Transaction Image URL</label>
  <input
    type="url"
    name="transactionImgUrl"
    placeholder="enter Transaction Image URL"
    className="border px-3 py-2 rounded w-full"
    onChange={handleChange}
  />
</div>

{/* ID Card Upload */}
<div className="idCardUrl-wrap flex flex-col gap-2">
<label htmlFor="idCardUrl" className="text-lg font-semibold">CollegeID Image URL</label>
  <input
    type="url"
    name="idCardUrl"
    placeholder="enter ID Card Image URL"
    className="border px-3 py-2 rounded w-full"
    onChange={handleChange}
  />
</div>


          <input
        type="submit"
        value={isSubmitting ? "Submitting..." : "Submit Details"}
        disabled={isSubmitting} // Disable button while submitting
        className={`bg-black my-2 text-white h-[50px] rounded-lg mt-[20px] text-lg lg:col-span-2 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
        }`}
      />
        </form>
      </div>
    </Layout>
  );
};

export default CreateUsers;
