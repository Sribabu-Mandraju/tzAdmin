import { useEffect, useState } from "react";
import axios from "axios";
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken"); // Retrieve adminToken from localStorage

        const response = await axios.get("https://tzbackendnewversion.onrender.com/user/getAll", {
          headers: {
            Authorization: `Bearer ${adminToken}`, // Include the token in the request headers
          },
        });

        const fetchedData = response.data.users;

        // Process data to aggregate registrations by date
        const aggregatedData = fetchedData.reduce((acc, user) => {
          const date = new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date]++;
          return acc;
        }, {});

        // Convert aggregated data to array format for recharts
        const chartData = Object.keys(aggregatedData).map((date) => ({
          name: date,
          registrations: aggregatedData[date],
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-black w-full shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-white">Registrations Overview</h1>
      </div>

      {/* Responsive Graph */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
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
