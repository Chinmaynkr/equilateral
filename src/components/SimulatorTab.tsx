import React from 'react';
import WhatIfSimulator from './WhatIfSimulator';
import { Calculator, TrendingUp, BarChart2 } from 'lucide-react';
import { Stock } from '@/types/portfolio';

interface SimulatorTabProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
}

// Strategy type definition
interface Strategy {
  name: string;
  allocation: {
    stocks: number;
    bonds: number;
    cash: number;
  };
  returns: {
    oneYear: string;
    threeYear: string;
    fiveYear: string;
  };
  risk: string;
  description: string;
}

const SimulatorTab: React.FC<SimulatorTabProps> = ({ stocks, onSelectStock }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Portfolio Simulator</h2>
      
      {/* What If Simulator */}
      <WhatIfSimulator />
      
      {/* Strategy Comparison */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
            <BarChart2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold">Investment Strategies</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              name: 'Conservative', 
              allocation: { stocks: 40, bonds: 50, cash: 10 },
              returns: { oneYear: '+5.2%', threeYear: '+15.8%', fiveYear: '+24.3%' },
              risk: 'Low',
              description: 'Focus on capital preservation with moderate income and growth.'
            },
            { 
              name: 'Balanced', 
              allocation: { stocks: 60, bonds: 35, cash: 5 },
              returns: { oneYear: '+7.8%', threeYear: '+23.4%', fiveYear: '+38.6%' },
              risk: 'Medium',
              description: 'Balance between growth and income with moderate risk tolerance.'
            },
            { 
              name: 'Growth', 
              allocation: { stocks: 80, bonds: 15, cash: 5 },
              returns: { oneYear: '+10.4%', threeYear: '+31.2%', fiveYear: '+52.1%' },
              risk: 'High',
              description: 'Focus on long-term capital appreciation with higher volatility.'
            },
          ].map((strategy, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold">{strategy.name}</h4>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  strategy.risk === 'Low' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                    : strategy.risk === 'Medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  {strategy.risk} Risk
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{strategy.description}</p>
              
              <div className="mb-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Asset Allocation</div>
                <div className="h-4 w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${strategy.allocation.stocks}%` }}
                  ></div>
                  <div 
                    className="h-full bg-purple-500" 
                    style={{ width: `${strategy.allocation.bonds}%` }}
                  ></div>
                  <div 
                    className="h-full bg-gray-500" 
                    style={{ width: `${strategy.allocation.cash}%` }}
                  ></div>
                </div>
                <div className="flex text-xs mt-1 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center mr-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                    Stocks {strategy.allocation.stocks}%
                  </div>
                  <div className="flex items-center mr-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                    Bonds {strategy.allocation.bonds}%
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-1"></div>
                    Cash {strategy.allocation.cash}%
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white dark:bg-gray-900 p-2 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400">1Y Return</div>
                  <div className="text-green-600 dark:text-green-400 font-medium">{strategy.returns.oneYear}</div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-2 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400">3Y Return</div>
                  <div className="text-green-600 dark:text-green-400 font-medium">{strategy.returns.threeYear}</div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-2 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400">5Y Return</div>
                  <div className="text-green-600 dark:text-green-400 font-medium">{strategy.returns.fiveYear}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Backtesting Tool */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
            <Calculator className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold">Backtesting Tool</h3>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900/30 text-center">
          <div className="text-blue-800 dark:text-blue-300 mb-2">Coming Soon</div>
          <p className="text-sm text-blue-700/80 dark:text-blue-400/80">
            Our advanced backtesting tool will allow you to test investment strategies against historical market data. 
            See how your portfolio would have performed during different market conditions and optimize your strategy accordingly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulatorTab;
