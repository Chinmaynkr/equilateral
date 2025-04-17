import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { 
  Home, BarChart2, Search, Settings, Bell, Menu, X, ChevronRight, 
  ChevronLeft, Moon, Sun, Users, Briefcase, ListChecks, LineChart, 
  TrendingUp, ArrowUpRight, ArrowDownRight, IndianRupee, User, LogOut,
  ChevronDown, LayoutDashboard, PieChart, Zap, Sparkles, Wallet,
  CalendarDays, Clock, Receipt, PiggyBank, BadgePercent, Calculator, Landmark,
  Calendar, Info, Github
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Stock } from '@/types/portfolio';
import PortfolioTab from '@/components/PortfolioTab';
import WatchlistTab from '@/components/WatchlistTab';
import ResearchTab from '@/components/ResearchTab';
import SettingsTab from '@/components/SettingsTab';
import AccountsFeature from '@/components/AccountsFeature';
import AccountMenu from '@/components/AccountMenu';
import TrendingStocks from '@/components/TrendingStocks';
import StockFundamentals from '@/components/StockFundamentals';
import TrendingTab from '@/components/TrendingTab';
import SimulatorTab from '@/components/SimulatorTab';
import AccountTab from '@/components/AccountTab';
import AboutUsTab from '@/components/AboutUsTab';

// Types
interface NavItem {
  name: string;
  icon: React.ReactNode;
  active: boolean;
  isPro?: boolean;
}

// User profiles data
const userProfiles = [
  {
    name: "Aanya Patel",
    accountId: "EQUI78542",
    email: "aanya.p@equilateral.in",
    avatarColor: "purple",
    notifications: 7,
    portfolioValue: 3458750.50,
    investmentValue: 2875000.00,
    todayPnL: 95250.25,
    overallPnL: 583750.50,
    todayPnLPercentage: 3.2,
    overallPnLPercentage: 20.3,
    availableMargin: 845250
  },
  {
    name: "Chinmay Nerkar",
    accountId: "EQUI23985",
    email: "chinmaynkr@gmail.com",
    avatarColor: "blue",
    notifications: 3,
    portfolioValue: 2856450.75,
    investmentValue: 2450000.00,
    todayPnL: 78450.75,
    overallPnL: 406450.75,
    todayPnLPercentage: 2.8,
    overallPnLPercentage: 16.6,
    availableMargin: 578450
  },
  {
    name: "Priya Mehta",
    accountId: "EQUI45672",
    email: "priya.m@equilateral.in",
    avatarColor: "green",
    notifications: 5,
    portfolioValue: 4125780.25,
    investmentValue: 3250000.00,
    todayPnL: 112500.50,
    overallPnL: 875780.25,
    todayPnLPercentage: 3.5,
    overallPnLPercentage: 26.9,
    availableMargin: 925000
  },
  {
    name: "Anupam Nerkar",
    accountId: "EQUI39087",
    email: "anupamnerkar7@gmail.com",
    avatarColor: "red",
    notifications: 2,
    portfolioValue: 1875250.50,
    investmentValue: 1650000.00,
    todayPnL: -32500.25,
    overallPnL: 225250.50,
    todayPnLPercentage: -1.8,
    overallPnLPercentage: 13.7,
    availableMargin: 425000
  },
  {
    name: "Neha Sharma",
    accountId: "EQUI67321",
    email: "neha.s@equilateral.in",
    avatarColor: "yellow",
    notifications: 9,
    portfolioValue: 5250750.75,
    investmentValue: 4150000.00,
    todayPnL: 145250.25,
    overallPnL: 1100750.75,
    todayPnLPercentage: 2.9,
    overallPnLPercentage: 26.5,
    availableMargin: 1250000
  },
  {
    name: "Rahul Kapoor",
    accountId: "EQUI12458",
    email: "rahul.k@equilateral.in",
    avatarColor: "amber",
    notifications: 4,
    portfolioValue: 3125450.25,
    investmentValue: 2750000.00,
    todayPnL: 85250.50,
    overallPnL: 375450.25,
    todayPnLPercentage: 2.5,
    overallPnLPercentage: 13.7,
    availableMargin: 650000
  },
  {
    name: "Kavita Joshi",
    accountId: "EQUI56789",
    email: "kavita.j@equilateral.in",
    avatarColor: "indigo",
    notifications: 6,
    portfolioValue: 2450750.50,
    investmentValue: 2100000.00,
    todayPnL: -45250.25,
    overallPnL: 350750.50,
    todayPnLPercentage: -1.2,
    overallPnLPercentage: 16.7,
    availableMargin: 525000
  },
  {
    name: "Sanjay Gupta",
    accountId: "EQUI34567",
    email: "sanjay.g@equilateral.in",
    avatarColor: "blue",
    notifications: 1,
    portfolioValue: 1750250.75,
    investmentValue: 1500000.00,
    todayPnL: 65250.25,
    overallPnL: 250250.75,
    todayPnLPercentage: 3.7,
    overallPnLPercentage: 16.7,
    availableMargin: 375000
  }
];

