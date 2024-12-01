import React from "react";
import Layout from "../../components/layouts/Layout";

const CreateNotification = () => {
  return (
    <Layout>
      <div className="flex justify-center">
        <form className="flex flex-col p-2 gap-2 rounded-lg w-full sm:w-[500px] shadow-lg md:p-[50px] border-[1px]">
          <label htmlFor="" className="font-semibold">
            Title
          </label>
          <input
            type="text"
            placeholder="Notification title"
            className="border-2 p-[10px] outline-[#ccc] rounded-lg"
          />
          <label htmlFor="" className="font-semibold">
            Description
          </label>
          <textarea
            className="border-2 outline-[#ccc] rounded-md p-[10px]"
            placeholder="Notification Description"
          ></textarea>
          <label htmlFor="" className="font-semibold">
            Picture path
          </label>
          <input
            type="text"
            placeholder="Picturepath"
            className="border-2 p-[10px] outline-[#ccc] rounded-lg"
          />
          <label htmlFor="" className="font-semibold">
            Links <span className="text-zinc-400">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="important link"
            className="border-2 p-[10px] outline-[#ccc] rounded-lg"
          />
          <input
            type="submit"
            value="Send Notification"
            className="bg-black my-2 text-white h-[50px] rounded-lg"
          />
        </form>
      </div>
    </Layout>
  );
};

export default CreateNotification;
