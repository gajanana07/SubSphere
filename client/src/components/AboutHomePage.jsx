import React from "react";
import img from "../assets/lin_img.jpeg";
import NavbarHome from "./NavbarHome";
import Footer from "./Footer";

const AboutHomePage = () => {
  return (
    <>
      <NavbarHome />
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
              subscribed to until I saw an unexpected charge from one of my
              youtube memberships on my bank statement.
            </p>
            <p>
              The greatest difficulty was forgetting reminders. Without a single
              location to view future payments, I was constantly caught off
              guard, and it became tough to budget. I realized I needed an easy,
              centralized solution to view everything at once and receive timely
              reminders before a bill is due. That personal pain was the direct
              inspiration for creating SubSphere: an easy, clean way to regain
              control over repeating bills.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutHomePage;
