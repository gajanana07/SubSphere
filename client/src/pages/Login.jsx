import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import weblogo from "../assets/web_logo.png";
import axios from "axios";

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

const EyeIcon = () => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    class="bi bi-eye"
  >
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
  </svg>
);

const EyeCross = () => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    class="bi bi-eye-slash"
  >
    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
  </svg>
);

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
  const [showPassword, setShowPassword] = useState(false);

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

  const handleChange = () => {
    setShowPassword((item) => !item);
  }; //for eye button

  const handleSubmit = async (e) => {
    //very imp!
    e.preventDefault();
    setError("");

    const url = isLoginView
      ? `${import.meta.env.VITE_API_URL}/api/auth/login`
      : `${import.meta.env.VITE_API_URL}/api/auth/register`;

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
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
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
    <div
      className="bg-[#080a11] bg-[radial-gradient(#222222_1px,#080a11_1px)] 
  bg-[size:20px_20px] font-sans text-white min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="">
            <img
              src={weblogo}
              alt="Logo Illustration"
              className="mx-auto w-20 h-20 rounded-lg"
            />
          </Link>
          <h1 className="text-4xl font-bold mb-2">
            {isLoginView ? "Hey, Welcome Back!" : "Create Account"}
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
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon />
                  </div>

                  <input
                    name="name"
                    type="text"
                    placeholder=""
                    onChange={handleInputChange}
                    required
                    className="bg-slate-700 border border-slate-600 rounded-md w-full py-3 pl-10 pr-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                  placeholder=""
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
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  onChange={handleInputChange}
                  required
                  className="bg-slate-700 border border-slate-600 rounded-md w-full py-3 pl-10 pr-4 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-3 inset-x-82 right-0 pl-3 flex items-center ">
                  <button
                    type="button"
                    onClick={handleChange}
                    className="cursor-pointer"
                  >
                    {showPassword ? <EyeCross /> : <EyeIcon />}
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {isLoginView ? "Log In" : "Create Account"}
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
              className="font-semibold text-blue-500 hover:text-blue-400 ml-2 cursor-pointer"
            >
              {isLoginView ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
