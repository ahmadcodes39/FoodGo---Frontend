import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Ad_ShowBarChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-center h-80">
        <p className="text-gray-400">No revenue data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`} />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="revenue" fill="#3b82f6" barSize={40} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Ad_ShowBarChart;
