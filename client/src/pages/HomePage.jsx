import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/heroImage.png";

const HomePage = () => {
  // for hiding scrollbar
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="bg-[#080a11] font-sans text-white min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto">
          {/* Left Column*/}
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 uppercase tracking-wider leading-tight mb-5">
              Manage Your Subscriptions Easily with Subsphere
            </h1>
            <p className="text-lg text-slate-400 max-w-md mx-auto md:mx-0 mb-8">
              Keep track of your recurring payments and never miss a bill again!
            </p>
            <Link
              to="/login"
              className="bg-gradient-to-r from-indigo-200 to-blue-500 text-white font-semibold py-3 px-8 rounded-md shadow-md
             transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-blue-500 hover:to-indigo-200 hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>

          {/* Right Column*/}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src={heroImage}
              alt="Subscription Manager Illustration"
              className="w-full max-w-lg rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
