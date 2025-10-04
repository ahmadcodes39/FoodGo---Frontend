import React from "react";
import { motion } from "framer-motion";

const Res_orderStatsCards = ({ amount, title, color, bgColor }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`flex items-center justify-center p-4 ${bgColor} rounded-xl shadow-md cursor-default`}
    >
      <div className="flex flex-col items-center text-center">
        <h2 className={`text-xl font-bold ${color}`}>
          {amount}
        </h2>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </motion.div>
  );
};

export default Res_orderStatsCards;