const gradientOptions = [
  "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
  "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
  "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500",
  "bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500",
  "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
  "bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500",
  "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"
];

const Index: React.FC = () => {
  // Theme (global)
  const { theme, setTheme } = useTheme();
  const gradientClass = React.useMemo(() => gradientOptions[Math.floor(Math.random() * gradientOptions.length)], []);
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  
  // Refs
  const notificationsRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Randomly select a user profile on component mount
  const randomUserProfile = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * userProfiles.length);
    return userProfiles[randomIndex];
  }, []);
  
  // Mock data for portfolio stocks
  const mockStocks: Stock[] = [
    {
      id: "9",
      symbol: "BAJFINANCE",
      name: "Bajaj Finance Ltd",
      quantity: 45,
      avgPrice: 7250.50,
      ltp: 7845.75,
      changeToday: 2.2,
      sector: "Financial Services",
      marketCap: "₹4.72L Cr",
      exchange: "NSE",
      news: [
        "Bajaj Finance introduces new digital lending platform",
        "Bajaj Finance reports 28% YoY growth in AUM",
        "Bajaj Finance plans to enter wealth management space"
      ],
      analystRating: "Strong Buy",
      analystConsensus: 4.6,
      deliveryPercentage: 56.2,
      fundamentals: {
        pe: 38.2,
        eps: 205.38,
        marketCap: 472000,
        dividend: 1.5,
        volume: 2500000,
        avgVolume: 1800000,
        high52: 8250.25,
        low52: 6120.50,
        priceTarget: 8500,
        beta: 1.25,
        roe: 22.5,
        profitMargin: 28.4,
        debtToEquity: 5.2,
        nseSymbol: "BAJFINANCE",
        bseSymbol: "500034",
        isinCode: "INE296A01024",
        lotSize: 125,
        fiiHolding: 24.8,
        diiHolding: 12.5,
        promoterHolding: 55.7
      }
    },
    {
      id: "10",
      symbol: "ASIANPAINT",
      name: "Asian Paints Ltd",
      quantity: 60,
      avgPrice: 3125.75,
      ltp: 3450.25,
      changeToday: 1.5,
      sector: "Consumer Durables",
      marketCap: "₹3.31L Cr",
      exchange: "NSE",
      news: [
        "Asian Paints launches eco-friendly paint range",
        "Asian Paints Q4 profit rises 15% to ₹1,258 crore",
        "Asian Paints increases market share in premium segment"
      ],
      analystRating: "Buy",
      analystConsensus: 4.1,
      deliveryPercentage: 62.8,
      fundamentals: {
        pe: 65.4,
        eps: 52.75,
        marketCap: 331000,
        dividend: 2.1,
        volume: 1200000,
        avgVolume: 950000,
        high52: 3650.75,
        low52: 2780.50,
        priceTarget: 3800,
        beta: 0.75,
        roe: 28.6,
        profitMargin: 12.5,
        debtToEquity: 0.08,
        nseSymbol: "ASIANPAINT",
        bseSymbol: "500820",
        isinCode: "INE021A01026",
        lotSize: 200,
        fiiHolding: 18.2,
        diiHolding: 8.5,
        promoterHolding: 52.6
      }
    },
    {
      id: "1",
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd",
      quantity: 50,
      avgPrice: 2450.75,
      ltp: 2789.35,
      changeToday: 1.8,
      sector: "Energy",
      marketCap: "₹18.75L Cr",
      exchange: "NSE",
      news: [
        "Reliance Retail acquires majority stake in Superdry's India business",
        "RIL announces new green hydrogen project in Gujarat",
        "Reliance Jio adds 4.2 million subscribers in March quarter"
      ],
      analystRating: "Buy",
      analystConsensus: 4.2,
      deliveryPercentage: 45.8,
      fundamentals: {
        pe: 28.5,
        eps: 97.85,
        marketCap: 1875000,
        dividend: 1.2,
        volume: 8500000,
        avgVolume: 7200000,
        high52: 2950.75,
        low52: 2100.50,
        priceTarget: 3100,
        beta: 1.15,
        roe: 11.5,
        profitMargin: 9.8,
        debtToEquity: 0.42,
        nseSymbol: "RELIANCE",
        bseSymbol: "500325",
        isinCode: "INE002A01018",
        lotSize: 250,
        fiiHolding: 24.5,
        diiHolding: 18.7,
        promoterHolding: 50.6
      }
    },
    {
      id: "2",
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd",
      quantity: 80,
      avgPrice: 1580.25,
      ltp: 1675.50,
      changeToday: 0.5,
      sector: "Financial Services",
      marketCap: "₹12.45L Cr",
      exchange: "NSE",
      news: [
        "HDFC Bank launches new digital banking platform for MSMEs",
        "HDFC Bank's Q4 net profit rises 20.6% to ₹15,206 crore",
        "HDFC Bank increases MCLR by 5 basis points across tenures"
      ],
      analystRating: "Strong Buy",
      analystConsensus: 4.7,
      deliveryPercentage: 62.3,
      fundamentals: {
        pe: 22.8,
        eps: 73.45,
        marketCap: 1245000,
        dividend: 1.8,
        volume: 6200000,
        avgVolume: 5800000,
        high52: 1790.25,
        low52: 1420.75,
        priceTarget: 1850,
        beta: 0.95,
        roe: 16.8,
        profitMargin: 21.5,
        debtToEquity: 0.18,
        nseSymbol: "HDFCBANK",
        bseSymbol: "500180",
        isinCode: "INE040A01034",
        lotSize: 500,
        fiiHolding: 32.8,
        diiHolding: 22.5,
        promoterHolding: 25.7
      }
    },
    {
      id: "3",
      symbol: "TCS",
      name: "Tata Consultancy Services Ltd",
      quantity: 25,
      avgPrice: 3250.50,
      ltp: 3578.25,
      changeToday: 1.2,
      sector: "Information Technology",
      marketCap: "₹13.10L Cr",
      exchange: "NSE",
      news: [
        "TCS wins $1 billion deal from leading global retailer",
        "TCS announces ₹18,000 crore share buyback at ₹4,150 per share",
        "TCS partners with Microsoft for generative AI solutions"
      ],
      analystRating: "Buy",
      analystConsensus: 4.0,
      deliveryPercentage: 58.7,
      fundamentals: {
        pe: 29.5,
        eps: 121.3,
        marketCap: 1310000,
        dividend: 2.2,
        volume: 3100000,
        avgVolume: 2800000,
        high52: 3850.25,
        low52: 3050.75,
        priceTarget: 3900,
        beta: 0.85,
        roe: 43.2,
        profitMargin: 20.8,
        debtToEquity: 0.02,
        nseSymbol: "TCS",
        bseSymbol: "532540",
        isinCode: "INE467B01029",
        lotSize: 150,
        fiiHolding: 16.5,
        diiHolding: 28.3,
        promoterHolding: 72.3
      }
    },
    {
      id: "4",
      symbol: "INFY",
      name: "Infosys Ltd",
      quantity: 100,
      avgPrice: 1450.25,
      ltp: 1389.75,
      changeToday: -2.1,
      sector: "Information Technology",
      marketCap: "₹5.85L Cr",
      exchange: "NSE",
      news: [
        "Infosys revises FY25 revenue guidance downward to 3-5%",
        "Infosys announces strategic partnership with NVIDIA for AI solutions",
        "Infosys wins multi-year digital transformation deal from European energy major"
      ],
      analystRating: "Hold",
      analystConsensus: 3.2,
      deliveryPercentage: 52.1,
      fundamentals: {
        pe: 24.8,
        eps: 56.04,
        marketCap: 585000,
        dividend: 3.0,
        volume: 5600000,
        avgVolume: 4900000,
        high52: 1680.50,
        low52: 1320.25,
        priceTarget: 1550,
        beta: 0.92,
        roe: 31.5,
        profitMargin: 18.5,
        debtToEquity: 0.01,
        nseSymbol: "INFY",
        bseSymbol: "500209",
        isinCode: "INE009A01021",
        lotSize: 300,
        fiiHolding: 32.1,
        diiHolding: 25.7,
        promoterHolding: 15.2
      }
    },
    {
      id: "5",
      symbol: "ADANIENT",
      name: "Adani Enterprises Ltd",
      quantity: 30,
      avgPrice: 2150.75,
      ltp: 2875.50,
      changeToday: 3.5,
      sector: "Infrastructure",
      marketCap: "₹3.28L Cr",
      exchange: "NSE",
      news: [
        "Adani Group to invest ₹2.3 lakh crore in renewable energy projects",
        "Adani Enterprises wins coal mining projects worth ₹25,000 crore",
        "Adani Group forms JV with Kowa Group for green hydrogen exports to Japan"
      ],
      analystRating: "Buy",
      analystConsensus: 3.8,
      deliveryPercentage: 38.5,
      fundamentals: {
        pe: 42.5,
        eps: 67.66,
        marketCap: 328000,
        dividend: 0.5,
        volume: 7800000,
        avgVolume: 6500000,
        high52: 3250.25,
        low52: 1580.50,
        priceTarget: 3200,
        beta: 1.45,
        roe: 8.5,
        profitMargin: 5.2,
        debtToEquity: 1.25,
        nseSymbol: "ADANIENT",
        bseSymbol: "512599",
        isinCode: "INE423A01024",
        lotSize: 250,
        fiiHolding: 14.8,
        diiHolding: 12.5,
        promoterHolding: 72.6
      }
    },
    {
      id: "6",
      symbol: "BHARTIARTL",
      name: "Bharti Airtel Ltd",
      quantity: 120,
      avgPrice: 875.50,
      ltp: 1125.75,
      changeToday: 1.8,
      sector: "Telecommunication",
      marketCap: "₹6.25L Cr",
      exchange: "NSE",
      news: [
        "Airtel adds 4.5 million 5G users in March quarter",
        "Bharti Airtel increases tariffs by 10-12% across all plans",
        "Airtel Business launches integrated IoT platform for enterprise customers"
      ],
      analystRating: "Strong Buy",
      analystConsensus: 4.5,
      deliveryPercentage: 48.2,
      fundamentals: {
        pe: 32.8,
        eps: 34.32,
        marketCap: 625000,
        dividend: 1.0,
        volume: 4500000,
        avgVolume: 3800000,
        high52: 1190.25,
        low52: 820.50,
        priceTarget: 1250,
        beta: 0.88,
        roe: 11.2,
        profitMargin: 12.5,
        debtToEquity: 1.05,
        nseSymbol: "BHARTIARTL",
        bseSymbol: "532454",
        isinCode: "INE397D01024",
        lotSize: 425,
        fiiHolding: 25.2,
        diiHolding: 18.5,
        promoterHolding: 55.8
      }
    },
    {
      id: "7",
      symbol: "TATAMOTORS",
      name: "Tata Motors Ltd",
      quantity: 150,
      avgPrice: 625.25,
      ltp: 875.50,
      changeToday: 2.8,
      sector: "Automobile",
      marketCap: "₹2.92L Cr",
      exchange: "NSE",
      news: [
        "Tata Motors launches new Curvv EV with 500 km range",
        "JLR sales grow 35% YoY in Q4, driving Tata Motors' profitability",
        "Tata Motors announces ₹18,000 crore investment in EV production"
      ],
      analystRating: "Buy",
      analystConsensus: 4.3,
      deliveryPercentage: 42.8,
      fundamentals: {
        pe: 35.2,
        eps: 24.87,
        marketCap: 292000,
        dividend: 0.8,
        volume: 9200000,
        avgVolume: 7800000,
        high52: 950.75,
        low52: 580.25,
        priceTarget: 1050,
        beta: 1.28,
        roe: 15.8,
        profitMargin: 7.5,
        debtToEquity: 0.85,
        nseSymbol: "TATAMOTORS",
        bseSymbol: "500570",
        isinCode: "INE155A01022",
        lotSize: 275,
        fiiHolding: 18.7,
        diiHolding: 22.5,
        promoterHolding: 46.4
      }
    },
    {
      id: "8",
      symbol: "WIPRO",
      name: "Wipro Ltd",
      quantity: 200,
      avgPrice: 425.75,
      ltp: 445.25,
      changeToday: 0.8,
      sector: "Information Technology",
      marketCap: "₹2.45L Cr",
      exchange: "NSE",
      news: [
        "Wipro wins $300 million digital transformation deal from European bank",
        "Wipro announces collaboration with Google Cloud for AI solutions",
        "Wipro's attrition rate drops to 14.2% in Q4 FY24"
      ],
      analystRating: "Hold",
      analystConsensus: 3.0,
      deliveryPercentage: 55.4,
      fundamentals: {
        pe: 21.5,
        eps: 20.71,
        marketCap: 245000,
        dividend: 2.5,
        volume: 4800000,
        avgVolume: 4200000,
        high52: 495.50,
        low52: 385.25,
        priceTarget: 480,
        beta: 0.82,
        roe: 16.2,
        profitMargin: 15.8,
        debtToEquity: 0.12,
        nseSymbol: "WIPRO",
        bseSymbol: "507685",
        isinCode: "INE075A01022",
        lotSize: 1000,
        fiiHolding: 11.5,
        diiHolding: 26.8,
        promoterHolding: 73.0
      }
    }
  ];
  
  // Use static available margin from user profile
  const randomAvailableMargin = randomUserProfile.availableMargin;
  
  // Portfolio summary data
  const portfolioSummary = {
    totalValue: randomUserProfile.portfolioValue,
    totalInvestment: randomUserProfile.investmentValue,
    todayPnL: randomUserProfile.todayPnL,
    overallPnL: randomUserProfile.overallPnL,
    todayPnLPercentage: randomUserProfile.todayPnLPercentage,
    overallPnLPercentage: randomUserProfile.overallPnLPercentage,
    availableMargin: randomAvailableMargin,
    usedMargin: Math.floor(randomAvailableMargin * 0.4), // 40% of available margin is used
    allocations: {
      sector: {
        "Information Technology": 40,
        "Financial Services": 30,
        "Automobile": 15,
        "Infrastructure": 10,
        "Energy": 5
      },
      marketCap: {
        "Large Cap": 65,
        "Mid Cap": 25,
        "Small Cap": 10
      }
    }
  };
  
  // Handle theme toggle (global)
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Handle notifications toggle
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  // Handle account menu toggle
  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Navigation items
  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: activeSection === "dashboard",
    },
    {
      name: "Portfolio",
      icon: <PieChart className="h-5 w-5" />,
      active: activeSection === "portfolio",
    },
    {
      name: "Watchlist",
      icon: <ListChecks className="h-5 w-5" />,
      active: activeSection === "watchlist",
    },
    {
      name: "Account",
      icon: <Wallet className="h-5 w-5" />,
      active: activeSection === "account",
    },
    {
      name: "Research",
      icon: <Search className="h-5 w-5" />,
      active: activeSection === "research",
      isPro: true,
    },
    {
      name: "Trending",
      icon: <TrendingUp className="h-5 w-5" />,
      active: activeSection === "trending",
    },
    {
      name: "Simulator",
      icon: <Sparkles className="h-5 w-5" />,
      active: activeSection === "simulator",
      isPro: true,
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      active: activeSection === "settings",
    },
    {
      name: "About Us",
      icon: <Info className="h-5 w-5" />,
      active: activeSection === "about us",
    },
  ];
  
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={true}
      enableColorScheme={true}
      storageKey="folio-visualizer-theme"
      disableTransitionOnChange={false}
    >
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <header 
          ref={headerRef}
          className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-200 ${
            scrolled ? 'shadow-md' : ''
          }`}
        >
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleSidebar}
                className="mr-2"
              >
                {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </Button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center mr-2">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold">Equilateral</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* P&L Summary */}
              <div className="hidden md:flex items-center space-x-4 mr-4">
                <div className="flex flex-col items-end">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Today's P&L</div>
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span className="font-medium">₹{Math.abs(portfolioSummary.todayPnL).toLocaleString('en-IN')}</span>
                    <span className="text-xs ml-1">({Math.abs(portfolioSummary.todayPnLPercentage)}%)</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Overall P&L</div>
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span className="font-medium">₹{Math.abs(portfolioSummary.overallPnL).toLocaleString('en-IN')}</span>
                    <span className="text-xs ml-1">({Math.abs(portfolioSummary.overallPnLPercentage)}%)</span>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <div className="relative" ref={notificationsRef}>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleNotifications}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">{randomUserProfile.notifications}</span>
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-30">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">RELIANCE up by 1.8%</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Price alert triggered at ₹2,789.35</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 mins ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                            <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Deposit Successful</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">₹50,000 deposited to your account</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                            <Bell className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Market Opening Soon</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">NSE market opens in 15 minutes</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Today, 9:00 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-t border-gray-200 dark:border-gray-800">
                      <Button variant="ghost" size="sm" className="w-full text-sm">
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative" ref={accountMenuRef}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={toggleAccountMenu}
                  className="flex items-center space-x-2"
                >
                  <div className={`h-8 w-8 rounded-full bg-${randomUserProfile.avatarColor}-100 dark:bg-${randomUserProfile.avatarColor}-900 flex items-center justify-center`}>
                    <User className={`h-4 w-4 text-${randomUserProfile.avatarColor}-600 dark:text-${randomUserProfile.avatarColor}-400`} />
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">{randomUserProfile.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{randomUserProfile.accountId}</div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                
                {showAccountMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-30">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full bg-${randomUserProfile.avatarColor}-100 dark:bg-${randomUserProfile.avatarColor}-900 flex items-center justify-center mr-3`}>
                          <User className={`h-5 w-5 text-${randomUserProfile.avatarColor}-600 dark:text-${randomUserProfile.avatarColor}-400`} />
                        </div>
                        <div>
                          <div className="font-medium">{randomUserProfile.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{randomUserProfile.email}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Portfolio Value</div>
                          <div className="font-medium">₹{portfolioSummary.totalValue.toLocaleString('en-IN')}</div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Available Margin</div>
                          <div className="font-medium">₹{randomUserProfile.availableMargin.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <Button variant="ghost" size="sm" className="w-full justify-start px-4">
                        <User className="h-4 w-4 mr-2" />
                        <span>Profile</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start px-4">
                        <Wallet className="h-4 w-4 mr-2" />
                        <span>Accounts</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start px-4">
                        <Settings className="h-4 w-4 mr-2" />
                        <span>Settings</span>
                      </Button>
                    </div>
                    
                    <div className="p-2 border-t border-gray-200 dark:border-gray-800">
                      <Button variant="ghost" size="sm" className="w-full justify-start px-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <LogOut className="h-4 w-4 mr-2" />
                        <span>Logout</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Ticker Bar - Positioned to the right of sidebar */}
        <div className={`fixed top-16 ${sidebarOpen ? 'left-64' : 'left-16'} right-0 h-8 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 z-40 flex items-center overflow-hidden shadow-sm transition-all duration-300`}>
          <div className="ticker-wrapper w-full overflow-hidden">
            <div className="ticker-content flex items-center space-x-8 whitespace-nowrap animate-ticker">
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">NIFTY 50</span>
                <span className="ticker-value price-up font-medium">22,456.80</span>
                <span className="ticker-change price-up text-xs ml-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-sm">+1.2%</span>
              </div>
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">SENSEX</span>
                <span className="ticker-value price-up font-medium">73,872.54</span>
                <span className="ticker-change price-up text-xs ml-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-sm">+0.9%</span>
              </div>
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">BANKNIFTY</span>
                <span className="ticker-value price-down font-medium">48,126.35</span>
                <span className="ticker-change price-down text-xs ml-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded-sm">-0.3%</span>
              </div>
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">RELIANCE</span>
                <span className="ticker-value price-up font-medium">2,896.75</span>
                <span className="ticker-change price-up text-xs ml-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-sm">+1.8%</span>
              </div>
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">TCS</span>
                <span className="ticker-value price-up font-medium">3,745.20</span>
                <span className="ticker-change price-up text-xs ml-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-sm">+0.6%</span>
              </div>
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">INFY</span>
                <span className="ticker-value price-down font-medium">1,521.40</span>
                <span className="ticker-change price-down text-xs ml-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded-sm">-0.4%</span>
              </div>
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">HDFCBANK</span>
                <span className="ticker-value price-up font-medium">1,678.25</span>
                <span className="ticker-change price-up text-xs ml-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-sm">+0.2%</span>
              </div>
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">BHARTIARTL</span>
                <span className="ticker-value price-up font-medium">1,245.60</span>
                <span className="ticker-change price-up text-xs ml-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-sm">+1.5%</span>
              </div>
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">TATASTEEL</span>
                <span className="ticker-value price-down font-medium">145.90</span>
                <span className="ticker-change price-down text-xs ml-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded-sm">-0.7%</span>
              </div>
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">TATAMOTORS</span>
                <span className="ticker-value price-up font-medium">1,025.75</span>
                <span className="ticker-change price-up text-xs ml-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-sm">+2.3%</span>
              </div>
              
              {/* Duplicate items for continuous scrolling effect */}
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">NIFTY 50</span>
                <span className="ticker-value price-up font-medium">22,456.80</span>
                <span className="ticker-change price-up text-xs ml-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-sm">+1.2%</span>
              </div>
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">SENSEX</span>
                <span className="ticker-value price-up font-medium">73,872.54</span>
                <span className="ticker-change price-up text-xs ml-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-sm">+0.9%</span>
              </div>
              <div className="ticker-item flex items-center px-3 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <span className="ticker-symbol font-semibold mr-2">BANKNIFTY</span>
                <span className="ticker-value price-down font-medium">48,126.35</span>
                <span className="ticker-change price-down text-xs ml-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded-sm">-0.3%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto pt-24">
          {/* Main content area */}
          {/* Sidebar */}
          <aside
            onMouseEnter={() => setSidebarOpen(true)}
            onMouseLeave={() => setSidebarOpen(false)}
            className={`fixed left-0 top-16 h-[calc(100%-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-10 ${
              sidebarOpen ? 'w-64' : 'w-16'
            }`}
          >
            <nav className="p-2">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Button
                      variant={item.active ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        sidebarOpen ? 'px-3' : 'justify-center'
                      } ${
                        item.active 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setActiveSection(item.name.toLowerCase())}
                    >
                      {item.icon}
                      {sidebarOpen && (
                        <div className="ml-6 flex items-center">
                          <span>{item.name}</span>

                          {(item as any).isPro && (
                            <span className="ml-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-sm flex items-center space-x-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-3.5 text-black"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 2a4 4 0 00-4 4v2H5a1 1 0 00-1 1v7a2 2 0 002 2h8a2 2 0 002-2v-7a1 1 0 00-1-1h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>PRO</span>
                            </span>
                          )}
                        </div>

                      )}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          {/* Main content */}
          <main 
            className={`flex-1 p-6 transition-all duration-300 ${
              sidebarOpen ? 'ml-64' : 'ml-16'
            }`}
          >
            {activeSection === "dashboard" && (
              <div className="space-y-6 font-[Nunito]">
                {/* Welcome Section */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6 animate-fade-in">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      {/**
                        * Dynamic gradient for Welcome Back heading
                        */}
                      <h1 className={`text-3xl font-bold mb-2 font-sans ${gradientClass} text-transparent bg-clip-text drop-shadow-md`}>
                        Welcome back, {randomUserProfile.name}!
                      </h1>


                      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-2">
                        Your portfolio of {mockStocks.length} stocks is currently valued at ₹{portfolioSummary.totalValue.toLocaleString('en-IN')} with an overall return of {portfolioSummary.overallPnLPercentage}%.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                        Your investments are performing well today with a gain of ₹+{Math.abs(portfolioSummary.todayPnL).toLocaleString('en-IN')} (+{Math.abs(portfolioSummary.todayPnLPercentage)}%). IT and Financial sectors are showing strong momentum.
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 text-sm">
                        <div className="font-medium text-indigo-700 dark:text-indigo-300 mb-1">Market Status</div>
                        <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                          <span>Markets Open • Trading Active</span>
                        </div>
                        <div className="text-xs text-indigo-500 dark:text-indigo-300 mt-1">
                          Last updated: {new Date().toLocaleTimeString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* P&L Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800/50 p-4 shadow-sm animate-slide-up">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Portfolio Value</div>
                    <div className="text-2xl font-bold mb-1 font-[JetBrains_Mono]">₹{portfolioSummary.totalValue.toLocaleString('en-IN')}</div>
                    <div className="flex items-center">
                      <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                      <span className="text-green-600 dark:text-green-400">
                        +₹{Math.abs(portfolioSummary.overallPnL).toLocaleString('en-IN')} ({Math.abs(portfolioSummary.overallPnLPercentage)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg border border-green-200 dark:border-green-800/50 p-4 shadow-sm animate-slide-up">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Today's P&L</div>
                    <div className="text-2xl font-bold mb-1 font-[JetBrains_Mono]">₹+{Math.abs(portfolioSummary.todayPnL).toLocaleString('en-IN')}</div>
                    <div className="flex items-center">
                      <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                      <span className="text-green-600 dark:text-green-400">
                        +{Math.abs(portfolioSummary.todayPnLPercentage)}% today
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-lg border border-purple-200 dark:border-purple-800/50 p-4 shadow-sm animate-slide-up">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Investment Value</div>
                    <div className="text-2xl font-bold mb-1 font-[JetBrains_Mono]">₹{portfolioSummary.totalInvestment.toLocaleString('en-IN')}</div>
                    <div className="flex items-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        Across {mockStocks.length} stocks
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200 dark:border-amber-800/50 p-4 shadow-sm animate-slide-up">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Available Margin</div>
                    <div className="text-2xl font-bold mb-1 font-[JetBrains_Mono]">₹{portfolioSummary.availableMargin.toLocaleString('en-IN')}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Used: ₹{portfolioSummary.usedMargin.toLocaleString('en-IN')}</span>
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 dark:bg-amber-600" 
                          style={{ width: `${(portfolioSummary.usedMargin / portfolioSummary.availableMargin * 100).toFixed(0)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main dashboard content */}
                <div className="grid grid-cols-1 gap-6">
                  {/* Account Feature */}
                  <AccountsFeature userProfile={randomUserProfile} />
                  
                  {/* Stock Fundamentals */}
                  {selectedStock && (
                    <StockFundamentals stock={selectedStock} />
                  )}
                  
                  {/* Market Insights Component Removed */}
                  
                  {/* Additional Dashboard Components - Responsive Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Upcoming Events Calendar */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
                          <CalendarDays className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-lg font-semibold font-[Source_Sans_Pro]">Upcoming Events</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-800/20">
                          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex flex-col items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">APR</span>
                            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">20</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-sm">TCS Q4 Earnings</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Quarterly results announcement</p>
                              </div>
                              <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full">
                                <Clock className="h-3 w-3 inline-block mr-1" />
                                2 days
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-800/20">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex flex-col items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-xs font-bold text-green-600 dark:text-green-400">APR</span>
                            <span className="text-sm font-bold text-green-600 dark:text-green-400">25</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-sm">HDFC Bank Dividend</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">₹15.50 per share expected</p>
                              </div>
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                                <IndianRupee className="h-3 w-3 inline-block mr-1" />
                                Dividend
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800/20">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex flex-col items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">MAY</span>
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">02</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-sm">RBI Policy Meeting</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Interest rate decision</p>
                              </div>
                              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                <Landmark className="h-3 w-3 inline-block mr-1" />
                                Economic
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        View Full Calendar
                      </Button>
                    </div>
                    
                    {/* Tax Insights Dashboard */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
                          <Receipt className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold font-[Source_Sans_Pro]">Tax Insights</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Short-term Gains</div>
                          <div className="text-lg font-semibold">₹24,500</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tax: ₹7,350 (30%)</div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Long-term Gains</div>
                          <div className="text-lg font-semibold">₹1,12,800</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tax: ₹11,280 (10%)</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-800/20">
                          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                            <PiggyBank className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Tax-saving Opportunity</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Invest ₹50,000 more in ELSS funds to maximize Section 80C benefits.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800/20">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                            <BadgePercent className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Dividend Tax Impact</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Expected dividend income of ₹32,400 will be taxed at your income tax slab rate.</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                        <Calculator className="h-3.5 w-3.5 mr-1" />
                        Tax Planning Calculator
                      </Button>
                    </div>
                    
                    {/* Market News - New component to fill the third column on large screens */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-3">
                          <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h3 className="text-lg font-semibold font-[Source_Sans_Pro]">Market Highlights</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">Nifty 50</span>
                            <span className="text-green-600 dark:text-green-400 font-medium">22,456.80 <span className="text-xs">+1.2%</span></span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 dark:bg-green-600" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        
                        <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">Sensex</span>
                            <span className="text-green-600 dark:text-green-400 font-medium">73,872.54 <span className="text-xs">+0.9%</span></span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 dark:bg-green-600" style={{ width: '58%' }}></div>
                          </div>
                        </div>
                        
                        <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">Bank Nifty</span>
                            <span className="text-red-600 dark:text-red-400 font-medium">48,126.35 <span className="text-xs">-0.3%</span></span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 dark:bg-red-600" style={{ width: '42%' }}></div>
                          </div>
                        </div>
                        
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">India VIX</span>
                            <span className="text-amber-600 dark:text-amber-400 font-medium">14.25 <span className="text-xs">+0.5%</span></span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 dark:bg-amber-600" style={{ width: '25%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                        <BarChart2 className="h-3.5 w-3.5 mr-1" />
                        View Market Dashboard
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === "portfolio" && (
              <PortfolioTab stocks={mockStocks} onSelectStock={setSelectedStock} />
            )}
            
            {activeSection === "watchlist" && (
              <WatchlistTab stocks={mockStocks} onSelectStock={setSelectedStock} />
            )}
            
            {activeSection === "research" && (
              <ResearchTab 
                stocks={mockStocks} 
                onSelectStock={(stock: Stock) => setSelectedStock(stock)} 
              />
            )}
            
            {activeSection === "trending" && (
              <TrendingTab 
                stocks={mockStocks} 
                onSelectStock={(stock: Stock) => setSelectedStock(stock)} 
              />
            )}
            
            {activeSection === "simulator" && (
              <SimulatorTab 
                stocks={mockStocks} 
                onSelectStock={(stock: Stock) => setSelectedStock(stock)} 
              />
            )}
            
            {activeSection === "account" && (
              <AccountTab />
            )}
            
            {activeSection === "settings" && (
              <SettingsTab />
            )}
            
            {activeSection === "about us" && (
              <AboutUsTab />
            )}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
