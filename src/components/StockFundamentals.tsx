import React, { useState } from "react";
import { Stock, TimeFrame } from "@/types/portfolio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie,
  LineChart, Line, ReferenceLine, Scatter, ScatterChart, ZAxis
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Info, FileText, Calendar, Lightbulb, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPercentage, calculateStockPnL } from "../utils/portfolioUtils";
import { useTheme } from "next-themes";

const generateStockChartData = (stock: Stock, timeframe: TimeFrame) => {
  const data = [];
  const dataPoints = timeframe === '1D' ? 24 : 
                    timeframe === '1M' ? 30 : 
                    timeframe === '3M' ? 90 : 
                    timeframe === '6M' ? 180 : 
                    timeframe === '1Y' ? 365 : 
                    timeframe === '3Y' ? 365 * 3 : 
                    timeframe === '5Y' ? 365 * 5 : 365;
  
  let baseValue = stock.ltp * 0.8;
  let currentValue = baseValue;
  let trend = stock.changeToday > 0 ? 0.6 : -0.6;
  
  for (let i = 0; i < dataPoints; i++) {
    const change = (Math.random() - 0.5 + trend * 0.1) * (stock.ltp * 0.05);
    currentValue += change;
    
    if (currentValue < baseValue * 0.7) currentValue = baseValue * 0.7;
    if (currentValue > baseValue * 1.5) currentValue = baseValue * 1.5;
    
    const date = new Date();
    
    if (timeframe === '1D') {
      date.setHours(date.getHours() - (24 - i));
      data.push({
        date: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        value: currentValue
      });
    } else {
      date.setDate(date.getDate() - (dataPoints - i));
      data.push({
        date: `${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getDate()}`,
        value: currentValue
      });
    }
  }
  
  return data;
};

const getStockDescription = (symbol: string) => {
  const descriptions = {
    "AAPL": "A leading technology company specializing in consumer electronics, software, and online services. Known for innovation in smartphones, tablets, and wearables.",
    "MSFT": "A multinational technology corporation producing computer software, consumer electronics, and related services with a focus on cloud computing and enterprise solutions.",
    "GOOGL": "A multinational technology company specializing in Internet-related services and products, including online advertising technologies, search engines, and cloud computing.",
    "AMZN": "An e-commerce and cloud computing company with diversified operations in digital streaming, artificial intelligence, and consumer electronics.",
    "TSLA": "An electric vehicle and clean energy company focused on electric cars, battery energy storage, and solar products manufacturing.",
    "META": "A social technology company developing platforms that enable sharing and connection through mobile devices, personal computers, and other surfaces.",
    "NFLX": "A subscription streaming service and production company offering a wide variety of TV shows, movies, documentaries, and more on internet-connected devices."
  };
  
  return descriptions[symbol as keyof typeof descriptions] || 
    "A market-leading company specializing in innovative products and solutions for its industry sector.";
};

const getStockFundamentals = (stock: Stock) => {
  const multiplier = (stock.symbol.charCodeAt(0) % 5) * 0.1 + 1;
  
  return {
    pe: (15.33 * multiplier).toFixed(2),
    sectorPE: (18.19 * (1 + (stock.changeToday * 0.1))).toFixed(2),
    pb: (3.57 * multiplier).toFixed(2),
    divYield: stock.symbol === "AAPL" || stock.symbol === "MSFT" ? (0.5 + Math.random()).toFixed(2) + "%" : "--",
    roe: (48.28 * (multiplier * 0.8)).toFixed(2) + "%",
    low52w: Math.round(stock.ltp * 0.7),
    high52w: Math.round(stock.ltp * 1.3),
    range52w: Math.round(stock.ltp),
  };
};

