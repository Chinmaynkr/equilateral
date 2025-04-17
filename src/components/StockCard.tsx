
import { useState } from "react";
import { Stock } from "../types/portfolio";
import { 
  calculateStockPnL,
  formatCurrency,
  formatPercentage
} from "../utils/portfolioUtils";
import { TrendingDown, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import StockFundamentals from "./StockFundamentals";

interface StockCardProps {
  stock: Stock;
}

const StockCard = ({ stock }: StockCardProps) => {
  const [showFundamentals, setShowFundamentals] = useState(false);
  
  const { absolute: pnlValue, percentage: pnlPercentage } = calculateStockPnL(stock);
  const isProfitable = pnlValue >= 0;
  const investedValue = stock.avgPrice * stock.quantity;
  const currentValue = stock.ltp * stock.quantity;

  return (
    <Card className="mb-3 overflow-hidden">
      <CardContent 
        className="p-3 cursor-pointer"
        onClick={() => setShowFundamentals(!showFundamentals)}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">{stock.symbol}</h3>
              {isProfitable ? (
                <TrendingUp size={16} className="ml-1 text-green-600" />
              ) : (
                <TrendingDown size={16} className="ml-1 text-red-600" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">{stock.name}</p>
          </div>
          <div className="text-right flex items-center gap-2">
            <div className="flex flex-col items-end">
              <p className={`font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(pnlValue)}
              </p>
              <p className={`text-sm ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(pnlPercentage)}
              </p>
            </div>
            {showFundamentals ? 
              <ChevronUp size={16} className="ml-1" /> : 
              <ChevronDown size={16} className="ml-1" />
            }
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-sm mt-3">
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Qty</p>
            <p>{stock.quantity}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xs text-muted-foreground">Avg</p>
            <p>{formatCurrency(stock.avgPrice)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">LTP</p>
            <p>{formatCurrency(stock.ltp)}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center px-3 py-2 bg-gray-50 dark:bg-gray-800 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Invested</p>
          <p>{formatCurrency(investedValue)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Current Value</p>
          <p>{formatCurrency(currentValue)}</p>
        </div>
      </CardFooter>

      {showFundamentals && (
        <div className="border-t">
          <StockFundamentals stock={stock} />
        </div>
      )}
    </Card>
  );
};

export default StockCard;
