import React from "react";
import { motion } from "framer-motion";

const Res_generalCard = ({ title, value, icon: Icon, iconBg, iconColor }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.08,
        boxShadow: "0px 8px 24px rgba(0,0,0,0.2)", 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl shadow-md cursor-default"
    >
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full ${iconBg}`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-xl font-bold text-gray-900">{value}</h2>
      </div>
    </motion.div>
  );
};

export default Res_generalCard;
