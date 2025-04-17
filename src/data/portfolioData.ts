import { Stock } from "../types/portfolio";

export const portfolioData: Stock[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 10,
    avgPrice: 150.25,
    ltp: 172.50,
    changeToday: 1.2,
    revenueBreakdown: {
      product: {
        labels: ['iPhone', 'Mac', 'iPad', 'Services', 'Wearables'],
        data: [47, 10, 8, 21, 14],
        historical: [
          { year: 2023, data: [45, 11, 9, 20, 15] },
          { year: 2022, data: [42, 12, 10, 19, 17] }
        ]
      },
      location: {
        labels: ['Americas', 'Europe', 'China', 'Japan', 'Rest of Asia'],
        data: [45, 25, 15, 8, 7]
      }
    }
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    quantity: 5,
    avgPrice: 280.50,
    ltp: 310.75,
    changeToday: 0.8,
  },
  {
    id: "3",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    quantity: 2,
    avgPrice: 2300.00,
    ltp: 2150.30,
    changeToday: -1.5,
  },
  {
    id: "4",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    quantity: 4,
    avgPrice: 3200.75,
    ltp: 3450.25,
    changeToday: 2.1,
  },
  {
    id: "5",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    quantity: 8,
    avgPrice: 750.20,
    ltp: 680.50,
    changeToday: -3.2,
  },
  {
    id: "6",
    symbol: "META",
    name: "Meta Platforms Inc.",
    quantity: 12,
    avgPrice: 320.10,
    ltp: 365.25,
    changeToday: 1.7,
  },
  {
    id: "7",
    symbol: "NFLX",
    name: "Netflix, Inc.",
    quantity: 3,
    avgPrice: 550.30,
    ltp: 605.80,
    changeToday: 2.5,
  }
];
