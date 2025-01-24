import React from "react";
import { FaUserCheck } from "react-icons/fa";

const BranchWise = ({ data }) => {
  const specifiedBranches = ["PUC", "CSE", "ECE", "EEE", "MECH", "METALLURGY", "CIVIL", "CHEMICAL"];
  const branchCounts = data.reduce((acc, user) => {
    const branch = user.branch?.toUpperCase();
    if (branch) {
      if (specifiedBranches.includes(branch)) {
        acc[branch] = (acc[branch] || 0) + 1;
      } else {
        acc["OTHERS"] = (acc["OTHERS"] || 0) + 1;
      }
    }
    return acc;
  }, {});

  const sortedBranches = Object.entries(branchCounts).sort(([branchA], [branchB]) => {
    if (branchA === "OTHERS") return 1;
    if (branchB === "OTHERS") return -1;
    return branchA.localeCompare(branchB);
  });

  return (
    <div className="glass-card p-4 rounded-lg shadow-lg">
      <h2 className="text-lg md:text-2xl font-semibold pb-[10px]">Branch Wise Registrations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedBranches.map(([branch, count]) => (
          <div key={branch} className="branch-card m-4 p-4 border rounded-lg shadow-md bg-black text-white flex items-center">
            <div className="icon-container text-white mr-10">
              <FaUserCheck size={32} />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-3xl">{count}</p>
              <h3 className="text-lg font-semibold">{branch}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchWise;
