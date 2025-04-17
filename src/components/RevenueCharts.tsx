import { useState } from 'react';
import { Stock } from "../types/portfolio";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';
import { motion } from "framer-motion";

interface RevenueChartsProps {
  stock: Stock;
}

// Define proper types for revenue breakdown
interface ProductRevenue {
  labels: string[];
  data: number[];
  historical: { year: number; data: number[] }[];
}

interface LocationRevenue {
  labels: string[];
  data: number[];
}

interface RevenueBreakdown {
  product: ProductRevenue;
  location: LocationRevenue;
}

const COLORS = [
  '#8B5CF6', '#3B82F6', '#10B981', 
  '#F59E0B', '#EF4444', '#EC4899', 
  '#6366F1', '#14B8A6', '#F97316'
];

const RevenueCharts = ({ stock }: RevenueChartsProps) => {
  const [selectedYear, setSelectedYear] = useState<string>("current");
  
  const revenueData: RevenueBreakdown = stock.revenueBreakdown || {
    product: {
      labels: ['Product A', 'Product B', 'Product C'],
      data: [45, 30, 25],
      historical: [
        { year: 2023, data: [40, 35, 25] },
        { year: 2022, data: [35, 40, 25] },
      ]
    },
    location: {
      labels: ['North America', 'Europe', 'Asia', 'Others'],
      data: [40, 30, 20, 10]
    }
  };

  const productData = selectedYear === "current" 
    ? revenueData.product.labels.map((label, index) => ({
        name: label,
        value: revenueData.product.data[index]
      }))
    : revenueData.product.labels.map((label, index) => ({
        name: label,
        value: revenueData.product.historical.find(h => h.year === parseInt(selectedYear))?.data[index] || 0
      }));

  const locationData = revenueData.location.labels.map((label, index) => ({
    name: label,
    value: revenueData.location.data[index]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md">
          <p className="font-medium text-foreground">{`${payload[0].name}`}</p>
          <p className="text-sm text-muted-foreground">{`${payload[0].value.toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    if (percent < 0.05) return null;
    return (
      <g>
        <path 
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} 
          stroke={COLORS[index % COLORS.length]} 
          fill="none"
          strokeWidth={1.5}
        />
        <circle 
          cx={sx} 
          cy={sy} 
          r={2} 
          fill={COLORS[index % COLORS.length]} 
          stroke="none"
        />
        <text 
          x={ex + (cos >= 0 ? 1 : -1) * 12} 
          y={ey} 
          textAnchor={textAnchor}
          fill={COLORS[index % COLORS.length]}
          fontSize={12}
          fontWeight="500"
          dominantBaseline="central"
        >
          {`${name} (${(percent * 100).toFixed(1)}%)`}
        </text>
      </g>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:space-x-8 w-full">
        {/* Product Revenue Donut */}
        <Card className="bg-background/60 backdrop-blur-sm border border-border/50 flex-1 mb-8 md:mb-0">
          <div className="flex flex-col md:flex-row items-center p-6 space-y-6 md:space-y-0 md:space-x-8 w-full">
            <div className="h-[280px] w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={renderCustomizedLabel}
                    labelLine={true}
                  >
                    {productData.map((entry, index) => (
                      <Cell 
                        key={entry.name} 
                        fill={COLORS[index % COLORS.length]}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-1/2">
              {productData.map((entry, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={entry.name}
                  className="flex items-center justify-between group hover:bg-muted/50 p-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2 mr-2">
                    <div 
                      className="w-3 h-3 rounded-sm flex-shrink-0" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                    />
                    <span 
                      className="text-sm whitespace-normal truncate max-w-[120px]"
                      style={{ color: COLORS[index % COLORS.length] }}
                    >
                      {entry.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {`${entry.value.toFixed(1)}%`}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
        {/* Location Revenue Donut */}
        <Card className="bg-background/60 backdrop-blur-sm border border-border/50 flex-1">
          <div className="flex flex-col md:flex-row items-center p-6 space-y-6 md:space-y-0 md:space-x-8 w-full">
            <div className="h-[280px] w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={renderCustomizedLabel}
                    labelLine={true}
                  >
                    {locationData.map((entry, index) => (
                      <Cell 
                        key={entry.name} 
                        fill={COLORS[index % COLORS.length]}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-1/2">
              {locationData.map((entry, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={entry.name}
                  className="flex items-center justify-between group hover:bg-muted/50 p-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2 mr-2">
                    <div 
                      className="w-3 h-3 rounded-sm flex-shrink-0" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                    />
                    <span 
                      className="text-sm whitespace-normal truncate max-w-[120px]"
                      style={{ color: COLORS[index % COLORS.length] }}
                    >
                      {entry.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {`${entry.value.toFixed(1)}%`}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RevenueCharts;
