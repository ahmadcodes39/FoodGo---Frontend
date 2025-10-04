import React from "react";
import { motion } from "framer-motion";

const Ad_KpiCards = ({ title, value, icon: Icon, iconBg, iconColor }) => {
  return (
    <motion.div
       whileHover={{ 
        scale: 1.08,
        boxShadow: "0px 8px 24px rgba(0,0,0,0.2)", 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex flex-col items-start gap-3 p-6 bg-white rounded-2xl shadow-sm border-2 border-gray-200 cursor-default"
    >
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full ${iconBg}`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div>
        <p className="text-gray-500 text-xs font">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">{value}</h2>
      </div>
    </motion.div>
  );
};

export default Ad_KpiCards;
