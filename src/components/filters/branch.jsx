import React from "react";

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
      <div className="flex flex-wrap gap-4">
        {sortedBranches.map(([branch, count]) => (
          <div key={branch} className="branch-card p-4 border rounded-lg shadow-md bg-white bg-opacity-10 backdrop-blur-md">
            <h3 className="text-lg font-semibold">{branch}</h3>
            <p className="text-lg">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchWise;
