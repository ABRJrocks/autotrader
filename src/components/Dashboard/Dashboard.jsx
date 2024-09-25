// src/Home.js
import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts"; // Import TradingView Lightweight Charts
import Chart from "./Chart";
import History from "./TradingHistory";

function Home() {
  const chartContainerRef = useRef();
  const [tradingHistory, setTradingHistory] = useState([]);
  const [liveDeck, setLiveDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch chart data for BTC/USD using Binance API (Free and Open Source)
  const fetchChartData = async () => {
    try {
      const response = await fetch(
        "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=24",
      );
      const data = await response.json();

      const processedData = data.map((d) => ({
        time: d[0] / 1000, // Convert to UNIX timestamp in seconds
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
      }));

      return processedData;
    } catch (err) {
      throw new Error("Failed to fetch chart data.");
    }
  };

  // Fetch trading history (top gainers and losers) using CoinCap API
  const fetchTradingHistory = async () => {
    try {
      const response = await fetch(
        "https://api.coincap.io/v2/assets?limit=10&sort=changePercent24Hr",
      );
      const data = await response.json();

      if (data.data) {
        // Sort to get top gainers and losers
        const sortedData = data.data.sort(
          (a, b) => b.changePercent24Hr - a.changePercent24Hr,
        );
        const topGainers = sortedData.slice(0, 5);
        const topLosers = sortedData.slice(-5);
        setTradingHistory([...topGainers, ...topLosers]);
      } else {
        throw new Error("No trading history data available.");
      }
    } catch (err) {
      throw new Error("Failed to fetch trading history.");
    }
  };

  // Fetch live deck data using CoinCap API
  const fetchLiveDeck = async () => {
    try {
      const response = await fetch(
        "https://api.coincap.io/v2/assets?limit=10&sort=marketCap",
      );
      const data = await response.json();

      if (data.data) {
        setLiveDeck(data.data);
      } else {
        throw new Error("No live deck data available.");
      }
    } catch (err) {
      throw new Error("Failed to fetch live deck data.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await fetchChartData();
        await Promise.all([fetchTradingHistory(), fetchLiveDeck()]);

        // Initialize the chart only if the ref is available
        if (chartContainerRef.current) {
          const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 300,
            layout: {
              backgroundColor: "#1e293b",
              textColor: "#ffffff",
            },
            grid: {
              vertLines: { color: "#334155" },
              horzLines: { color: "#334155" },
            },
            priceScale: { borderColor: "#334155" },
            timeScale: {
              borderColor: "#334155",
              timeVisible: true,
              secondsVisible: false,
            },
          });

          const candlestickSeries = chart.addCandlestickSeries({
            upColor: "#4ade80",
            downColor: "#f87171",
            borderDownColor: "#f87171",
            borderUpColor: "#4ade80",
            wickDownColor: "#f87171",
            wickUpColor: "#4ade80",
          });

          candlestickSeries.setData(chartData);

          const handleResize = () => {
            if (chartContainerRef.current) {
              chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
              });
            }
          };

          window.addEventListener("resize", handleResize);

          return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
          };
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-blue-800 shadow-lg">
        <div className="text-2xl font-bold">TBot</div>
        <nav className="space-x-6">
          <a href="#" className="hover:text-blue-400">
            Dashboard
          </a>
          <a href="#" className="hover:text-blue-400">
            Settings
          </a>
          <a href="#" className="hover:text-blue-400">
            My Exchange
          </a>
        </nav>
        <div>
          <button className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600">
            Assia Karkoubi
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        {/* AI Strategy Section */}
        <div className="bg-blue-900 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">AI Strategy</h2>
          <div className="flex flex-col lg:flex-row justify-between">
            {/* Chart */}
            {<Chart />}
            {/* Trading History Panel */}
            {<History />}
          </div>
        </div>

        {/* Live Deck Section */}
        <div className="bg-blue-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Live Deck</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead>
                <tr className="text-left bg-blue-800">
                  <th className="p-2">#</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Symbol</th>
                  <th className="p-2">Price (USD)</th>
                  <th className="p-2">24h Change</th>
                  <th className="p-2">Market Cap</th>
                  <th className="p-2">Volume</th>
                </tr>
              </thead>
              <tbody>
                {liveDeck.map((coin, index) => (
                  <tr
                    key={coin.id}
                    className={index % 2 === 0 ? "bg-blue-800" : "bg-blue-700"}
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2 flex items-center space-x-2">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-5 h-5"
                      />
                      <span>{coin.name}</span>
                    </td>
                    <td className="p-2 uppercase">{coin.symbol}</td>
                    <td className="p-2">
                      $
                      {parseFloat(coin.priceUsd).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td
                      className={
                        parseFloat(coin.changePercent24Hr) >= 0
                          ? "p-2 text-green-500"
                          : "p-2 text-red-500"
                      }
                    >
                      {parseFloat(coin.changePercent24Hr).toFixed(2)}%
                    </td>
                    <td className="p-2">
                      ${parseFloat(coin.marketCapUsd).toLocaleString()}
                    </td>
                    <td className="p-2">
                      ${parseFloat(coin.volumeUsd24Hr).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
