import React, { useState, useEffect } from "react";

const TradingHistory = () => {
  const [tradingHistory, setTradingHistory] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  const fetchTrades = async () => {
    const API_KEY = "PKGTA3TFKPT9IXW6ZQSU";
    const SECRET_KEY = "frYGK6X70EnBKI7OpHg9uZMC6gfPCGubYni82E2t";

    const headers = {
      "APCA-API-KEY-ID": API_KEY,
      "APCA-API-SECRET-KEY": SECRET_KEY,
    };

    try {
      // Fetch orders from Alpaca using REST API
      const response = await fetch(
        "https://paper-api.alpaca.markets/v2/orders?status=filled",
        {
          method: "GET",
          headers: headers,
        },
      );
      const orders = await response.json();

      // Parse orders into a format suitable for displaying in the table
      const parsedOrders = orders.map((order) => {
        const isBuy = order.side === "buy";
        const profit = isBuy
          ? null // No profit calculation on buy orders
          : (order.filled_avg_price - order.limit_price) * order.qty; // Simplified P&L logic

        return {
          size: order.qty,
          price: order.filled_avg_price || order.limit_price,
          time: new Date(
            order.filled_at || order.submitted_at,
          ).toLocaleTimeString(),
          profit: isBuy ? 0 : profit, // 0 profit for buy orders, actual value for sell orders
        };
      });

      setTradingHistory(parsedOrders);
    } catch (error) {
      console.error("Error fetching trades: ", error);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, [searchDate]);

  return (
    <div className="bg-gray-900 p-5 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-5">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition">
          Trading History
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Date (YYYY-MM-DD)"
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
              <th className="px-4 py-2">P&L</th>
            </tr>
          </thead>
          <tbody>
            {tradingHistory.map((trade, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="px-4 py-2 text-green-400">
                  {Number(trade.size).toFixed(5)}
                </td>
                <td className="px-4 py-2 text-green-400">
                  ${Number(trade.price).toFixed(2)}
                </td>
                <td className="px-4 py-2 text-white">{trade.time}</td>
                <td
                  className={`px-4 py-2 font-bold ${
                    trade.profit > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {trade.profit !== null
                    ? `$${Math.abs(trade.profit).toFixed(2)}`
                    : "-"}
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
