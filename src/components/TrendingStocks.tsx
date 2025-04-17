import React from 'react';
import { Flame, Snowflake, TrendingUp, BarChart2, ExternalLink } from 'lucide-react';

// Types
interface TrendingStock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  volume: string;
  marketCap: string;
  news: string[];
  redditMentions: number;
  twitterSentiment: number;
}

// Props interface
interface TrendingStocksProps {
  stocks?: any[];
  onSelect?: (stock: any) => void;
}

// Mock data for trending Indian stocks
const trendingStocksData: TrendingStock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    price: '₹2,924.79',
    change: '+₹142.31',
    changePercent: '+4.8%',
    sentiment: 'bullish',
    volume: '89.4M',
    marketCap: '₹19.78T',
    news: [
      'Reliance announces expansion in green energy sector',
      'Analysts raise Reliance price targets after earnings beat',
      'Reliance partners with global tech firms for digital transformation'
    ],
    redditMentions: 1842,
    twitterSentiment: 78
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd.',
    price: '₹3,572.63',
    change: '+₹108.45',
    changePercent: '+5.1%',
    sentiment: 'bullish',
    volume: '124.7M',
    marketCap: '₹13.1T',
    news: [
      'TCS wins major digital transformation deal',
      'Cloud services drive TCS revenue growth',
      'TCS announces expansion in AI capabilities'
    ],
    redditMentions: 1256,
    twitterSentiment: 65
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    price: '₹1,474.99',
    change: '+₹42.76',
    changePercent: '+2.8%',
    sentiment: 'bullish',
    volume: '32.1M',
    marketCap: '₹8.21T',
    news: [
      "HDFC Bank's digital initiatives showing strong results",
      'Retail loan growth accelerates in key segments',
      'HDFC Bank announces new fintech partnerships'
    ],
    redditMentions: 621,
    twitterSentiment: 61
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    price: '₹1,469.58',
    change: '+₹22.34',
    changePercent: '+1.4%',
    sentiment: 'neutral',
    volume: '56.3M',
    marketCap: '₹6.1T',
    news: [
      'Infosys partners with global banks for fintech solutions',
      'New CEO outlines vision for Infosys growth',
      'Services revenue continues to grow for Infosys'
    ],
    redditMentions: 743,
    twitterSentiment: 52
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd.',
    price: '₹1,002.78',
    change: '-₹44.35',
    changePercent: '-3.9%',
    sentiment: 'bearish',
    volume: '15.8M',
    marketCap: '₹5.62T',
    news: [
      'Airtel subscriber growth slows in key markets',
      'Competition intensifies in telecom space',
      'Spectrum costs continue to rise for Airtel'
    ],
    redditMentions: 532,
    twitterSentiment: 38
  },
  {
    symbol: 'WIPRO',
    name: 'Wipro Ltd.',
    price: '₹458.76',
    change: '+₹21.23',
    changePercent: '+4.8%',
    sentiment: 'bullish',
    volume: '42.7M',
    marketCap: '₹2.51T',
    news: [
      'Wipro gains market share in key verticals',
      'New digital services outperform expectations',
      'Wipro partners with Microsoft for AI acceleration'
    ],
    redditMentions: 876,
    twitterSentiment: 72
  }
];

const TrendingStocks: React.FC<TrendingStocksProps> = ({ stocks, onSelect }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mr-3">
            <Flame className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold">Trending Stocks + Sentiment</h3>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <BarChart2 className="h-3 w-3 mr-1" />
          Social sentiment powered by AI
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trendingStocksData.map((stock) => (
          <div 
            key={stock.symbol}
            className="relative overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow"
          >
            {/* Sentiment indicator */}
            <div className={`absolute top-0 left-0 w-1 h-full ${
              stock.sentiment === 'bullish' 
                ? 'bg-green-500' 
                : stock.sentiment === 'bearish' 
                  ? 'bg-red-500' 
                  : 'bg-gray-300 dark:bg-gray-700'
            }`} />
            
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center">
                  <span className="text-lg font-bold">{stock.symbol}</span>
                  <div className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                    stock.sentiment === 'bullish' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : stock.sentiment === 'bearish' 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
                  }`}>
                    {stock.sentiment === 'bullish' ? (
                      <div className="flex items-center">
                        <Flame className="h-3 w-3 mr-1" />
                        Bullish
                      </div>
                    ) : stock.sentiment === 'bearish' ? (
                      <div className="flex items-center">
                        <Snowflake className="h-3 w-3 mr-1" />
                        Bearish
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Neutral
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{stock.price}</div>
                <div className={`text-xs font-medium ${
                  stock.changePercent.startsWith('+') 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {stock.changePercent}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
              <div>Vol: {stock.volume}</div>
              <div>MCap: {stock.marketCap}</div>
            </div>
            
            <div className="mb-3">
              <div className="text-xs font-medium mb-1.5">Social Sentiment</div>
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="text-xs mb-1 flex justify-between">
                    <span>Reddit</span>
                    <span>{stock.redditMentions} mentions</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${Math.min(100, stock.redditMentions / 20)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs mb-1 flex justify-between">
                    <span>Twitter</span>
                    <span>{stock.twitterSentiment}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        stock.twitterSentiment > 60 
                          ? 'bg-green-500' 
                          : stock.twitterSentiment > 40 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${stock.twitterSentiment}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-xs">
              <div className="font-medium mb-1">Recent News</div>
              <ul className="space-y-1">
                {stock.news.slice(0, 1).map((item, idx) => (
                  <li key={idx} className="truncate text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center">
                    {item}
                    <ExternalLink className="h-2.5 w-2.5 ml-1 inline-block" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingStocks;
