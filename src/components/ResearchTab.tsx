import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, Clock, Star, BarChart2, PieChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Stock } from '@/types/portfolio';

interface ResearchTabProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
}

const ResearchTab: React.FC<ResearchTabProps> = ({ stocks, onSelectStock }) => {
  const [query, setQuery] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  
  // Predefined queries
  const predefinedQueries = [
    "How is my portfolio performing?",
    "What is my sector allocation?",
    "Which stocks are underperforming?",
    "What is my dividend yield?",
    "How diversified is my portfolio?"
  ];
  
  // Mock response data
  const mockResponses: Record<string, any> = {
    "How is my portfolio performing?": {
      text: "Your portfolio is up 16.6% overall, with a daily gain of 2.8%. Your top performer is TATAMOTORS (+40.0%), while INFY (-4.2%) is your only holding in the red.",
      data: {
        portfolioReturn: 16.6,
        dailyReturn: 2.8,
        topPerformer: { name: "TATAMOTORS", return: 40.0 },
        worstPerformer: { name: "INFY", return: -4.2 }
      }
    },
    "What is my sector allocation?": {
      text: "Your portfolio is allocated across 6 sectors: Information Technology (35%), Financial Services (25%), Energy (15%), Automobile (10%), Infrastructure (8%), and Telecommunication (7%).",
      data: {
        sectors: [
          { name: "Information Technology", allocation: 35 },
          { name: "Financial Services", allocation: 25 },
          { name: "Energy", allocation: 15 },
          { name: "Automobile", allocation: 10 },
          { name: "Infrastructure", allocation: 8 },
          { name: "Telecommunication", allocation: 7 }
        ]
      }
    },
    "Which stocks are underperforming?": {
      text: "One stock in your portfolio is underperforming the market: INFY (-4.2% vs market +2.8%). Consider reviewing your position or averaging down if you believe in its long-term prospects.",
      data: {
        underperformers: [
          { name: "INFY", return: -4.2, difference: -7.0 }
        ]
      }
    },
    "What is my dividend yield?": {
      text: "Your portfolio has an average dividend yield of 1.8%, with HDFCBANK (1.8%) and TCS (2.2%) providing the highest yields. Your annual dividend income is approximately ₹51,416.",
      data: {
        averageYield: 1.8,
        annualIncome: 51416,
        topYielders: [
          { name: "TCS", yield: 2.2 },
          { name: "HDFCBANK", yield: 1.8 }
        ]
      }
    },
    "How diversified is my portfolio?": {
      text: "Your portfolio diversification is good. You have exposure to 6 sectors, with Information Technology and Financial Services making up 60% of your holdings. Consider adding exposure to FMCG and Healthcare for better diversification.",
      data: {
        diversificationScore: 72,
        sectorCount: 6,
        topHeavySectors: [
          { name: "Information Technology", allocation: 35 },
          { name: "Financial Services", allocation: 25 }
        ],
        recommendedSectors: ["FMCG", "Healthcare"]
      }
    }
  };
  
  // Handle query submission
  const handleSubmit = () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Find closest matching predefined query
      const matchingQuery = predefinedQueries.find(q => 
        q.toLowerCase().includes(query.toLowerCase()) || 
        query.toLowerCase().includes(q.toLowerCase())
      );
      
      if (matchingQuery) {
        setResult(mockResponses[matchingQuery]);
      } else {
        setResult({
          text: "I'm not sure how to answer that question. Try asking about your portfolio performance, specific stocks, or diversification.",
          data: null
        });
      }
      
      setIsProcessing(false);
    }, 1500);
  };
  
  // Render chart based on query result
  const renderChart = () => {
    if (!result || !result.data) return null;
    
    if (result.data.sectors) {
      return (
        <div className="mt-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <PieChart className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            Sector Allocation
          </h3>
          <div className="space-y-2">
            {result.data.sectors.map((sector: any) => (
              <div key={sector.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{sector.name}</span>
                  <span>{sector.allocation}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 dark:bg-blue-500" 
                    style={{ width: `${sector.allocation}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (result.data.underperformers) {
      return (
        <div className="mt-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
            Underperforming Stocks
          </h3>
          <div className="space-y-3">
            {result.data.underperformers.map((stock: any) => (
              <div 
                key={stock.name} 
                className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
                onClick={() => {
                  const matchingStock = stocks.find(s => s.symbol === stock.name);
                  if (matchingStock) onSelectStock(matchingStock);
                }}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{stock.name}</span>
                  <span className="text-red-600 dark:text-red-400">{stock.return}%</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Underperforming market by {Math.abs(stock.difference).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (result.data.topPerformer) {
      return (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <BarChart2 className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
              Portfolio Performance
            </h3>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              +{result.data.portfolioReturn}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Daily: +{result.data.dailyReturn}%
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Top Performer</h3>
            <div 
              className="font-bold text-green-600 dark:text-green-400 cursor-pointer"
              onClick={() => {
                const matchingStock = stocks.find(s => s.symbol === result.data.topPerformer.name);
                if (matchingStock) onSelectStock(matchingStock);
              }}
            >
              {result.data.topPerformer.name}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              +{result.data.topPerformer.return}%
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Research & Analysis</h2>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center mb-4">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold">AI-Powered Portfolio Insights</h3>
        </div>
        
        <div className="flex space-x-2 mb-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Ask a question about your portfolio..." 
              className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Ask'}
          </Button>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Suggested Questions:</div>
          <div className="flex flex-wrap gap-2">
            {predefinedQueries.map((q, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setQuery(q);
                  setResult(null);
                }}
              >
                {q}
              </Button>
            ))}
          </div>
        </div>
        
        {isProcessing && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-pulse">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-200 dark:bg-blue-900/50 mr-3"></div>
              <div className="space-y-2">
                <div className="h-4 w-64 bg-blue-200 dark:bg-blue-900/50 rounded"></div>
                <div className="h-4 w-40 bg-blue-200 dark:bg-blue-900/50 rounded"></div>
              </div>
            </div>
          </div>
        )}
        
        {result && !isProcessing && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3 mt-1">
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-gray-100">{result.text}</p>
                {renderChart()}
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>Last updated: 16 Apr, 2025 • 15:30 IST</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Research Reports</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
              <Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">Quarterly Market Outlook</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Analysis of market trends and sector performance for Q2 2025.</p>
              <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                <span>Read Report</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </div>
            </div>
          </div>
          
          <div className="flex items-start border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
              <BarChart2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">IT Sector Deep Dive</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Comprehensive analysis of Indian IT companies and future outlook.</p>
              <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                <span>Read Report</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">Renewable Energy Stocks</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Investment opportunities in India's growing renewable energy sector.</p>
              <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                <span>Read Report</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchTab;
