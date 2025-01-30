import React, { useState, useEffect } from "react";
import axios from "axios";

const MegaProjectExpo = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        setError("Admin token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://tzbackendnewversion.onrender.com/projectExpo/",
          {
            headers: { Authorization: `Bearer ${adminToken}` },
          }
        );
        setProjects(response.data);
        console.log(projects)
      } catch (err) {
        setError("Failed to fetch project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading)
    return <p className="text-center text-lg text-gray-700">Loading...</p>;

  if (error)
    return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Mega Project Expo
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border p-5 rounded-xl shadow-md bg-white hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {project.title}
            </h3>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <p className="text-sm font-medium mt-3 text-gray-700">
              <span className="font-semibold text-blue-700">Team:</span>{" "}
              {project.team}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaProjectExpo;
