// src/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left Section: TBOT Logo */}
          <div className="flex-shrink-0 flex items-center">
            {/* Replace the text below with your logo image or SVG */}
            <h1 className="text-3xl font-bold">TBOT</h1>
          </div>

          {/* Center Section: Navigation Buttons */}
          <div className="hidden md:flex space-x-8">
            <button className="px-4 py-2 rounded-md text-sm font-medium bg-transparent hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300">
              Home
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-medium bg-transparent hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300">
              Features
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-medium bg-transparent hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300">
              Contact
            </button>
          </div>

          {/* Right Section: User Name */}
          <div className="flex-shrink-0">
            <span className="text-lg font-medium">Anna Komodo</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu (optional) */}
      {/* Uncomment and customize if you want to add a mobile menu */}
      {/*
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button className="block px-3 py-2 rounded-md text-base font-medium bg-transparent hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300">
            Home
          </button>
          <button className="block px-3 py-2 rounded-md text-base font-medium bg-transparent hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300">
            Features
          </button>
          <button className="block px-3 py-2 rounded-md text-base font-medium bg-transparent hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300">
            Contact
          </button>
        </div>
      </div>
      */}
    </header>
  );
};

export default Header;
