import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layouts/Layout";
import { X, Eye, Edit ,Trash} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const MegaProjectExpo = () => {
const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const hackathons = useSelector((state) => state.hackathons)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedProject, setEditedProject] = useState({
    projectName: "",
    abstract: "",
    teamMembers: [
      { name: "", phoneNumber: "" },
      { name: "", phoneNumber: "" },
      { name: "", phoneNumber: "" },
      { name: "", phoneNumber: "" },
      { name: "", phoneNumber: "" },
    ],
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
          "https://tzbackendnewversion.onrender.com/projectExpo/",
          {
            headers: { Authorization: `Bearer ${adminToken}` },
          }
        );
        setProjects(response.data);
        console.log(response.data)
      } catch (err) {
        setError("Failed to fetch project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const closeModal = () => {
    setSelectedTeam(null);
    setSelectedProject(null);
  };

  const handleDeleteTeam = async () => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      setError("Admin token not found. Please log in.");
      return;
    }
  
    try {
      await axios.delete(
        `https://tzbackendnewversion.onrender.com/projectExpo/${selectedProject._id}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
  
      // ✅ Update state and show success toast
      setProjects((prev) =>
        prev.filter((project) => project._id !== selectedProject._id)
      );
      toast.success("Project deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      closeModal();
    } catch (err) {
      setError("Failed to delete the team.");
      toast.error("Failed to delete the project. Try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  

  // Filter projects based on search query
  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = async () => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      setError("Admin token not found. Please log in.");
      toast.error("Admin token not found. Please log in.");
      return;
    }
  
    try {
      await axios.put(
        `https://tzbackendnewversion.onrender.com/projectExpo/${selectedProject._id}`,
        {
          ...editedProject,
        },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      setProjects(
        projects.map((project) =>
          project._id === selectedProject._id ? { ...project, ...editedProject } : project
        )
      );
      setEditModalOpen(false);
      closeModal();
      toast.success("Project updated successfully!");
    } catch (err) {
      setError("Failed to update the project.");
      toast.error("Failed to update the project.");
    }
  };  

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-4xl font-bold text-center text-gray-100 mb-6">
          Mega Project Expo
        </h2>

        {/* Search Bar */}
        <div className="mb-4 flex justify-between items-center">
        {/* Search Input */}
        <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/3 sm:w-1/2 p-1.5 border rounded-md focus:outline-none focus:ring-2 text-gray-700 focus:ring-blue-300 max-w-[250px]"
        />
        
        {/* Add Button */}
        <button
            className="bg-black text-white px-3 py-2 rounded-md font-semibold hover:bg-gray-800 transition"
            onClick={() => navigate("/mega-project-expo/create")}
        >
            Add +
        </button>
      </div>


        {/* Scrollable Table without Visible Scroll Bar */}
        <div className="overflow-x-auto w-full no-scrollbar">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 border text-center">Project Name</th>
                <th className="p-3 border text-center">Abstract</th>
                <th className="p-3 border text-center">Team Size</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr
                  key={project._id}
                  className="bg-white bg-opacity-30 backdrop-blur-lg border border-gray-300 
                  transition duration-300 hover:bg-[#0a69a5] hover:text-white"
                >
                 <td className="px-2 border truncate" style={{ maxWidth: '200px' }}>
                 {project.projectName}
                 </td>
                 <td className="px-2 border truncate" style={{ maxWidth: '200px' }}>
                 {project.abstract}
                 </td>
                  <td className="px-2 border text-center">{project.teamMembers.length}</td>
                  <td className="px-2 border text-center">
                    <div className="flex justify-center gap-x-2">
                      <button
                        onClick={() => {
                          setSelectedTeam(project.teamMembers);
                          setSelectedProject(project);
                        }}
                        className="text-white px-3 py-2 rounded-lg flex items-center gap-1
                        transition hover:bg-[#004c75] hover:scale-105 duration-200"
                      >
                        <Eye size={18} /> View
                      </button>

                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setEditModalOpen(true);
                          setEditedProject({
                            projectName: project.projectName,
                            abstract: project.abstract,
                            teamMembers: project.teamMembers.map((member) => ({
                              name: member.name,
                              phoneNumber: member.phoneNumber,
                            })),
                          });
                        }}
                        className="text-white px-3 py-2 rounded-lg flex items-center gap-1
                        transition hover:bg-[#1e7d34] hover:scale-105 duration-200"
                      >
                        <Edit size={18} /> Edit
                      </button>
                      <button
                            onClick={() => {
                                setSelectedProject(project);
                                handleDeleteTeam()
                              }}
                            // Replace with your delete function
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

        {/* Glassmorphic Modal for Team Members */}
        {selectedTeam && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="bg-white mt-20 bg-opacity-30 border border-white/20 p-6 rounded-lg shadow-lg w-full sm:w-96 max-w-lg max-h-[80vh] overflow-y-auto
              backdrop-blur-lg transition duration-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white hover:text-gray-300"
              onClick={closeModal}
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-white mb-4">Team Details</h3>

            {/* Team Name */}
            <p className="text-white text-lg font-semibold mb-2 break-words overflow-x-hidden">
              <span className="text-blue-300">Team Name:</span> {selectedProject.projectName}
            </p>

            {/* Abstract */}
            <p className="text-white text-sm mb-4">
              <span className="text-blue-300">Abstract:</span> {selectedProject.abstract}
            </p>

            {/* Team Size */}
            <p className="text-white text-sm mb-4">
              <span className="text-blue-300">Team Size:</span> {selectedProject.teamMembers.length}
            </p>

            {/* Team Members List */}
            <ul className="space-y-2 ">
              {selectedTeam.map((member) => (
                <li
                  key={member._id}
                  className="border p-3 rounded-lg shadow-sm bg-white bg-opacity-20 
                  text-white border-white/30 backdrop-blur-lg"
                >
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm">Phone: {member.phoneNumber}</p>
                </li>
              ))}
            </ul>

            {/* Delete Team Button */}
            <button
              onClick={handleDeleteTeam}
              className="mt-4 w-full bg-[#cb2424df] text-white px-4 py-2 rounded-lg 
              transition hover:bg-red-800 duration-200"
            >
              Delete Team
            </button>
          </div>
        </div>
        )}  



        {/* Edit Modal */}
        {editModalOpen && selectedProject && (
          <div
          className="fixed mt-8 inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
          onClick={() => setEditModalOpen(false)}
        >
          <div
            className="bg-white bg-opacity-30 border border-white/20 p-4 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto backdrop-blur-lg transition duration-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white hover:text-gray-300"
              onClick={() => setEditModalOpen(false)}
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-white mb-4">Edit Project</h3>
        
            {/* Project Name */}
            <input
              type="text"
              value={editedProject.projectName}
              onChange={(e) =>
                setEditedProject({ ...editedProject, projectName: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded-md bg-white text-black"
              placeholder="Project Name"
            />
        
            {/* Abstract */}
            <textarea
              value={editedProject.abstract}
              onChange={(e) =>
                setEditedProject({ ...editedProject, abstract: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded-md bg-white text-black"
              placeholder="Abstract"
            />
        
            {/* Team Members */}
            <h4 className="text-lg font-bold text-white mb-2">Team Members</h4>
            {editedProject.teamMembers.map((member, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => {
                    const updatedTeamMembers = [...editedProject.teamMembers];
                    updatedTeamMembers[index].name = e.target.value;
                    setEditedProject({ ...editedProject, teamMembers: updatedTeamMembers });
                  }}
                  className="w-full p-2 mb-2 border rounded-md bg-white text-black"
                  placeholder={`Member ${index + 1} Name`}
                />
                <input
                  type="text"
                  value={member.phoneNumber}
                  onChange={(e) => {
                    const updatedTeamMembers = [...editedProject.teamMembers];
                    updatedTeamMembers[index].phoneNumber = e.target.value;
                    setEditedProject({ ...editedProject, teamMembers: updatedTeamMembers });
                  }}
                  className="w-full p-2 mb-2 border rounded-md bg-white text-black"
                  placeholder={`Member ${index + 1} Phone Number`}
                />
              </div>
            ))}
        
            {/* Save Changes Button */}
            <button
              onClick={handleEdit}
              className="mt-4 w-full bg-[#2894cf] text-white px-4 py-2 rounded-lg 
              transition hover:bg-[#004c75] duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>        
        )}

      </div>
    </Layout>
  );
};

export default MegaProjectExpo;
