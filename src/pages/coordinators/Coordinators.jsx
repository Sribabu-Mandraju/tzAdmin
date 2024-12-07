import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';


const Coordinators = () => {
const coordi=[
  {photo:"",post:"president",name:"",email:""},
]
  

  return (
    <Layout >
      <div className="w-full h-full flex justify-center items-center md:p-[30px] ">
       <div className="card  rounded-lg shadow-2xl border-[1px] flex flex-col items-center lg:flex-row">  
          <div className="image justify-center rounded-lg">       
             <img className="w-full shadow-lg rounded-l-lg"src="https://img.indiaforums.com/person/480x360/1/2525-prabhas.jpg"/> 
          </div>
        <div className="details-wrap w-full h-[150px] flex flex-col justify-center items-center">
        <p className="text-black text-[30px] lg:text-[40px] text-center">krishna kiriti</p>
        <p className="text-[gray] text-[15px] text-center">President</p>
        <p className="text-black text-[20px] text-center">president@gmail.com</p>
        </div>
       </div>
        
      </div>
    
  
    </Layout>
  );
};

export default Coordinators;