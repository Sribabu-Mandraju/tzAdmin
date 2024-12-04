import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';


const Coordinators = () => {
const coordi=[
  {photo:"",post:"president",name:"",email:""},
]
  

  return (
    <Layout >
      <div className="bg-black w-full h-full flex justify-center items-center">
     <div className="h-[300px] w-[250px] bg-white rounded-[5px] flex justify-center items-center flex-col relative">
      <div className="absolute -top-10"><img className="h-[200px] w-[200px] rounded-[5px]"src="https://img.indiaforums.com/person/480x360/1/2525-prabhas.jpg"/></div>
      <div className="mt-[140px]">
        <div className="text-black font-bold text-[20px] text-center">krishna kiriti</div>
        <div className="text-[gray] text-[15px] text-center">President</div>
        <div className="text-black text-[20px] text-center">@gmail.com</div>
      </div>
     </div>
     </div>
    </Layout>
  );
};

export default Coordinators;