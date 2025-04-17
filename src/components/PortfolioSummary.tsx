
import { Stock } from "../types/portfolio";
import { 
  calculateInvestedValue,
  calculateCurrentValue,
  calculatePnL,
  formatCurrency,
  formatPercentage
} from "../utils/portfolioUtils";
import { Card, CardContent } from "@/components/ui/card";

interface PortfolioSummaryProps {
  stocks: Stock[];
}

const PortfolioSummary = ({ stocks }: PortfolioSummaryProps) => {
  const investedValue = calculateInvestedValue(stocks);
  const currentValue = calculateCurrentValue(stocks);
  const { absolute: pnlValue, percentage: pnlPercentage } = calculatePnL(stocks);
  const isProfitable = pnlValue >= 0;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between mb-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Invested Value</p>
            <p className="text-xl font-semibold">{formatCurrency(investedValue)}</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-sm text-muted-foreground">Current Value</p>
            <p className="text-xl font-semibold">{formatCurrency(currentValue)}</p>
          </div>
        </div>
        <div className="pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">P&L</p>
            <div className="flex space-x-3">
              <p className={`font-semibold ${isProfitable ? 'profit' : 'loss'}`}>
                {formatCurrency(pnlValue)}
              </p>
              <p className={`font-semibold ${isProfitable ? 'profit' : 'loss'}`}>
                {formatPercentage(pnlPercentage)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
