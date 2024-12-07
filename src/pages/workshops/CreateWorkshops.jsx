import React from 'react'
import Layout from '../../components/layouts/Layout'
// import { FiUpload } from "react-icons/fi";
import reactImage from "../../assets/react.png";

const CreateWorkshops = () => {
  return (
    <Layout>
     <div className='flex justify-center items-center'>
     <form className="grid grid-cols-1 lg:grid-cols-2 p-2 gap-2 rounded-lg w-full shadow-lg md:p-[50px] p-[20px] border-[1px] gap-5">
            <div className="name-wrap flex flex-col gap-2">
            <div className="text-black font-semibold">Name</div>
            <input
              type="text"
              className="border-[1px] p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your workshop name"
            />
            </div>
            <div className="dep-wrap flex flex-col gap-2">
            <div className="text-black font-semibold">Dep</div>
            <input
              type="text"
              className="border-[1px] p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your dept"
            />
             </div>
             <div className="about-wrap flex flex-col gap-2">
            <div className="text-black font-semibold">About</div>
            <input
              type="text"
              className=" p-[10px] border-[1px] rounded-lg outline-[#ccc]"
              placeholder="Enter your name"
            />
             </div>
           
             <div className="structure-wrap flex flex-col gap-2">
            <div className="text-black font-semibold">Structure</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your name"
            />
             </div>
             <div className="entryfee-wrap flex flex-col gap-2">
            <div className="text-black font-semibold">EntryFee</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="500"
            />
             </div>
             <div className="contact-wrap flex flex-col gap-2">
            <div className="text-black font-semibold">Contact</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="coordinator"
            />
             </div>
             <div className="instructor-wrap flex flex-col gap-2">
            <div className="text-black font-semibold">InstructorName</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="president of sdcac"
            />
             </div>
             <div className="specifications-wrap flex flex-col gap-2">
            <div className="text-black font-semibold">InstructorSpecifications</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="MS in us"
            />
             </div>
             <div className="workshopImg-wrap flex flex-col gap-2">
             <input type="file" id="fileInput" class="hidden" />
             <label for="WorkshopImg" class="custom-upload-btn w-full flex justify-center items-center  bg-black text-white py-2 rounded-lg cursor-pointer"><span className='px-[10px]'>Workshop Image</span> <FiUpload/></label>
             </div>
             <div className="Instructor-img-wrap flex flex-col gap-2">
             <input type="file" id="fileInput" class="hidden" />
             <label for="workshopImg" class="custom-upload-btn w-full flex justify-center items-center bg-black text-white py-2 rounded-lg cursor-pointer"><span className='px-[10px]'>Instructor Image</span> <FiUpload/></label>
             </div>
            <button className="bg-black text-white rounded-lg text-center h-[50px] lg:col-span-2">
              Submit
            </button>
          </form>    
        </div>
    
    </Layout>
  )
}

export default CreateWorkshops