const generateFinancialData = (stock: Stock) => {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const years = ['2021', '2022', '2023', '2024'];
  
  const baseRevenue = stock.ltp * stock.quantity * 10000;
  const multiplier = stock.changeToday > 0 ? 1.1 : 0.95;
  
  const quarterlyData = quarters.map((q, idx) => {
    const growth = 1 + (idx * 0.1);
    return {
      name: q,
      revenue: Math.round(baseRevenue * growth * (1 + idx * 0.2)),
      profit: Math.round(baseRevenue * growth * 0.3 * (1 + idx * 0.15)),
      expenses: Math.round(baseRevenue * growth * 0.7 * (1 - idx * 0.05))
    };
  });
  
  const yearlyData = years.map((year, idx) => {
    const yearGrowth = Math.pow(multiplier, idx);
    return {
      year,
      revenue: Math.round(baseRevenue * yearGrowth * 4),
      profit: Math.round(baseRevenue * yearGrowth * 1.2),
      expenses: Math.round(baseRevenue * yearGrowth * 2.8)
    };
  });
  
  return {
    quarterly: quarterlyData,
    yearly: yearlyData
  };
};

const generateEvents = (stock: Stock) => {
  const baseDate = new Date();
  
  return [
    {
      date: new Date(baseDate.setDate(baseDate.getDate() + 15)).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      event: "Quarterly Earnings Call",
      details: `${stock.name} to announce Q${Math.floor(Math.random() * 4) + 1} earnings results`
    },
    {
      date: new Date(baseDate.setDate(baseDate.getDate() + 30)).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      event: "Dividend Payment",
      details: stock.symbol === "AAPL" || stock.symbol === "MSFT" ? 
        `Regular dividend payment of $${(stock.ltp * 0.005).toFixed(2)} per share` : 
        "No dividend announcement"
    },
    {
      date: new Date(baseDate.setDate(baseDate.getDate() + 45)).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      event: "Product Launch",
      details: `New product line announcement expected`
    }
  ];
};

const generateIdeas = (stock: Stock) => {
  const isProfitable = stock.changeToday > 0;
  
  return [
    {
      title: isProfitable ? "Consider Adding Position" : "Monitor Closely",
      analysis: isProfitable ? 
        `${stock.name} shows strong momentum with positive return trends. Consider increasing position on pullbacks.` : 
        `${stock.name} facing headwinds. Watch key support levels before adding to position.`
    },
    {
      title: "Sector Rotation Strategy",
      analysis: `Compare ${stock.name}'s performance against sector peers to identify potential rotation opportunities.`
    },
    {
      title: "Long-term Perspective",
      analysis: `${stock.name}'s current fundamentals suggest it remains a ${isProfitable ? 'strong' : 'potentially undervalued'} long-term holding.`
    }
  ];
};

const generateTechnicalIndicators = (stock: Stock) => {
  // Generate moving averages
  const ma50 = stock.ltp * (1 - Math.random() * 0.05);
  const ma200 = stock.ltp * (1 - Math.random() * 0.1);
  
  // Generate RSI (Relative Strength Index)
  const rsi = Math.floor(40 + Math.random() * 40); // Between 40-80
  
  // Generate MACD (Moving Average Convergence Divergence)
  const macd = (Math.random() * 2 - 1).toFixed(2);
  const signal = (Number(macd) + (Math.random() * 0.4 - 0.2)).toFixed(2);
  const histogram = (Number(macd) - Number(signal)).toFixed(2);
  
  // Generate Bollinger Bands
  const middleBand = stock.ltp;
  const upperBand = middleBand * (1 + Math.random() * 0.05);
  const lowerBand = middleBand * (1 - Math.random() * 0.05);
  
  // Volume profile
  const volumeProfile = [
    { price: stock.ltp * 0.95, volume: Math.random() * 100 },
    { price: stock.ltp * 0.97, volume: Math.random() * 200 },
    { price: stock.ltp * 0.99, volume: Math.random() * 300 },
    { price: stock.ltp, volume: Math.random() * 500 },
    { price: stock.ltp * 1.01, volume: Math.random() * 300 },
    { price: stock.ltp * 1.03, volume: Math.random() * 200 },
    { price: stock.ltp * 1.05, volume: Math.random() * 100 },
  ];
  
  // Support and resistance levels
  const supportLevels = [
    stock.ltp * 0.93,
    stock.ltp * 0.95,
    stock.ltp * 0.98
  ];
  
  const resistanceLevels = [
    stock.ltp * 1.02,
    stock.ltp * 1.05,
    stock.ltp * 1.08
  ];
  
  return {
    movingAverages: { ma50, ma200 },
    rsi,
    macd: { macd, signal, histogram },
    bollingerBands: { upper: upperBand, middle: middleBand, lower: lowerBand },
    volumeProfile,
    supportLevels,
    resistanceLevels
  };
};

