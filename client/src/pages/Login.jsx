import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import weblogo from "../assets/web_logo.png";
import axios from "axios";

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-slate-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);
const PasswordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-slate-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // this runs when the component first loads to check the user's login status.
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    //very imp!
    e.preventDefault();
    setError("");

    const url = isLoginView
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    try {
      const { data } = await axios.post(url, formData);
      // store the token and navigate to the dashboard
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          credential: credentialResponse.credential,
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Google Sign-In failed.");
    }
  };

  return (
    <div className="bg-[#080a11] font-sans text-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src={weblogo}
            alt="Logo Illustration"
            className="mx-auto w-20 h-20 rounded-lg"
          />
          <h1 className="text-4xl font-bold mb-2">
            {isLoginView ? "Welcome Back!" : "Create Account"}
          </h1>
          <p className="text-slate-400">
            {isLoginView
              ? "Please enter your details to sign in."
              : "Sign up to manage your subscriptions."}
          </p>
        </div>

        <div className="bg-[#1e2025] p-8 rounded-lg shadow-2xl">
          {error && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-md mb-4 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {!isLoginView && (
              <div className="mb-4">
                <label
                  className="block text-slate-300 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder=""
                  onChange={handleInputChange}
                  required
                  className="bg-slate-700 border border-slate-600 rounded-md w-full py-3 px-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div className="mb-4">
              <label
                className="block text-slate-300 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EmailIcon />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={handleInputChange}
                  required
                  className="bg-slate-700 border border-slate-600 rounded-md w-full py-3 pl-10 pr-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-slate-300 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PasswordIcon />
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="***********"
                  onChange={handleInputChange}
                  required
                  className="bg-slate-700 border border-slate-600 rounded-md w-full py-3 pl-10 pr-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isLoginView ? "Sign In" : "Create Account"}
              </button>
            </div>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-slate-600"></div>
            <span className="flex-shrink mx-4 text-slate-400">OR</span>
            <div className="flex-grow border-t border-slate-600"></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setError("Google Sign-In failed. Please try again.");
              }}
              theme="filled_black"
              text={isLoginView ? "signin_with" : "signup_with"}
              shape="rectangular"
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-slate-400">
            {isLoginView
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setError("");
              }}
              className="font-semibold text-blue-500 hover:text-blue-400 ml-2"
            >
              {isLoginView ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
