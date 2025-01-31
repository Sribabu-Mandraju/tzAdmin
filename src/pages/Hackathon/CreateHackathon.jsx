import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/layouts/Layout";

const HackathonForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    abstract: "",
    file: null,
    problemStatementNumber: "",
    teamMembers: [{ tzkid: "", name: "", phoneNumber: "", branch: "" }],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const adminToken = localStorage.getItem("adminToken");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTeamMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index][name] = value;
    setFormData((prev) => ({ ...prev, teamMembers: updatedMembers }));
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < 5) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { tzkid: "", name: "", phoneNumber: "", branch: "" }],
      }));
    } else {
      setError("Maximum 5 team members allowed.");
    }
  };

  const removeTeamMember = (index) => {
    if (formData.teamMembers.length > 2) {
      const updatedMembers = formData.teamMembers.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, teamMembers: updatedMembers }));
    } else {
      setError("Minimum 2 team members required.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.teamMembers.length < 2 || formData.teamMembers.length > 5) {
      setError("Team must have between 2 and 5 members.");
      return;
    }

    const payload = {
        projectName: formData.projectName,
        abstract: formData.abstract,
        file: formData.file.name, // Assuming this is a file URL or a string path
        problemStatementNumber: Number(formData.problemStatementNumber) || 0,
        teamMembers: formData.teamMembers.map((member) => ({
          tzkid: member.tzkid,
          name: member.name,
          phoneNumber: member.phoneNumber,
          branch: member.branch,
        })),
      };
      

    try {
        console.log(payload)
      const response = await axios.post("https://tzbackendnewversion.onrender.com/hackathon/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setSuccess("Hackathon entry created successfully!");
      setFormData({
        projectName: "",
        abstract: "",
        file: null,
        problemStatementNumber: "",
        teamMembers: [{ tzkid: "", name: "", phoneNumber: "", branch: "" }],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Layout>
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full max-w-lg text-white">
        <h2 className="text-2xl font-semibold text-center mb-4">Create Hackathon Entry</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="projectName" value={formData.projectName} onChange={handleChange}
            placeholder="Project Name" className="w-full p-2 bg-white/20 border-none rounded-md text-white placeholder-gray-300 focus:ring focus:ring-blue-400"
          />

          <textarea name="abstract" value={formData.abstract} onChange={handleChange}
            placeholder="Abstract" className="w-full p-2 bg-white/20 border-none rounded-md text-white placeholder-gray-300 focus:ring focus:ring-blue-400"
          />

          <input type="file" name="file" onChange={handleChange}
            className="w-full p-2 bg-white/20 border-none rounded-md text-white placeholder-gray-300 focus:ring focus:ring-blue-400"
          />

          <input type="number" name="problemStatementNumber" value={formData.problemStatementNumber} onChange={handleChange}
            placeholder="Problem Statement Number" className="w-full p-2 bg-white/20 border-none rounded-md text-white placeholder-gray-300 focus:ring focus:ring-blue-400"
          />

          <h3 className="text-lg font-medium">Team Members</h3>
          {formData.teamMembers.map((member, index) => (
            <div key={index} className="bg-white/10 p-3 rounded-md space-y-2">
              <input type="text" name="tzkid" value={member.tzkid} onChange={(e) => handleTeamMemberChange(index, e)}
                placeholder="Team Member ID (tzkid)" className="w-full p-2 bg-white/20 border-none rounded-md text-white placeholder-gray-300"
              />
              <input type="text" name="name" value={member.name} onChange={(e) => handleTeamMemberChange(index, e)}
                placeholder="Name" className="w-full p-2 bg-white/20 border-none rounded-md text-white placeholder-gray-300"
              />
              <input type="text" name="phoneNumber" value={member.phoneNumber} onChange={(e) => handleTeamMemberChange(index, e)}
                placeholder="Phone Number" className="w-full p-2 bg-white/20 border-none rounded-md text-white placeholder-gray-300"
              />
              <input type="text" name="branch" value={member.branch} onChange={(e) => handleTeamMemberChange(index, e)}
                placeholder="Branch" className="w-full p-2 bg-white/20 border-none rounded-md text-white placeholder-gray-300"
              />
              {formData.teamMembers.length > 2 && (
                <button type="button" onClick={() => removeTeamMember(index)}
                  className="text-sm text-red-400 hover:text-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {formData.teamMembers.length < 5 && (
            <button type="button" onClick={addTeamMember}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
            >
              Add Team Member
            </button>
          )}

          <button type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default HackathonForm;
