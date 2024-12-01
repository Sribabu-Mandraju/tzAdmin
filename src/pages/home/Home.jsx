import React from "react";
import Layout from "../../components/layouts/Layout";
const Home = () => {
  return (
    <Layout>
      <div className="dashboard ">
        <div className="registrations-data grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 w-full">
          <div className="registration-statistics grid grid-cols-2 grid-rows-2 gap-4 md:w-[500px] h-[250px]">
          <div className="total-registrations border border-zinc-300 col-span-1 p-4 text-black rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Total <br className="sm:hidden"></br> Registrations</h2> {/* Corrected font size */}
            <h2 className="registrations-count text-3xl font-semibold">0</h2>
          </div>
          <div className="fromcampus p-4 border border-zinc-300 text-black rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold ">From <br className="sm:hidden"></br> Rgukt</h2>
            <h2 className="registrations-count text-3xl font-semibold">0</h2>
          </div>
          <div className="offcampus p-4 border border-zinc-300 text-black rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Off <br className="sm:hidden"></br>Campus</h2>
            <h2 className="registrations-count text-3xl font-semibold">0</h2>
          </div>
          <div className="received-money border border-zinc-300 p-4 text-black rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Received <br className="sm:hidden"></br> Money</h2>
            <h2 className="total-money text-3xl font-semibold ">0</h2>
          </div>
        </div>
        <div className="registrations-graph">
        </div>
        </div>
        <div className="department-registrations grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 py-[30px]">
          <div className="fromcse border border-zinc-300 shadow-lg text-lg rounded-lg font-semibold p-[15px] ">
            <h1 className="font-bold">CSE</h1>
            <h2 className="text-[18px]">Total registrations: <span className='count-cse'>0</span></h2>
          </div>
          <div className="fromece border border-zinc-300 shadow-lg text-lg rounded-lg font-semibold p-[15px]">
            <h1 className="font-bold">ECE</h1>
            <h2>Total registrations: <span className='count-ece'>0</span></h2>
          </div>
          <div className="frommechanical border border-zinc-300 shadow-lg text-lg rounded-lg font-semibold p-[15px]">
            <h1 className="font-bold">MECHANICAL</h1>
            <h2>Total registrations: <span className='count-mechanical'>0</span></h2>
          </div>
          <div className="fromcivil border border-zinc-300 shadow-lg text-lg rounded-lg font-semibold p-[15px]">
            <h1 className="font-bold">CIVIL</h1>
            <h2>Total registrations: <span className='count-civil'>0</span></h2>
          </div>
          <div className="fromchemical border border-zinc-300 shadow-lg text-lg rounded-lg font-semibold p-[15px]">
            <h1 className="font-bold">CHEMICAL</h1>
            <h2>Total registrations: <span className='count-chemical'>0</span></h2>
          </div>
          <div className="frommetallurgy border border-zinc-300 shadow-lg text-lg rounded-lg font-semibold p-[15px]">
            <h1 className="font-bold">METALLURGY</h1>
            <h2>Total registrations: <span className='count-metallurgy'>0</span></h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
