import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Calculator, TrendingUp, ArrowRight, Calendar, DollarSign } from 'lucide-react';

// Types
interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  stock: string;
  amount: number;
  timeframe: string;
  returnPercentage: number;
  actualReturn: number;
  hypotheticalReturn: number;
  chartData: {
    date: string;
    actual: number;
    hypothetical: number;
  }[];
}

// Mock scenarios
const predefinedScenarios: SimulationScenario[] = [
  {
    id: 'reliance-1m',
    name: 'Reliance Investment',
    description: 'What if I had invested ₹10,000 in Reliance last month?',
    stock: 'RELIANCE',
    amount: 10000,
    timeframe: '1M',
    returnPercentage: 13.7,
    actualReturn: 31020,
    hypotheticalReturn: 1370,
    chartData: [
      { date: 'Mar 15', actual: 226400, hypothetical: 10000 },
      { date: 'Mar 20', actual: 229800, hypothetical: 10150 },
      { date: 'Mar 25', actual: 234500, hypothetical: 10350 },
      { date: 'Apr 01', actual: 241200, hypothetical: 10650 },
      { date: 'Apr 05', actual: 248900, hypothetical: 10980 },
      { date: 'Apr 10', actual: 253200, hypothetical: 11170 },
      { date: 'Apr 15', actual: 257420, hypothetical: 11370 },
    ]
  },
  {
    id: 'tcs-3m',
    name: 'TCS Investment',
    description: 'What if I had invested ₹20,000 in TCS 3 months ago?',
    stock: 'TCS',
    amount: 20000,
    timeframe: '3M',
    returnPercentage: 68.5,
    actualReturn: 82200,
    hypotheticalReturn: 13700,
    chartData: [
      { date: 'Jan 15', actual: 120000, hypothetical: 20000 },
      { date: 'Jan 30', actual: 132000, hypothetical: 22000 },
      { date: 'Feb 15', actual: 150000, hypothetical: 25000 },
      { date: 'Feb 28', actual: 168000, hypothetical: 28000 },
      { date: 'Mar 15', actual: 180000, hypothetical: 30000 },
      { date: 'Mar 30', actual: 192000, hypothetical: 32000 },
      { date: 'Apr 15', actual: 202200, hypothetical: 33700 },
    ]
  },
  {
    id: 'infy-6m',
    name: 'Infosys Investment',
    description: 'What if I had invested ₹50,000 in Infosys 6 months ago?',
    stock: 'INFY',
    amount: 50000,
    timeframe: '6M',
    returnPercentage: 28.7,
    actualReturn: 57400,
    hypotheticalReturn: 14350,
    chartData: [
      { date: 'Oct 15', actual: 200000, hypothetical: 50000 },
      { date: 'Nov 15', actual: 210000, hypothetical: 52500 },
      { date: 'Dec 15', actual: 224000, hypothetical: 56000 },
      { date: 'Jan 15', actual: 232000, hypothetical: 58000 },
      { date: 'Feb 15', actual: 244000, hypothetical: 61000 },
      { date: 'Mar 15', actual: 252000, hypothetical: 63000 },
      { date: 'Apr 15', actual: 257400, hypothetical: 64350 },
    ]
  }
];

