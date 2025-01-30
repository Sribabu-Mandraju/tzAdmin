import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layouts/Layout";
import { X, Eye, Edit, Trash } from "lucide-react";

const HackathonProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedProject, setEditedProject] = useState({
    projectTitle: "",
    description: "",
    team: [{ name: "", phone: "" }, { name: "", phone: "" }],
  });

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
          "https://tzbackendnewversion.onrender.com/hackathon/",
          {
            headers: { Authorization: `Bearer ${adminToken}` },
          }
        );
        setProjects(response.data);
      } catch (err) {
        setError("Failed to fetch hackathon projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const closeModal = () => {
    setSelectedProject(null);
  };

  const handleDeleteProject = async () => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      setError("Admin token not found. Please log in.");
      return;
    }

    try {
      await axios.delete(
        `https://tzbackendnewversion.onrender.com/hackathonProjects/${selectedProject._id}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      setProjects(projects.filter((proj) => proj._id !== selectedProject._id));
      closeModal();
    } catch (err) {
      setError("Failed to delete project.");
    }
  };

  const handleEdit = async () => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      setError("Admin token not found. Please log in.");
      return;
    }

    try {
      await axios.put(
        `https://tzbackendnewversion.onrender.com/hackathonProjects/${selectedProject._id}`,
        { ...editedProject },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      setProjects(
        projects.map((proj) =>
          proj._id === selectedProject._id ? { ...proj, ...editedProject } : proj
        )
      );
      setEditModalOpen(false);
      closeModal();
    } catch (err) {
      setError("Failed to update project.");
    }
  };

  const filteredProjects = projects.filter((proj) =>
    proj.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-4xl font-bold text-center text-gray-100 mb-6">
          Hackathon Projects
        </h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/3 sm:w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 text-gray-700 focus:ring-blue-300 max-w-[250px]"
          />
        </div>

        {/* Project Table */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 border text-center">Project Title</th>
                <th className="p-3 border text-center">Description</th>
                <th className="p-3 border text-center">Team Size</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((proj) => (
                <tr
                  key={proj._id}
                  className="bg-white bg-opacity-30 backdrop-blur-lg border border-gray-300 
                  transition duration-300 hover:bg-[#0a69a5] hover:text-white"
                >
                  <td className="px-2 border">{proj.projectTitle}</td>
                  <td className="px-2 border">{proj.description}</td>
                  <td className="px-2 border text-center">{proj.team.length}</td>
                  <td className="px-2 border text-center">
                    <div className="flex justify-center gap-x-2">
                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="text-white px-3 py-2 rounded-lg flex items-center gap-1
                        transition hover:bg-[#004c75] hover:scale-105 duration-200"
                      >
                        <Eye size={18} /> View
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProject(proj);
                          setEditModalOpen(true);
                          setEditedProject({
                            projectTitle: proj.projectTitle,
                            description: proj.description,
                            team: proj.team.map((member) => ({
                              name: member.name,
                              phone: member.phone,
                            })),
                          });
                        }}
                        className="text-white px-3 py-2 rounded-lg flex items-center gap-1
                        transition hover:bg-[#1e7d34] hover:scale-105 duration-200"
                      >
                        <Edit size={18} /> Edit
                      </button>
                      <button
                        onClick={handleDeleteProject}
                        className="text-white px-3 py-2 rounded-lg flex items-center gap-1
                        transition hover:bg-red-500 hover:scale-105 duration-200"
                      >
                        <Trash size={18} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
            onClick={closeModal}
          >
            <div
              className="bg-white bg-opacity-30 border border-white/20 p-6 rounded-lg shadow-lg w-96
              backdrop-blur-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-white hover:text-gray-300"
                onClick={closeModal}
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold text-white mb-4">
                {selectedProject.projectTitle}
              </h3>
              <p className="text-white mb-2">
                <strong>Description:</strong> {selectedProject.description}
              </p>
              <h4 className="text-lg font-bold text-white mb-2">Team Members</h4>
              <ul className="space-y-2">
                {selectedProject.team.map((member, index) => (
                  <li key={index} className="text-white">
                    {member.name} - {member.phone}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HackathonProjects;
