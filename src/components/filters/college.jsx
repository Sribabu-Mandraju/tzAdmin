import React from "react";

const CollegeWise = ({ data }) => {
  const collegeCounts = data.reduce((acc, user) => {
    let collegeType = "Others";
    const collegeId = user.collegeId?.toUpperCase();
    if (collegeId?.startsWith("N")) {
      collegeType = "RGUKT NUZ";
    } else if (collegeId?.startsWith("S")) {
      collegeType = "RGUKT SKLM";
    } else if (collegeId?.startsWith("R") && collegeId.length === 7) {
      collegeType = "RGUKT RKV";
    } else if (collegeId?.startsWith("RO")) {
      collegeType = "RGUKT ONG";
    }
    acc[collegeType] = (acc[collegeType] || 0) + 1;
    return acc;
  }, {});

  // Sort college counts, placing "Others" at the end
  const sortedCollegeCounts = Object.entries(collegeCounts).sort(([collegeA], [collegeB]) => {
    if (collegeA === "Others") return 1;
    if (collegeB === "Others") return -1;
    return collegeA.localeCompare(collegeB);
  });

  return (
    <div className="glass-card p-4 rounded-lg shadow-lg">
      <h2 className="text-lg md:text-2xl font-semibold pb-[10px]">College Wise Registrations</h2>
      <div className="flex flex-wrap gap-4">
        {sortedCollegeCounts.map(([college, count]) => (
          <div key={college} className="college-card p-4 border rounded-lg shadow-md bg-white bg-opacity-10 backdrop-blur-md">
            <h3 className="text-lg font-semibold">{college}</h3>
            <p className="text-lg">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeWise;
