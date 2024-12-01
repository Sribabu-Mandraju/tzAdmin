import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating API call
    setTimeout(() => {
      console.log("Email:", email);
      console.log("Password:", password);
      setIsSubmitting(false);
      // Reset the form (optional)
      setEmail("");
      setPassword("");
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Email Field */}
          <label htmlFor="email" className="text-gray-700 mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="p-3 rounded-md mb-4 bg-gray-50 border border-gray-300 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          {/* Submit Button */}
          <button
            type="submit"
            onClick={() => navigate("/dashboard")}
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
