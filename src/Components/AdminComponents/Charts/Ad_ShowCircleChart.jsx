import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { customerReturnungData } from "../../Dummy Data/DummyData";

const COLORS = ["#3b82f6", "#10b981"]; // blue for new, green for returning

const Ad_ShowCircleChart = () => {
  return (
    <div className="w-full h-80 shadow-xl  rounded-xl bg-white p-4 flex items-left justify-left">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={customerReturnungData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}   // 👈 makes it a donut-style circle
            outerRadius={90}
            paddingAngle={5}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {customerReturnungData.map((entry, index) => (
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

export default Ad_ShowCircleChart;
