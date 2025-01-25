import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4002/admin/login",
        {
          username: username, // Sending the username for login
          password: password,
        }
      );
      setIsSubmitting(false);
      const { token } = response.data;
      localStorage.setItem("adminToken", token); // Store token in local storage

      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      setIsSubmitting(false);
      setError(error.response ? error.response.data.message : "Login failed");
    }

    // Reset the form
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[95%] max-w-md bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Username Field */}
          <label htmlFor="username" className="text-gray-700 mb-2 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="p-3 rounded-md mb-4 bg-gray-50 border border-gray-300 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Password Field */}
          <label htmlFor="password" className="text-gray-700 mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="p-3 rounded-md mb-6 bg-gray-50 border border-gray-300 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Error Message */}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-bold text-white ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-zinc-700"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
