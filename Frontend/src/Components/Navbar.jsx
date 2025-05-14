import React from "react";
import LOGO from "../assets/LOGO!.svg";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-2 shadow-md">
      {/* Logo and Brand */}
      <div className="flex items-center gap-1">
        <img src={LOGO} alt="GlobaText Logo" className="h-10" />
        <span className="text-xl font-bold">GlobaText</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-md font-normal">
        <li className="hover:text-blue-600 cursor-pointer">Home</li>
        <li className="hover:text-blue-600 cursor-pointer">About</li>
        <li className="hover:text-blue-600 cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
