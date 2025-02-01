import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthenticated, setJwtToken, setRole } from "../store/slices/AuthSlice";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/login`,
        {
          username: username,
          password: password,
        }
      );
      setIsSubmitting(false);
      const { token } = response.data;
      dispatch(setJwtToken(token));
      dispatch(setAuthenticated(true));
      dispatch(setRole(response.data.user.role));
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
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-[95%] max-w-md bg-gray-800 p-6 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Username Field */}
          <label htmlFor="username" className="mb-2 font-medium">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="p-3 rounded-md mb-4 bg-gray-700 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Password Field */}
          <label htmlFor="password" className="mb-2 font-medium">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="p-3 rounded-md mb-6 bg-gray-700 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Error Message */}
          {error && <div className="text-red-400 mb-4">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-bold text-white ${
              isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
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
