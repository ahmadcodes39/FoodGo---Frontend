import React from "react";
import { motion } from "framer-motion";

const Res_AnalyticsCards = ({ title, value, icon, iconBg, bg}) => {
  return (
    <motion.div
      initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        transition: { duration: 0.3 },
      }}
      className={`rounded-xl p-4 ${bg} cursor-pointer`}
    >
      <div className="flex justify-between items-start">
        <p className="text-gray-600 text-lg font-semibold">{title}</p>
        <div className={`p-2 rounded-lg ${iconBg}`}>{icon}</div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-2">{value}</h2>
    </motion.div>
  );
};

export default Res_AnalyticsCards;
