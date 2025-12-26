import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ShowLineChart = ({ data = [], dataKey = "revenue", lineColor }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 bg-white rounded-xl shadow-md flex items-center justify-center">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80 bg-white rounded-xl shadow-md">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={lineColor}
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShowLineChart;
