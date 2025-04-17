import { Stock, SortOption } from "../types/portfolio";

export const calculateInvestedValue = (stocks: Stock[]): number => {
  return stocks.reduce((total, stock) => total + (stock.avgPrice * stock.quantity), 0);
};

export const calculateCurrentValue = (stocks: Stock[]): number => {
  return stocks.reduce((total, stock) => total + (stock.ltp * stock.quantity), 0);
};

export const calculatePnL = (stocks: Stock[]): { absolute: number; percentage: number } => {
  const invested = calculateInvestedValue(stocks);
  const current = calculateCurrentValue(stocks);
  const absolute = current - invested;
  const percentage = (absolute / invested) * 100;
  
  return { absolute, percentage };
};

export const calculateStockPnL = (stock: Stock): { absolute: number; percentage: number } => {
  const invested = stock.avgPrice * stock.quantity;
  const current = stock.ltp * stock.quantity;
  const absolute = current - invested;
  const percentage = (absolute / invested) * 100;
  
  return { absolute, percentage };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatPercentage = (value: number, decimals = 2): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

export const sortStocks = (stocks: Stock[], sortOption: SortOption): Stock[] => {
  const sortedStocks = [...stocks];
  
  switch (sortOption) {
    case 'alphabetical':
      return sortedStocks.sort((a, b) => a.symbol.localeCompare(b.symbol));
    
    case 'changeToday':
      return sortedStocks.sort((a, b) => b.changeToday - a.changeToday);
    
    case 'ltp':
      return sortedStocks.sort((a, b) => b.ltp - a.ltp);
    
    case 'pnlAbsolute':
      return sortedStocks.sort((a, b) => {
        const pnlA = calculateStockPnL(a).absolute;
        const pnlB = calculateStockPnL(b).absolute;
        return pnlB - pnlA;
      });
    
    case 'pnlPercent':
      return sortedStocks.sort((a, b) => {
        const pnlA = calculateStockPnL(a).percentage;
        const pnlB = calculateStockPnL(b).percentage;
        return pnlB - pnlA;
      });
    
    case 'invested':
      return sortedStocks.sort((a, b) => {
        const investedA = a.avgPrice * a.quantity;
        const investedB = b.avgPrice * b.quantity;
        return investedB - investedA;
      });
    
    default:
      return sortedStocks;
  }
};

export const filterStocksBySearch = (stocks: Stock[], searchTerm: string): Stock[] => {
  if (!searchTerm) return stocks;
  
  const lowerCaseSearch = searchTerm.toLowerCase();
  
  return stocks.filter(
    stock => 
      stock.symbol.toLowerCase().includes(lowerCaseSearch) || 
      stock.name.toLowerCase().includes(lowerCaseSearch)
  );
};
