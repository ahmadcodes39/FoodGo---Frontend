import React from "react";
import { motion } from "framer-motion";

const Ad_AnalyticsCard = ({ title, amount, icon, iconColor, iconBg }) => {
  return (
    <motion.div
    //   whileHover={{ scale: 1.04, y: -3 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-between p-5 cursor-pointer bg-white border border-gray-300"
    >
      <div className="flex flex-col gap-2 ">
        <p className="text-gray-500 text-sm">{title}</p>
        <h1 className="text-2xl font-semibold">{amount}</h1>
      </div>
      <div className={`${iconBg} ${iconColor} p-3 rounded-lg`}>
        {icon}
      </div>
    </motion.div>
  );
};

export default Ad_AnalyticsCard;
