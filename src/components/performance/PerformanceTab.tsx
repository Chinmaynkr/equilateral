
import React, { useState } from "react";
import { Stock, TimeFrame } from "@/types/portfolio";
import { calculatePnL, calculateStockPnL } from "@/utils/portfolioUtils";
import PortfolioChart from "./PortfolioChart";
import TopPerformers from "./TopPerformers";
import SectorAllocation from "./SectorAllocation";
import InsightsBox from "./InsightsBox";
import { Button } from "@/components/ui/button";

interface PerformanceTabProps {
  stocks: Stock[];
}

const PerformanceTab = ({ stocks }: PerformanceTabProps) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>("1M");
  
  return (
    <div className="space-y-6">
      <div className="bg-background rounded-lg shadow-sm overflow-hidden border border-border">
        <div className="p-4 border-b border-border">
          <h3 className="font-medium text-foreground">Portfolio Performance</h3>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {(['1W', '1M', '3M', '6M', '1Y', 'YTD'] as TimeFrame[]).map((tf) => (
              <Button
                key={tf}
                size="sm"
                variant={timeframe === tf ? "default" : "outline"}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
        <div className="p-4">
          <PortfolioChart timeframe={timeframe} stocks={stocks} />
        </div>
      </div>
      
      <TopPerformers stocks={stocks} />
      
      <div className="space-y-6">
        <SectorAllocation stocks={stocks} />
        <InsightsBox stocks={stocks} />
      </div>
    </div>
  );
};

export default PerformanceTab;
