import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Ad_ShowStackedAreaChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-80 bg-white rounded-xl shadow-md p-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            {/* ✅ Gradient for current period */}
            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
            </linearGradient>

            {/* ✅ Gradient for previous period */}
            <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* ✅ Previous period */}
          <Area
            type="monotone"
            dataKey="previous"
            name="Previous"
            stroke="#94a3b8"
            fillOpacity={1}
            fill="url(#colorPrevious)"
            stackId="1"
          />
          {/* ✅ Current period */}
          <Area
            type="monotone"
            dataKey="current"
            name="Current"
            stroke="#22c55e"
            fillOpacity={1}
            fill="url(#colorCurrent)"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Ad_ShowStackedAreaChart;
