
import { Stock, TimeFrame } from "@/types/portfolio";
import { calculateInvestedValue } from "@/utils/portfolioUtils";

export const generatePortfolioPerformanceData = (stocks: Stock[], timeframe: TimeFrame) => {
  const data = [];
  const today = new Date();
  
  let days: number;
  switch (timeframe) {
    case '1W':
      days = 7;
      break;
    case '1M':
      days = 30;
      break;
    case '3M':
      days = 90;
      break;
    case '6M':
      days = 180;
      break;
    case '1Y':
      days = 365;
      break;
    case 'YTD':
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      days = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
      break;
    default:
      days = 30; // Default to 1M
  }
  
  // Get the total invested value for baseline
  const totalInvested = calculateInvestedValue(stocks);
  
  // To create a realistic chart, we'll use different patterns based on the timeframe
  const volatility = timeframe === '1W' ? 0.01 : 
                     timeframe === '1M' ? 0.02 : 
                     timeframe === '3M' ? 0.04 : 
                     timeframe === '6M' ? 0.06 : 0.1;
  
  // Use the current portfolio value for the end value
  const currValue = stocks.reduce((sum, stock) => sum + (stock.ltp * stock.quantity), 0);
  
  // Create a general trend from invested value to current value
  const totalGrowth = currValue / totalInvested - 1;
  
  // Generate the data points
  for (let i = 0; i <= days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (days - i));
    
    // Calculate a smoothed progression with some random noise
    const progress = i / days;
    const trendValue = totalInvested * (1 + (totalGrowth * progress));
    
    // Add some randomness
    const randomFactor = ((Math.random() * 2) - 1) * volatility * trendValue;
    const value = trendValue + randomFactor;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.max(value, totalInvested * 0.8) // Ensure we don't go too low
    });
  }
  
  return data;
};

export const generateSectorData = (stocks: Stock[]) => {
  // In a real app, we'd use actual sector data from the stock objects
  // For demonstration, we'll categorize based on the stock symbols
  const sectors = [
    { name: "Technology", symbols: ["AAPL", "MSFT", "GOOGL"] },
    { name: "Consumer", symbols: ["AMZN"] },
    { name: "Automotive", symbols: ["TSLA"] },
    { name: "Social Media", symbols: ["META"] },
    { name: "Entertainment", symbols: ["NFLX"] },
    { name: "Financial", symbols: [] },
    { name: "Healthcare", symbols: [] }
  ];
  
  // Calculate value by sector
  const sectorValues = sectors.map(sector => {
    const sectorStocks = stocks.filter(stock => 
      sector.symbols.includes(stock.symbol)
    );
    
    const value = sectorStocks.reduce(
      (sum, stock) => sum + (stock.ltp * stock.quantity), 
      0
    );
    
    return {
      name: sector.name,
      value,
      stocks: sectorStocks
    };
  });
  
  // Handle any stocks that aren't categorized
  const categorizedSymbols = sectors.flatMap(s => s.symbols);
  const otherStocks = stocks.filter(stock => !categorizedSymbols.includes(stock.symbol));
  
  if (otherStocks.length > 0) {
    const otherValue = otherStocks.reduce(
      (sum, stock) => sum + (stock.ltp * stock.quantity),
      0
    );
    
    sectorValues.push({
      name: "Other",
      value: otherValue,
      stocks: otherStocks
    });
  }
  
  // Remove sectors with zero value
  const filteredSectors = sectorValues.filter(s => s.value > 0);
  
  // Calculate total portfolio value for percentages
  const totalValue = filteredSectors.reduce((sum, sector) => sum + sector.value, 0);
  
  // Add percentage to each sector
  return filteredSectors.map(sector => ({
    ...sector,
    percentage: (sector.value / totalValue) * 100
  }));
};

// Function to pick the best and worst stocks based on different criteria
export const getTopAndBottomPerformers = (stocks: Stock[], count = 3) => {
  const sortedByPercentage = [...stocks].sort((a, b) => 
    ((b.ltp - b.avgPrice) / b.avgPrice) - ((a.ltp - a.avgPrice) / a.avgPrice)
  );
  
  return {
    gainers: sortedByPercentage.slice(0, count),
    losers: sortedByPercentage.slice(-count).reverse()
  };
};
