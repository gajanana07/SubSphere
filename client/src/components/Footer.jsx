import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1f2229] text-slate-400">
      <div className="container mx-auto px-6 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} SubSphere. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
