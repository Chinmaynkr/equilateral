import React from 'react';
import { useTheme } from 'next-themes';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';

// Types
interface MiniChartProps {
  data: any[];
  height?: number;
  width?: number;
  className?: string;
}

// Mini area chart (for price trends)
export const MiniAreaChart: React.FC<MiniChartProps & { 
  dataKey?: string;
  gradientColor?: string;
  strokeColor?: string;
}> = ({ 
  data, 
  height = 40, 
  width = 120, 
  dataKey = 'value',
  gradientColor = '#3b82f6',
  strokeColor = '#3b82f6',
  className = ''
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const id = `mini-area-gradient-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`${className}`} style={{ height, width }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white dark:bg-gray-800 text-xs p-1 border border-gray-200 dark:border-gray-700 rounded shadow">
                    {typeof payload[0].value === 'number' 
                      ? payload[0].value.toFixed(2) 
                      : payload[0].value}
                  </div>
                );
              }
              return null;
            }}
          />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={strokeColor} 
            fillOpacity={1}
            fill={`url(#${id})`}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={true}
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Mini bar chart (for volume)
export const MiniBarChart: React.FC<MiniChartProps & { 
  dataKey?: string;
  barColor?: string;
}> = ({ 
  data, 
  height = 40, 
  width = 120, 
  dataKey = 'value',
  barColor = '#10b981',
  className = ''
}) => {
  return (
    <div className={`${className}`} style={{ height, width }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white dark:bg-gray-800 text-xs p-1 border border-gray-200 dark:border-gray-700 rounded shadow">
                    {payload[0].value.toLocaleString()}
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey={dataKey} 
            fill={barColor}
            isAnimationActive={true}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Mini line chart (for indicators)
export const MiniLineChart: React.FC<MiniChartProps & { 
  dataKey?: string;
  lineColor?: string;
  showDots?: boolean;
}> = ({ 
  data, 
  height = 40, 
  width = 120, 
  dataKey = 'value',
  lineColor = '#f59e0b',
  showDots = false,
  className = ''
}) => {
  return (
    <div className={`${className}`} style={{ height, width }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white dark:bg-gray-800 text-xs p-1 border border-gray-200 dark:border-gray-700 rounded shadow">
                    {typeof payload[0].value === 'number' 
                      ? payload[0].value.toFixed(2) 
                      : payload[0].value}
                  </div>
                );
              }
              return null;
            }}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={lineColor}
            strokeWidth={1.5}
            dot={showDots ? { r: 1 } : false}
            isAnimationActive={true}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Mini pie chart (for allocations)
export const MiniPieChart: React.FC<MiniChartProps & { 
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
}> = ({ 
  data, 
  height = 40, 
  width = 40, 
  dataKey = 'value',
  nameKey = 'name',
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
  className = ''
}) => {
  return (
    <div className={`${className}`} style={{ height, width }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white dark:bg-gray-800 text-xs p-1 border border-gray-200 dark:border-gray-700 rounded shadow">
                    {payload[0].name}: {payload[0].value}%
                  </div>
                );
              }
              return null;
            }}
          />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius="90%"
            paddingAngle={1}
            dataKey={dataKey}
            nameKey={nameKey}
            isAnimationActive={true}
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Sparkline (ultra minimal line chart)
export const Sparkline: React.FC<MiniChartProps & { 
  dataKey?: string;
  color?: string;
  type?: 'line' | 'area';
  positive?: boolean;
}> = ({ 
  data, 
  height = 20, 
  width = 80, 
  dataKey = 'value',
  color,
  type = 'line',
  positive,
  className = ''
}) => {
  // Determine color based on trend if not explicitly provided
  const lineColor = color || (positive === undefined 
    ? '#64748b' 
    : positive 
      ? '#10b981' 
      : '#ef4444');

  return (
    <div className={`${className}`} style={{ height, width }}>
      <ResponsiveContainer width="100%" height="100%">
        {type === 'area' ? (
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={lineColor}
              fill={lineColor}
              fillOpacity={0.2}
              strokeWidth={1}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={lineColor}
              strokeWidth={1}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
