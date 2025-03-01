import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/user-signup";
      const response = await axios.post(
        url,
        { name, email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form className="w-full max-w-md bg-white shadow-md rounded-sm p-6">
        <h1 className="text-xl font-semibold text-center mb-4">Signup</h1>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full px-4 py-2.5 border rounded-sm border-gray-300 leading-7 mb-3"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2.5 border rounded-sm border-gray-300 leading-7 mb-3"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2.5 border rounded-sm border-gray-300 leading-7 mb-3"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-sm hover:bg-blue-600 transition duration-200"
        >
          Signup
        </button>

        <div className="flex items-center text-sm text-gray-600 mt-3">
          <input type="checkbox" className="mr-2" />I hereby follow all the
          privacy and policies.
        </div>

        <p className="text-sm text-gray-600 text-center mt-3">
          Already signed up?{" "}
          <NavLink to="/login" className="text-blue-500 underline">
            Login now
          </NavLink>
        </p>
      </form>
    </div>
  );
}
