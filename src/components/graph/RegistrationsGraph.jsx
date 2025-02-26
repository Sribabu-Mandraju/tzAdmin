import { useMemo } from "react";
import { useSelector } from "react-redux";
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
  const usersData = useSelector((state) => state.users.data?.users || []);

  // Process data efficiently using useMemo
  const chartData = useMemo(() => {
    if (!usersData.length) return [];

    const aggregatedData = usersData.reduce((acc, user) => {
      const date = new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(aggregatedData).map(([date, registrations]) => ({
      name: date,
      registrations,
    }));
  }, [usersData]);

  return (
    <div className="p-4 bg-black w-full shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-white">Registrations Overview</h1>
      </div>

      {/* Responsive Graph */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
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
