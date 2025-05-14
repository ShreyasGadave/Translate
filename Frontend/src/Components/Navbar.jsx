import React from "react";
import LOGO from "../assets/LOGO!.svg";

const Navbar = () => {
  return (
    <nav className="bg-black opacity-90 flex justify-between items-center px-6 py-2 p-2 shadow-md">
      {/* Logo and Brand */}
      <div className="flex items-center gap-2">
        <img src={LOGO} alt="AlphaTranslate Logo" className="h-8" />
        <span className="text-lg font-medium text-gray-200">AlphaTranslate</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-md font-extralight text-gray-200">
        <li className="hover:text-blue-600 cursor-pointer">Home</li>
        <li className="hover:text-blue-600 cursor-pointer">About</li>
        <li className="hover:text-blue-600 cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
