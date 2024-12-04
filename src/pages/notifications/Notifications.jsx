import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import { FaSearch } from 'react-icons/fa';
import { FaAngleDoubleLeft,FaAngleDoubleRight } from 'react-icons/fa';


const Notifications = () => {
  const navigate = useNavigate();
  

  const data=[
    {id:1,name:"hi",status:"succesful",type:"assigned",email:"abc@gmail.com",sign:"1 year ago",userId:"890"},
    {id:2,name:"hello",status:"succesful",type:"assigned",email:"abc@gmail.com",sign:"1 year ago",userId:"89"},
    {id:3,name:"hey",status:"succesful",type:"assigned",email:"abc@gmail.com",sign:"1 year ago",userId:"8"},
  ]
  document.getElementById('search').addEventListener('keyup',function(){
    var search=this.ariaValueMax.toLowerCase();
    document.getElementById('table').innerHTML='';
    newarray=data.filter(function(val){
      if(val.id.includes(search)||val.name.includes(search)||val.status.includes(search)||val.type.includes(search)||val.email.includes(search)||val.sign.includes(search)||val.userId.includes(search)){
        const row=`<tr className='even:bg-[aliceblue] odd:bg-[#ccc]'>
           <td className="p-3">{val.id}</td>
           <td className="p-3">{val.status}</td>
           <td className="p-3">{val.type}</td>
           <td className="p-3">{val.email}</td>
           <td className="p-3">{val.sign}</td>
           <td className="p-3">{val.userId}</td>
        </tr>`
        document.getElementById('table').innerHTML+=row;
      }
    })
  });

  return (
    <Layout>
      <div className="w-full  flex items-center justify-end">
        <button className="bg-black text-white px-3 py-2 rounded-md font-semibold" onClick={() => navigate("/notifications/create")}>Add +</button>
      </div>
      <div className="relative w-fit">
        
        <input type="text" placeholder="search...." id="search" className='w-auto border border-gray-400 p-1 px-2 pr-[24px] m-2 rounded-xl '></input>
        <FaSearch className="absolute right-0 text-[15px] top-[2px] text-gray-400 m-4 "/>
      </div>
      <div className='w-full overflow-x-scroll lg:overflow-x-hidden rounded-md'>
      <table className="border w-full mt-6  sm:w-full  text-left text-nowrap rounded-md">
        <thead className="bg-gray-200">
            <th className="p-3 ">FULL NAME</th>
            <th className="p-3">STATUS</th>
            <th className="p-3">TYPE</th>
            <th className="p-3">EMAIL</th>
            <th className="p-3">SIGNED UP</th>
            <th className="p-3">USER ID</th>
        </thead>
        <tbody id='table'>
          {data.map((item,index)=>(
            <tr key={index} className='even:bg-[aliceblue] odd:bg-[#ccc]'>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.status}</td>
              <td className="p-3">{item.type}</td>
              <td className="p-3">{item.email}</td>
              <td className="p-3">{item.sign}</td>
              <td className="p-3">{item.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className='flex flex-row gap-4 justify-center items-center h-auto w-auto     mx-auto mt-6 font-semibold'>
         <a href="#" className='flex justify-center items-center hover:bg-gray-400 w-[25px] h-[25px]  rounded-[50%]'><FaAngleDoubleLeft/></a>
         <a href="#" className="flex justify-center items-center bg-gray-400 w-[25px] h-[25px]  rounded-[50%]">1</a>
         <a href="#" className="flex justify-center items-center active:bg-gray-400 w-[25px] h-[25px]  rounded-[50%]">2</a>
         <a href="#" className="flex justify-center items-center active:bg-gray-400 w-[25px] h-[25px]  rounded-[50%]">3</a>
         <a href="#" className='flex justify-center items-center hover:bg-gray-400 w-[25px] h-[25px]  rounded-[50%]'><FaAngleDoubleRight/></a>

      </div>
    </Layout>
  );
};

export default Notifications;
