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

  return (
    <div className="glass-card p-4 rounded-lg shadow-lg">
      <h2 className="text-lg md:text-2xl font-semibold pb-[10px]">College Wise Registrations</h2>
      <ul>
        {Object.entries(collegeCounts).map(([college, count]) => (
          <li key={college} className="text-lg">{college}: {count}</li>
        ))}
      </ul>
    </div>
  );
};

export default CollegeWise;
