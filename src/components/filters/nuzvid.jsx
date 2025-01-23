import React from "react";

const allowedYears = ["PUC-1", "PUC-2", "E1", "E2", "E3", "E4", "Others"];
const specifiedBranches = ["PUC", "CSE", "ECE", "EEE", "MECH", "METALLURGY", "CIVIL", "CHEMICAL"];

const normalizeYear = (year) => {
  const normalized = year?.replace(/\s+/g, '')?.toUpperCase();
  switch (normalized) {
    case 'PUC-1':
      return 'PUC-1';
    case 'PUC-2':
      return 'PUC-2';
    case 'E1':
      return 'E1';
    case 'E2':
      return 'E2';
    case 'E3':
      return 'E3';
    case 'E4':
      return 'E4';
    default:
      return 'Others';
  }
};

const Nuzvid = ({ data }) => {
  const nuzvidData = data.filter(user => user.collegeId?.startsWith("N"));

  const branchCounts = nuzvidData.reduce((acc, user) => {
    if (specifiedBranches.includes(user.branch)) {
      acc[user.branch] = (acc[user.branch] || 0) + 1;
    } else {
      acc['Others'] = (acc['Others'] || 0) + 1;
    }
    return acc;
  }, {});

  const yearCounts = nuzvidData.reduce((acc, user) => {
    const normalizedYear = normalizeYear(user.year);
    if (allowedYears.includes(normalizedYear)) {
      acc[normalizedYear] = (acc[normalizedYear] || 0) + 1;
    } else {
      acc['Others'] = (acc['Others'] || 0) + 1;
    }
    return acc;
  }, {});

  const sortedYearCounts = allowedYears.reduce((acc, year) => {
    if (yearCounts[year]) {
      acc[year] = yearCounts[year];
    }
    return acc;
  }, {});

  return (
    <div className="glass-card p-4 rounded-lg shadow-lg">
      <h2 className="text-lg md:text-2xl font-semibold pb-[10px]">Nuzvid Branch Wise Registrations</h2>
      <ul>
        {Object.entries(branchCounts).map(([branch, count]) => (
          <li key={branch} className="text-lg">{branch}: {count}</li>
        ))}
      </ul>
      <h2 className="text-lg md:text-2xl font-semibold py-[10px]">Nuzvid Year Wise Registrations</h2>
      <ul>
        {Object.entries(sortedYearCounts).map(([year, count]) => (
          <li key={year} className="text-lg">{year}: {count}</li>
        ))}
      </ul>
    </div>
  );
};

export default Nuzvid;
