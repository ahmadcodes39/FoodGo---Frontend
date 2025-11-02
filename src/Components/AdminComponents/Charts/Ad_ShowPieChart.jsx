import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { orderStatusData } from "../../Dummy Data/DummyData";

const COLORS = ["#f59e0b", "#3b82f6", "#8b5cf6", "#10b981", "#ef4444"];

const Ad_ShowPieChart = () => {
  return (
    <div className="w-full h-80 shadow-xl  rounded-xl bg-white p-4 flex items-left justify-left pb-5">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={orderStatusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            label
          >
            {orderStatusData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Ad_ShowPieChart;
