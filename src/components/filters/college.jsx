import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa";

const CollegeWise = ({ data, onCardClick }) => {
  const navigate = useNavigate();
  const collegeCounts = data.reduce((acc, user) => {
    let collegeType = "Others";
    const collegeId = user.collegeId?.toUpperCase();
    if (collegeId?.startsWith("N")&& collegeId.length === 7) {
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

  const sortedCollegeCounts = Object.entries(collegeCounts).sort(([collegeA], [collegeB]) => {
    if (collegeA === "Others") return 1;
    if (collegeB === "Others") return -1;
    return collegeA.localeCompare(collegeB);
  });

  const handleCardClick = (college) => {
    navigate(`/dashboard/usersdata?view=college&param=${college}`);
  };

  return (
    <div className="glass-card p-4 rounded-lg shadow-lg">
      <h2 className="text-lg md:text-2xl font-semibold pb-[10px]">College Wise Registrations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedCollegeCounts.map(([college, count]) => (
          <div 
            key={college} 
            className="college-card m-4 p-4 border rounded-lg shadow-md bg-black text-white flex items-center cursor-pointer" 
            onClick={() => handleCardClick(college)}
          >
            <div className="icon-container text-white mr-10">
              <FaUserCheck size={32} />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-3xl">{count}</p>
              <h3 className="text-[12px] font-semibold">{college}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeWise;
