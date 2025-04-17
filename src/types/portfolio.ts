export interface StockFundamentals {
  pe: number;
  eps: number;
  marketCap: number;
  dividend: number;
  volume: number;
  avgVolume: number;
  high52: number;
  low52: number;
  priceTarget: number;
  beta: number;
  roe: number;
  profitMargin: number;
  debtToEquity: number;
  nseSymbol?: string; // NSE specific symbol
  bseSymbol?: string; // BSE specific symbol
  isinCode?: string; // Indian ISIN code
  lotSize?: number; // F&O lot size
  fiiHolding?: number; // Foreign Institutional Investor holding percentage
  diiHolding?: number; // Domestic Institutional Investor holding percentage
  promoterHolding?: number; // Promoter holding percentage
  revenueBreakdown?: RevenueBreakdown; // Revenue breakdown data
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  ltp: number; // Last traded price in rupees
  changeToday: number;
  sector?: string;
  marketCap?: string;
  fundamentals?: StockFundamentals;
  exchange?: 'NSE' | 'BSE'; // Indian stock exchanges
  news?: string[]; // Latest news related to the stock
  analystRating?: 'Buy' | 'Sell' | 'Hold' | 'Strong Buy' | 'Strong Sell';
  analystConsensus?: number; // 1-5 rating
  deliveryPercentage?: number; // Delivery percentage (Indian market specific)
  upperCircuit?: number; // Upper circuit limit
  lowerCircuit?: number; // Lower circuit limit
  revenueBreakdown?: RevenueBreakdown; // Revenue breakdown data
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvestment: number;
  todayPnL: number;
  overallPnL: number;
  todayPnLPercentage: number;
  overallPnLPercentage: number;
  allocations: {
    sector: Record<string, number>;
    marketCap: Record<string, number>;
  };
}

export type SortOption = 
  | 'alphabetical' 
  | 'changeToday' 
  | 'ltp' 
  | 'pnlAbsolute' 
  | 'pnlPercent'
  | 'invested';

export interface PerformanceData {
  day: string;
  value: number;
}

export type TimeFrame = 'YTD' | '1W' | '1D' | '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y';

export interface RevenueBreakdown {
  product: {
    labels: string[];
    data: number[];
    historical: { year: number; data: number[] }[];
  };
  location: {
    labels: string[];
    data: number[];
  };
}
