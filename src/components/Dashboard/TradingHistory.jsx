import React, { useState } from "react";

const TradingHistory = () => {
  const [searchDate, setSearchDate] = useState("");

  // Dummy trading data
  const tradingHistory = [
    { size: 0.05435, price: 56789.67, time: "10:48 AM", profit: 0.7 },
    { size: 0.05435, price: 56789.67, time: "10:48 AM", profit: -0.7 },
    { size: 0.05435, price: 56789.67, time: "10:48 AM", profit: 0.7 },
    { size: 0.05435, price: 56789.67, time: "10:48 AM", profit: -0.7 },
    { size: 0.05435, price: 56789.67, time: "10:48 AM", profit: 0.7 },
    // Add more dummy data as needed
  ];

  return (
    <div className="bg-gray-900 p-5 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-5">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition">
          Trading History
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none"
          />
          <span className="absolute right-4 top-2 text-gray-400">🔍</span>
        </div>
        <button className="bg-gray-800 text-gray-400 p-2 rounded-full hover:bg-gray-700">
          ⚙️
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="text-gray-400">
              <th className="px-4 py-2">Size (BTC)</th>
              <th className="px-4 py-2">Price (USDT)</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Profit</th>
            </tr>
          </thead>
          <tbody>
            {tradingHistory.map((trade, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="px-4 py-2 text-green-400">
                  {trade.size.toFixed(5)}
                </td>
                <td className="px-4 py-2 text-green-400">
                  ${trade.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-white">{trade.time}</td>
                <td
                  className={`px-4 py-2 font-bold ${
                    trade.profit >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {trade.profit >= 0 ? `+${trade.profit}` : `${trade.profit}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradingHistory;
