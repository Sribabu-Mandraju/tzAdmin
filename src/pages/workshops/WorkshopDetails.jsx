import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/layouts/Layout';

const WorkshopDetails = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
          console.error("No adminToken found in local storage");
          return;
        }
  
        // Add the Authorization header with the Bearer token
        const config = {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        };
  
        // Make the GET request with the Bearer token
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/workshops/${id}`,
          config
        );
  
        setWorkshop(response.data);
      } catch (error) {
        console.error("Error fetching workshop details:", error);
      } finally {
        setIsLoading(false); // Set loading to false after data is fetched
      }
    };
  
    fetchWorkshop();
  }, [id]);
  

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center mt-10">Loading workshop details...</div>
      </Layout>
    ); // Loading state
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-5 bg-white bg-opacity-10 backdrop-blur-md rounded-md">
        <h2 className="text-center text-2xl font-bold mb-5">{workshop.name}</h2>
        <div className="flex flex-col lg:flex-row items-start mb-5">
          <img src={workshop.workshopImg} alt="Workshop" className="w-full lg:w-1/3 h-auto max-h-96 object-cover rounded-md mb-5 lg:mb-0 lg:mr-5" />
          <div className="flex-grow">
            <p className="mb-2"><strong>Department:</strong> {workshop.dep}</p>
            <p className="mb-4"><strong>About:</strong> Join us for an immersive UI/UX design workshop where you'll explore the principles and practices of creating exceptional digital experiences. Whether you're a seasoned designer or just starting out, this workshop will equip you with the skills and knowledge needed to design intuitive and engaging user interfaces.</p>
            <h3 className="font-semibold mb-2">Structure</h3>
            <p className="mb-2">Mode of Training: Offline</p>
            <p className="mb-2">Duration of Program: 10-12 hours</p>
            <p className="mb-2">Workshop Format: 2-days including 4 sessions</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="flex-1 p-5 bg-white bg-opacity-10 backdrop-blur-md rounded-md">
            <h3 className="font-semibold mb-2">Contact:</h3>
            <p className="mb-1">Sandrapalli Jashwanth</p>
            <p className="mb-1">Workshop manager | General Secretary</p>
            <p className="mb-1">Teckzite'25</p>
            <p className="mb-1">+91 9014945230</p>
            <p className="mb-1">N190290@RGUKT.AC.IN</p>
          </div>
          <div className="flex-1 p-5 bg-white bg-opacity-10 backdrop-blur-md rounded-md flex items-center">
            <img src={workshop.instructorImage} alt="Instructor" className="w-24 h-24 object-cover rounded-full mr-5" />
            <div>
              <h3 className="font-semibold mb-2">Instructor:</h3>
              <p className="mb-1"><strong>Name:</strong> {workshop.instructorName}</p>
              <p className="mb-1"><strong>Specifications:</strong> {workshop.instructorSpecifications}</p>
            </div>
          </div>
        </div>
        <h3 className="font-semibold mb-2">Registered Students:</h3>
        {workshop.regStudents && workshop.regStudents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white bg-opacity-10 backdrop-blur-md rounded-md">
              <thead className="bg-black">
                <tr className="border-b">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">ID Number</th>
                  <th className="p-2 text-left">College</th>
                </tr>
              </thead>
              <tbody>
                {workshop.regStudents.map((student, index) => (
                  <tr key={index} className="border-b hover:bg-[#0A69A5] hover:bg-opacity-20">
                    <td className="p-2">{student.name}</td>
                    <td className="p-2">{student.email}</td>
                    <td className="p-2">{student.idNumber}</td>
                    <td className="p-2">{student.college}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No students registered for this workshop.</p>
        )}
      </div>
    </Layout>
  );
};

export default WorkshopDetails;
