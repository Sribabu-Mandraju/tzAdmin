import React from "react";
import Layout from "../../components/layouts/Layout";
import RegistrationGraph from "../../components/graph/RegistrationsGraph";
import cse from "../../assets/cse.svg";
import ece from "../../assets/ece.svg";
import eee from "../../assets/eee.svg";
import mechanical from "../../assets/mechanical.svg";
import civil from "../../assets/civil.svg";
import chemical from "../../assets/chemical.svg";
import puc from "../../assets/puc.svg";
import metallurgy from "../../assets/metallurgy.svg";
import others from "../../assets/others.svg";

const Home = () => {
  return (
    <Layout>
      <div className="dashboard bg-black text-white min-h-screen p-6">
        <div className="registrations-data grid grid-cols-1 grid-rows-2 lg:grid-cols-2 gap-5 lg:grid-rows-1 w-full">
          <div className="registration-statistics grid grid-cols-2 grid-rows-2 gap-4 h-full">
            {["Total Registrations", "From Rgukt", "Non Rgukt", "Received Money"].map((title, index) => (
              <div
                key={index}
                className="glass-card col-span-1 p-4 rounded-lg shadow-lg"
              >
                <h2 className="text-lg md:text-2xl font-semibold pb-[10px]">
                  {title}
                </h2>
                <h2 className="registrations-count text-4xl font-semibold">0</h2>
              </div>
            ))}
          </div>
          <div className="registrations-graph w-full glass-card">
            <RegistrationGraph />
          </div>
        </div>

        {/* New Boxes Section */}
        <div className="additional-info grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
          {["Branch", "Year", "College", "Nuzvid"].map((info, index) => (
            <div key={index} className="info-box glass-card text-center text-lg font-semibold h-[2in] flex items-center justify-center">
              {info}
            </div>
          ))}
        </div>

        <div className="department-registrations grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-[30px]">
          {[
            { img: puc, name: "PUC" },
            { img: cse, name: "CSE" },
            { img: ece, name: "ECE" },
            { img: eee, name: "EEE" },
            { img: mechanical, name: "MECHANICAL" },
            { img: civil, name: "CIVIL" },
            { img: chemical, name: "CHEMICAL" },
            { img: metallurgy, name: "METALLURGY" },
            { img: others, name: "OTHERS" },
          ].map((branch, index) => (
            <div key={index} className="glass-card flex gap-[20px] p-[15px] rounded-lg shadow-lg">
              <img src={branch.img} alt={branch.name} className="h-[70px] w-[80px]" />
              <div className="details-wrap flex flex-col">
                <h1 className="font-bold">{branch.name}</h1>
                <h2 className="text-[18px]">
                  Total registrations: <span className="count">{0}</span>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
