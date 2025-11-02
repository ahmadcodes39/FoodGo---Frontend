import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

const QuickActions = ({ actions }) => {
  const handleActionClick = (action) => {
    if (action.modalId) {
      const modal = document.getElementById(action.modalId);
      if (modal) modal.showModal();
    }
  };

  return (
    <>
      {actions.map((action, idx) =>
        action.link ? (
          <MotionLink
            key={idx}
            to={action.link}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex items-center gap-4 p-4 border-2 bg-gray-100 border-gray-200 rounded-xl shadow cursor-pointer"
          >
            <div
              className={`flex items-center justify-center rounded-full ${action.color}`}
            >
              <action.icon className="w-6 h-6" />
            </div>
            <p className="font-medium text-gray-700">{action.title}</p>
          </MotionLink>
        ) : (
          <motion.div
            key={idx}
            onClick={() => handleActionClick(action)}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex items-center gap-4 p-4 border-2 bg-gray-100 border-gray-200 rounded-xl shadow cursor-pointer"
          >
            <div
              className={`flex items-center justify-center rounded-full ${action.color}`}
            >
              <action.icon className="w-6 h-6" />
            </div>
            <p className="font-medium text-gray-700">{action.title}</p>
          </motion.div>
        )
      )}
    </>
  );
};

export default QuickActions;
