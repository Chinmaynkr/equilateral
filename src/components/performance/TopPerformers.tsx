
import React from "react";
import { Stock } from "@/types/portfolio";
import { calculateStockPnL, formatCurrency, formatPercentage } from "@/utils/portfolioUtils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

interface TopPerformersProps {
  stocks: Stock[];
}

const TopPerformers = ({ stocks }: TopPerformersProps) => {
  // Sort stocks by percentage P&L
  const sortedStocks = [...stocks].sort((a, b) => {
    const pnlA = calculateStockPnL(a).percentage;
    const pnlB = calculateStockPnL(b).percentage;
    return pnlB - pnlA;
  });
  
  // Get top 3 gainers and losers
  const gainers = sortedStocks.filter(s => calculateStockPnL(s).percentage > 0).slice(0, 3);
  const losers = [...sortedStocks].filter(s => calculateStockPnL(s).percentage < 0)
    .sort((a, b) => calculateStockPnL(a).percentage - calculateStockPnL(b).percentage).slice(0, 3);

  // Function to generate chart data for a stock
  const generateSparklineData = (stock: Stock, isGainer: boolean) => {
    const baseValue = stock.ltp * 0.9;
    const volatility = 0.03;
    const trend = isGainer ? 0.01 : -0.01;
    
    const data = Array.from({ length: 20 }, (_, i) => {
      const randomFactor = (Math.random() - 0.5) * volatility * baseValue;
      const trendFactor = trend * i * baseValue * 0.02;
      return baseValue * (1 + (i * 0.01)) + randomFactor + trendFactor;
    });

    // Reverse data array for losers to show downward trend
    return isGainer ? data : data.reverse();
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-base">Best vs. Worst Performing</h3>
      
      <div>
        <h4 className="text-sm text-muted-foreground mb-2 flex items-center">
          <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
          Top Gainers
        </h4>
        <div className="space-y-2">
          {gainers.map(stock => {
            const { absolute, percentage } = calculateStockPnL(stock);
            const sparklineData = generateSparklineData(stock, true);
            
            return (
              <Card key={stock.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="w-1/3">
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                    
                    <div className="text-right w-1/3">
                      <p className="font-medium text-green-600">{formatPercentage(percentage)}</p>
                      <p className="text-xs">{formatCurrency(absolute)}</p>
                    </div>
                    
                    <div className="w-20 h-12">
                      {/* Improved sparkline config with proper size and rendering */}
                      <Sparklines data={sparklineData} height={30} width={80} margin={3}>
                        <SparklinesLine style={{ stroke: "#10B981", fillOpacity: 0, strokeWidth: 1.5 }} />
                        <SparklinesSpots size={2} style={{ fill: "#10B981" }} />
                      </Sparklines>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm text-muted-foreground mb-2 flex items-center">
          <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
          Top Losers
        </h4>
        <div className="space-y-2">
          {losers.map(stock => {
            const { absolute, percentage } = calculateStockPnL(stock);
            const sparklineData = generateSparklineData(stock, false);
            
            return (
              <Card key={stock.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="w-1/3">
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                    
                    <div className="text-right w-1/3">
                      <p className="font-medium text-red-600">{formatPercentage(percentage)}</p>
                      <p className="text-xs">{formatCurrency(absolute)}</p>
                    </div>
                    
                    <div className="w-20 h-12">
                      {/* Improved sparkline config with proper size and rendering */}
                      <Sparklines data={sparklineData} height={30} width={80} margin={3}>
                        <SparklinesLine style={{ stroke: "#EF4444", fillOpacity: 0, strokeWidth: 1.5 }} />
                        <SparklinesSpots size={2} style={{ fill: "#EF4444" }} />
                      </Sparklines>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;
