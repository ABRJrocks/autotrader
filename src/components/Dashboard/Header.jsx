import React, { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Define notification types and their corresponding styles
const notificationTypes = {
  purchase: { color: "bg-green-100", textColor: "text-green-700" },
  sale: { color: "bg-red-100", textColor: "text-red-700" },
  deposit: { color: "bg-blue-100", textColor: "text-blue-700" },
};

const Header = () => {
  const [notifications, setNotifications] = useState([
    { message: "Transaction #1: $500 BTC purchase", type: "purchase" },
    { message: "Transaction #2: $300 ETH sale", type: "sale" },
    { message: "Transaction #3: $200 LTC deposit", type: "deposit" },
  ]);

  const clearNotifications = () => setNotifications([]);

  const dismissNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section: TBOT Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-3xl font-bold">TBot</h1>
          </div>

          {/* Center Section: Navigation Buttons */}
          <div className="hidden md:flex space-x-8">
            <button
              className="px-4 py-2 rounded-md text-sm font-medium bg-transparent hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
              onClick={() => navigate("/home")}
            >
              Dashboard
            </button>
            <button
              className="px-4 py-2 rounded-md text-sm font-medium bg-transparent hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
              onClick={() => navigate("/settings")}
            >
              Settings
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-medium bg-transparent hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300">
              My Exchange
            </button>
          </div>

          {/* Right Section: User Name and Notifications */}
          <div className="flex flex-row items-center justify-center ">
            {/* User Name */}
            <span className="text-md font-medium mr-2">Assia Karroub</span>
            {/* Bell Icon with Notifications */}
            <Popover className="relative">
              <PopoverButton className="text-md mt-2 focus:outline-none hover:text-gray-300 transition duration-200">
                <FiBell />
              </PopoverButton>

              <PopoverPanel className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 ring-1 ring-black ring-opacity-5 transition transform scale-95 origin-top-right hover:scale-100">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-2">
                    Notifications
                  </h3>
                  {notifications.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {notifications.map((notification, index) => (
                        <li
                          key={index}
                          className={`flex items-center justify-between text-sm ${notificationTypes[notification.type].color} ${notificationTypes[notification.type].textColor} p-3 rounded-lg transition duration-200 hover:bg-opacity-50`}
                        >
                          {notification.message}
                          <button
                            onClick={() => dismissNotification(index)}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No new notifications
                    </p>
                  )}
                  <button
                    onClick={clearNotifications}
                    className="mt-4 w-full px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none transition duration-200"
                  >
                    Clear All
                  </button>
                </div>
              </PopoverPanel>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
