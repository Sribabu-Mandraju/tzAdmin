
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../../components/layouts/Layout";
import RegistrationGraph from "../../components/graph/RegistrationsGraph";
import BranchWise from "../../components/filters/branch";
import YearWise from "../../components/filters/year";
import CollegeWise from "../../components/filters/college";
import Nuzvid from "../../components/filters/nuzvid";
import RegistrationModeWise from "../../components/filters/registration";
//
const Home = () => {
  const [registrations, setRegistrations] = useState([]);
  const [totalRgukt, setTotalRgukt] = useState(0);
  const [totalNonRgukt, setTotalNonRgukt] = useState(0);
  const [totalAmountReceived, setTotalAmountReceived] = useState(0);
  const [view, setView] = useState("summary");

  const usersData = useSelector((state) => state.users?.data?.users);
  console.log(usersData)
  const adminToken = useSelector((state) => state.auth.jwtToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (usersData) {
      setRegistrations(usersData);
      
      const rguktRegex = /^[rosnr]\d{6}$/i;
      const rguktCount = usersData.filter((user) => rguktRegex.test(user.collegeId)).length;
      const nonRguktCount = usersData.length - rguktCount;
      
      const amountReceived = usersData.reduce((acc, user) => {
        const amountPaid = parseFloat(user.amountPaid);
        return !isNaN(amountPaid) ? acc + (amountPaid > 500 ? amountPaid / 100 : amountPaid) : acc;
      }, 0);

      setTotalRgukt(rguktCount);
      setTotalNonRgukt(nonRguktCount);
      setTotalAmountReceived(amountReceived.toFixed(2));
    }
  }, [usersData]);

  const handleCardClick = (view, param) => {
    navigate(`/dashboard/usersdata?view=${view}&param=${param}`);
  };

  return (
    <Layout registrations={registrations}>
      <div className="dashboard bg-black text-white min-h-screen p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Registrations", value: registrations?.length },
            { label: "From RGUKT", value: totalRgukt },
            { label: "Non RGUKT", value: totalNonRgukt },
            { label: "Received Money", value: `₹${totalAmountReceived}` },
          ].map(({ label, value }) => (
            <div key={label} className="glass-card p-4 rounded-lg shadow-lg m-1">
              <h2 className="text-xl md:text-xl font-semibold pb-[10px]">{label}</h2>
              <h2 className="registrations-count text-4xl font-semibold">{value}</h2>
            </div>
          ))}
        </div>

        <div className="registrations-graph w-full glass-card">
          <RegistrationGraph />
        </div>

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