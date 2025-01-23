import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RegistrationGraph = () => {
  // Datasets for different periods
  const dailyData = [
    { name: "Mon", registrations: 120 },
    { name: "Tue", registrations: 150 },
    { name: "Wed", registrations: 180 },
    { name: "Thu", registrations: 220 },
    { name: "Fri", registrations: 200 },
    { name: "Sat", registrations: 300 },
    { name: "Sun", registrations: 280 },
  ];

  const weeklyData = [
    { name: "Week 1", registrations: 900 },
    { name: "Week 2", registrations: 1100 },
    { name: "Week 3", registrations: 800 },
    { name: "Week 4", registrations: 1000 },
  ];

  const monthlyData = [
    { name: "Jan", registrations: 4000 },
    { name: "Feb", registrations: 4500 },
    { name: "Mar", registrations: 4200 },
    { name: "Apr", registrations: 4600 },
    { name: "May", registrations: 5000 },
  ];

  // State to manage current dataset
  const [selectedData, setSelectedData] = useState(dailyData);

  // Function to handle data selection
  const handleDataChange = (period) => {
    switch (period) {
      case "daily":
        setSelectedData(dailyData);
        break;
      case "weekly":
        setSelectedData(weeklyData);
        break;
      case "monthly":
        setSelectedData(monthlyData);
        break;
      default:
        setSelectedData(dailyData);
    }
  };

  return (
    <div className="p-4 bg-black w-full shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-white">Registrations Overview</h1>
        <select
          onChange={(e) => handleDataChange(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 p-2 rounded-md"
        >
          <option value="daily">Per Day</option>
          <option value="weekly">Last Week</option>
          <option value="monthly">Last Month</option>
        </select>
      </div>

      {/* Responsive Graph */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={selectedData}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: "#333", borderColor: "#444" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#ddd" }}
          />
          <Legend wrapperStyle={{ color: "#ccc" }} />
          <Line
            type="monotone"
            dataKey="registrations"
            stroke="#4fc3f7"
            strokeWidth={2}
            dot={{ r: 5, fill: "#4fc3f7" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegistrationGraph;
