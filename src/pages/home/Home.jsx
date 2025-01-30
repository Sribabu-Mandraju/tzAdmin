import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import RegistrationGraph from "../../components/graph/RegistrationsGraph";
import BranchWise from "../../components/filters/branch";
import YearWise from "../../components/filters/year";
import CollegeWise from "../../components/filters/college";
import Nuzvid from "../../components/filters/nuzvid";
import RegistrationModeWise from "../../components/filters/registration";
import { useSelector } from "react-redux";

const Home = () => {
  const [registrations, setRegistrations] = useState([]);
  const [totalRgukt, setTotalRgukt] = useState(0);
  const [totalNonRgukt, setTotalNonRgukt] = useState(0);
  const [totalAmountReceived, setTotalAmountReceived] = useState(0);
  const [view, setView] = useState("summary");

  const navigate = useNavigate();

  const adminToken = useSelector((state) => state.auth.jwtToken);
  const fetchData = async () => {
    try {
      // Retrieve the adminToken from local storage
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
      const response = await axios.get("https://tzbackendnewversion.onrender.com/user/getAll", config);
      const data = response.data.users;
      console.log("Fetched data in Home:", data); // Debugging: Log fetched data
      setRegistrations(data);
  
      const rguktRegex = /^[rosnr]\d{6}$/i;
      const rguktCount = data.filter((user) => rguktRegex.test(user.collegeId)).length;
      const nonRguktCount = data.length - rguktCount;
  
      const amountReceived = data.reduce((acc, user) => {
        const amountPaid = parseFloat(user.amountPaid);
        if (!isNaN(amountPaid)) {
          return acc + (amountPaid > 500 ? amountPaid / 100 : amountPaid);
        }
        return acc; // If amountPaid is NaN, return the accumulator unchanged
      }, 0);
  
      setTotalRgukt(rguktCount);
      setTotalNonRgukt(nonRguktCount);
      setTotalAmountReceived(amountReceived.toFixed(2));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (view, param) => {
    console.log(`Navigating to /dashboard/usersdata?view=${view}&param=${param}`); // Debugging: Log navigation
    navigate(`/dashboard/usersdata?view=${view}&param=${param}`);
  };

  return (
    <Layout registrations={registrations}>
      <div className="dashboard bg-black text-white min-h-screen p-6">
        {/* Registration Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 rounded-lg shadow-lg m-1">
            <h2 className="text-xl md:text-xl font-semibold pb-[10px]">Total Registrations</h2>
            <h2 className="registrations-count text-4xl font-semibold">{registrations.length}</h2>
          </div>
          <div className="glass-card p-4 rounded-lg shadow-lg m-1">
            <h2 className="text-xl md:text-xl font-semibold pb-[10px]">From RGUKT</h2>
            <h2 className="registrations-count text-4xl font-semibold">{totalRgukt}</h2>
          </div>
          <div className="glass-card p-4 rounded-lg shadow-lg m-1">
            <h2 className="text-xl md:text-xl font-semibold pb-[10px]">Non RGUKT</h2>
            <h2 className="registrations-count text-4xl font-semibold">{totalNonRgukt}</h2>
          </div>
          <div className="glass-card p-4 rounded-lg shadow-lg m-1">
            <h2 className="text-xl md:text-xl font-semibold pb-[10px]">Received Money</h2>
            <h2 className="registrations-count text-4xl font-semibold">₹{totalAmountReceived}</h2>
          </div>
        </div>

        {/* Registration Graph Section */}
        <div className="registrations-graph w-full glass-card">
          <RegistrationGraph />
        </div>

        {/* Additional Info Section */}
        <div className="additional-info grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 py-4 my-8">
          {["branch", "year", "college", "nuzvid", "registrationMode"].map((item) => (
            <div
              key={item}
              className={`info-box glass-card text-center mx-2 text-lg font-semibold p-2 h-[1in] flex items-center justify-center ${view === item ? 'active-view' : ''}`}
              onClick={() => setView(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </div>
          ))}
        </div>

        {/* Dynamic View Section */}
        <div className="view-container my-8">
          {view === "branch" && <BranchWise data={registrations} onCardClick={handleCardClick} />}
          {view === "year" && <YearWise data={registrations} onCardClick={handleCardClick} />}
          {view === "college" && <CollegeWise data={registrations} onCardClick={handleCardClick} />}
          {view === "nuzvid" && <Nuzvid data={registrations} onCardClick={handleCardClick} />}
          {view === "registrationMode" && <RegistrationModeWise data={registrations} onCardClick={handleCardClick} />}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
