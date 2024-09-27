import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion"; // Import Framer Motion
import Header from "./Header";
import ConfirmationModal from "./ConfirmationModal"; // Import the modal component

const Toggle = ({ label, onToggle, enabled }) => {
  const toggleSwitch = () => {
    onToggle(label, !enabled);
  };

  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-300">{label}</span>
      <Switch
        checked={enabled}
        onChange={toggleSwitch}
        className={`${
          enabled ? "bg-blue-500" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
      >
        <motion.span
          initial={{ x: 0 }}
          animate={{ x: enabled ? "1.5rem" : 0 }} // Animate the toggle position
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-block h-4 w-4 transform rounded-full bg-white"
        />
      </Switch>
    </div>
  );
};

const Settings = () => {
  const [indicators, setIndicators] = useState({
    "EMA 5": true,
    "EMA 15": true,
    "EMA 200": true,
    ZLSMA: false,
    RSI: true,
    "Fibonacci Retracements": false,
  });
  const [riskPercentage, setRiskPercentage] = useState(1);
  const [profitPercentage, setProfitPercentage] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentToggle, setCurrentToggle] = useState("");
  const [isBotEnabled, setIsBotEnabled] = useState(false); // State for Trading Bot toggle

  const handleToggle = (setting, isEnabled) => {
    if (setting === "Turn Bot On/Off") {
      if (!isEnabled) {
        // If the user wants to turn off the Trading Bot, show the modal
        setCurrentToggle(setting);
        setIsModalOpen(true);
      } else {
        // Enable the bot directly
        setIsBotEnabled(true);
      }
    } else {
      setIndicators((prevIndicators) => ({
        ...prevIndicators,
        [setting]: isEnabled,
      }));
      console.log(`${setting} is now ${isEnabled ? "enabled" : "disabled"}`);
    }
  };

  const handleConfirmStopBot = () => {
    setIsBotEnabled(false); // Update the bot state
    setIsModalOpen(false); // Close the modal
    console.log("Trading Bot is now disabled");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white">
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Indicators Section */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Indicators</h3>
          {Object.keys(indicators).map((setting, index) => (
            <Toggle
              key={index}
              label={setting}
              onToggle={handleToggle}
              enabled={indicators[setting]}
            />
          ))}
          {/* Trading Bot Toggle Integrated Here */}
          <div className="flex items-center justify-between py-3 border-t border-gray-600 mt-4 pt-4">
            <span className="text-red-500 font-semibold">Turn Bot On/Off</span>
            <Switch
              checked={isBotEnabled}
              onChange={(isEnabled) =>
                handleToggle("Turn Bot On/Off", isEnabled)
              }
              className={`${
                isBotEnabled ? "bg-blue-500" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
            >
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: isBotEnabled ? "1.5rem" : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block h-4 w-4 transform rounded-full bg-white"
              />
            </Switch>
          </div>
        </div>

        {/* Risk & Profit Settings */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Risk & Profit Settings</h3>
          <div className="flex flex-col mb-4">
            <label className="text-gray-300 mb-1" htmlFor="riskPercentage">
              Risk Percentage (%)
            </label>
            <input
              type="number"
              id="riskPercentage"
              value={riskPercentage}
              onChange={(e) => setRiskPercentage(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1" htmlFor="profitPercentage">
              Profit Percentage (%)
            </label>
            <input
              type="number"
              id="profitPercentage"
              value={profitPercentage}
              onChange={(e) => setProfitPercentage(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* Save Settings Button */}
        <div className="col-span-full flex justify-center mt-4">
          <button
            onClick={() => console.log("Settings Saved")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save Settings
          </button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmStopBot}
      />
    </div>
  );
};

export default Settings;
