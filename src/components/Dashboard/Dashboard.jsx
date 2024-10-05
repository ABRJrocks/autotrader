import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts"; // Import TradingView Lightweight Charts
import Chart from "./Chart";
import History from "./TradingHistory";
import Wallet from "./Wallet";
import LiveDeck from "./LiveDeck";
import Header from "./Header";

function Home() {
  const chartContainerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch chart data for BTC/USD using Binance API
  const fetchChartData = async () => {
    try {
      const response = await fetch(
        "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=24"
      );
      const data = await response.json();

      return data.map((d) => ({
        time: d[0] / 1000, // Convert to UNIX timestamp in seconds
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
      }));
    } catch {
      throw new Error("Failed to fetch chart data.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await fetchChartData();
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
      <Header />
      <div className="p-4 md:p-8">
        {/* Live Chart Section */}
        <div className="bg-blue-900 p-4 md:p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Live Chart</h2>
          <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <Chart />
            <History />
          </div>
        </div>

        {/* Wallet Section */}
        <div className="bg-blue-900 p-4 md:p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Wallet</h2>
          <Wallet />
        </div>

        {/* Live Deck Section */}
        <div className="bg-blue-900 p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Live Deck</h2>
          <div className="overflow-x-auto p-4 md:p-6">
            <LiveDeck />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
