import React from 'react'
import Layout from '../../components/layouts/Layout'

const Events = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center">
      <div className="h-auto sm:w-[500px]  shadow-lg ">
<form className="flex flex-col gap-[10px] p-[20px]">
  <div className="text-black font-bold">Name:</div>
  <input type="text" className="border-2 border-gray h-[40px] w-[80%] rounded-[5px]" placeholder="Enter your name"/>
  <div className="text-black font-bold">Dep:</div>
  <input type="text" className="border-2 border-gray h-[40px] w-[80%] rounded-[5px]" placeholder="Enter your dept"/>
  <div className="text-black font-bold">img:</div>
  <input type="file" className="border-2 border-gray h-[40px] w-[80%] rounded-[5px]" placeholder="Enter your name"/>
  <div className="text-black font-bold">Desc:</div>
  <input type="text" className="border-2 border-gray h-[40px] w-[80%] rounded-[5px]" placeholder="Enter your name"/>
  <div className="text-black font-bold">Structure:</div>
  <input type="text" className="border-2 border-gray h-[40px] w-[80%] rounded-[5px]" placeholder="Enter your name"/>
  <div className="text-black font-bold">priceMoney:</div>
  <input type="text" className="border-2 border-gray h-[40px] w-[80%] rounded-[5px]" placeholder="50000"/>
  <div className="text-black font-bold">teamSize:</div>
  <input type="text" className="border-2 border-gray h-[40px] w-[80%] rounded-[5px]" placeholder="4"/>
  <div className="text-black font-bold">contact_info:</div>
  <input type="text" className="border-2 border-gray h-[40px] w-[80%] rounded-[5px]" placeholder="Enter your email"/>
</form>
      </div>
      </div>
    </Layout>
  )
}

export default Events
