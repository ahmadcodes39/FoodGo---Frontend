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
import { topRestaurants } from "../../Dummy Data/DummyData";

const Ad_ShowBarChart = () => {
  // Convert revenue "$45,680" → 45680 (number)
  const formattedData = topRestaurants.map((r) => ({
    ...r,
    revenue: Number(r.revenue.replace(/[^0-9.-]+/g, "")),
  }));

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="revenue" fill="#3b82f6" barSize={40} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Ad_ShowBarChart;
