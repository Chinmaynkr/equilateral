import React, { useState } from 'react';

// TypeScript interfaces for the component data
interface MarketIndex {
  name: string;
  value: number;
  change: number;
  percentChange: number;
  isUp: boolean;
  description: string;
}

interface SectorPerformance {
  name: string;
  change: number;
  isUp: boolean;
}

interface InstitutionalActivity {
  date: string;
  fii: {
    value: number;
    isUp: boolean;
  };
  dii: {
    value: number;
    isUp: boolean;
  };
}

interface MarketNews {
  title: string;
  source: string;
  time: string;
  category: string;
}
import { 
  BarChart, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  Calendar,
  LineChart,
  BarChart2
} from 'lucide-react';
import { Button } from './ui/button';

export function MarketInsights() {
  const [activeTab, setActiveTab] = useState<'indices' | 'sectors' | 'fii-dii'>('indices');

  // Indian market indices data
  const marketIndices: MarketIndex[] = [
    { 
      name: 'NIFTY 50', 
      value: 22345.65, 
      change: 156.35, 
      percentChange: 0.72, 
      isUp: true,
      description: 'Benchmark Indian stock market index that represents the weighted average of 50 of the largest Indian companies listed on the National Stock Exchange.'
    },
    { 
      name: 'SENSEX', 
      value: 73567.82, 
      change: 487.78, 
      percentChange: 0.68, 
      isUp: true,
      description: 'Free-float market-weighted stock market index of 30 well-established and financially sound companies listed on the Bombay Stock Exchange.'
    },
    { 
      name: 'NIFTY BANK', 
      value: 48234.75, 
      change: -124.65, 
      percentChange: -0.26, 
      isUp: false,
      description: 'Index comprising the most liquid and large capitalized Indian Banking stocks trading on the National Stock Exchange.'
    },
    { 
      name: 'NIFTY IT', 
      value: 34789.45, 
      change: 345.67, 
      percentChange: 1.02, 
      isUp: true,
      description: 'Index that tracks the performance of IT companies listed on the National Stock Exchange of India.'
    },
    { 
      name: 'NIFTY MIDCAP 100', 
      value: 45678.32, 
      change: -234.56, 
      percentChange: -0.51, 
      isUp: false,
      description: 'Index representing the mid-cap segment of the market with 100 companies from the NIFTY 500 index.'
    }
  ];

  // Sector performance data
  const sectorPerformance: SectorPerformance[] = [
    { name: 'IT', change: 1.45, isUp: true },
    { name: 'FMCG', change: 0.87, isUp: true },
    { name: 'Banking', change: -0.26, isUp: false },
    { name: 'Pharma', change: 1.23, isUp: true },
    { name: 'Auto', change: -0.34, isUp: false },
    { name: 'Metal', change: 2.12, isUp: true },
    { name: 'Realty', change: -1.05, isUp: false },
    { name: 'Oil & Gas', change: 0.56, isUp: true }
  ];

  // FII and DII data
  const institutionalActivity: InstitutionalActivity[] = [
    { 
      date: '12 Jun 2023', 
      fii: { value: 1245.67, isUp: true }, 
      dii: { value: 876.45, isUp: true } 
    },
    { 
      date: '13 Jun 2023', 
      fii: { value: -876.34, isUp: false }, 
      dii: { value: 1345.78, isUp: true } 
    },
    { 
      date: '14 Jun 2023', 
      fii: { value: -456.78, isUp: false }, 
      dii: { value: 567.89, isUp: true } 
    },
    { 
      date: '15 Jun 2023', 
      fii: { value: 789.45, isUp: true }, 
      dii: { value: -234.56, isUp: false } 
    },
    { 
      date: '16 Jun 2023', 
      fii: { value: 1567.89, isUp: true }, 
      dii: { value: 678.90, isUp: true } 
    }
  ];

  // Market news
  const marketNews: MarketNews[] = [
    {
      title: 'RBI maintains repo rate at 6.5%, GDP growth projected at 7%',
      source: 'Economic Times',
      time: '2 hours ago',
      category: 'Economy'
    },
    {
      title: 'TCS announces ₹17,000 crore share buyback at ₹4,150 per share',
      source: 'Mint',
      time: '5 hours ago',
      category: 'Corporate'
    },
    {
      title: 'Reliance Industries unveils new green energy strategy',
      source: 'Business Standard',
      time: '7 hours ago',
      category: 'Energy'
    },
    {
      title: 'SEBI introduces new regulations for Alternative Investment Funds',
      source: 'Financial Express',
      time: '1 day ago',
      category: 'Regulation'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BarChart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Market Insights
        </h2>
        <div className="flex space-x-1">
          <Button 
            variant={activeTab === 'indices' ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setActiveTab('indices')}
            className="text-xs"
          >
            <LineChart className="h-4 w-4 mr-1" />
            Indices
          </Button>
          <Button 
            variant={activeTab === 'sectors' ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setActiveTab('sectors')}
            className="text-xs"
          >
            <BarChart2 className="h-4 w-4 mr-1" />
            Sectors
          </Button>
          <Button 
            variant={activeTab === 'fii-dii' ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setActiveTab('fii-dii')}
            className="text-xs"
          >
            <Calendar className="h-4 w-4 mr-1" />
            FII/DII
          </Button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'indices' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketIndices.map((index) => (
                <div 
                  key={index.name} 
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{index.name}</h3>
                      <div className="text-2xl font-bold mt-1">₹{index.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                    <div className={`flex items-center ${index.isUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {index.isUp ? (
                        <ArrowUpRight className="h-5 w-5 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 mr-1" />
                      )}
                      <div>
                        <div className="text-sm font-medium">
                          {index.isUp ? '+' : ''}{index.change.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="text-xs">
                          {index.isUp ? '+' : ''}{index.percentChange.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{index.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                Market News
              </h3>
              <div className="space-y-2">
                {marketNews.map((news, index) => (
                  <div key={index} className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">{news.title}</h4>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                        {news.category}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {news.source} • {news.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sectors' && (
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <BarChart2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-1" />
              Sector Performance (Today)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sectorPerformance.map((sector) => (
                <div 
                  key={sector.name}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{sector.name}</h4>
                    <div className={`flex items-center ${sector.isUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {sector.isUp ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">
                        {sector.isUp ? '+' : ''}{sector.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium flex items-center">
                  <Info className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-1" />
                  Sector Insights
                </h3>
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded-lg text-sm">
                <p className="text-indigo-900 dark:text-indigo-200">
                  <span className="font-medium">IT sector leads gains:</span> The IT sector is outperforming today with a 1.45% increase, driven by strong quarterly results from TCS and positive global tech sentiment.
                </p>
                <p className="text-indigo-900 dark:text-indigo-200 mt-2">
                  <span className="font-medium">Metal stocks surge:</span> Metal stocks are showing strength with a 2.12% gain as commodity prices rise globally and domestic demand remains robust.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fii-dii' && (
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-1" />
              FII/DII Activity (Last 5 Trading Days, in ₹ Crore)
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">FII (₹ Cr)</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">DII (₹ Cr)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {institutionalActivity.map((day) => (
                    <tr key={day.date} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">{day.date}</td>
                      <td className={`px-3 py-2 whitespace-nowrap text-sm ${day.fii.isUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {day.fii.isUp ? '+' : ''}{day.fii.value.toFixed(2)}
                      </td>
                      <td className={`px-3 py-2 whitespace-nowrap text-sm ${day.dii.isUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {day.dii.isUp ? '+' : ''}{day.dii.value.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h4 className="text-sm font-medium mb-2">FII/DII Trend Analysis</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                FIIs have been net buyers in 3 out of the last 5 trading sessions, injecting ₹2,270 crore into Indian equities. 
                DIIs continue to show strong support with consistent buying, particularly on days with FII outflows, 
                demonstrating confidence in the Indian market's long-term prospects.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
