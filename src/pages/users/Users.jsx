import React from 'react'
import Layout from '../../components/layouts/Layout'

const Users = () => {
  return (
    <Layout>
      <div className='flex justify-center items-center'>
      <form className="flex flex-col p-2 gap-2 rounded-lg w-full sm:w-[500px] shadow-lg md:p-[50px] p-[20px] border-[1px]">
          <label htmlFor="email" className='text-lg font-semibold font-semibold'>Email</label>
          <input type="email" placeholder='johndoe.example.com' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="firstname" className='text-lg font-semibold'>First Name</label>
          <input type="text" placeholder='John' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="lastname" className='text-lg font-semibold'>Last Name</label>
          <input type="text" placeholder='Doe' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="College" className='text-lg font-semibold'>College</label>
          <input type="text" placeholder='ABC Engineering College' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="amountpaid" className='text-lg font-semibold'>Amount Paid</label>
          <input type="number" placeholder='500' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="Phonenumber" className='text-lg font-semibold'>Ph no</label>
          <input type="text" placeholder='9876543210' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="year" className='text-lg font-semibold'>Year</label>
          <input type="text" placeholder='3rd' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="branch" className='text-lg font-semibold'>Branch</label>
          <input type="text" placeholder='CSE' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="CollegeId" className='text-lg font-semibold'>College Id</label>
          <input type="text" placeholder='ABCD123456' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="gender" className='text-lg font-semibold'>Gender</label>
          <input type="text" placeholder='Male' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="imagelink" className='text-lg font-semibold'>Img</label>
          <input type="file" placeholder='https://example.com/profile.jpg' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="state" className='text-lg font-semibold'>State</label>
          <input type="text" placeholder='Andhra Pradesh'className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="district" className='text-lg font-semibold'>District</label>
          <input type="text" placeholder='Krishna' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="idupload" className='text-lg font-semibold'>Id Upload</label>
          <input type="file" placeholder='https://example.com/profile.jpg' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="city" className='text-lg font-semibold'>city</label>
          <input type="text" placeholder='Vijayawada' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="mode" className='text-lg font-semibold'>Mode</label>
          <input type="text" placeholder='online_mode' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="refferedBy" className='text-lg font-semibold'>Reffered By</label>
          <input type="text" placeholder='referal123' className='border-[1px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <input
            type="submit"
            value="Submit Details"
            className="bg-black my-2 text-white h-[50px] rounded-lg mt-[20px] text-lg"
          />
        </form>
      </div>
    </Layout>
  )
}

export default Users
