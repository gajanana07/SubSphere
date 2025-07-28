import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import img from "./assets/lin_img.jpeg";
import sign from "./assets/name.png";

const Layout = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#080a11]">
      <Navbar />

      <main className="relative flex-grow text-white">
        {/* Background Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

        {/* Page Content */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

const AboutPage = () => (
  <div className="text-white flex flex-col items-center justify-center flex-grow p-4 md:p-8 text-center">
    <div className=" bg-neutral-950/80 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] rounded-2xl shadow-lg max-w-4xl w-full">
      <h1 className="text-4xl font-bold mb-6 mt-7 ">Behind SubSphere</h1>

      <img
        src={img}
        alt="Profile of the creator"
        className="w-40 h-40 rounded-full object-cover mb-6 border-4 border-gray-600 shadow-lg mx-auto"
      />

      <div className="max-w-2xl flex flex-col gap-4 text-gray-300 mx-auto">
        <p>
          The concept of SubSphere came about through my personal financial
          despair. I was losing my subscriptions left and right—a streaming
          service for one thing, a software license elsewhere. It was a
          confusing mess. I would easily forget which services I had even
          subscribed to until I saw an unexpected charge from one of my youtube
          memberships on my bank statement.
        </p>
        <p>
          The greatest difficulty was forgetting reminders. Without a single
          location to view future payments, I was constantly caught off guard,
          and it became tough to budget. I realized I needed an easy,
          centralized solution to view everything at once and receive timely
          reminders before a bill is due. That personal pain was the direct
          inspiration for creating SubSphere: an easy, clean way to regain
          control over repeating bills.
        </p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* --- Protected Routes --- */}
        {/* All routes nested inside this element will be protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
