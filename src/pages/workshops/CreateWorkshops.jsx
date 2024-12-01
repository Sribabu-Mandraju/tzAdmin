import React from 'react'
import Layout from '../../components/layouts/Layout'

const CreateWorkshops = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div className="h-auto sm:w-[500px]  shadow-lg ">
          <form className="flex flex-col p-2 gap-2 rounded-lg w-full sm:w-[500px] shadow-lg md:p-[50px] border-[1px]">
            <div className="text-black font-bold">Name</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your workshop name"
            />
            <div className="text-black font-bold">Dep</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your dept"
            />
            <div className="text-black font-bold">About</div>
            <input
              type="text"
              className=" p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your name"
            />
            <div className="text-black font-bold">workShopImg</div>
            <input
              type="file"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your name"
            />
            <div className="text-black font-bold">Structure</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your name"
            />
            <div className="text-black font-bold">EntryFee</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="500"
            />
            <div className="text-black font-bold">Contact</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="coordinator"
            />
            <div className="text-black font-bold">InstructorName</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="president of sdcac"
            />
            <div className="text-black font-bold">InstructorSpecifications</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="MS in us"
            />
            <div className="text-black font-bold">InstructorImage</div>
            <input
              type="file"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"

            />
            <button className="bg-black text-white rounded-lg text-center border-2 h-[50px]">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default CreateWorkshops
