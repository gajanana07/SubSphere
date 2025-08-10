import { Link, NavLink, useNavigate } from "react-router-dom";
import weblogo from "../assets/web_logo.png";

const NavbarHome = () => {
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
            to="/"
            className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            SubSphere
          </Link>
        </div>

        {/* Right Side*/}
        <div className="flex items-center gap-4">
          <Link to="/homeabout" className="font-semibold text-white">
            The Idea
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
