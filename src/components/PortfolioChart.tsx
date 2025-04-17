
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Stock } from "../types/portfolio";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent 
} from "@/components/ui/chart";
import { formatCurrency } from "../utils/portfolioUtils";

interface PortfolioChartProps {
  stocks: Stock[];
}

// Generate mock stock performance data for the last 7 days
const generatePerformanceData = (stocks: Stock[]) => {
  const today = new Date();
  const data = [];

  // Generate data for last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    
    // Calculate a random portfolio value that fluctuates around the current value
    // but trends upward or downward based on overall portfolio performance
    const baseValue = stocks.reduce((acc, stock) => {
      return acc + stock.ltp * stock.quantity;
    }, 0);
    
    const randomFactor = 0.98 + (Math.random() * 0.07); // Random factor between 0.98 and 1.05
    const dayValue = baseValue * randomFactor * (1 - (i * 0.01)); 
    
    data.push({
      day,
      value: dayValue,
    });
  }
  
  return data;
};

const PortfolioChart = ({ stocks }: PortfolioChartProps) => {
  const chartData = generatePerformanceData(stocks);
  
  // Determine if the portfolio is trending up by comparing first and last values
  const isUp = chartData[chartData.length - 1].value > chartData[0].value;
  
  // Calculate min and max for Y-axis padding
  const values = chartData.map(item => item.value);
  const min = Math.min(...values) * 0.995;
  const max = Math.max(...values) * 1.005;
  
  return (
    <div className="w-full h-44">
      <ChartContainer
        className="w-full h-full"
        config={{
          portfolio: {
            label: "Portfolio Value",
            color: isUp ? "#10b981" : "#ef4444",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isUp ? "#10b981" : "#ef4444"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={isUp ? "#10b981" : "#ef4444"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              dy={10}
            />
            <YAxis
              domain={[min, max]}
              axisLine={false}
              tickLine={false}
              tick={false}
              width={0}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value: number) => formatCurrency(value)}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="value"
              name="portfolio"
              stroke={isUp ? "#10b981" : "#ef4444"}
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default PortfolioChart;
