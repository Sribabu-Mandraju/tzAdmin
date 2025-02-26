import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useSelector } from "react-redux";


const UserTable = () => {
  const usersData = useSelector((state) => state.users?.data?.users);

  const [data, setData] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const view = params.get("view");
  const param = params.get("param");

  useEffect(() => {
    const fetchData = async () => {
      try {
        
  
       
  
        setData(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Query Parameters:", { view, param }); // Debugging: Log query parameters

  const filterData = () => {
    if (!data || !view || !param) return [];
    if (view === "branch") {
      return data.filter(
        (user) =>
          user.branch && user.branch.toUpperCase() === param.toUpperCase()
      );
    } else if (view === "year") {
      return data.filter((user) => user.year === param);
    } else if (view === "college") {
      const normalizedParam = param.replace("%20", " ");
      if (normalizedParam === "RGUKT NUZ") {
        return data.filter(
          (user) => user.collegeId && /^N/i.test(user.collegeId)
        );
      } else if (normalizedParam === "RGUKT RKV") {
        return data.filter(
          (user) =>
            user.collegeId &&
            /^R/i.test(user.collegeId) &&
            user.collegeId.length === 7
        );
      } else if (normalizedParam === "RGUKT SKLM") {
        return data.filter(
          (user) =>
            user.collegeId &&
            /^S/i.test(user.collegeId) &&
            user.collegeId.length === 7
        );
      } else if (normalizedParam === "RGUKT ONG") {
        return data.filter(
          (user) => user.collegeId && /^RO/i.test(user.collegeId)
        );
      } else {
        return data.filter((user) => !/^N|R|S|RO/i.test(user.collegeId));
      }
    } else if (view === "nuzvid") {
      return data.filter((user) => user.collegeId?.startsWith("N"));
    } else if (view === "registrationMode") {
      const rguktRegex = /^[nNrRsS]|[rRoO]/i;
      if (param === "online-rgukt") {
        return data.filter(
          (user) =>
            user.mode === "online_mode" && rguktRegex.test(user.collegeId)
        );
      } else if (param === "online-non-rgukt") {
        return data.filter(
          (user) =>
            user.mode === "online_mode" && !rguktRegex.test(user.collegeId)
        );
      } else if (param === "offline") {
        return data.filter((user) => user.mode === "offline_mode");
      }
    }
    return [];
  };

  const titleMap = {
    branch: `${param} Branch Registrations`,
    year: `${param} Year Registrations`,
    college: `${param} College Registrations`,
    nuzvid: "Nuzvid Registrations",
    registrationMode: `${
      param === "online-rgukt"
        ? "Online RGUKT"
        : param === "online-non-rgukt"
        ? "Online Non-RGUKT"
        : "Offline"
    } Registrations`,
  };

  const filteredData = filterData();
  console.log("Filtered data:", filteredData); // Debugging: Log filtered data

  return (
    <Layout>
      <div className="bg-black rounded-lg p-6 w-full overflow-hidden">
        <h2 className="text-2xl font-semibold mb-4">{titleMap[view]}</h2>
        <div className="overflow-auto h-full">
          <table className="min-w-full bg-opacity-50 bg-black rounded-lg shadow-lg">
            <thead className="glassmorphic-header">
              <tr>
                <th className="py-2 px-4">College ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">College</th>
                <th className="py-2 px-4">Branch</th>
                <th className="py-2 px-4">Email</th>
              </tr>
            </thead>
            <tbody className="glassmorphic-body">
              {filteredData.map((user) => (
                <tr
                  key={user.collegeId}
                  style={{
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0A69A5")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <td className="py-2 px-4">{user.collegeId}</td>
                  <td className="py-2 px-4">
                    {`${user.firstName} ${user.lastName}`.length > 15
                      ? `${user.firstName} ${user.lastName}`.slice(0, 15) + ".."
                      : `${user.firstName} ${user.lastName}`}
                  </td>
                  <td className="py-2 px-4">
                    {user.college.length > 15
                      ? user.college.slice(0, 15) + ".."
                      : user.college}
                  </td>
                  <td className="py-2 px-4">{user.branch}</td>
                  <td className="py-2 px-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default UserTable;
