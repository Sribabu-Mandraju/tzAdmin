import React from "react";
import Layout from "../../components/layouts/Layout";


const CreateEvent = () => {
  return (
    <Layout>
     
      <div className="flex justify-center items-center w-full">
        <div className="h-auto sm:w-[500px]  shadow-lg w-full">
          <form className="flex flex-col p-3 gap-2 rounded-lg w-full sm:w-[500px] shadow-lg md:p-[50px] border-[1px]">
            <div className="text-black font-bold">Name</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your name"
            />
            <div className="text-black font-bold">Dep</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your dept"
            />
            <div className="text-black font-bold">img</div>
            <input
              type="file"
              className=" p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your name"
            />
            <div className="text-black font-bold">Desc</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your name"
            />
            <div className="text-black font-bold">Structure</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your name"
            />
            <div className="text-black font-bold">Timeline</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="1hr"
            />
            <div className="text-black font-bold">prizeMoney</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="50000"
            />
            <div className="text-black font-bold">teamSize</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="4"
            />
            <div className="text-black font-bold">contact_info</div>
            <input
              type="text"
              className="border-2 p-[10px] outline-[#ccc] rounded-lg"
              placeholder="Enter your email"
            />
            <button className="bg-black text-white rounded-lg text-center border-2 h-[50px]">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEvent;

   