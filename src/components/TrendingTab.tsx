import React from 'react';
import TrendingStocks from './TrendingStocks';
import { Flame, BarChart2, LineChart, TrendingUp, PieChart, ArrowUp, ArrowDown } from 'lucide-react';
import { Stock } from '@/types/portfolio';

interface TrendingTabProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
}

const TrendingTab: React.FC<TrendingTabProps> = ({ stocks, onSelectStock }) => {
  // Trending stocks data
  const trendingStocks: Stock[] = [
    {
      id: '1',
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      quantity: 0,
      avgPrice: 0,
      ltp: 2896.75,
      changeToday: 1.8,
      sector: 'Oil & Gas',
      marketCap: '₹19.45T',
    },
    {
      id: '2',
      symbol: 'ADANIENT',
      name: 'Adani Enterprises',
      quantity: 0,
      avgPrice: 0,
      ltp: 2845.60,
      changeToday: 3.2,
      sector: 'Diversified',
      marketCap: '₹3.24T',
    },
    {
      id: '3',
      symbol: 'TATAMOTORS',
      name: 'Tata Motors',
      quantity: 0,
      avgPrice: 0,
      ltp: 1025.75,
      changeToday: 2.3,
      sector: 'Automobile',
      marketCap: '₹3.41T',
    },
    {
      id: '4',
      symbol: 'HDFCBANK',
      name: 'HDFC Bank',
      quantity: 0,
      avgPrice: 0,
      ltp: 1678.25,
      changeToday: 0.2,
      sector: 'Banking',
      marketCap: '₹12.65T',
    },
    {
      id: '5',
      symbol: 'INFY',
      name: 'Infosys',
      quantity: 0,
      avgPrice: 0,
      ltp: 1521.40,
      changeToday: -0.4,
      sector: 'IT',
      marketCap: '₹6.28T',
    },
    {
      id: '6',
      symbol: 'BHARTIARTL',
      name: 'Bharti Airtel',
      quantity: 0,
      avgPrice: 0,
      ltp: 1245.60,
      changeToday: 1.5,
      sector: 'Telecom',
      marketCap: '₹7.12T',
    }
  ];

  // Market data
  const marketData = {
    indices: [
      { name: 'NIFTY 50', value: '22,456.80', change: '+1.2%', status: 'up' },
      { name: 'SENSEX', value: '73,872.54', change: '+0.9%', status: 'up' },
      { name: 'NIFTY BANK', value: '48,126.35', change: '-0.3%', status: 'down' },
      { name: 'NIFTY IT', value: '34,567.89', change: '-0.7%', status: 'down' },
    ],
    sectors: [
      { name: 'Technology', change: '+2.4%', status: 'up' },
      { name: 'Healthcare', change: '+1.8%', status: 'up' },
      { name: 'Financials', change: '-0.7%', status: 'down' },
      { name: 'Consumer Discretionary', change: '+0.9%', status: 'up' },
      { name: 'Energy', change: '-1.2%', status: 'down' },
      { name: 'Industrials', change: '+0.3%', status: 'up' },
      { name: 'Materials', change: '-0.5%', status: 'down' },
      { name: 'Utilities', change: '+0.6%', status: 'up' },
    ],
    topGainers: [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', change: '+4.8%', volume: '89.4M' },
      { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.', change: '+5.1%', volume: '124.7M' },
      { symbol: 'WIPRO', name: 'Wipro Ltd.', change: '+4.8%', volume: '42.7M' },
    ],
    topLosers: [
      { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.', change: '-3.9%', volume: '15.8M' },
      { symbol: 'TATASTEEL', name: 'Tata Steel Ltd.', change: '-2.7%', volume: '18.3M' },
      { symbol: 'INFY', name: 'Infosys Ltd.', change: '-1.4%', volume: '22.1M' },
    ],
    news: [
      { 
        title: 'RBI signals potential rate cuts later this year', 
        source: 'Financial Times',
        time: '2h ago',
        sentiment: 'positive'
      },
      { 
        title: 'Tech stocks rally on AI optimism, Reliance leads gains', 
        source: 'Bloomberg',
        time: '4h ago',
        sentiment: 'positive'
      },
      { 
        title: 'Oil prices drop amid concerns over global demand', 
        source: 'Reuters',
        time: '6h ago',
        sentiment: 'negative'
      },
      { 
        title: 'Treasury yields fall as inflation data comes in below expectations', 
        source: 'CNBC',
        time: '8h ago',
        sentiment: 'neutral'
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Market Trends</h2>
      
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Indices */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
            <span>Market Indices</span>
          </h3>
          <div className="space-y-3">
            {marketData.indices.map((index) => (
              <div key={index.name} className="flex justify-between items-center p-2 border-b border-gray-100 dark:border-gray-800">
                <span className="font-medium">{index.name}</span>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">{index.value}</span>
                  <span className={`text-sm ${index.status === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {index.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Sector Performance */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <PieChart className="h-5 w-5 text-purple-500 mr-2" />
            <span>Sector Performance</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {marketData.sectors.map((sector) => (
              <div 
                key={sector.name} 
                className="flex justify-between items-center p-2 rounded-md border border-gray-100 dark:border-gray-800"
              >
                <span className="font-medium">{sector.name}</span>
                <span className={`text-sm font-semibold ${sector.status === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {sector.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Trending Stocks with Sentiment */}
      <TrendingStocks stocks={stocks} onSelect={onSelectStock} />
      

      
      {/* Market Movers */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold">Market Movers</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Top Gainers</h4>
            <div className="space-y-2">
              {marketData.topGainers.map((mover, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div>
                    <div className="font-medium">{mover.symbol}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{mover.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 dark:text-green-400 font-medium">{mover.change}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Vol: {mover.volume}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Top Losers</h4>
            <div className="space-y-2">
              {marketData.topLosers.map((mover, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div>
                    <div className="font-medium">{mover.symbol}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{mover.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 dark:text-red-400 font-medium">{mover.change}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Vol: {mover.volume}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      

      
      {/* Market News */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
            <LineChart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold">Market News</h3>
        </div>
        
        <div className="space-y-3">
          {marketData.news.map((news, index) => (
            <div key={index} className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <div className={`w-2 h-2 rounded-full mt-1.5 mr-3 ${
                news.sentiment === 'positive' 
                  ? 'bg-green-500' 
                  : news.sentiment === 'negative'
                    ? 'bg-red-500'
                    : 'bg-gray-500'
              }`}></div>
              <div className="flex-1">
                <div className="font-medium">{news.title}</div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{news.source}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{news.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingTab;
