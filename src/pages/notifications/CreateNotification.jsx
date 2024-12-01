import React from 'react'
import Layout from '../../components/layouts/Layout'

const CreateNotification = () => {
  return (
    <Layout>
      <div className="flex justify-center">
        <form className='flex flex-col gap-2 rounded-lg w-full sm:w-[500px] shadow-lg md:p-[50px] border-[1px]'>
        <textarea className='border-2 outline-[#ccc] rounded-md p-[10px]' placeholder='Notification Description'></textarea>
        <input type="text" placeholder='Picturepath' className='border-2 p-[10px] outline-[#ccc] rounded-lg' />
        <input type="text" placeholder='important link' className='border-2 p-[10px] outline-[#ccc] rounded-lg' />
        <input type="submit" className='bg-black text-white h-[50px] rounded-lg' />
        </form>     
      </div>
    </Layout>
  )
}

export default CreateNotification
