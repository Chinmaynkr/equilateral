import React, { useState, useEffect } from 'react';
import { 
  BarChart4, ArrowUpRight, ArrowDownRight, MoreHorizontal, 
  PlusCircle, MinusCircle, Settings, ChevronRight, 
  TrendingUp, IndianRupee, Briefcase, LineChart, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AccountsFeatureProps {
  userProfile?: any;
}

const AccountsFeature: React.FC<AccountsFeatureProps> = ({ userProfile }) => {
  const [activeAccount, setActiveAccount] = useState<string | null>("acc-1");
  const [account, setAccount] = useState({
    id: "acc-1",
    name: "Equilateral Demat",
    type: "trading",
    balance: 1578450.75,
    currency: "₹",
    lastUpdate: "17 Apr, 2025 • 15:30 IST",
    growth: 12.4,
    color: "blue",
    accountNumber: "EQUI12345678",
    clientId: "EQUI123456",
    availableMargin: 578450.75,
    usedMargin: 345000.00,
    holdings: {
      value: 1233450.75,
      dayChange: 32450.50,
      dayChangePercent: 2.7,
      overallGain: 178450.75,
      overallGainPercent: 16.9
    },
    tradingActivity: {
      todayTrades: 8,
      weekTrades: 42,
      winRate: 68,
      avgHoldingPeriod: "3.2 days"
    }
  });
  
  // Update account data when userProfile changes
  useEffect(() => {
    if (userProfile) {
      // Calculate holdings value (total portfolio - available margin)
      const holdingsValue = userProfile.portfolioValue - userProfile.availableMargin;
      const usedMargin = Math.floor(userProfile.availableMargin * 0.4); // Simulate 40% margin usage
      
      setAccount({
        ...account,
        balance: userProfile.portfolioValue,
        clientId: userProfile.accountId,
        accountNumber: `EQUI${Math.floor(10000000 + Math.random() * 90000000)}`, // Random 8-digit number with EQUI prefix
        availableMargin: userProfile.availableMargin,
        usedMargin: usedMargin,
        holdings: {
          value: Math.abs(holdingsValue), // Ensure holdings value is always positive
          dayChange: Math.abs(userProfile.todayPnL), // Ensure day change is always positive
          dayChangePercent: Math.abs(userProfile.todayPnLPercentage), // Ensure day change percent is always positive
          overallGain: Math.abs(userProfile.overallPnL), // Ensure overall gain is always positive
          overallGainPercent: Math.abs(userProfile.overallPnLPercentage) // Ensure overall gain percent is always positive
        },
        growth: Math.abs(userProfile.overallPnLPercentage / 2) // Simulated monthly growth as absolute value
      });
    }
  }, [userProfile]);

  // Get account icon based on type
  const getAccountIcon = (type: string) => {
    switch (type) {
      case "trading":
        return <BarChart4 className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
      default:
        return <Briefcase className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800/50 p-4 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
            <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-900 dark:text-blue-300">Demat Account</h2>
            <div className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
              <span className="mr-2">Last updated: {account.lastUpdate}</span>
              <Zap className="h-3 w-3" />
              <span className="ml-1">Live</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
          <PlusCircle className="h-4 w-4 mr-1" />
          Fund Account
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-900/60 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Portfolio Value</div>
          <div className="text-2xl font-bold mb-1">{account.currency}{account.balance.toLocaleString('en-IN')}</div>
          <div className="flex items-center">
            {account.growth >= 0 ? (
              <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400 mr-1" />
            )}
            <span className={account.growth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
              {account.growth >= 0 ? '+' : ''}{account.growth}% this month
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900/60 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Available Margin</div>
          <div className="text-2xl font-bold mb-1">{account.currency}{account.availableMargin.toLocaleString('en-IN')}</div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">Used: {account.currency}{account.usedMargin.toLocaleString('en-IN')}</span>
            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 dark:bg-blue-600" 
                style={{ width: `${(account.usedMargin / account.availableMargin * 100).toFixed(0)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900/60 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Holdings Value</div>
          <div className="text-2xl font-bold mb-1">{account.currency}{account.holdings.value.toLocaleString('en-IN')}</div>
          <div className="flex items-center justify-between">
          <div className="flex items-center">
              {account.holdings.dayChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400 mr-1" />
              )}
              <span className={account.holdings.dayChange >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                +{Math.abs(account.holdings.dayChange).toLocaleString('en-IN')} (+{Math.abs(account.holdings.dayChangePercent)}%)
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Today</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900/60 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold flex items-center">
              <IndianRupee className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
              Account Details
            </h3>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Account Number</div>
              <div className="font-medium">{account.accountNumber}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Client ID</div>
              <div className="font-medium">{account.clientId}</div>
            </div>
            <div className={`font-medium ${account.holdings.overallGain >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
  {account.holdings.overallGain >= 0 ? "+" : "+"}{account.currency}{Math.abs(account.holdings.overallGain).toLocaleString('en-IN')} ({Math.abs(account.holdings.overallGainPercent)}%)
</div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Account Type</div>
              <div className="font-medium">Individual</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="flex items-center justify-center">
                <PlusCircle className="h-4 w-4 mr-1" />
                Deposit
              </Button>
              <Button variant="outline" size="sm" className="flex items-center justify-center">
                <MinusCircle className="h-4 w-4 mr-1" />
                Withdraw
              </Button>
              <Button variant="outline" size="sm" className="flex items-center justify-center">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900/60 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold flex items-center">
              <LineChart className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
              Trading Activity
            </h3>
            <Button variant="ghost" size="sm">
              View History
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Today's Trades</div>
              <div className="text-xl font-bold">{account.tradingActivity.todayTrades}</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Weekly Trades</div>
              <div className="text-xl font-bold">{account.tradingActivity.weekTrades}</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Win Rate</div>
              <div className="text-xl font-bold">{account.tradingActivity.winRate}%</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Holding</div>
              <div className="text-xl font-bold">{account.tradingActivity.avgHoldingPeriod}</div>
            </div>
          </div>
          
          <div className="mt-2">
            <Button variant="ghost" size="sm" className="w-full flex items-center justify-between text-sm">
              <span>View Detailed Analytics</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsFeature;
