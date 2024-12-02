import React from 'react'
import Layout from '../../components/layouts/Layout'
import { FiUpload } from "react-icons/fi";
const Users = () => {
  return (
    <Layout>
      <div className='flex justify-center items-center'>
      <form className="grid grid-cols-1 lg:grid-cols-2 p-2 gap-2 rounded-lg w-full shadow-lg md:p-[50px] p-[20px] border-[1px] gap-5">
          <div className="email-wrap flex flex-col gap-2">
          <label htmlFor="email" className='text-lg font-semibold font-semibold'>Email</label>
          <input type="email" placeholder='johndoe.example.com' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="firstname-wrap flex flex-col gap-2">
          <label htmlFor="firstname" className='text-lg font-semibold'>First Name</label>
          <input type="text" placeholder='John' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="firstname-wrap flex flex-col gap-2">
          <label htmlFor="lastname" className='text-lg font-semibold'>Last Name</label>
          <input type="text" placeholder='Doe' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="firstname-wrap flex flex-col gap-2">
          <label htmlFor="College" className='text-lg font-semibold'>College</label>
          <input type="text" placeholder='ABC Engineering College' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="firstname-wrap flex flex-col gap-2">
          <label htmlFor="amountpaid" className='text-lg font-semibold'>Amount Paid</label>
          <input type="number" placeholder='500' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="firstname-wrap flex flex-col gap-2">
          <label htmlFor="Phonenumber" className='text-lg font-semibold'>Ph no</label>
          <input type="text" placeholder='9876543210' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="firstname-wrap flex flex-col gap-2">
          <label htmlFor="year" className='text-lg font-semibold'>Year</label>
          <input type="text" placeholder='3rd' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="firstname-wrap flex flex-col gap-2">
          <label htmlFor="branch" className='text-lg font-semibold'>Branch</label>
          <input type="text" placeholder='CSE' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="firstname-wrap flex flex-col gap-2">
          <label htmlFor="CollegeId" className='text-lg font-semibold'>College Id</label>
          <input type="text" placeholder='ABCD123456' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="firstname-wrap flex flex-col gap-2">
          <label htmlFor="gender" className='text-lg font-semibold'>Gender</label>
          <input type="text" placeholder='Male' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="firstname-wrap flex flex-col gap-2">
          <label htmlFor="state" className='text-lg font-semibold'>State</label>
          <input type="text" placeholder='Andhra Pradesh'className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="district-wrap flex flex-col gap-2">
          <label htmlFor="district" className='text-lg font-semibold'>District</label>
          <input type="text" placeholder='Krishna' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="city-wrap flex flex-col gap-2">
          <label htmlFor="city" className='text-lg font-semibold'>city</label>
          <input type="text" placeholder='Vijayawada' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div className="Mode-wrap flex flex-col gap-2">
          <label htmlFor="mode" className='text-lg font-semibold'>Mode</label>
          <input type="text" placeholder='online_mode' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          </div>
          <div class="uploadImg-wrapper flex gap-3 my-[30px] w-full">
          <input type="file" id="fileInput" class="hidden" />
          <label for="uploadImg" class="custom-upload-btn w-full flex justify-center items-center  bg-black text-white py-2 px-4 rounded cursor-pointer"><span className='px-[10px]'>Upload Image</span> <FiUpload/></label>
          </div>
          <div class="uploadId-wrapper flex gap-3 my-[30px]">
          <input type="file" id="fileInput" class="hidden" />
          <label for="uploadId" class="custom-upload-btn w-full flex justify-center items-center  bg-black text-white py-2 px-4 rounded cursor-pointer"><span className='px-[10px]'>Upload Id</span> <FiUpload/></label>
          </div>
          <div className="referal-wrap flex flex-col gap-2 lg:col-span-2">
          <label htmlFor="refferedBy" className='text-lg font-semibold'>Reffered By</label>
          <input type="text" placeholder='referal123' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
         </div>
          <input
            type="submit"
            value="Submit Details"
            className="bg-black my-2 text-white h-[50px] rounded-lg mt-[20px] text-lg lg:col-span-2"
          />
        </form>
      </div>
    </Layout>
  )
}

export default Users
