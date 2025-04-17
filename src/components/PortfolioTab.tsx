import React, { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, Area, AreaChart } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Briefcase, TrendingUp, Filter, PieChart as PieChartIcon, BarChart2, Wallet, TrendingDown, DollarSign, Calendar, Percent, Activity, AlertCircle, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Stock } from '@/types/portfolio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface PortfolioTabProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
}

const PortfolioTab: React.FC<PortfolioTabProps> = ({ stocks, onSelectStock }) => {
  // State for allocation view
  const [allocationType, setAllocationType] = useState<'sector' | 'marketCap' | 'assetType'>('sector');
  
  // State for performance time period
  const [timePeriod, setTimePeriod] = useState<'1M' | '3M' | '6M' | '1Y' | 'All'>('1M');
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  
  // State for filtering
  const [filterConfig, setFilterConfig] = useState<{ sector?: string; priceRange?: [number, number]; gainLoss?: 'gain' | 'loss' | 'all' }>({ gainLoss: 'all' });

  // Sample portfolio data
  const portfolioData = {
    sector: [
      { name: 'Information Technology', value: 30, color: '#3b82f6' },
      { name: 'Financial Services', value: 25, color: '#10b981' },
      { name: 'Infrastructure', value: 15, color: '#f59e0b' },
      { name: 'Automobile', value: 17, color: '#8b5cf6' },
      { name: 'Defence', value: 13, color: '#ef4444' },
    ],
    marketCap: [
      { name: 'Large Cap', value: 55, color: '#3b82f6' },
      { name: 'Mid Cap', value: 30, color: '#10b981' },
      { name: 'Small Cap', value: 15, color: '#f59e0b' },
    ],
    assetType: [
      { name: 'Equity', value: 70, color: '#3b82f6' },
      { name: 'Debt', value: 15, color: '#10b981' },
      { name: 'Gold', value: 10, color: '#f59e0b' },
      { name: 'Cash', value: 5, color: '#8b5cf6' },
    ]
  };

  const performanceData = [
    { name: 'Jan', return: 5.2, benchmark: 4.1 },
    { name: 'Feb', return: -2.1, benchmark: -1.8 },
    { name: 'Mar', return: 3.8, benchmark: 2.9 },
    { name: 'Apr', return: 1.5, benchmark: 1.2 },
    { name: 'May', return: 4.2, benchmark: 3.5 },
    { name: 'Jun', return: -1.3, benchmark: -0.9 },
    { name: 'Jul', return: 2.8, benchmark: 2.3 },
    { name: 'Aug', return: 3.1, benchmark: 2.7 },
  ];

  // Portfolio metrics
  const portfolioMetrics = {
    cagr: 12.5,
    volatility: 15.2,
    sharpeRatio: 0.82,
    beta: 1.05,
    alpha: 2.3,
    drawdown: -8.4,
  };
  
  // Daily performance data
  const dailyPerformance = [
    { time: '9:15', value: 100 },
    { time: '10:00', value: 101.2 },
    { time: '11:00', value: 100.8 },
    { time: '12:00', value: 102.1 },
    { time: '13:00', value: 101.5 },
    { time: '14:00', value: 103.2 },
    { time: '15:00', value: 102.7 },
    { time: '15:30', value: 103.5 },
  ];

  // Calculate portfolio value
  const portfolioValue = stocks.reduce(
    (total, stock) => total + stock.quantity * stock.ltp, 
    0
  );

  // Calculate total gain/loss
  const totalInvestment = stocks.reduce(
    (total, stock) => total + stock.quantity * stock.avgPrice, 
    0
  );
  const totalGainLoss = portfolioValue - totalInvestment;
  const totalGainLossPercent = (totalGainLoss / totalInvestment) * 100;
  
  // Sort function
  const sortedStocks = [...stocks];
  
  if (sortConfig !== null) {
    sortedStocks.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortConfig.key) {
        case 'symbol':
          aValue = a.symbol;
          bValue = b.symbol;
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'quantity':
          aValue = a.quantity;
          bValue = b.quantity;
          break;
        case 'avgPrice':
          aValue = a.avgPrice;
          bValue = b.avgPrice;
          break;
        case 'ltp':
          aValue = a.ltp;
          bValue = b.ltp;
          break;
        case 'marketValue':
          aValue = a.quantity * a.ltp;
          bValue = b.quantity * b.ltp;
          break;
        case 'todayChange':
          aValue = a.changeToday;
          bValue = b.changeToday;
          break;
        case 'gainLoss':
          aValue = (a.ltp - a.avgPrice) / a.avgPrice * 100;
          bValue = (b.ltp - b.avgPrice) / b.avgPrice * 100;
          break;
        default:
          aValue = a.symbol;
          bValue = b.symbol;
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }
  
  // Filter function
  const filteredStocks = sortedStocks.filter(stock => {
    // Filter by sector if specified
    if (filterConfig.sector && stock.sector !== filterConfig.sector) {
      return false;
    }
    
    // Filter by price range if specified
    if (filterConfig.priceRange) {
      const [min, max] = filterConfig.priceRange;
      if (stock.ltp < min || stock.ltp > max) {
        return false;
      }
    }
    
    // Filter by gain/loss if specified
    if (filterConfig.gainLoss !== 'all') {
      const isGain = (stock.ltp - stock.avgPrice) > 0;
      if ((filterConfig.gainLoss === 'gain' && !isGain) || 
          (filterConfig.gainLoss === 'loss' && isGain)) {
        return false;
      }
    }
    
    return true;
  });
  
  // Handle sort request
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };
  
  // Get performance data based on selected time period
  const getPerformanceData = useCallback(() => {
    switch (timePeriod) {
      case '1M':
        // For 1M, return daily data points instead of just one monthly point
        return [
          { name: 'Week 1', return: 1.2, benchmark: 0.8 },
          { name: 'Week 2', return: 2.5, benchmark: 1.9 },
          { name: 'Week 3', return: 1.8, benchmark: 1.5 },
          { name: 'Week 4', return: 3.1, benchmark: 2.7 },
        ];
      case '3M':
        return performanceData.slice(-3);
      case '6M':
        return performanceData.slice(-6);
      case '1Y':
        return performanceData;
      case 'All':
        return performanceData;
      default:
        return performanceData.slice(-1);
    }
  }, [timePeriod]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio</h2>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Value Card */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Value</div>
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-2xl font-bold">₹{portfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          <div className="flex justify-between items-center mt-2">
            <div className={`flex items-center ${totalGainLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {totalGainLoss >= 0 ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              <span>{totalGainLoss >= 0 ? '+' : ''}₹{Math.abs(totalGainLoss).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className={`text-sm font-medium ${totalGainLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400">Today's Change</div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
              <div 
                className={`h-full rounded-full ${totalGainLossPercent >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(Math.abs(totalGainLossPercent) * 2, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Day's Performance */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Today's Performance</div>
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="h-16 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyPerformance} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm font-medium">Open: ₹100.00</div>
            <div className="text-sm font-medium text-green-600 dark:text-green-400">Current: ₹103.50</div>
          </div>
        </div>

        {/* Available Funds */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Available Funds</div>
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="text-2xl font-bold">₹5,78,450</div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Available Margin</div>
          <div className="flex justify-between items-center mt-1">
            <div className="text-sm">₹10,00,000</div>
            <div className="text-sm text-green-600 dark:text-green-400">57.8% Used</div>
          </div>
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '57.8%' }}></div>
          </div>
        </div>

        {/* Portfolio Health */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Portfolio Health</div>
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="text-2xl font-bold">78<span className="text-lg font-normal">/100</span></div>
          <div className="mt-2 space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Diversification</span>
                <span className="font-medium">Good</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Risk Level</span>
                <span className="font-medium">Moderate</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Performance</span>
                <span className="font-medium">Excellent</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
              <PieChartIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold">Asset Allocation</h3>
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-md p-1">
            <button 
              className={`px-3 py-1 text-sm rounded-md ${allocationType === 'sector' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              onClick={() => setAllocationType('sector')}
            >
              Sector
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${allocationType === 'marketCap' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              onClick={() => setAllocationType('marketCap')}
            >
              Market Cap
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${allocationType === 'assetType' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              onClick={() => setAllocationType('assetType')}
            >
              Asset Type
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Allocation Summary Bar */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            {/* Labels above the bar (even indices) */}
            <div className="relative w-full h-12"> {/* Increased height for more spacing */}
              {portfolioData[allocationType].map((item, index, array) => {
                // Only show labels with even indices above the bar
                if (index % 2 !== 0) return null;
                
                // Calculate the left position based on previous items
                let leftPosition = 0;
                for (let i = 0; i < index; i++) {
                  leftPosition += array[i].value;
                }
                // Add half of current item's width to center the label
                leftPosition += (item.value / 2);
                
                return (
                  <>
                    {/* Connecting line */}
                    <div 
                      className="absolute bottom-0 w-px transform -translate-x-1/2"
                      style={{ 
                        left: `${leftPosition}%`,
                        height: '10px', /* Line height */
                        bottom: '0', /* Connect directly to pill */
                        transition: 'left 0.5s ease',
                        backgroundColor: item.color /* Match pill color */
                      }}
                    ></div>
                    
                    {/* Label */}
                    <div 
                      key={`top-${index}`} 
                      className="absolute text-xs font-medium px-1.5 py-0.5 rounded-md transform -translate-x-1/2"
                      style={{ 
                        left: `${leftPosition}%`,
                        bottom: '10px', /* Position closer to the line */
                        backgroundColor: item.color, 
                        color: '#fff',
                        transition: 'left 0.5s ease',
                        zIndex: 10,
                        maxWidth: '180px',
                        whiteSpace: 'nowrap',
                        overflow: 'visible'
                      }}
                    >
                      {item.name}: {item.value}%
                    </div>
                  </>
                );
              })}
            </div>
            
            {/* The allocation bar */}
            <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
              {portfolioData[allocationType].map((item, index) => (
                <div 
                  key={index} 
                  className="h-full relative" 
                  style={{ 
                    width: `${item.value}%`, 
                    backgroundColor: item.color,
                    transition: 'width 0.5s ease'
                  }}
                  title={`${item.name}: ${item.value}%`}
                >
                  {/* Center indicator */}
                  <div className="absolute top-0 left-1/2 w-px h-full bg-white bg-opacity-20 transform -translate-x-1/2"></div>
                </div>
              ))}
            </div>
            
            {/* Labels below the bar (odd indices) */}
            <div className="relative w-full h-12"> {/* Increased height for more spacing */}
              {portfolioData[allocationType].map((item, index, array) => {
                // Only show labels with odd indices below the bar
                if (index % 2 === 0) return null;
                
                // Calculate the left position based on previous items
                let leftPosition = 0;
                for (let i = 0; i < index; i++) {
                  leftPosition += array[i].value;
                }
                // Add half of current item's width to center the label
                leftPosition += (item.value / 2);
                
                return (
                  <>
                    {/* Connecting line */}
                    <div 
                      className="absolute top-0 w-px transform -translate-x-1/2"
                      style={{ 
                        left: `${leftPosition}%`,
                        height: '10px', /* Line height */
                        top: '0', /* Connect directly to pill */
                        transition: 'left 0.5s ease',
                        backgroundColor: item.color /* Match pill color */
                      }}
                    ></div>
                    
                    {/* Label */}
                    <div 
                      key={`bottom-${index}`} 
                      className="absolute text-xs font-medium px-1.5 py-0.5 rounded-md transform -translate-x-1/2"
                      style={{ 
                        left: `${leftPosition}%`,
                        top: '10px', /* Position closer to the line */
                        backgroundColor: item.color, 
                        color: '#fff',
                        transition: 'left 0.5s ease',
                        zIndex: 10,
                        maxWidth: '180px',
                        whiteSpace: 'nowrap',
                        overflow: 'visible'
                      }}
                    >
                      {item.name}: {item.value}%
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          
          {/* Allocation Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {portfolioData[allocationType].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-10 rounded-sm mr-3" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Allocation</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold">{item.value}%</div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Value</div>
                  <div className="text-lg font-semibold">₹{((item.value / 100) * portfolioValue).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${item.value}%`, 
                      backgroundColor: item.color,
                      transition: 'width 0.3s ease'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Percent className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
              <span className="text-sm font-medium">Allocation Insights</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 break-words">
              {allocationType === 'sector' && 'Your portfolio is heavily weighted towards Technology (35%). Consider diversifying into other sectors like Healthcare or Consumer Staples to reduce sector-specific risk.'}
              {allocationType === 'marketCap' && 'Large-cap stocks dominate your portfolio (55%). This provides stability but may limit growth potential. Consider adding some mid-cap exposure for better long-term returns.'}
              {allocationType === 'assetType' && 'Your portfolio is primarily equity-focused (70%). Consider adding more debt instruments or gold for better balance and to reduce volatility during market downturns.'}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                View Recommendations
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Rebalance Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-3">
                <Briefcase className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold">Your Holdings</h3>
            </div>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center text-xs transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95"
                  >
                    <Filter className="h-3 w-3 mr-1" />
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-3">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Sector</h4>
                      <select 
                        className="w-full p-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                        value={filterConfig.sector || ''}
                        onChange={(e) => setFilterConfig(prev => ({ ...prev, sector: e.target.value || undefined }))}
                      >
                        <option value="">All Sectors</option>
                        <option value="Oil & Gas">Oil & Gas</option>
                        <option value="Banking">Banking</option>
                        <option value="IT">IT</option>
                        <option value="Automobile">Automobile</option>
                        <option value="Telecom">Telecom</option>
                        <option value="Diversified">Diversified</option>
                      </select>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Performance</h4>
                      <div className="flex space-x-2">
                        <Button 
                          variant={filterConfig.gainLoss === 'all' ? 'default' : 'outline'} 
                          size="sm" 
                          className="text-xs flex-1"
                          onClick={() => setFilterConfig(prev => ({ ...prev, gainLoss: 'all' }))}
                        >
                          All
                        </Button>
                        <Button 
                          variant={filterConfig.gainLoss === 'gain' ? 'default' : 'outline'} 
                          size="sm" 
                          className="text-xs flex-1"
                          onClick={() => setFilterConfig(prev => ({ ...prev, gainLoss: 'gain' }))}
                        >
                          Profit
                        </Button>
                        <Button 
                          variant={filterConfig.gainLoss === 'loss' ? 'default' : 'outline'} 
                          size="sm" 
                          className="text-xs flex-1"
                          onClick={() => setFilterConfig(prev => ({ ...prev, gainLoss: 'loss' }))}
                        >
                          Loss
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs mt-2"
                      onClick={() => setFilterConfig({ gainLoss: 'all' })}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center text-xs transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95"
                  >
                    <ArrowUpDown className="h-3 w-3 mr-1" />
                    Sort
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium mb-1">Sort By</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-between text-xs"
                      onClick={() => requestSort('symbol')}
                    >
                      <span>Symbol</span>
                      {sortConfig?.key === 'symbol' && (
                        sortConfig.direction === 'ascending' ? 
                          <ArrowUp className="h-3 w-3" /> : 
                          <ArrowDown className="h-3 w-3" />
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-between text-xs"
                      onClick={() => requestSort('quantity')}
                    >
                      <span>Quantity</span>
                      {sortConfig?.key === 'quantity' && (
                        sortConfig.direction === 'ascending' ? 
                          <ArrowUp className="h-3 w-3" /> : 
                          <ArrowDown className="h-3 w-3" />
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-between text-xs"
                      onClick={() => requestSort('ltp')}
                    >
                      <span>Current Price</span>
                      {sortConfig?.key === 'ltp' && (
                        sortConfig.direction === 'ascending' ? 
                          <ArrowUp className="h-3 w-3" /> : 
                          <ArrowDown className="h-3 w-3" />
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-between text-xs"
                      onClick={() => requestSort('marketValue')}
                    >
                      <span>Market Value</span>
                      {sortConfig?.key === 'marketValue' && (
                        sortConfig.direction === 'ascending' ? 
                          <ArrowUp className="h-3 w-3" /> : 
                          <ArrowDown className="h-3 w-3" />
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-between text-xs"
                      onClick={() => requestSort('gainLoss')}
                    >
                      <span>Gain/Loss %</span>
                      {sortConfig?.key === 'gainLoss' && (
                        sortConfig.direction === 'ascending' ? 
                          <ArrowUp className="h-3 w-3" /> : 
                          <ArrowDown className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg Price</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Market Value</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Today</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Overall P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredStocks.map((stock) => {
                const marketValue = stock.quantity * stock.ltp;
                const gainLoss = stock.quantity * (stock.ltp - stock.avgPrice);
                const gainLossPercent = ((stock.ltp - stock.avgPrice) / stock.avgPrice) * 100;
                const todayChange = (stock.changeToday / 100) * stock.ltp * stock.quantity;
                
                return (
                  <tr 
                    key={stock.symbol} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                    onClick={() => onSelectStock(stock)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3 text-xs font-medium">
                          {stock.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                      <div className="font-medium">{stock.quantity}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{stock.sector}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                      <div className="font-medium">₹{stock.avgPrice.toFixed(2)}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Invested: ₹{(stock.quantity * stock.avgPrice).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                      <div className="font-medium">₹{stock.ltp.toFixed(2)}</div>
                      <div className={`text-xs ${stock.changeToday >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {stock.changeToday >= 0 ? '+' : ''}{stock.changeToday.toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                      <div className="font-medium">₹{marketValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{((marketValue / portfolioValue) * 100).toFixed(1)}% of portfolio</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className={`font-medium ${stock.changeToday >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {stock.changeToday >= 0 ? '+' : ''}₹{Math.abs(todayChange).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className={`font-medium ${gainLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {gainLoss >= 0 ? '+' : ''}₹{Math.abs(gainLoss).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                      <div className={`text-xs ${gainLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {gainLoss >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%
                      </div>
                      <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${gainLoss >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(Math.abs(gainLossPercent), 100)}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Portfolio Performance */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold">Portfolio Performance</h3>
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-md p-1 text-xs">
            <button 
              className={`px-2 py-1 rounded-md transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 ${timePeriod === '1M' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              onClick={() => setTimePeriod('1M')}
            >
              1M
            </button>
            <button 
              className={`px-2 py-1 rounded-md transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 ${timePeriod === '3M' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              onClick={() => setTimePeriod('3M')}
            >
              3M
            </button>
            <button 
              className={`px-2 py-1 rounded-md transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 ${timePeriod === '6M' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              onClick={() => setTimePeriod('6M')}
            >
              6M
            </button>
            <button 
              className={`px-2 py-1 rounded-md transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 ${timePeriod === '1Y' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              onClick={() => setTimePeriod('1Y')}
            >
              1Y
            </button>
            <button 
              className={`px-2 py-1 rounded-md transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 ${timePeriod === 'All' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
              onClick={() => setTimePeriod('All')}
            >
              All
            </button>
          </div>
        </div>
        
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getPerformanceData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Return']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="return" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Your Portfolio"
              />
              <Line 
                type="monotone" 
                dataKey="benchmark" 
                stroke="#9ca3af" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                name="Benchmark (Nifty 50)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400">CAGR</div>
            <div className="text-lg font-semibold text-green-600 dark:text-green-400">+{portfolioMetrics.cagr}%</div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400">Volatility</div>
            <div className="text-lg font-semibold">{portfolioMetrics.volatility}%</div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400">Sharpe Ratio</div>
            <div className="text-lg font-semibold">{portfolioMetrics.sharpeRatio}</div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400">Max Drawdown</div>
            <div className="text-lg font-semibold text-red-600 dark:text-red-400">{portfolioMetrics.drawdown}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTab;
