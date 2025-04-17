
import React from "react";
import { Stock } from "@/types/portfolio";
import { formatCurrency, formatPercentage } from "@/utils/portfolioUtils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface SectorAllocationProps {
  stocks: Stock[];
}

const SectorAllocation = ({ stocks }: SectorAllocationProps) => {
  const sectorData = [
    { name: 'Technology', value: 450000, percentage: 22.95 },
    { name: 'Healthcare', value: 380000, percentage: 19.38 },
    { name: 'Consumer Cyclical', value: 320000, percentage: 16.33 },
    { name: 'Financial Services', value: 280000, percentage: 14.29 },
    { name: 'Communication', value: 240000, percentage: 12.24 },
    { name: 'Industrial', value: 150000, percentage: 7.65 },
    { name: 'Consumer Defensive', value: 140000, percentage: 7.14 }
  ];
  
  const COLORS = [
    '#8B5CF6', '#3B82F6', '#10B981', 
    '#F59E0B', '#EF4444', '#EC4899', 
    '#6366F1', '#14B8A6', '#F97316'
  ];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-background border border-border p-2 rounded-md shadow-md">
          <p className="font-medium text-foreground">{`${payload[0].name}`}</p>
          <p className="text-sm text-muted-foreground">{`Value: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-sm text-muted-foreground">{`Percentage: ${formatPercentage(payload[0].payload.percentage)}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    
    // Don't render labels for sectors with very small percentages
    if (percent < 0.05) return null;

    return (
      <g>
        <path 
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} 
          stroke={COLORS[index % COLORS.length]} 
          fill="none" 
        />
        <circle cx={ex} cy={ey} r={2} fill={COLORS[index % COLORS.length]} stroke="none" />
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
    <Card className="bg-background/60 backdrop-blur-sm border border-border/50 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Sector Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center">
          <div className="h-[280px] w-full md:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={true}
                >
                  {sectorData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 md:mt-0 w-full md:w-1/2 md:pl-4">
            {sectorData.map((sector, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={sector.name}
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
                    {sector.name}
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {formatPercentage(sector.percentage)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectorAllocation;