interface StockFundamentalsProps {
  stock: Stock;
}

const StockFundamentals = ({ stock }: StockFundamentalsProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<TimeFrame>('1Y');
  const chartData = generateStockChartData(stock, selectedTimeframe);
  
  const { absolute: pnlValue } = calculateStockPnL(stock);
  const isProfitable = pnlValue >= 0;
  
  const fundamentals = getStockFundamentals(stock);
  const financials = generateFinancialData(stock);
  const events = generateEvents(stock);
  const ideas = generateIdeas(stock);
  const technicalIndicators = generateTechnicalIndicators(stock);

  const COLORS = [
    '#8B5CF6', '#3B82F6', '#10B981', 
    '#F59E0B', '#EF4444', '#EC4899', 
    '#6366F1', '#14B8A6', '#F97316'
  ];

  const revenueBreakdown = stock.fundamentals?.revenueBreakdown || {
    product: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Other'],
      data: [40, 25, 15, 10, 10],
    },
    location: {
      labels: ['India', 'Asia', 'Europe', 'North America', 'Rest of World'],
      data: [45, 25, 15, 10, 5],
    }
  };

  // Create data for the charts
  const productData = revenueBreakdown.product.labels.map((label, index) => ({
    name: label,
    value: revenueBreakdown.product.data[index],
    percentage: revenueBreakdown.product.data[index]
  }));

  const locationData = revenueBreakdown.location.labels.map((label, index) => ({
    name: label,
    value: revenueBreakdown.location.data[index],
    percentage: revenueBreakdown.location.data[index]
  }));

  // Completely redesign the label renderer for a trading platform look
  const renderCustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    // Skip small segments that would create visual clutter
    if (percent < 0.05) return null;
    
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);
    
    // Increase spacing for better visibility
    const outerRadiusOffset = 15; 
    const lineLength = 40; 
    
    // Calculate positions with more spacing
    const sx = cx + (outerRadius + outerRadiusOffset) * cos;
    const sy = cy + (outerRadius + outerRadiusOffset) * sin;
    const mx = cx + (outerRadius + lineLength) * cos;
    const my = cy + (outerRadius + lineLength) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    
    // Add animated pulse effect to the endpoint circle
    const animationStyle = {
      animation: `pulse-${index} 2s infinite`,
    };
    
    return (
      <g>
        <defs>
          <filter id={`glow-${index}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <path 
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} 
          stroke={COLORS[index % COLORS.length]} 
          strokeWidth={1.5} 
          fill="none" 
          strokeDasharray="1 0"
          className="chart-line-path"
        />
        <circle 
          cx={ex} 
          cy={ey} 
          r={3} 
          fill={COLORS[index % COLORS.length]} 
          stroke="none"
          filter={`url(#glow-${index})`}
          style={animationStyle}
          className="chart-endpoint"
        />
        
        {/* Add a semi-transparent background for better text visibility */}
        <rect
          x={ex + (cos >= 0 ? 1 : -1) * 12 - (cos >= 0 ? 0 : (name.length * 6 + 30))}
          y={ey - 10}
          width={name.length * 6 + 30} 
          height={20}
          rx={4}
          fill="var(--background)"
          fillOpacity={0.8}
          className="chart-label-bg"
        />
        
        <text 
          x={ex + (cos >= 0 ? 1 : -1) * 12} 
          y={ey} 
          textAnchor={textAnchor}
          fill={COLORS[index % COLORS.length]}
          fontSize={12}
          fontWeight="600" 
          dominantBaseline="central"
          style={{ textShadow: "0px 0px 2px var(--background)" }}
          className="chart-label-text" 
        >
          {`${name} (${(percent * 100).toFixed(1)}%)`}
        </text>
      </g>
    );
  };

  // Custom tooltip component for charts - match Sector Allocation
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-background border border-border p-3 rounded-md shadow-lg">
          <p className="font-medium text-foreground text-base">{`${payload[0].name}`}</p>
          <p className="text-sm text-muted-foreground">{`Value: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-sm text-muted-foreground">{`Percentage: ${formatPercentage(payload[0].payload.percentage / 100)}`}</p>
        </div>
      );
    }
    return null;
  };

  const { theme } = useTheme();

  return (
    <div className="p-4">
      <style>
        {`
          @keyframes pulse-0 {
            0% { r: 3; opacity: 1; }
            50% { r: 5; opacity: 0.8; }
            100% { r: 3; opacity: 1; }
          }
          
          @keyframes pulse-1 {
            0% { r: 3; opacity: 1; }
            60% { r: 5; opacity: 0.8; }
            100% { r: 3; opacity: 1; }
          }
          
          @keyframes pulse-2 {
            0% { r: 3; opacity: 1; }
            70% { r: 5; opacity: 0.8; }
            100% { r: 3; opacity: 1; }
          }
          
          @keyframes pulse-3 {
            0% { r: 3; opacity: 1; }
            80% { r: 5; opacity: 0.8; }
            100% { r: 3; opacity: 1; }
          }
          
          @keyframes pulse-4 {
            0% { r: 3; opacity: 1; }
            90% { r: 5; opacity: 0.8; }
            100% { r: 3; opacity: 1; }
          }
          
          .chart-line-path {
            transition: stroke-width 0.2s ease;
          }
          
          .chart-line-path:hover {
            stroke-width: 2.5;
          }
          
          .chart-endpoint {
            transition: r 0.2s ease;
          }
          
          .chart-endpoint:hover {
            r: 6;
          }
          
          .chart-label-bg {
            transition: fill-opacity 0.2s ease;
          }
          
          .chart-label-bg:hover {
            fill-opacity: 0.95;
          }
          
          .chart-label-text {
            transition: font-size 0.2s ease;
          }
          
          .chart-label-text:hover {
            font-size: 13px;
          }
        `}
      </style>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <p className="text-muted-foreground mb-6">
            {getStockDescription(stock.symbol)}
          </p>

          <div className="grid grid-cols-5 gap-2 text-center mb-6">
            <div>
              <p className="text-muted-foreground text-sm">PE</p>
              <p className="font-medium">{fundamentals.pe}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Sector PE</p>
              <p className="font-medium">{fundamentals.sectorPE}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">P/B</p>
              <p className="font-medium">{fundamentals.pb}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Div. Yield</p>
              <p className="font-medium">{fundamentals.divYield}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">ROE</p>
              <p className="font-medium">{fundamentals.roe}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card rounded-lg p-4 border">
              <h3 className="text-lg font-medium mb-2">52-Week Range</h3>
              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 mb-2">
                <div 
                  className="absolute h-4 w-4 top-1/2 -translate-y-1/2 rounded-full bg-primary border-2 border-background"
                  style={{ left: `${((stock.ltp - fundamentals.low52w) / (fundamentals.high52w - fundamentals.low52w)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatCurrency(fundamentals.low52w)}</span>
                <span className="font-medium text-foreground">{formatCurrency(stock.ltp)}</span>
                <span>{formatCurrency(fundamentals.high52w)}</span>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 border">
              <h3 className="text-lg font-medium mb-2">Technical Indicators</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm">
                  <p className="text-muted-foreground">RSI (14)</p>
                  <p className={`font-medium ${
                    technicalIndicators.rsi > 70 ? 'text-red-500' : 
                    technicalIndicators.rsi < 30 ? 'text-green-500' : 'text-foreground'
                  }`}>
                    {technicalIndicators.rsi}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">MACD</p>
                  <p className={`font-medium ${
                    Number(technicalIndicators.macd.histogram) > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {technicalIndicators.macd.histogram}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">MA (50)</p>
                  <p className={`font-medium ${
                    stock.ltp > technicalIndicators.movingAverages.ma50 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {formatCurrency(technicalIndicators.movingAverages.ma50)}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">MA (200)</p>
                  <p className={`font-medium ${
                    stock.ltp > technicalIndicators.movingAverages.ma200 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {formatCurrency(technicalIndicators.movingAverages.ma200)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              {(['1M', '3M', '6M', '1Y', '3Y'] as TimeFrame[]).map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? "default" : "outline"}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className="flex-1 mx-1"
                  size="sm"
                >
                  {timeframe}
                </Button>
              ))}
            </div>

            <div className="h-[350px] w-full">
              <ChartContainer 
                config={{
                  price: { 
                    theme: { 
                      light: isProfitable ? "#10b981" : "#ef4444",
                      dark: isProfitable ? "#10b981" : "#ef4444"
                    } 
                  }
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id={`colorValue-${stock.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop 
                          offset="5%" 
                          stopColor={isProfitable ? "#10b981" : "#ef4444"}
                          stopOpacity={0.2} 
                        />
                        <stop 
                          offset="95%" 
                          stopColor={isProfitable ? "#10b981" : "#ef4444"}
                          stopOpacity={0} 
                        />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      minTickGap={30}
                    />
                    <YAxis 
                      domain={['dataMin - 50', 'dataMax + 50']}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      orientation="right"
                      tickFormatter={(value) => formatCurrency(value).split('.')[0]}
                    />
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.05)"} vertical={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        color: 'hsl(var(--foreground))'
                      }}
                      labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                      formatter={(value: number) => [
                        `$${Number(value).toFixed(2)}`, 
                        'Price'
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={isProfitable ? "#10b981" : "#ef4444"}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill={`url(#colorValue-${stock.id})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="financials">
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Market Snapshot Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                <h2 className="text-xl font-bold text-foreground">Market Snapshot</h2>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full border border-green-200 dark:border-green-800 font-medium">
                  Market Open
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/70 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                  {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>

            {/* Volume Profile Chart - New Feature */}
            <div className="bg-gradient-to-br from-gray-100/90 to-gray-200/50 dark:from-gray-900/90 dark:to-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-800/80 shadow-xl mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full mr-3"></div>
                  Volume Profile
                </h3>
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/70 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                  Last 30 days
                </div>
              </div>
              
              <div className="h-[200px] bg-white/50 dark:bg-black/20 rounded-lg p-4 border border-gray-200 dark:border-gray-800/50">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.05)"} />
                    <XAxis 
                      type="number" 
                      dataKey="volume" 
                      name="Volume" 
                      stroke="var(--muted-foreground)"
                      domain={[0, 'dataMax']}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="price" 
                      name="Price" 
                      stroke="var(--muted-foreground)"
                      domain={['dataMin - 10', 'dataMax + 10']}
                      tickFormatter={(value) => formatCurrency(value).split('.')[0]}
                    />
                    <ZAxis range={[60, 400]} />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
                      }}
                      formatter={(value: any, name: string) => [
                        name === 'Price' ? formatCurrency(Number(value)) : typeof value === 'number' ? value.toFixed(0) : value,
                        name
                      ]}
                    />
                    <Scatter 
                      name="Volume Profile" 
                      data={technicalIndicators.volumeProfile} 
                      fill="var(--primary)"
                    />
                    
                    {/* Support Levels */}
                    {technicalIndicators.supportLevels.map((level, index) => (
                      <ReferenceLine 
                        key={`support-${index}`}
                        y={level} 
                        stroke="#10b981" 
                        strokeDasharray="3 3"
                        label={{ 
                          value: `Support: ${formatCurrency(level)}`, 
                          position: 'insideBottomRight',
                          fill: '#10b981',
                          fontSize: 10
                        }}
                      />
                    ))}
                    
                    {/* Resistance Levels */}
                    {technicalIndicators.resistanceLevels.map((level, index) => (
                      <ReferenceLine 
                        key={`resistance-${index}`}
                        y={level} 
                        stroke="#ef4444" 
                        strokeDasharray="3 3"
                        label={{ 
                          value: `Resistance: ${formatCurrency(level)}`, 
                          position: 'insideTopRight',
                          fill: '#ef4444',
                          fontSize: 10
                        }}
                      />
                    ))}
                    
                    {/* Current Price */}
                    <ReferenceLine 
                      y={stock.ltp} 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      label={{ 
                        value: `Current: ${formatCurrency(stock.ltp)}`, 
                        position: 'insideTopLeft',
                        fill: '#3b82f6',
                        fontSize: 10
                      }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Quarterly Financials Section */}
            <div className="bg-gradient-to-br from-gray-100/90 to-gray-200/50 dark:from-gray-900/90 dark:to-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-800/80 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full mr-3"></div>
                  Quarterly Performance
                </h3>
                <div className="flex space-x-2 text-xs">
                  <div className="bg-gray-100 dark:bg-gray-800/80 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">1Y</div>
                  <div className="bg-blue-100 dark:bg-blue-900/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-700/80 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors cursor-pointer">YTD</div>
                  <div className="bg-gray-100 dark:bg-gray-800/80 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">3M</div>
                </div>
              </div>
              
              <div className="h-[270px] bg-white/50 dark:bg-black/20 rounded-lg p-4 border border-gray-200 dark:border-gray-800/50">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={financials.quarterly}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.05)"} />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                    <YAxis 
                      stroke="var(--muted-foreground)" 
                      tickFormatter={(value) => `${(value/1000000).toFixed(0)}M`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
                      }}
                      formatter={(value) => [`$${(Number(value)/1000000).toFixed(1)}M`, '']}
                      labelFormatter={(label) => `Quarter: ${label}`}
                    />
                    <Legend 
                      wrapperStyle={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: 'var(--foreground)'
                      }}
                    />
                    <Bar dataKey="revenue" name="Revenue" fill="url(#colorRevenue)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" name="Profit" fill="url(#colorProfit)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop 
                          offset="5%" 
                          stopColor="#3b82f6" 
                          stopOpacity={0.9}/>
                        <stop 
                          offset="95%" 
                          stopColor="#3b82f6" 
                          stopOpacity={0.6}/>
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop 
                          offset="5%" 
                          stopColor="#10b981" 
                          stopOpacity={0.9}/>
                        <stop 
                          offset="95%" 
                          stopColor="#10b981" 
                          stopOpacity={0.6}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Revenue Breakdown Section */}
            <div className="bg-gradient-to-br from-gray-100/90 to-gray-200/50 dark:from-gray-900/90 dark:to-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-800/80 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3"></div>
                  Revenue Breakdown
                </h3>
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/70 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                  {new Date().toLocaleDateString()} Market Data
                </div>
              </div>
              
              {/* Product Breakdown Chart */}
              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg border border-gray-200 dark:border-gray-800/50 mb-4">
                <div className="flex items-center mb-3">
                  <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-2"></div>
                  <h4 className="text-sm font-medium text-blue-300 dark:text-blue-600">Product Breakdown</h4>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="h-[320px] w-full md:w-1/2 max-w-[400px] mx-auto md:mx-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                          label={renderCustomPieLabel}
                          labelLine={true}
                        >
                          {productData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]}
                              stroke="rgba(255,255,255,0.1)"
                              strokeWidth={1.5}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 md:mt-0 w-full md:w-1/2 md:pl-6">
                    {productData.map((entry, index) => (
                      <div
                        key={`legend-${index}`}
                        className="flex items-center justify-between group hover:bg-gray-200 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-all duration-200 border border-gray-200 dark:border-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600/80 hover:shadow-lg"
                      >
                        <div className="flex items-center space-x-2 mr-2">
                          <div 
                            className="w-3 h-3 rounded-sm flex-shrink-0" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                          />
                          <span 
                            className="text-sm whitespace-normal truncate max-w-[120px] font-medium"
                            style={{ color: COLORS[index % COLORS.length] }}
                          >
                            {entry.name}
                          </span>
                        </div>
                        <span className="text-sm font-medium bg-black/30 dark:bg-white/30 px-2 py-1 rounded-md">
                          {entry.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Geographic Breakdown Chart */}
              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg border border-gray-200 dark:border-gray-800/50">
                <div className="flex items-center mb-3">
                  <div className="w-1 h-4 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full mr-2"></div>
                  <h4 className="text-sm font-medium text-purple-300 dark:text-purple-600">Location Breakdown</h4>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="h-[320px] w-full md:w-1/2 max-w-[400px] mx-auto md:mx-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={locationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                          label={renderCustomPieLabel}
                          labelLine={true}
                        >
                          {locationData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]}
                              stroke="rgba(255,255,255,0.1)"
                              strokeWidth={1.5}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 md:mt-0 w-full md:w-1/2 md:pl-6">
                    {locationData.map((entry, index) => (
                      <div
                        key={`legend-${index}`}
                        className="flex items-center justify-between group hover:bg-gray-200 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-all duration-200 border border-gray-200 dark:border-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600/80 hover:shadow-lg"
                      >
                        <div className="flex items-center space-x-2 mr-2">
                          <div 
                            className="w-3 h-3 rounded-sm flex-shrink-0" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                          />
                          <span 
                            className="text-sm whitespace-normal truncate max-w-[120px] font-medium"
                            style={{ color: COLORS[index % COLORS.length] }}
                          >
                            {entry.name}
                          </span>
                        </div>
                        <span className="text-sm font-medium bg-black/30 dark:bg-white/30 px-2 py-1 rounded-md">
                          {entry.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Highlights */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400 flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full mr-3"></div>
                  Key Metrics
                </h3>
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                  Last Updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center">
                      <div className="w-1 h-3 bg-green-500 dark:bg-green-400 rounded-full mr-2"></div>
                      Annual Revenue Growth
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">YoY</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mr-3 flex items-baseline">
                      {Math.round((Number(financials.yearly[3].revenue) / Number(financials.yearly[2].revenue) - 1) * 100)}%
                      <span className="text-green-600 dark:text-green-400 text-sm ml-1">↑</span>
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full border border-green-200 dark:border-green-700">
                      +{Math.round((Number(financials.yearly[3].revenue) / Number(financials.yearly[2].revenue) - 1) * 100 - 5)}% vs prev
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center">
                      <div className="w-1 h-3 bg-blue-500 dark:bg-blue-400 rounded-full mr-2"></div>
                      Profit Margin
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">Current</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mr-3">
                      {Math.round((Number(financials.yearly[3].profit) / Number(financials.yearly[3].revenue)) * 100)}%
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full border border-green-200 dark:border-green-700">
                      Industry Avg: {Math.round((Number(financials.yearly[3].profit) / Number(financials.yearly[3].revenue)) * 100) - 3}%
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center">
                      <div className="w-1 h-3 bg-purple-500 dark:bg-purple-400 rounded-full mr-2"></div>
                      Q4 Performance
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">vs Q3</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mr-3 flex items-baseline">
                      {(((Number(financials.quarterly[3].revenue) / Number(financials.quarterly[2].revenue)) - 1) * 100).toFixed(1)}%
                      <span className={`${financials.quarterly[3].revenue > financials.quarterly[2].revenue ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} text-sm ml-1`}>
                        {financials.quarterly[3].revenue > financials.quarterly[2].revenue ? '↑' : '↓'}
                      </span>
                    </div>
                    <div className={`text-xs ${financials.quarterly[3].revenue > financials.quarterly[2].revenue ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-700' : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-700'} px-2 py-1 rounded-full border`}>
                      {financials.quarterly[3].revenue > financials.quarterly[2].revenue ? 'Positive' : 'Negative'} Trend
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center">
                      <div className="w-1 h-3 bg-amber-500 dark:bg-amber-400 rounded-full mr-2"></div>
                      Year-over-year Growth
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">Q4/Q4</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mr-3 flex items-baseline">
                      {(Number(financials.quarterly[3].revenue) / Number(financials.quarterly[0].revenue) - 1) * 100 > 0 ? '+' : ''}
                      {((Number(financials.quarterly[3].revenue) / Number(financials.quarterly[0].revenue) - 1) * 100).toFixed(1)}%
                      <span className="text-blue-600 dark:text-blue-400 text-sm ml-1">↗</span>
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full border border-blue-200 dark:border-blue-700">
                      Forecast: +{(((Number(financials.quarterly[3].revenue) / Number(financials.quarterly[0].revenue) - 1) * 100) + 2.5).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
            
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="border rounded-md p-4 space-y-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{event.event}</h4>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                  <p className="text-sm pl-11">{event.details}</p>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 rounded-lg p-4 flex items-start">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex shrink-0 items-center justify-center mr-3 mt-0.5">
                <Info className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-sm">
                Event dates are estimated and may change. Set up alerts to stay updated on official announcements from {stock.name}.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ideas">
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Investment Ideas</h3>
            
            <div className="space-y-4">
              {ideas.map((idea, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex items-start mb-3">
                    <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-0.5">
                      <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                    <h4 className="font-medium text-amber-700">{idea.title}</h4>
                  </div>
                  <p className="text-sm pl-9">{idea.analysis}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                These ideas are for informational purposes only and do not constitute financial advice.
                Always conduct your own research before making investment decisions.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockFundamentals;
