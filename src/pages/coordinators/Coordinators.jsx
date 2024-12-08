import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import CoordinatorsCard from "./card";
import TZ from "../../assets/TZLOGO.svg";
const Coordinators = () => {
  const navigate = useNavigate()
  return (
    <Layout >
        <div className="flex flex-wrap gap-8 justify-start items-center py-[20px]">
        <CoordinatorsCard image={TZ} name="Name" profession="Profession" />
        <CoordinatorsCard image={TZ} name="Name" profession="Profession"  />
        <CoordinatorsCard image={TZ} name="Name" profession="Profession"  />
        <CoordinatorsCard image={TZ} name="Name" profession="Profession"  />
        <CoordinatorsCard image={TZ} name="Name" profession="Profession"  />
           
      </div>
    
  
    </Layout>
  );
};

export default Coordinators;