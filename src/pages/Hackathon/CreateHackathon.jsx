import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/layouts/Layout";
import { useSelector } from "react-redux";
import { fetchUsers } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
 
const HackathonForm = () => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [abstract, setAbstract] = useState("");
  const [file, setFile] = useState(null); // Updated to handle file input
  const [problemStatementNumber, setProblemStatementNumber] = useState(1);
  const [teamMembers, setTeamMembers] = useState([
    { name: "", phoneNumber: "", tzkid: "",branch:""},
    { name: "", phoneNumber: "", tzkid: "",branch:"" },
  ]);

  const addTeamMember = () => {
    if (teamMembers.length < 5) {
      setTeamMembers([...teamMembers, { name: "", phoneNumber: "", tzkid: "" ,branch:""}]);
    }
  };

  // Function to handle removing a team member (min 2)
  const removeTeamMember = (index) => {
    if (teamMembers.length > 2) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const adminToken = useSelector((state) => state.auth.jwtToken);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a file before submitting.");
      return;
    }

    try {
      // Upload file to server
      const fileData = new FormData();
      fileData.append("file", file);

      const uploadResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/uploads/upload`,
        {file},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminToken}`
          },
        }
      );

      const fileUrl =
        uploadResponse.data.webContentLink || uploadResponse.data.webViewLink;

      if (!fileUrl) {
        throw new Error("Failed to get file URL.");
      }

      // Prepare payload
      const payload = {
        projectName,
        abstract,
        file: fileUrl, // Store the uploaded file URL
        problemStatementNumber,
        teamMembers,
      };

      // Send form data
      await axios.post(
        `${import.meta.env.VITE_API_URL}/hackathon/addByAdmin/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      toast.success("Mega Expo details Submitted Successfully!");
      setProjectName("");
      setAbstract("");
      setFile(null);
      setProblemStatementNumber(1);
      setTeamMembers([
        { name: "", phoneNumber: "", tzkid: "",branch:"" },
        { name: "", phoneNumber: "", tzkid: "",branch:"" },
      ]);
    } catch (error) {
      console.error("Error submitting hackathon:", error);
      toast.error("Failed to submit Hackathon. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg w-full max-w-3xl shadow-lg border border-white border-opacity-20">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Project Expo Submission
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Project Name */}
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="w-full p-3 bg-transparent border border-white text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Abstract */}
            <textarea
              placeholder="Project Abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              required
              className="w-full p-3 bg-transparent border border-white text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            {/* File Upload */}
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="w-full p-3 bg-transparent border border-white text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Problem Statement Number */}
            <select
              value={problemStatementNumber}
              onChange={(e) => setProblemStatementNumber(Number(e.target.value))}
              className="w-full p-3 bg-transparent border border-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num} className="text-black">
                  Problem Statement {num}
                </option>
              ))}
            </select>

            {/* Dynamic Team Members */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-2">
                Team Members
              </h3>
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-wrap gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Member Name"
                    value={member.name}
                    onChange={(e) => {
                      const updatedMembers = [...teamMembers];
                      updatedMembers[index].name = e.target.value;
                      setTeamMembers(updatedMembers);
                    }}
                    required
                    className="flex-1 p-2 bg-transparent border border-white text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={member.phoneNumber}
                    onChange={(e) => {
                      const updatedMembers = [...teamMembers];
                      updatedMembers[index].phoneNumber = e.target.value;
                      setTeamMembers(updatedMembers);
                    }}
                    required
                    className="flex-1 p-2 bg-transparent border border-white text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="text"
                    placeholder="TZK ID"
                    value={member.tzkid}
                    onChange={(e) => {
                      const updatedMembers = [...teamMembers];
                      updatedMembers[index].tzkid = e.target.value;
                      setTeamMembers(updatedMembers);
                    }}
                    required
                    className="flex-1 p-2 bg-transparent border border-white text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {/* Branch Dropdown */}
                  <select
                  value={member.branch}
                  onChange={(e) => {
                    const updatedMembers = [...teamMembers];
                    updatedMembers[index].branch = e.target.value;
                    setTeamMembers(updatedMembers);
                  }}
                  required
                  className="flex-1 p-2 bg-transparent border border-white text-gray-600 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <option value="" disabled selected>
                    Select Branch
                  </option>
                  <option value="PUC">PUC</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="MME">MME</option>
                  <option value="CHEM">CHEM</option>
                  </select>

                  {teamMembers.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeTeamMember(index)}
                      className="text-red-500 hover:text-red-700 font-bold text-xl"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}

              {teamMembers.length < 5 && (
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="mt-2 bg-blue-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                  + Add Member
                </button>
              )}
            </div>    

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Submit Project
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default HackathonForm;