// Custom stocks for simulator
const availableStocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.' },
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.' },
  { symbol: 'INFY', name: 'Infosys Ltd.' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd.' },
  { symbol: 'WIPRO', name: 'Wipro Ltd.' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd.' }
];

// Timeframe options
const timeframeOptions = [
  { value: '1M', label: '1 Month' },
  { value: '3M', label: '3 Months' },
  { value: '6M', label: '6 Months' },
  { value: '1Y', label: '1 Year' }
];

const WhatIfSimulator = () => {
  const [activeScenario, setActiveScenario] = useState<SimulationScenario>(predefinedScenarios[0]);
  const [customStock, setCustomStock] = useState('RELIANCE');
  const [customAmount, setCustomAmount] = useState(10000);
  const [customTimeframe, setCustomTimeframe] = useState('1M');
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleCreateCustomScenario = () => {
    // In a real app, this would calculate based on actual historical data
    // For this demo, we'll just use the first scenario but modify some values
    const newScenario: SimulationScenario = {
      ...predefinedScenarios[0],
      id: `custom-${Date.now()}`,
      name: `${customStock} Investment`,
      description: `What if I had invested ₹${customAmount} in ${customStock} ${customTimeframe === '1M' ? 'last month' : customTimeframe === '3M' ? '3 months ago' : customTimeframe === '6M' ? '6 months ago' : 'last year'}?`,
      stock: customStock,
      amount: customAmount,
      timeframe: customTimeframe,
      // Randomize returns for demo purposes
      returnPercentage: Math.floor(10 + Math.random() * 40),
      actualReturn: Math.floor(customAmount * (0.1 + Math.random() * 0.4)),
      hypotheticalReturn: Math.floor(customAmount * (0.1 + Math.random() * 0.4)),
      chartData: predefinedScenarios[0].chartData.map(point => ({
        date: point.date,
        actual: Math.floor(customAmount * 20 * (1 + Math.random() * 0.3)),
        hypothetical: Math.floor(customAmount * (1 + Math.random() * 0.3))
      }))
    };
    
    setActiveScenario(newScenario);
    setIsCustomizing(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-sm text-xs">
          <p className="font-medium">{payload[0].payload.date}</p>
          <p className="text-blue-600 dark:text-blue-400">
            Actual: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-green-600 dark:text-green-400">
            Hypothetical: {formatCurrency(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
          <Calculator className="h-4 w-4 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-lg font-semibold">"What If?" Simulator</h3>
      </div>
      
      {!isCustomizing ? (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            {predefinedScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(scenario)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  activeScenario.id === scenario.id
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750'
                }`}
              >
                {scenario.description}
              </button>
            ))}
            <button
              onClick={() => setIsCustomizing(true)}
              className="px-3 py-1.5 text-xs rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800/30"
            >
              + Create Custom Scenario
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-1/3 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-900/30">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-green-600 dark:text-green-400" />
                Scenario Details
              </h4>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Stock</div>
                  <div className="font-medium">{activeScenario.stock}</div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Investment Amount</div>
                  <div className="font-medium">{formatCurrency(activeScenario.amount)}</div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Time Period</div>
                  <div className="font-medium">{activeScenario.timeframe}</div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Return</div>
                  <div className="font-medium text-green-600 dark:text-green-400">
                    +{activeScenario.returnPercentage}%
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Hypothetical Gain</div>
                    <div className="font-medium text-green-600 dark:text-green-400">
                      +{formatCurrency(activeScenario.hypotheticalReturn)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Actual Position Gain</div>
                    <div className="font-medium text-green-600 dark:text-green-400">
                      +{formatCurrency(activeScenario.actualReturn)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="h-64 md:h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={activeScenario.chartData}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.2)" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(156, 163, 175, 0.2)' }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `₹${value.toLocaleString()}`}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(156, 163, 175, 0.2)' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#3b82f6' }}
                      activeDot={{ r: 5 }}
                      name="Actual Position"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hypothetical" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#10b981' }}
                      activeDot={{ r: 5 }}
                      name="Hypothetical Investment"
                    />
                    <ReferenceLine 
                      y={activeScenario.chartData[0].hypothetical} 
                      stroke="rgba(16, 185, 129, 0.3)" 
                      strokeDasharray="3 3" 
                    />
                    <ReferenceLine 
                      y={activeScenario.chartData[0].actual} 
                      stroke="rgba(59, 130, 246, 0.3)" 
                      strokeDasharray="3 3" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-start">
              <div className="mr-2 mt-0.5">💡</div>
              <div>
                <p className="mb-1">
                  <span className="font-medium">Insight:</span> If you had invested {formatCurrency(activeScenario.amount)} in {activeScenario.stock} {activeScenario.timeframe === '1M' ? 'last month' : activeScenario.timeframe === '3M' ? '3 months ago' : activeScenario.timeframe === '6M' ? '6 months ago' : 'last year'}, you would have gained {formatCurrency(activeScenario.hypotheticalReturn)} (+{activeScenario.returnPercentage}%).
                </p>
                <p>Your actual position gained {formatCurrency(activeScenario.actualReturn)} during this period.</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900/30">
          <h4 className="text-sm font-medium mb-3">Create Custom Scenario</h4>
          
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Stock</label>
              <select
                value={customStock}
                onChange={(e) => setCustomStock(e.target.value)}
                className="w-full p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              >
                {availableStocks.map((stock) => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.symbol} - {stock.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Investment Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-400">₹</span>
                </div>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                  min={100}
                  max={100000}
                  step={100}
                  className="w-full p-2 pl-10 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Time Period</label>
              <div className="flex space-x-2">
                {timeframeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCustomTimeframe(option.value)}
                    className={`flex-1 py-1.5 text-xs rounded-md border transition-colors ${
                      customTimeframe === option.value
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setIsCustomizing(false)}
              className="flex-1 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCustomScenario}
              className="flex-1 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Calculator className="h-4 w-4 mr-1.5" />
              Calculate Scenario
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatIfSimulator;
