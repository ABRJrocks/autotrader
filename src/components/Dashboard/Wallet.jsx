import React from "react";
import { FaWallet, FaBitcoin } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion"; // Import framer-motion for animations

const data = [
  { name: "Stock", value: 75, color: "#FFA500" },
  { name: "Spend", value: 15, color: "#FF4500" },
  { name: "Gain", value: 10, color: "#FF6347" },
];

const COLORS = ["#FFA500", "#FF4500", "#FF6347"];

const SpendingBalanceDashboard = () => {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900 to-blue-600 text-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }} // Add smooth transition on component load
    >
      {/* Spendings Section */}
      <motion.div
        className="bg-blue-800 p-6 rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
        whileHover={{ scale: 1.1 }} // Add hover animation
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h2 className="text-3xl font-bold mb-4">Spendings</h2>
        {/* Wallet Icon */}
        <motion.div
          className="bg-red-500 p-6 rounded-full shadow-md transform rotate-45"
          whileHover={{ rotate: 360 }} // Rotate wallet icon on hover
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <FaWallet className="text-gray-100 text-6xl transform -rotate-45" />
        </motion.div>
      </motion.div>

      {/* Pie Chart Section */}
      <motion.div
        className="bg-blue-800 p-6 rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
        whileHover={{ scale: 1.1 }} // Add hover animation
        transition={{ type: "spring", stiffness: 120 }}
      >
        <PieChart width={160} height={160}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            isAnimationActive={true} // Enable pie chart animations
            animationDuration={800}
            animationBegin={200}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className="mt-4 text-xl font-bold">
          {data.map((item, index) => (
            <motion.p
              key={index}
              whileHover={{ scale: 1.05, color: COLORS[index] }} // Scale and color change on hover
              transition={{ duration: 0.3 }}
            >
              {item.value}% {item.name}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Balance Section */}
      <motion.div
        className="bg-blue-800 p-6 rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
        whileHover={{ scale: 1.1 }} // Add hover animation
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h2 className="text-3xl font-bold mb-4">Balance</h2>
        <div className="flex items-center">
          {/* Bitcoin Icon */}
          <motion.div
            className="text-yellow-500 text-6xl mr-4"
            whileHover={{ rotate: 360 }} // Rotate bitcoin icon on hover
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <FaBitcoin />
          </motion.div>
          <div className="flex flex-col text-right">
            <motion.p
              className="text-2xl font-bold"
              whileHover={{ scale: 1.1, color: "#FFA500" }} // Hover effect on text
              transition={{ duration: 0.3 }}
            >
              0.7134563 BTC
            </motion.p>
            <p className="text-lg text-orange-300">$56,000</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SpendingBalanceDashboard;
