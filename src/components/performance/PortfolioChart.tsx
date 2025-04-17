
import React from "react";
import { Stock, TimeFrame } from "@/types/portfolio";
import { formatCurrency } from "@/utils/portfolioUtils";
import { ChartContainer } from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot
} from "recharts";
import { generatePortfolioPerformanceData } from "./performanceUtils";

interface PortfolioChartProps {
  timeframe: TimeFrame;
  stocks: Stock[];
}

const PortfolioChart = ({ timeframe, stocks }: PortfolioChartProps) => {
  const performanceData = generatePortfolioPerformanceData(stocks, timeframe);
  
  // Find max and min points for reference dots
  const maxPoint = performanceData.reduce((max, point) => 
    point.value > max.value ? point : max, 
    performanceData[0]
  );

  const minPoint = performanceData.reduce((min, point) => 
    point.value < min.value ? point : min, 
    performanceData[0]
  );

  return (
    <div className="h-[300px] w-full">
      <ChartContainer 
        config={{
          portfolio: { 
            theme: { 
              light: "#8B5CF6",
              dark: "#8B5CF6" 
            } 
          }
        }}
        className="h-full w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={performanceData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
              orientation="right"
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Portfolio Value']}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              fill="url(#colorPortfolio)" 
            />
            {/* Ensure max point dot is always visible */}
            <ReferenceDot 
              x={maxPoint.date} 
              y={maxPoint.value} 
              r={4} 
              fill="#10B981" 
              stroke="#fff"
              strokeWidth={2}
              ifOverflow="extendDomain"
            />
            {/* Ensure min point dot is always visible */}
            <ReferenceDot 
              x={minPoint.date} 
              y={minPoint.value} 
              r={4} 
              fill="#EF4444" 
              stroke="#fff"
              strokeWidth={2}
              ifOverflow="extendDomain"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default PortfolioChart;
