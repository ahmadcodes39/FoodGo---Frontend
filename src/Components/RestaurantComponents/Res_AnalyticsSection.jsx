import React from "react";
import TopHeading from "../../Components/Common/TopHeading";
import { motion } from "framer-motion";
import ShowLineChart from "../Common/Charts/ShowLineChart";

const Res_AnalyticsSection = ({ title, selectedPeriod, dataMap, dataKey, lineColor }) => {
  const data = dataMap[selectedPeriod];

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center p-4">
        <TopHeading title={`${title} (${selectedPeriod})`} />
      </div>

      {data && data.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ShowLineChart data={data} dataKey={dataKey} lineColor={lineColor} />
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No data available</p>
      )}
    </div>
  );
};

export default Res_AnalyticsSection;
