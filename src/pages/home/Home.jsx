import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/layouts/Layout";
import RegistrationGraph from "../../components/graph/RegistrationsGraph";
import BranchWise from "../../components/filters/branch";
import YearWise from "../../components/filters/year";
import CollegeWise from "../../components/filters/college";
import Nuzvid from "../../components/filters/nuzvid";

const Home = () => {
  const [registrations, setRegistrations] = useState([]);
  const [totalRgukt, setTotalRgukt] = useState(0);
  const [totalNonRgukt, setTotalNonRgukt] = useState(0);
  const [totalAmountReceived, setTotalAmountReceived] = useState(0);
  const [view, setView] = useState("summary"); // State to manage the current view

  const fetchData = async () => {
    try {
      const response = await axios.get("https://tzbackenddevmode.onrender.com/user/getAll");
      const data = response.data.users;
      setRegistrations(data);

      const rguktRegex = /^[rosnr]\d{6}$/i; 
      const rguktCount = data.filter(user => rguktRegex.test(user.collegeId)).length;
      const nonRguktCount = data.length - rguktCount;

      const amountReceived = data.reduce((acc, user) => {
        const amountPaid = parseFloat(user.amountPaid);
        return acc + (isNaN(amountPaid) ? 0 : amountPaid / 100); 
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

  return (
    <Layout>
      <div className="dashboard bg-black text-white min-h-screen p-6">
        <div className="registrations-data grid grid-cols-1 gap-5 lg:grid-cols-2 lg:grid-rows-1 w-full">
          <div className="registration-statistics grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 h-full">
            <div className="glass-card col-span-1 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg md:text-2xl font-semibold pb-[10px]">
                Total Registrations
              </h2>
              <h2 className="registrations-count text-4xl font-semibold">
                {registrations.length}
              </h2>
            </div>
            <div className="glass-card col-span-1 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg md:text-2xl font-semibold pb-[10px]">
                From Rgukt
              </h2>
              <h2 className="registrations-count text-4xl font-semibold">
                {totalRgukt}
              </h2>
            </div>
            <div className="glass-card col-span-1 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg md:text-2xl font-semibold pb-[10px]">
                Non Rgukt
              </h2>
              <h2 className="registrations-count text-4xl font-semibold">
                {totalNonRgukt}
              </h2>
            </div>
            <div className="glass-card col-span-1 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg md:text-2xl font-semibold pb-[10px]">
                Received Money
              </h2>
              <h2 className="registrations-count text-4xl font-semibold">
                ₹{totalAmountReceived}
              </h2>
            </div>
          </div>
          <div className="registrations-graph w-full glass-card">
            <RegistrationGraph />
          </div>
        </div>

        {/* New Boxes Section */}
        <div className="additional-info grid grid-cols-2 md:grid-cols-4 gap-4 py-4 my-8">
          {["branch", "year", "college", "nuzvid"].map((item) => (
            <div
              key={item}
              className={`info-box glass-card text-center mx-5 text-lg font-semibold h-[1in] flex items-center justify-center p-2 ${view === item ? 'active-view' : ''}`}
              onClick={() => setView(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </div>
          ))}
        </div>

        <div className="view-container my-8">
          {view === "branch" && <BranchWise data={registrations} />}
          {view === "year" && <YearWise data={registrations} />}
          {view === "college" && <CollegeWise data={registrations} />}
          {view === "nuzvid" && <Nuzvid data={registrations} />}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
