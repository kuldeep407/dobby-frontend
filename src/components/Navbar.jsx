import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    toast.success("Logged out!");
  };

  return (
    <nav className="w-full bg-white shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <NavLink to="/">
          <img src="/vite.svg" alt="Logo" className="w-12 h-12" />
        </NavLink>

        <ul className="hidden md:flex space-x-8 text-lg">
          <li>
            <NavLink to="/folder-list">Folder List</NavLink>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>

        <div className="md:hidden">
          {menuOpen ? (
            <FiX
              className="text-2xl cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <FiMenu
              className="text-2xl cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 py-4 bg-white">
          <li>
            <NavLink to="/folder-list" onClick={() => setMenuOpen(false)}>
              Folder List
            </NavLink>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" onClick={() => setMenuOpen(false)}>
                  Signup
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
