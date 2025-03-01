import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/user-login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("Backend URL:", import.meta.env.VITE_APP_BACKEND_URL);

      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem("token", response.data.token);

        setEmail("");
        setPassword("");

        navigate("/folder-list");
      } else {
        toast.error("Invalid login credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-sm shadow-md border border-gray-200 -mt-[60px]"
      >
        <h1 className="text-xl font-semibold text-center mb-4">Log In</h1>

        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2.5 border rounded-sm border-gray-300 leading-7"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2.5 border rounded-sm border-gray-300 leading-7"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-sm transition duration-200"
        >
          Login
        </button>

        <div className="mt-3 flex items-center text-sm">
          <input type="checkbox" className="mr-2" />
          <p className="text-gray-600">
            I hereby follow all the privacy policies.
          </p>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          New to our website?{" "}
          <NavLink to="/signup" className="text-blue-500 underline">
            Signup now
          </NavLink>
        </p>
      </form>
    </div>
  );
}
