import React from 'react'
import Layout from '../../components/layouts/Layout'

const Users = () => {
  return (
    <Layout>
      <div className='flex justify-center items-center'>
      <form className="flex flex-col p-2 gap-2 rounded-lg w-full sm:w-[500px] shadow-lg md:p-[50px] border-[1px]">
          <label htmlFor="email" className='text-lg'>Email</label>
          <input type="email" placeholder='johndoe.example.com' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="firstname" className='text-lg'>First Name</label>
          <input type="text" placeholder='John' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="lastname" className='text-lg'>Last Name</label>
          <input type="text" placeholder='Doe' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="College" className='text-lg'>College</label>
          <input type="text" placeholder='ABC Engineering College' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="amountpaid" className='text-lg'>Amount Paid</label>
          <input type="number" placeholder='500' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="Phonenumber" className='text-lg'>Ph no</label>
          <input type="text" placeholder='9876543210' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="year" className='text-lg'>Year</label>
          <input type="text" placeholder='3rd' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="branch" className='text-lg'>Branch</label>
          <input type="text" placeholder='CSE' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="CollegeId" className='text-lg'>College Id</label>
          <input type="text" placeholder='ABCD123456' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="gender" className='text-lg'>Gender</label>
          <input type="text" placeholder='Male' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="imagelink" className='text-lg'>Img</label>
          <input type="file" placeholder='https://example.com/profile.jpg' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="state" className='text-lg'>State</label>
          <input type="text" placeholder='Andhra Pradesh'className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="district" className='text-lg'>District</label>
          <input type="text" placeholder='Krishna' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="idupload" className='text-lg'>Id Upload</label>
          <input type="file" placeholder='https://example.com/profile.jpg' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="city" className='text-lg'>city</label>
          <input type="text" placeholder='Vijayawada' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="mode" className='text-lg'>Mode</label>
          <input type="text" placeholder='online_mode' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <label htmlFor="refferedBy" className='text-lg'>Reffered By</label>
          <input type="text" placeholder='referal123' className='border-[2px] border-zinc-400 p-[10px] rounded-lg outline-[#ccc]'/>
          <input
            type="submit"
            value="Submit Details"
            className="bg-black my-2 text-white h-[50px] rounded-lg mt-[20px] text-xl"
          />
        </form>
      </div>
    </Layout>
  )
}

export default Users
