import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import weblogo from "../assets/web_logo.png";

// User icon SVG (no changes here)
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-slate-400 hover:text-white transition-colors"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const Navbar = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // check local storage for user info
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);

  // Effect to handle closing the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-[#1f2229] text-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left Side*/}
        <div className="flex items-center gap-1">
          <img
            src={weblogo}
            alt="Logo Illustration"
            className="w-10 h-10 rounded-lg"
          />
          <Link
            to="/dashboard"
            className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            SubSphere
          </Link>
        </div>

        {/* Right Side*/}
        <div className="flex items-center gap-4">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-slate-300 hover:text-white transition-colors ${
                isActive ? "font-semibold text-white" : ""
              }`
            }
          >
            The Idea
          </NavLink>

          {/* Profile Icon and Dropdown */}
          <div className="relative" ref={profileRef}>
            <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <UserIcon />
            </button>

            {/* conditionally render the dropdown if it's open and user is logged in */}
            {isProfileOpen && userInfo && (
              <div className="absolute right-0 mt-2 w-64 bg-[#1e2025] border border-slate-700 rounded-lg shadow-xl z-20 animate-fade-in-down">
                <div className="p-4 border-b border-slate-700">
                  <p className="font-semibold text-white truncate">
                    {userInfo.name}
                  </p>
                  <p className="text-sm text-slate-400 truncate">
                    {userInfo.email}
                  </p>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-red-500/20 hover:text-red-400 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* If dropdown is open but user is NOT logged in, show a login prompt */}
            {isProfileOpen && !userInfo && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1e2025] border border-slate-700 rounded-lg shadow-xl z-20 p-2 animate-fade-in-down">
                <Link
                  to="/login"
                  onClick={() => setIsProfileOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded-md"
                >
                  Login / Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

//for a subtle animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes fade-in-down {
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
.animate-fade-in-down {
    animation: fade-in-down 0.2s ease-out;
}
`;
document.head.appendChild(style);

export default Navbar;
